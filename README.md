# 🏥 MediBook

### Smart Hospital Appointment Booking System

<p align="center">
  <strong>A modern React-based platform for discovering doctors, booking appointments, and managing doctor schedules.</strong>
</p>

<p align="center">
  <a href="https://github.com/abhayB08/MediBook">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub">
  </a>
  <a href="https://vercel.com/">
    <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel">
  </a>
  <img src="https://img.shields.io/badge/React-JavaScript-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/License-Educational%20Project-blue?style=for-the-badge" alt="License">
</p>

---

## 🌐 Live Application

> 🚀 MediBook is deployed on Vercel.

**Live Demo:** (https://medi-book-tau.vercel.app/)

**Source Code:**  
https://github.com/abhayB08/MediBook

---

## 📖 About MediBook

**MediBook** is a modern hospital appointment booking web application built with **React.js and Vite**.

The application provides separate experiences for **patients and doctors**.

Patients can:

- Discover doctors
- View doctor profiles
- Select appointment dates
- Choose available time slots
- Book appointments
- View their appointments

Doctors can:

- Manage appointments
- Manage patients
- Configure their schedule
- Manage consultations
- View analytics
- Manage notifications
- Update their profile

The project focuses on creating a simple, organized, and user-friendly digital appointment experience.

---

# 🎯 Problem Statement

Traditional appointment processes can be difficult to manage for both patients and doctors.

Patients may have difficulty:

- Finding suitable doctors
- Checking available appointment times
- Managing their bookings
- Keeping track of appointments

Doctors need an organized way to:

- Manage appointments
- Control their availability
- View patient information
- Manage schedules
- Track their activities

### 💡 Solution

MediBook provides a centralized frontend experience where patients and doctors can interact with appointment-related workflows through dedicated dashboards.

---

# ✨ Features

## 👤 Patient Features

- 🔐 Patient Registration & Login
- 👨‍⚕️ Browse Doctors
- 🏥 Browse Medical Departments
- 📋 View Doctor Profiles
- 📅 Select Appointment Date
- ⏰ Select Appointment Time
- ✅ Book Appointments
- 🚫 Appointment Conflict Prevention
- 📱 Booking Confirmation / Simulated SMS
- 📑 View Appointments
- 👤 Manage Profile

---

## 🩺 Doctor Features

- 🔐 Doctor Login
- 📊 Doctor Dashboard
- 📅 Appointment Management
- 👥 Patient Management
- 🗓️ Schedule Management
- 🩺 Consultation Management
- 📈 Analytics Dashboard
- 🔔 Notifications
- 👤 Doctor Profile Management

---

## ⚡ Application Features

- 🔒 Protected Routes
- 👥 Role-based access
- 🚫 Duplicate appointment prevention
- 💾 LocalStorage persistence
- 🧩 Reusable React components
- 🧭 Client-side routing
- 📱 Responsive interface
- ⚡ Vite-powered development environment
- 🎨 Modern user interface

---

# 🔑 Demo Access

MediBook contains separate **Patient** and **Doctor** experiences.

### 👤 Patient

Use the application's registration/login flow to access the patient dashboard.

### 🩺 Doctor

Use the doctor login flow to access the doctor dashboard.

> **Note:** Demo credentials should be added here only when they are confirmed from the current application code.

---

# 🔄 Application Flow

```text
                         🏥 MediBook
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
             👤 PATIENT                🩺 DOCTOR
                 │                         │
                 ▼                         ▼
          Login / Register            Doctor Login
                 │                         │
                 ▼                         ▼
          Browse Doctors              Dashboard
                 │                         │
                 ▼               ┌─────────┼─────────┐
          Doctor Profile          │         │         │
                 │                ▼         ▼         ▼
                 ▼             Schedule  Patients  Appointments
          Select Date
                 │
                 ▼
          Select Time Slot
                 │
                 ▼
          Confirm Booking
                 │
                 ▼
          My Appointments
