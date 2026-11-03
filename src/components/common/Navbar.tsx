import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  RotateCcw,
  Sun,
  Moon,
  GraduationCap,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  LogOut,
  Search,
} from 'lucide-react';
import { ConfirmModal } from './ConfirmModal';

interface NavbarProps {
  onToggleMobileNav?: () => void;
  isMobileNavOpen?: boolean;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileNav,
  isMobileNavOpen = false,
  onOpenCommandPalette,
}) => {
  const {
    currentUser,
    openAuthModal,
    logout,
    resetDemoData,
    theme,
    toggleTheme,
  } = useApp();

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const isAdmin = currentUser?.role === 'admin';

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            {onToggleMobileNav && (
              <button
                type="button"
                onClick={onToggleMobileNav}
                className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Toggle navigation"
              >
                {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-black text-lg shadow-md shadow-indigo-500/20">
                J
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                  Joineazy
                </span>
                <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                  Academic Portal
                </span>
              </div>
            </div>

            {/* Active Role Pill */}
            <div className="hidden sm:flex items-center ml-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  isAdmin
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                }`}
              >
                {isAdmin ? (
                  <ShieldCheck className="w-3.5 h-3.5" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5" />
                )}
                <span>{isAdmin ? 'Professor View' : 'Student View'}</span>
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Command Menu Search Button */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition shadow-xs group"
                title="Open Spotlight Command Palette (Ctrl+K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
                <span className="hidden md:inline">Quick Jump...</span>
                <kbd className="hidden lg:inline-block font-mono text-[10px] bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600 text-slate-400">
                  Ctrl+K
                </kbd>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Reset Demo Data Button */}
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition"
              title="Restore initial seed data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>

            {/* Switch User Button (Core brief requirement - always visible) */}
            <button
              onClick={openAuthModal}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 transition shadow-xs group"
              aria-label="Switch current user role"
              title="Switch user account"
            >
              {currentUser && (
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs ${
                    currentUser.avatarBg || 'bg-indigo-600'
                  }`}
                >
                  {currentUser.avatarInitials}
                </div>
              )}
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[120px]">
                  {currentUser?.name || 'Select User'}
                </span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                  {currentUser?.role === 'admin' ? 'Faculty Admin' : 'Student'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Sign Out Button */}
            <button
              onClick={logout}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Sign out to demo accounts selection"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation Modal for Resetting Demo Data */}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetDemoData}
        title="Reset Demo Data?"
        description="This will restore the 7 initial demo users, 5 assignments (with relative due dates), and baseline student submissions. Any custom assignments or grades you added will be refreshed."
        confirmLabel="Reset Everything"
        cancelLabel="Keep Current Data"
        variant="warning"
      />
    </>
  );
};
