import { CheckCircle2, MessageSquareText, X } from "lucide-react";
import React from "react";

export default function SmsModal({ appointment, patientName, onClose }) {
  if (!appointment) return null;
  const dateText = new Date(`${appointment.date}T12:00:00`).toLocaleDateString("en-IN", { day:"2-digit", month:"long",
year:"numeric" });

  return (
    <div className="modal-backdrop">
      <div className="sms-modal">
        <button className="modal-close" onClick={onClose}><X size={17}/></button>
        <div className="success-icon"><CheckCircle2 size={26}/></div>
        <div className="sms-modal-heading">
          <span>APPOINTMENT CONFIRMED</span>
          <h2>Your appointment is booked.</h2>
          <p>Dear <b>{patientName}</b>, your appointment has been automatically confirmed.</p>
        </div>
        <div className="phone-screen">
          <div className="sms-header"><MessageSquareText size={15}/> MediBook SMS</div>
          <p>Dear {patientName}, your appointment with {appointment.doctorName} is confirmed for {dateText} at
{appointment.time}. Appointment ID: {appointment.id}. Please arrive 10 minutes early.</p>
        </div>
        <div className="sms-info">
          <div><span>DOCTOR</span><b>{appointment.doctorName}</b></div>
          <div><span>DATE</span><b>{dateText}</b></div>
          <div><span>TIME</span><b>{appointment.time}</b></div>
          <div><span>APPOINTMENT ID</span><b>{appointment.id}</b></div>
        </div>
        <div className="sms-actions">
          <button className="primary-btn full-btn" onClick={onClose}>View my appointments</button>
        </div>
      </div>
    </div>
  );
}
