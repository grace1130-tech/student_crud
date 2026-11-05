import React, { useState, useEffect } from 'react';

export default function StudentForm({
  editingStudent,
  onSubmit,
  onCancelEdit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setErrors({});
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
      setErrors({});
    }
  }, [editingStudent]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    }
    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }
    if (!formData.section.trim()) {
      newErrors.section = 'Section is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      course: '',
      section: '',
    });
    setErrors({});
    if (editingStudent && onCancelEdit) {
      onCancelEdit();
    }
  };

  const isEditing = Boolean(editingStudent);

  return (
    <div
      id="student-form-card"
      className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 overflow-hidden ${
        isEditing
          ? 'border-indigo-400 ring-2 ring-indigo-100 shadow-indigo-100'
          : 'border-slate-200 hover:shadow-md'
      }`}
    >
      {/* Form Card Header */}
      <div
        className={`px-6 py-4 border-b flex items-center justify-between ${
          isEditing
            ? 'bg-gradient-to-r from-indigo-50 to-indigo-100/50 border-indigo-200'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isEditing ? 'bg-indigo-600 animate-pulse' : 'bg-emerald-500'
            }`}
          />
          <h2 className="text-base font-bold text-slate-800">
            {isEditing ? `Edit Student (ID: ${editingStudent.id})` : 'Add New Student'}
          </h2>
        </div>
        {isEditing && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-600 text-white">
            Editing Mode
          </span>
        )}
      </div>

      {/* Form Card Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Firstname */}
        <div>
          <label
            htmlFor="firstname"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
          >
            First Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="firstname"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="e.g. Grace"
            disabled={isSubmitting}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.firstname
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 bg-white'
            }`}
          />
          {errors.firstname && (
            <p className="mt-1 text-xs text-rose-500">{errors.firstname}</p>
          )}
        </div>

        {/* Lastname */}
        <div>
          <label
            htmlFor="lastname"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
          >
            Last Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="lastname"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="e.g. Concepcion"
            disabled={isSubmitting}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.lastname
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 bg-white'
            }`}
          />
          {errors.lastname && (
            <p className="mt-1 text-xs text-rose-500">{errors.lastname}</p>
          )}
        </div>

        {/* Course */}
        <div>
          <label
            htmlFor="course"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
          >
            Course / Program <span className="text-rose-500">*</span>
          </label>
          <input
            id="course"
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="e.g. BSIT or BSCS"
            disabled={isSubmitting}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.course
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 bg-white'
            }`}
          />
          {errors.course && (
            <p className="mt-1 text-xs text-rose-500">{errors.course}</p>
          )}
        </div>

        {/* Section */}
        <div>
          <label
            htmlFor="section"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
          >
            Section <span className="text-rose-500">*</span>
          </label>
          <input
            id="section"
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            placeholder="e.g. DA3A or 3A"
            disabled={isSubmitting}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 ${
              errors.section
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 bg-white'
            }`}
          />
          {errors.section && (
            <p className="mt-1 text-xs text-rose-500">{errors.section}</p>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isEditing
                ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 shadow-indigo-200'
                : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 shadow-emerald-200'
            } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Saving...
              </span>
            ) : isEditing ? (
              'Update Student'
            ) : (
              'Save Student'
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-colors"
          >
            {isEditing ? 'Cancel Edit' : 'Clear'}
          </button>
        </div>
      </form>
    </div>
  );
}
