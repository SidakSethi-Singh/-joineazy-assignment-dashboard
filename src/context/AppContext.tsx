import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { User, Assignment, Submission, SubmissionStatus } from '../types';
import { SEED_USERS, getInitialAssignments, getInitialSubmissions } from '../data/initialData';
import { getStoredItem, setStoredItem, STORAGE_KEYS, clearAllAppData } from '../utils/storage';
import { isOverdue, isDueToday } from '../utils/dateUtils';
import { useToast } from './ToastContext';

interface StudentStatusResult {
  status: SubmissionStatus;
  submission?: Submission;
  isOverdue: boolean;
  isDueToday: boolean;
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  assignments: Assignment[];
  submissions: Submission[];
  theme: 'light' | 'dark';
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  switchUser: (userId: string) => void;
  logout: () => void;
  toggleTheme: () => void;
  resetDemoData: () => void;

  // Student specific methods
  submitAssignment: (assignmentId: string, content: string, linkOrFileName: string) => void;
  getStudentSubmission: (assignmentId: string, studentId?: string) => Submission | undefined;
  getStudentAssignmentStatus: (assignment: Assignment, studentId?: string) => StudentStatusResult;

  // Admin specific methods
  createAssignment: (data: Omit<Assignment, 'id' | 'createdAt'>) => void;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  gradeSubmission: (submissionId: string, grade: number, feedback: string) => void;
  requestRevision: (submissionId: string, feedback: string) => void;
  getSubmissionsForAssignment: (assignmentId: string) => Submission[];
  getAllStudentStatusesForAssignment: (assignmentId: string) => Array<{
    student: User;
    submission?: Submission;
    status: SubmissionStatus;
  }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useToast();

  // 1. Users list
  const [users] = useState<User[]>(() => {
    return getStoredItem<User[]>(STORAGE_KEYS.USERS, SEED_USERS);
  });

