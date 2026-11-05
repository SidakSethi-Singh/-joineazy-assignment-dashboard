# Joineazy — Student Assignment & Review Dashboard

> **Frontend Intern Technical Task 1**: A responsive, production-ready web application for a student-assignment system built with React, TypeScript, Vite, and Tailwind CSS. Features mock one-click authentication, strict student data isolation, professor grading and revision workflows, due-date urgency tracking, automated Vitest testing, and browser `localStorage` persistence.

---

## 🌟 Live Demo & Quick Evaluation

- **GitHub Repository**: [https://github.com/SidakSethi-Singh/-joineazy-assignment-dashboard](https://github.com/SidakSethi-Singh/-joineazy-assignment-dashboard)
- **Deployable Target**: Vercel / Netlify (zero backend, builds into a pure static SPA)
- **Build Status**: `npm run build` passes with 0 errors / 0 warnings.
- **Unit & Integration Tests**: `npm test` runs 20 automated Vitest tests covering data isolation, status computations, date urgency, UI component rendering, and storage fallback.
- **Persistence**: All state (assignments, submissions, grades, revisions, dark mode) persists across browser reloads via `localStorage`.
- **Demo Data**: Seeded with 7 demo accounts, 5 realistic course assignments with dynamic relative due dates, and mixed submission states.

---

## ⚡ Top 0.1% Highlights & Standout Features

1. **Reviewer Fast-Track Bar**:
   - Sticky top bar allowing evaluators to jump directly into specific test scenarios with 1 click:
     - **Diya (Needs Revision)**: Inspect the professor's revision instructions, edit work, and resubmit.
     - **Kabir (Fresh Student)**: Test fresh submissions, inspect Overdue and Due Today badges.
     - **Aarav (Graded 94%)**: Review evaluated submission, score badge, and teacher feedback.
     - **Prof. Anita**: Test class completion rates, grade pending work, and create assignments.
     - **One-Click Diagnostic Audit**: Runs self-diagnostics verifying localStorage health, user counts, and isolation integrity.

2. **Spotlight Command Menu (`Ctrl+K` / `Cmd+K`)**:
   - Universal command palette to search assignments, jump between personas, toggle dark mode, export gradebooks, and mute/unmute audio.

3. **Dual View: Card Grid vs Timeline Milestone View**:
   - Students can toggle between the classic card grid and an interactive **Chronological Timeline** with visual milestone dots connected across deadlines.

4. **Gradebook CSV Export**:
   - Professors can export the complete class gradebook, student marks, and submission statuses into a downloadable `.csv` spreadsheet with one click.

5. **Enhanced Submission Form**:
   - Real-time word counter, character counter, and estimated reading time.
   - Drag-and-drop mock file attachment dropzone with file size formatting and preview chips.
   - Two-step submission confirmation dialog (`"Yes, I Have Submitted"`).

6. **Professor Evaluation Assistant**:
   - Quick percentage buttons (`100%`, `90%`, `75%`, `50%`) for instant mark calculation.
   - Canned feedback snippets for praise, edge cases, and revision instructions.

7. **Synthesized Web Audio Feedback**:
   - Pleasant chime on submission, grading, and role switching using browser Web Audio API (100% offline, zero audio assets, with user mute toggle).

---

## 👥 Demo Accounts (Zero Passwords, One-Click Login)

The application features a dedicated **Mock Login & Role Switcher** screen. Click any card to enter immediately as that persona. In addition, the **"Switch User"** button is always accessible from the navbar and sidebar.

| Avatar | Name | Role | Department / Details | Seed State & Review Highlights |
| :---: | :--- | :---: | :--- | :--- |
| **AS** | **Prof. Anita Sharma** | **Admin (Faculty)** | Dept. of Computer Science & Engineering | Created 3 assignments (DBMS, CS, English). Can grade submissions, create new coursework, and request revisions. |
| **RV** | **Prof. Rahul Verma** | **Admin (Faculty)** | Dept. of Mathematics & Computing | Created 2 assignments (Math, Physics). Evaluates submissions and monitors class submission completion rates. |
| **AM** | **Aarav Mehta** | **Student** | B.Tech CSE · Roll #21CS042 | Has 1 **Graded** assignment (DBMS: 94/100 with feedback) and 1 **Submitted** assignment (CS) awaiting review. |
| **DK** | **Diya Kapoor** | **Student** | B.Tech CSE · Roll #21CS019 | Has 1 **Reopened** assignment (DBMS: "Needs revision" with instructions from professor) and 1 **Graded** (Physics: 48/50). |
| **AS** | **Arjun Singh** | **Student** | B.Tech CSE · Roll #21CS088 | Has 1 **Submitted** assignment (DBMS) awaiting grading. |
| **AI** | **Ananya Iyer** | **Student** | B.Tech CSE · Roll #21CS007 | Top performer: 1 **Graded** assignment (DBMS: 98/100) and 1 **Submitted** (CS). |
| **KM** | **Kabir Malhotra** | **Student** | B.Tech CSE · Roll #21CS054 | **Fresh Student Account**: 0 submissions. Perfect for testing fresh submissions, 1 Overdue item, and 1 Due Today item. |

---

## 🚀 Core Features Walkthrough

### 1. Student View & Experience
- **Dashboard Summary Cards**: Live counts for **Pending**, **Submitted**, **Graded**, and **Overdue** assignments.
- **Overall Academic Progress Indicator**: Animated progress bar reflecting personal completion (e.g., `"2 of 5 assignments submitted (40%)"`).
- **"Due Soon" Spotlight**: Highlights the next 3 chronological deadlines for quick access.
- **Filterable & Searchable Coursework List**:
  - Full-text search across title, subject, and description.
  - Filter by Subject (Computer Science, DBMS, Mathematics, Physics, English).
  - Filter by Submission Status (`Not Started`, `Submitted`, `Graded`, `Overdue`, `Reopened`).
  - Sort by Due Date (Earliest first / Latest first), Alphabetical, or Max Marks.
- **Due Date Urgency Indicators**:
  - 🔴 **Overdue**: Highlighted in rose/red with animated alert badges.
  - 🟡 **Due Today**: Highlighted in amber with clock icons.
  - 🔵 **Due Soon / Upcoming**: Subtle indicators with formatted date/time.
- **Two-Step Submission Flow**:
  1. Student enters written answer notes and optional Drive/GitHub link or file name.
  2. Clicking "Submit Assignment" triggers a final confirmation dialog (`"Yes, I Have Submitted"`).
  3. Work locks immediately, status updates to `Submitted`, and a toast notification confirms submission.
- **Grades & Feedback View**:
  - Graded submissions prominently show marks obtained out of max marks and percentage.
  - Professor's written feedback is displayed in a dedicated blockquote box.
- **Revision & Resubmission Workflow**:
  - If a professor marks a submission as *"Needs revision"*, status turns into **Reopened**.
  - Student receives an amber banner with professor's revision instructions.
  - The submission form unlocks, pre-filled with previous work, allowing revision and resubmission.

### 2. Admin (Professor) View & Experience
- **Faculty Overview Analytics**:
  - Total Course Assignments count.
  - Submissions Received count (with graded tally).
  - Pending Grading count.
  - Overdue Submissions count across all enrolled students.
- **Coursework Management**:
  - **Create Assignment**: Title, subject, description, due date/time, max marks, optional Google Drive folder link, and targeting (assign to all students or specific students).
  - **Edit Assignment**: Modify any assignment details in real-time.
  - **Delete Assignment**: With a safety confirmation dialog (cascades deletion to associated submissions).
- **Class Submission Progress Bar**:
  - Shows completion rate per assignment (e.g., `4 of 5 students submitted (80%)`).
- **Student Submissions Table & Mobile Cards**:
  - Responsive table on desktop that collapses gracefully into cards on mobile.
  - Displays student name, roll, status badge, submitted work snippet, Drive/GitHub links, submission date, and scores.
- **Interactive Evaluation & Grading Drawer**:
  - Numerical mark input with range validation (`0 <= marks <= maxMarks`).
  - Written feedback textarea for comments and praise.
  - **"Request Revision (Reopen)"** button: reopens student work with one click.
  - **"Save Grade"** button: saves marks and sets status to `Graded` immediately.
- **Scope Toggle**: Switch between *"All Coursework"* and *"Created by Me"*.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict typing, zero `any`, `noUnusedLocals`, `noUnusedParameters`)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) + jsdom
- **State Management & Persistence**: React Context API (`AppContext`, `ToastContext`) + Browser `localStorage`

