import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentContext";
import AppointmentCard from "../components/AppointmentCard";

export default function Appointments() {
  const { user } = useAuth();
  const { appointments } = useAppointments();
  const mine = appointments.filter(a => (user.role==="doctor" ? a.doctorId===user.id : a.patientId===user.id));
  return (
    <div className="listing-page">
      <section className="listing-hero"><div><span>APPOINTMENT CENTER</span><h1>{user.role==="doctor" ?
"Patient schedule." : "Your appointments."}</h1><p>Every booking, confirmation and status update in one
place.</p></div><div className="directory-stat"><CalendarDays size={19}/><span>{mine.length}<br/>total
visits</span></div></section>
      <div className="listing-container">
        {mine.length ? <div className="appointment-page-list">{mine.map(a=><AppointmentCard key={a.id} appointment={a}
doctorView={user.role==="doctor"}/>)}</div> : <div className="empty-state"><CalendarDays size={35}/><h3>No
appointments yet</h3><p>Book your first appointment to see it here.</p></div>}
      </div>
    </div>
  );
}
