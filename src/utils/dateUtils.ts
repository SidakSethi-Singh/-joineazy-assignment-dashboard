/**
 * Utility functions for date calculations, urgency determination, and formatting.
 */

export function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

export function isOverdue(dueDateStr: string): boolean {
  const due = new Date(dueDateStr).getTime();
  const now = new Date().getTime();
  return due < now;
}

export function isDueToday(dueDateStr: string): boolean {
  const due = new Date(dueDateStr);
  const now = new Date();
  return (
    due.getFullYear() === now.getFullYear() &&
    due.getMonth() === now.getMonth() &&
    due.getDate() === now.getDate()
  );
}

export function isDueSoon(dueDateStr: string, withinHours: number = 48): boolean {
  const due = new Date(dueDateStr).getTime();
  const now = new Date().getTime();
  const diffHours = (due - now) / (1000 * 60 * 60);
  return diffHours > 0 && diffHours <= withinHours;
}

export function formatDueDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function formatShortDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(d);
  } catch {
    return dateStr;
  }
}

export function getUrgencyStatus(dueDateStr: string, isCompleted: boolean): {
  type: 'overdue' | 'today' | 'upcoming';
  label: string;
} {
  if (isCompleted) {
    return { type: 'upcoming', label: formatDueDate(dueDateStr) };
  }

  if (isOverdue(dueDateStr)) {
    return { type: 'overdue', label: 'Overdue' };
  }

  if (isDueToday(dueDateStr)) {
    return { type: 'today', label: 'Due Today' };
  }

  return { type: 'upcoming', label: formatDueDate(dueDateStr) };
}

/**
 * Returns helper ISO string relative to current time
 */
export function getRelativeISO(daysOffset: number, hours: number = 23, minutes: number = 59): string {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
}

