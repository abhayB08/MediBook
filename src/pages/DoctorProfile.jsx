import { ArrowRight, BadgeCheck, CalendarDays, Clock3, HeartPulse, MapPin, ShieldCheck, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { doctors } from "../data/doctors";
import React from "react";

export default function DoctorProfile() {
  const { id } = useParams();
  const doctor = doctors.find(d => d.id === id);
  if (!doctor) return <div className="page-center"><div className="big-404">404</div><h2>Doctor not found</h2><Link
className="primary-btn" to="/doctors">Back to doctors</Link></div>;

  return (
    <div className="profile-page">
      <div className="profile-wrap">
        <div className={`doctor-detail-card`}>
          <div className={`detail-portrait ${doctor.color}`}>
            <span className="detail-verified"><BadgeCheck size={13}/> Verified specialist</span>
            <div className="detail-monogram">{doctor.initials}</div>
            <div className="detail-portrait-footer"><span><HeartPulse size={14}/> Patient-first
care</span><span><ShieldCheck size={14}/> Verified profile</span></div>
          </div>
          <div className="detail-copy">
            <span className="detail-kicker">{doctor.department.toUpperCase()}</span>
            <h1>{doctor.name}</h1>
            <div className="detail-specialty">{doctor.specialization}</div>
            <div className="detail-rating"><Star size={15}
fill="currentColor"/><b>{doctor.rating}</b><span>{doctor.reviews} patient reviews</span></div>
            <p className="detail-about">{doctor.about}</p>
            <div className="detail-facts">
              <div><span>EXPERIENCE</span><b>{doctor.experience} years</b></div>
              <div><span>CONSULTATION</span><b>₹{doctor.fee}</b></div>
              <div><span>AVAILABILITY</span><b className="green-text">Today</b></div>
            </div>
            <div className="detail-info-row"><span><Clock3 size={14}/> 20 min consultation</span><span><MapPin
size={14}/> MediBook Clinic</span></div>
            <div className="detail-action"><div><small>Next available</small><b>Today · 09:00 AM</b></div><Link
className="primary-btn" to={`/book/${doctor.id}`}>Book appointment <ArrowRight size={15}/></Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}
