import { useState } from "react";
import { checkInReservation, searchReservation } from "../../api/reservationApi";
import { formatDate } from "../../utils/formatUtil";
import { getReservationStatusLabel } from "../../utils/reservationStatusUtil";

function KioskPage() {
  const [form, setForm] = useState({
    reservationId: "",
    guestPhone: "",
  });

  const [reservation, setReservation] = useState(null);
  const [isCompleted, setIsComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const data = await searchReservation({
        reservationId: Number(form.reservationId),
        guestPhone: form.guestPhone,
      });

      setReservation(data);
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.reseponse?.data?.message ||
          "예약 정보를 찾을 수 없습니다."
      );
      setReservation(null);
    }
  };

  const handleCheckIn = async () => {
    try {
      const data = await checkInReservation(reservation.id);

      setReservation(data);
      setIsComplete(true);
      setErrorMessage("");
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error.reseponse?.data?.message ||
          "체크인 처리 중 오류가 발생했습니다."
      );
    }
  };

  const handleReset = () => {
    setForm({
      reservationId: "",
      guestPhone: "",
    });

    setReservation(null);
    setIsComplete(false);
    setErrorMessage("");
  };

  const getKioskStatusMessage = (status) => {
    if (status === "RESERVED") {
      return "체크인 가능한 예약입니다.";
    }

    if (status === "CHECKED_IN") {
      return "이미 체크인된 예약입니다.";
    }

    if (status === "CHECKED_OUT") {
      return "이미 체크아웃된 예약입니다.";
    }

    if (status === "CANCELLED") {
      return "취소된 예약입니다. 프런트 데스크에 문의해주세요.";
    }

    return "체크인 가능 여부를 확인할 수 없습니다.";    
  }

  if (isCompleted && reservation) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#111111] px-6 py-10 text-white">
        <section className="w-full max-w-3xl rounded-[40px] bg-white p-14 text-center text-[#111111] shadow-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#A88A5F]">
            Check-in Complete
          </p>

          <h1 className="text-6xl font-bold">
            체크인이 완료되었습니다
          </h1>

          <p className="mt-6 text-2xl text-gray-600">
            객실 번호를 확인해주세요.
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-[36px] bg-[#111111] px-8 py-10 text-white">
            <p className="text-xl text-gray-400">Room Number</p>
            <p className="mt-4 text-7xl font-bold">
              {reservation.roomNumber}
            </p>
          </div>

          <p className="mt-8 text-xl text-gray-500">
            객실 카드 수령이 필요한 경우 프런트 데스크를 방문해주세요.
          </p>

          <button
            onClick={handleReset}
            className="mt-10 rounded-3xl bg-[#C8A97E] px-10 py-5 text-2xl font-bold text-black"
          >
            처음으로
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111111] px-6 py-10 text-white">
      <section className="w-full max-w-3xl rounded-[40px] bg-white p-10 text-[#111111] shadow-2xl md:p-14">
        <div className="mb-10 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#A88A5F]">
            StayFlow Kiosk
          </p>

          <h1 className="text-5xl font-bold md:text-6xl">
            셀프 체크인
          </h1>

          <p className="mt-5 text-xl leading-8 text-gray-600">
            예약번호와 휴대폰번호를 입력하면
            예약 정보를 확인할 수 있습니다.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-2xl font-bold">
              예약번호
            </label>

            <input
              name="reservationId"
              value={form.reservationId}
              onChange={handleChange}
              type="number"
              placeholder="예: 1"
              className="w-full rounded-3xl border border-gray-200 px-6 py-6 text-3xl outline-none transition focus:border-[#C8A97E]" 
            />
          </div>

          <div>
            <label className="mb-3 block text-2xl font-bold">
              휴대폰번호
            </label>

            <input
              name="guestPhone"
              value={form.guestPhone}
              onChange={handleChange}
              type="text"
              placeholder="010-1234-5678"
              className="w-full rounded-3xl border border-gray-200 px-6 py-6 text-3xl outline-none transition focus:border-[#C8A97E]"
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          className="mt-10 w-full rounded-3xl bg-[#111111] px-8 py-7 text-3xl font-bold text-white transition hover:bg-[#C8A97E] hover:text-black"
        >
          예약 조회하기
        </button>

        {errorMessage && (
          <div className="mt-6 rounded-3xl bg-red-50 px-6 py-5 text-center text-xl font-bold text-red-600">
            {errorMessage}
          </div>
        )}

        {reservation && (
          <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-8">
            <p className="text-xl font-bold">예약 정보</p>

            <div className="mt-6 space-y-4 text-xl">
              <div className="flex justify-between">
                <span className="text-gray-500">예약번호</span>
                <span className="font-bold">#{reservation.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">예약자</span>
                <span className="font-bold">{reservation.guestName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">객실</span>
                <span className="font-bold">
                  {reservation.roomNumber} / {reservation.roomType}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">체크인</span>
                <span className="font-bold">{formatDate(reservation.checkInDate)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">체크아웃</span>
                <span className="font-bold">{formatDate(reservation.checkOutDate)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">상태</span>
                <span className="font-bold">{getReservationStatusLabel(reservation.status)}</span>
              </div>                                                
            </div>

            <div className="mt-6 rounded-3xl bg-gray-100 px-6 py-5 text-center text-xl font-bold text-gray-700">
              {getKioskStatusMessage(reservation.status)}
            </div>

            {reservation.status === "RESERVED" && (
              <button
                onClick={handleCheckIn}
                className="mt-8 w-full rounded-3xl bg-[#C8A97E] px-8 py-6 text-3xl font-bold text-black transition hover:opacity-90"
              >
                체크인 진행하기
              </button>
            )}

            <button
              onClick={handleReset}
              className="mt-4 w-full rounded-3xl border border-gray-300 px-8 py-5 text-2xl font-bold text-gray-700"
            >
              다시 조회
            </button>

            {reservation.status !== "RESERVED" && (
              <p className="mt-8 rounded-3xl bg-gray-200 px-6 py-5 text-center text-xl font-bold text-gray-600">
                현재 체크인 가능한 예약이 아닙니다.
              </p>
            )}
          </div>
        )}
        
        <p className="mt-8 text-center text-lg text-gray-500">
          예약번호를 모르시는 경우
          프런트 데스크에 문의해주세요.
        </p>
      </section>

    </main>
  );
}

export default KioskPage;