import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
  UserRound,
} from "lucide-react";

import { doctors } from "../data/doctors";
import { useAuth } from "../context/AuthContext";
import { useAppointments } from "../context/AppointmentContext";

const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getScheduleKey(doctorId) {
  return `medibook_schedule_${doctorId}`;
}

function getDoctorSchedule(doctor) {
  if (!doctor) {
    return {
      days: [],
      slots: [],
    };
  }

  try {
    const saved = localStorage.getItem(
      getScheduleKey(doctor.id)
    );

    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore invalid localStorage data.
  }

  /*
   * First time:
   * use the doctor's original configuration.
   */
  return {
    days: [...ALL_DAYS],
    slots: [...(doctor.slots || [])],
  };
}

function getNextDates(workingDays) {
  const result = [];

  /*
   * Look ahead 30 calendar days instead of
   * automatically showing only 7 days.
   */
  for (let i = 0; i < 30; i += 1) {
    const date = new Date();

    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + i);

    const dayName = date.toLocaleDateString("en-IN", {
      weekday: "long",
    });

    if (!workingDays.includes(dayName)) {
      continue;
    }

    result.push({
      value: [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-"),

      day: date.toLocaleDateString("en-IN", {
        weekday: "short",
      }),

      date: date.getDate(),

      month: date.toLocaleDateString("en-IN", {
        month: "short",
      }),
    });

    if (result.length === 7) {
      break;
    }
  }

  return result;
}

