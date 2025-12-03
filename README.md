import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  function validatePassword(p) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&*]).{8,}$/;
    return regex.test(p);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      return setError("Email must be a valid email address.");
    }

    if (!validatePassword(pass)) {
      return setError(
        "Password must be 8+ chars, include 1 capital, 1 number, and 1 special character (!, #, $, %, & , *)."
      );
    }

    const response = await fetch("http://localhost:3010/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: email, password: pass })
    });

    if (response.status === 201) {
      nav("/weather");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <h1>myWeather Login</h1>

      <form className="login-box" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}


WeatherPage.js

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


app.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WeatherPage from "./pages/WeatherPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/weather" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
