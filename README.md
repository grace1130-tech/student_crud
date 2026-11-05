# Student Management CRUD Application

A full-stack Student Management CRUD application featuring a **Spring Boot REST API** backend and a modern **Vite + React (JavaScript) + Tailwind CSS** frontend.

---

## Architecture Overview

- **Backend** (`./student`):
  - Java 17+ / Spring Boot 3.x
  - Spring Data JPA + Hibernate with PostgreSQL (`db_student`)
  - Endpoints mapped to `/concepcion/students`
- **Frontend** (`./frontend`):
  - Vite + React (JavaScript)
  - Tailwind CSS utility styling
  - **Strictly No Modals**: Integrated Card Form with dual Create/Edit mode, real-time search, and safe two-step inline delete confirmations.
  - Reverse proxy configured via `vite.config.js` to route API requests to `http://localhost:8080`.

---

## Entity Schema (`Student`)

| Field | Type | Description |
|---|---|---|
| `id` | Integer | Primary key, auto-generated |
| `firstname` | String | First name |
| `lastname` | String | Last name |
| `course` | String | Degree/Course program (e.g., BSIT, BSCS) |
| `section` | String | Class section (e.g., DA3A, 3A) |

---

## API Endpoints

| HTTP Method | Route | Description |
|---|---|---|
| `GET` | `/concepcion/students` | Get all student records |
| `GET` | `/concepcion/students/{id}` | Get a specific student by ID |
| `POST` | `/concepcion/students` | Create a new student |
| `PUT` | `/concepcion/students/{id}` | Update an existing student |
| `DELETE` | `/concepcion/students/{id}` | Delete a student record |

---

## How to Run the Application

### 1. Start PostgreSQL
Ensure PostgreSQL is running locally with the database `db_student` (credentials in `student/src/main/resources/application.properties`):
- Port: `5432`
- User: `postgres`
- Password: `admin`
- Database: `db_student`

### 2. Start the Spring Boot Backend
Open a terminal in the root directory:
```powershell
cd student
.\gradlew.bat bootRun
```
The backend starts on `http://localhost:8080`.

### 3. Start the Frontend (Vite + React)
Open a second terminal in the root directory:
```powershell
cd frontend
npm.cmd run dev
```
Open your browser at `http://localhost:5173`.
All requests to `/concepcion/students` will be seamlessly proxied to the backend on port 8080.

---

## Frontend Key Features

- **Inline Card Form (No Modals)**: Fill out and submit student details directly on the page. Clicking "Edit" on any table row populates the form, enables "Editing Mode", and scrolls directly to the inputs.
- **Two-Step Inline Deletion (No Modals)**: Clicking "Delete" toggles a row confirmation (`[Delete?] [Yes, Delete] [Cancel]`), preventing accidental deletions without intrusive popups.
- **Real-Time Search & Filtering**: Instantly filter table records across First Name, Last Name, Course, Section, and Student ID.
- **Responsive Layout**: Two-column layout on large screens with sticky form; cleanly stacks on tablets and mobile screens.
- **Toast Notifications**: Non-intrusive alerts for create, update, and delete actions.
