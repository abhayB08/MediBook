import { Bell, CalendarCheck2, CheckCircle2, Clock3 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentContext";
import React from "react";

export default function DoctorNotifications(){
 const {user}=useAuth(); const {appointments}=useAppointments();
const mine=appointments.filter(a=>a.doctorId===user?.id);
 return <div className="doctor-module-page"><div className="module-head"><div><span>NOTIFICATION
CENTER</span><h1>Notifications</h1><p>Recent booking and schedule activity.</p></div></div>
 <div className="notifications-list">{mine.length?mine.map(a=><div className="notification-card" key={a.id}><div
className="notification-icon"><Bell size={16}/></div><div><b>{a.patientName} booked an appointment</b><p>{a.date} at
{a.time} · {a.department}</p></div><span className={`status-badge ${a.status}`}>{a.status}</span></div>):<div
className="empty-state"><Bell size={30}/><h3>No notifications</h3></div>}</div>
 </div>
}
