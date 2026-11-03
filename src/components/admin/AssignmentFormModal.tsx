import React, { useState, useEffect } from 'react';
import { Assignment } from '../../types';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { AlertTriangle, Plus, Save } from 'lucide-react';

interface AssignmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentToEdit?: Assignment | null;
}

const COMMON_SUBJECTS = [
  'Computer Science',
  'Database Management Systems',
  'Mathematics',
  'Physics',
  'English',
  'Artificial Intelligence',
  'Computer Networks',
];

export const AssignmentFormModal: React.FC<AssignmentFormModalProps> = ({
  isOpen,
  onClose,
  assignmentToEdit,
}) => {
  const { createAssignment, updateAssignment, users } = useApp();

  const studentUsers = users.filter((u) => u.role === 'student');

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(COMMON_SUBJECTS[0]);
  const [customSubject, setCustomSubject] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [maxMarks, setMaxMarks] = useState<number>(100);
  const [driveLink, setDriveLink] = useState('');
  const [assignAll, setAssignAll] = useState(true);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [errorText, setErrorText] = useState('');

  const isEditing = Boolean(assignmentToEdit);

  useEffect(() => {
    if (assignmentToEdit) {
      setTitle(assignmentToEdit.title);
      if (COMMON_SUBJECTS.includes(assignmentToEdit.subject)) {
        setSubject(assignmentToEdit.subject);
        setCustomSubject('');
      } else {
        setSubject('Other');
        setCustomSubject(assignmentToEdit.subject);
      }
      setDescription(assignmentToEdit.description);

      // Format ISO string to datetime-local format (YYYY-MM-DDTHH:mm)
      try {
        const d = new Date(assignmentToEdit.dueDate);
        const formatted = d.toISOString().slice(0, 16);
        setDueDate(formatted);
      } catch {
        setDueDate(assignmentToEdit.dueDate);
      }

      setMaxMarks(assignmentToEdit.maxMarks);
      setDriveLink(assignmentToEdit.driveLink || '');

      if (!assignmentToEdit.assignedTo || assignmentToEdit.assignedTo === 'all') {
        setAssignAll(true);
        setSelectedStudentIds([]);
      } else {
        setAssignAll(false);
        setSelectedStudentIds(assignmentToEdit.assignedTo);
      }
    } else {
      // Defaults for new assignment
      setTitle('');
      setSubject(COMMON_SUBJECTS[0]);
      setCustomSubject('');
      setDescription('');

      // Default due date: 7 days from now at 23:59
      const future = new Date();
      future.setDate(future.getDate() + 7);
      future.setHours(23, 59, 0, 0);
      setDueDate(future.toISOString().slice(0, 16));

      setMaxMarks(100);
      setDriveLink('');
      setAssignAll(true);
      setSelectedStudentIds([]);
    }
    setErrorText('');
  }, [assignmentToEdit, isOpen]);

  if (!isOpen) return null;

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorText('Please enter an assignment title.');
      return;
    }

    const effectiveSubject = subject === 'Other' ? customSubject.trim() : subject;
    if (!effectiveSubject) {
      setErrorText('Please select or specify a subject.');
      return;
    }

    if (!description.trim()) {
      setErrorText('Please enter an assignment description.');
      return;
    }

    if (!dueDate) {
      setErrorText('Please select a due date.');
      return;
    }

    if (maxMarks <= 0) {
      setErrorText('Max marks must be greater than 0.');
      return;
    }

    if (!assignAll && selectedStudentIds.length === 0) {
      setErrorText('Please select at least one student or choose "Assign to All".');
      return;
    }

    const assignedTo = assignAll ? 'all' : selectedStudentIds;

    if (isEditing && assignmentToEdit) {
      updateAssignment(assignmentToEdit.id, {
        title: title.trim(),
        subject: effectiveSubject,
        description: description.trim(),
        dueDate: new Date(dueDate).toISOString(),
        maxMarks: Number(maxMarks),
        driveLink: driveLink.trim() || undefined,
        assignedTo,
      });
    } else {
      createAssignment({
        title: title.trim(),
        subject: effectiveSubject,
        description: description.trim(),
        dueDate: new Date(dueDate).toISOString(),
        maxMarks: Number(maxMarks),
        driveLink: driveLink.trim() || undefined,
        assignedTo,
        createdBy: '', // AppContext fills in currentUser.id
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      title={isEditing ? 'Edit Assignment' : 'Create New Assignment'}
      subtitle="Publish coursework with detailed briefs, due dates, and grading criteria."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label
            htmlFor="asg-title"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Assignment Title *
          </label>
          <input
            id="asg-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Distributed Consensus & Raft Protocol Analysis"
            className="w-full text-sm rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>

        {/* Subject & Max Marks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="asg-subject"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Academic Subject *
            </label>
            <select
              id="asg-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-sm rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-medium"
            >
              {COMMON_SUBJECTS.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
              <option value="Other">Other (Custom Subject)</option>
            </select>
            {subject === 'Other' && (
              <input
                type="text"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                placeholder="Enter custom subject name"
                className="mt-2 w-full text-sm rounded-xl border border-slate-300 dark:border-slate-700 p-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
              />
            )}
          </div>

          <div>
            <label
              htmlFor="asg-maxmarks"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Maximum Marks *
            </label>
            <input
              id="asg-maxmarks"
              type="number"
              min="1"
              max="1000"
              required
              value={maxMarks}
              onChange={(e) => setMaxMarks(Number(e.target.value))}
              className="w-full text-sm rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden font-medium"
            />
          </div>
        </div>

        {/* Due Date & Drive Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="asg-duedate"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
            >
              Due Date & Time *
            </label>
            <input
              id="asg-duedate"
              type="datetime-local"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full text-sm rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label
              htmlFor="asg-drivelink"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
            >
              External Drive / Resource Folder Link
            </label>
            <input
              id="asg-drivelink"
              type="url"
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full text-sm rounded-xl border border-slate-300 dark:border-slate-700 p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Description / Instructions */}
        <div>
          <label
            htmlFor="asg-desc"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Assignment Description & Instructions *
          </label>
          <textarea
            id="asg-desc"
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide context, problem statement, required deliverables, and evaluation rubric..."
            className="w-full text-sm rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>

        {/* Student Assignment Targeting */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Student Assignment Scope
          </label>
          <div className="flex items-center gap-4 mb-2.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
              <input
                type="radio"
                name="assignScope"
                checked={assignAll}
                onChange={() => setAssignAll(true)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Assign to all enrolled students ({studentUsers.length})</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
              <input
                type="radio"
                name="assignScope"
                checked={!assignAll}
                onChange={() => setAssignAll(false)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>Select specific students</span>
            </label>
          </div>

          {!assignAll && (
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 max-h-36 overflow-y-auto space-y-1.5">
              {studentUsers.map((stu) => {
                const checked = selectedStudentIds.includes(stu.id);
                return (
                  <label
                    key={stu.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700/60 cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleStudentSelection(stu.id)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {stu.name}
                      </span>
                      <span className="text-slate-400">({stu.department})</span>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {errorText && (
          <p className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            {errorText}
          </p>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-md shadow-indigo-600/20 active:scale-[0.98]"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{isEditing ? 'Save Changes' : 'Publish Assignment'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
