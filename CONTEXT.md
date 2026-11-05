# Student CRUD Application Context & System Plan

## 1. Project Overview
This project is a full-stack Student Management CRUD application prepared for cloud deployment on **Render.com**.
- **Backend**: Spring Boot 3.x REST API (`./student`), using Gradle, Spring Data JPA, and PostgreSQL (`db_student`). Deployed as a Docker web service on Render.
- **Frontend**: Single Page Application built with **Vite**, **React (JavaScript)**, and **Tailwind CSS** (`./frontend`). Deployed as a Static web service on Render.
- **Database**: Managed PostgreSQL instance on Render (`student-db`).
- **UI Architecture Decision**: **STRICTLY NO MODALS**. All forms (Create / Edit) and details are rendered **inline** via a sticky Card Form, with inline two-step confirmation for deletions.

---

## 2. Backend API Specification

### Base Path
- Controller Mapping: `/concepcion/students`
- Default Backend Port: `http://localhost:8080` (or dynamic `PORT` env var on Render)

### Entity Schema (`Student`)
| Field | Type | Description |
|---|---|---|
| `id` | Integer | Primary key, auto-generated |
| `firstname` | String | Student's first name |
| `lastname` | String | Student's last name |
| `course` | String | Degree/Course program (e.g., BSIT, BSCS) |
| `section` | String | Class section (e.g., 3A, 3B) |

### Endpoints
| Method | Endpoint | Request Body | Response Status | Description |
|---|---|---|---|---|
| `GET` | `/concepcion/students` | None | `200 OK` | Retrieves all students (JSON array) |
| `GET` | `/concepcion/students/{id}` | None | `200 OK` / `404 Not Found` | Retrieves a student by ID |
| `POST` | `/concepcion/students` | `{ firstname, lastname, course, section }` | `201 Created` | Creates a new student |
| `PUT` | `/concepcion/students/{id}` | `{ firstname, lastname, course, section }` | `200 OK` / `404 Not Found` | Updates existing student by ID |
| `DELETE` | `/concepcion/students/{id}` | None | `200 OK` / `404 Not Found` | Deletes a student by ID |

---

## 3. Render.com Infrastructure Blueprint (`render.yaml`)

Guided by `https://github.com/rnvelascoua/student-crud/blob/main/render.yaml`:

### Services & Resources
1. **`student-backend` (Web Service - Docker)**:
   - Path: `./student/Dockerfile`
   - Context: `./student`
   - Plan: `free`
   - Bound to Render PostgreSQL database (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DB_SSL_MODE=require`)
   - Mapped port: `PORT=8080`
   - `@CrossOrigin(origins = "*")` configured on `StudentController.java`

2. **`student-frontend` (Web Service - Static Site)**:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Path: `frontend/dist`
   - SPA Rewrite: `/*` ➔ `/index.html`
   - Environment Variable: `VITE_API_BASE_URL` dynamically injected from `student-backend` host property.

3. **`student-db` (PostgreSQL Database)**:
   - Database name: `db_student`
   - Plan: `free`

---

## 4. Frontend Dynamic API Root Resolution

In `frontend/src/services/studentService.js`, dynamic resolution ensures zero-config behavior in both local development and Render production:
- In production on Render: `import.meta.env.VITE_API_BASE_URL` points to `student-backend.onrender.com`.
- In local development: `VITE_API_BASE_URL` is omitted, falling back to relative `/concepcion/students` routed via Vite's proxy (`vite.config.js`) to `localhost:8080`.
