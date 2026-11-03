import React, { useState } from 'react';
import { Modal } from './Modal';
import { Assignment } from '../../types';
import { COURSE_MATERIALS_MAP, CourseResource } from '../../data/courseMaterialsData';
import { useToast } from '../../context/ToastContext';
import { playSuccessSound } from '../../utils/soundEffects';
import {
  FileText,
  Code2,
  Database,
  Presentation,
  Download,
  Eye,
  CheckCircle,
  Copy,
  FolderGit2,
  Award,
  Sparkles,
} from 'lucide-react';

interface CourseMaterialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment;
  instructorName?: string;
}

export const CourseMaterialsModal: React.FC<CourseMaterialsModalProps> = ({
  isOpen,
  onClose,
  assignment,
  instructorName,
}) => {
  const { success, info } = useToast();
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  const materials = COURSE_MATERIALS_MAP[assignment.id] || {
    assignmentId: assignment.id,
    drivePath: `joineazy://cloud.drive/${assignment.subject.toLowerCase()}/${assignment.id}`,
    instructorName: instructorName || 'Faculty Member',
    overview: `Official coursework repository and syllabus references for ${assignment.title}.`,
    resources: [
      {
        id: 'res-default-1',
        name: `${assignment.title.replace(/\s+/g, '_')}_Rubric.pdf`,
        type: 'pdf',
        size: '1.2 MB',
        description: 'Detailed grading rubric and submission requirements.',
        previewContent: `ASSIGNMENT CRITERIA & SUBMISSION INSTRUCTIONS\n\n1. Overview: ${assignment.description}\n2. Max Marks: ${assignment.maxMarks}\n3. Due Date: ${new Date(assignment.dueDate).toLocaleString()}\n4. Evaluation Standard: Thoroughness of work, clarity of explanations, adherence to instructions.`,
      },
    ],
  };

  const getFileIcon = (type: CourseResource['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-500" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-indigo-500" />;
      case 'dataset':
        return <Database className="w-5 h-5 text-amber-500" />;
      case 'slides':
        return <Presentation className="w-5 h-5 text-emerald-500" />;
      default:
        return <FileText className="w-5 h-5 text-blue-500" />;
    }
  };

  const handleDownload = (resourceName: string) => {
    playSuccessSound();
    success('File Download Started', `Downloaded "${resourceName}" to your local device.`);
  };

  const handleDownloadAll = () => {
    playSuccessSound();
    success('Bundle Downloaded', `Complete course bundle for "${assignment.title}" downloaded (.zip).`);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(materials.drivePath);
    playSuccessSound();
    info('Drive Link Copied', 'Cloud drive folder path copied to clipboard.');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Course Materials & Lab Repository"
      subtitle={`${assignment.title} • ${assignment.subject}`}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Cloud Connection Status Header */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 border border-indigo-200/60 dark:border-indigo-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Faculty Google Drive Repository
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <CheckCircle className="w-3 h-3" />
                  Synced & Available
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Instructor:{' '}
                <strong className="text-slate-800 dark:text-slate-200 font-medium">
                  {instructorName || materials.instructorName}
                </strong>{' '}
                • Read-Only Student Access
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition"
              title="Copy Cloud Path"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Link</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Bundle (.zip)</span>
            </button>
          </div>
        </div>

        {/* Overview Box */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
          {materials.overview}
        </p>

        {/* Course Resources List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Course Resource Files & Starter Packages</span>
          </h4>

          <div className="space-y-2.5">
            {materials.resources.map((res) => {
              const isPreviewOpen = activePreviewId === res.id;
              return (
                <div
                  key={res.id}
                  className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs"
                >
                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                        {getFileIcon(res.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {res.name}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {res.size}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                          {res.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      {res.previewContent && (
                        <button
                          type="button"
                          onClick={() =>
                            setActivePreviewId(isPreviewOpen ? null : res.id)
                          }
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                            isPreviewOpen
                              ? 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300'
                              : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isPreviewOpen ? 'Hide Preview' : 'Preview'}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDownload(res.name)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>

                  {/* Inline Formatted Preview Box */}
                  {isPreviewOpen && res.previewContent && (
                    <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4 animate-fade-in text-xs font-mono leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap max-h-64 overflow-y-auto">
                      <div className="text-[11px] font-sans font-bold uppercase text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Document In-App Excerpt</span>
                      </div>
                      {res.previewContent}
                    </div>
                  )}

                  {/* Rubric Breakdown if present */}
                  {res.rubricBreakdown && (
                    <div className="border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 px-4 py-3">
                      <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1 mb-2.5">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>Grading Rubric Breakdown</span>
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {res.rubricBreakdown.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 flex items-start justify-between gap-2"
                          >
                            <div>
                              <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                                {item.criteria}
                              </span>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                {item.description}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs shrink-0">
                              {item.marks} pts
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow-xs transition"
          >
            Back to Assignment
          </button>
        </div>
      </div>
    </Modal>
  );
};
