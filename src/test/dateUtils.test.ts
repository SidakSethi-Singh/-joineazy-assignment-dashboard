import { describe, it, expect } from 'vitest';
import {
  isOverdue,
  isDueToday,
  isDueSoon,
  formatDueDate,
  getUrgencyStatus,
  getRelativeISO,
} from '../utils/dateUtils';

describe('dateUtils', () => {
  it('correctly detects overdue dates in the past', () => {
    const pastDate = getRelativeISO(-2);
    expect(isOverdue(pastDate)).toBe(true);
  });

  it('correctly detects upcoming dates in the future', () => {
    const futureDate = getRelativeISO(3);
    expect(isOverdue(futureDate)).toBe(false);
  });

  it('correctly identifies dates due today', () => {
    const todayDate = getRelativeISO(0);
    expect(isDueToday(todayDate)).toBe(true);
  });

  it('identifies due soon within 48 hours', () => {
    const soonDate = new Date();
    soonDate.setHours(soonDate.getHours() + 12);
    expect(isDueSoon(soonDate.toISOString())).toBe(true);
  });

  it('returns appropriate urgency label and type', () => {
    const pastDate = getRelativeISO(-2);
    const overdueResult = getUrgencyStatus(pastDate, false);
    expect(overdueResult.type).toBe('overdue');
    expect(overdueResult.label).toBe('Overdue');

    const completedResult = getUrgencyStatus(pastDate, true);
    expect(completedResult.type).toBe('upcoming');
  });

  it('formats dates into readable strings', () => {
    const iso = '2026-11-05T18:30:00.000Z';
    const formatted = formatDueDate(iso);
    expect(formatted).toBeTruthy();
    expect(typeof formatted).toBe('string');
  });
});

