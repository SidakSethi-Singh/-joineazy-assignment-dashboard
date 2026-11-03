import React from 'react';
import { useApp } from '../../context/AppContext';
import { isOverdue } from '../../utils/dateUtils';
import { BookOpen, Send, Clock, AlertTriangle } from 'lucide-react';

interface AdminStatsProps {
  filteredAssignmentsCount?: number;
}

export const AdminStats: React.FC<AdminStatsProps> = () => {
  const { assignments, submissions, users } = useApp();

  const studentUsers = users.filter((u) => u.role === 'student');

  const totalAssignments = assignments.length;
  const totalSubmissions = submissions.length;

  // Pending grading = submitted or reopened (awaiting professor's grading)
  const pendingGradingCount = submissions.filter(
    (s) => s.status === 'Submitted'
  ).length;

  const gradedCount = submissions.filter((s) => s.status === 'Graded').length;

  // Overdue count: for every assignment that is overdue, how many students did NOT submit
  let overdueSubmissionsCount = 0;
  assignments.forEach((asg) => {
    if (isOverdue(asg.dueDate)) {
      studentUsers.forEach((student) => {
        const sub = submissions.find(
          (s) => s.assignmentId === asg.id && s.studentId === student.id
        );
        if (!sub || sub.status === 'Not Started') {
          overdueSubmissionsCount++;
        }
      });
    }
  });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* Total Assignments */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Total Assignments
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {totalAssignments}
          </span>
        </div>
      </div>

      {/* Submissions Received */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <Send className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Submissions Received
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {totalSubmissions}
            </span>
            <span className="text-xs text-slate-400">
              ({gradedCount} graded)
            </span>
          </div>
        </div>
      </div>

      {/* Pending Grading */}
      <div
        className={`p-4 rounded-2xl border shadow-xs flex items-center gap-3.5 transition-colors ${
          pendingGradingCount > 0
            ? 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900'
            : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
        }`}
      >
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            pendingGradingCount > 0
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <span
            className={`text-xs font-semibold block ${
              pendingGradingCount > 0
                ? 'text-amber-700 dark:text-amber-300'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Pending Grading
          </span>
          <span
            className={`text-xl sm:text-2xl font-black ${
              pendingGradingCount > 0
                ? 'text-amber-800 dark:text-amber-200'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {pendingGradingCount}
          </span>
        </div>
      </div>

      {/* Overdue Submissions */}
      <div
        className={`p-4 rounded-2xl border shadow-xs flex items-center gap-3.5 transition-colors ${
          overdueSubmissionsCount > 0
            ? 'bg-rose-50/50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900'
            : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
        }`}
      >
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
            overdueSubmissionsCount > 0
              ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/60 dark:text-rose-300'
              : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
          }`}
        >
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <span
            className={`text-xs font-semibold block ${
              overdueSubmissionsCount > 0
                ? 'text-rose-700 dark:text-rose-300'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Overdue Submissions
          </span>
          <span
            className={`text-xl sm:text-2xl font-black ${
              overdueSubmissionsCount > 0
                ? 'text-rose-700 dark:text-rose-300'
                : 'text-slate-900 dark:text-white'
            }`}
          >
            {overdueSubmissionsCount}
          </span>
        </div>
      </div>
    </div>
  );
};
