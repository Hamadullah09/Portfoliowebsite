export type Category = "enterprise" | "ai" | "web" | "systems";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  category: Category;
  context: string;
  type: string;
  stack: string[];
  highlights: string[];
  repo?: string;
  live?: string;
  featured?: boolean;
};

export const categories: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "enterprise", label: "Enterprise & RFID" },
  { id: "ai", label: "AI & ML" },
  { id: "web", label: "Full-Stack" },
  { id: "systems", label: "Systems" },
];

export const categoryLabel: Record<Category, string> = {
  enterprise: "Enterprise · RFID",
  ai: "AI · ML",
  web: "Full-Stack",
  systems: "Systems",
};

const gh = (repo: string) => `https://github.com/Hamadullah09/${repo}`;

export const projects: Project[] = [
  {
    slug: "retail25",
    title: "Retail25",
    subtitle: "Enterprise POS & Inventory Platform",
    summary: "Self-hosted POS, inventory and AR/AP platform with RFID and barcode checkout.",
    description:
      "A self-hosted web platform that modernises the legacy Retail Plus for Windows 2.5. Cashiers sell by keyboard, barcode or RFID with split payments, returns, supervisor-approved voids and drawer close-out, while a Windows terminal agent drives the RFID reader, scale, cash drawer and ESC/POS printer at each till.",
    category: "enterprise",
    context: "SMA Technologies",
    type: "POS Platform",
    stack: [".NET 10", "Clean Architecture", "MediatR (CQRS)", "EF Core", "SQL Server", "SignalR", "OpenIddict", "Next.js 14", "GitHub Actions"],
    highlights: [
      "1,010 automated tests — domain, application, terminal-agent, architecture and integration",
      "Append-only ledger model with a deterministic pricing and tax engine",
      "Windows-service till agent for RFID, scale, cash drawer and receipt printer",
      "CI/CD pipeline runs the full suite before every IIS deployment",
    ],
    repo: gh("SMA-RETAIL25"),
    live: "https://pos.sma-techno.net",
    featured: true,
  },
  {
    slug: "warehouse-rfid-gate",
    title: "Warehouse RFID Gate",
    subtitle: "Gate Management System",
    summary: "Validates carton movements at warehouse gates against planned documents in real time.",
    description:
      "Controls warehouse entry and exit gates with a Chainway U300 fixed UHF RFID reader. Every tag read at the gate is checked against a planned document by a domain validation engine and gate state machine before any stock movement is accepted, with live SignalR displays for operators.",
    category: "enterprise",
    context: "SMA Technologies",
    type: "RFID System",
    stack: ["ASP.NET Core 10", "EF Core 10", "SQL Server", "React", "TypeScript", "SignalR", "Java SDK bridge", "Android"],
    highlights: [
      "Chainway U300 UHF reader integrated through a Java SDK bridge",
      "Domain validation engine and gate state machine",
      "Reader simulator so the full flow runs without hardware",
      "10 modules, 8 API areas and 3 roles",
    ],
    repo: gh("WarehouseManagementSystem"),
    featured: true,
  },
  {
    slug: "campustrack",
    title: "SMA CampusTrack",
    subtitle: "RFID-First School Management",
    summary: "UHF readers at gates and classrooms drive attendance and instant parent notifications.",
    description:
      "UHF readers at school gates and classroom doors record student movement; attendance, parent notifications and reports are built from that record, alongside classes, timetables, assignments, quizzes, exams and grades. Admins and teachers use the web app, students and parents a Flutter mobile app.",
    category: "enterprise",
    context: "SMA Technologies",
    type: "School Platform",
    stack: [".NET 10", "Clean Architecture", "SignalR", "MySQL 8.4", "JWT + Identity", "React 18", "Flutter", "Docker"],
    highlights: [
      "121 granular permissions across 6 roles",
      "JWT refresh-token rotation and a full audit trail",
      "75 database tables, CSV / Excel / PDF reports",
      "4 user experiences — Admin & Teacher on web, Student & Parent on mobile",
    ],
    repo: gh("SMA-CampusTrack"),
    featured: true,
  },
  {
    slug: "dental-ai-chatbot",
    title: "Dental AI Chatbot",
    subtitle: "Agentic RAG Assistant",
    summary: "Self-hosted RAG assistant that answers dental questions with citations.",
    description:
      "A retrieval-augmented chatbot that answers dental questions with citations from uploaded PDF and Word documents. Admins manage ingestion and datasets, and a human-expert review workflow keeps answers in check. Built during my AI internship at Wtechx.",
    category: "ai",
    context: "Wtechx",
    type: "RAG Chatbot",
    stack: ["Python", "FastAPI", "LangChain / LangGraph", "Qdrant", "Qwen (Ollama)", "PostgreSQL", "Redis", "Next.js", "Docker"],
    highlights: [
      "Document ingestion, chunking, embeddings and semantic retrieval",
      "Conversational memory and source citations on every answer",
      "Admin dashboard for dataset management and evaluation",
      "8 Docker services with Prometheus & Grafana monitoring",
    ],
    repo: gh("Dental_AI_Chatbot"),
    featured: true,
  },
  {
    slug: "recordflow",
    title: "RecordFlow",
    subtitle: "Store Verification Portal",
    summary: "CSV import, shareable forms, record verification and Stripe payments.",
    description:
      "A portal for U.S. businesses: store records are imported from CSV, each store receives a secure form to fill in missing contact, emergency and alarm details, and the record is verified and paid for through Stripe hosted checkout. Uploaded CSVs are held in encrypted temporary storage and never persisted.",
    category: "web",
    context: "ASP.NET Core 10",
    type: "Web Portal",
    stack: ["ASP.NET Core 10", "Razor Pages", "EF Core 10", "SQL Server", "Identity", "Redis", "Stripe", "xUnit"],
    highlights: [
      "56 xUnit unit and workflow-integration tests",
      "Encrypted temporary storage with ASP.NET Data Protection",
      "Stripe Checkout for verification payments",
    ],
    repo: gh("recordFlow"),
    featured: true,
  },
  {
    slug: "inaaya-commerce",
    title: "Inaaya Commerce",
    subtitle: "RFID Warehouse + J&T Courier Portal",
    summary: "RFID clothing warehouse and courier portal on one database, gateway and login.",
    description:
      "One platform for Inaaya Store that combines an RFID clothing warehouse — intake, picking, returns and Chainway C72 handhelds — with a J&T courier portal for waybills, bulk import, tracking and WhatsApp messages, all sharing a single database, gateway and login.",
    category: "enterprise",
    context: "Inaaya Store",
    type: "Commerce Platform",
    stack: [".NET 10", "Dapper", "PostgreSQL 16", "React 18", "Kotlin / Compose", "FastAPI", "Next.js 14", "nginx", "Docker"],
    highlights: [
      "504 courier tests plus 386 warehouse checks and 49 end-to-end checks",
      "Kotlin handheld app for Chainway C72 RFID scanners",
      "One gateway port replaces four separate services",
    ],
    repo: gh("JandT"),
    featured: true,
  },
  {
    slug: "coreptx",
    title: "CorePTx",
    subtitle: "Corporate Wellness Platform",
    summary: "Live corporate physiotherapy and ergonomics platform on a containerised .NET 8 backend.",
    description:
      "Built and deployed a live corporate physiotherapy and ergonomics platform for a B2B healthcare startup, with a containerised .NET 8 backend served through Cloudflare.",
    category: "web",
    context: "Healthcare Startup",
    type: "Web Platform",
    stack: [".NET 8", "ASP.NET MVC", "SQLite", "Docker", "Cloudflare"],
    highlights: [
      "Shipped to production for a B2B healthcare startup",
      "Containerised .NET 8 backend behind Cloudflare",
    ],
    live: "https://www.coreptx.com",
    featured: true,
  },
  {
    slug: "sma-messaging",
    title: "SMA Business Messaging",
    subtitle: "Multi-Tenant Chat Platform",
    summary: "WhatsApp-style messaging and store operations for multi-store businesses.",
    description:
      "WhatsApp-style messaging and store operations for businesses with many stores. Strict tenant isolation, role-based administration, privacy-protected contact details and a durable delivery pipeline (outbox → BullMQ → sockets).",
    category: "web",
    context: "SMA Technologies",
    type: "Realtime App",
    stack: ["NestJS", "Socket.IO", "Next.js", "PostgreSQL 17", "Redis", "Prisma", "BullMQ", "Docker"],
    highlights: [
      "Durable outbox → queue → socket delivery pipeline",
      "Strict multi-tenant isolation with shared Zod schemas and permissions",
      "All 8 planned phases implemented and tested",
    ],
    repo: gh("messenger"),
    featured: true,
  },
  {
    slug: "sma-tracking",
    title: "SMA Tracking",
    subtitle: "Shopify → J&T Shipment Automation",
    summary: "Webhook-driven order approval, courier booking and tracking updates.",
    description:
      "Order tracking and shipment automation for a Shopify store shipping with J&T Express Malaysia. Orders arrive by HMAC-verified webhook, a person approves each one, and the platform books the courier and sends tracking updates through n8n workflows.",
    category: "web",
    context: "SMA Technologies",
    type: "Automation",
    stack: [".NET 10", "Razor Pages", "SQL Server", "EF Core", "Shopify Webhooks", "n8n", "IIS"],
    highlights: [
      "530 tests — 386 unit, 113 integration, 31 acceptance",
      "9 guarantees enforced at the database level",
      "5 n8n workflows for notifications and courier booking",
    ],
    repo: gh("OrderTracking-"),
  },
  {
    slug: "certex",
    title: "CertEx",
    subtitle: "Certificate Register & OCR Pipeline",
    summary: "Civil certificate register filled by OCR extraction, CSV import and manual entry.",
    description:
      "A register of birth, marriage, death and other civil certificates, populated by OCR extraction from uploaded PDFs, Word files and scans (including Urdu), CSV imports and manual entry, with an optional LLM fallback for hard documents.",
    category: "ai",
    context: "FastAPI + OCR",
    type: "Data Pipeline",
    stack: ["Next.js 15", "FastAPI", "SQLAlchemy 2", "PostgreSQL 16", "Celery", "MinIO", "Tesseract OCR", "OpenCV"],
    highlights: [
      "Urdu OCR with OpenCV preprocessing and LLM fallback",
      "5 search tiers and 3 roles",
      "Scale tests designed for 10k, 100k and 1M records",
    ],
    repo: gh("certEx"),
  },
  {
    slug: "meridian-dental",
    title: "Meridian Dental",
    subtitle: "Practice Management System",
    summary: "Records, charting, appointments, billing, insurance and stock for dental practices.",
    description:
      "Dental practice management covering patient records, tooth charting, appointments, treatment plans, implant records, billing and insurance claims, stock and sterilisation, lab work, documents and reporting — with tenant isolation enforced in the persistence layer.",
    category: "web",
    context: "Blazor Server",
    type: "Management System",
    stack: ["ASP.NET Core 8", "Blazor Server", "EF Core", "SQL Server", "Docker", "Serilog"],
    highlights: [
      "231 automated tests",
      "80 tenant-owned entities and 22 exportable reports",
      "FDI tooth charting and X12 837D insurance claims",
    ],
    repo: gh("DentalManagementSystem"),
  },
  {
    slug: "visioncart",
    title: "VisionCart Optical",
    subtitle: "Prescription Eyewear Store",
    summary: "Eyewear store with in-browser virtual try-on, lens builder and back office.",
    description:
      "An online prescription eyewear shop with catalogue, in-browser virtual try-on (face data never leaves the device), lens builder, prescriptions, orders, appointment diary and a full back office — ported from Next.js to ASP.NET Core for IIS shared hosting.",
    category: "web",
    context: "ASP.NET Core",
    type: "E-commerce",
    stack: ["ASP.NET Core 10", "EF Core", "SQL Server", "Razor", "IIS"],
    highlights: [
      "232 tests — 92 unit, 140 integration",
      "Privacy-first virtual try-on in the browser",
      "57-page user manual",
    ],
    repo: gh("VisionCart"),
  },
  {
    slug: "atlas-place-finder",
    title: "Atlas",
    subtitle: "AI Place Finder",
    summary: "Finds and researches places in any city, then exports illustrated PDF reports.",
    description:
      "Finds every place of a given kind (for example museums) in a city or a CSV batch of cities, researches each one with a local LLM and exports ZIPs of illustrated PDFs. Ships in an open-source edition (OpenStreetMap / Wikidata) and a Google Maps edition.",
    category: "ai",
    context: "Local LLM",
    type: "AI Tool",
    stack: ["Next.js 15", "React 19", "Tailwind 4", "Express", "TypeScript", "Ollama (Qwen3)", "pdfkit"],
    highlights: [
      "4-stage LLM evaluation harness — translate, filter, write-up, dedupe",
      "Two editions plus standalone Windows executables",
    ],
    repo: gh("atlas-place-finder"),
  },
  {
    slug: "nimbus-store",
    title: "Nimbus Store",
    subtitle: "Storefront & Admin Panel",
    summary: "Age-gated storefront with faceted search, role-based admin and a seeded catalogue.",
    description:
      "An age-gated storefront and admin panel for the Pakistani market with authentication, role-based access and faceted catalogue search.",
    category: "web",
    context: "SMA Technologies",
    type: "E-commerce",
    stack: ["Next.js 16", "React 19", "Tailwind v4", "Prisma 7", "PostgreSQL"],
    highlights: [
      "26 Prisma models and 3 roles",
      "Seeded catalogue — 25 products, 95 variants, 17 categories",
    ],
    repo: gh("SMA-VapeStore"),
  },
  {
    slug: "sma-library",
    title: "SMA Library",
    subtitle: "Library Management System",
    summary: "Books, reservations, borrowing, fines and reports with role-based access.",
    description:
      "Manages books, reservations, borrowing, returns, fines and accounts with role-based access — a student catalogue on one side, reports and moderation for admins on the other.",
    category: "web",
    context: "SMA Technologies",
    type: "Management System",
    stack: ["ASP.NET Core 9", "MVC / Razor Pages", "EF Core 9", "SQL Server", "Identity", "MailKit"],
    highlights: [
      "FIFO reservation queue and automated overdue reminder emails",
      "4 admin report types and 3 roles",
    ],
    repo: gh("SMA-LMS"),
  },
  {
    slug: "crime-hotspot",
    title: "Crime Hotspot Predictor",
    subtitle: "AI Safe-Route System",
    summary: "Scores area crime risk and suggests safer routes between locations.",
    description:
      "A Flask backend with a static frontend that analyses area crime profiles and suggests safer routes, using heuristic risk scoring, pathfinding and an optional decision-tree model.",
    category: "ai",
    context: "Python + ML",
    type: "ML Project",
    stack: ["Python", "Flask", "scikit-learn", "NumPy"],
    highlights: [
      "Decision-tree, pathfinding and risk-scoring modules",
      "Falls back to heuristics when scikit-learn is unavailable",
    ],
    repo: gh("AI_Crime_Hotspot_Predictor_And_Safe_Route_System"),
  },
  {
    slug: "thk-protocol",
    title: "THK Protocol",
    subtitle: "Reliable Transport Simulator",
    summary: "Custom TCP-like protocol with a real-time visualisation of packet flow.",
    description:
      "A full-stack simulator of a custom TCP-like reliable transport protocol with a real-time canvas view of packet flow — handshake, checksums, flow control and reconnection — where users chat with AI agents over the simulated network.",
    category: "systems",
    context: "Socket.IO",
    type: "Networking",
    stack: ["Node.js", "Express", "Socket.IO", "React", "React Konva"],
    highlights: [
      "6 packet types — SYN, SYN-ACK, ACK, DATA, FIN, FIN-ACK",
      "Checksum, flow control and reconnection",
    ],
    repo: gh("THK_PROTOCOL"),
  },
  {
    slug: "retroquest-compiler",
    title: "RetroQuest",
    subtitle: "Interactive-Fiction DSL Compiler",
    summary: "Compiler for a custom story DSL down to a JSON story graph and CLI interpreter.",
    description:
      "A mini compiler for a custom interactive-fiction language (.rq files), built for Compiler Construction at FAST-NUCES. Programs go through a lexer, recursive-descent parser, semantic analyser, IR generator and optimiser to a JSON story graph that a CLI interpreter runs.",
    category: "systems",
    context: "FAST-NUCES",
    type: "Compiler",
    stack: ["Python", "Recursive-descent parser", "AST", "JSON IR", "CLI / REPL"],
    highlights: [
      "9 modules from lexer to interpreter",
      "--debug flag prints tokens, AST, symbol table and IR",
    ],
    repo: gh("RetroQuest-Compiler"),
  },
  {
    slug: "fast-carpool",
    title: "FAST-Carpool Hub",
    subtitle: "Student Ride Sharing",
    summary: "Ride search, booking, live location and chat for FAST-NUCES students.",
    description:
      "A carpooling platform for FAST-NUCES Karachi students that connects drivers and passengers, with ride search and booking, live location tracking, group and private chat, and an admin dashboard.",
    category: "web",
    context: "FAST-NUCES",
    type: "Web App",
    stack: ["ASP.NET Core 8 MVC", "EF Core 8", "SQL Server", "SignalR", "Leaflet.js", "Chart.js"],
    highlights: [
      "3 SignalR hubs — group chat, private chat, live location",
      "30 documented endpoints and 3 roles",
    ],
    repo: gh("Fast-Carpool"),
  },
  {
    slug: "complaint-management",
    title: "Complaint Management",
    subtitle: "Faculty IT Ticketing",
    summary: "Faculty raise complaints, admins assign IT staff, everyone tracks progress.",
    description:
      "Faculty register complaints such as classroom hardware issues, admins assign them to IT staff, and staff update status and remarks while faculty track progress.",
    category: "web",
    context: "Web Forms",
    type: "Web App",
    stack: ["ASP.NET Web Forms", ".NET Framework 4.7.2", "C#", "SQL Server"],
    highlights: ["3 roles — Admin, Faculty, IT Staff"],
    repo: gh("ComplaintManagementSystem"),
  },
  {
    slug: "turing-machine",
    title: "Multi-Tape Turing Machine",
    subtitle: "Automata Simulator",
    summary: "Logic simulator with a Qt GUI to visualise automata theory.",
    description:
      "A multi-tape Turing machine simulator with a Qt GUI that visualises tape heads, transitions and state changes step by step.",
    category: "systems",
    context: "C++ / Qt",
    type: "Simulator",
    stack: ["C++", "Qt"],
    highlights: ["Step-by-step visualisation across multiple tapes"],
  },
  {
    slug: "omnifood",
    title: "Omnifood",
    subtitle: "Marketing Landing Page",
    summary: "Responsive landing page for an AI-personalised meal subscription.",
    description:
      "A responsive static marketing site for a fictional AI-personalised meal-subscription company — features, how it works, pricing, testimonials and gallery — built with hand-written HTML, CSS and JavaScript.",
    category: "web",
    context: "HTML / CSS",
    type: "Landing Page",
    stack: ["HTML5", "CSS3", "JavaScript"],
    highlights: ["Hand-written responsive layout, no framework"],
    repo: gh("Omnifood-"),
  },
];
