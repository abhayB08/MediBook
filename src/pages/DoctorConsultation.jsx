import { FileText, Save, Stethoscope } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentContext";
import React from "react";

export default function DoctorConsultation() {
  const { user } = useAuth();
  const { appointments, complete } = useAppointments();
  const patients = appointments.filter(a=>a.doctorId===user?.id && a.status==="confirmed");
  const [selected,setSelected] = useState(patients[0]?.id || "");
  const [form,setForm] = useState({symptoms:"",diagnosis:"",medicine:"",dosage:"",notes:""});
  const appointment=appointments.find(a=>a.id===selected);
  function save(){ if(appointment) complete(appointment.id); alert("Consultation saved successfully."); }
  return <div className="doctor-module-page">
    <div className="module-head"><div><span>CLINICAL WORKSPACE</span><h1>Consultation room</h1><p>Record consultation
notes and prescription details.</p></div></div>
    <div className="consult-layout">
      <aside className="module-card consultation-patients"><span>WAITING QUEUE</span>{patients.map(a=><button
className={selected===a.id?"active":""} key={a.id}
onClick={()=>setSelected(a.id)}><b>{a.patientName}</b><small>{a.time} ·
{a.department}</small></button>)}{!patients.length&&<p className="muted-box">No patients waiting.</p>}</aside>
      <section className="module-card consultation-form"><div className="consult-patient"><div
className="consult-avatar">{appointment?.patientName?.slice(0,1)||"?"}</div><div><span>ACTIVE
PATIENT</span><h2>{appointment?.patientName||"Select a patient"}</h2><small>{appointment ?
`${appointment.date} · ${appointment.time}` : "Choose a patient from the queue"}</small></div></div>
        <div className="consult-fields"><label>Symptoms<textarea value={form.symptoms}
onChange={e=>setForm({...form,symptoms:e.target.value})}
placeholder="Describe reported symptoms..."/></label><label>Diagnosis<textarea value={form.diagnosis}
onChange={e=>setForm({...form,diagnosis:e.target.value})} placeholder="Clinical diagnosis..."/></label><div
className="two-col"><label>Medicine<input value={form.medicine}
onChange={e=>setForm({...form,medicine:e.target.value})}
placeholder="e.g. Paracetamol 500mg"/></label><label>Dosage<input value={form.dosage}
onChange={e=>setForm({...form,dosage:e.target.value})}
placeholder="e.g. 1 tablet twice daily"/></label></div><label>Doctor notes<textarea value={form.notes}
onChange={e=>setForm({...form,notes:e.target.value})}
placeholder="Additional instructions and follow-up notes..."/></label></div>
        <button className="primary-btn" disabled={!appointment} onClick={save}><Save size={14}/> Save
consultation</button>
      </section>
    </div>
  </div>
}
