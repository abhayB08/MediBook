import {
  BarChart3,
  CalendarCheck2,
  IndianRupee,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";

import { useAppointments } from "../context/AppointmentContext";
import { useAuth } from "../context/AuthContext";

export default function DoctorAnalytics() {
  const { user } = useAuth();
  const { appointments } = useAppointments();

  const mine = appointments.filter((appointment) => appointment.doctorId === user?.id);
  const completed = mine.filter((appointment) => appointment.status === "completed");
  const revenue = completed.reduce((total, appointment) => total + appointment.fee, 0);
  const completionRate = mine.length
    ? Math.round((completed.length / mine.length) * 100)
    : 0;
  const upcoming = mine.filter((appointment) => appointment.status === "confirmed").length;
  const values = [5, 8, 6, 10, 7, 12, 9];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="doctor-module-page">
      <div className="module-head">
        <div>
          <span>PERFORMANCE CENTER</span>
          <h1>Practice analytics</h1>
          <p>
            A simple operational view of your appointment activity.
          </p>
        </div>
      </div>

      <div className="analytics-cards">
        <div>
          <Users />
          <span>PATIENTS</span>
          <b>{new Set(mine.map((appointment) => appointment.patientId)).size}</b>
          <small>Total unique patients</small>
        </div>

        <div>
          <CalendarCheck2 />
          <span>APPOINTMENTS</span>
          <b>{mine.length}</b>
          <small>All recorded visits</small>
        </div>

        <div>
          <TrendingUp />
          <span>COMPLETION</span>
          <b>{completionRate}%</b>
          <small>Appointment completion</small>
        </div>

        <div>
          <IndianRupee />
          <span>REVENUE</span>
          <b>₹{revenue}</b>
          <small>Completed consultations</small>
        </div>
      </div>

      <div className="analytics-grid">
        <section className="module-card">
          <div className="module-card-title">
            <div>
              <span>APPOINTMENT TREND</span>
              <h2>Last 7 days</h2>
            </div>
            <BarChart3 size={18} />
          </div>

          <div className="bar-chart">
            {values.map((value, index) => (
              <div className="bar-col" key={`${days[index]}-${index}`}>
                <div className="bar" style={{ height: `${value * 12}px` }} />
                <small>{days[index]}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="module-card analytics-summary">
          <span>PERFORMANCE</span>
          <h2>Healthy practice pulse</h2>

          <div>
            <b>{completed.length}</b>
            <small>completed visits</small>
          </div>
          <div>
            <b>{upcoming}</b>
            <small>upcoming visits</small>
          </div>
          <div>
            <b>24/7</b>
            <small>dashboard access</small>
          </div>
        </section>
      </div>
    </div>
  );
}
