import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  BookOpen,
  Users,
  RotateCcw,
  Sun,
  Moon,
  GraduationCap,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const {
    currentUser,
    openAuthModal,
    logout,
    resetDemoData,
    theme,
    toggleTheme,
  } = useApp();

  if (!isOpen) return null;

  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 shadow-2xl p-5 flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 animate-slide-down">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-black text-base shadow-xs">
                J
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white">
                Joineazy
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current User Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
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
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
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
              onClick={() => {
                onClose();
                openAuthModal();
              }}
              className="mt-3 w-full py-1.5 px-2.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 shadow-xs flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Switch User / Role</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={onClose}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isAdmin ? 'Assignments & Grading' : 'My Coursework'}</span>
            </button>
            <button
              onClick={() => {
                onClose();
                openAuthModal();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
            >
              <Users className="w-4 h-4" />
              <span>All 7 Demo Users</span>
            </button>
            <button
              onClick={() => {
                onClose();
                logout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out to Login Screen</span>
            </button>
          </nav>
        </div>

        {/* Footer actions */}
        <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
          >
            <span className="flex items-center gap-2">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>Appearance</span>
            </span>
            <span className="text-slate-400">{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              resetDemoData();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
