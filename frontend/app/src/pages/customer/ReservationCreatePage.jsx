import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { createReservation } from "../../api/reservationApi";
import { formatPhoneNumber } from "../../utils/phoneUtil";

function ReservationCreatePage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
  const capacity = searchParams.get("capacity");

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

    try {
      const request = {
        ...form,
        roomId: Number(roomId),
      };

      const reservation = await createReservation(request);

      alert("예약이 완료되었습니다.");

      navigate(`/reservation/complete?reservationId=${reservation.id}`);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "예약 처리 중 오류가 발생했습니다."
      );
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
                예약 완료하기
            </button>
          </form>

          <aside className="h-fit rounded-[32px] bg-[#111111] p-8 text-white shadow-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-[#C8A97E]">
              Selected Room
            </p>
            <h2 className="mt-4 text-3xl font-bold">Room #{roomId}</h2>
            <p className="mt-4 leading-7 text-gray-300">
              선택한 객실 정보를 확인한 뒤 예약을 진행하세요.
            </p>

            <div className="my-8 border-t border-white/10"/>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">예약 상태</span>
                <span>예약 가능</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">결제 방식</span>
                <span>현장 결제</span>
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
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ReservationCreatePage;