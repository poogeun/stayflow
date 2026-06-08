import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherByDate(date) {
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: "Seoul",
      appid: API_KEY,
      units: "metric",
      lang: "kr",
      cnt: 40,
    },
  });

  const targetDate = date.slice(0, 10);

  const filtered = res.data.list.filter((item) =>
    item.dt_txt.startsWith(targetDate)
  );

  if(filtered.length === 0) return null;

  const temps = filtered.map((item) => item.main.temp);
  const icon = filtered[Math.floor(filtered.length / 2)].weather[0].icon;
  const description = filtered[Math.floor(filtered.length / 2)].weather[0].description;

  return {
    date: targetDate,
    tempMax: Math.round(Math.max(...temps)),
    tempMin: Math.round(Math.min(...temps)),
    icon,
    description,
  };
}