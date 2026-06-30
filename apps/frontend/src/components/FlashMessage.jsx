import React from "react";
import { useFlash } from "../context/FlashContext";
import "./FlashMessage.css";

const alertClassByType = {
  success: "alert-success",
  error: "alert-danger",
  danger: "alert-danger",
  warning: "alert-warning",
  info: "alert-info",
};

export default function FlashMessage() {
  const { messages, removeFlash } = useFlash();

  if (messages.length === 0) return null;

  return (
    <div className="flash-container">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`alert ${alertClassByType[msg.type] || "alert-info"} alert-dismissible fade show col-6 offset-3`}
          role="alert"
        >
          {msg.text}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => removeFlash(msg.id)}
          />
        </div>
      ))}
    </div>
  );
}
