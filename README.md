# 🏥 MediBook

### Smart Hospital Appointment Booking System

<p align="center">
  <strong>A modern React-based platform for connecting patients with doctors and managing hospital appointments.</strong>
</p>

<p align="center">
  <a href="https://github.com/abhayB08/MediBook">
    <img src="https://img.shields.io/badge/GitHub-MediBook-181717?style=for-the-badge&logo=github" alt="GitHub">
  </a>
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel" alt="Vercel">
</p>

---

## ✨ Overview

**MediBook** is a modern hospital appointment booking web application built with **React.js and Vite**.

The platform provides separate experiences for **patients and doctors**, allowing patients to discover doctors and book appointments while giving doctors tools to manage appointments, patients, schedules, consultations, analytics, and notifications.

The project focuses on creating a smooth and organized digital appointment experience with a clean, responsive interface.

---

## 🎯 Problem

Traditional appointment processes can be time-consuming and difficult to manage.

Patients may need to:

- Search for suitable doctors
- Find available appointment times
- Manage their appointments
- Keep track of booking information

Doctors also need an organized way to:

- Manage appointments
- Control availability
- View patients
- Manage their schedules

**MediBook brings these workflows together into one web application.**

---

## 🚀 Key Features

### 👤 Patient Experience

- 🔐 Patient Registration & Login
- 👨‍⚕️ Browse Doctors
- 🏥 Browse Medical Departments
- 📋 View Doctor Profiles
- 📅 Select Appointment Date
- ⏰ Select Available Time Slot
- ✅ Book Appointments
- 📱 Booking Confirmation / Simulated SMS
- 📑 View Appointments
- 👤 Manage Profile

### 🩺 Doctor Experience

- 🔐 Doctor Login
- 📊 Doctor Dashboard
- 📅 Appointment Management
- 👥 Patient Management
- 🗓️ Schedule Management
- 🩺 Consultation Management
- 📈 Analytics Dashboard
- 🔔 Notifications
- 👤 Doctor Profile Management

### 🛡️ Application Features

- 🔒 Protected Routes
- 👥 Role-based access
- 🚫 Appointment conflict prevention
- 💾 Local browser persistence
- 📱 Responsive UI
- 🧩 Reusable React components
- 🧭 Client-side routing
- ⚡ Fast Vite development environment

---

## 🔄 Application Flow

```text
                    ┌──────────────────┐
                    │     MediBook     │
                    └────────┬─────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
        👤 PATIENT                     🩺 DOCTOR
              │                             │
              ▼                             ▼
        Login / Register              Doctor Login
              │                             │
              ▼                             ▼
        Browse Doctors                Dashboard
              │                             │
              ▼                    ┌────────┼────────┐
        Doctor Profile              │        │        │
              │                     ▼        ▼        ▼
              ▼                 Schedule Patients Appointments
        Select Date
              │
              ▼
        Select Time Slot
              │
              ▼
        Confirm Booking
              │
              ▼
        My Appointments with readable imports, component blocks, JSX indentation, and one logical statement per line. The project does not require a formatter package to run.
