import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from "react";

function App() {
  return (
    <div>
      <h1>Hello myWeather</h1>
    </div>
  );
}

export default App;
