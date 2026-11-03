export type Role = 'student' | 'admin';

export type SubmissionStatus =
  | 'Not Started'
  | 'In Progress'
  | 'Submitted'
  | 'Graded'
  | 'Overdue'
  | 'Reopened';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatarInitials: string;
  department?: string;
  avatarBg?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string; // ISO date string: YYYY-MM-DDTHH:mm
  maxMarks: number;
  createdBy: string; // admin user id
  assignedTo?: string[] | 'all'; // student IDs or 'all'
  driveLink?: string; // external reference resource or Google Drive folder
  createdAt?: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  content: string; // text answer or summary
  linkOrFileName: string; // link to Google Drive, GitHub repo, or simulated file attachment
  status: SubmissionStatus;
  submittedAt: string | null; // ISO date string
  grade: number | null;
  feedback: string | null;
  gradedAt?: string | null;
  gradedBy?: string | null;
}

export type SubjectFilter = 'All' | 'Computer Science' | 'Mathematics' | 'Physics' | 'English' | 'Database Management Systems';

export type StatusFilter = 'All' | 'Not Started' | 'In Progress' | 'Submitted' | 'Graded' | 'Overdue' | 'Reopened';

export type SortOption = 'dueDate-asc' | 'dueDate-desc' | 'title-asc' | 'maxMarks-desc';

