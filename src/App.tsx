import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { MobileNav } from './components/common/MobileNav';
import { StudentDashboard } from './components/student/StudentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LoginModal } from './components/auth/LoginModal';

export const AppContent: React.FC = () => {
  const { currentUser, isAuthModalOpen, closeAuthModal } = useApp();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // If no user is selected, display the full mock login screen with all 7 clickable cards
  if (!currentUser) {
    return <LoginModal isOpen={true} isStandalone={true} onClose={() => {}} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
        isMobileNavOpen={isMobileNavOpen}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Navigation Drawer */}
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {currentUser.role === 'admin' ? (
            <AdminDashboard />
          ) : (
            <StudentDashboard />
          )}
        </main>
      </div>

      {/* Role Switcher / Demo Accounts Modal */}
      <LoginModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
