import { useEffect, useState } from "react";

export default function WeatherPage() {
  const [zip, setZip] = useState("64093");
  const [weather, setWeather] = useState(null);

  async function getWeather() {
    const res = await fetch(
      `http://localhost:3010/api/weather?zip=${zip}`
    );

    const data = await res.json();
    setWeather(data);
  }

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="weather-container">
      <h1>Current Weather</h1>

      <div className="weather-box">
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Enter ZIP..."
        />
        <button onClick={getWeather}>Search</button>

        {weather ? (
          <div className="weather-result">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>Temperature: {weather.main.temp}°F</p>
            <p>Humidity: {weather.main.humidity}%</p>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    </div>
  );
}
