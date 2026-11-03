import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../components/common/StatusBadge';
import { DueDateBadge } from '../components/common/DueDateBadge';
import { getRelativeISO } from '../utils/dateUtils';

describe('UI Component Tests', () => {
  it('renders StatusBadge with Graded status and correct text', () => {
    render(<StatusBadge status="Graded" />);
    expect(screen.getByText('Graded')).toBeTruthy();
  });

  it('renders StatusBadge with Reopened status', () => {
    render(<StatusBadge status="Reopened" />);
    expect(screen.getByText('Reopened')).toBeTruthy();
  });

  it('renders StatusBadge with Overdue status', () => {
    render(<StatusBadge status="Overdue" />);
    expect(screen.getByText('Overdue')).toBeTruthy();
  });

  it('renders DueDateBadge with Overdue warning when date is past', () => {
    const pastDate = getRelativeISO(-2);
    render(<DueDateBadge dueDate={pastDate} isCompleted={false} />);
    expect(screen.getByText(/Overdue/i)).toBeTruthy();
  });

  it('renders DueDateBadge with Due Today badge when date is today', () => {
    const todayDate = getRelativeISO(0);
    render(<DueDateBadge dueDate={todayDate} isCompleted={false} />);
    expect(screen.getByText(/Due Today/i)).toBeTruthy();
  });

  it('renders DueDateBadge as completed when isCompleted is true', () => {
    const pastDate = getRelativeISO(-2);
    render(<DueDateBadge dueDate={pastDate} isCompleted={true} />);
    expect(screen.getByText(/Due was/i)).toBeTruthy();
  });
});
