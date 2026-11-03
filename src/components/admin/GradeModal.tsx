import React, { useState, useEffect } from 'react';
import { Assignment, Submission, User } from '../../types';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { SubmissionAttachmentModal } from '../common/SubmissionAttachmentModal';
import {
  CheckCircle2,
  RotateCcw,
  ExternalLink,
  FileText,
  AlertTriangle,
  Clock,
  Sparkles,
  Eye,
} from 'lucide-react';
import { playSuccessSound } from '../../utils/soundEffects';

interface GradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment;
  student: User;
  submission?: Submission;
}

const FEEDBACK_PRESETS = [
  '⭐️ Outstanding work! Rigorous methodology, comprehensive proofs, and clean documentation.',
  '👍 Good effort. Well structured, but please refine edge case considerations.',
  '⚠️ Needs revision. Please re-check the calculations and update your methodology according to the rubric.',
];

export const GradeModal: React.FC<GradeModalProps> = ({
  isOpen,
  onClose,
  assignment,
  student,
  submission,
}) => {
  const { gradeSubmission, requestRevision } = useApp();

  const [gradeInput, setGradeInput] = useState<string>('');
  const [feedbackInput, setFeedbackInput] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');
  const [showAttachmentModal, setShowAttachmentModal] = useState<boolean>(false);

  useEffect(() => {
    if (submission) {
      setGradeInput(submission.grade !== null ? String(submission.grade) : '');
      setFeedbackInput(submission.feedback || '');
    } else {
      setGradeInput('');
      setFeedbackInput('');
    }
    setErrorText('');
  }, [submission, isOpen]);

  if (!isOpen) return null;

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submission) {
      setErrorText('No submission exists yet to grade.');
      return;
    }

    const numGrade = Number(gradeInput);
    if (isNaN(numGrade) || gradeInput.trim() === '') {
      setErrorText('Please enter a valid numeric grade.');
      return;
    }

    if (numGrade < 0 || numGrade > assignment.maxMarks) {
      setErrorText(`Grade must be between 0 and ${assignment.maxMarks} marks.`);
      return;
    }

    playSuccessSound();
    gradeSubmission(submission.id, numGrade, feedbackInput.trim());
    onClose();
  };

  const handleRequestRevision = () => {
    if (!submission) return;
    if (!feedbackInput.trim()) {
      setErrorText('Please write feedback explaining why revision is requested.');
      return;
    }

    requestRevision(submission.id, feedbackInput.trim());
    onClose();
  };

  const setPresetGrade = (pct: number) => {
    const calculated = Math.round((assignment.maxMarks * pct) / 100);
    setGradeInput(String(calculated));
    setErrorText('');
  };

  const isUrl = (val?: string) => {
    return Boolean(val && /^https?:\/\//i.test(val.trim()));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      title={`Evaluation: ${student.name}`}
      subtitle={`${assignment.title} · Subject: ${assignment.subject}`}
    >
      <div className="space-y-5">
        {/* Student and Submission Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 ${
                student.avatarBg || 'bg-emerald-600'
              }`}
            >
              {student.avatarInitials}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {student.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {student.department || student.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Current Status:</span>
            <StatusBadge status={submission ? submission.status : 'Not Started'} size="sm" />
          </div>
        </div>

        {/* Student's Submitted Work */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span>Student Submission Content</span>
          </h4>

          {submission ? (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                {submission.content || <span className="italic text-slate-400">No written text provided.</span>}
              </div>

              {submission.linkOrFileName && (
                <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <ExternalLink className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                      {submission.linkOrFileName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowAttachmentModal(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 text-xs font-bold transition"
                      title="Inspect student submission artifact"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect File</span>
                    </button>
                    {isUrl(submission.linkOrFileName) && !submission.linkOrFileName.includes('drive.google.com/file/d/') && (
                      <a
                        href={submission.linkOrFileName}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 inline-flex items-center gap-1"
                      >
                        Open <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {submission.submittedAt && (
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Turned in on {new Date(submission.submittedAt).toLocaleString()}
                </p>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-sm text-slate-400">
              Student has not submitted any work yet for this assignment.
            </div>
          )}
        </div>

        {/* Grading & Feedback Form */}
        {submission && (
          <form onSubmit={handleSaveGrade} className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="marks-input"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    Marks Obtained *
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="marks-input"
                    type="number"
                    min="0"
                    max={assignment.maxMarks}
                    step="0.5"
                    value={gradeInput}
                    onChange={(e) => {
                      setGradeInput(e.target.value);
                      if (errorText) setErrorText('');
                    }}
                    placeholder={`0 - ${assignment.maxMarks}`}
                    className="w-full text-base font-bold rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 pr-14 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                    / {assignment.maxMarks}
                  </span>
                </div>

                {/* Quick Score Presets */}
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-[10px] text-slate-400 font-medium">Quick:</span>
                  {[
                    { label: '100%', pct: 100 },
                    { label: '90%', pct: 90 },
                    { label: '75%', pct: 75 },
                    { label: '50%', pct: 50 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setPresetGrade(p.pct)}
                      className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 hover:bg-indigo-100 text-slate-700 dark:bg-slate-800 dark:hover:bg-indigo-950/60 dark:text-slate-300 hover:text-indigo-600 transition"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="feedback-input"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Professor's Written Feedback
                </label>
                <textarea
                  id="feedback-input"
                  rows={3}
                  value={feedbackInput}
                  onChange={(e) => {
                    setFeedbackInput(e.target.value);
                    if (errorText) setErrorText('');
                  }}
                  placeholder="Provide constructive feedback, praise strengths, or state revision instructions..."
                  className="w-full text-sm rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />

                {/* Feedback Presets */}
                <div className="mt-2 space-y-1">
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-400" /> Insert quick feedback snippet:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {FEEDBACK_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFeedbackInput(preset)}
                        className="text-[10px] text-left px-2 py-1 rounded bg-slate-100 hover:bg-indigo-50 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 line-clamp-1 transition"
                      >
                        {preset.slice(0, 38)}...
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {errorText && (
              <p className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {errorText}
              </p>
            )}

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleRequestRevision}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-200 text-xs font-bold transition shadow-xs"
                title="Marks submission as Reopened and prompts student to revise work"
              >
                <RotateCcw className="w-4 h-4 text-amber-600" />
                <span>Request Revision (Reopen)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-md shadow-emerald-600/20 active:scale-[0.98]"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Grade</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Submission Attachment In-App Preview Modal */}
      {showAttachmentModal && submission?.linkOrFileName && (
        <SubmissionAttachmentModal
          isOpen={showAttachmentModal}
          onClose={() => setShowAttachmentModal(false)}
          fileNameOrUrl={submission.linkOrFileName}
          studentName={student.name}
          submittedAt={submission.submittedAt || undefined}
          contentExcerpt={submission.content}
        />
      )}
    </Modal>
  );
};
