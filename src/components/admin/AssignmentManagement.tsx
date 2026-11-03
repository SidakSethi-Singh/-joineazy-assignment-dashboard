import React, { useState, useMemo } from 'react';
import { Assignment } from '../../types';
import { useApp } from '../../context/AppContext';
import { DueDateBadge } from '../common/DueDateBadge';
import { SubmissionsTable } from './SubmissionsTable';
import { AssignmentFormModal } from './AssignmentFormModal';
import { ConfirmModal } from '../common/ConfirmModal';
import { EmptyState } from '../common/EmptyState';
import {
  Plus,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Users,
} from 'lucide-react';

export const AssignmentManagement: React.FC = () => {
  const {
    currentUser,
    assignments,
    deleteAssignment,
    users,
    getSubmissionsForAssignment,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [scopeFilter, setScopeFilter] = useState<'all' | 'mine'>('all');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [assignmentToEdit, setAssignmentToEdit] = useState<Assignment | null>(null);
  const [assignmentToDelete, setAssignmentToDelete] = useState<Assignment | null>(null);

  // Expanded assignment accordion IDs
  const [expandedId, setExpandedId] = useState<string | null>(() => {
    return assignments.length > 0 ? assignments[0].id : null;
  });

  const subjects = useMemo(() => {
    const subs = new Set(assignments.map((a) => a.subject));
    return ['All', ...Array.from(subs)];
  }, [assignments]);

  const filteredAssignments = useMemo(() => {
    return assignments.filter((asg) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        asg.title.toLowerCase().includes(query) ||
        asg.subject.toLowerCase().includes(query) ||
        asg.description.toLowerCase().includes(query);

      const matchesSubject =
        selectedSubject === 'All' || asg.subject === selectedSubject;

      const matchesScope =
        scopeFilter === 'all' || asg.createdBy === currentUser?.id;

      return matchesSearch && matchesSubject && matchesScope;
    });
  }, [assignments, searchQuery, selectedSubject, scopeFilter, currentUser?.id]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleOpenCreate = () => {
    setAssignmentToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (asg: Assignment) => {
    setAssignmentToEdit(asg);
    setIsFormModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (assignmentToDelete) {
      deleteAssignment(assignmentToDelete.id);
      setAssignmentToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Management Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Bar */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assignments by title or subject..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Subject Filter */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full sm:w-48 py-2 px-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
            >
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub === 'All' ? 'All Subjects' : sub}
                </option>
              ))}
            </select>
          </div>

          {/* Creator Scope Filter */}
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 w-full sm:w-auto">
            <button
              onClick={() => setScopeFilter('all')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                scopeFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              All Coursework
            </button>
            <button
              onClick={() => setScopeFilter('mine')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                scopeFilter === 'mine'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
              }`}
            >
              Created by Me
            </button>
          </div>

          {/* Create Assignment Button */}
          <button
            onClick={handleOpenCreate}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        </div>
      </div>

      {/* Assignment List */}
      {filteredAssignments.length === 0 ? (
        <EmptyState
          title="No assignments found"
          description="No assignments matched your search and filter criteria. You can create a new assignment or clear your filters."
          action={{
            label: 'Create New Assignment',
            onClick: handleOpenCreate,
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => {
            const isExpanded = expandedId === assignment.id;
            const subs = getSubmissionsForAssignment(assignment.id);
            const creator = users.find((u) => u.id === assignment.createdBy);

            return (
              <div
                key={assignment.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-all"
              >
                {/* Assignment Header Summary (Accordion header) */}
                <div
                  onClick={() => toggleExpand(assignment.id)}
                  className="p-5 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                          {assignment.subject}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {assignment.maxMarks} Max Marks
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-xs text-slate-400">
                          Instructor: {creator?.name || 'Faculty'}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                        {assignment.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {assignment.description}
                      </p>
                    </div>

                    {/* Right side controls */}
                    <div
                      className="flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(assignment)}
                          className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
                          title="Edit assignment"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setAssignmentToDelete(assignment)}
                          className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition border border-transparent hover:border-rose-200 dark:hover:border-rose-800"
                          title="Delete assignment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleExpand(assignment.id)}
                          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                          aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      <div className="text-right">
                        <DueDateBadge dueDate={assignment.dueDate} />
                      </div>
                    </div>
                  </div>

                  {/* Submissions count summary pill */}
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                        <Users className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{subs.length} Submissions Logged</span>
                      </span>

                      {assignment.driveLink && (
                        <a
                          href={assignment.driveLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="hidden sm:inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                        >
                          <ExternalLink className="w-3 h-3" /> Drive Materials
                        </a>
                      )}
                    </div>

                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      {isExpanded ? 'Hide Submissions & Grading' : 'View Submissions & Grade'}
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                </div>

                {/* Submissions Table & Grading Area */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 animate-fade-in">
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Student Submissions & Class Performance
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Review submitted answers, award grades, and send revision requests.
                      </p>
                    </div>

                    <SubmissionsTable assignment={assignment} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal */}
      <AssignmentFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setAssignmentToEdit(null);
        }}
        assignmentToEdit={assignmentToEdit}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(assignmentToDelete)}
        onClose={() => setAssignmentToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Assignment?"
        description={
          <div className="space-y-2 text-left">
            <p>
              Are you sure you want to permanently delete{' '}
              <strong className="text-slate-900 dark:text-white">
                "{assignmentToDelete?.title}"
              </strong>
              ?
            </p>
            <p className="text-xs text-rose-600 dark:text-rose-400">
              ⚠️ Warning: This will also remove all associated student submissions, grades, and professor feedback for this assignment.
            </p>
          </div>
        }
        confirmLabel="Yes, Delete Assignment"
        cancelLabel="Cancel"
        variant="danger"
      />
    </div>
  );
};
