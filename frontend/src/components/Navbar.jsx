import React from 'react';

export default function Navbar({ studentCount, isLoading }) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white shadow-lg sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-lg text-white leading-tight">Student CRUD Portal</h1>
            <p className="text-xs text-slate-400">Spring Boot REST API &bull; Vite React &bull; Tailwind CSS</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            <span
              className={`w-2 h-2 mr-2 rounded-full ${
                isLoading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
              }`}
            ></span>
            {isLoading ? 'Syncing...' : 'API Active'}
          </span>

          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            Total Students: <strong className="ml-1 text-white">{studentCount}</strong>
          </span>
        </div>
      </div>
    </header>
  );
}
