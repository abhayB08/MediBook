import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";

export default function DoctorCard({ doctor }) {
  return (
    <article className="doctor-card">
      <div className={`doctor-art ${doctor.color}`}>
        <span className="verified-pill"><BadgeCheck size={11}/> Verified</span>
        <div className="doctor-monogram">{doctor.initials}</div>
      </div>
      <div className="doctor-card-body">
        <div className="doctor-rating"><Star size={12}
fill="currentColor"/><b>{doctor.rating}</b><span>({doctor.reviews})</span></div>
        <h3>{doctor.name}</h3>
        <p>{doctor.specialization}</p>
        <div className="doctor-card-meta">
          <span>{doctor.experience} years experience</span>
          <strong>₹{doctor.fee}</strong>
        </div>
        <Link className="card-link" to={`/doctors/${doctor.id}`}>View profile <ArrowRight size={13}/></Link>
      </div>
    </article>
  );
}
