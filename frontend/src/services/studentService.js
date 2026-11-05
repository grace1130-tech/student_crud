/**
 * Resolves the backend base URL dynamically:
 * - When deployed on Render or provided via VITE_API_BASE_URL: uses the remote URL
 * - In local development (when unset): uses relative path '' so Vite's dev proxy forwards to localhost:8080
 */
function getApiRoot() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    let clean = envUrl.trim().replace(/\/+$/, '');
    const withoutProto = clean.replace(/^https?:\/\//i, '');
    if (!withoutProto.includes('.') && !withoutProto.includes('localhost')) {
      clean = `https://${withoutProto}.onrender.com`;
    } else if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = `https://${clean}`;
    }
    return clean;
  }
  return '';
}

const BASE_URL = `${getApiRoot()}/concepcion/students`;

/**
 * Handle HTTP response and parse errors if any
 */
async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const errorMsg =
      typeof data === 'string'
        ? data
        : data?.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMsg);
  }

  return data;
}

export const studentService = {
  /**
   * Fetch all students
   */
  async getAllStudents() {
    const response = await fetch(BASE_URL, {
      headers: {
        Accept: 'application/json',
      },
    });
    return handleResponse(response);
  },

  /**
   * Fetch single student by ID
   */
  async getStudentById(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return handleResponse(response);
  },

  /**
   * Create a new student
   */
  async createStudent(student) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        firstname: student.firstname.trim(),
        lastname: student.lastname.trim(),
        course: student.course.trim(),
        section: student.section.trim(),
      }),
    });
    return handleResponse(response);
  },

  /**
   * Update an existing student
   */
  async updateStudent(id, student) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        firstname: student.firstname.trim(),
        lastname: student.lastname.trim(),
        course: student.course.trim(),
        section: student.section.trim(),
      }),
    });
    return handleResponse(response);
  },

  /**
   * Delete student by ID
   */
  async deleteStudent(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
