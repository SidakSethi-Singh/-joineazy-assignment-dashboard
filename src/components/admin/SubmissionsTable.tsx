import React, { useState, useMemo } from 'react';
import { Assignment, Submission, User } from '../../types';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { GradeModal } from './GradeModal';
import { EmptyState } from '../common/EmptyState';
import {
  Search,
  RotateCcw,
  ExternalLink,
  Users,
  Filter,
} from 'lucide-react';

interface SubmissionsTableProps {
  assignment: Assignment;
}

export const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ assignment }) => {
  const { getAllStudentStatusesForAssignment, requestRevision } = useApp();

  const [studentSearch, setStudentSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Selected student and submission for grading modal
  const [activeGrading, setActiveGrading] = useState<{
    student: User;
    submission?: Submission;
  } | null>(null);

  // Student statuses for this assignment
  const allStudentStatuses = getAllStudentStatusesForAssignment(assignment.id);

  // Compute completion rate
  const totalStudents = allStudentStatuses.length;
  const submittedCount = allStudentStatuses.filter(
    (item) => item.status === 'Submitted' || item.status === 'Graded'
  ).length;
  const completionPercentage =
    totalStudents > 0 ? Math.round((submittedCount / totalStudents) * 100) : 0;

  // Filter list
  const filteredList = useMemo(() => {
    return allStudentStatuses.filter(({ student, status }) => {
      const query = studentSearch.toLowerCase().trim();
      const matchesSearch =
        !query ||
        student.name.toLowerCase().includes(query) ||
        (student.department && student.department.toLowerCase().includes(query)) ||
        student.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Pending Review' && status === 'Submitted') ||
        status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [allStudentStatuses, studentSearch, statusFilter]);

  const handleQuickReopen = (sub: Submission) => {
    requestRevision(sub.id, 'Revision requested: Please update your work according to the rubric.');
  };

  return (
    <div className="space-y-4">
      {/* Assignment Class Completion Rate Bar */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Class Submission Rate
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {submittedCount} of {totalStudents} students submitted ({completionPercentage}%)
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-64">
          <div className="flex-1 bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(completionPercentage, 2)}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 shrink-0">
            {completionPercentage}%
          </span>
        </div>
      </div>

      {/* Submissions Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            placeholder="Search students..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto py-1.5 px-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            <option value="All">All Submissions ({allStudentStatuses.length})</option>
            <option value="Pending Review">Pending Grading</option>
            <option value="Graded">Graded</option>
            <option value="Reopened">Reopened</option>
            <option value="Not Started">Not Submitted</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Responsive Table for Desktop & Cards for Mobile */}
      {filteredList.length === 0 ? (
        <EmptyState
          title="No students match criteria"
          description="Try clearing your search query or changing the submission status filter."
        />
      ) : (
        <div className="space-y-3">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Submitted Work</th>
                  <th className="px-4 py-3">Submitted At</th>
                  <th className="px-4 py-3">Score & Feedback</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredList.map(({ student, submission, status }) => {
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      {/* Student */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0 ${
                              student.avatarBg || 'bg-indigo-600'
                            }`}
                          >
                            {student.avatarInitials}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {student.name}
                            </span>
                            <span className="text-[11px] text-slate-400 block truncate max-w-[140px]">
                              {student.department}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <StatusBadge status={status} size="sm" />
                      </td>

                      {/* Submitted Work */}
                      <td className="px-4 py-3 max-w-xs">
                        {submission ? (
                          <div className="space-y-1">
                            <p className="line-clamp-2 text-slate-800 dark:text-slate-200">
                              {submission.content}
                            </p>
                            {submission.linkOrFileName && (
                              <div className="flex items-center gap-1 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 truncate">
                                <ExternalLink className="w-3 h-3 shrink-0" />
                                <span className="truncate">{submission.linkOrFileName}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">No work submitted</span>
                        )}
                      </td>

                      {/* Submitted At */}
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                        {submission?.submittedAt ? (
                          new Date(submission.submittedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                          })
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Score & Feedback */}
                      <td className="px-4 py-3 max-w-xs">
                        {status === 'Graded' && typeof submission?.grade === 'number' ? (
                          <div>
                            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                              {submission.grade} / {assignment.maxMarks}
                            </span>
                            {submission.feedback && (
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 italic mt-0.5">
                                "{submission.feedback}"
                              </p>
                            )}
                          </div>
                        ) : status === 'Reopened' ? (
                          <span className="text-amber-700 dark:text-amber-400 text-xs font-semibold">
                            Revision Requested
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Ungraded</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {submission ? (
                            <>
                              <button
                                onClick={() => setActiveGrading({ student, submission })}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition"
                              >
                                {status === 'Graded' ? 'Edit Grade' : 'Grade Work'}
                              </button>
                              {status !== 'Reopened' && (
                                <button
                                  onClick={() => handleQuickReopen(submission)}
                                  className="p-1.5 rounded-lg text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/60 border border-amber-200 dark:border-amber-800 transition"
                                  title="Request revision / Reopen"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </>
                          ) : (
                            <span className="text-slate-400 text-[11px] italic">Awaiting submit</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {filteredList.map(({ student, submission, status }) => (
              <div
                key={student.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0 ${
                        student.avatarBg || 'bg-indigo-600'
                      }`}
                    >
                      {student.avatarInitials}
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white block">
                        {student.name}
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        {student.department}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={status} size="sm" />
                </div>

                {submission ? (
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
                    <p className="line-clamp-3 text-slate-800 dark:text-slate-200">
                      {submission.content}
                    </p>
                    {submission.linkOrFileName && (
                      <div className="flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 truncate">
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span className="truncate">{submission.linkOrFileName}</span>
                      </div>
                    )}
                    {status === 'Graded' && typeof submission.grade === 'number' && (
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          Grade: {submission.grade}/{assignment.maxMarks}
                        </span>
                        {submission.feedback && (
                          <span className="text-[11px] text-slate-500 italic truncate max-w-[150px]">
                            "{submission.feedback}"
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No work submitted yet.</p>
                )}

                {submission && (
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => handleQuickReopen(submission)}
                      className="px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs font-bold"
                    >
                      Request Revision
                    </button>
                    <button
                      onClick={() => setActiveGrading({ student, submission })}
                      className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold"
                    >
                      {status === 'Graded' ? 'Edit Grade' : 'Grade Work'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grade / Evaluation Modal */}
      {activeGrading && (
        <GradeModal
          isOpen={Boolean(activeGrading)}
          onClose={() => setActiveGrading(null)}
          assignment={assignment}
          student={activeGrading.student}
          submission={activeGrading.submission}
        />
      )}
    </div>
  );
};
