import { Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { doctors } from "../data/doctors";
import React from "react";

export default function Profile({ doctorMode=false }) {
  const { user } = useAuth();
  const doctor = doctorMode ? doctors.find(d=>d.email===user?.email) : null;
  const p = doctor || user;
  return (
    <div className="profile-page">
      <div className="profile-wrap">
        <div className={`patient-profile-card ${doctor?.color || "blue"}`}>
          <div className="profile-banner"><div className="profile-avatar">{doctor?.initials ||
p?.name?.slice(0,1)}</div><span><ShieldCheck size={13}/> Verified MediBook profile</span></div>
          <div className="profile-body">
            <span>{doctorMode ? "DOCTOR PROFILE" : "PATIENT PROFILE"}</span>
            <h1>{p?.name}</h1>
            <p>{doctor?.specialization || "MediBook patient"}</p>
            <div className="profile-info-grid">
              <div><Mail size={15}/><small>Email</small><b>{p?.email}</b></div>
              <div><Phone size={15}/><small>Phone</small><b>{p?.phone || "Not added"}</b></div>
              <div><UserRound size={15}/><small>Role</small><b>{doctorMode ? "Doctor" : "Patient"}</b></div>
              <div><ShieldCheck size={15}/><small>{doctorMode ? "Experience" : "Age"}</small><b>{doctorMode ?
`${doctor.experience} years` : p?.age || "—"}</b></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
