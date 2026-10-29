/**
 * Content for the illustrative UI mockups used as project covers and hover previews.
 * Names and numbers are representative sample data, not production records.
 */

export type Row = string[];
export type Kpi = { label: string; value: string; delta?: string; down?: boolean };

type Base = { accent: string; url: string; dark?: boolean };

export type MockupData =
  | (Base & {
      kind: "pos";
      store: string;
      till: string;
      categories: string[];
      products: { name: string; price: string }[];
      cart: { name: string; meta: string; qty: number; price: string }[];
      totals: [string, string][];
      total: string;
    })
  | (Base & {
      kind: "gate";
      gate: string;
      doc: string;
      partner: string;
      done: number;
      expected: number;
      reads: Row[];
    })
  | (Base & {
      kind: "dashboard";
      app: string;
      nav: string[];
      title: string;
      kpis: Kpi[];
      chartTitle: string;
      chart: number[];
      side: { title: string; items: [string, string][] };
      tableTitle: string;
      cols: string[];
      rows: Row[];
      phone?: Phone;
    })
  | (Base & {
      kind: "chat";
      app: string;
      threads: string[];
      question: string;
      answer: string[];
      sources: [string, string][];
    })
  | (Base & {
      kind: "messenger";
      app: string;
      chats: { name: string; last: string; time: string; unread?: number }[];
      thread: { me?: boolean; text: string; time: string }[];
      card: { title: string; lines: [string, string][] };
      phone?: Phone;
    })
  | (Base & {
      kind: "store";
      brand: string;
      nav: string[];
      eyebrow: string;
      title: string;
      sub: string;
      cta: string;
      products: { name: string; price: string; tag?: string }[];
    })
  | (Base & {
      kind: "landing";
      brand: string;
      nav: string[];
      eyebrow: string;
      title: string;
      sub: string;
      ctas: [string, string];
      stats: [string, string][];
      cards: [string, string][];
    })
  | (Base & {
      kind: "code";
      project: string;
      files: string[];
      file: string;
      code: string[];
      terminal: string[];
    })
  | (Base & {
      kind: "map";
      app: string;
      mode: "route" | "pins" | "track";
      panelTitle: string;
      fields?: [string, string][];
      cards: { title: string; meta: string; tag?: string; good?: boolean }[];
      phone?: Phone;
    })
  | (Base & {
      kind: "ocr";
      app: string;
      docTitle: string;
      docLines: string[];
      fields: [string, string, string][];
    });

export type Phone = { title: string; sub: string; items: [string, string][]; badge?: string };

