import React, { useState } from "react";
import {
  Bell,
  BarChart3,
  ChevronDown,
  Clock3,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const signOut = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="app-shell">
      {/* ================= HEADER ================= */}

      <header className="topbar">
        <div className="topbar-inner">

          {/* Brand */}
          <Link className="brand" to="/">
            <span className="brand-mark">
              <Stethoscope size={19} />
            </span>

            <span>
              <b>MediBook</b>
              <small>SMART HEALTHCARE</small>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="main-nav">

            {user?.role === "doctor" ? (
              <>
                <NavLink to="/doctor/dashboard">
                  Dashboard
                </NavLink>

                <NavLink to="/doctor/appointments">
                  Appointments
                </NavLink>

                <NavLink to="/doctor/patients">
                  Patients
                </NavLink>

                <NavLink to="/doctor/schedule">
                  Schedule
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" end>
                  Home
                </NavLink>

                <NavLink to="/doctors">
                  Find Doctors
                </NavLink>

                {user && (
                  <NavLink to="/appointments">
                    Appointments
                  </NavLink>
                )}
              </>
            )}

          </nav>

          {/* Right side */}
          <div className="top-actions">

            {user ? (
              <>
                {/* Notification */}
                <button
                  className="icon-btn"
                  aria-label="Notifications"
                  onClick={() => {
                    if (user.role === "doctor") {
                      navigate("/doctor/notifications");
                    }
                  }}
                >
                  <Bell size={17} />

                  <i className="notification-dot" />
                </button>

                {/* User menu */}
                <div className="profile-menu">

                  <button
                    className="user-chip"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="avatar-small">
                      {user.name
                        ?.slice(0, 1)
                        .toUpperCase()}
                    </span>

                    <span className="user-chip-text">
                      <b>{user.name}</b>

                      <small>
                        {user.role}
                      </small>
                    </span>

                    <ChevronDown size={14} />
                  </button>

                  {open && (
                    <div className="dropdown">

                      {user.role === "doctor" && (
                        <>
                          <Link to="/doctor/dashboard">
                            <LayoutDashboard size={14} />
                            Dashboard
                          </Link>

                          <Link to="/doctor/patients">
                            <Users size={14} />
                            Patients
                          </Link>

                          <Link to="/doctor/schedule">
                            <Clock3 size={14} />
                            Schedule
                          </Link>

                          <Link to="/doctor/consultations">
                            <FileText size={14} />
                            Consultations
                          </Link>

                          <Link to="/doctor/analytics">
                            <BarChart3 size={14} />
                            Analytics
                          </Link>

                          <Link to="/doctor/notifications">
                            <Bell size={14} />
                            Notifications
                          </Link>
                        </>
                      )}

                      {/* Profile */}
                      <Link
                        to={
                          user.role === "doctor"
                            ? "/doctor/profile"
                            : "/profile"
                        }
                      >
                        <UserRound size={14} />
                        Profile
                      </Link>

                      {/* Logout */}
                      <button onClick={signOut}>
                        <LogOut size={14} />
                        Sign out
                      </button>

                    </div>
                  )}

                </div>
              </>
            ) : (
              <Link
                className="login-btn"
                to="/login"
              >
                Sign in
              </Link>
            )}

            {/* Mobile menu */}
            <button className="mobile-menu icon-btn">
              <Menu size={17} />
            </button>

          </div>

        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main>
        {children}
      </main>
    </div>
  );
}