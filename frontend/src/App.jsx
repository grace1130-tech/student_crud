import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';
import { studentService } from './services/studentService';

export default function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [errorBanner, setErrorBanner] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast(null);
  };

  // Fetch all students from backend
  const loadStudents = async () => {
    setIsLoading(true);
    setErrorBanner(null);
    try {
      const data = await studentService.getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load students:', err);
      setErrorBanner(
        `Unable to connect to the Student API backend: ${err.message}. Please ensure the Spring Boot server is running on port 8080.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Filter students based on search query
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const query = searchQuery.toLowerCase().trim();
    return students.filter((student) => {
      const idMatch = String(student.id).includes(query);
      const nameMatch = `${student.firstname || ''} ${student.lastname || ''}`
        .toLowerCase()
        .includes(query);
      const courseMatch = (student.course || '').toLowerCase().includes(query);
      const sectionMatch = (student.section || '').toLowerCase().includes(query);
      return idMatch || nameMatch || courseMatch || sectionMatch;
    });
  }, [students, searchQuery]);

  // Handle form submission (Create or Update)
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        const updated = await studentService.updateStudent(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showToast(`Student #${editingStudent.id} (${updated.firstname} ${updated.lastname}) updated successfully!`);
        setEditingStudent(null);
      } else {
        const created = await studentService.createStudent(formData);
        setStudents((prev) => [...prev, created]);
        showToast(`Student "${created.firstname} ${created.lastname}" added successfully!`);
      }
      // Re-fetch to ensure sync with database
      loadStudents();
    } catch (err) {
      console.error('Form submission error:', err);
      showToast(err.message || 'Failed to save student', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Switch form to Edit mode
  const handleEdit = (student) => {
    setEditingStudent(student);
    const formEl = document.getElementById('student-form-card');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Handle student deletion (Strictly inline, no modal)
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await studentService.deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
      showToast(`Student #${id} was deleted successfully.`);
    } catch (err) {
      console.error('Failed to delete student:', err);
      showToast(err.message || 'Failed to delete student', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* Navbar */}
      <Navbar studentCount={students.length} isLoading={isLoading} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Backend Connectivity Alert Banner */}
        {errorBanner && (
          <div className="mb-6 bg-rose-50 border border-rose-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-rose-800 shadow-sm">
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <h4 className="text-sm font-bold">API Connection Notice</h4>
                <p className="text-xs text-rose-700 mt-0.5">{errorBanner}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={loadStudents}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl self-end sm:self-center transition-colors shadow-sm"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Dashboard Title & Overview */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Student Records
            </h2>
            <p className="text-sm text-slate-500">
              Manage student enrollment, courses, sections, and records directly with full CRUD capabilities.
            </p>
          </div>
          <button
            type="button"
            onClick={loadStudents}
            disabled={isLoading}
            className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 shadow-sm transition-colors self-start sm:self-auto"
            title="Refresh student list from server"
          >
            <svg
              className={`w-3.5 h-3.5 mr-1.5 text-slate-500 ${isLoading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh Records
          </button>
        </div>

        {/* Responsive Grid Layout (NO MODALS: Inline Form + Table) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column (Sticky on Desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <StudentForm
              editingStudent={editingStudent}
              onSubmit={handleFormSubmit}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Directory Column (Search + Table) */}
          <div className="lg:col-span-8 space-y-4">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              totalCount={students.length}
              filteredCount={filteredStudents.length}
            />

            <StudentList
              students={filteredStudents}
              isLoading={isLoading}
              editingId={editingStudent ? editingStudent.id : null}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        Student CRUD Portal &bull; Built with Vite, React, Tailwind CSS, &amp; Spring Boot REST API
      </footer>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      )}
    </div>
  );
}
