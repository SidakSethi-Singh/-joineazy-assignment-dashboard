import React from 'react';
import { useApp } from '../../context/AppContext';
import { AdminStats } from './AdminStats';
import { AssignmentManagement } from './AssignmentManagement';
import { ShieldCheck } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { currentUser, assignments } = useApp();

  if (!currentUser || currentUser.role !== 'admin') return null;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Faculty Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-base shadow-sm shrink-0 ${
              currentUser.avatarBg || 'bg-indigo-600'
            }`}
          >
            {currentUser.avatarInitials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {currentUser.name}
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Professor · Admin View
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {currentUser.department} · {currentUser.email}
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" />
          <span>Full Academic Evaluation & Grading Privileges</span>
        </div>
      </div>

      {/* Admin Overview Stats */}
      <AdminStats filteredAssignmentsCount={assignments.length} />

      {/* Assignment Management and Submissions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Coursework & Submissions Review
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage assignments, track submission rates, grade student work, and request revisions.
            </p>
          </div>
        </div>

        <AssignmentManagement />
      </div>
    </div>
  );
};
