# 🎬 Exact 4-Minute Loom Recording Teleprompter Script
### Joineazy Frontend Intern Technical Evaluation (Task 1)

> **Estimated Duration**: 3 minutes 45 seconds – 4 minutes 15 seconds (fits the 3–5 min requirement perfectly).  
> **How to Use**: Put this guide on a split screen or phone beside your recording window. Simply follow the **[ACTION / CLICK]** cues and read the **[VOICEOVER SCRIPT]** aloud.

---

## 🛠️ Pre-Recording Checklist (30 Seconds)
1. **Open Browser Tab 1**: [http://localhost:5173/](http://localhost:5173/) (or your live deployed Vercel link).
2. If already logged in, click **"Reset Demo Data"** (refresh icon in the top right navbar) so all 7 accounts, initial assignments, and submission states are in their fresh seed state.
3. Open [Loom.com](https://www.loom.com/) (select **Screen + Cam** or **Screen Only**).

---

## ⏱️ ACT 1: Welcome & Technical Overview (0:00 – 0:35)

### 🖱️ [ACTION / CLICK]:
* Start recording on the **Role Switcher / Login Modal** screen (where all 7 user cards are visible).
* Slowly hover your mouse over the **Faculty Cards** (Prof. Anita, Prof. Rahul) and **Student Cards** (Aarav, Diya, Arjun, Ananya, Kabir).

### 🎙️ [VOICEOVER SCRIPT]:
> *"Hi everyone, my name is Sidakpreet Singh. This is the walkthrough for my Joineazy Frontend Intern Technical Evaluation — the Student Assignment & Review Dashboard.
>
> The application is built with React 18, TypeScript, Vite, and Tailwind CSS with zero backend dependencies. Everything runs statically in the browser with resilient localStorage persistence, strict student data isolation, and 20 passing automated Vitest tests.
>
> On this entry screen, we see 1-click login cards for our 7 seeded demo accounts — 2 professors and 5 students — allowing evaluators to jump into any role instantly with zero passwords."*

---

## ⏱️ ACT 2: Student Experience — Diya & Kabir (0:35 – 2:00)

### 🖱️ [ACTION / CLICK]:
1. Click on **Diya Kapoor** (`DK`, rose avatar card) to log in.
2. Point your cursor to the top sticky **Reviewer Fast-Track Bar**.
3. Point to the **Amber Banner**: *"Action Required: 1 Assignment Reopened for Revision"*.
4. Point to the **Overall Academic Progress Bar** (`"1 of 5 assignments submitted (20%)"`).

### 🎙️ [VOICEOVER SCRIPT]:
> *"Let's first explore the Student role as Diya Kapoor.
>
> Notice the top sticky Reviewer Fast-Track Bar, designed so evaluators can jump directly between test scenarios with one click.
>
> Diya immediately sees an amber alert banner notifying her that an assignment has been reopened for revision by her professor, alongside her overall academic progress bar showing 1 of 5 assignments submitted."*

---

### 🖱️ [ACTION / CLICK]:
5. In the assignments list, click on the top card with the amber badge: **"Database Normalization & BCNF Decomposition"**.
6. The **Assignment Brief Modal** opens.
7. Click the blue link: **"Course Materials & Drive Folder"** (with the folder icon).
8. The **Course Materials Modal** opens. Click **"Preview"** next to `DBMS_Module3_BCNF_Decomposition_Rubric.pdf` to show the inline rubric breakdown.
9. Click **"Back to Assignment"** to return to the brief.

### 🎙️ [VOICEOVER SCRIPT]:
> *"When Diya clicks on Database Normalization, she gets the full problem brief, due date urgency, and instructor details.
>
> Notice this link: 'Course Materials & Drive Folder'. Instead of leading to a dead external 404 page, clicking it opens an interactive in-app Course Materials Repository with faculty syllabus guidelines, starter code, and grading rubrics that can be previewed or downloaded directly."*

---

### 🖱️ [ACTION / CLICK]:
10. Scroll down inside the Assignment Modal to the **"Revision Requested by Professor"** section.
11. Point to the professor's notes (*"Great SQL structure, but please add an explanation of B+ tree indexing..."*).
12. Show that the answer textarea is unlocked and pre-filled with her previous answer.
13. Click the purple button: **"Yes, I have submitted (Revised Work)"**.
14. The **Final Submission Confirmation Modal** appears.
15. Click: **"Yes, I have submitted (Final Confirm)"**.
16. *Listen for the audio chime and notice the green toast popup!* Status changes to **Submitted** and the form locks.
17. Click the **"✕"** icon to close the modal.

### 🎙️ [VOICEOVER SCRIPT]:
> *"Looking at her submission, Diya sees the professor's revision instructions. Her form is unlocked and pre-filled.
>
> Per the specification, we have a strict two-step submission confirmation flow: clicking 'Yes, I have submitted' triggers a safety confirmation dialog. Confirming locks the submission, triggers an audio chime, and updates her status to Submitted."*

---

### 🖱️ [ACTION / CLICK]:
18. In the top Reviewer Bar, click the button: **"Kabir (Fresh Student)"**.
19. Point to his stats: **0 of 5 submitted (0%)**, Pending: 5, Overdue: 1.
20. Point to the coursework cards:
    - Point to the **Red card** (`Overdue` badge with alert icon).
    - Point to the **Amber card** (`Due Today` badge with clock icon).
    - Point to the **Upcoming cards**.
21. In the toolbar, click the **Timeline View icon** (next to the Grid icon).

### 🎙️ [VOICEOVER SCRIPT]:
> *"Now let's jump to Kabir Malhotra using the Reviewer Bar. Kabir is our fresh student with zero submissions.
>
> Notice the date urgency indicators: overdue items are highlighted in red with alert badges, items due today are highlighted in amber, and upcoming deadlines are in blue.
>
> Students can also toggle from the Card Grid to our Milestone Timeline View, visualizing deadlines chronologically with connected status milestone dots."*

---

## ⏱️ ACT 3: Professor / Admin View — Prof. Anita (2:00 – 3:20)

### 🖱️ [ACTION / CLICK]:
22. In the Reviewer Bar, click: **"Prof. Anita (Admin)"**.
23. Point to the **4 faculty overview cards**: Total Assignments (3), Submissions Received, Pending Grading, and Overdue Submissions.
24. Point to the scope toggle: **"Created by Me"** (active by default, showing only assignments created by Prof. Anita).

### 🎙️ [VOICEOVER SCRIPT]:
> *"Now let's switch to the faculty role as Prof. Anita Sharma.
>
> Adhering to the prompt's isolation rule, admins see only the assignments they created. Anita oversees 3 courses: DBMS, Computer Science, and English.
>
> Her analytics cards display total coursework, submissions received, pending grading, and overdue counts across enrolled students."*

---

### 🖱️ [ACTION / CLICK]:
25. On the first assignment ("Database Normalization"), point to the **Class Submission Rate bar** (`"4 of 5 students submitted (80%)"`).
26. Click the accordion header or **"View Submissions & Grade"** to expand the Submissions Table.
27. Find **Diya Kapoor** or **Arjun Singh** (showing `Submitted` status).
28. Click the purple button: **"Evaluate"**.
29. The **Grading Drawer Modal** opens.
30. Point to the student's submission text.
31. Click the button: **"Inspect File"** next to the attachment to show the in-app document viewer with SHA-256 checksum, then click "Close Preview".
32. Click the quick preset button: **"90%"** (marks auto-fill to `90` out of 100).
33. Click the preset feedback chip: **"⭐️ Outstanding work!"**.
34. Click: **"Save Grade"**.
35. *Listen for the chime!* The student's row immediately updates to **Graded (90/100)** in green.

### 🎙️ [VOICEOVER SCRIPT]:
> *"For each assignment, professors see a class submission rate progress bar showing how many students have turned in work.
>
> Expanding the submissions table shows every student's status. When Anita clicks 'Evaluate', the evaluation drawer opens. She can inspect submitted file artifacts with verified checksums, use quick percentage buttons like 90%, select feedback presets, and save the grade. The student immediately sees their work as Graded.
>
> If work needs revision, one click on 'Request Revision' reopens it for the student."*

---

### 🖱️ [ACTION / CLICK]:
36. Scroll up slightly in the faculty view and click the button: **"Export CSV"** (with download icon).
37. A `.csv` file will download to your browser!
38. Hover over **"Create Assignment"** to show professors can create and assign coursework to all or selected students.

### 🎙️ [VOICEOVER SCRIPT]:
> *"Professors can also export the entire class gradebook into a clean CSV spreadsheet with a single click, and create new assignments targeted to all students or specific individuals."*

---

## ⏱️ ACT 4: Spotlight Palette, Dark Mode & Tests (3:20 – 4:05)

### 🖱️ [ACTION / CLICK]:
39. Press **`Ctrl + K`** (or `Cmd + K` on Mac) on your keyboard.
40. The **Spotlight Command Menu** opens! Type `"Diya"` or `"Dark"` to show live search.
41. Press `Escape` to close it.
42. Click the **Sun / Moon icon** in the top right navbar to toggle **Dark Mode** on and off.
43. Click the **"Audit"** button in the Reviewer Bar to trigger the live diagnostic check (a green toast pops up: *"System Audit Passed: All 7 users & isolation verified"*).

### 🎙️ [VOICEOVER SCRIPT]:
> *"To deliver a standout 0.1% experience, we built several power-user enhancements:
>
> 1. Pressing Ctrl+K opens a universal Spotlight Command Palette for quick search and persona navigation.
> 2. A custom, high-contrast Dark Mode with seamless theme transitions.
> 3. An in-app Diagnostic Audit verifying localStorage integrity and student isolation rules.
> 4. And 20 automated Vitest tests verifying date calculations, storage fallbacks, and UI component DOM rendering with 100% pass rates."*

---

## ⏱️ ACT 5: Conclusion (4:05 – 4:20)

### 🖱️ [ACTION / CLICK]:
44. Navigate back to the main dashboard or click **"Switch User"**.
45. Smile and wrap up!

### 🎙️ [VOICEOVER SCRIPT]:
> *"All code is strictly typed with TypeScript, follows a clean modular component architecture, and builds with zero errors on `npm run build`.
>
> The full source code, commit history, and technical design decisions are documented in the README on GitHub.
>
> Thank you so much for your time and review. I'm really excited about the Frontend Intern role at Joineazy and look forward to discussing this in the technical interview!"*

---

## 💡 Pro-Tips for a Flawless Recording
* **Speak at a steady, confident pace**: Don't rush; the timings above leave plenty of breathing room.
* **Sound & audio**: The app has pleasant Web Audio chimes when submitting and grading. Keep your system audio enabled so the reviewer hears the sound feedback!
* **Upload link**: When your video is uploaded to Loom or Google Drive, make sure the permission is set to: **"Anyone with the link can view"**.
