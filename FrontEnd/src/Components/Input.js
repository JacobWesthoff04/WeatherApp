import React from "react";

export default function Input({ label, type, value, onChange, placeholder }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
