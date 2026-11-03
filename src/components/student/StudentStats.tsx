import React from 'react';
import { useApp } from '../../context/AppContext';
import { isOverdue } from '../../utils/dateUtils';
import {
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';

export const StudentStats: React.FC = () => {
  const { currentUser, assignments, submissions } = useApp();

  if (!currentUser || currentUser.role !== 'student') return null;

  // Assignments visible to this student
  const studentAssignments = assignments.filter((a) => {
    if (!a.assignedTo || a.assignedTo === 'all') return true;
    return a.assignedTo.includes(currentUser.id);
  });

  const totalCount = studentAssignments.length;

  let submittedCount = 0;
  let gradedCount = 0;
  let overdueCount = 0;
  let reopenedCount = 0;
  let totalScoreEarned = 0;
  let totalMaxMarksGraded = 0;

  studentAssignments.forEach((asg) => {
    const sub = submissions.find(
      (s) => s.assignmentId === asg.id && s.studentId === currentUser.id
    );

    if (sub) {
      if (sub.status === 'Graded') {
        gradedCount++;
        submittedCount++;
        if (typeof sub.grade === 'number') {
          totalScoreEarned += sub.grade;
          totalMaxMarksGraded += asg.maxMarks;
        }
      } else if (sub.status === 'Submitted') {
        submittedCount++;
      } else if (sub.status === 'Reopened') {
        reopenedCount++;
      }
    } else {
      if (isOverdue(asg.dueDate)) {
        overdueCount++;
      }
    }
  });

  const pendingCount = totalCount - submittedCount;
  const completionPercentage = totalCount > 0 ? Math.round((submittedCount / totalCount) * 100) : 0;
  const gradeAverage =
    totalMaxMarksGraded > 0 ? Math.round((totalScoreEarned / totalMaxMarksGraded) * 100) : null;

  return (
    <div className="space-y-4">
      {/* Revision Alert Banner if any assignments need revision */}
      {reopenedCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300 dark:border-amber-800 flex items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <RotateCcw className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <h4 className="text-sm font-bold">
                Action Required: {reopenedCount} Assignment{reopenedCount > 1 ? 's' : ''} Reopened for Revision
              </h4>
              <p className="text-xs opacity-90">
                The professor reviewed your submission and requested updates. Click to see instructions and resubmit.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Overall Progress Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white shadow-xl shadow-indigo-500/10 relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Overall Academic Progress</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
              {submittedCount} of {totalCount} assignments submitted
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100/90 mt-1 max-w-xl">
              {completionPercentage === 100
                ? "🎉 Great work! You've turned in all assigned coursework."
                : overdueCount > 0
                ? `Attention needed: You have ${overdueCount} overdue assignment${
                    overdueCount > 1 ? 's' : ''
                  }. Please prioritize submission.`
                : 'Keep the momentum going! Check upcoming deadlines below.'}
            </p>
          </div>

          <div className="flex items-center sm:flex-col sm:items-end justify-between shrink-0 gap-1 border-t sm:border-t-0 border-white/20 pt-3 sm:pt-0">
            <span className="text-3xl font-extrabold tracking-tight">
              {completionPercentage}%
            </span>
            <span className="text-xs text-indigo-200 font-medium">
              Completion Rate
            </span>
          </div>
        </div>

        {/* Visual Animated Progress Bar */}
        <div className="mt-4 w-full bg-black/20 rounded-full h-2.5 overflow-hidden p-0.5">
          <div
            className="bg-white h-full rounded-full transition-all duration-700 ease-out shadow-xs"
            style={{ width: `${Math.max(completionPercentage, 2)}%` }}
          />
        </div>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Pending Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Pending
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {pendingCount}
            </span>
          </div>
        </div>

        {/* Submitted Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Submitted
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {submittedCount}
            </span>
          </div>
        </div>

        {/* Graded Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Graded
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {gradedCount}
              </span>
              {gradeAverage !== null && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  ({gradeAverage}%)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Overdue Card */}
        <div
          className={`p-4 rounded-2xl border shadow-xs flex items-center gap-3.5 transition-colors ${
            overdueCount > 0
              ? 'bg-rose-50/60 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
          }`}
        >
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              overdueCount > 0
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/80 dark:text-rose-300'
                : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
            }`}
          >
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <span
              className={`text-xs font-semibold block ${
                overdueCount > 0
                  ? 'text-rose-700 dark:text-rose-300'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              Overdue
            </span>
            <span
              className={`text-xl sm:text-2xl font-black ${
                overdueCount > 0
                  ? 'text-rose-700 dark:text-rose-300'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {overdueCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
