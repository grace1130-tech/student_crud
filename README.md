# Student Management CRUD Application

A full-stack Student Management CRUD application featuring a **Spring Boot REST API** backend and a modern **Vite + React (JavaScript) + Tailwind CSS** frontend, ready for deployment on **Render.com**.

---

## Architecture Overview

- **Backend** (`./student`):
  - Java 21 / Spring Boot 3.x
  - Spring Data JPA + Hibernate with PostgreSQL (`db_student`)
  - Multi-stage Docker containerization (`Dockerfile`)
  - Endpoints mapped to `/concepcion/students` with `@CrossOrigin(origins = "*")`
- **Frontend** (`./frontend`):
  - Vite + React (JavaScript)
  - Tailwind CSS utility styling
  - **Strictly No Modals**: Integrated Card Form with dual Create/Edit mode, real-time search, and safe two-step inline delete confirmations.
  - Dynamic API resolution: Uses `VITE_API_BASE_URL` in production; uses Vite proxy in local dev.
- **Infrastructure as Code** (`render.yaml`):
  - Blueprint defining `student-backend` (Docker), `student-frontend` (Static Site), and `student-db` (PostgreSQL).

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

## Deploying to Render.com (Blueprint Guide)

This repository includes a `render.yaml` specification for 1-click Render Blueprint deployment.

### Steps:
1. **Push to GitHub**:
   Ensure all changes are committed and pushed to your GitHub repository:
   ```powershell
   git add .
   git commit -m "Prepare for Render.com deployment"
   git push origin main
   ```
2. **Log in to Render**:
   - Go to [dashboard.render.com](https://dashboard.render.com).
3. **Create New Blueprint Instance**:
   - Click **New +** ➔ **Blueprint**.
   - Connect your GitHub repository (`student_crud`).
   - Render will automatically parse `render.yaml` and discover:
     - `student-db` (PostgreSQL Database)
     - `student-backend` (Web Service via Docker)
     - `student-frontend` (Static Site via Vite build)
4. **Deploy**:
   - Click **Apply**.
   - Render provisions the database, builds the Docker image for the backend, compiles the frontend static assets, and connects them automatically!

---

## Running Locally

### 1. Start PostgreSQL
Ensure PostgreSQL is running locally with database `db_student`:
- Port: `5432`, User: `postgres`, Password: `admin`, Database: `db_student`

### 2. Start the Backend
```powershell
cd student
.\gradlew.bat bootRun
```

### 3. Start the Frontend
```powershell
cd frontend
npm.cmd run dev
```
Open `http://localhost:5173`.
