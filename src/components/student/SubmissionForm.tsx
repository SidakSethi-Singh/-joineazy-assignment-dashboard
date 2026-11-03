import React, { useState, useEffect } from 'react';
import { Assignment, Submission } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  Send,
  Lock,
  ExternalLink,
  FileText,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Clock,
} from 'lucide-react';
import { ConfirmModal } from '../common/ConfirmModal';

interface SubmissionFormProps {
  assignment: Assignment;
  submission?: Submission;
  onSuccess?: () => void;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({
  assignment,
  submission,
  onSuccess,
}) => {
  const { submitAssignment } = useApp();

  const [content, setContent] = useState('');
  const [linkOrFileName, setLinkOrFileName] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [errorText, setErrorText] = useState('');

  const isGraded = submission?.status === 'Graded';
  const isSubmitted = submission?.status === 'Submitted';
  const isReopened = submission?.status === 'Reopened';
  const isLocked = isGraded || isSubmitted;

  // Initialize or prefill fields
  useEffect(() => {
    if (submission) {
      setContent(submission.content || '');
      setLinkOrFileName(submission.linkOrFileName || '');
    } else {
      setContent('');
      setLinkOrFileName('');
    }
    setErrorText('');
  }, [submission, assignment.id]);

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setErrorText('Please enter your written answer or submission notes.');
      return;
    }
    setErrorText('');
    // Trigger Step 2: Final confirmation dialog (Core PDF requirement: 2-step confirmation)
    setIsConfirmOpen(true);
  };

  const handleFinalSubmit = () => {
    submitAssignment(assignment.id, content.trim(), linkOrFileName.trim());
    if (onSuccess) onSuccess();
  };

  const isUrl = (val: string) => {
    return /^https?:\/\//i.test(val.trim());
  };

  return (
    <div className="space-y-5">
      {/* 1. Professor Feedback Banner (if Graded or Reopened) */}
      {isGraded && (
        <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-bold text-sm">Graded by Professor</span>
            </div>
            {typeof submission?.grade === 'number' && (
              <span className="text-base font-extrabold px-3 py-0.5 rounded-lg bg-emerald-600 text-white shadow-xs">
                {submission.grade} / {assignment.maxMarks} Marks ({Math.round((submission.grade / assignment.maxMarks) * 100)}%)
              </span>
            )}
          </div>
          {submission?.feedback ? (
            <p className="text-sm mt-2 leading-relaxed bg-white/70 dark:bg-slate-900/60 p-3 rounded-lg border border-emerald-200/60 dark:border-emerald-800/60">
              <span className="font-semibold block text-xs text-emerald-800 dark:text-emerald-300 mb-1">
                Professor's Feedback:
              </span>
              "{submission.feedback}"
            </p>
          ) : (
            <p className="text-xs text-emerald-700 dark:text-emerald-300 italic">
              No written comments provided.
            </p>
          )}
        </div>
      )}

      {isReopened && (
        <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-bold text-sm">Revision Requested by Professor</span>
          </div>
          {submission?.feedback && (
            <div className="text-sm leading-relaxed bg-white/80 dark:bg-slate-900/70 p-3 rounded-lg border border-amber-200 dark:border-amber-800/70 mb-3">
              <span className="font-semibold block text-xs text-amber-800 dark:text-amber-300 mb-1">
                Revision Notes:
              </span>
              "{submission.feedback}"
            </div>
          )}
          <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
            ✏️ You can edit your text answer and link below, then click "Resubmit Revised Work".
          </p>
        </div>
      )}

      {/* 2. Submission Form / View */}
      <form onSubmit={handlePreSubmit} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="submission-content"
              className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>Written Answer / Submission Notes *</span>
            </label>
            {isLocked && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <Lock className="w-3 h-3" /> Locked
              </span>
            )}
          </div>

          <textarea
            id="submission-content"
            rows={5}
            disabled={isLocked}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (errorText) setErrorText('');
            }}
            placeholder="Type your explanation, summary, code explanation, or methodology here..."
            className={`w-full text-sm rounded-xl border p-3.5 transition focus:outline-hidden focus:ring-2 focus:ring-indigo-500 ${
              isLocked
                ? 'bg-slate-100/70 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400'
            }`}
          />
          {errorText && (
            <p className="text-xs text-rose-600 dark:text-rose-400 mt-1 font-medium flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              {errorText}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="submission-link"
              className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4 text-indigo-500" />
              <span>Optional Drive Link / GitHub URL / Attached File Name</span>
            </label>
          </div>

          {isLocked && linkOrFileName ? (
            <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
              <span className="text-sm text-slate-800 dark:text-slate-200 font-medium truncate">
                {linkOrFileName}
              </span>
              {isUrl(linkOrFileName) && (
                <a
                  href={linkOrFileName}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 shrink-0"
                >
                  Open Link <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ) : (
            <input
              id="submission-link"
              type="text"
              disabled={isLocked}
              value={linkOrFileName}
              onChange={(e) => setLinkOrFileName(e.target.value)}
              placeholder="e.g. https://drive.google.com/... or https://github.com/... or assignment_final.pdf"
              className={`w-full text-sm rounded-xl border p-3 transition focus:outline-hidden focus:ring-2 focus:ring-indigo-500 ${
                isLocked
                  ? 'bg-slate-100/70 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400'
              }`}
            />
          )}
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            (No real file upload required; stored cleanly as a link or attachment reference)
          </p>
        </div>

        {/* Submission Timestamp Info */}
        {submission?.submittedAt && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <Clock className="w-3.5 h-3.5" />
            <span>
              Submitted on{' '}
              {new Date(submission.submittedAt).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        {!isLocked && (
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg active:scale-[0.99]"
            >
              {isReopened ? (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Submit Revised Work</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Assignment</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-2">
              Step 1 of 2: Clicking will ask for your final confirmation before locking.
            </p>
          </div>
        )}
      </form>

      {/* Two-step Submission Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleFinalSubmit}
        title="Confirm Assignment Submission"
        description={
          <div className="space-y-2 text-left">
            <p>
              Are you sure you want to submit your coursework for{' '}
              <strong className="text-slate-900 dark:text-white">
                "{assignment.title}"
              </strong>
              ?
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              🔒 Once submitted, your submission will be locked and routed to the professor for evaluation. It cannot be altered unless reopened for revision.
            </p>
          </div>
        }
        confirmLabel="Yes, I Have Submitted"
        cancelLabel="Back to Editing"
        variant="primary"
      />
    </div>
  );
};
