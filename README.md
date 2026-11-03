# Joineazy — Student Assignment & Review Dashboard

> **Frontend Intern Technical Task 1**: A responsive, production-ready web application for a student-assignment system built with React, TypeScript, Vite, and Tailwind CSS. Features mock one-click authentication, strict student data isolation, professor grading and revision workflows, due-date urgency tracking, and browser `localStorage` persistence.

---

## 🌟 Live Demo & Preview

- **Deployable Target**: Vercel / Netlify (zero backend, builds into a pure static SPA)
- **Build Status**: `npm run build` passes with 0 errors / 0 warnings.
- **Persistence**: All state (assignments, submissions, grades, revisions, dark mode) persists across browser reloads via `localStorage`.
- **Demo Data**: Seeded with 7 demo accounts, 5 realistic course assignments with dynamic relative due dates, and mixed submission states.

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

## 🚀 Key Features

### 1. Student View & Experience
- **Dashboard Summary Cards**: Live counts for **Pending**, **Submitted**, **Graded**, and **Overdue** assignments.
- **Overall Academic Progress Indicator**: Progress bar reflecting personal completion (e.g., `"2 of 5 assignments submitted (40%)"`).
- **"Due Soon" Spotlight**: Highlights the next 3 chronological deadlines for quick access.
- **Filterable & Searchable Coursework List**:
  - Full-text search across title, subject, and description.
  - Filter by Subject (Computer Science, DBMS, Mathematics, Physics, English, etc.).
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
  - Student receives a banner with professor's revision instructions.
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

### 3. Architecture, Reliability & Polish
- **Strict Data Isolation**: Students only have access to their own submission records, grades, and feedback. Professors have access to all students and coursework.
- **Dynamic Relative Dates**: Seed data computes deadlines relative to `new Date()`. Whenever evaluated (today, tomorrow, next week), there will always be **1 Overdue**, **1 Due Today**, and **3 Upcoming** assignments.
- **Dark Mode Support**: Persistent dark/light mode toggle adapting all badges, borders, tables, and typography.
- **Toast Notifications**: Interactive floating alerts on submissions, grading, revisions, deletions, and resets.
- **"Reset Demo Data" Button**: Restores baseline seed data into `localStorage` at any time.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict typing, zero `any`, `noUnusedLocals`, `noUnusedParameters`)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)
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
│   │   └── storage.ts               # LocalStorage read/write with fallback error handling
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
│   │   │   └── EmptyState.tsx       # Friendly empty states with illustrations
│   │   ├── auth/
│   │   │   └── LoginModal.tsx       # One-click mock login & switcher with all 7 user cards
│   │   ├── student/
│   │   │   ├── StudentDashboard.tsx # Student view orchestrator
│   │   │   ├── StudentStats.tsx     # Overall progress bar + 4 metric cards
│   │   │   ├── DueSoonSection.tsx   # Next 3 upcoming deadlines
│   │   │   ├── AssignmentList.tsx   # Search, subject filter, status filter, sorting
│   │   │   ├── AssignmentDetailModal.tsx # Full brief, Drive link, instructions & submission
│   │   │   └── SubmissionForm.tsx   # Two-step submission, locked state, feedback banner
│   │   └── admin/
│   │       ├── AdminDashboard.tsx   # Professor view orchestrator
│   │       ├── AdminStats.tsx       # Total assignments, submissions, pending grading, overdue
│   │       ├── AssignmentManagement.tsx # Accordion list, create, edit, delete with confirm
│   │       ├── AssignmentFormModal.tsx  # Create/edit assignment modal
│   │       ├── SubmissionsTable.tsx     # Class completion bar, responsive submissions table
│   │       └── GradeModal.tsx           # Marks evaluation and request revision modal
│   ├── App.tsx                      # Root component routing between Login, Student, and Admin
│   ├── main.tsx                     # React root with providers
│   └── index.css                    # Tailwind CSS directives and custom scrollbars
├── index.html                       # HTML5 entry with Google Fonts (Plus Jakarta Sans)
├── tailwind.config.js               # Theme extensions and color palettes
├── tsconfig.json                    # Strict TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── package.json
```

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended; developed and tested on Node v20/v26)
- npm (v9 or higher)

### Installation Steps

1. **Clone or navigate into the repository**:
   ```bash
   git clone <repo-url>
   cd Frontend_internship-Project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Run static build check**:
   ```bash
   npm run build
   ```
   Generates production bundle in `./dist` with zero errors.

5. **Preview production build locally**:
   ```bash
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

---

## 📜 Evaluation Checklist Verification

- [x] **Tech Stack**: React + Vite + Tailwind CSS + TypeScript.
- [x] **Zero Backend**: All state persisted in `localStorage`.
- [x] **Static Deployment Ready**: `npm run build` passes with 0 errors.
- [x] **Mock Login & Role Switcher**: Clickable cards for all 7 users; always accessible "Switch User" control.
- [x] **Student Features**: Progress bar, Pending/Submitted/Graded/Overdue metrics, Due Soon list, filter by status/subject, search, two-step submission, locked submission, professor feedback display, resubmission on revision request.
- [x] **Admin Features**: Overview stats, create/edit/delete assignment with delete confirmation dialog, per-assignment student submission table with class completion rate bar, grading with marks + written feedback, revision request (reopen).
- [x] **Visual Polish**: Distinct badge colors, urgency highlighting (red for overdue, amber for today), dark mode toggle, toast notifications, responsive drawer.
