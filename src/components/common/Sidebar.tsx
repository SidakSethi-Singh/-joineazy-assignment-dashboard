import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Users,
  RotateCcw,
  Sparkles,
  LogOut,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentUser, openAuthModal, logout, resetDemoData } = useApp();

  const isAdmin = currentUser?.role === 'admin';

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md p-5 shrink-0 min-h-[calc(100vh-4rem)] justify-between">
      <div className="space-y-6">
        {/* Active Role Card */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shrink-0 shadow-xs ${
                currentUser?.avatarBg || 'bg-indigo-600'
              }`}
            >
              {currentUser?.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs text-slate-900 dark:text-white truncate block">
                {currentUser?.name}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                {isAdmin ? (
                  <>
                    <ShieldCheck className="w-3 h-3" /> Professor
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-3 h-3" /> Student
                  </>
                )}
              </span>
            </div>
          </div>

          <button
            onClick={openAuthModal}
            className="mt-3 w-full py-1.5 px-2.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-600/80 transition shadow-xs flex items-center justify-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Switch Role / User</span>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">
            Navigation
          </div>

          <a
            href="#dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 transition"
          >
            <BookOpen className="w-4 h-4" />
            <span>{isAdmin ? 'Assignments & Grading' : 'My Coursework'}</span>
          </a>

          <button
            onClick={openAuthModal}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-left"
          >
            <Users className="w-4 h-4 text-slate-400" />
            <span>Role Switcher (7 Seed Users)</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-left"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Sign Out to Login Screen</span>
          </button>
        </nav>

        {/* Evaluation Guide Card */}
        <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-xs text-indigo-900 dark:text-indigo-200 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evaluation Quick Tips</span>
          </div>
          <p className="text-[11px] leading-relaxed text-indigo-800/90 dark:text-indigo-300/90">
            • <strong>Student:</strong> Submit answers with 2-step confirmation and review grades.<br />
            • <strong>Professor:</strong> Create assignments, grade, or click "Request Revision" to reopen.<br />
            • <strong>Switching:</strong> Jump seamlessly between roles with zero passwords.
          </p>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 space-y-3">
        <button
          onClick={resetDemoData}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          title="Restore seed data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>

        <div className="text-[11px] text-slate-400 dark:text-slate-500 text-center leading-tight">
          Joineazy Frontend Intern Task 1
          <br />
          Static Client · localStorage
        </div>
      </div>
    </aside>
  );
};
