import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Assignment } from '../../types';
import {
  Search,
  BookOpen,
  Sun,
  Moon,
  RotateCcw,
  Volume2,
  VolumeX,
  FileSpreadsheet,
  X,
  Command,
} from 'lucide-react';
import { toggleAudio, getAudioEnabled, playSwitchSound } from '../../utils/soundEffects';
import { exportGradebookToCSV } from '../../utils/csvExport';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAssignment?: (asg: Assignment) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectAssignment,
}) => {
  const {
    users,
    assignments,
    submissions,
    switchUser,
    toggleTheme,
    resetDemoData,
    theme,
  } = useApp();

  const [query, setQuery] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(getAudioEnabled());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle handled outside or here
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.role.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAssignments = assignments.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.subject.toLowerCase().includes(query.toLowerCase())
  );

  const handleToggleSound = () => {
    const updated = toggleAudio();
    setAudioEnabled(updated);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transform transition-all animate-scale-in z-10">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search users, assignments..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
          />
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
            <span>ESC</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Quick Actions */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
              Actions
            </div>
            <div className="space-y-0.5">
              <button
                onClick={() => {
                  toggleTheme();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs text-slate-700 dark:text-slate-200 transition"
              >
                <div className="flex items-center gap-2.5">
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                  <span>Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                </div>
                <span className="text-[10px] text-slate-400">Appearance</span>
              </button>

              <button
                onClick={handleToggleSound}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs text-slate-700 dark:text-slate-200 transition"
              >
                <div className="flex items-center gap-2.5">
                  {audioEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                  <span>Sound Effects: {audioEnabled ? 'Enabled' : 'Muted'}</span>
                </div>
                <span className="text-[10px] text-slate-400">Audio feedback</span>
              </button>

              <button
                onClick={() => {
                  const students = users.filter((u) => u.role === 'student');
                  exportGradebookToCSV(assignments, submissions, students);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs text-slate-700 dark:text-slate-200 transition"
              >
                <div className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Export Gradebook as CSV</span>
                </div>
                <span className="text-[10px] text-slate-400">Reports</span>
              </button>

              <button
                onClick={() => {
                  resetDemoData();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs text-slate-700 dark:text-slate-200 transition"
              >
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-amber-500" />
                  <span>Reset Demo Data to Initial State</span>
                </div>
                <span className="text-[10px] text-slate-400">Database</span>
              </button>
            </div>
          </div>

          {/* Quick Switch to Users */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
              Switch Persona ({filteredUsers.length})
            </div>
            <div className="space-y-0.5">
              {filteredUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    playSwitchSound();
                    switchUser(u.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-left text-xs text-slate-800 dark:text-slate-200 transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold ${u.avatarBg || 'bg-indigo-600'}`}>
                      {u.avatarInitials}
                    </div>
                    <span className="font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {u.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 capitalize">
                    {u.role === 'admin' ? 'Professor' : 'Student'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
              Coursework ({filteredAssignments.length})
            </div>
            <div className="space-y-0.5">
              {filteredAssignments.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    if (onSelectAssignment) onSelectAssignment(a);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left text-xs text-slate-800 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="truncate">{a.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{a.subject}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-[11px] text-slate-400">
          <span>ProTip: Press <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded font-mono text-[10px]">Ctrl+K</kbd> anywhere to open</span>
          <span className="flex items-center gap-1"><Command className="w-3 h-3" /> Command Menu</span>
        </div>
      </div>
    </div>
  );
};
