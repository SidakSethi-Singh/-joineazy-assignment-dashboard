import React from 'react';
import { useApp } from '../../context/AppContext';
import { Assignment } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { DueDateBadge } from '../common/DueDateBadge';
import { Clock, ArrowRight } from 'lucide-react';

interface DueSoonSectionProps {
  onSelectAssignment: (assignment: Assignment) => void;
}

export const DueSoonSection: React.FC<DueSoonSectionProps> = ({
  onSelectAssignment,
}) => {
  const { currentUser, assignments, getStudentAssignmentStatus } = useApp();

  if (!currentUser || currentUser.role !== 'student') return null;

  // Filter assignments assigned to this student
  const studentAssignments = assignments.filter((a) => {
    if (!a.assignedTo || a.assignedTo === 'all') return true;
    return a.assignedTo.includes(currentUser.id);
  });

  // Sort by dueDate ascending
  const sorted = [...studentAssignments].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  // Take the next 3 due assignments
  const nextThree = sorted.slice(0, 3);

  if (nextThree.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Due Soon
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Next 3 chronological deadlines
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {nextThree.map((assignment) => {
          const { status, isOverdue: overdue, isDueToday: dueToday } =
            getStudentAssignmentStatus(assignment);
          const isCompleted = status === 'Graded' || status === 'Submitted';

          return (
            <div
              key={assignment.id}
              onClick={() => onSelectAssignment(assignment)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group hover:shadow-md ${
                overdue && !isCompleted
                  ? 'border-rose-300 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-950/20 hover:border-rose-400'
                  : dueToday && !isCompleted
                  ? 'border-amber-300 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/20 hover:border-amber-400'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider truncate">
                    {assignment.subject}
                  </span>
                  <StatusBadge status={status} size="sm" />
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 mb-2">
                  {assignment.title}
                </h4>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs mt-2">
                <DueDateBadge
                  dueDate={assignment.dueDate}
                  isCompleted={isCompleted}
                  compact={true}
                />
                <span className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  View <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
