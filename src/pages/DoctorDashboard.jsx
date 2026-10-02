import {
  Activity,
  ArrowRight,
  Bell,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Plus,
  UserRound,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AppointmentCard from "../components/AppointmentCard";
import { useAppointments } from "../context/AppointmentContext";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const { appointments } = useAppointments();

  const mine = appointments.filter((appointment) => appointment.doctorId === user?.id);
  const confirmed = mine.filter((appointment) => appointment.status === "confirmed");
  const completed = mine.filter((appointment) => appointment.status === "completed");
  const revenue = completed.reduce((total, appointment) => total + appointment.fee, 0);
  const uniquePatients = new Set(mine.map((appointment) => appointment.patientId)).size;
  const completionRate = mine.length
    ? Math.round((completed.length / mine.length) * 100)
    : 0;

  return (
    <div className="doctor-command-page">
      <div className="doctor-command-wrap">
        <div className="doctor-command-top">
          <div>
            <span>MEDIBOOK • DOCTOR COMMAND CENTER</span>
            <h1>
              Good morning, {user?.name?.replace("Dr. ", "")}.
            </h1>
            <p>
              Manage patients, consultations and your practice from one workspace.
            </p>
          </div>

          <div className="doctor-actions">
            <Link className="secondary-action" to="/doctor/schedule">
              <Clock3 size={14} />
              Manage schedule
            </Link>
            <Link className="primary-btn" to="/doctor/consultations">
              <Plus size={14} />
              Start consultation
            </Link>
          </div>
        </div>

        <div className="doctor-kpis">
          <div>
            <span>
              <CalendarCheck2 /> TODAY'S APPOINTMENTS
            </span>
            <b>{confirmed.length}</b>
            <small>confirmed in queue</small>
          </div>
          <div>
            <span>
              <Users /> PATIENTS
            </span>
            <b>{uniquePatients}</b>
            <small>unique patients</small>
          </div>
          <div>
            <span>
              <CheckCircle2 /> COMPLETED
            </span>
            <b>{completed.length}</b>
            <small>consultations completed</small>
          </div>
          <div>
            <span>
              <IndianRupee /> REVENUE
            </span>
            <b>₹{revenue}</b>
            <small>completed consultation value</small>
          </div>
        </div>

        <div className="doctor-command-grid">
          <section className="doctor-schedule-panel">
            <div className="module-card-title">
              <div>
                <span>TODAY'S SCHEDULE</span>
                <h2>Patient queue</h2>
              </div>
              <Link to="/doctor/appointments">
                View all <ArrowRight size={12} />
              </Link>
            </div>

            {mine.length ? (
              <div className="appointment-list-v2">
                {mine.slice(0, 4).map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    doctorView
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state compact">
                <CalendarCheck2 />
                <h3>No appointments</h3>
                <p>New bookings appear here automatically.</p>
              </div>
            )}
          </section>

          <aside className="doctor-side-stack">
            <div className="doctor-quick">
              <span>QUICK ACTIONS</span>

              <Link to="/doctor/patients">
                <UserRound size={15} />
                <div>
                  <b>Patients</b>
                  <small>Review patient records</small>
                </div>
                <ArrowRight size={13} />
              </Link>

              <Link to="/doctor/schedule">
                <Clock3 size={15} />
                <div>
                  <b>Availability</b>
                  <small>Edit working hours</small>
                </div>
                <ArrowRight size={13} />
              </Link>

              <Link to="/doctor/notifications">
                <Bell size={15} />
                <div>
                  <b>Notifications</b>
                  <small>Booking activity</small>
                </div>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="doctor-status-card">
              <Activity size={18} />
              <span>LIVE PRACTICE STATUS</span>
              <h3>You're accepting appointments</h3>
              <p>
                Patients can book your available slots right now.
              </p>
              <Link to="/doctor/profile">Manage profile →</Link>
            </div>
          </aside>
        </div>

        <div className="doctor-bottom-grid">
          <div className="doctor-mini-card">
            <span>COMPLETION RATE</span>
            <b>{completionRate}%</b>
            <div className="progress-line">
              <i style={{ width: `${completionRate}%` }} />
            </div>
            <small>Based on recorded appointments</small>
          </div>

          <div className="doctor-mini-card">
            <span>CLINICAL WORKSPACE</span>
            <b>Ready</b>
            <small>
              Open a patient consultation to record diagnosis and prescription.
            </small>
            <Link to="/doctor/consultations">
              Open workspace <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
