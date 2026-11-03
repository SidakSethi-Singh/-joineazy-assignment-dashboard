import { User, Assignment, Submission } from '../types';
import { getRelativeISO } from '../utils/dateUtils';

export const SEED_USERS: User[] = [
  // Admins (Professors)
  {
    id: 'user-admin-1',
    name: 'Prof. Anita Sharma',
    role: 'admin',
    email: 'anita.sharma@joineazy.edu',
    avatarInitials: 'AS',
    department: 'Dept. of Computer Science & Engineering',
    avatarBg: 'bg-indigo-600',
  },
  {
    id: 'user-admin-2',
    name: 'Prof. Rahul Verma',
    role: 'admin',
    email: 'rahul.verma@joineazy.edu',
    avatarInitials: 'RV',
    department: 'Dept. of Mathematics & Computing',
    avatarBg: 'bg-emerald-600',
  },

  // Students
  {
    id: 'user-student-1',
    name: 'Aarav Mehta',
    role: 'student',
    email: 'aarav.mehta@student.joineazy.edu',
    avatarInitials: 'AM',
    department: 'B.Tech CSE · Roll #21CS042',
    avatarBg: 'bg-violet-600',
  },
  {
    id: 'user-student-2',
    name: 'Diya Kapoor',
    role: 'student',
    email: 'diya.kapoor@student.joineazy.edu',
    avatarInitials: 'DK',
    department: 'B.Tech CSE · Roll #21CS019',
    avatarBg: 'bg-rose-600',
  },
  {
    id: 'user-student-3',
    name: 'Arjun Singh',
    role: 'student',
    email: 'arjun.singh@student.joineazy.edu',
    avatarInitials: 'AS',
    department: 'B.Tech CSE · Roll #21CS088',
    avatarBg: 'bg-amber-600',
  },
  {
    id: 'user-student-4',
    name: 'Ananya Iyer',
    role: 'student',
    email: 'ananya.iyer@student.joineazy.edu',
    avatarInitials: 'AI',
    department: 'B.Tech CSE · Roll #21CS007',
    avatarBg: 'bg-teal-600',
  },
  {
    id: 'user-student-5',
    name: 'Kabir Malhotra',
    role: 'student',
    email: 'kabir.malhotra@student.joineazy.edu',
    avatarInitials: 'KM',
    department: 'B.Tech CSE · Roll #21CS054',
    avatarBg: 'bg-blue-600',
  },
];

export function getInitialAssignments(): Assignment[] {
  return [
    {
      id: 'asg-1',
      title: 'Database Normalization & BCNF Decomposition',
      subject: 'Database Management Systems',
      description:
        'Analyze the provided e-commerce relational schema containing multi-valued and transitive dependencies. Derive all functional dependencies, compute minimal canonical covers, and decompose the relations up to Boyce-Codd Normal Form (BCNF) ensuring loss-less join decomposition and dependency preservation where feasible. Include schema diagrams and SQL DDL scripts.',
      dueDate: getRelativeISO(-2, 23, 59), // 1 Overdue
      maxMarks: 100,
      createdBy: 'user-admin-1',
      assignedTo: 'all',
      driveLink: 'https://drive.google.com/drive/folders/dbms-bcnf-resources-sample',
      createdAt: getRelativeISO(-8, 10, 0),
    },
    {
      id: 'asg-2',
      title: 'Distributed Consensus & Raft Protocol Analysis',
      subject: 'Computer Science',
      description:
        'Implement or benchmark a distributed key-value store state machine replicated using the Raft consensus algorithm. Analyze leader election timeouts, log compaction with snapshotting, and fault recovery under simulated network partition splits. Submit your write-up and link to the repository or Google Colab notebook.',
      dueDate: getRelativeISO(0, 23, 59), // 1 Due Today
      maxMarks: 100,
      createdBy: 'user-admin-1',
      assignedTo: 'all',
      driveLink: 'https://drive.google.com/drive/folders/cs-raft-consensus-sample',
      createdAt: getRelativeISO(-5, 9, 30),
    },
    {
      id: 'asg-3',
      title: 'Eigenvalue Decomposition & Principal Component Analysis',
      subject: 'Mathematics',
      description:
        'Formulate the mathematical foundation of Principal Component Analysis (PCA) using spectral theorem and Singular Value Decomposition (SVD). Apply the projection algorithm on a high-dimensional facial recognition dataset (Olivetti Faces) and plot the cumulative explained variance ratio across top eigenvectors.',
      dueDate: getRelativeISO(2, 23, 59), // Upcoming 1
      maxMarks: 75,
      createdBy: 'user-admin-2',
      assignedTo: 'all',
      driveLink: 'https://drive.google.com/drive/folders/math-pca-svd-resources',
      createdAt: getRelativeISO(-3, 14, 0),
    },
    {
      id: 'asg-4',
      title: 'Quantum Harmonic Oscillator & Wavepacket Dispersion',
      subject: 'Physics',
      description:
        'Solve the time-dependent Schrödinger equation (TDSE) numerically for a Gaussian wavepacket inside an infinite square well and harmonic potential. Compute probability density evolution, evaluate Heisenberg uncertainty product ΔxΔp over time, and submit code with dispersion plots.',
      dueDate: getRelativeISO(5, 23, 59), // Upcoming 2
      maxMarks: 50,
      createdBy: 'user-admin-2',
      assignedTo: 'all',
      driveLink: 'https://drive.google.com/drive/folders/physics-quantum-tdse-sample',
      createdAt: getRelativeISO(-2, 11, 15),
    },
    {
      id: 'asg-5',
      title: 'Technical Research Abstract & Peer-Review Synthesis',
      subject: 'English',
      description:
        'Compose a 400-word structured research abstract on modern LLM hallucination mitigation strategies following IEEE format. Furthermore, provide a 500-word critical peer-review synthesis evaluating the methodology and experimental validity of an assigned preprint paper.',
      dueDate: getRelativeISO(9, 23, 59), // Upcoming 3
      maxMarks: 50,
      createdBy: 'user-admin-1',
      assignedTo: 'all',
      driveLink: 'https://drive.google.com/drive/folders/eng-ieee-abstract-guidelines',
      createdAt: getRelativeISO(-1, 16, 45),
    },
  ];
}