  // 2. Current User (default to stored user or null for login screen on first run)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUserId = getStoredItem<string | null>(STORAGE_KEYS.CURRENT_USER, null);
    if (storedUserId) {
      const found = users.find((u) => u.id === storedUserId);
      if (found) return found;
    }
    return null;
  });

  // 3. Assignments list
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    return getStoredItem<Assignment[]>(STORAGE_KEYS.ASSIGNMENTS, getInitialAssignments());
  });

  // 4. Submissions list
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    return getStoredItem<Submission[]>(STORAGE_KEYS.SUBMISSIONS, getInitialSubmissions());
  });

  // 5. Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = getStoredItem<'light' | 'dark'>(STORAGE_KEYS.THEME, 'light');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return storedTheme;
  });

  // 6. Role switcher modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    if (currentUser) {
      setStoredItem(STORAGE_KEYS.CURRENT_USER, currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.ASSIGNMENTS, assignments);
  }, [assignments]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.SUBMISSIONS, submissions);
  }, [submissions]);

  useEffect(() => {
    setStoredItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Theme toggle
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  // Modal handlers
  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  // Switch User
  const switchUser = useCallback(
    (userId: string) => {
      const selected = users.find((u) => u.id === userId);
      if (selected) {
        setCurrentUser(selected);
        setIsAuthModalOpen(false);
        toast.info(
          `Switched to ${selected.name}`,
          `Role: ${selected.role === 'admin' ? 'Professor (Admin)' : 'Student'}`
        );
      }
    },
    [users, toast]
  );

  // Logout / Return to Login Screen
  const logout = useCallback(() => {
    setCurrentUser(null);
    setStoredItem(STORAGE_KEYS.CURRENT_USER, null);
    toast.info('Logged out', 'Returned to mock login screen.');
  }, [toast]);

  // Reset Demo Data
  const resetDemoData = useCallback(() => {
    clearAllAppData();
    const freshAssignments = getInitialAssignments();
    const freshSubmissions = getInitialSubmissions();
    setAssignments(freshAssignments);
    setSubmissions(freshSubmissions);
    // Keep current user or set to Aarav
    const defaultUser = users.find((u) => u.id === 'user-student-1') || users[0];
    setCurrentUser(defaultUser);
    setStoredItem(STORAGE_KEYS.CURRENT_USER, defaultUser.id);
    setStoredItem(STORAGE_KEYS.ASSIGNMENTS, freshAssignments);
    setStoredItem(STORAGE_KEYS.SUBMISSIONS, freshSubmissions);
    toast.success('Demo data restored', 'Initial 7 users, 5 assignments, and sample submissions loaded.');
  }, [users, toast]);

  // Student: Get submission for assignment
  const getStudentSubmission = useCallback(
    (assignmentId: string, studentId?: string): Submission | undefined => {
      const effectiveStudentId = studentId || currentUser?.id;
      if (!effectiveStudentId) return undefined;
      return submissions.find(
        (s) => s.assignmentId === assignmentId && s.studentId === effectiveStudentId
      );
    },
    [submissions, currentUser]
  );

  // Student: Compute effective status for assignment
  const getStudentAssignmentStatus = useCallback(
    (assignment: Assignment, studentId?: string): StudentStatusResult => {
      const sub = getStudentSubmission(assignment.id, studentId);
      const overdue = isOverdue(assignment.dueDate);
      const today = isDueToday(assignment.dueDate);

      if (sub) {
        return {
          status: sub.status,
          submission: sub,
          isOverdue: overdue,
          isDueToday: today,
        };
      }

      // No submission yet
      if (overdue) {
        return {
          status: 'Overdue',
          submission: undefined,
          isOverdue: true,
          isDueToday: false,
        };
      }

      return {
        status: 'Not Started',
        submission: undefined,
        isOverdue: false,
        isDueToday: today,
      };
    },
    [getStudentSubmission]
  );

  // Student: Submit assignment work
  const submitAssignment = useCallback(
    (assignmentId: string, content: string, linkOrFileName: string) => {
      if (!currentUser || currentUser.role !== 'student') {
        toast.error('Permission denied', 'Only students can submit assignments.');
        return;
      }

      setSubmissions((prev) => {
        const existingIndex = prev.findIndex(
          (s) => s.assignmentId === assignmentId && s.studentId === currentUser.id
        );

        if (existingIndex >= 0) {
          // Update existing (e.g. resubmitting a reopened assignment)
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            content,
            linkOrFileName,
            status: 'Submitted',
            submittedAt: new Date().toISOString(),
          };
          return updated;
        } else {
          // Create new submission
          const newSub: Submission = {
            id: `sub-${Date.now()}`,
            assignmentId,
            studentId: currentUser.id,
            content,
            linkOrFileName,
            status: 'Submitted',
            submittedAt: new Date().toISOString(),
            grade: null,
            feedback: null,
          };
          return [...prev, newSub];
        }
      });

      toast.success(
        'Assignment submitted successfully',
        'Your work has been locked and submitted to the professor.'
      );
    },
    [currentUser, toast]
  );

  // Admin: Create Assignment
  const createAssignment = useCallback(
    (data: Omit<Assignment, 'id' | 'createdAt'>) => {
      if (!currentUser || currentUser.role !== 'admin') {
        toast.error('Permission denied', 'Only professors can create assignments.');
        return;
      }

      const newAssignment: Assignment = {
        ...data,
        id: `asg-${Date.now()}`,
        createdBy: currentUser.id,
        createdAt: new Date().toISOString(),
      };

      setAssignments((prev) => [newAssignment, ...prev]);
      toast.success('Assignment created', `"${newAssignment.title}" is now published.`);
    },
    [currentUser, toast]
  );

  // Admin: Update Assignment
  const updateAssignment = useCallback(
    (id: string, updates: Partial<Assignment>) => {
      setAssignments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
      );
      toast.success('Assignment updated', 'Changes have been saved successfully.');
    },
    [toast]
  );

  // Admin: Delete Assignment
  const deleteAssignment = useCallback(
    (id: string) => {
      const toDelete = assignments.find((a) => a.id === id);
      setAssignments((prev) => prev.filter((a) => a.id !== id));
      // Cascade delete submissions for this assignment
      setSubmissions((prev) => prev.filter((s) => s.assignmentId !== id));
      toast.info('Assignment deleted', `"${toDelete?.title || 'Assignment'}" was removed.`);
    },
    [assignments, toast]
  );

  // Admin: Grade Submission
  const gradeSubmission = useCallback(
    (submissionId: string, grade: number, feedback: string) => {
      setSubmissions((prev) =>
        prev.map((s) => {
          if (s.id === submissionId) {
            return {
              ...s,
              grade,
              feedback,
              status: 'Graded',
              gradedAt: new Date().toISOString(),
              gradedBy: currentUser?.id,
            };
          }
          return s;
        })
      );
      toast.success('Grade recorded', `Awarded ${grade} marks with written feedback.`);
    },
    [currentUser, toast]
  );

  // Admin: Request Revision (Reopen Submission)
  const requestRevision = useCallback(
    (submissionId: string, feedback: string) => {
      setSubmissions((prev) =>
        prev.map((s) => {
          if (s.id === submissionId) {
            return {
              ...s,
              status: 'Reopened',
              feedback,
              grade: null,
            };
          }
          return s;
        })
      );
      toast.warning('Revision requested', 'Submission marked as Reopened for student resubmission.');
    },
    [toast]
  );

  // Admin: Get all submissions for an assignment
  const getSubmissionsForAssignment = useCallback(
    (assignmentId: string): Submission[] => {
      return submissions.filter((s) => s.assignmentId === assignmentId);
    },
    [submissions]
  );

  // Admin: Get status for every student for an assignment
  const getAllStudentStatusesForAssignment = useCallback(
    (assignmentId: string) => {
      const assignment = assignments.find((a) => a.id === assignmentId);
      const studentUsers = users.filter((u) => u.role === 'student');

      if (!assignment) return [];

      return studentUsers.map((student) => {
        const sub = submissions.find(
          (s) => s.assignmentId === assignmentId && s.studentId === student.id
        );

        let status: SubmissionStatus = 'Not Started';
        if (sub) {
          status = sub.status;
        } else if (isOverdue(assignment.dueDate)) {
          status = 'Overdue';
        }

        return {
          student,
          submission: sub,
          status,
        };
      });
    },
    [assignments, users, submissions]
  );

  const value = useMemo(
    () => ({
      currentUser,
      users,
      assignments,
      submissions,
      theme,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      switchUser,
      logout,
      toggleTheme,
      resetDemoData,
      submitAssignment,
      getStudentSubmission,
      getStudentAssignmentStatus,
      createAssignment,
      updateAssignment,
      deleteAssignment,
      gradeSubmission,
      requestRevision,
      getSubmissionsForAssignment,
      getAllStudentStatusesForAssignment,
    }),
    [
      currentUser,
      users,
      assignments,
      submissions,
      theme,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      switchUser,
      logout,
      toggleTheme,
      resetDemoData,
      submitAssignment,
      getStudentSubmission,
      getStudentAssignmentStatus,
      createAssignment,
      updateAssignment,
      deleteAssignment,
      gradeSubmission,
      requestRevision,
      getSubmissionsForAssignment,
      getAllStudentStatusesForAssignment,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
