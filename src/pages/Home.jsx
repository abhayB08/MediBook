import React from "react";
import { ArrowRight, CalendarCheck2, ShieldCheck, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">

          <div className="hero-badge">
            <span className="hero-badge-dot" />
            SMART HEALTHCARE PLATFORM
          </div>

          <h1>
            Healthcare,
            <br />
            <span>simplified.</span>
          </h1>

          <p>
            Find trusted doctors, choose an available time slot,
            and manage your appointments with MediBook.
          </p>

          <div className="hero-actions">
            <Link
              to="/doctors"
              className="primary-btn"
            >
              Find a Doctor
              <ArrowRight size={15} />
            </Link>

            <Link
              to="/register"
              className="hero-secondary-btn"
            >
              Create Account
            </Link>
          </div>

          <div className="hero-trust">

            <div>
              <ShieldCheck size={16} />

              <span>
                <b>Secure</b>
                <small>Your data stays private</small>
              </span>
            </div>

            <div>
              <CalendarCheck2 size={16} />

              <span>
                <b>Instant booking</b>
                <small>Real-time slot availability</small>
              </span>
            </div>

            <div>
              <Stethoscope size={16} />

              <span>
                <b>Verified doctors</b>
                <small>Trusted healthcare professionals</small>
              </span>
            </div>

          </div>
        </div>

        {/* Hero visual */}
        <div className="hero-visual">

          <div className="hero-card hero-card-main">

            <div className="hero-card-header">
              <span>YOUR NEXT APPOINTMENT</span>

              <div className="online-indicator">
                <i />
                Confirmed
              </div>
            </div>

            <div className="doctor-preview">

              <div className="doctor-preview-avatar">
                AP
              </div>

              <div>
                <h3>Dr. Amit Patel</h3>
                <p>Cardiologist</p>
              </div>

            </div>

            <div className="appointment-preview">

              <div>
                <small>DATE</small>
                <b>14 Aug 2026</b>
              </div>

              <div>
                <small>TIME</small>
                <b>10:00 AM</b>
              </div>

            </div>

            <div className="confirmed-bar">
              <CalendarCheck2 size={15} />
              Appointment confirmed
            </div>

          </div>

          <div className="floating-stat floating-stat-one">
            <b>24/7</b>
            <span>Easy access</span>
          </div>

          <div className="floating-stat floating-stat-two">
            <b>100%</b>
            <span>Digital booking</span>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="home-stats">

        <div>
          <b>50+</b>
          <span>Doctors</span>
        </div>

        <div>
          <b>12</b>
          <span>Specialties</span>
        </div>

        <div>
          <b>1,000+</b>
          <span>Appointments</span>
        </div>

        <div>
          <b>4.9/5</b>
          <span>Patient rating</span>
        </div>

      </section>

      {/* How it works */}
      <section className="how-section">

        <div className="section-heading">

          <span>HOW IT WORKS</span>

          <h2>
            Your appointment,
            <br />
            in three simple steps.
          </h2>

        </div>

        <div className="steps-grid">

          <div className="step-card">
            <span className="step-number">01</span>

            <h3>Find a doctor</h3>

            <p>
              Search doctors by specialty and
              explore their profiles.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>

            <h3>Choose your slot</h3>

            <p>
              Select an available date and
              appointment time.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>

            <h3>You're booked</h3>

            <p>
              Get instant confirmation and
              a personalized booking notification.
            </p>
          </div>

        </div>

      </section>

      {/* Bottom CTA */}
      <section className="home-cta">

        <div>
          <span>MEDIBOOK</span>

          <h2>
            Better healthcare
            <br />
            starts with one booking.
          </h2>
        </div>

        <Link
          to="/doctors"
          className="primary-btn"
        >
          Explore Doctors
          <ArrowRight size={15} />
        </Link>

      </section>

    </div>
  );
}