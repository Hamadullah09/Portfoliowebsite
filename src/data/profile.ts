export const profile = {
  name: "Hamadullah",
  role: "Software Developer",
  tagline: ".NET · React · AI Engineer",
  location: "Gulshan-e-Iqbal, Karachi, Pakistan",
  phone: "+92 309 9084040",
  phoneHref: "tel:+923099084040",
  email: "hamadullah.amjadali@gmail.com",
  github: "https://github.com/Hamadullah09",
  linkedin: "https://linkedin.com/in/hamadullah-arain-100b8a294",
  resume: "/Hamadullah_Resume.pdf",
  summary:
    "Software Developer with three internships building production-grade software in C#, .NET (ASP.NET Core 8/10), React, Next.js, and SQL Server. At SMA Technologies I developed 15+ RFID-based .NET applications, including a live POS and inventory platform backed by 1,000+ automated tests and CI/CD.",
  about: [
    "I'm a Computer Science student at FAST-NUCES Karachi (expected 2027) who likes building software that runs in the real world — on shop counters, warehouse gates and school entrances.",
    "Most of my work is in C# and .NET with React/Next.js on the front, backed by SQL Server, clean architecture and a lot of automated tests. Alongside that I build AI systems with LangChain and RAG, and I'm currently researching RNA 3D structure prediction for my final-year project.",
  ],
};

export const stats = [
  { value: "15+", label: "RFID .NET apps shipped" },
  { value: "1,000+", label: "Automated tests written" },
  { value: "3", label: "Internships" },
  { value: "50+", label: "Students mentored" },
];

export type Experience = {
  role: string;
  org: string;
  place: string;
  period: string;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Developer Intern",
    org: "SMA Technologies",
    place: "Karachi",
    period: "Jul 2026 – Oct 2026",
    points: [
      "Developed RFID-based enterprise applications in C# and .NET for retail, warehouse, education and business-operations clients, using SQL Server, MySQL, React and Next.js.",
      "Wrote 1,000+ automated unit, integration and architecture tests, and set up a GitHub Actions CI/CD pipeline that runs the full suite before every deployment to IIS.",
      "Integrated RFID readers, scales, cash drawers and receipt printers through a Windows-service terminal agent and real-time SignalR hubs.",
    ],
    stack: ["C#", ".NET 10", "SignalR", "SQL Server", "Next.js", "GitHub Actions"],
  },
  {
    role: "AI Software Engineer Intern",
    org: "Wtechx",
    place: "Karachi",
    period: "May 2026 – Jul 2026",
    points: [
      "Built an Agentic RAG Dental AI Chatbot using Python, LangChain, Qwen and Qdrant, with a FastAPI REST backend and React/Next.js frontend.",
      "Implemented document ingestion, chunking, embeddings, semantic retrieval, conversational memory, and an admin dashboard for dataset management and evaluation.",
    ],
    stack: ["Python", "LangChain", "Qwen", "Qdrant", "FastAPI", "Next.js"],
  },
  {
    role: "Software Development Intern",
    org: "DevelopersHub Corporation",
    place: "Remote",
    period: "Apr 2026 – Jun 2026",
    points: [
      "Built a full-stack Task Management System with RESTful CRUD APIs, authentication, search and filtering, progress tracking, and an analytics dashboard.",
    ],
    stack: ["REST APIs", "Auth", "React", "SQL"],
  },
  {
    role: "Student Teaching Assistant",
    org: "FAST-NUCES",
    place: "Karachi",
    period: "Spring 2025",
    points: [
      "Mentored 50+ students in programming, logic building and debugging; reviewed code and evaluated assignments.",
    ],
    stack: ["Mentoring", "C++", "Code Review"],
  },
];

