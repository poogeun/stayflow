import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { formatPhoneNumber } from "../../utils/phoneUtil";
import { ANONYMOUS, loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { formatPrice } from "../../utils/formatUtil";

const CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY;

function calcNights(checkIn, checkOut) {
  const diff = new Date(checkOut) - new Date(checkIn);
  return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)));
}

function ReservationCreatePage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
  const capacity = searchParams.get("capacity");
  const pricePerNight = Number(searchParams.get("price")) || 0;

  const nights = calcNights(checkInDate, checkOutDate);
  const totalAmount = pricePerNight * nights;

  const [form, setForm] = useState({
    guestName: "",
    guestPhone: "",
    guestEmail: "",
    checkInDate: checkInDate || "",
    checkOutDate: checkOutDate || "",
    capacity: capacity || "2",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: name === "guestPhone"
        ? formatPhoneNumber(value)
        : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.guestName || !form.guestPhone) {
      alert("이름과 휴대폰번호는 필수 입력 항목입니다.");
      return;
    }

    const orderId = `order-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    sessionStorage.setItem(
      "reservationForm",
      JSON.stringify({...form, roomId: Number(roomId) })
    );

    try {
      const tossPayments = await loadTossPayments(CLIENT_KEY);
      const payment = tossPayments.payment({ customerKey: ANONYMOUS });

      await payment.requestPayment({
        method: "CARD",
        amount: { currency: "KRW", value: totalAmount },
        orderId,
        orderName: `StayFlow 객실 예약 (Room #${roomId})`,
        customerName: form.guestName,
        customerEmail: form.guestEmail || undefined,
        successUrl: window.location.origin + "/reservation/payment-success",
        failUrl: window.location.origin + "/reservation/payment-fail",
      });
    } catch (error) {
      sessionStorage.removeItem("reservationForm");
      if (error.code !== "USER_CANCEL") {
        alert(error.message || "결제 요청 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <section className="min-h-screen bg-[#F5F3EE] px-6 py-10 text-[#111111] md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#A88A5F]">
            Reservation
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">예약 정보 입력</h1>
          <p className="mt-4 text-gray-600">
            예약자 정보를 입력하고 객실 예약을 완료하세요.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <form 
            onSubmit={handleSubmit}
            className="rounded-[32px] bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">예약자 정보</h2>
              <p className="mt-2 text-sm text-gray-500">
                예약 확인 및 키오스크 체크인에 사용됩니다.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  예약자 이름
                </label>
                <input
                  name="guestName"
                  value={form.guestName}
                  onChange={handleChange}
                  type="text"
                  placeholder="홍길동"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none transition focus:border-[#C8A97E]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  휴대폰번호
                </label>
                <input
                  name="guestPhone"
                  value={form.guestPhone}
                  onChange={handleChange}
                  type="text"
                  placeholder="010-1234-5678"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none transition focus:border-[#C8A97E]" 
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                   이메일
                </label>
                <input
                  name="guestEmail"
                  value={form.guestEmail}
                  onChange={handleChange}
                  type="email"
                  placeholder="guest@example.com"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none transition focus:border-[#C8A97E]"
                />
              </div>  
            </div>

            <div className="my-8 border-t border-gray-100" />

            <div className="mb-8">
              <h2 className="text-2xl font-bold">숙박 일정</h2>
              <p className="mt-2 text-sm text-gray-500">
                체크인/체크아웃 날짜를 선택하세요.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  체크인
                </label>
                <input
                  name="checkInDate"
                  value={form.checkInDate}
                  onChange={handleChange}
                  type="date"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none transition focus:border-[#C8A97E]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  체크아웃
                </label>
                <input
                  name="checkOutDate"
                  value={form.checkOutDate}
                  onChange={handleChange}
                  type="date"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none transition focus:border-[#C8A97E]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-2xl bg-[#111111] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#C8A97E] hover:text-black">
                결제하기
            </button>
          </form>

          <aside className="h-fit rounded-[32px] bg-[#111111] p-8 text-white shadow-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-[#C8A97E]">
              Selected Room
            </p>
            <h2 className="mt-4 text-3xl font-bold">Room #{roomId}</h2>
            <p className="mt-4 leading-7 text-gray-300">
              선택한 객실 정보를 확인한 뒤 결제를 진행하세요.
            </p>

            <div className="my-8 border-t border-white/10"/>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">1박 요금</span>
                <span>₩{formatPrice(pricePerNight)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">숙박 일수</span>
                <span>{nights}박</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">체크인</span>
                <span>15:00 이후</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">체크아웃</span>
                <span>11:00 이전</span>
              </div>
            </div>

            <div className="my-6 border-t border-white/10" />

            <div className="flex justify-between text-lg font-bold">
              <span>총 결제금액</span>
              <span className="text-[#C8A97E]">₩{formatPrice(totalAmount)}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ReservationCreatePage;