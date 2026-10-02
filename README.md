# MediBook Pro

Advanced React + Vite hospital appointment booking system for a class project.

## Features

- Patient and doctor login
- Patient registration
- Doctor directory and profiles
- Search and specialty filters
- Date and time-slot booking
- Automatic confirmation
- Duplicate slot protection
- Personalized simulated SMS
- Patient dashboard
- Doctor dashboard
- Appointment cancellation/completion
- LocalStorage persistence
- Responsive modern UI

## Demo accounts

Patient:
- Email: patient@medibook.demo
- Password: patient123

Doctor:
- Email: amit@medibook.demo
- Password: doctor123

Other doctors:
- neha@medibook.demo
- rahul@medibook.demo
- priya@medibook.demo
- karan@medibook.demo
- riya@medibook.demo

Password for all doctors: doctor123

## Run

npm install
npm run dev

## Important

This is a React-only academic prototype. Authentication, appointment storage and SMS are simulated in localStorage. A production hospital system would require a backend, database, secure authentication and server-side slot locking.

## Advanced Doctor Command Center

Doctor accounts have a significantly richer workspace:

- Command-center dashboard
- KPI cards: appointments, patients, completion and revenue
- Patient management
- Working-day availability
- Slot management
- Consultation room
- Symptoms, diagnosis, medicine, dosage and notes
- Consultation completion
- Practice analytics
- Appointment trend chart
- Notification center
- Quick actions
- Doctor profile management

### Doctor navigation

Dashboard → Appointments → Patients → Schedule

Additional tools are available from the doctor profile dropdown:
Consultations → Analytics → Notifications → Profile


## Code formatting

The source files are intentionally formatted with readable imports, component blocks, JSX indentation, and one logical statement per line. The project does not require a formatter package to run.