---

## 📁 Folder Structure

```
├── public/
├── src/
│   ├── types/
│   │   └── index.ts                 # Type definitions: User, Assignment, Submission, Status, Filters
│   ├── data/
│   │   └── initialData.ts           # 7 demo users, dynamic relative-date generator, seed assignments & submissions
│   ├── utils/
│   │   ├── dateUtils.ts             # Date calculations: isOverdue, isDueToday, isDueSoon, formatDueDate
│   │   ├── storage.ts               # LocalStorage read/write with fallback error handling
│   │   ├── soundEffects.ts          # Synthesized Web Audio API sound effects with mute toggle
│   │   └── csvExport.ts             # Client-side gradebook CSV generation and download
│   ├── test/
│   │   ├── setup.ts                 # Test setup configuration
│   │   ├── dateUtils.test.ts        # Unit tests for date and urgency calculations
│   │   ├── dataIsolation.test.ts    # Tests for student data isolation and seed constraints
│   │   ├── components.test.tsx      # DOM assertion tests for StatusBadge & DueDateBadge
│   │   └── storage.test.ts          # Tests for localStorage serialization and fallback
│   ├── context/
│   │   ├── AppContext.tsx           # Global state, data isolation logic, CRUD operations
│   │   └── ToastContext.tsx         # Notification system (success, error, warning, info)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx           # Top navigation with role pill, user switcher, theme toggle, reset
│   │   │   ├── Sidebar.tsx          # Desktop navigation sidebar
│   │   │   ├── MobileNav.tsx        # Mobile drawer navigation
│   │   │   ├── StatusBadge.tsx      # Color-coded status badges with icons
│   │   │   ├── DueDateBadge.tsx     # Urgency pills (Overdue, Due Today, Due Soon)
│   │   │   ├── Modal.tsx            # Accessible modal container with backdrop blur
│   │   │   ├── ConfirmModal.tsx     # Reusable confirmation dialogs
│   │   │   ├── EmptyState.tsx       # Friendly empty states with illustrations
│   │   │   ├── ReviewerBar.tsx      # Fast-track evaluation scenario switcher
│   │   │   └── CommandPalette.tsx   # Spotlight Ctrl+K command menu
│   │   ├── auth/
│   │   │   └── LoginModal.tsx       # One-click mock login & switcher with all 7 user cards
│   │   ├── student/
│   │   │   ├── StudentDashboard.tsx # Student view orchestrator
│   │   │   ├── StudentStats.tsx     # Overall progress bar + 4 metric cards
│   │   │   ├── DueSoonSection.tsx   # Next 3 upcoming deadlines
│   │   │   ├── AssignmentList.tsx   # Search, subject filter, status filter, card vs timeline view
│   │   │   ├── AssignmentDetailModal.tsx # Full brief, Drive link, instructions & submission
│   │   │   └── SubmissionForm.tsx   # Two-step submission, locked state, dropzone, feedback banner
│   │   └── admin/
│   │       ├── AdminDashboard.tsx   # Professor view orchestrator
│   │       ├── AdminStats.tsx       # Total assignments, submissions, pending grading, overdue
│   │       ├── AssignmentManagement.tsx # Accordion list, create, edit, delete with confirm, export CSV
│   │       ├── AssignmentFormModal.tsx  # Create/edit assignment modal
│   │       ├── SubmissionsTable.tsx     # Class completion bar, responsive submissions table
│   │       └── GradeModal.tsx           # Marks evaluation, presets, and request revision modal
│   ├── App.tsx                      # Root component routing between Login, Student, and Admin
│   ├── main.tsx                     # React root with providers
│   └── index.css                    # Tailwind CSS directives and custom scrollbars
├── index.html                       # HTML5 entry with Google Fonts (Plus Jakarta Sans)
├── tailwind.config.js               # Theme extensions and color palettes
├── tsconfig.json                    # Strict TypeScript configuration
├── vite.config.ts                   # Vite + Vitest configuration
└── package.json
```

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended; developed and tested on Node v20/v26)
- npm (v9 or higher)

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Run automated test suite (20 tests in Vitest across 4 test suites)
npm test

