import React from "react";
import { CalendarDays, Clock3, MapPin, X } from "lucide-react";
import { useAppointments } from "../context/AppointmentContext";

export default function AppointmentCard({ appointment, doctorView = false }) {
  const { cancelAppointment, complete } = useAppointments();

  const dateText = new Date(`${appointment.date}T12:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  });

  return (
    <article className="appointment-card">
      <div className="appointment-avatar">{(doctorView ? appointment.patientName :
appointment.doctorName).replace("Dr. ","").split(" ").map(x => x[0]).slice(0,2).join("")}</div>
      <div className="appointment-content">
        <div className="appointment-head">
          <div>
            <span className="eyebrow">{doctorView ? "PATIENT" : "DOCTOR"}</span>
            <h3>{doctorView ? appointment.patientName : appointment.doctorName}</h3>
            <p>{appointment.department}</p>
          </div>
          <span className={`status-badge ${appointment.status}`}>{appointment.status.toUpperCase()}</span>
        </div>
        <div className="appointment-meta">
          <span><CalendarDays size={12}/>{dateText}</span>
          <span><Clock3 size={12}/>{appointment.time}</span>
          <span><MapPin size={12}/>MediBook Clinic</span>
        </div>
        <div className="appointment-actions">
          {doctorView && appointment.status === "confirmed" && <button className="small-success" onClick={() =>
complete(appointment.id)}>Mark completed</button>}
          {appointment.status === "confirmed" && <button className="small-danger" onClick={() =>
cancelAppointment(appointment.id)}><X size={12}/> Cancel</button>}
        </div>
      </div>
    </article>
  );
}
