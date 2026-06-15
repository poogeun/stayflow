import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmPayment } from "../../api/paymentApi.js";

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const called = useRef(false);

  const [reservationId, setReservationId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = Number(searchParams.get("amount"));

    const saved = sessionStorage.getItem("reservationForm");
    if (!saved) {
      setError("예약 정보를 찾을 수 없습니다.");
      return;
    }
    const form = JSON.parse(saved);

    confirmPayment({ paymentKey, orderId, amount, ...form })
      .then((data) => {
        sessionStorage.removeItem("reservationForm");
        setReservationId(data.id);
      })
      .catch(() => {
        setError("결제 승인 중 오류가 발생했습니다.");
      });
  }, []);

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F5F3EE] px-6">
        <div className="w-full max-w-md rounded-[32px] bg-white p-10 text-center shadow-sm">
          <div className="mb-6 text-6xl">✕</div>
            <h1 className="mb-3 text-2xl font-bold text-[#111111]">오류 발생</h1>
            <p className="mb-8 text-gray-500">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="w-full rounded-2xl bg-[#111111] py-4 text-sm font-bold text-white transition hover:bg-[#C8A97E] hover:text-black"
            >
              홈으로
            </button>
        </div>
      </section>
    )
  }

  if (!reservationId) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#F5F3EE]">
        <p className="text-gray-500">결제 승인 중...</p>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F5F3EE] px-6">
      <div className="w-full max-w-md rounded-[32px] bg-white p-10 text-center shadow-sm">
        <div className="mb-6 text-6xl">✓</div>
        <h1 className="mb-3 text-2xl font-bold text-[#111111]">예약 완료</h1>
        <p className="mb-2 text-gray-500">결제가 성공적으로 완료되었습니다.</p>
        <p className="mb-8 text-sm text-gray-400">예약 번호: #{reservationId}</p>
        <button
          onClick={() => navigate("/")}
          className="w-full rounded-2xl bg-[#111111] py-4 text-sm font-bold text-white transition hover:bg-[#C8A97E] hover:text-black ">
          홈으로
        </button>
        <button
          onClick={() => navigate("/reservation/complete?reservationId=${reservationId}")}
          className="w-full rounded-2xl bg-[#111111] py-4 text-sm font-bold text-white transition hover:bg-[#C8A97E] hover:text-black "
        >
          예약 상세보기
        </button>
      </div>
    </section>
  );
}

export default PaymentSuccessPage;