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
