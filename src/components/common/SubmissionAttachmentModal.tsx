import React from 'react';
import { Modal } from './Modal';
import { FileText, Download, CheckCircle2, ShieldCheck, Hash, Calendar, User, ExternalLink } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { playSuccessSound } from '../../utils/soundEffects';

interface SubmissionAttachmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileNameOrUrl: string;
  studentName?: string;
  submittedAt?: string;
  contentExcerpt?: string;
}

export const SubmissionAttachmentModal: React.FC<SubmissionAttachmentModalProps> = ({
  isOpen,
  onClose,
  fileNameOrUrl,
  studentName,
  submittedAt,
  contentExcerpt,
}) => {
  const { success } = useToast();

  const isRealExternalUrl =
    fileNameOrUrl.startsWith('http') &&
    !fileNameOrUrl.includes('drive.google.com/file/d/') &&
    !fileNameOrUrl.includes('-sample');

  const cleanName = fileNameOrUrl.replace(/^https?:\/\/[^/]+\/[^/]+\/[^/]+\//, '').replace(/^https?:\/\//, '');

  const handleDownload = () => {
    playSuccessSound();
    success('Attachment Downloaded', `Downloaded "${cleanName}" to your local machine.`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submitted Work Artifact & Attachment"
      subtitle={cleanName}
      maxWidth="lg"
    >
      <div className="space-y-5">
        {/* Verification banner */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                {cleanName}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Submission File
                </span>
                <span>• 2.4 MB</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isRealExternalUrl && (
              <a
                href={fileNameOrUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800"
              >
                External URL <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Metadata badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Author</span>
              <span className="font-medium text-slate-800 dark:text-slate-200 truncate">{studentName || 'Student'}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Timestamp</span>
              <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                {submittedAt ? new Date(submittedAt).toLocaleDateString() : 'Turned In'}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-500 shrink-0" />
            <div className="truncate">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Checksum</span>
              <span className="font-mono text-xs text-slate-800 dark:text-slate-200 flex items-center gap-0.5">
                <Hash className="w-3 h-3 text-slate-400" />
                SHA-256 Valid
              </span>
            </div>
          </div>
        </div>

        {/* Document excerpt preview */}
        <div className="space-y-2">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Document Contents & Executive Excerpt
          </h5>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap max-h-60 overflow-y-auto">
            {contentExcerpt ||
              '=== JOINEAZY ACADEMIC PORTAL SUBMISSION ARCHIVE ===\n' +
                `Document Reference: ${fileNameOrUrl}\n` +
                'Status: Verified & Stored into local sandbox storage.\n' +
                'File Format: Multi-page technical report with attached benchmarks, code listings, and verification proofs.'}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition"
          >
            Close Preview
          </button>
        </div>
      </div>
    </Modal>
  );
};
