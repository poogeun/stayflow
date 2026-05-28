import { useState } from "react";
import { searchReservation, cancelReservation } from "../../api/reservationApi";
import { formatDate, formatPrice } from "../../utils/formatUtil";
import { formatPhoneNumber } from "../../utils/phoneUtil";

function ReservationSearchPage() {
  const [form, setForm] = useState({
    reservationId: "",
    guestPhone: "",
  });

  const [reservation, setReservation] = useState(null);

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
      const data = await searchReservation({
        reservationId: Number(form.reservationId),
        guestPhone: form.guestPhone,
      });

      setReservation(data);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "예약 정보를 찾을 수 없습니다."
      );
      setReservation(null);
    }
  };

  const handleCancel = async () => {
    if (!reservation) {
      return;
    }

    const confirmed = window.confirm(
      "예약을 취소하시겠습니까?"
    );

    if(!confirmed) {
      return;
    }

    try {
      const canceledReservation = 
        await cancelReservation(reservation.id);
      
        setReservation(canceledReservation);

        alert("예약이 취소되었습니다.");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "예약 취소 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <section className="min-h-screen bg-[#F5F3EE] px-6 py-10 text-[#111111] md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#A88A5F]">
            Reservation Search
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            예약 조회
          </h1>

          <p className="mt-4 text-gray-600">
            예약번호와 휴대폰번호를 입력해 예약 정보를 확인하세요.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <form
            onSubmit={handleSubmit}
            className="h-fit rounded-[32px] bg-white p-8 shadow-sm">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-600">
                예약번호
              </label>

              <input
                name="reservationId"
                value={form.reservationId}
                onChange={handleChange}
                type="number"
                placeholder="예: 1"
                className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none transition focus:border-[#C8A97E]"
              />
            </div>

            <div className="mt-5">
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

            <button
              type="submit"
              className="mt-8 w-full rounded-2xl bg-[#111111] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#C8A97E] hover:text-black"
            >
              예약 조회하기
            </button>
          </form>

          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            {!reservation ? (
              <div className="flex min-h-[320px] items-center justify-center text-center text-gray-500">
                조회된 예약 정보가 없습니다.
              </div>
            ) : (
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-[#A88A5F]">
                  Reservation Detail
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  예약번호 #{reservation.id}
                </h2>

                <div className="mt-8 grid gap-4 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500">예약자</span>
                    <span className="font-semibold">{reservation.guestName}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500">휴대폰번호</span>
                    <span className="font-semibold">{reservation.guestPhone}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500">객실</span>
                    <span className="font-semibold">{reservation.roomType}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500">체크인</span>
                    <span className="font-semibold">{formatDate(reservation.checkInDate)}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500">체크아웃</span>
                    <span className="font-semibold">{formatDate(reservation.checkOutDate)}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500">상태</span>
                    <span className="font-semibold">{reservation.status}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-gray-500">총 금액</span>
                    <span className="font-semibold">₩{formatPrice(reservation.totalPrice)}</span>
                  </div>                                                                                                            
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleCancel}
                    disabled={reservation.status === "CANCELED"}
                    className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-300">
                    예약 취소
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationSearchPage;