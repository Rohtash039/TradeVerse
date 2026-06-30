import React, { createContext, useContext, useState, useCallback } from "react";

const FlashContext = createContext(null);

export const useFlash = () => {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error("useFlash must be used within a FlashProvider");
  }
  return context;
};

export const FlashProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const showFlash = useCallback((text, type = "success") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setMessages((prev) => [...prev, { id, text, type }]);
    
    // Auto dismiss after 4 seconds
    setTimeout(() => {
      removeFlash(id);
    }, 4000);
  }, []);

  const removeFlash = useCallback((id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  return (
    <FlashContext.Provider value={{ messages, showFlash, removeFlash }}>
      {children}
    </FlashContext.Provider>
  );
};
