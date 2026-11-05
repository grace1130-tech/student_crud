# Student CRUD Application Context & System Plan

## 1. Project Overview
This project is a full-stack Student Management CRUD application.
- **Backend**: Spring Boot 3.x REST API (`./student`), using Gradle, Spring Data JPA, and PostgreSQL (`db_student`).
- **Frontend**: Single Page Application built with **Vite**, **React (JavaScript)**, and **Tailwind CSS** (`./frontend`).
- **UI Architecture Decision**: **NO MODALS**. All forms (Create / Edit) and details are rendered **inline** (e.g., dedicated card form beside or above the student list table, with inline confirmation for deletions).

---

## 2. Backend API Specification

### Base Path
- Controller Mapping: `/concepcion/students`
- Default Backend Port: `http://localhost:8080`

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

## 3. Frontend Architecture (Vite + React JavaScript + Tailwind CSS)

### Design & Layout (No Modals)
- **Responsive 2-Column or Stacked Layout**:
  - **Left/Top Column (Form Panel)**: Sticky or prominent Card for "Add Student" or "Edit Student" with mode switcher, reset/cancel button, and validation feedback.
  - **Right/Bottom Column (Data Table & Search Panel)**: Real-time search filter, statistics badges, and full interactive student table.
  - **Inline Action Controls**: Deletion utilizes inline two-step confirmation ("Delete" -> "Confirm Delete?" button toggle) without popup dialogs.

### Directory Structure
```
STUDENT-CRUD/
├── student/                      # Spring Boot Backend
│   ├── src/main/java/com/concepcion/student/
│   │   ├── Student.java
│   │   ├── StudentController.java
│   │   ├── StudentRepository.java
│   │   └── StudentApplication.java
│   └── src/main/resources/application.properties
│
├── frontend/                     # React Frontend (Vite + Tailwind CSS)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Modern Tailwind header with status indicators
│   │   │   ├── StudentForm.jsx   # Dedicated Card Form for Add & Edit (NO MODAL)
│   │   │   ├── StudentList.jsx   # Tailwind-styled responsive table with inline actions
│   │   │   ├── SearchBar.jsx     # Live search and quick filters
│   │   │   └── Toast.jsx         # Non-intrusive alert notification
│   │   ├── services/
│   │   │   └── studentService.js # Centralized API fetch/client methods
│   │   ├── App.jsx               # Main state orchestrator
│   │   ├── index.css             # Tailwind directives (@tailwind base, etc.)
│   │   └── main.jsx              # React DOM root entry
│   ├── index.html
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── package.json
│   └── vite.config.js            # Reverse proxy setup for CORS prevention
│
└── CONTEXT.md                    # Project context & architecture documentation
```

---

## 4. Key Architectural Decisions

1. **Tailwind CSS Styling**:
   - Zero custom bloated CSS; full utility-first Tailwind design system.
   - Clean, modern aesthetic with Slate/Indigo color palette, accessible contrast, smooth transitions, and responsive grid.

2. **No-Modal UX Paradigm**:
   - Create and Edit forms live directly in a dedicated Card Form container on the page.
   - Clicking "Edit" on a table row auto-populates the form and smoothly scrolls/focuses the form with an "Editing Student #[id]" state badge and a "Cancel Edit" button.
   - Deletions feature an inline two-click confirmation directly inside the row cell to avoid disruptive modals while preventing accidental clicks.

3. **CORS Mitigation**:
   - Configure Vite dev server reverse proxy in `vite.config.js`:
     ```javascript
     server: {
       port: 5173,
       proxy: {
         '/concepcion': {
           target: 'http://localhost:8080',
           changeOrigin: true
         }
       }
     }
     ```

---

## 5. Phased Implementation Roadmap

- **Phase 1: Project Setup & Tailwind Installation**
  - Scaffold Vite React JS project in `frontend/`.
  - Install and configure Tailwind CSS (`tailwindcss`, `postcss`, `autoprefixer`).
  - Configure `vite.config.js` proxy.

- **Phase 2: Service Layer & API Client**
  - Implement `frontend/src/services/studentService.js` handling `GET`, `POST`, `PUT`, `DELETE` with robust error reporting.

- **Phase 3: Component Implementation (Strictly No Modals)**
  - `Navbar.jsx`: Header with app title and student counter.
  - `StudentForm.jsx`: Card form with dual Create/Edit mode, clean input fields, validation hints, and Reset/Cancel action.
  - `StudentList.jsx`: Tailwind table with inline edit trigger and two-step inline delete confirmation.
  - `SearchBar.jsx`: Instant filtering input.
  - `Toast.jsx`: Tailwind floating alert notification.

- **Phase 4: State Management & Integration**
  - Connect all state in `App.jsx` (`students`, `editingStudent`, `searchQuery`, `loading`, `toastMessage`).
  - Test responsive layout behavior across desktop and mobile screens.

- **Phase 5: Build Verification & Validation**
  - Run `npm.cmd run build` to confirm zero build/lint errors.
  - Verify complete CRUD lifecycle with the backend.
