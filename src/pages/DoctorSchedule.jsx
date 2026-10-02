import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Plus,
  Trash2,
  Save,
} from "lucide-react";

import { doctors } from "../data/doctors";
import { useAuth } from "../context/AuthContext";

const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getStorageKey(doctorId) {
  return `medibook_schedule_${doctorId}`;
}

function loadSchedule(doctor) {
  if (!doctor) {
    return {
      days: [],
      slots: [],
    };
  }

  try {
    const saved = localStorage.getItem(
      getStorageKey(doctor.id)
    );

    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore invalid localStorage data.
  }

  /*
   * First-time setup:
   * Use the doctor's existing slots.
   *
   * All normal working days are enabled initially.
   */
  return {
    days: [...ALL_DAYS],
    slots: [...(doctor.slots || [])],
  };
}

export default function DoctorSchedule() {
  const { user } = useAuth();

  const doctor = doctors.find(
    (item) => item.email === user?.email
  );

  const [schedule, setSchedule] = useState(() =>
    loadSchedule(doctor)
  );

  const [newSlot, setNewSlot] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (doctor) {
      setSchedule(loadSchedule(doctor));
    }
  }, [doctor?.id]);

  if (!doctor) {
    return (
      <div className="doctor-module-page">
        <div className="module-head">
          <div>
            <span>SCHEDULE MANAGEMENT</span>
            <h1>Doctor not found</h1>
            <p>
              We could not find the doctor connected to this
              account.
            </p>
          </div>
        </div>
      </div>
    );
  }

  function toggleDay(day) {
    setSchedule((current) => {
      const exists = current.days.includes(day);

      return {
        ...current,
        days: exists
          ? current.days.filter((item) => item !== day)
          : [...current.days, day],
      };
    });

    setSaved(false);
  }

  function addSlot() {
    const value = newSlot.trim();

    if (!value) {
      return;
    }

    if (schedule.slots.includes(value)) {
      return;
    }

    setSchedule((current) => ({
      ...current,
      slots: [...current.slots, value],
    }));

    setNewSlot("");
    setSaved(false);
  }

  function removeSlot(slot) {
    setSchedule((current) => ({
      ...current,
      slots: current.slots.filter(
        (item) => item !== slot
      ),
    }));

    setSaved(false);
  }

  function saveSchedule() {
    localStorage.setItem(
      getStorageKey(doctor.id),
      JSON.stringify(schedule)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <div className="doctor-module-page">
      <div className="module-head">
        <div>
          <span>SCHEDULE MANAGEMENT</span>

          <h1>Availability</h1>

          <p>
            Control your working days and appointment time
            slots.
          </p>
        </div>

        <div className="schedule-live">
          <i />
          {schedule.days.length > 0 &&
          schedule.slots.length > 0
            ? "Accepting bookings"
            : "Not accepting bookings"}
        </div>
      </div>

      <div className="schedule-grid">
        {/* WORKING DAYS */}
        <section className="module-card">
          <div className="module-card-title">
            <div>
              <span>WORKING DAYS</span>

              <h2>Weekly availability</h2>
            </div>
          </div>

          <div className="schedule-note">
            Turn a day off to completely remove it from
            patient booking.
          </div>

          <div className="day-list">
            {ALL_DAYS.map((day) => {
              const enabled =
                schedule.days.includes(day);

              return (
                <label
                  className={`day-row ${
                    enabled ? "active" : "inactive"
                  }`}
                  key={day}
                >
                  <span>
                    <CalendarDays size={14} />
                    {day}
                  </span>

                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={() =>
                      toggleDay(day)
                    }
                  />
                </label>
              );
            })}
          </div>
        </section>

        {/* TIME SLOTS */}
        <section className="module-card">
          <div className="module-card-title">
            <div>
              <span>TIME SLOTS</span>

              <h2>Bookable times</h2>
            </div>
          </div>

          <div className="schedule-note">
            Patients can book only the sessions shown here.
          </div>

          <div className="slot-add">
            <input
              type="text"
              placeholder="e.g. 05:00 PM"
              value={newSlot}
              onChange={(event) =>
                setNewSlot(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addSlot();
                }
              }}
            />

            <button
              type="button"
              onClick={addSlot}
            >
              <Plus size={14} />
              Add
            </button>
          </div>

          <div className="manage-slots">
            {schedule.slots.length === 0 ? (
              <div className="empty-slots">
                No appointment sessions added.
              </div>
            ) : (
              schedule.slots.map((slot) => (
                <div key={slot}>
                  <span>
                    <Clock3 size={13} />
                    {slot}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      removeSlot(slot)
                    }
                    aria-label={`Remove ${slot}`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* SAVE */}
      <div className="schedule-save-bar">
        <div>
          <strong>
            {schedule.days.length} working days
          </strong>

          <span>
            {schedule.slots.length} appointment sessions
          </span>
        </div>

        <button
          type="button"
          className="primary-btn"
          onClick={saveSchedule}
        >
          <Save size={15} />

          {saved ? "Schedule Saved" : "Save Availability"}
        </button>
      </div>
    </div>
  );
}