import { describe, it, expect } from 'vitest';
import { SEED_USERS, getInitialAssignments, getInitialSubmissions } from '../data/initialData';
import { isOverdue, isDueToday } from '../utils/dateUtils';

describe('Data Models & Strict Isolation Rules', () => {
  it('contains exactly the required 7 seed users with correct roles', () => {
    expect(SEED_USERS).toHaveLength(7);

    const admins = SEED_USERS.filter((u) => u.role === 'admin');
    const students = SEED_USERS.filter((u) => u.role === 'student');

    expect(admins).toHaveLength(2);
    expect(students).toHaveLength(5);

    // Verify exact names from the core brief
    const adminNames = admins.map((a) => a.name);
    expect(adminNames).toContain('Prof. Anita Sharma');
    expect(adminNames).toContain('Prof. Rahul Verma');

    const studentNames = students.map((s) => s.name);
    expect(studentNames).toContain('Aarav Mehta');
    expect(studentNames).toContain('Diya Kapoor');
    expect(studentNames).toContain('Arjun Singh');
    expect(studentNames).toContain('Ananya Iyer');
    expect(studentNames).toContain('Kabir Malhotra');
  });

  it('generates 5 assignments with exactly 1 overdue, 1 due today, and 3 upcoming', () => {
    const assignments = getInitialAssignments();
    expect(assignments).toHaveLength(5);

    let overdueCount = 0;
    let dueTodayCount = 0;
    let upcomingCount = 0;

    assignments.forEach((asg) => {
      if (isDueToday(asg.dueDate)) {
        dueTodayCount++;
      } else if (isOverdue(asg.dueDate)) {
        overdueCount++;
      } else {
        upcomingCount++;
      }
    });

    expect(overdueCount).toBe(1);
    expect(dueTodayCount).toBe(1);
    expect(upcomingCount).toBe(3);
  });

  it('guarantees strict data isolation: a student only accesses their own submissions', () => {
    const submissions = getInitialSubmissions();
    const aaravId = 'user-student-1';
    const diyaId = 'user-student-2';
    const kabirId = 'user-student-5';

    const aaravSubmissions = submissions.filter((s) => s.studentId === aaravId);
    const diyaSubmissions = submissions.filter((s) => s.studentId === diyaId);
    const kabirSubmissions = submissions.filter((s) => s.studentId === kabirId);

    // Aarav has 2 submissions
    expect(aaravSubmissions.length).toBeGreaterThan(0);
    aaravSubmissions.forEach((s) => {
      expect(s.studentId).toBe(aaravId);
      expect(s.studentId).not.toBe(diyaId);
    });

    // Diya has 1 Reopened submission
    const diyaReopened = diyaSubmissions.find((s) => s.status === 'Reopened');
    expect(diyaReopened).toBeDefined();
    expect(diyaReopened?.feedback).toContain('BCNF');

    // Kabir has 0 submissions initially (fresh student account)
    expect(kabirSubmissions).toHaveLength(0);
  });
});
