import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";
import { doctors } from "../data/doctors";
import React from "react";

export default function Doctors() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState(params.get("department") || "All specialties");

  const list = useMemo(() => doctors.filter(d => {
    const q = search.toLowerCase();
    const matchesSearch = !q || `${d.name} ${d.specialization} ${d.department}`.toLowerCase().includes(q);
    const matchesDepartment = department === "All specialties" || d.department === department;
    return matchesSearch && matchesDepartment;
  }), [search, department]);

  return (
    <div className="listing-page">
      <section className="listing-hero"><div><span>DOCTOR DIRECTORY</span><h1>Find the right doctor.</h1><p>Verified
specialists with transparent fees and available appointment slots.</p></div><div
className="directory-stat"><b>{doctors.length}</b><span>specialists<br/>available</span></div></section>
      <div className="listing-container">
        <div className="filter-bar">
          <label className="search-field"><Search size={16}/><input value={search}
onChange={e=>setSearch(e.target.value)} placeholder="Search doctor, specialty or department"/></label>
          <label className="select-field"><SlidersHorizontal size={15}/><select value={department}
onChange={e=>setDepartment(e.target.value)}><option>All
specialties</option>{[...new Set(doctors.map(d=>d.department))].map(x=><option key={x}>{x}</option>)}</select></label>
        </div>
        <div className="listing-result-head"><div><span>RESULTS</span><h2>{list.length} doctors
available</h2></div><span className="result-note">Updated today</span></div>
        <div className="doctor-grid-v2">{list.map(d=><DoctorCard key={d.id} doctor={d}/>)}</div>
        {!list.length && <div className="empty-state"><Search size={28}/><h3>No doctors found</h3><p>Try another
specialty or search term.</p></div>}
      </div>
    </div>
  );
}
