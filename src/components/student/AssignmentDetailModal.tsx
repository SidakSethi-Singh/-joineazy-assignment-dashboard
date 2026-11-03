import React from 'react';
import { Assignment } from '../../types';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { DueDateBadge } from '../common/DueDateBadge';
import { SubmissionForm } from './SubmissionForm';
import {
  ExternalLink,
  BookOpen,
  User as UserIcon,
} from 'lucide-react';

interface AssignmentDetailModalProps {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AssignmentDetailModal: React.FC<AssignmentDetailModalProps> = ({
  assignment,
  isOpen,
  onClose,
}) => {
  const { users, getStudentAssignmentStatus } = useApp();

  if (!assignment) return null;

  const { status, submission } = getStudentAssignmentStatus(assignment);
  const isCompleted = status === 'Graded' || status === 'Submitted';

  const professor = users.find((u) => u.id === assignment.createdBy);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      title={assignment.title}
      subtitle={`${assignment.subject} · ${assignment.maxMarks} Max Marks`}
    >
      <div className="space-y-6">
        {/* Top Badges & Meta info */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={status} size="md" />
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-slate-700/80 text-slate-700 dark:text-slate-300">
              {assignment.subject}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
              {assignment.maxMarks} Marks
            </span>
          </div>

          <DueDateBadge
            dueDate={assignment.dueDate}
            isCompleted={isCompleted}
          />
        </div>

        {/* Professor & Reference Drive Link */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <UserIcon className="w-3.5 h-3.5 text-indigo-500" />
            <span>
              Instructor:{' '}
              <strong className="text-slate-800 dark:text-slate-200 font-medium">
                {professor?.name || 'Faculty Member'}
              </strong>
            </span>
          </div>

          {assignment.driveLink && (
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Course Materials & Drive Folder</span>
            </a>
          )}
        </div>

        {/* Detailed Assignment Instructions */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Assignment Brief & Problem Statement</span>
          </h4>
          <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {assignment.description}
          </div>
        </div>

        {/* Submission Section */}
        <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Your Submission
          </h4>
          <SubmissionForm
            assignment={assignment}
            submission={submission}
            onSuccess={() => {
              // Can remain open to show the new locked state or user can close
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
