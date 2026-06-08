function getWeatherEmoji(icon) {
  const code = icon.slice(0, 2);
  const map = {
    "01": "☀️",
    "02": "🌤️",
    "03": "⛅",
    "04": "☁️",
    "09": "🌧️",
    "10": "🌦️",
    "11": "⛈️",
    "13": "🌨️",
    "50": "🌫️",
  };
  return map[code] ?? "🌡️";
}

function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="mx-auto mt-6 max-w-xl rounded-3xl bg-[#F5F3EE] px-8 py-5">
      <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[#A88A5F]">
        Check-in Weather
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-5xl">{getWeatherEmoji(weather.icon)}</span>
          <p className="text-lg font-semibold capitalize">{weather.description}</p>
        </div>        
        <div className="text-right">
          <p className="text-2xl font-bold">{weather.tempMax}°</p>
          <p className="text-sm text-gray-500">최저 {weather.tempMin}°</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;