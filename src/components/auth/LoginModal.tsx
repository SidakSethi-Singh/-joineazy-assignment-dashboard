import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { ShieldCheck, GraduationCap, UserCheck, Check } from 'lucide-react';
import { playSwitchSound } from '../../utils/soundEffects';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  isStandalone?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  isStandalone = false,
}) => {
  const { users, currentUser, switchUser } = useApp();

  const professors = users.filter((u) => u.role === 'admin');
  const students = users.filter((u) => u.role === 'student');

  const getUserBadgeInfo = (id: string) => {
    switch (id) {
      case 'user-admin-1':
        return 'Course Instructor · CS & DBMS';
      case 'user-admin-2':
        return 'Course Instructor · Math & Physics';
      case 'user-student-1':
        return 'Has Graded & Submitted work';
      case 'user-student-2':
        return '⚠️ Has 1 Reopened (Needs Revision)';
      case 'user-student-3':
        return 'Has 1 Pending Submission';
      case 'user-student-4':
        return 'Top performer (98/100)';
      case 'user-student-5':
        return 'Fresh account (0 submissions, 1 overdue)';
      default:
        return '';
    }
  };

  const content = (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Select a Demo Account
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Click any persona below to log in instantly with zero passwords. Jump between professors and students at any time.
        </p>
      </div>

      {/* Professors / Admins Section */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Faculty & Admins ({professors.length})</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {professors.map((user) => {
            const isCurrent = currentUser?.id === user.id;
            const hint = getUserBadgeInfo(user.id);
            return (
              <button
                key={user.id}
                onClick={() => {
                  playSwitchSound();
                  switchUser(user.id);
                  onClose();
                }}
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all group relative ${
                  isCurrent
                    ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 dark:border-indigo-500 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-xs ${
                    user.avatarBg || 'bg-indigo-600'
                  }`}
                >
                  {user.avatarInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition truncate">
                      {user.name}
                    </span>
                    {isCurrent && (
                      <span className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/60 px-1.5 py-0.5 rounded-md">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>
                  <span className="inline-block text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate w-full">
                    {user.department}
                  </span>
                  {hint && (
                    <span className="inline-block text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 mt-1">
                      {hint}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Students Section */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <GraduationCap className="w-4 h-4" />
          <span>Students ({students.length})</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {students.map((user) => {
            const isCurrent = currentUser?.id === user.id;
            const hint = getUserBadgeInfo(user.id);
            return (
              <button
                key={user.id}
                onClick={() => {
                  playSwitchSound();
                  switchUser(user.id);
                  onClose();
                }}
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all group relative ${
                  isCurrent
                    ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 dark:border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-xs ${
                    user.avatarBg || 'bg-emerald-600'
                  }`}
                >
                  {user.avatarInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition truncate">
                      {user.name}
                    </span>
                    {isCurrent && (
                      <span className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded-md">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>
                  <span className="inline-block text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate w-full">
                    {user.department}
                  </span>
                  {hint && (
                    <span className="inline-block text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 mt-1">
                      {hint}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Info note */}
      <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex items-center gap-3">
        <UserCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>Strict data isolation active:</strong> Each student sees only their personal submissions and feedback. Professors have full access to view, grade, and reopen all submissions.
        </p>
      </div>
    </div>
  );

  if (isStandalone) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md">
              J
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Joineazy Assignment & Review
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Frontend Intern Technical Evaluation Dashboard
              </p>
            </div>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl" title="Switch User / Role">
      {content}
    </Modal>
  );
};
