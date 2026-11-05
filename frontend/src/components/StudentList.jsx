import React, { useState } from 'react';

export default function StudentList({
  students,
  isLoading,
  editingId,
  onEdit,
  onDelete,
  deletingId,
}) {
  // Track which student ID is currently pending inline delete confirmation
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    await onDelete(id);
    setConfirmDeleteId(null);
  };

  if (isLoading && students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 mb-3 animate-spin">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
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
        </div>
        <p className="text-sm font-medium text-slate-600">Loading student records from API...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 shadow-sm text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
        <h3 className="text-base font-bold text-slate-800">No Students Found</h3>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          No records match your query, or no students have been added yet. Use the form to add a new student.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 uppercase text-[11px] font-semibold tracking-wider">
            <tr>
              <th scope="col" className="px-5 py-3.5 w-16 text-center">ID</th>
              <th scope="col" className="px-5 py-3.5">Full Name</th>
              <th scope="col" className="px-5 py-3.5">Course</th>
              <th scope="col" className="px-5 py-3.5">Section</th>
              <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {students.map((student) => {
              const isSelectedForEdit = editingId === student.id;
              const isPendingDelete = confirmDeleteId === student.id;
              const isDeleting = deletingId === student.id;

              return (
                <tr
                  key={student.id}
                  className={`transition-colors ${
                    isSelectedForEdit
                      ? 'bg-indigo-50/70 font-medium'
                      : isPendingDelete
                      ? 'bg-rose-50/50'
                      : 'hover:bg-slate-50/80'
                  }`}
                >
                  {/* ID */}
                  <td className="px-5 py-4 text-center font-mono text-xs text-slate-500">
                    #{student.id}
                  </td>

                  {/* Name */}
                  <td className="px-5 py-4 text-slate-900">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs uppercase flex-shrink-0 shadow-sm">
                        {student.firstname ? student.firstname.charAt(0) : 'S'}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {student.firstname} {student.lastname}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                      {student.course}
                    </span>
                  </td>

                  {/* Section */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      {student.section}
                    </span>
                  </td>

                  {/* Actions (Strictly NO MODAL - Inline Only) */}
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    {isPendingDelete ? (
                      <div className="inline-flex items-center space-x-2 bg-rose-50 p-1.5 rounded-xl border border-rose-200 animate-fadeIn">
                        <span className="text-xs font-semibold text-rose-700">Delete?</span>
                        <button
                          type="button"
                          onClick={() => handleConfirmDelete(student.id)}
                          disabled={isDeleting}
                          className="px-2.5 py-1 text-xs font-bold bg-rose-600 text-white rounded-lg hover:bg-rose-700 shadow-sm transition-colors"
                        >
                          {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelDelete}
                          disabled={isDeleting}
                          className="px-2 py-1 text-xs font-medium text-slate-600 hover:text-slate-800 bg-white rounded-lg border border-slate-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={() => onEdit(student)}
                          className={`inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            isSelectedForEdit
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
                          }`}
                          title="Edit this student in the form"
                        >
                          <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          {isSelectedForEdit ? 'Editing' : 'Edit'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteClick(student.id)}
                          className="inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:text-rose-800 hover:bg-rose-50 transition-colors"
                          title="Delete this student"
                        >
                          <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
