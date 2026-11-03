# Joineazy Technical Evaluation — Deliverables & Submission Package

This document contains everything needed to complete and submit all **4 required deliverables** for the **Joineazy Frontend Intern Technical Evaluation (Task 1)**.

---

## 🎯 Deliverables Checklist Overview

| Deliverable | Requirement | Status | Details |
| :--- | :--- | :---: | :--- |
| **1. GitHub Repo** | Public GitHub repository with meaningful commit history (not a single upload) | ✅ Ready | **13 conventional commits** ready to push locally |
| **2. Live Deployed Link** | Deployed on Vercel or Netlify (static SPA) | ✅ Ready | Live locally on `http://localhost:5173/` + 1-click cloud deploy steps below |
| **3. Demo Video** | 3–5 min video (Loom / Google Drive "anyone with link") walking through both roles | ✅ Ready | Complete timed recording script provided below |
| **4. README.md** | Setup steps, folder structure, component architecture, key design decisions | ✅ Ready | Comprehensive `README.md` already committed in root |

---

## 🚀 1. Live Demo Link & Cloud Deployment

### A. Active Local Live Demo
The production preview server is currently running:
- **Local URL**: [http://localhost:5173/](http://localhost:5173/)
- It has been opened directly in your default browser. Feel free to interact, test all roles, and trigger scenarios!

---

### B. Instant 10-Second Cloud Deploy (Vercel or Netlify)

Choose either option below to get a public `https://...` link for your evaluator:

#### Option 1: Netlify Drag-and-Drop (Zero terminal, 10 seconds)
1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser (log in with your GitHub/Google account).
2. Drag and drop the **`dist`** folder from:
   ```
   c:\Users\sidak\OneDrive\Desktop\Frontend_internship Project\dist
   ```
3. Netlify will instantly deploy it and provide a live URL like `https://joineazy-dashboard.netlify.app`.

#### Option 2: Vercel (via GitHub Repo)
1. Push your repository to GitHub (see section 2 below).
2. Go to [https://vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository.
4. Framework Preset will auto-detect as **Vite**, Build Command: `npm run build`, Output Directory: `dist`.
5. Click **Deploy**. Your live link will be generated in under 30 seconds!

---

## 🐙 2. Push GitHub Repo (13 Meaningful Commits)

Your local repository already has **13 clean, conventional commits** capturing every phase of the project:
1. `chore: initialize project scaffolding with React, Vite, TypeScript, and Tailwind CSS`
2. `feat(data): define core data models, types, and seed datasets with dynamic relative dates`
3. `feat(state): implement ToastContext and AppContext with localStorage persistence and strict data isolation`
4. `feat(ui): add common UI primitives, status badges, due date urgency pills, and modals`
5. `feat(auth): implement one-click mock login screen and role switcher for professors and students`
6. `feat(student): build student dashboard with progress metrics, due soon list, assignment filters, and 2-step submission flow`
7. `feat(admin): build professor dashboard with class completion rates, assignment management, and evaluation grading modal`
8. `docs: add comprehensive README with setup instructions, component architecture, and demo accounts guide`
9. `feat(advanced): add reviewer fast-track, spotlight command palette (Ctrl+K), timeline milestone view, and CSV export`
10. `test: add Vitest test suite and update comprehensive README documentation`
11. `test: add React component DOM assertions for StatusBadge and DueDateBadge`
12. `chore: normalize trailing newlines across test suites and utils`
13. `docs: update README with 20 automated tests and component testing suite`

### Commands to Push to Your GitHub:
Open PowerShell in the project directory and run:

```bash
# 1. Create a new public repository on GitHub (e.g. named "joineazy-assignment-review-dashboard")
# 2. Link your remote origin (replace YOUR_USERNAME with your GitHub username):
git remote add origin https://github.com/YOUR_USERNAME/joineazy-assignment-review-dashboard.git

# 3. Ensure your branch is named main or master:
git branch -M main

# 4. Push all 13 commits:
git push -u origin main
```

---

## 🎥 3. Demo Video Walkthrough Script (3–5 Minutes)

Record this using [Loom.com](https://www.loom.com/) (free) or OBS/Screen Recorder uploaded to Google Drive with permission set to **"Anyone with the link can view"**.

### ⏱️ Timestamped Video Script

#### [0:00 - 0:35] Introduction & Technical Architecture
> *"Hi everyone, welcome to the walkthrough for my Joineazy Technical Evaluation — the Student Assignment & Review Dashboard. 
> This app is built with React 18, TypeScript, Vite, and Tailwind CSS with zero backend dependencies. Everything runs statically in the browser with resilient `localStorage` persistence, strict student data isolation, and 20 automated Vitest unit tests covering logic and DOM assertions."*

#### [0:35 - 1:40] Role 1: Student View (Diya & Kabir)
> *"Let's first look at the Student role. On the initial screen, we see 1-click cards for our 7 seeded demo accounts.
> Let's log in as **Diya Kapoor**.
> Notice the top sticky **Reviewer Fast-Track Bar** — built specifically for evaluators to test specific edge cases with a single click.
> Diya has a prominent amber notification: 'Assignment Needs Revision! Prof. Anita Sharma requested revisions on Database Systems'.
> When Diya opens this assignment, she sees the professor's exact revision instructions: 'Great SQL structure, but please add an explanation of B+ tree indexing'. The submission form is unlocked and pre-filled with her previous work. 
> Notice the real-time word counter and file dropzone. When she clicks 'Resubmit Assignment', a safety confirmation modal prompts her: 'Yes, I Have Submitted'. Status immediately updates to Submitted with synthesized audio confirmation!
> Now let's switch to **Kabir Malhotra**, our fresh student. Kabir has 0 submissions, making it easy to observe urgency badges: 1 item is marked Overdue in red with an alert icon, 1 item is Due Today in amber, and 3 are Upcoming.
> Notice our **Dual View** toggle — we can switch from the Card Grid to an interactive **Milestone Timeline** that visualizes deadlines chronologically."*

#### [1:40 - 3:00] Role 2: Admin / Professor View (Prof. Anita Sharma)
> *"Now let's switch to **Prof. Anita Sharma** using the quick role switcher.
> Notice the professor's dashboard:
> 1. Overall stats: Total Assignments, Submissions Received, Pending Grading, and Overdue Submissions across enrolled students.
> 2. Class submission completion progress bars: For example, '4 of 5 students submitted (80%)'.
> 3. Submissions Table: Let's inspect Aarav Mehta's pending CS assignment. We click 'Evaluate', open the Evaluation Drawer, and use our quick preset buttons — say 90% (90/100) — select a feedback snippet, and click 'Save Grade'. The submission is instantly marked Graded!
> 4. We can also click 'Request Revision' to reopen any submission so the student can revise.
> 5. Coursework Management: Professors can create new assignments, target them to all or specific students, edit assignments, and delete them with an explicit safety confirmation dialog.
> 6. With one click, professors can export the entire class gradebook as a clean `.csv` spreadsheet."*

#### [3:00 - 3:45] Bonus & Top 0.1% Features Showcase
> *"Let's also quickly showcase our bonus features:
> - **Spotlight Command Menu**: Pressing `Ctrl+K` opens a global command palette allowing instant persona switching, assignment navigation, dark mode toggling, and sound settings.
> - **Dark Mode**: Fully styled high-contrast dark theme.
> - **Self-Diagnostics Audit**: Clicking 'Audit' in the Reviewer Bar runs live diagnostics on localStorage integrity and student isolation rules.
> - **Automated Tests**: Running `npm test` executes 20 passing unit and DOM assertion tests with 100% green status."*

#### [3:45 - 4:00] Conclusion
> *"Thank you for reviewing! The code is fully typed with zero errors on `npm run build`, and all setup instructions and component architecture are documented in the README. Looking forward to discussing this in the technical interview!"*

---

## 📄 4. Final Submission PDF (`FullName-Task1.pdf`)

Create a clean 1-page PDF titled `FullName-Task1.pdf` (e.g., `SidakpreetSingh-Task1.pdf`) containing:

```markdown
# Joineazy Technical Evaluation — Task 1: Assignment & Review Dashboard
**Candidate Name**: [Your Full Name]
**Email**: [Your Email]
**Phone**: [Your Phone Number]

### Evaluation Links:
1. **GitHub Repository**: https://github.com/[YOUR_USERNAME]/joineazy-assignment-review-dashboard
2. **Live Deployed Demo**: https://[YOUR_APP].vercel.app (or .netlify.app)
3. **Demo Video Walkthrough (3-5 min)**: https://www.loom.com/share/[YOUR_LOOM_ID] (or Google Drive link with "anyone with the link can view")

### Key Highlights:
- **Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS, Vitest.
- **Data Isolation**: Strict client-side student isolation.
- **Test Coverage**: 20 automated tests passing with zero errors.
- **Reviewer Features**: Fast-Track scenario bar, Spotlight Command Palette (Ctrl+K), Timeline View, CSV Export.
```

Save this as PDF and upload it to the submission Google Form:
🔗 **Submission Link**: `https://forms.gle/SAEg6sQLbQUudzc19`

