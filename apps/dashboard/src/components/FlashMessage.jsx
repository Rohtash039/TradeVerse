import React from "react";
import { useFlash } from "../context/FlashContext";
import "./FlashMessage.css";

export default function FlashMessage() {
  const { messages, removeFlash } = useFlash();

  if (messages.length === 0) return null;

  return (
    <div className="flash-container">
      {messages.map((msg) => (
        <div key={msg.id} className={`flash-message flash-${msg.type}`}>
          <span className="flash-text">{msg.text}</span>
          <button className="flash-close" onClick={() => removeFlash(msg.id)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
