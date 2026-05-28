import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const [searchForm, setSearchForm] = useState({
    checkInDate: "",
    checkOutDate: "",
    capacity: "2",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchRooms = () => {
    navigate(
      `/rooms?checkInDate=${searchForm.checkInDate}&checkOutDate=${searchForm.checkOutDate}&capacity=${searchForm.capacity}`
    );
  };

  return (
    <section className="min-h-screen bg-[#F5F3EE] px-6 py-10 text-[#111111] md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[36px] bg-[#111111] shadow-2xl">
          <div className="grid min-h-[720px] grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center px-8 py-14 text-white md:px-14">
              <p className="mb-5 text-sm uppercase tracking-[0.35em] text-[#C8A97E]">
                StayFlow Resort
              </p>

              <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
                원하는 날짜에
                <br />
                머물 객실을 찾으세요
              </h1>

              <p className="mb-10 max-w-xl text-base leading-8 text-gray-300 md:text-lg">
                체크인 날짜와 인원을 선택하면 예약 가능한 객실을 확인할 수 있습니다.
              </p>

              <div className="rounded-[28px] bg-white p-5 text-black shadow-2xl">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-600">
                      체크인
                    </label>
                    <input
                      name="checkInDate"
                      value={searchForm.checkInDate}
                      onChange={handleChange}
                      type="date"
                      className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none trasition focus:border-[#C8A97E]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-600">
                      체크아웃
                    </label>
                    <input
                      name="checkOutDate"
                      value={searchForm.checkOutDate}
                      onChange={handleChange}
                      type="date"
                      className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none trasition focus:border-[#C8A97E]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-600">
                      인원
                    </label>
                    <select
                      name="capacity"
                      value={searchForm.capacity}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none transition focus:border-[#C8A97E]"
                    >
                      <option>성인 1명</option>
                      <option>성인 2명</option>
                      <option>성인 3명</option>
                      <option>성인 4명</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      type="button"
                      onClick={handleSearchRooms}
                      className="block w-full rounded-2xl bg-[#C8A97E] px-5 py-4 text-center text-sm font-bold tracking-wide text-black transition hover:opacity-90"
                    >
                      객실 검색
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B3428] via-[#1F1F1F] to-black" />
              <div className="absolute inset-8 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-sm"/>

              <div className="absolute bottom-10 left-10 right-10 rounded-[28px] bg-white/10 p-7 text-white backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.2em] text-[#D8C3A5]">
                  Featured Stay
                </p>
                <h3 className="mt-3 text-3xl font-semibold">
                  Ocean Deluxe Suite
                </h3>
                <p className="mt-4 leading-7 text-gray-300">
                  오션뷰와 프라이빗 라운지를 제공하는 StayFlow의 대표 객실입니다.
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-gray-300">
                  <span>2 Guests</span>
                  <span>King Bed</span>
                  <span>Ocean View</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;