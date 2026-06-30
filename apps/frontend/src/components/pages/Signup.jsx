import { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { Activity, TrendingUp, Shield, Zap } from "lucide-react";

import { auth } from "../../firebase";
import "./Login.css";
import { useFlash } from "../../context/FlashContext";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const createSessionAndSync = async (user) => {
  const idToken = await user.getIdToken(true);

  const sessionResponse = await fetch(`${API_BASE_URL}/auth/session`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!sessionResponse.ok) {
    throw new Error("Unable to create login session");
  }

  const syncResponse = await fetch(`${API_BASE_URL}/auth/sync`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!syncResponse.ok) {
    throw new Error("Unable to sync user profile");
  }
};
const GoogleIcon = () => (
  <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { showFlash } = useFlash();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showFlash("Account Created", "success");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      showFlash(error.message, "error");
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      await createSessionAndSync(userCredential.user);
      showFlash("Account Created & Logged In", "success");

      setTimeout(() => {
        window.location.href = "http://localhost:5174";
      }, 1500);
    } catch (error) {
      showFlash(error.message, "error");
    }
  };

  return (
    <div className="auth-split-container frontend-auth-container">
      <div className="auth-graphic-side">
        <div className="graphic-content">
          <div className="graphic-logo">
            <Activity color="#00f0ff" size={32} />
            <span className="graphic-logo-text">
              Trade<span className="gradient-text">Verse</span>
            </span>
          </div>
          <h2 className="graphic-title">Start Trading in Minutes</h2>
          <p className="graphic-subtitle">
            Create an account to build your virtual trading portfolio, monitor live market categories, and execute spot/futures mock contracts.
          </p>
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon-wrap">
                <TrendingUp size={18} />
              </div>
              <div className="feature-text-wrap">
                <span className="feature-title">High Speed Execution</span>
                <span className="feature-desc">Execute trades instantly with low latency routing.</span>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrap">
                <Shield size={18} />
              </div>
              <div className="feature-text-wrap">
                <span className="feature-title">Secure & Regulated</span>
                <span className="feature-desc">All transactions are secured with military-grade encryption.</span>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrap">
                <Zap size={18} />
              </div>
              <div className="feature-text-wrap">
                <span className="feature-title">Up to 100x Leverage</span>
                <span className="feature-desc">Maximize capital efficiency across all major crypto pairs.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <form className="signup-form" onSubmit={handleSignup}>
          <h1>Create Account</h1>
          <p className="auth-subtitle">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Signup
          </button>

          <div className="auth-divider">OR</div>

          <button type="button" className="google-btn" onClick={handleGoogleSignup}>
            <GoogleIcon />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}