export default function BookAppointment() {
  const { id: doctorId } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    isSlotBooked,
    bookAppointment,
  } = useAppointments();

  const doctor = useMemo(() => {
    return doctors.find(
      (item) =>
        String(item.id) === String(doctorId)
    );
  }, [doctorId]);

  const [schedule, setSchedule] = useState(() =>
    getDoctorSchedule(doctor)
  );

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedTime, setSelectedTime] =
    useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] =
    useState(false);

  const [booking, setBooking] =
    useState(false);

  /*
   * Refresh the schedule from localStorage whenever
   * the booking page is opened.
   */
  React.useEffect(() => {
    if (!doctor) {
      return;
    }

    setSchedule(
      getDoctorSchedule(doctor)
    );
  }, [doctor]);

  /*
   * IMPORTANT:
   * Dates come ONLY from doctor's enabled days.
   */
  const dates = useMemo(() => {
    return getNextDates(
      schedule.days || []
    );
  }, [schedule.days]);

  /*
   * IMPORTANT:
   * Slots come ONLY from doctor's saved schedule.
   *
   * No fake extra sessions.
   */
  const slots = schedule.slots || [];

  if (!doctor) {
    return (
      <div className="listing-page">
        <div
          style={{
            minHeight: "70vh",
            display: "grid",
            placeItems: "center",
            padding: "30px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "35px",
              background: "#fff",
              border: "1px solid #e4e7ec",
              borderRadius: "16px",
              textAlign: "center",
            }}
          >
            <h2>Doctor not found</h2>

            <p
              style={{
                marginTop: "8px",
                color: "#667085",
              }}
            >
              We could not find the doctor you
              selected.
            </p>

            <button
              className="primary-btn"
              style={{
                marginTop: "20px",
              }}
              onClick={() =>
                navigate("/doctors")
              }
            >
              Back to Doctors
            </button>
          </div>
        </div>
      </div>
    );
  }

  function handleDateChange(date) {
    setSelectedDate(date);
    setSelectedTime("");
    setError("");
  }

  function handleBooking() {
    setError("");

    if (!user) {
      setError(
        "Please login as a patient before booking."
      );
      return;
    }

    if (user.role !== "patient") {
      setError(
        "Only patients can book appointments."
      );
      return;
    }

    if (!selectedDate) {
      setError(
        "Please select an appointment date."
      );
      return;
    }

    if (!selectedTime) {
      setError(
        "Please select an appointment time."
      );
      return;
    }

    /*
     * Final duplicate check.
     */
    if (
      isSlotBooked(
        doctor.id,
        selectedDate,
        selectedTime
      )
    ) {
      setError(
        "This slot is already booked. Please choose another time."
      );

      setSelectedTime("");

      return;
    }

    setBooking(true);

    const result = bookAppointment({
      doctorId: doctor.id,

      doctorName: doctor.name,

      patientId: user.id,

      patientName: user.name,

      department:
        doctor.department ||
        doctor.specialization ||
        "General Medicine",

      date: selectedDate,

      time: selectedTime,

      fee: doctor.fee || 500,
    });

    setBooking(false);

    if (!result?.success) {
      setError(
        result?.message ||
          "Unable to book appointment."
      );

      return;
    }

    setSuccess(true);
  }

  /*
   * SUCCESS SCREEN
   */
  if (success) {
    return (
      <div className="booking-page-v2">
        <div
          style={{
            maxWidth: "620px",
            margin: "70px auto",
          }}
        >
          <div className="booking-block">
            <div
              style={{
                display: "grid",
                placeItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "75px",
                  height: "75px",
                  borderRadius: "50%",
                  background: "#ecfdf3",
                  color: "#16a34a",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <CheckCircle2 size={42} />
              </div>

              <span
                style={{
                  marginTop: "22px",
                  color: "#16a34a",
                  fontSize: "8px",
                  fontWeight: 900,
                  letterSpacing: "1.5px",
                }}
              >
                APPOINTMENT CONFIRMED
              </span>

              <h1
                style={{
                  marginTop: "8px",
                  fontSize: "32px",
                }}
              >
                You're booked, {user.name}
              </h1>

              <p
                style={{
                  marginTop: "8px",
                  color: "#667085",
                  fontSize: "10px",
                  lineHeight: 1.7,
                }}
              >
                Your appointment with{" "}
                {doctor.name} has been confirmed.
              </p>

              <div
                style={{
                  width: "100%",
                  marginTop: "25px",
                  padding: "18px",
                  background: "#f8fafc",
                  border: "1px solid #e4e7ec",
                  borderRadius: "10px",
                  textAlign: "left",
                }}
              >
                <div className="summary-lines">
                  <div>
                    <span>Doctor</span>
                    <b>{doctor.name}</b>
                  </div>

                  <div>
                    <span>Date</span>
                    <b>{selectedDate}</b>
                  </div>

                  <div>
                    <span>Time</span>
                    <b>{selectedTime}</b>
                  </div>

                  <div>
                    <span>Patient</span>
                    <b>{user.name}</b>
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  marginTop: "14px",
                  padding: "13px",
                  borderRadius: "8px",
                  background: "#eff6ff",
                  color: "#2563eb",
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  fontSize: "8px",
                  textAlign: "left",
                }}
              >
                <Smartphone size={17} />

                <span>
                  Simulated SMS sent to{" "}
                  <strong>
                    {user.phone ||
                      "your registered number"}
                  </strong>
                </span>
              </div>

              <button
                className="primary-btn"
                style={{
                  width: "100%",
                  marginTop: "18px",
                }}
                onClick={() =>
                  navigate("/appointments")
                }
              >
                View My Appointments
              </button>

              <button
                className="secondary-btn"
                style={{
                  width: "100%",
                  marginTop: "8px",
                }}
                onClick={() =>
                  navigate("/doctors")
                }
              >
                Find Another Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * BOOKING PAGE
   */
  return (
    <div className="booking-page-v2">
      <div className="booking-wrap">

        {/* HEADER */}

        <div className="booking-heading">
          <div>
            <button
              className="back-link"
              onClick={() =>
                navigate(
                  `/doctors/${doctor.id}`
                )
              }
            >
              <ArrowLeft size={14} />

              Back to doctor
            </button>

            <h1>
              Book appointment
            </h1>

            <p>
              Choose an available date and
              time.
            </p>
          </div>

          <div className="secure-note">
            <ShieldCheck size={14} />

            Secure booking
          </div>
        </div>

        {/* PROGRESS */}

        <div className="booking-progress">
          <div className="current">
            <b>1</b>
            Doctor & schedule
          </div>

          <div
            className={
              selectedDate
                ? "current"
                : ""
            }
          >
            <b>2</b>
            Date & time
          </div>

          <div
            className={
              selectedTime
                ? "current"
                : ""
            }
          >
            <b>3</b>
            Confirmation
          </div>
        </div>

        <div className="booking-layout">

          {/* LEFT */}

          <div className="booking-block">

            {/* DOCTOR */}

            <div className="selected-doctor">

              <div
                className={`booking-doctor-avatar ${
                  doctor.color || "blue"
                }`}
              >
                {doctor.initials}
              </div>

              <div>
                <span>
                  SELECTED DOCTOR
                </span>

                <h2>
                  {doctor.name}
                </h2>

                <p>
                  {doctor.specialization ||
                    doctor.department}
                </p>
              </div>

              <div className="booking-rating">
                ★{" "}
                {doctor.rating || "4.9"}
              </div>

            </div>

            <div className="booking-divider" />

            {/* DATE */}

            <div className="block-heading">
              <CalendarDays size={18} />

              <div>
                <span>
                  STEP 1
                </span>

                <h2>
                  Available dates
                </h2>
              </div>
            </div>

            {dates.length === 0 ? (
              <div className="form-error">
                This doctor currently has no
                available working days.
              </div>
            ) : (
              <div className="date-row">
                {dates.map((item) => (
                  <button
                    key={item.value}
                    className={`date-chip ${
                      selectedDate ===
                      item.value
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleDateChange(
                        item.value
                      )
                    }
                  >
                    <span>
                      {item.day}
                    </span>

                    <b>
                      {item.date}
                    </b>

                    <small>
                      {item.month}
                    </small>
                  </button>
                ))}
              </div>
            )}

            {/* TIME */}

            {selectedDate && (
              <>
                <div className="slot-heading">

                  <div>
                    <span>
                      STEP 2
                    </span>

                    <p>
                      Sessions available
                      for{" "}
                      <strong>
                        {selectedDate}
                      </strong>
                    </p>
                  </div>

                  <small>
                    <CheckCircle2 size={12} />

                    Available sessions
                  </small>

                </div>

                {slots.length === 0 ? (
                  <div className="form-error">
                    The doctor has not added any
                    appointment sessions.
                  </div>
                ) : (
                  <div className="slot-grid">
                    {slots.map(
                      (slot) => {
                        const booked =
                          isSlotBooked(
                            doctor.id,
                            selectedDate,
                            slot
                          );

                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={booked}
                            className={`slot-btn ${
                              booked
                                ? "booked"
                                : selectedTime ===
                                  slot
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => {
                              setSelectedTime(
                                slot
                              );

                              setError("");
                            }}
                          >
                            <Clock3
                              size={13}
                            />

                            <span>
                              {slot}
                            </span>

                            <small>
                              {booked
                                ? "Booked"
                                : "Available"}
                            </small>
                          </button>
                        );
                      }
                    )}
                  </div>
                )}
              </>
            )}

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}
          </div>

          {/* SUMMARY */}

          <aside className="booking-summary">

            <span>
              APPOINTMENT SUMMARY
            </span>

            <div className="summary-doctor">

              <div
                className={`summary-avatar ${
                  doctor.color || "blue"
                }`}
              >
                {doctor.initials}
              </div>

              <div>
                <b>
                  {doctor.name}
                </b>

                <small>
                  {doctor.specialization}
                </small>
              </div>

            </div>

            <div className="summary-lines">

              <div>
                <span>
                  Patient
                </span>

                <b>
                  <UserRound
                    size={11}
                    style={{
                      verticalAlign:
                        "middle",
                      marginRight: "3px",
                    }}
                  />

                  {user?.name ||
                    "Not logged in"}
                </b>
              </div>

              <div>
                <span>
                  Date
                </span>

                <b>
                  {selectedDate ||
                    "Select a date"}
                </b>
              </div>

              <div>
                <span>
                  Time
                </span>

                <b>
                  {selectedTime ||
                    "Select a time"}
                </b>
              </div>

            </div>

            <div className="summary-total">
              <span>
                Consultation
              </span>

              <b>
                ₹{doctor.fee || 500}
              </b>
            </div>

            <button
              className="primary-btn full-btn"
              disabled={
                booking ||
                !selectedDate ||
                !selectedTime
              }
              onClick={
                handleBooking
              }
            >
              {booking
                ? "Booking..."
                : "Confirm appointment"}
            </button>

            <div className="summary-security">
              <LockKeyhole size={12} />

              <span>
                Once confirmed, this exact
                doctor/date/time combination
                cannot be booked by another
                patient.
              </span>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}