import { ArrowRight, CalendarCheck2, Clock3, HeartPulse, Plus, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentContext";
import AppointmentCard from "../components/AppointmentCard";
import React from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const { appointments } = useAppointments();
  const mine = appointments.filter(a => a.patientId === user?.id && a.status !== "cancelled");
  const upcoming = mine.filter(a => a.status === "confirmed");
  const completed = mine.filter(a => a.status === "completed");

  return (
    <div className="dashboard-page-v2">
      <div className="dashboard-wrap">
        <div className="dashboard-hero"><div><span>PATIENT DASHBOARD</span><h1>Good morning,
{user?.name}.</h1><p>Everything you need for your upcoming care is in one place.</p></div><Link
className="primary-btn" to="/doctors"><Plus size={15}/> Book appointment</Link></div>
        <div className="stats-row"><div><span>UPCOMING</span><b>{upcoming.length}</b><small>confirmed
visits</small></div><div><span>COMPLETED</span><b>{completed.length}</b><small>past
visits</small></div><div><span>DOCTORS</span><b>100+</b><small>verified
specialists</small></div><div><span>STATUS</span><b className="stat-green">Good</b><small>care plan
active</small></div></div>
        <div className="dashboard-content-grid">
          <section className="dashboard-panel-v2">
            <div className="panel-title"><div><span>YOUR SCHEDULE</span><h2>Upcoming appointments</h2></div><Link
to="/appointments">View all <ArrowRight size={12}/></Link></div>
            {upcoming.length ? <div className="appointment-list-v2">{upcoming.slice(0,3).map(a=><AppointmentCard
key={a.id} appointment={a}/>)}</div> : <div className="empty-state compact"><CalendarCheck2 size={30}/><h3>No upcoming
appointments</h3><p>Book a visit with one of our verified doctors.</p><Link className="primary-btn" to="/doctors">Find
a doctor</Link></div>}
          </section>
          <aside className="care-card"><ShieldCheck size={22}/><span>MEDIBOOK CARE</span><h2>Simple booking. Better
organization.</h2><p>Your selected slot is protected from duplicate booking. Once confirmed, your appointment appears
here automatically.</p><div className="care-list"><span><HeartPulse size={14}/> Verified
specialists</span><span><Clock3 size={14}/> Real-time slots</span><span><Users size={14}/> Separate doctor & patient
views</span></div></aside>
        </div>
      </div>
    </div>
  );
}
