import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Assignment, SortOption } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { DueDateBadge } from '../common/DueDateBadge';
import { EmptyState } from '../common/EmptyState';
import {
  Search,
  ExternalLink,
  ArrowRight,
  LayoutGrid,
  CalendarDays,
  Clock,
} from 'lucide-react';
import { formatDueDate } from '../../utils/dateUtils';

interface AssignmentListProps {
  onSelectAssignment: (assignment: Assignment) => void;
}

export const AssignmentList: React.FC<AssignmentListProps> = ({
  onSelectAssignment,
}) => {
  const { currentUser, assignments, getStudentAssignmentStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('dueDate-asc');
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('cards');

  if (!currentUser || currentUser.role !== 'student') return null;

  // Assignments assigned to this student
  const studentAssignments = useMemo(() => {
    return assignments.filter((a) => {
      if (!a.assignedTo || a.assignedTo === 'all') return true;
      return a.assignedTo.includes(currentUser.id);
    });
  }, [assignments, currentUser.id]);

  // Extract distinct subjects
  const subjects = useMemo(() => {
    const subs = new Set(studentAssignments.map((a) => a.subject));
    return ['All', ...Array.from(subs)];
  }, [studentAssignments]);

  const statuses: Array<{ value: string; label: string }> = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Not Started', label: 'Not Started' },
    { value: 'Submitted', label: 'Submitted' },
    { value: 'Graded', label: 'Graded' },
    { value: 'Overdue', label: 'Overdue' },
    { value: 'Reopened', label: 'Reopened (Needs Revision)' },
  ];

  // Filter and sort
  const filteredAssignments = useMemo(() => {
    return studentAssignments
      .filter((asg) => {
        const { status } = getStudentAssignmentStatus(asg);

        // Search match
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          asg.title.toLowerCase().includes(query) ||
          asg.subject.toLowerCase().includes(query) ||
          asg.description.toLowerCase().includes(query);

        // Subject filter
        const matchesSubject =
          selectedSubject === 'All' || asg.subject === selectedSubject;

        // Status filter
        const matchesStatus =
          selectedStatus === 'All' || status === selectedStatus;

        return matchesQuery && matchesSubject && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDate-asc') {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        if (sortBy === 'dueDate-desc') {
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        }
        if (sortBy === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'maxMarks-desc') {
          return b.maxMarks - a.maxMarks;
        }
        return 0;
      });
  }, [
    studentAssignments,
    searchQuery,
    selectedSubject,
    selectedStatus,
    sortBy,
    getStudentAssignmentStatus,
  ]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubject('All');
    setSelectedStatus('All');
    setSortBy('dueDate-asc');
  };

  return (
    <div className="space-y-4">
      {/* Search, Filter & Sort Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assignments by title, subject, or keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Subject Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full sm:w-48 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition font-medium"
            >
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub === 'All' ? 'All Subjects' : sub}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-44 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition font-medium"
            >
              {statuses.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Option */}
          <div className="w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full sm:w-48 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition font-medium"
            >
              <option value="dueDate-asc">Due Date: Earliest First</option>
              <option value="dueDate-desc">Due Date: Latest First</option>
              <option value="title-asc">Title: A to Z</option>
              <option value="maxMarks-desc">Max Marks: High to Low</option>
            </select>
          </div>

          {/* View Mode Toggle (Cards vs Timeline) */}
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 shrink-0">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'timeline'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
              title="Timeline Milestone View"
            >
              <CalendarDays className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Summary */}
        {(searchQuery || selectedSubject !== 'All' || selectedStatus !== 'All') && (
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>
              Showing {filteredAssignments.length} of {studentAssignments.length} assignments
            </span>
            <button
              onClick={clearFilters}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Assignment List / Cards or Timeline */}
      {filteredAssignments.length === 0 ? (
        <EmptyState
          title="No assignments match your filter"
          description="Try relaxing your search terms, changing the subject, or switching status filters."
          action={{
            label: 'Clear Filters',
            onClick: clearFilters,
          }}
        />
      ) : viewMode === 'timeline' ? (
        /* Timeline View */
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {filteredAssignments.map((assignment) => {
              const { status, submission, isOverdue: overdue, isDueToday: dueToday } =
                getStudentAssignmentStatus(assignment);
              const isCompleted = status === 'Graded' || status === 'Submitted';

              return (
                <div key={assignment.id} className="relative group">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full border-2 bg-white dark:bg-slate-900 transition-all ${
                      overdue && !isCompleted
                        ? 'border-rose-500 ring-4 ring-rose-500/20'
                        : dueToday && !isCompleted
                        ? 'border-amber-500 ring-4 ring-amber-500/20'
                        : isCompleted
                        ? 'border-emerald-500 ring-4 ring-emerald-500/20'
                        : 'border-indigo-500 ring-4 ring-indigo-500/20'
                    }`}
                  />

                  <div
                    onClick={() => onSelectAssignment(assignment)}
                    className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-md transition-all cursor-pointer space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                          {assignment.subject}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-xs text-slate-500">
                          {assignment.maxMarks} Marks
                        </span>
                      </div>
                      <StatusBadge status={status} size="sm" />
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {assignment.title}
                    </h4>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Deadline: {formatDueDate(assignment.dueDate)}</span>
                      </div>

                      {status === 'Graded' && typeof submission?.grade === 'number' && (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          Grade: {submission.grade}/{assignment.maxMarks}
                        </span>
                      )}

                      <span className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        View & Submit <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 gap-3.5">
          {filteredAssignments.map((assignment) => {
            const { status, submission, isOverdue: overdue, isDueToday: dueToday } =
              getStudentAssignmentStatus(assignment);
            const isCompleted = status === 'Graded' || status === 'Submitted';

            return (
              <div
                key={assignment.id}
                onClick={() => onSelectAssignment(assignment)}
                className={`group p-5 rounded-2xl border transition-all cursor-pointer bg-white dark:bg-slate-900 hover:shadow-md ${
                  status === 'Reopened'
                    ? 'border-amber-300 dark:border-amber-800 bg-amber-50/20 dark:bg-amber-950/10'
                    : overdue && !isCompleted
                    ? 'border-rose-300 dark:border-rose-900 bg-rose-50/20 dark:bg-rose-950/10'
                    : dueToday && !isCompleted
                    ? 'border-amber-300 dark:border-amber-900 bg-amber-50/20 dark:bg-amber-950/10'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {assignment.subject}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Max Marks: {assignment.maxMarks}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {assignment.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {assignment.description}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <StatusBadge status={status} size="md" />
                    {status === 'Graded' && typeof submission?.grade === 'number' && (
                      <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/80 dark:border-emerald-800">
                        Score: {submission.grade}/{assignment.maxMarks}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <DueDateBadge
                    dueDate={assignment.dueDate}
                    isCompleted={isCompleted}
                  />

                  <div className="flex items-center gap-3">
                    {assignment.driveLink && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(assignment.driveLink, '_blank');
                        }}
                        className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Drive Materials</span>
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                      {status === 'Graded'
                        ? 'View Grade & Feedback'
                        : status === 'Reopened'
                        ? 'Revise Work'
                        : status === 'Submitted'
                        ? 'View Submission'
                        : 'Submit Work'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
