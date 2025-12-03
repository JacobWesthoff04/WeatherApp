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
