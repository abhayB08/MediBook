import {
  CalendarDays,
  ChevronRight,
  Search,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useAppointments } from "../context/AppointmentContext";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function DoctorPatients() {
  const { user } = useAuth();
  const { appointments } = useAppointments();
  const [query, setQuery] = useState("");

  const patients = useMemo(() => {
    const patientMap = new Map();

    appointments
      .filter((appointment) => appointment.doctorId === user?.id)
      .forEach((appointment) => {
        if (!patientMap.has(appointment.patientId)) {
          patientMap.set(appointment.patientId, {
            id: appointment.patientId,
            name: appointment.patientName,
            visits: 0,
            last: appointment.date,
            department: appointment.department,
            status: appointment.status,
          });
        }

        const patient = patientMap.get(appointment.patientId);
        patient.visits += 1;

        if (appointment.date > patient.last) {
          patient.last = appointment.date;
        }
      });

    return [...patientMap.values()].filter((patient) =>
      patient.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [appointments, user, query]);

  return (
    <div className="doctor-module-page">
      <div className="module-head">
        <div>
          <span>PATIENT MANAGEMENT</span>
          <h1>Your patients</h1>
          <p>Review patient activity and appointment history.</p>
        </div>

        <div className="module-count">
          <b>{patients.length}</b>
          <small>patients</small>
        </div>
      </div>

      <div className="module-toolbar">
        <label className="search-field">
          <Search size={15} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search patient"
          />
        </label>
      </div>

      <div className="patient-table">
        <div className="table-row table-head">
          <span>Patient</span>
          <span>Department</span>
          <span>Visits</span>
          <span>Last visit</span>
          <span />
        </div>

        {patients.length ? (
          patients.map((patient) => (
            <div className="table-row" key={patient.id}>
              <span className="patient-name">
                <i>
                  <UserRound size={14} />
                </i>
                <b>{patient.name}</b>
              </span>
              <span>{patient.department}</span>
              <span>{patient.visits}</span>
              <span>{patient.last}</span>
              <span>
                <ChevronRight size={15} />
              </span>
            </div>
          ))
        ) : (
          <div className="table-empty">No patients found.</div>
        )}
      </div>
    </div>
  );
}
