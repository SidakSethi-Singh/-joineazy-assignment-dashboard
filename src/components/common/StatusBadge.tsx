import React from 'react';
import { SubmissionStatus } from '../../types';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  RotateCcw,
  Send,
  CircleDashed,
} from 'lucide-react';

interface StatusBadgeProps {
  status: SubmissionStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
}) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Graded':
        return {
          icon: CheckCircle2,
          classes:
            'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/80',
          dotClass: 'bg-emerald-500',
        };
      case 'Submitted':
        return {
          icon: Send,
          classes:
            'bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800/80',
          dotClass: 'bg-indigo-500',
        };
      case 'Reopened':
        return {
          icon: RotateCcw,
          classes:
            'bg-amber-50 text-amber-800 border-amber-200/80 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/80',
          dotClass: 'bg-amber-500 animate-pulse',
        };
      case 'Overdue':
        return {
          icon: AlertCircle,
          classes:
            'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/80',
          dotClass: 'bg-rose-500',
        };
      case 'In Progress':
        return {
          icon: Clock,
          classes:
            'bg-sky-50 text-sky-700 border-sky-200/80 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800/80',
          dotClass: 'bg-sky-500',
        };
      case 'Not Started':
      default:
        return {
          icon: CircleDashed,
          classes:
            'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700',
          dotClass: 'bg-slate-400',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-medium',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-xs tracking-tight transition-all select-none ${
        sizeClasses[size]
      } ${config.classes}`}
    >
      {showIcon && <Icon className={`${iconSizes[size]} shrink-0`} />}
      <span>{status}</span>
    </span>
  );
};
