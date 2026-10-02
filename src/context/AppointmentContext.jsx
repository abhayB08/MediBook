import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const AppointmentContext = createContext(null);

const DEFAULT_APPOINTMENTS = [];

function loadAppointments() {
  try {
    const saved = localStorage.getItem("medibook_appointments");
    return saved ? JSON.parse(saved) : DEFAULT_APPOINTMENTS;
  } catch {
    return DEFAULT_APPOINTMENTS;
  }
}

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState(loadAppointments);
  const appointmentsRef = useRef(appointments);

  useEffect(() => {
    appointmentsRef.current = appointments;
    localStorage.setItem(
      "medibook_appointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  const isSlotBooked = (doctorId, date, time) => {
    return appointmentsRef.current.some(
      (appointment) =>
        appointment.doctorId === doctorId &&
        appointment.date === date &&
        appointment.time === time &&
        appointment.status !== "cancelled"
    );
  };

  const bookAppointment = (appointmentData) => {
    const {
      doctorId,
      doctorName,
      patientId,
      patientName,
      department,
      date,
      time,
      fee = 500,
    } = appointmentData;

    if (!doctorId || !patientId || !date || !time) {
      return {
        success: false,
        ok: false,
        message: "Doctor, patient, date and time are required.",
      };
    }

    // Read the latest in-memory list synchronously so two quick clicks
    // cannot create two appointments for the same doctor/time.
    const current = appointmentsRef.current;

    const alreadyBooked = current.some(
      (appointment) =>
        appointment.doctorId === doctorId &&
        appointment.date === date &&
        appointment.time === time &&
        appointment.status !== "cancelled"
    );

    if (alreadyBooked) {
      return {
        success: false,
        ok: false,
        message: "This appointment slot is already booked.",
      };
    }

    const newAppointment = {
      id: `appointment-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 7)}`,
      doctorId,
      doctorName,
      patientId,
      patientName,
      department,
      date,
      time,
      status: "confirmed",
      fee,
      createdAt: new Date().toISOString(),
    };

    const next = [...current, newAppointment];

    appointmentsRef.current = next;
    localStorage.setItem("medibook_appointments", JSON.stringify(next));
    setAppointments(next);

    return {
      success: true,
      ok: true,
      appointment: newAppointment,
    };
  };

  const cancelAppointment = (appointmentId) => {
    const next = appointmentsRef.current.map((appointment) =>
      appointment.id === appointmentId
        ? { ...appointment, status: "cancelled" }
        : appointment
    );

    appointmentsRef.current = next;
    setAppointments(next);
  };

  const complete = (appointmentId) => {
    const next = appointmentsRef.current.map((appointment) =>
      appointment.id === appointmentId
        ? { ...appointment, status: "completed" }
        : appointment
    );

    appointmentsRef.current = next;
    setAppointments(next);
  };

  const checkIn = (appointmentId) => {
    const next = appointmentsRef.current.map((appointment) =>
      appointment.id === appointmentId
        ? { ...appointment, status: "checked-in" }
        : appointment
    );

    appointmentsRef.current = next;
    setAppointments(next);
  };

  const startConsultation = (appointmentId) => {
    const next = appointmentsRef.current.map((appointment) =>
      appointment.id === appointmentId
        ? { ...appointment, status: "in-consultation" }
        : appointment
    );

    appointmentsRef.current = next;
    setAppointments(next);
  };

  const getDoctorAppointments = (doctorId) =>
    appointments.filter(
      (appointment) => appointment.doctorId === doctorId
    );

  const getPatientAppointments = (patientId) =>
    appointments.filter(
      (appointment) => appointment.patientId === patientId
    );

  return (
    <AppointmentContext.Provider
      value={{
        appointments,

        bookAppointment,
        cancelAppointment,
        complete,
        checkIn,
        startConsultation,
        isSlotBooked,

        getDoctorAppointments,
        getPatientAppointments,

        // Compatibility aliases for older page code.
        book: (data) => {
          if (data?.doctor && data?.patient) {
            return bookAppointment({
              doctorId: data.doctor.id,
              doctorName: data.doctor.name,
              patientId: data.patient.id,
              patientName: data.patient.name,
              department: data.doctor.department,
              date: data.date,
              time: data.time,
              fee: data.doctor.fee,
            });
          }
          return bookAppointment(data);
        },
        isBooked: isSlotBooked,
        cancel: cancelAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);

  if (!context) {
    throw new Error(
      "useAppointments must be used inside an AppointmentProvider"
    );
  }

  return context;
}
