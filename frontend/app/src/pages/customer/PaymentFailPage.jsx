import { useNavigate, useSearchParams } from "react-router-dom";

function PaymentFailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const message = searchParams.get("message") || "결제가 취소되었습니다.";

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F5F3EE] px-6">
      <div className="w-full max-w-md rounded-[32px] bg-white p-10 text-center shadow-sm">
        <div className="mb-6 text-6xl">✕</div>
          <h1 className="mb-3 text-2xl font-bold text-[#111111]">결제 실패</h1>
          <p className="mb-8 text-gray-500">{message}</p>
          <button
            onClick={() => navigate(-1)}
            className="w-full rounded-2xl bg-[#111111] py-4 text-sm font-bold text-white transition hover:bg-[#C8A97E] hover:text-black"
          >
            돌아가기
          </button>
      </div>
    </section>
  );
}

export default PaymentFailPage;