export const mockups: Record<string, MockupData> = {
  retail25: {
    kind: "pos",
    accent: "#f5a524",
    url: "pos.sma-techno.net/till/03",
    store: "Retail25 · Dolmen Mall",
    till: "Till 03 · Cashier Ayesha",
    categories: ["All", "Denim", "Shirts", "Footwear", "Accessories"],
    products: [
      { name: "Slim Fit Jeans", price: "Rs 7,499" },
      { name: "Oxford Shirt", price: "Rs 4,290" },
      { name: "Air Run 42", price: "Rs 11,200" },
      { name: "Leather Belt", price: "Rs 2,450" },
      { name: "Chino Shorts", price: "Rs 3,690" },
      { name: "Canvas Tote", price: "Rs 1,850" },
    ],
    cart: [
      { name: "Slim Fit Jeans", meta: "32 · Indigo · RFID E280…4F1A", qty: 1, price: "7,499" },
      { name: "Oxford Shirt", meta: "M · Navy · Barcode", qty: 2, price: "8,580" },
      { name: "Air Run 42", meta: "UK 9 · RFID E280…91C2", qty: 1, price: "11,200" },
      { name: "Leather Belt", meta: "34 · Brown · RFID E280…0B7D", qty: 1, price: "2,450" },
    ],
    totals: [
      ["Subtotal", "29,729"],
      ["Member discount 5%", "−1,486"],
      ["GST 17%", "4,801"],
    ],
    total: "Rs 33,044",
  },
  "warehouse-rfid-gate": {
    kind: "gate",
    accent: "#22d3ee",
    dark: true,
    url: "gate.wms.local/gates/02",
    gate: "Gate 02 · Inbound",
    doc: "GRN-2026-1184",
    partner: "Al-Karam Textiles",
    done: 46,
    expected: 48,
    reads: [
      ["E280 6894 0000 4F1A", "CTN-SH-0412", "14:02:51", "Valid"],
      ["E280 6894 0000 91C2", "CTN-DN-0388", "14:02:51", "Valid"],
      ["E280 6894 0000 0B7D", "CTN-AC-0107", "14:02:50", "Valid"],
      ["E280 6894 0000 77E0", "CTN-SH-0415", "14:02:49", "Valid"],
      ["E280 6894 0000 C3A9", "CTN-FW-0230", "14:02:48", "Unexpected"],
      ["E280 6894 0000 1D44", "CTN-DN-0391", "14:02:47", "Valid"],
    ],
  },
  campustrack: {
    kind: "dashboard",
    accent: "#8b5cf6",
    url: "campustrack.sma-techno.net/attendance",
    app: "CampusTrack",
    nav: ["Dashboard", "Attendance", "Students", "Timetable", "Exams", "Reports"],
    title: "Attendance · Today",
    kpis: [
      { label: "Present", value: "412", delta: "91.5%" },
      { label: "Late arrivals", value: "18", delta: "−4", down: true },
      { label: "Absent", value: "20" },
      { label: "Gate events", value: "1,284", delta: "+6%" },
    ],
    chartTitle: "Arrivals by time",
    chart: [8, 22, 64, 98, 72, 30, 14, 9, 6, 4],
    side: {
      title: "Notifications sent",
      items: [
        ["Parents notified", "412"],
        ["Late alerts", "18"],
        ["Absence alerts", "20"],
      ],
    },
    tableTitle: "Live gate log",
    cols: ["Student", "Class", "Gate", "Time", "Status"],
    rows: [
      ["Ali Raza", "Grade 7-B", "Gate A", "07:42", "On time"],
      ["Mahnoor Khan", "Grade 5-A", "Gate B", "07:44", "On time"],
      ["Hassan Iqbal", "Grade 9-C", "Gate A", "08:06", "Late"],
      ["Zara Ahmed", "Grade 3-A", "Gate C", "07:39", "On time"],
    ],
    phone: { title: "CampusTrack", sub: "Parent app", badge: "Ali arrived at school", items: [["Gate A", "07:42 AM"], ["Class 7-B", "Present"], ["This month", "96%"]] },
  },
  "dental-ai-chatbot": {
    kind: "chat",
    accent: "#38bdf8",
    url: "dentalai.app/chat",
    app: "Dental AI",
    threads: ["Scaling & root planing", "Post-extraction care", "Implant aftercare", "Fluoride for kids"],
    question: "How often should a patient with stage II periodontitis come in for maintenance?",
    answer: [
      "For stage II periodontitis, supportive periodontal care is typically recommended every 3 months after active treatment [1].",
      "Intervals can be extended to 4–6 months once pocket depths stay ≤ 4 mm with no bleeding on probing at two consecutive visits [2].",
    ],
    sources: [
      ["Periodontitis clinical guideline.pdf", "p. 14 · 0.92 match"],
      ["Maintenance intervals study.docx", "p. 3 · 0.88 match"],
    ],
  },
  recordflow: {
    kind: "dashboard",
    accent: "#10b981",
    url: "recordflow.app/admin/records",
    app: "RecordFlow",
    nav: ["Overview", "Imports", "Records", "Forms", "Payments", "Settings"],
    title: "Verification overview",
    kpis: [
      { label: "Records imported", value: "12,480" },
      { label: "Verified", value: "9,312", delta: "+214" },
      { label: "Forms pending", value: "2,604" },
      { label: "Payments", value: "$18,420", delta: "+12%" },
    ],
    chartTitle: "Verifications this month",
    chart: [12, 18, 15, 24, 30, 28, 36, 42, 39, 48, 55, 61],
    side: {
      title: "Latest import",
      items: [
        ["stores_march.csv", "4,120 rows"],
        ["Duplicates removed", "38"],
        ["Forms sent", "1,906"],
      ],
    },
    tableTitle: "Records",
    cols: ["Store", "City", "Contact", "Status", "Amount"],
    rows: [
      ["QuickMart #214", "Austin, TX", "R. Diaz", "Verified", "$49"],
      ["Fuel Stop 88", "Tulsa, OK", "J. Patel", "Form sent", "—"],
      ["Corner Deli", "Dallas, TX", "M. Chen", "Paid", "$49"],
      ["Sunrise Gas", "Wichita, KS", "A. Brooks", "Verified", "$49"],
    ],
  },
  "inaaya-commerce": {
    kind: "dashboard",
    accent: "#ef4444",
    url: "ops.inaaya.store/warehouse",
    app: "Inaaya Ops",
    nav: ["Warehouse", "Intake", "Picking", "Returns", "Courier", "Waybills"],
    title: "Warehouse · Wave 12",
    kpis: [
      { label: "Orders today", value: "386", delta: "+9%" },
      { label: "Picked", value: "341" },
      { label: "Waybills", value: "298" },
      { label: "Returns", value: "14", delta: "−3", down: true },
    ],
    chartTitle: "Picks per hour",
    chart: [20, 34, 48, 62, 58, 71, 66, 80, 74, 52],
    side: {
      title: "J&T courier",
      items: [
        ["Booked", "298"],
        ["In transit", "1,042"],
        ["Delivered today", "512"],
      ],
    },
    tableTitle: "Picking queue",
    cols: ["Order", "Items", "Bin", "Picker", "Status"],
    rows: [
      ["INA-20418", "3", "A-12-04", "Bilal", "Picked"],
      ["INA-20419", "1", "C-03-11", "Sana", "Picking"],
      ["INA-20420", "2", "B-07-02", "Bilal", "Waybill"],
      ["INA-20421", "4", "A-01-09", "Umar", "Picking"],
    ],
    phone: { title: "Handheld · C72", sub: "Wave 12 picking", badge: "38 / 40 tags read", items: [["Bin A-12-04", "3 items"], ["Kurta — M", "✓ RFID"], ["Dupatta", "✓ RFID"]] },
  },
  coreptx: {
    kind: "landing",
    accent: "#14b8a6",
    url: "coreptx.com",
    brand: "CorePTx",
    nav: ["Programs", "Ergonomics", "For teams", "About"],
    eyebrow: "Corporate physiotherapy",
    title: "Healthier teams, fewer sick days.",
    sub: "On-site physiotherapy, ergonomic assessments and recovery programs built for modern workplaces.",
    ctas: ["Book a demo", "View programs"],
    stats: [
      ["38%", "less back pain"],
      ["2.4k", "employees treated"],
      ["4.9", "average rating"],
    ],
    cards: [
      ["Desk ergonomics", "Workstation audits"],
      ["On-site clinics", "Weekly sessions"],
      ["Recovery plans", "Tracked progress"],
    ],
  },
  "sma-messaging": {
    kind: "messenger",
    accent: "#22c55e",
    url: "chat.sma-techno.net",
    app: "SMA Messaging",
    chats: [
      { name: "Clifton Store", last: "Stock request #482 sent", time: "14:08", unread: 3 },
      { name: "DHA Phase 6", last: "Counted 120 units ✓", time: "13:51" },
      { name: "Gulshan Outlet", last: "Delivery at 5 pm", time: "12:30", unread: 1 },
      { name: "Head Office", last: "Weekly report attached", time: "Mon" },
    ],
    thread: [
      { text: "Running low on size M polos, can we get 40 more?", time: "14:02" },
      { me: true, text: "Raised it now — warehouse confirms dispatch today.", time: "14:05" },
      { text: "Perfect, thanks! 🙏", time: "14:06" },
    ],
    card: { title: "Stock request #482", lines: [["Polo shirt — M", "40 units"], ["Polo shirt — L", "25 units"], ["Status", "Approved"]] },
    phone: { title: "Clifton Store", sub: "3 members · online", badge: "Stock request approved", items: [["Polo shirt — M", "40"], ["Polo shirt — L", "25"], ["ETA", "Today 5 pm"]] },
  },
  "sma-tracking": {
    kind: "map",
    accent: "#fb923c",
    url: "track.sma-techno.net/orders/SH-10931",
    app: "SMA Tracking",
    mode: "track",
    panelTitle: "Order SH-10931",
    fields: [
      ["Customer", "Nur Aisyah · Shah Alam"],
      ["Courier", "J&T Express MY"],
      ["Waybill", "JT630 2218 4471"],
    ],
    cards: [
      { title: "Order received from Shopify", meta: "Mon 09:12 · webhook verified", good: true },
      { title: "Approved by operator", meta: "Mon 09:40", good: true },
      { title: "Courier booked", meta: "Mon 10:02 · pickup 2 pm", good: true },
      { title: "In transit", meta: "Tue 08:15 · Klang hub", tag: "Live" },
    ],
  },
  certex: {
    kind: "ocr",
    accent: "#6366f1",
    url: "certex.local/extract/2318",
    app: "CertEx",
    docTitle: "Birth Registration Certificate",
    docLines: ["Union Council 14 · Karachi East", "Name of child", "Father's name", "Date of birth", "Place of birth", "Registration no."],
    fields: [
      ["Name", "Muhammad Ahmed", "98%"],
      ["Father's name", "Tariq Mehmood", "96%"],
      ["Date of birth", "12 Mar 2019", "99%"],
      ["Place of birth", "Karachi", "94%"],
      ["Registration no.", "UC14-2019-08812", "91%"],
    ],
  },
  "meridian-dental": {
    kind: "dashboard",
    accent: "#ec4899",
    url: "meridian-dental.app/schedule",
    app: "Meridian Dental",
    nav: ["Schedule", "Patients", "Charting", "Treatment", "Billing", "Stock"],
    title: "Today's schedule",
    kpis: [
      { label: "Appointments", value: "24" },
      { label: "Checked in", value: "9" },
      { label: "Claims sent", value: "7", delta: "+2" },
      { label: "Revenue", value: "£4,860", delta: "+8%" },
    ],
    chartTitle: "Chair utilisation",
    chart: [40, 62, 75, 88, 70, 92, 84, 66],
    side: {
      title: "Sterilisation",
      items: [
        ["Cycles today", "6"],
        ["Kits ready", "18"],
        ["Next check", "15:30"],
      ],
    },
    tableTitle: "Appointments",
    cols: ["Time", "Patient", "Treatment", "Dentist", "Status"],
    rows: [
      ["09:00", "Emma Clarke", "Check-up", "Dr. Shah", "Done"],
      ["09:30", "Oliver Hughes", "Scale & polish", "Dr. Shah", "Done"],
      ["10:15", "Amelia Price", "Implant review", "Dr. Khan", "In chair"],
      ["11:00", "Jack Turner", "Root canal", "Dr. Khan", "Waiting"],
    ],
  },
  visioncart: {
    kind: "store",
    accent: "#3b82f6",
    url: "visioncart.shop",
    brand: "VisionCart",
    nav: ["Eyeglasses", "Sunglasses", "Lenses", "Try-on", "Eye test"],
    eyebrow: "Virtual try-on",
    title: "Find frames that fit your face.",
    sub: "Try any frame live in your browser — your camera never leaves your device.",
    cta: "Start try-on",
    products: [
      { name: "Aviator Classic", price: "Rs 8,900", tag: "New" },
      { name: "Round Titanium", price: "Rs 12,400" },
      { name: "Square Acetate", price: "Rs 6,750" },
      { name: "Cat-eye Bold", price: "Rs 7,300", tag: "Popular" },
    ],
  },
  "atlas-place-finder": {
    kind: "map",
    accent: "#84cc16",
    url: "localhost:3000/search",
    app: "Atlas",
    mode: "pins",
    panelTitle: "Museums in Lisbon",
    fields: [
      ["Place type", "Museum"],
      ["City", "Lisbon, Portugal"],
    ],
    cards: [
      { title: "Calouste Gulbenkian Museum", meta: "Art · 4.8 ★ · PDF ready", good: true },
      { title: "MAAT", meta: "Architecture · 4.5 ★ · PDF ready", good: true },
      { title: "National Tile Museum", meta: "Ceramics · 4.7 ★ · researching", tag: "LLM" },
      { title: "Berardo Collection", meta: "Modern art · 4.6 ★ · queued" },
    ],
  },
  "nimbus-store": {
    kind: "store",
    accent: "#d946ef",
    url: "nimbus.pk",
    brand: "Nimbus",
    nav: ["Devices", "Pods", "Flavours", "Brands", "Deals"],
    eyebrow: "New arrivals",
    title: "Clouds of flavour, delivered.",
    sub: "Faceted search across 17 categories and 16 brands with fast nationwide delivery.",
    cta: "Shop now",
    products: [
      { name: "Aero Pod Kit", price: "Rs 5,499", tag: "New" },
      { name: "Mist Pro 2", price: "Rs 9,250" },
      { name: "Berry Ice 30ml", price: "Rs 1,600" },
      { name: "Coil Pack ×5", price: "Rs 1,950", tag: "Deal" },
    ],
  },
  "sma-library": {
    kind: "dashboard",
    accent: "#eab308",
    url: "library.sma-techno.net/admin",
    app: "SMA Library",
    nav: ["Dashboard", "Catalogue", "Loans", "Reservations", "Fines", "Reports"],
    title: "Circulation",
    kpis: [
      { label: "Books", value: "8,214" },
      { label: "On loan", value: "642", delta: "+31" },
      { label: "Reservations", value: "57" },
      { label: "Overdue", value: "23", delta: "−5", down: true },
    ],
    chartTitle: "Loans per week",
    chart: [42, 55, 48, 63, 70, 58, 77, 81],
    side: {
      title: "Fines",
      items: [
        ["Outstanding", "$214"],
        ["Collected this week", "$96"],
        ["Reminders sent", "41"],
      ],
    },
    tableTitle: "Due back today",
    cols: ["Title", "Member", "Due", "Queue", "Status"],
    rows: [
      ["Clean Architecture", "S. Ahmed", "Today", "2", "Due"],
      ["Designing Data-Intensive Apps", "H. Ali", "Today", "4", "Due"],
      ["The Pragmatic Programmer", "N. Rafiq", "Yesterday", "1", "Overdue"],
      ["Refactoring", "A. Khan", "Today", "0", "Returned"],
    ],
  },
  "crime-hotspot": {
    kind: "map",
    accent: "#f43f5e",
    url: "localhost:5000",
    app: "SafeRoute",
    mode: "route",
    panelTitle: "Plan a safer route",
    fields: [
      ["From", "Saddar"],
      ["To", "Clifton Block 5"],
    ],
    cards: [
      { title: "Safest route", meta: "6.8 km · 21 min · risk 0.18", tag: "Low", good: true },
      { title: "Balanced", meta: "5.9 km · 18 min · risk 0.34", tag: "Medium" },
      { title: "Fastest", meta: "5.1 km · 15 min · risk 0.61", tag: "High" },
    ],
  },
  "thk-protocol": {
    kind: "code",
    accent: "#06b6d4",
    dark: true,
    url: "",
    project: "THK_PROTOCOL",
    files: ["server/", "  protocol.js", "  socket.js", "client/", "  Visualizer.jsx", "  Chat.jsx"],
    file: "protocol.js",
    code: [
      "export function sendData(conn, payload) {",
      "  const packet = {",
      "    type: 'DATA', seq: conn.nextSeq,",
      "    checksum: crc16(payload), payload,",
      "  };",
      "  conn.window.push(packet); // flow control",
      "  return transmit(conn, packet);",
      "}",
    ],
    terminal: ["→ SYN        seq=1000", "← SYN-ACK    seq=4000 ack=1001", "→ ACK        ack=4001", "→ DATA       seq=1001 len=128  ✓ checksum", "← ACK        ack=1129"],
  },
  "retroquest-compiler": {
    kind: "code",
    accent: "#a855f7",
    dark: true,
    url: "",
    project: "RetroQuest",
    files: ["lexer.py", "parser.py", "semantic.py", "ir_gen.py", "optimizer.py", "stories/", "  castle.rq"],
    file: "castle.rq",
    code: [
      "scene gate {",
      '  say "A rusted gate blocks the path."',
      "  if has(key) {",
      "    choice \"Unlock it\" -> courtyard",
      "  }",
      '  choice "Turn back" -> forest',
      "}",
    ],
    terminal: ["$ python rq.py stories/castle.rq --debug", "✓ 142 tokens   ✓ AST: 9 scenes", "✓ symbol table: 4 items, 2 flags", "✓ IR → castle.json (3 nodes folded)"],
  },
  "fast-carpool": {
    kind: "map",
    accent: "#0ea5e9",
    url: "fastcarpool.app/rides",
    app: "FAST Carpool",
    mode: "route",
    panelTitle: "Find a ride",
    fields: [
      ["Pickup", "Gulshan-e-Iqbal"],
      ["Drop-off", "FAST-NUCES Karachi"],
    ],
    cards: [
      { title: "Hamza · Suzuki Cultus", meta: "Leaves 7:40 · 2 seats · Rs 250", tag: "4.9 ★", good: true },
      { title: "Areeba · Honda City", meta: "Leaves 7:55 · 1 seat · Rs 300", tag: "4.8 ★" },
      { title: "Danish · Toyota Yaris", meta: "Leaves 8:05 · 3 seats · Rs 220", tag: "4.7 ★" },
    ],
    phone: { title: "Live ride", sub: "Hamza is 4 min away", badge: "Driver on the way", items: [["Pickup", "Gulshan Chowrangi"], ["ETA campus", "7:58 AM"], ["Fare", "Rs 250"]] },
  },
  "complaint-management": {
    kind: "dashboard",
    accent: "#94a3b8",
    url: "cms.campus.local/admin",
    app: "Complaints",
    nav: ["Dashboard", "Complaints", "Assign", "IT Staff", "Reports"],
    title: "Open complaints",
    kpis: [
      { label: "Open", value: "31" },
      { label: "In progress", value: "12" },
      { label: "Resolved this week", value: "47", delta: "+15" },
      { label: "Avg. resolution", value: "6.2 h" },
    ],
    chartTitle: "Complaints by building",
    chart: [14, 9, 22, 6, 11, 17],
    side: {
      title: "IT staff",
      items: [
        ["Available", "5"],
        ["On ticket", "7"],
        ["Off duty", "2"],
      ],
    },
    tableTitle: "Latest tickets",
    cols: ["Ticket", "Room", "Issue", "Assigned", "Status"],
    rows: [
      ["#1092", "CS-204", "Projector not working", "Imran", "In progress"],
      ["#1091", "EE-110", "No network", "Faisal", "Open"],
      ["#1089", "CS-Lab 3", "PC won't boot", "Imran", "Resolved"],
      ["#1088", "BBA-12", "AC remote missing", "—", "Open"],
    ],
  },
  "turing-machine": {
    kind: "code",
    accent: "#e5e5e5",
    dark: true,
    url: "",
    project: "TuringSim",
    files: ["main.cpp", "machine.h", "machine.cpp", "tape.h", "ui/", "  MainWindow.ui"],
    file: "machine.cpp",
    code: [
      "void Machine::step() {",
      "  auto key = std::make_pair(state, readAll());",
      "  const Rule& r = rules.at(key);",
      "  for (size_t i = 0; i < tapes.size(); ++i) {",
      "    tapes[i].write(r.write[i]);",
      "    tapes[i].move(r.dir[i]);",
      "  }",
      "  state = r.next;",
      "}",
    ],
    terminal: ["Tape 1  … 1 1 0 [1] 0 _ …   q2", "Tape 2  … _ 1 [0] 1 _ _ …", "Tape 3  … [_] _ _ _ _ _ …", "step 37 · state q2 → q3 · accepted ✓"],
  },
  omnifood: {
    kind: "landing",
    accent: "#f97316",
    url: "omnifood.dev",
    brand: "Omnifood",
    nav: ["How it works", "Meals", "Testimonials", "Pricing"],
    eyebrow: "AI-personalised meals",
    title: "A healthy meal delivered every day.",
    sub: "The smart subscription that plans 365 days of nutritious meals around your tastes.",
    ctas: ["Start eating well", "Learn more"],
    stats: [
      ["250k+", "meals delivered"],
      ["4.9", "app rating"],
      ["365", "days a year"],
    ],
    cards: [
      ["Never cook again", "Chef-prepared"],
      ["Local & organic", "Seasonal produce"],
      ["No waste", "Exact portions"],
    ],
  },

  /* Previews used outside the project grid */
  "svc-backend": {
    kind: "code",
    accent: "#f5a524",
    dark: true,
    url: "",
    project: "Retail25.Api",
    files: ["Application/", "  Sales/", "    CheckoutCommand.cs", "Domain/", "Infrastructure/", "Api/"],
    file: "CheckoutCommand.cs",
    code: [
      "public sealed record CheckoutCommand(Guid TillId, IReadOnlyList<LineDto> Lines)",
      "    : IRequest<Result<ReceiptDto>>;",
      "",
      "app.MapPost(\"/api/sales/checkout\", async (CheckoutCommand cmd, ISender sender) =>",
      "    (await sender.Send(cmd)).ToHttpResult())",
      "   .RequireAuthorization(\"Cashier\");",
    ],
    terminal: ["$ dotnet run --project src/Api", "info: Now listening on https://localhost:7043", "POST /api/sales/checkout → 201 Created (38 ms)"],
  },
  "svc-testing": {
    kind: "code",
    accent: "#22c55e",
    dark: true,
    url: "",
    project: "Retail25.Tests",
    files: ["Domain.Tests/", "Application.Tests/", "TerminalAgent.Tests/", "Architecture.Tests/", "Integration.Tests/"],
    file: "PricingEngineTests.cs",
    code: [
      "[Theory]",
      "[InlineData(1000, 0.17, 1170)]",
      "public void Applies_gst_after_discount(decimal net, decimal rate, decimal gross)",
      "{",
      "    var total = PricingEngine.Price(net, rate);",
      "    total.Gross.Should().Be(gross);",
      "}",
    ],
    terminal: ["$ dotnet test", "Passed!  Domain           156 tests", "Passed!  Application      598 tests", "Passed!  Integration      128 tests", "✓ 1,010 tests · 0 failed · CI deploy to IIS"],
  },
  "exp-devhub": {
    kind: "dashboard",
    accent: "#6366f1",
    url: "taskflow.app/board",
    app: "TaskFlow",
    nav: ["Overview", "My tasks", "Projects", "Calendar", "Analytics"],
    title: "Sprint 14",
    kpis: [
      { label: "Tasks", value: "128" },
      { label: "Completed", value: "86", delta: "67%" },
      { label: "Overdue", value: "4", down: true },
      { label: "Members", value: "9" },
    ],
    chartTitle: "Completed per day",
    chart: [6, 9, 7, 12, 10, 14, 11, 16],
    side: { title: "Filters", items: [["Priority", "High"], ["Assignee", "Me"], ["Status", "In progress"]] },
    tableTitle: "Tasks",
    cols: ["Task", "Project", "Due", "Owner", "Status"],
    rows: [
      ["Auth refresh tokens", "API", "Thu", "Hamad", "Done"],
      ["Search & filters", "Web", "Fri", "Hamad", "In progress"],
      ["Analytics charts", "Web", "Mon", "Sara", "Open"],
      ["Progress tracking", "API", "Tue", "Ali", "In progress"],
    ],
  },
  "exp-fast": {
    kind: "code",
    accent: "#e5e5e5",
    dark: true,
    url: "",
    project: "CS-Lab-07",
    files: ["lab07/", "  linked_list.cpp", "  main.cpp", "  tests.txt"],
    file: "linked_list.cpp",
    code: [
      "Node* reverse(Node* head) {",
      "    Node* prev = nullptr;",
      "    while (head) {",
      "        Node* next = head->next;",
      "        head->next = prev;",
      "        prev = head; head = next;",
      "    }",
      "    return prev;",
      "}",
    ],
    terminal: ["$ g++ -Wall main.cpp linked_list.cpp && ./a.out", "reverse([1,2,3,4]) = [4,3,2,1]  ✓", "12/12 test cases passed"],
  },
};
