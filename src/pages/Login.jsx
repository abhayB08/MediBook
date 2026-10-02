import React, { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, Stethoscope } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    if (result.user.role === "doctor") {
      navigate("/doctor/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* Left information panel */}
        <div className="auth-info">

          <Link to="/" className="auth-brand">
            <span className="auth-brand-icon">
              <Stethoscope size={20} />
            </span>

            <span>
              <b>MediBook</b>
              <small>SMART HEALTHCARE</small>
            </span>
          </Link>

          <div className="auth-info-content">
            <span className="auth-eyebrow">
              HEALTHCARE MADE SIMPLE
            </span>

            <h1>
              Your health.
              <br />
              Your schedule.
            </h1>

            <p>
              Access your MediBook account to manage
              appointments, doctors and healthcare
              services in one place.
            </p>
          </div>

          <div className="auth-info-footer">
            <span>Secure</span>
            <span>Simple</span>
            <span>Reliable</span>
          </div>

        </div>

        {/* Login panel */}
        <div className="auth-form-wrapper">

          <div className="auth-form-card">

            <div className="auth-heading">
              <span>WELCOME BACK</span>

              <h2>
                Sign in to MediBook
              </h2>

              <p>
                Enter your account details to continue.
              </p>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="form-group">

                <label htmlFor="email">
                  Email address
                </label>

                <div className="input-with-icon">

                  <Mail size={16} />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                  />

                </div>

              </div>

              {/* Password */}
              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="input-with-icon">

                  <LockKeyhole size={16} />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>

                </div>

              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading
                  ? "Signing in..."
                  : "Sign in"}
              </button>

            </form>

            {/* Demo accounts */}
            <div className="demo-login">

              <div className="demo-login-title">
                DEMO ACCOUNTS
              </div>

              <div className="demo-account">
                <div>
                  <b>Patient</b>
                  <small>
                    patient@medibook.demo
                  </small>
                </div>

                <span>
                  patient123
                </span>
              </div>

              <div className="demo-account">
                <div>
                  <b>Doctor</b>
                  <small>
                    amit@medibook.demo
                  </small>
                </div>

                <span>
                  doctor123
                </span>
              </div>

            </div>

            <div className="auth-register">

              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create account
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}