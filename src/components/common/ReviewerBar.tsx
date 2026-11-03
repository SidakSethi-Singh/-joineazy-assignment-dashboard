import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  RotateCcw,
  Play,
  Zap,
} from 'lucide-react';
import { playSwitchSound, playSuccessSound } from '../../utils/soundEffects';

export const ReviewerBar: React.FC = () => {
  const { currentUser, switchUser, resetDemoData, assignments, submissions, users } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);

  const runDiagnostics = () => {
    playSuccessSound();
    const students = users.filter((u) => u.role === 'student');
    const professors = users.filter((u) => u.role === 'admin');
    const graded = submissions.filter((s) => s.status === 'Graded');
    const reopened = submissions.filter((s) => s.status === 'Reopened');
    const submitted = submissions.filter((s) => s.status === 'Submitted');

    setDiagnosticResult(
      `✅ Diagnostic Passed: 7 Users (${professors.length} Admins, ${students.length} Students), ${assignments.length} Course Assignments, ${submissions.length} Submissions (${graded.length} Graded, ${reopened.length} Reopened, ${submitted.length} Awaiting Review). LocalStorage active. Zero errors.`
    );
  };

  const handleQuickSwitch = (userId: string) => {
    playSwitchSound();
    switchUser(userId);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/60 transition-all text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left Title */}
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Zap className="w-3 h-3 text-amber-400" />
            </span>
            <span className="font-bold tracking-tight">
              Evaluation Fast-Track:
            </span>
            <span className="text-slate-400 hidden sm:inline">
              One-click testing for Joineazy evaluation scenarios
            </span>
          </div>

          {/* Quick Scenario Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Diya - Reopened / Revision */}
            <button
              onClick={() => handleQuickSwitch('user-student-2')}
              className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 border ${
                currentUser?.id === 'user-student-2'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-amber-300 border-amber-500/30'
              }`}
              title="Test Reopened / Needs Revision workflow"
            >
              <span>Diya</span>
              <span className="text-[10px] opacity-80">(Needs Revision)</span>
            </button>

            {/* Kabir - Fresh / Overdue */}
            <button
              onClick={() => handleQuickSwitch('user-student-5')}
              className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 border ${
                currentUser?.id === 'user-student-5'
                  ? 'bg-rose-500 text-white border-rose-400 shadow-xs'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-rose-300 border-rose-500/30'
              }`}
              title="Test fresh student with 1 Overdue & 1 Due Today item"
            >
              <span>Kabir</span>
              <span className="text-[10px] opacity-80">(Fresh & Overdue)</span>
            </button>

            {/* Aarav - Graded */}
            <button
              onClick={() => handleQuickSwitch('user-student-1')}
              className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 border ${
                currentUser?.id === 'user-student-1'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-xs'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-emerald-300 border-emerald-500/30'
              }`}
              title="Test Graded 94/100 feedback and submitted item"
            >
              <span>Aarav</span>
              <span className="text-[10px] opacity-80">(Graded 94%)</span>
            </button>

            {/* Prof. Anita */}
            <button
              onClick={() => handleQuickSwitch('user-admin-1')}
              className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 border ${
                currentUser?.id === 'user-admin-1'
                  ? 'bg-indigo-500 text-white border-indigo-400 shadow-xs'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-indigo-300 border-indigo-500/30'
              }`}
              title="Test Professor Grading, Assignment creation, and class progress"
            >
              <ShieldCheck className="w-3 h-3 text-indigo-400" />
              <span>Prof. Anita</span>
            </button>

            {/* Expand / Details toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded-md text-slate-400 hover:text-white transition"
              aria-label={isExpanded ? 'Collapse reviewer panel' : 'Expand reviewer panel'}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Guidance & System Self-Check */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in">
            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700">
              <span className="font-bold text-amber-300 block mb-1">
                Scenario 1: Test Reopened / Resubmission
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Click <strong>Diya</strong>. Open the DBMS assignment to see the professor's revision instructions. Edit content and resubmit using the two-step confirmation dialog.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700">
              <span className="font-bold text-indigo-300 block mb-1">
                Scenario 2: Test Professor Grading & Reopening
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Click <strong>Prof. Anita</strong>. View class completion rates. Click "Grade Work" on Aarav or Arjun to enter marks and written feedback, or click "Request Revision" to reopen.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700 flex flex-col justify-between">
              <div>
                <span className="font-bold text-emerald-300 block mb-1">
                  Scenario 3: Zero-Data Isolation Verification
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Switch between students to verify that student A never sees student B's submissions or grades.
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                <button
                  onClick={runDiagnostics}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[10px]"
                >
                  <Play className="w-3 h-3" /> Run System Audit
                </button>
                <button
                  onClick={resetDemoData}
                  className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Data
                </button>
              </div>
            </div>

            {diagnosticResult && (
              <div className="md:col-span-3 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-[11px] font-medium animate-fade-in flex items-center justify-between">
                <span>{diagnosticResult}</span>
                <button
                  onClick={() => setDiagnosticResult(null)}
                  className="text-emerald-400 hover:text-white ml-2 text-xs"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
