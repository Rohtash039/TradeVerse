import { Mail, ShieldCheck, UserRound } from "lucide-react";
import "./ProfilePage.css";

export default function ProfilePage({ user }) {
  const displayName = user?.displayName || "TradeVerse User";
  const email = user?.email || "No email connected";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="profile-page">
      <div className="profile-page-header">
        <div>
          <h1 className="profile-page-title">Profile</h1>
          <span className="profile-page-subtitle">Your TradeVerse account details</span>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-card-main">
          {user?.photoURL ? (
            <img className="profile-avatar" src={user.photoURL} alt={displayName} />
          ) : (
            <div className="profile-avatar profile-avatar-fallback">{initials}</div>
          )}

          <div className="profile-identity">
            <h2 className="profile-name">{displayName}</h2>
            <div className="profile-email">
              <Mail size={16} />
              <span>{email}</span>
            </div>
          </div>
        </div>

        <div className="profile-status">
          <ShieldCheck size={16} />
          <span>{user?.emailVerified ? "Verified account" : "Email not verified"}</span>
        </div>
      </div>

      <div className="profile-details">
        <div className="profile-detail-card">
          <UserRound size={18} />
          <div>
            <span className="profile-detail-label">User ID</span>
            <strong className="profile-detail-value">{user?.uid || "Unavailable"}</strong>
          </div>
        </div>

        <div className="profile-detail-card">
          <Mail size={18} />
          <div>
            <span className="profile-detail-label">Sign-in Email</span>
            <strong className="profile-detail-value">{email}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}