export function getInitialSubmissions(): Submission[] {
  return [
    // Aarav Mehta (student-1)
    {
      id: 'sub-1',
      assignmentId: 'asg-1',
      studentId: 'user-student-1',
      content:
        'Successfully completed normalization from 1NF to BCNF for all 5 entities. Identified non-trivial FDs {OrderID -> CustomerID, OrderDate} and decomposed OrderDetails to eliminate partial dependency. Provided SQL DDL with foreign key cascades and relational schemas.',
      linkOrFileName: 'https://drive.google.com/file/d/aarav-mehta-dbms-normalization.pdf',
      status: 'Graded',
      submittedAt: getRelativeISO(-3, 18, 30),
      grade: 94,
      feedback:
        'Outstanding work, Aarav! Your derivation of minimal cover was rigorous, and the lossless join proofs were completely solid. Minor suggestion: consider indexing the composite key on Order_Item_Map for query optimization.',
      gradedAt: getRelativeISO(-2, 12, 0),
      gradedBy: 'user-admin-1',
    },
    {
      id: 'sub-2',
      assignmentId: 'asg-2',
      studentId: 'user-student-1',
      content:
        'Implemented Raft consensus in Go with a 5-node cluster. Tested split-brain scenario by partitioning node 1 and 2; confirmed cluster elects new leader in term 2 without data divergence. Added telemetry charts for heartbeat latency.',
      linkOrFileName: 'https://github.com/aaravmehta/raft-consensus-lab',
      status: 'Submitted',
      submittedAt: getRelativeISO(-1, 20, 15),
      grade: null,
      feedback: null,
    },

    // Diya Kapoor (student-2)
    {
      id: 'sub-3',
      assignmentId: 'asg-1',
      studentId: 'user-student-2',
      content:
        'Initial submission for DBMS assignment. Decomposed tables into 3NF, but struggling with the transitive closure proof for Table 4 (Supplier_Shipment_Log).',
      linkOrFileName: 'https://drive.google.com/file/d/diya-kapoor-dbms-draft.pdf',
      status: 'Reopened',
      submittedAt: getRelativeISO(-4, 15, 0),
      grade: null,
      feedback:
        'Good first attempt Diya, but Table 4 is not in BCNF because SupplierID is not a superkey in that relation. Please revise your decomposition of the Supplier_Shipment_Log relation, update your dependency diagram, and resubmit.',
      gradedAt: getRelativeISO(-2, 16, 20),
      gradedBy: 'user-admin-1',
    },
    {
      id: 'sub-4',
      assignmentId: 'asg-4',
      studentId: 'user-student-2',
      content:
        'Simulated 1D quantum harmonic oscillator using finite-difference Crank-Nicolson method in Python. Verified Ehrenfest theorem for wavepacket centroid motion. Attached Colab link with interactive Plotly animations.',
      linkOrFileName: 'https://colab.research.google.com/drive/diya-quantum-tdse-notebook',
      status: 'Graded',
      submittedAt: getRelativeISO(-1, 14, 0),
      grade: 48,
      feedback:
        'Impressive numerical stability and beautiful animation graphs! Your verification of Ehrenfest theorem was spot-on. Full marks on methodology.',
      gradedAt: getRelativeISO(0, 11, 45),
      gradedBy: 'user-admin-2',
    },

    // Arjun Singh (student-3)
    {
      id: 'sub-5',
      assignmentId: 'asg-1',
      studentId: 'user-student-3',
      content:
        'Decomposed relations up to 3NF and BCNF. Included ER diagrams generated via dbdiagram.io and verification test cases with synthetic records.',
      linkOrFileName: 'https://github.com/arjunsingh/dbms-bcnf-project',
      status: 'Submitted',
      submittedAt: getRelativeISO(-3, 11, 0),
      grade: null,
      feedback: null,
    },

    // Ananya Iyer (student-4)
    {
      id: 'sub-6',
      assignmentId: 'asg-1',
      studentId: 'user-student-4',
      content:
        'Comprehensive submission including relational calculus proofs, complete Armstrong axiom derivations for functional dependencies, and BCNF relational schema DDL scripts with check constraints.',
      linkOrFileName: 'https://drive.google.com/file/d/ananya-iyer-dbms-final.pdf',
      status: 'Graded',
      submittedAt: getRelativeISO(-4, 21, 0),
      grade: 98,
      feedback:
        'Exemplary submission Ananya! Your formal mathematical proofs for Armstrong axioms and relational algebra queries were flawless. Textbook-quality presentation.',
      gradedAt: getRelativeISO(-2, 10, 30),
      gradedBy: 'user-admin-1',
    },
    {
      id: 'sub-7',
      assignmentId: 'asg-2',
      studentId: 'user-student-4',
      content:
        'Benchmarked Raft protocol under high-concurrency client load (10k req/sec). Analyzed compaction overhead when snapshotting 50MB log segments.',
      linkOrFileName: 'https://github.com/ananya-iyer/distributed-raft-benchmark',
      status: 'Submitted',
      submittedAt: getRelativeISO(-1, 17, 45),
      grade: null,
      feedback: null,
    },

    // Kabir Malhotra (student-5) has NO submissions yet to demonstrate realistic Not Started / Overdue states!
  ];
}
