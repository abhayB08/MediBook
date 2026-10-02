import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppointmentProvider } from "./context/AppointmentContext";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import BookAppointment from "./pages/BookAppointment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Appointments from "./pages/Appointments";
import Profile from "./pages/Profile";
import DoctorPatients from "./pages/DoctorPatients";
import DoctorSchedule from "./pages/DoctorSchedule";
import DoctorConsultation from "./pages/DoctorConsultation";
import DoctorAnalytics from "./pages/DoctorAnalytics";
import DoctorNotifications from "./pages/DoctorNotifications";

function Protected({ role, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === "doctor" ? "/doctor/dashboard" : "/dashboard"}
        replace
      />
    );
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route path="/book/:id" element={<BookAppointment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <Protected role="patient">
                  <Dashboard />
                </Protected>
              }
            />
            <Route
              path="/appointments"
              element={
                <Protected>
                  <Appointments />
                </Protected>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />

            <Route
              path="/doctor/profile"
              element={
                <Protected role="doctor">
                  <Profile doctorMode />
                </Protected>
              }
            />
            <Route
              path="/doctor/dashboard"
              element={
                <Protected role="doctor">
                  <DoctorDashboard />
                </Protected>
              }
            />
            <Route
              path="/doctor/appointments"
              element={
                <Protected role="doctor">
                  <Appointments />
                </Protected>
              }
            />
            <Route
              path="/doctor/patients"
              element={
                <Protected role="doctor">
                  <DoctorPatients />
                </Protected>
              }
            />
            <Route
              path="/doctor/schedule"
              element={
                <Protected role="doctor">
                  <DoctorSchedule />
                </Protected>
              }
            />
            <Route
              path="/doctor/consultations"
              element={
                <Protected role="doctor">
                  <DoctorConsultation />
                </Protected>
              }
            />
            <Route
              path="/doctor/analytics"
              element={
                <Protected role="doctor">
                  <DoctorAnalytics />
                </Protected>
              }
            />
            <Route
              path="/doctor/notifications"
              element={
                <Protected role="doctor">
                  <DoctorNotifications />
                </Protected>
              }
            />

            <Route
              path="*"
              element={
                <div className="page-center">
                  <div className="big-404">404</div>
                  <h2>Page not found</h2>
                  <a className="primary-btn" href="/">Go home</a>
                </div>
              }
            />
          </Routes>
        </Layout>
      </AppointmentProvider>
    </AuthProvider>
  );
}