export const skills = [
  {
    title: "Languages",
    items: ["C#", "TypeScript", "JavaScript", "Python", "SQL", "Java", "C++", "HTML5", "CSS3"],
  },
  {
    title: "Backend",
    items: [".NET 8/10", "ASP.NET Core Web API", "ASP.NET MVC", "Razor Pages", "EF Core", "SignalR", "MediatR (CQRS)", "Identity", "JWT", "FastAPI"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "TanStack Query", "Flutter"],
  },
  {
    title: "Databases",
    items: ["SQL Server", "MySQL", "PostgreSQL", "SQLite", "Redis", "Qdrant"],
  },
  {
    title: "Practices & DevOps",
    items: ["Clean Architecture", "REST API Design", "xUnit Testing", "Git", "GitHub Actions", "CI/CD", "Docker", "IIS", "Swagger", "Linux"],
  },
  {
    title: "RFID & AI",
    items: ["UHF RFID (Chainway U300)", "EPC Tag Processing", "ESC/POS Printers", "LangChain", "RAG", "Embeddings", "Qwen"],
  },
];

export const education = [
  {
    degree: "BS Computer Science",
    school: "FAST – National University of Computer and Emerging Sciences, Karachi",
    period: "2023 – Expected 2027",
  },
  {
    degree: "Intermediate (Pre-Engineering)",
    school: "BISE Nawabshah",
    period: "2021 – 2023",
  },
];

export const research = {
  title: "RNA 3D Structure Prediction for Template-Sparse RNA Sequences",
  kind: "Final Year Project · Research & Development",
  period: "Fall 2026 – 2027",
  org: "FAST-NUCES Karachi · Department of Computer Science",
  team: ["Abdul Salam Kalhoro", "Saniya", "Hamadullah"],
  summary:
    "RNA function depends on the 3D shape it folds into, but prediction accuracy drops sharply when no close structural template exists. We are building a controlled, reproducible benchmark to find which modern predictors hold up on template-sparse RNAs — and why — then improving the strongest one.",
  problem:
    "Published “template-free” methods rely on very different inputs (MSAs, secondary structure, language-model embeddings) and are scored on different datasets, so there is no fair evidence of which strategy is most reliable when templates are scarce.",
  methods: ["Protenix", "NuFold", "DRfold / DRfold2", "RhoFold+", "RNAbpFlow", "trRosettaRNA2"],
  metrics: ["TM-score", "RMSD", "lDDT", "INF"],
  pipeline: [
    "Data collection & benchmark set",
    "Template-sparsity characterization",
    "Input preparation & quality checks",
    "Baseline model execution",
    "Standardized 3D evaluation",
    "Factor & failure analysis",
    "Evidence-driven optimization / ablation",
    "Validation, reproducibility & reporting",
  ],
  myRole: [
    "Building the standardized evaluation pipeline for TM-score, RMSD, lDDT and INF",
    "Runtime / VRAM logging and structured per-target result collection",
    "Statistical and failure analysis with native-vs-predicted structure visualizations",
    "Reproducibility files, evaluation summaries and final figures",
  ],
  stack: ["Python", "PyTorch", "NumPy", "Pandas", "SciPy", "PDB / RNA3DB", "ChimeraX", "Docker", "CUDA"],
};

export const services = [
  {
    title: "Backend & .NET",
    desc: "Clean-architecture APIs in ASP.NET Core 8/10 with EF Core, CQRS/MediatR, Identity, JWT and real-time SignalR hubs.",
    stack: ["C#", "ASP.NET Core", "EF Core", "MediatR", "SignalR", "SQL Server"],
  },
  {
    title: "Full-Stack Web",
    desc: "React and Next.js front ends wired to typed REST APIs — dashboards, admin panels, portals and storefronts.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "TanStack Query"],
  },
  {
    title: "AI & RAG Systems",
    desc: "Retrieval-augmented assistants with LangChain, embeddings and Qdrant, served by FastAPI and local LLMs such as Qwen.",
    stack: ["Python", "LangChain", "Qdrant", "FastAPI", "Ollama", "Qwen"],
  },
  {
    title: "RFID & Hardware",
    desc: "UHF RFID readers, EPC tag processing, ESC/POS printers, scales and cash drawers driven by Windows-service terminal agents.",
    stack: ["Chainway U300", "EPC", "ESC/POS", "Windows Services", "SignalR"],
  },
  {
    title: "Testing & DevOps",
    desc: "Unit, integration and architecture test suites, GitHub Actions CI/CD, Docker images and IIS deployments that ship safely.",
    stack: ["xUnit", "GitHub Actions", "Docker", "IIS", "Linux", "Swagger"],
  },
];
