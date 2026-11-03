import { Assignment, Submission, User } from '../types';

export function exportGradebookToCSV(
  assignments: Assignment[],
  submissions: Submission[],
  students: User[]
): void {
  // Build header row: Student Name, Roll/Department, Assignment 1 Score, Assignment 1 Status, ..., Total Score, Percentage
  const headers = [
    'Student Name',
    'Student Email',
    'Department / Roll',
    ...assignments.flatMap((a) => [
      `"${a.title} (${a.subject}) - Marks (${a.maxMarks})"`,
      `"${a.title} - Status"`,
    ]),
    'Total Marks Obtained',
    'Total Max Marks',
    'Overall Percentage (%)',
  ];

  const rows = students.map((student) => {
    let studentEarned = 0;
    let studentMax = 0;

    const assignmentData = assignments.flatMap((asg) => {
      const sub = submissions.find(
        (s) => s.assignmentId === asg.id && s.studentId === student.id
      );

      if (sub && typeof sub.grade === 'number') {
        studentEarned += sub.grade;
        studentMax += asg.maxMarks;
        return [sub.grade.toString(), `"${sub.status}"`];
      }

      if (sub) {
        return ['—', `"${sub.status}"`];
      }

      return ['—', '"Not Submitted"'];
    });

    const overallPct =
      studentMax > 0 ? ((studentEarned / studentMax) * 100).toFixed(1) : 'N/A';

    return [
      `"${student.name}"`,
      `"${student.email}"`,
      `"${student.department || ''}"`,
      ...assignmentData,
      studentEarned.toString(),
      studentMax.toString(),
      overallPct,
    ];
  });

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute(
    'download',
    `Joineazy_Gradebook_Export_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
