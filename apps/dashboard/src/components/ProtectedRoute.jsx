import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { getCurrentUser } from "../utils/api";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        setUser(response.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to the frontend login page
      const configuredUrl = import.meta.env.VITE_FRONTEND_URL;
      let frontendBaseUrl;
      
      if (configuredUrl) {
        frontendBaseUrl = configuredUrl;
      } else {
        const { protocol, hostname, port } = window.location;
        const frontendPort = port === '5174' ? '5173' : port === '3001' ? '3000' : port;
        frontendBaseUrl = `${protocol}//${hostname}${frontendPort ? `:${frontendPort}` : ''}/`;
      }
      
      const cleanBaseUrl = frontendBaseUrl.endsWith("/") ? frontendBaseUrl : `${frontendBaseUrl}/`;
      window.location.href = `${cleanBaseUrl}login`;
    }
  }, [loading, user]);

  if (loading || !user) {
    return (
      <div style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#070913",
        color: "#ffffff",
        fontFamily: "sans-serif"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px"
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "3px solid rgba(0, 240, 255, 0.1)",
            borderTop: "3px solid #00f0ff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }}></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <span style={{
            fontSize: "14px",
            color: "#94a3b8",
            fontWeight: "500",
            letterSpacing: "0.5px"
          }}>
            Verifying Session...
          </span>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
