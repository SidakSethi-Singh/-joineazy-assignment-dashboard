export interface CourseResource {
  id: string;
  name: string;
  type: 'pdf' | 'code' | 'dataset' | 'slides';
  size: string;
  description: string;
  previewContent?: string;
  rubricBreakdown?: { criteria: string; marks: number; description: string }[];
}

export interface AssignmentMaterials {
  assignmentId: string;
  drivePath: string;
  instructorName: string;
  overview: string;
  resources: CourseResource[];
}

export const COURSE_MATERIALS_MAP: Record<string, AssignmentMaterials> = {
  'asg-1': {
    assignmentId: 'asg-1',
    drivePath: 'joineazy://cloud.drive/cse-dbms/asg-01-normalization-bcnf',
    instructorName: 'Prof. Anita Sharma',
    overview:
      'Official coursework pack for Database Systems Module 3. Includes relational schema DDL, canonical cover derivation exercises, and decomposition verification scripts.',
    resources: [
      {
        id: 'res-1-1',
        name: 'DBMS_Module3_BCNF_Decomposition_Rubric.pdf',
        type: 'pdf',
        size: '1.4 MB',
        description: 'Grading rubric, dependency preservation proofs, and canonical cover guidelines.',
        previewContent:
          'ASSIGNMENT SPECIFICATION & GRADING CRITERIA\n' +
          '1. Functional Dependency Derivation (25%)\n' +
          '   - Correct identification of primary and composite candidate keys.\n' +
          '   - Application of Armstrong\'s Axioms (Reflexivity, Augmentation, Transitivity).\n' +
          '2. Minimal Canonical Cover Computation (25%)\n' +
          '   - Extraneous attribute elimination with proof steps.\n' +
          '3. BCNF Relational Decomposition (30%)\n' +
          '   - Step-by-step lossless-join decomposition verification using Spiekermann matrix algorithm.\n' +
          '4. SQL DDL Implementation & Constraints (20%)\n' +
          '   - PostgreSQL DDL script with foreign key cascade actions and check constraints.',
        rubricBreakdown: [
          { criteria: 'FD Minimal Cover', marks: 25, description: 'Minimal canonical cover without extraneous attributes' },
          { criteria: 'BCNF Decomposition', marks: 35, description: 'Lossless-join step-by-step verification' },
          { criteria: 'SQL Schema Script', marks: 25, description: 'PostgreSQL syntax with foreign keys & check constraints' },
          { criteria: 'Documentation & Edge Cases', marks: 15, description: 'Handling composite keys and nullability' },
        ],
      },
      {
        id: 'res-1-2',
        name: 'ecommerce_unnormalized_schema.sql',
        type: 'code',
        size: '42 KB',
        description: 'Raw SQL schema containing transitive and multivalued order anomalies.',
        previewContent:
          '-- Unnormalized e-Commerce Schema Seed\n' +
          'CREATE TABLE orders_raw_denormalized (\n' +
          '    order_id INT,\n' +
          '    customer_id INT,\n' +
          '    customer_name VARCHAR(100),\n' +
          '    customer_city VARCHAR(100),\n' +
          '    item_sku VARCHAR(50),\n' +
          '    item_title VARCHAR(150),\n' +
          '    item_price DECIMAL(10,2),\n' +
          '    order_quantity INT,\n' +
          '    warehouse_id INT,\n' +
          '    warehouse_location VARCHAR(100)\n' +
          ');\n\n' +
          '-- Functional Dependencies to Decompose:\n' +
          '-- FD1: order_id -> customer_id, customer_name, customer_city\n' +
          '-- FD2: customer_id -> customer_name, customer_city\n' +
          '-- FD3: item_sku -> item_title, item_price\n' +
          '-- FD4: order_id, item_sku -> order_quantity\n' +
          '-- FD5: warehouse_id -> warehouse_location',
      },
      {
        id: 'res-1-3',
        name: 'Lecture_12_Armstrong_Axioms_Handout.slides',
        type: 'slides',
        size: '3.6 MB',
        description: 'Lecture slides covering lossless join decomposition and dependency preservation.',
      },
    ],
  },
  'asg-2': {
    assignmentId: 'asg-2',
    drivePath: 'joineazy://cloud.drive/cse-distrib/asg-02-raft-consensus',
    instructorName: 'Prof. Anita Sharma',
    overview:
      'Distributed Systems Lab 4: Raft Consensus Engine. Contains test cluster harness, simulated network partition runner, and log compaction benchmark dataset.',
    resources: [
      {
        id: 'res-2-1',
        name: 'Raft_Protocol_Lab_Specification_2026.pdf',
        type: 'pdf',
        size: '2.1 MB',
        description: 'Complete invariants checklist for election safety, log matching, and committed entry persistence.',
        previewContent:
          'RAFT CONSENSUS ENGINE LAB CRITERIA\n' +
          'Invariants to preserve:\n' +
          '1. Election Safety: At most one leader can be elected in a given term.\n' +
          '2. Leader Append-Only: A leader never overwrites or truncates its own log.\n' +
          '3. Log Matching: If two logs contain an entry with the same index and term, then they are identical.\n' +
          '4. State Machine Safety: If a server has applied an entry at index i, no other server will ever apply a different entry.',
        rubricBreakdown: [
          { criteria: 'Leader Election & Heartbeats', marks: 30, description: 'Randomized timeout & split-vote handling' },
          { criteria: 'Log Replication & Consistency', marks: 35, description: 'AppendEntries RPC & conflict resolution' },
          { criteria: 'Partition Split & Recovery', marks: 25, description: 'Majority quorum safety under network netsplit' },
          { criteria: 'Log Compaction (Snapshots)', marks: 10, description: 'InstallSnapshot RPC implementation' },
        ],
      },
      {
        id: 'res-2-2',
        name: 'raft_cluster_partition_test_harness.py',
        type: 'code',
        size: '78 KB',
        description: 'Python test harness simulating 5-node cluster with randomized network delays and packet drop.',
        previewContent:
          'import time, random\n\n' +
          'class NetworkPartitionSimulator:\n' +
          '    """Simulates bidirectional network partition between quorums."""\n' +
          '    def __init__(self, cluster_nodes):\n' +
          '        self.nodes = cluster_nodes\n' +
          '        self.partitions = {}\n\n' +
          '    def isolate_node(self, node_id):\n' +
          '        print(f"[TEST HARNESS] Isolating node {node_id} from cluster majority...")\n' +
          '        # Triggers election timeout on minority',
      },
      {
        id: 'res-2-3',
        name: 'Stanford_Ongaro_Raft_Preprint.pdf',
        type: 'pdf',
        size: '1.8 MB',
        description: 'Original paper: "In Search of an Understandable Consensus Algorithm" by Ongaro & Ousterhout.',
      },
    ],
  },
  'asg-3': {
    assignmentId: 'asg-3',
    drivePath: 'joineazy://cloud.drive/math-linear/asg-03-pca-svd',
    instructorName: 'Prof. Rahul Verma',
    overview:
      'Linear Algebra & Numerical Methods: SVD & Principal Component Analysis. Includes Olivetti face recognition matrix and eigenvalue projection handouts.',
    resources: [
      {
        id: 'res-3-1',
        name: 'PCA_SVD_Mathematical_Derivation_Handout.pdf',
        type: 'pdf',
        size: '1.6 MB',
        description: 'Spectral theorem derivation and variance maximization with Lagrange multipliers.',
        previewContent:
          'PCA & SVD THEORETICAL FORMULATION\n' +
          'Objective: Maximize Var(X * w) subject to ||w||^2 = 1\n' +
          'Lagrangian: L(w, λ) = w^T * Cov(X) * w - λ(w^T * w - 1)\n' +
          'Setting gradient to zero yields the standard eigenvalue equation: Cov(X) * w = λ * w.\n' +
          'Singular Value Decomposition relates via: X = U * Σ * V^T, where columns of V are eigenvectors of X^T * X.',
        rubricBreakdown: [
          { criteria: 'Mathematical Proof', marks: 25, description: 'Rigorous derivation of PCA from variance maximization' },
          { criteria: 'SVD Computation', marks: 25, description: 'Covariance matrix vs Thin SVD computational efficiency' },
          { criteria: 'Variance Explained Plot', marks: 15, description: 'Scree plot with 95% variance elbow cutoff' },
          { criteria: 'Reconstruction Accuracy', marks: 10, description: 'MSE calculation across top k principal components' },
        ],
      },
      {
        id: 'res-3-2',
        name: 'olivetti_faces_dataset_normalized.npz',
        type: 'dataset',
        size: '4.8 MB',
        description: '400 normalized 64x64 facial grayscale matrices for dimensionality reduction.',
      },
      {
        id: 'res-3-3',
        name: 'pca_projection_starter_template.ipynb',
        type: 'code',
        size: '115 KB',
        description: 'Jupyter notebook starter with matplotlib scree plot boilerplate.',
      },
    ],
  },
  'asg-4': {
    assignmentId: 'asg-4',
    drivePath: 'joineazy://cloud.drive/phys-quantum/asg-04-harmonic-oscillator',
    instructorName: 'Prof. Rahul Verma',
    overview:
      'Computational Quantum Mechanics: Numerical solutions of the Time-Dependent Schrödinger Equation (TDSE) via finite difference methods.',
    resources: [
      {
        id: 'res-4-1',
        name: 'TDSE_Crank_Nicolson_Finite_Difference_Guide.pdf',
        type: 'pdf',
        size: '2.4 MB',
        description: 'Unitary time-evolution propagator and Tridiagonal Matrix Algorithm (TDMA) guide.',
        previewContent:
          'TDSE FINITE DIFFERENCE DISCRETIZATION\n' +
          'Crank-Nicolson implicit scheme:\n' +
          '(I + i*H*Δt / 2ħ) * Ψ(t + Δt) = (I - i*H*Δt / 2ħ) * Ψ(t)\n' +
          'Properties:\n' +
          '- Unconditionally stable (unitary operator preserves total probability = 1)\n' +
          '- Spatial second derivative approximation: d²Ψ/dx² ≈ (Ψ_{j+1} - 2Ψ_j + Ψ_{j-1}) / Δx²',
        rubricBreakdown: [
          { criteria: 'Unitary Scheme Implementation', marks: 20, description: 'Correct Crank-Nicolson tridiagonal solver' },
          { criteria: 'Wavepacket Dispersion', marks: 15, description: 'Temporal evolution of Gaussian wavepacket in well' },
          { criteria: 'Uncertainty Principle ΔxΔp', marks: 10, description: 'Verification of Heisenberg uncertainty bound' },
          { criteria: 'Code Quality & Plots', marks: 5, description: 'Clean vectorized Python script and phase-space animation' },
        ],
      },
      {
        id: 'res-4-2',
        name: 'quantum_wavepacket_solver.py',
        type: 'code',
        size: '44 KB',
        description: 'Python script with tridiagonal solver and probability density normalization check.',
      },
    ],
  },
  'asg-5': {
    assignmentId: 'asg-5',
    drivePath: 'joineazy://cloud.drive/eng-tech/asg-05-ieee-abstract-synthesis',
    instructorName: 'Prof. Anita Sharma',
    overview:
      'Technical Communication & Scientific Writing: IEEE Conference Abstract Structure & Critical Peer-Review Synthesis. Official guidelines and rubric.',
    resources: [
      {
        id: 'res-5-1',
        name: 'IEEE_Technical_Abstract_Format_Guidelines_2026.pdf',
        type: 'pdf',
        size: '1.2 MB',
        description: '400-word structured abstract breakdown: Context, Objective, Methodology, Results, Significance.',
        previewContent:
          'IEEE STRUCTURED ABSTRACT SPECIFICATION\n' +
          'Your 400-word submission must strictly adhere to the 5 standard IEEE sections:\n' +
          '1. Background & Problem Context (~60 words): Define the challenge of LLM hallucination in high-stakes domains.\n' +
          '2. Stated Objective (~50 words): Explicit contribution and proposed mitigation hypothesis.\n' +
          '3. Methodological Approach (~120 words): Architecture (e.g., RAG, Self-Refinement, Fact-Checking Agents).\n' +
          '4. Quantified Results (~100 words): Benchmark metrics (e.g., TruthfulQA, HalluQA accuracy improvements).\n' +
          '5. Scientific Impact & Conclusion (~70 words): Limitations, generalization boundaries, and future directions.',
        rubricBreakdown: [
          { criteria: 'Structured Abstract Content', marks: 20, description: 'Strict 400-word 5-section IEEE structure' },
          { criteria: 'Peer-Review Critical Synthesis', marks: 15, description: '500-word critical evaluation of preprint methodology' },
          { criteria: 'Technical Precision & Vocabulary', marks: 10, description: 'Clarity, conciseness, and scientific accuracy' },
          { criteria: 'Citation & Formatting Standard', marks: 5, description: 'IEEE style adherence with zero informal syntax' },
        ],
      },
      {
        id: 'res-5-2',
        name: 'Assigned_Preprint_Hallucination_Mitigation.pdf',
        type: 'pdf',
        size: '3.1 MB',
        description: 'Target preprint paper for peer-review evaluation: "Iterative Contrastive Decoding for Factuality in Large Language Models".',
      },
      {
        id: 'res-5-3',
        name: 'Peer_Review_Rubric_Synthesis_Template.docx',
        type: 'slides',
        size: '220 KB',
        description: 'Standard IEEE peer-review scorecard with evaluation checkboxes.',
      },
    ],
  },
};