# 3. Start local development server
npm run dev
# -> http://localhost:5173

# 4. Production build check (static SPA, 0 errors)
npm run build

# 5. Preview production build
npm run preview
```

---

## 🎨 Key Design Decisions

1. **Strict Data Isolation by Default**:
   Student views never query or expose submissions from other students. Calculating pending work, grades, and overdue deadlines strictly references `currentUser.id`.
2. **Dynamic Relative Seed Dates**:
   Rather than hardcoded static dates that expire after a few days, the initial data generator computes ISO dates relative to `new Date()`. This guarantees that whoever evaluates this submission on any day will see accurate **Overdue**, **Due Today**, and **Upcoming** assignments.
3. **Two-Step Submission Safeguard**:
   Per task requirements, submitting coursework requires an explicit confirmation modal (`"Yes, I Have Submitted"`), preventing accidental lockouts while keeping the student informed that work is sent to the professor.
4. **Resubmission Flow (`Reopened`)**:
   Professors can click *"Request Revision"*, automatically setting the submission status to `Reopened`. The student is alerted with a dedicated revision banner and the submission form unlocks, pre-populated with their previous response.
5. **Mobile-First Responsive Layout**:
   Tested across 360px (smartphones), 768px (tablets), and 1280px+ (laptops/desktops). Complex tables gracefully switch to formatted cards on small screens.
6. **Built-in Quality Verification Suite**:
   Includes automated unit tests for date logic, isolation invariants, and storage resilience, demonstrating production-level software engineering discipline.
