import { useState } from "react";
import { ArrowRight, CheckCircle2, Stethoscope } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form,setForm] = useState({name:"",email:"",phone:"",age:"",password:""});
  const [error,setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const result = register(form);
    if (!result.success) return setError(result.message);
    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <div className="auth-shell register-shell">
        <section className="auth-brand-panel">
          <Link to="/" className="auth-brand-logo"><Stethoscope size={20}/> MediBook</Link>
          <span className="auth-kicker">PATIENT REGISTRATION</span>
          <h1>Your care, <em>organized.</em></h1>
          <p>Create a patient account to discover doctors, book available slots and receive personalized booking
confirmations.</p>
          <div className="auth-benefits"><span><CheckCircle2 size={14}/> Automatic appointment
confirmation</span><span><CheckCircle2 size={14}/> Personalized simulated SMS</span><span><CheckCircle2 size={14}/>
Patient appointment history</span></div>
        </section>
        <section className="auth-form-panel">
          <div className="auth-heading"><span>CREATE ACCOUNT</span><h2>Start with your details.</h2><p>Patient
accounts only. Doctor accounts are managed by MediBook.</p></div>
          <form className="auth-form register-form" onSubmit={submit}>
            <div className="two-col"><label>Full name<input value={form.name}
onChange={e=>setForm({...form,name:e.target.value})} required/></label><label>Age<input type="number" min="1"
value={form.age} onChange={e=>setForm({...form,age:e.target.value})} required/></label></div>
            <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
required/></label>
            <label>Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}
required/></label>
            <label>Password<input type="password" minLength="6" value={form.password}
onChange={e=>setForm({...form,password:e.target.value})} required/></label>
            {error && <div className="form-error">{error}</div>}
            <button className="primary-btn full-btn">Create patient account <ArrowRight size={14}/></button>
          </form>
          <p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p>
        </section>
      </div>
    </div>
  );
}
