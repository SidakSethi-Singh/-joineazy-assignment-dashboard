import React from 'react';
import { isOverdue, isDueToday, isDueSoon, formatDueDate } from '../../utils/dateUtils';
import { Calendar, AlertCircle, Clock, Check } from 'lucide-react';

interface DueDateBadgeProps {
  dueDate: string;
  isCompleted?: boolean;
  compact?: boolean;
}

export const DueDateBadge: React.FC<DueDateBadgeProps> = ({
  dueDate,
  isCompleted = false,
  compact = false,
}) => {
  const overdue = isOverdue(dueDate);
  const dueToday = isDueToday(dueDate);
  const dueSoon = isDueSoon(dueDate);
  const formatted = formatDueDate(dueDate);

  if (isCompleted) {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
        <Check className="w-3.5 h-3.5 text-emerald-500" />
        <span>Due was {formatted}</span>
      </div>
    );
  }

  if (overdue) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900 animate-pulse`}
      >
        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600 dark:text-rose-400" />
        <span>{compact ? 'Overdue' : `Overdue · ${formatted}`}</span>
      </div>
    );
  }

  if (dueToday) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border bg-amber-50 text-amber-800 border-amber-300/80 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800`}
      >
        <Clock className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
        <span>{compact ? 'Due Today' : `Due Today · 11:59 PM`}</span>
      </div>
    );
  }

  if (dueSoon) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800`}
      >
        <Clock className="w-3.5 h-3.5 shrink-0 text-sky-600 dark:text-sky-400" />
        <span>Due Soon · {formatted}</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
      <span>Due {formatted}</span>
    </div>
  );
};

