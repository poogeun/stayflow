import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getReservation } from "../../api/reservationApi";
import { formatDate, formatPrice } from "../../utils/formatUtil";
import { getWeatherByDate } from "../../api/weatherApi";
import WeatherCard from "../../components/common/WeatherCard";

function ReservationCompletePage() {
  const [searchParams] = useSearchParams();
  const reservationId = searchParams.get("reservationId");

  const [reservation, setReservation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const data = await getReservation(reservationId);

        setReservation(data);

        const today = new Date();
        const checkIn = new Date(data.checkInDate);
        const diffDays = Math.ceil((checkIn - today) / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays <= 5) {
          const weatherData = await getWeatherByDate(data.checkInDate);
          setWeather(weatherData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (reservationId) {
      fetchReservation();
    }
  }, [reservationId]);

  if (!reservation) {
    return (
      <section className="min-h-screen bg-[#F5F3EE] px-6 py-10 text-[#111111] md:px-10">
        <div className="mx-auto flex min-h-[620px] max-w-4xl items-center justify-center">
          <p className="text-gray-600">예약 정보를 불러오는 중입니다.</p>
        </div>
      </section>
    );
  }

  return(
    <section className="min-h-screen bg-[#F5F3EE] px-6 py-10 text-[#111111] md:px-10">
      <div className="mx-auto flex min-h-[620px] max-w-4xl items-center justify-center">
        <div className="w-full rounded-[32px] bg-white p-10 text-center shadow-sm">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#A88A5F]">
            Reservation Complete
          </p>

          <h1 className="text-4xl font-bold">
            예약이 완료되었습니다
          </h1>

          <p className="mt-5 text-gray-600">
            아래 예약 정보를 확인해주세요.
          </p>

          <div className="mx-auto mt-8 max-w-sm rounded-3xl bg-[#111111] px-8 py-6 text-white">
            <p className="text-sm text-gray-400">Reservation No.</p>
            <p className="mt-2 text-4xl font-bold">
              #{reservationId}
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-gray-100 p-6 text-left">
            <div className="grid gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">예약자</span>
                <span className="font-semibold">{reservation.guestName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">객실</span>
                <span className="font-semibold">
                  {reservation.roomNumber} / {reservation.roomType}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">체크인</span>
                <span className="font-semibold">{formatDate(reservation.checkInDate)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">체크아웃</span>
                <span className="font-semibold">{formatDate(reservation.checkOutDate)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">총 금액</span>
                <span className="font-semibold">₩{formatPrice(reservation.totalPrice)}</span>
              </div>                                          
            </div>
          </div>

          <WeatherCard weather={weather} />

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/rooms"
              className="rounded-2xl border border-gray-200 px-6 py-3 text-sm font-bold"
            >
              객실 더보기
            </Link>

            <Link
              to="/"
              className="rounded-2xl bg-[#C8A97E] px-6 py-3 text-sm font-bold text-black"
            >
              메인으로
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationCompletePage;