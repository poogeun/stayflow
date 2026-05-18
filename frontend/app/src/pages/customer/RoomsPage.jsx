const rooms = [
  {
    id: 1,
    roomNumber: "101",
    roomType: "Ocean Deluxe",
    capacity: 2,
    price: 250000,
    status: "AVAILABLE",
    description: "오션뷰와 프라이빗 라운지를 갖춘 대표 객실입니다.",
  },
  {
    id: 2,
    roomNumber: "201",
    roomType: "Garden Suite",
    capacity: 3,
    price: 320000,
    status: "AVAILABLE",
    description: "넓은 거실과 정원 전망을 제공하는 스위트 객실입니다.",
  },
  {
    id: 3,
    roomNumber: "301",
    roomType: "Premier Family",
    capacity: 4,
    price: 410000,
    status: "OCCUPIED",
    description: "가족 단위 고객에게 적합한 넓은 객실입니다.",
  },
];

function formatPrice(price) {
  return new Intl.NumberFormat("ko-KR").format(price);
}

function getStatusLabel(status) {
  if (status === 'AVAILABLE') return "예약 가능";
  if (status === "RESERVED") return "예약됨";
  if (status === "OCCUPIED") return "투숙 중";
  if (status === "CLEANING") return "청소 중";
  if (status === "MAINTENANCE") return "점검 중";
  return status;
}

function getStatusClass(status) {
  if (status === "AVAILABLE") return "bg-green-100 text-green-700";
  if (status === "RESERVED") return "bg-orange-100 text-orange-700";
  if (status === "OCCUPIED") return "bg-red-100 text-red-700";
  if (status === "CLEANING") return "bg-blue-100 text-blue-700";
  if (status === "MAINTENANCE") return "bg-gray-200 text-gray-700";
  return "bg-gray-100 text-gray-700";
}

function RoomsPage() {
  return (
    <section className="min-h-screen bg-[#F5F3EE] px-6 py-10 text-[#111111] md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#A88A5F]">
              Select Your Stay
            </p>
            <h1 className="text-4xl font-bold md:text-5xl">객실 선택</h1>
            <p className="mt-4 text-gray-600">
              예약 가능한 객실을 확인하고 원하는 객실을 선택하세요.
            </p>
          </div>

          <div className="rounded-3xl bg-white px-6 py-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-500">검색 조건</p>
            <p className="mt-1 text-sm text-gray-700">
              체크인 / 체크아웃 / 성인 2명
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => (
            <article
              key={room.id}
              className="overflow-hidden rounded-[28px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-56 bg-gradient-to-br from-[#3B3428] via-[#1F1F1F] to-black" />

              <div className="p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#A88A5F]">
                      Room {room.roomNumber}
                    </p>
                    <h2 className="mt-1 text-2xl font-bold">
                      {room.roomType}
                    </h2>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(room.status)}`}>
                    {getStatusLabel(room.status)}
                  </span>
                </div>

                <p className="mb-6 min-h-12 text-sm leading-6 text-gray-600">
                  {room.description}
                </p>

                <div className="flex items-center justify-between border-y border-gray-100 py-4 text-sm text-gray-600">
                  <span>기준 {room.capacity}인</span>
                  <span>1박 기준</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">가격</p>
                    <p className="text-2xl font-bold">
                      ₩{formatPrice(room.price)}
                    </p>
                  </div>

                  <button
                    disabled={room.status !== "AVAILABLE"}
                    className="rounded-2xl bg-[#111111] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#C8A97E] hover:text-black disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                  >
                    예약하기
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoomsPage;