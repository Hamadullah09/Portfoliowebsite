import {
  Banknote, Bell, BookOpen, Bot, Boxes, CalendarDays, Check, CheckCircle2, ChevronRight, CreditCard, FileText,
  Footprints, Glasses, LayoutDashboard, Layers, Lock, MapPin, MessageSquare, Navigation, Package, Paperclip, Plus,
  Radio, ScanLine, Search, Send, Settings, Shirt, ShoppingBag, ShoppingCart, Sparkles, Star, Terminal, Truck,
  Upload, Users, Watch, Wifi, type LucideIcon,
} from "lucide-react";
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { mockups, type MockupData, type Phone } from "@/data/mockups";

/* ---------- Scale-to-fit canvas: designs are drawn at a fixed size and scaled to the box ---------- */

const Fit = ({ w, h, children, className }: { w: number; h: number; children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => el.style.setProperty("--s", String(el.clientWidth / w));
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={ref} className={cn("relative w-full overflow-hidden", className)} style={{ aspectRatio: `${w} / ${h}` }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: w, height: h, transform: "scale(var(--s, 0))" }}>
        {children}
      </div>
    </div>
  );
};

/* ---------- Public component ---------- */

type Props = { id: string; className?: string; variant?: "card" | "wide" };

export const Mockup = ({ id, className, variant = "card" }: Props) => {
  const m = mockups[id];
  if (!m) return null;
  const phone = "phone" in m ? m.phone : undefined;
  return (
    <div
      className={cn("mockup-stage relative overflow-hidden bg-[#0e0e10]", className)}
      style={
        {
          "--a": m.accent,
          backgroundImage: `radial-gradient(75% 65% at 50% 112%, ${m.accent}99, transparent 70%), radial-gradient(45% 45% at 92% -5%, ${m.accent}40, transparent 70%), radial-gradient(40% 40% at 0% 30%, ${m.accent}22, transparent 70%)`,
        } as CSSProperties
      }
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 70%)",
        }}
      />
      <div
        data-mock-window
        className={cn(
          "absolute left-[7%] top-[10%] overflow-hidden rounded-[10px] shadow-[0_40px_80px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/10 will-change-transform",
          phone ? "w-[76%]" : "w-[86%]",
          variant === "wide" && "top-[8%]"
        )}
      >
        <Fit w={1200} h={904}>
          <BrowserBar url={m.url} dark={m.dark} title={"project" in m ? m.project : undefined} />
          <div className="h-[860px]">
            <Screen m={m} />
          </div>
        </Fit>
      </div>
      {phone && (
        <div data-mock-phone className="absolute bottom-[-14%] right-[5%] w-[24%] will-change-transform">
          <PhoneFrame>
            <PhoneScreen p={phone} accent={m.accent} />
          </PhoneFrame>
        </div>
      )}
    </div>
  );
};

/* ---------- Frames ---------- */

const BrowserBar = ({ url, dark, title }: { url: string; dark?: boolean; title?: string }) => (
  <div className={cn("flex h-[44px] items-center gap-2 px-4", dark ? "bg-[#1b1d22]" : "bg-[#ececec]")}>
    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
      <span key={c} className="h-3 w-3 rounded-full" style={{ background: c }} />
    ))}
    <span
      className={cn(
        "mx-auto flex max-w-[520px] items-center gap-2 truncate rounded-[8px] px-5 py-1.5 text-[13px] font-medium",
        dark ? "bg-[#2a2d33] text-white/55" : "bg-white text-black/55"
      )}
    >
      {url ? <Lock className="h-3.5 w-3.5 shrink-0" /> : <Terminal className="h-3.5 w-3.5 shrink-0" />}
      <span className="truncate">{url || title}</span>
    </span>
    <span className="w-[54px]" />
  </div>
);

const PhoneFrame = ({ children }: { children: ReactNode }) => (
  <div className="rounded-[14%/7%] bg-[#0a0a0a] p-[4%] shadow-[0_30px_60px_-15px_rgb(0_0_0/0.8)] ring-1 ring-white/15">
    <div className="relative overflow-hidden rounded-[11%/5.4%] bg-white">
      <span className="absolute left-1/2 top-[1.6%] z-10 h-[3.2%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
      <Fit w={390} h={820}>{children}</Fit>
    </div>
  </div>
);

/* ---------- Shared bits ---------- */

const icons: LucideIcon[] = [LayoutDashboard, Users, CalendarDays, FileText, BookOpen, Settings, Boxes, Truck];

const good = /^(valid|verified|paid|done|on time|picked|returned|resolved|waybill|approved)$/i;
const warn = /^(late|form sent|picking|in progress|due|waiting|in chair)$/i;

const Status = ({ s }: { s: string }) => {
  const tone = good.test(s) ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : warn.test(s) ? "bg-amber-50 text-amber-700 ring-amber-200" : "bg-rose-50 text-rose-600 ring-rose-200";
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[12px] font-semibold ring-1", tone)}>{s}</span>;
};

const Bars = ({ data, accent, h = 150 }: { data: number[]; accent: string; h?: number }) => {
  const max = Math.max(...data);
  const peak = data.indexOf(max);
  return (
    <div className="flex items-end gap-[10px]" style={{ height: h }}>
      {data.map((v, i) => (
        <span key={i} className="flex-1 rounded-t-[6px]" style={{ height: `${(v / max) * 100}%`, background: i === peak ? accent : `${accent}38` }} />
      ))}
    </div>
  );
};

const Area = ({ data, accent, w = 560, h = 160 }: { data: number[]; accent: string; w?: number; h?: number }) => {
  const max = Math.max(...data) * 1.1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - (v / max) * h]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const id = `g${accent.replace("#", "")}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: h }} preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity="0.35" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="#000" strokeOpacity="0.06" />
      ))}
      <path d={`${line} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={accent} strokeWidth="3" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0] - 4} cy={pts[pts.length - 1][1]} r="6" fill="#fff" stroke={accent} strokeWidth="3" />
    </svg>
  );
};

const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("rounded-[16px] bg-white p-5 ring-1 ring-black/[0.06]", className)}>{children}</div>
);

const Sidebar = ({ app, nav, accent }: { app: string; nav: string[]; accent: string }) => (
  <aside className="flex w-[230px] shrink-0 flex-col border-r border-black/[0.06] bg-white px-4 py-6">
    <div className="flex items-center gap-2.5 px-2">
      <span className="grid h-9 w-9 place-items-center rounded-[10px] text-[15px] font-extrabold text-white" style={{ background: accent }}>
        {app[0]}
      </span>
      <span className="text-[17px] font-bold">{app}</span>
    </div>
    <nav className="mt-8 space-y-1">
      {nav.map((n, i) => {
        const I = icons[i % icons.length];
        return (
          <span
            key={n}
            className={cn("flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] font-semibold", i === 0 ? "text-white" : "text-black/55")}
            style={i === 0 ? { background: "#111" } : undefined}
          >
            <I className="h-[18px] w-[18px]" /> {n}
          </span>
        );
      })}
    </nav>
    <div className="mt-auto rounded-[12px] p-3 text-[12px] font-semibold" style={{ background: `${accent}18`, color: "#111" }}>
      <span className="mb-1 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-emerald-500" /> All systems normal
      </span>
      <span className="text-black/45">Synced 12s ago</span>
    </div>
  </aside>
);

const Topbar = ({ title, accent }: { title: string; accent: string }) => (
  <div className="flex items-center gap-4">
    <h3 className="text-[26px] font-bold tracking-tight">{title}</h3>
    <span className="ml-auto flex w-[260px] items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] text-black/40 ring-1 ring-black/[0.06]">
      <Search className="h-4 w-4" /> Search…
    </span>
    <span className="relative grid h-10 w-10 place-items-center rounded-full bg-white ring-1 ring-black/[0.06]">
      <Bell className="h-[18px] w-[18px]" />
      <span className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: accent }} />
    </span>
    <span className="h-10 w-10 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-500" />
  </div>
);

/* ---------- Screens ---------- */

const Screen = ({ m }: { m: MockupData }) => {
  switch (m.kind) {
    case "pos":
      return <Pos m={m} />;
    case "gate":
      return <Gate m={m} />;
    case "dashboard":
      return <Dashboard m={m} />;
    case "chat":
      return <Chat m={m} />;
    case "messenger":
      return <Messenger m={m} />;
    case "store":
      return <Store m={m} />;
    case "landing":
      return <Landing m={m} />;
    case "code":
      return <Code m={m} />;
    case "map":
      return <MapScreen m={m} />;
    case "ocr":
      return <Ocr m={m} />;
  }
};

type K<T extends MockupData["kind"]> = Extract<MockupData, { kind: T }>;

const productIcons = [Shirt, Shirt, Footprints, Watch, ShoppingBag, Package];

function Pos({ m }: { m: K<"pos"> }) {
  return (
    <div className="flex h-full bg-[#f4f4f2] text-[#111]">
      <div className="flex flex-1 flex-col gap-5 p-7">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-[12px] text-white" style={{ background: m.accent }}>
            <ShoppingCart className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[19px] font-bold">{m.store}</p>
            <p className="text-[13px] text-black/50">{m.till}</p>
          </div>
          <span className="ml-auto flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold ring-1 ring-black/[0.06]">
            <Radio className="h-4 w-4 text-emerald-600" /> RFID reader online
          </span>
        </div>
        <div className="flex h-14 items-center gap-3 rounded-[14px] bg-white px-5 text-[15px] text-black/40 ring-1 ring-black/[0.06]">
          <ScanLine className="h-5 w-5 text-black/70" /> Scan barcode or RFID tag…
          <span className="ml-auto rounded-md bg-black/[0.05] px-2 py-1 text-[12px] font-semibold text-black/50">F2</span>
        </div>
        <div className="flex gap-2">
          {m.categories.map((c, i) => (
            <span key={c} className={cn("rounded-full px-4 py-2 text-[13px] font-semibold", i === 0 ? "bg-[#111] text-white" : "bg-white text-black/60 ring-1 ring-black/[0.06]")}>
              {c}
            </span>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-3 gap-4">
          {m.products.map((p, i) => {
            const I = productIcons[i % productIcons.length];
            return (
              <div key={p.name} className="flex flex-col rounded-[18px] bg-white p-3 ring-1 ring-black/[0.05]">
                <div className="grid flex-1 place-items-center rounded-[13px]" style={{ background: `linear-gradient(150deg, ${m.accent}${i % 2 ? "26" : "40"}, #f1f1ef)` }}>
                  <I className="h-14 w-14 text-black/70" strokeWidth={1.4} />
                </div>
                <div className="flex items-end justify-between px-1 pb-1 pt-3">
                  <span className="text-[15px] font-semibold">{p.name}</span>
                  <span className="text-[13px] font-semibold text-black/50">{p.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-[430px] flex-col border-l border-black/[0.06] bg-white p-7">
        <div className="flex items-center justify-between">
          <p className="text-[20px] font-bold">Current order</p>
          <span className="rounded-full bg-black/[0.05] px-3 py-1 text-[12px] font-bold">#10482</span>
        </div>
        <p className="mt-1 text-[13px] text-black/45">Walk-in · Gold member</p>
        <div className="mt-5 divide-y divide-black/[0.06]">
          {m.cart.map((c) => (
            <div key={c.name} className="flex items-center gap-3 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold">{c.name}</p>
                <p className="truncate text-[12px] text-black/45">{c.meta}</p>
              </div>
              <span className="rounded-md bg-black/[0.05] px-2 py-0.5 text-[12px] font-bold">×{c.qty}</span>
              <span className="w-16 text-right text-[15px] font-semibold">{c.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto space-y-2 border-t border-dashed border-black/15 pt-4 text-[14px]">
          {m.totals.map(([k, v]) => (
            <div key={k} className="flex justify-between text-black/55">
              <span>{k}</span>
              <span className="font-semibold text-black/80">{v}</span>
            </div>
          ))}
          <div className="flex items-baseline justify-between pt-2">
            <span className="text-[15px] font-semibold">Total</span>
            <span className="text-[34px] font-extrabold tracking-tight">{m.total}</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-[13px] font-semibold">
          {[["Cash", Banknote], ["Card", CreditCard], ["Split", Layers]].map(([l, I], i) => {
            const Icon = I as LucideIcon;
            return (
              <span key={l as string} className={cn("flex flex-col items-center gap-1 rounded-[12px] py-3 ring-1", i === 1 ? "bg-black/[0.03] ring-black/40" : "ring-black/[0.08]")}>
                <Icon className="h-5 w-5" /> {l as string}
              </span>
            );
          })}
        </div>
        <span className="mt-3 rounded-[14px] py-4 text-center text-[16px] font-bold text-black" style={{ background: m.accent }}>
          Charge {m.total}
        </span>
      </div>
    </div>
  );
}

function Gate({ m }: { m: K<"gate"> }) {
  const pct = Math.round((m.done / m.expected) * 100);
  return (
    <div className="flex h-full flex-col gap-6 bg-[#0b0e13] p-8 text-white">
      <div className="flex items-center gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-[12px] text-black" style={{ background: m.accent }}>
          <Radio className="h-5 w-5" />
        </span>
        <p className="text-[24px] font-bold uppercase tracking-wide">{m.gate}</p>
        <span className="ml-4 flex items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-1.5 text-[13px] font-semibold text-white/70 ring-1 ring-white/10">
          <Wifi className="h-4 w-4 text-emerald-400" /> Chainway U300 · 4 antennas
        </span>
        <span className="ml-auto font-mono text-[18px] text-white/50">14:02:51</span>
      </div>
      <div className="grid flex-1 grid-cols-[440px_1fr] gap-6">
        <div className="flex flex-col rounded-[20px] bg-white/[0.04] p-7 ring-1 ring-white/10">
          <div className="flex items-center gap-5">
            <span className="grid h-24 w-24 place-items-center rounded-full ring-[6px]" style={{ background: `${m.accent}22`, boxShadow: `0 0 60px ${m.accent}55`, color: m.accent }}>
              <Check className="h-12 w-12" strokeWidth={3} />
            </span>
            <div>
              <p className="text-[44px] font-extrabold leading-none tracking-tight" style={{ color: m.accent }}>VALID</p>
              <p className="mt-2 text-[15px] text-white/55">Movement accepted</p>
            </div>
          </div>
          <dl className="mt-8 space-y-4 text-[15px]">
            {[["Document", m.doc], ["Partner", m.partner], ["Direction", "Inbound → Zone B"]].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-white/[0.07] pb-3">
                <dt className="text-white/45">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-auto">
            <div className="flex justify-between text-[14px]">
              <span className="text-white/50">Cartons</span>
              <span className="font-bold">
                {m.done} / {m.expected}
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: m.accent }} />
            </div>
            <div className="mt-6 flex items-end gap-3">
              {[82, 64, 90, 48].map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <span className="w-full rounded-t-[6px] bg-white/15" style={{ height: v * 0.7 }}>
                    <span className="block h-full rounded-t-[6px]" style={{ background: `linear-gradient(${m.accent}, ${m.accent}44)` }} />
                  </span>
                  <span className="text-[12px] text-white/40">ANT {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-[20px] bg-white/[0.04] p-7 ring-1 ring-white/10">
          <div className="flex items-center justify-between">
            <p className="text-[18px] font-bold">Live tag reads</p>
            <span className="flex items-center gap-2 text-[13px] text-white/50">
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: m.accent }} /> streaming via SignalR
            </span>
          </div>
          <table className="mt-5 w-full text-left text-[14px]">
            <thead className="text-[12px] uppercase tracking-wider text-white/35">
              <tr>
                {["EPC", "Carton", "Time", "Status"].map((h) => (
                  <th key={h} className="pb-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.reads.map(([epc, sku, t, s]) => (
                <tr key={epc} className="border-t border-white/[0.07]">
                  <td className="py-3.5 font-mono text-[13px] text-white/80">{epc}</td>
                  <td className="py-3.5 font-semibold">{sku}</td>
                  <td className="py-3.5 font-mono text-white/50">{t}</td>
                  <td className="py-3.5">
                    <span className={cn("rounded-full px-2.5 py-1 text-[12px] font-bold", s === "Valid" ? "bg-emerald-400/15 text-emerald-300" : "bg-rose-400/15 text-rose-300")}>{s}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ m }: { m: K<"dashboard"> }) {
  return (
    <div className="flex h-full bg-[#f6f6f7] text-[#111]">
      <Sidebar app={m.app} nav={m.nav} accent={m.accent} />
      <div className="flex flex-1 flex-col gap-5 p-7">
        <Topbar title={m.title} accent={m.accent} />
        <div className="grid grid-cols-4 gap-4">
          {m.kpis.map((k, i) => (
            <Card key={k.label} className={i === 0 ? "!bg-[#111] text-white" : ""}>
              <p className={cn("text-[13px] font-semibold", i === 0 ? "text-white/55" : "text-black/45")}>{k.label}</p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-[30px] font-extrabold tracking-tight">{k.value}</span>
                {k.delta && (
                  <span className={cn("rounded-full px-2 py-0.5 text-[12px] font-bold", k.down ? "bg-rose-100 text-rose-600" : "")} style={k.down ? undefined : { background: `${m.accent}26`, color: i === 0 ? "#fff" : "#111" }}>
                    {k.delta}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[16px] font-bold">{m.chartTitle}</p>
              <span className="rounded-full bg-black/[0.05] px-3 py-1 text-[12px] font-semibold text-black/55">This week</span>
            </div>
            {m.chart.length > 9 ? <Area data={m.chart} accent={m.accent} /> : <Bars data={m.chart} accent={m.accent} h={160} />}
          </Card>
          <Card>
            <p className="text-[16px] font-bold">{m.side.title}</p>
            <div className="mt-4 space-y-3">
              {m.side.items.map(([k, v], i) => (
                <div key={k} className="flex items-center gap-3 rounded-[12px] bg-black/[0.03] px-3.5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: i === 0 ? m.accent : `${m.accent}66` }} />
                  <span className="text-[14px] text-black/60">{k}</span>
                  <span className="ml-auto text-[15px] font-bold">{v}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-bold">{m.tableTitle}</p>
            <span className="flex items-center gap-1 text-[13px] font-semibold text-black/45">
              View all <ChevronRight className="h-4 w-4" />
            </span>
          </div>
          <table className="mt-3 w-full text-left text-[14px]">
            <thead className="text-[12px] uppercase tracking-wider text-black/35">
              <tr>
                {m.cols.map((c) => (
                  <th key={c} className="py-2 font-semibold">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.rows.map((r) => (
                <tr key={r[0]} className="border-t border-black/[0.05]">
                  {r.map((c, i) => (
                    <td key={i} className={cn("py-3", i === 0 && "font-semibold")}>
                      {i === m.cols.length - 1 && /^[A-Za-z]/.test(c) ? <Status s={c} /> : c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

function Chat({ m }: { m: K<"chat"> }) {
  const withCites = (t: string) =>
    t.split(/(\[\d\])/).map((part, i) =>
      /^\[\d\]$/.test(part) ? (
        <span key={i} className="mx-0.5 inline-grid h-[22px] min-w-[22px] place-items-center rounded-md px-1 align-middle text-[12px] font-bold text-white" style={{ background: m.accent }}>
          {part.slice(1, -1)}
        </span>
      ) : (
        part
      )
    );
  return (
    <div className="flex h-full bg-white text-[#111]">
      <aside className="flex w-[270px] shrink-0 flex-col bg-[#f5f6f8] p-5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-[10px] text-white" style={{ background: m.accent }}>
            <Sparkles className="h-[18px] w-[18px]" />
          </span>
          <span className="text-[17px] font-bold">{m.app}</span>
        </div>
        <span className="mt-6 flex items-center gap-2 rounded-[12px] bg-[#111] px-4 py-3 text-[14px] font-semibold text-white">
          <Plus className="h-4 w-4" /> New question
        </span>
        <p className="mb-2 mt-7 px-1 text-[12px] font-bold uppercase tracking-wider text-black/35">Recent</p>
        {m.threads.map((t, i) => (
          <span key={t} className={cn("flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[14px]", i === 0 ? "bg-white font-semibold shadow-sm" : "text-black/55")}>
            <MessageSquare className="h-4 w-4 shrink-0" /> <span className="truncate">{t}</span>
          </span>
        ))}
        <div className="mt-auto rounded-[12px] bg-white p-3 text-[12px] text-black/50 shadow-sm">
          <span className="font-bold text-black/80">2,741 sources</span> indexed in Qdrant
        </div>
      </aside>
      <div className="flex flex-1 flex-col px-10 py-7">
        <div className="flex items-center gap-3 border-b border-black/[0.06] pb-4">
          <p className="text-[18px] font-bold">{m.threads[0]}</p>
          <span className="rounded-full bg-black/[0.05] px-3 py-1 text-[12px] font-semibold text-black/55">Qwen3 · RAG</span>
        </div>
        <div className="mt-7 flex justify-end">
          <p className="max-w-[560px] rounded-[20px] rounded-br-[6px] bg-[#111] px-5 py-3.5 text-[16px] leading-relaxed text-white">{m.question}</p>
        </div>
        <div className="mt-7 flex gap-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white" style={{ background: m.accent }}>
            <Bot className="h-5 w-5" />
          </span>
          <div className="max-w-[720px] space-y-3 text-[16px] leading-[1.7] text-black/80">
            {m.answer.map((a) => (
              <p key={a.slice(0, 12)}>{withCites(a)}</p>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-3">
              {m.sources.map(([t, meta], i) => (
                <div key={t} className="flex items-center gap-3 rounded-[14px] bg-[#f5f6f8] p-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-white text-[13px] font-bold" style={{ color: m.accent }}>
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-semibold">{t}</span>
                    <span className="text-[12px] text-black/45">{meta}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center gap-3 rounded-[18px] bg-[#f5f6f8] px-5 py-4 text-[15px] text-black/40">
          <Paperclip className="h-5 w-5" /> Ask about a treatment, guideline or case…
          <span className="ml-auto grid h-10 w-10 place-items-center rounded-full text-white" style={{ background: m.accent }}>
            <Send className="h-[18px] w-[18px]" />
          </span>
        </div>
      </div>
    </div>
  );
}

function Messenger({ m }: { m: K<"messenger"> }) {
  return (
    <div className="flex h-full bg-white text-[#111]">
      <aside className="w-[340px] shrink-0 border-r border-black/[0.06] p-5">
        <div className="flex items-center justify-between">
          <span className="text-[20px] font-bold">{m.app}</span>
          <span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: m.accent }}>
            <Plus className="h-4 w-4" />
          </span>
        </div>
        <span className="mt-5 flex items-center gap-2 rounded-full bg-[#f3f4f6] px-4 py-2.5 text-[13px] text-black/40">
          <Search className="h-4 w-4" /> Search stores and people
        </span>
        <div className="mt-4 space-y-1">
          {m.chats.map((c, i) => (
            <div key={c.name} className={cn("flex items-center gap-3 rounded-[14px] p-3", i === 0 && "bg-[#f3f4f6]")}>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-[15px] font-bold text-white" style={{ background: i === 0 ? m.accent : ["#111", "#6b7280", "#a3a3a3"][i % 3] }}>
                {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between">
                  <span className="text-[15px] font-semibold">{c.name}</span>
                  <span className="text-[12px] text-black/40">{c.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[13px] text-black/50">{c.last}</span>
                  {c.unread && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold text-white" style={{ background: m.accent }}>
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <div className="flex flex-1 flex-col bg-[#f7f7f8]">
        <div className="flex items-center gap-3 border-b border-black/[0.06] bg-white px-7 py-4">
          <span className="grid h-11 w-11 place-items-center rounded-full font-bold text-white" style={{ background: m.accent }}>CS</span>
          <div>
            <p className="text-[16px] font-bold">{m.chats[0].name}</p>
            <p className="text-[12px] text-emerald-600">3 members · online</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 px-7 py-6">
          {m.thread.map((t) => (
            <div key={t.text} className={cn("flex", t.me && "justify-end")}>
              <p className={cn("max-w-[420px] rounded-[18px] px-4 py-3 text-[15px] leading-relaxed", t.me ? "rounded-br-[6px] text-white" : "rounded-bl-[6px] bg-white ring-1 ring-black/[0.05]")} style={t.me ? { background: "#111" } : undefined}>
                {t.text}
                <span className={cn("ml-3 text-[11px]", t.me ? "text-white/50" : "text-black/35")}>{t.time} {t.me && "✓✓"}</span>
              </p>
            </div>
          ))}
          <div className="w-[360px] rounded-[18px] bg-white p-4 ring-1 ring-black/[0.06]">
            <p className="flex items-center gap-2 text-[15px] font-bold">
              <Package className="h-4 w-4" style={{ color: m.accent }} /> {m.card.title}
            </p>
            {m.card.lines.map(([k, v]) => (
              <p key={k} className="mt-2 flex justify-between text-[14px]">
                <span className="text-black/50">{k}</span>
                <span className="font-semibold">{v}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="m-5 flex items-center gap-3 rounded-[16px] bg-white px-5 py-3.5 text-[14px] text-black/40 ring-1 ring-black/[0.06]">
          <Paperclip className="h-5 w-5" /> Message Clifton Store…
          <span className="ml-auto grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: m.accent }}>
            <Send className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

function Store({ m }: { m: K<"store"> }) {
  const Hero = m.brand === "VisionCart" ? Glasses : Sparkles;
  return (
    <div className="flex h-full flex-col bg-white text-[#111]">
      <div className="flex items-center gap-8 border-b border-black/[0.06] px-10 py-5">
        <span className="text-[22px] font-extrabold tracking-tight">{m.brand}</span>
        {m.nav.map((n) => (
          <span key={n} className="text-[14px] font-semibold text-black/55">{n}</span>
        ))}
        <span className="ml-auto flex items-center gap-4">
          <Search className="h-5 w-5" />
          <span className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full text-[10px] font-bold text-white" style={{ background: m.accent }}>2</span>
          </span>
        </span>
      </div>
      <div className="mx-10 mt-7 grid h-[330px] grid-cols-2 overflow-hidden rounded-[24px]" style={{ background: `linear-gradient(120deg, ${m.accent}22, ${m.accent}0d)` }}>
        <div className="flex flex-col justify-center px-12">
          <span className="w-fit rounded-full bg-white px-3 py-1 text-[12px] font-bold uppercase tracking-wider" style={{ color: m.accent }}>{m.eyebrow}</span>
          <p className="mt-4 text-[44px] font-extrabold leading-[1.05] tracking-tight">{m.title}</p>
          <p className="mt-4 max-w-[420px] text-[15px] leading-relaxed text-black/55">{m.sub}</p>
          <span className="mt-6 w-fit rounded-full bg-[#111] px-6 py-3 text-[14px] font-bold text-white">{m.cta} →</span>
        </div>
        <div className="relative grid place-items-center">
          <span className="absolute h-[260px] w-[260px] rounded-full" style={{ background: `${m.accent}55`, filter: "blur(40px)" }} />
          <span className="relative grid h-[230px] w-[230px] place-items-center rounded-full bg-white shadow-2xl">
            <Hero className="h-28 w-28" strokeWidth={1.2} style={{ color: m.accent }} />
          </span>
        </div>
      </div>
      <div className="mx-10 mt-7 grid grid-cols-4 gap-5">
        {m.products.map((p, i) => (
          <div key={p.name}>
            <div className="relative grid h-[190px] place-items-center rounded-[18px] bg-[#f4f4f5]">
              {p.tag && <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white" style={{ background: m.accent }}>{p.tag}</span>}
              <Hero className="h-16 w-16 text-black/70" strokeWidth={1.3} style={{ transform: `rotate(${(i - 1.5) * 8}deg)` }} />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[15px] font-semibold">{p.name}</span>
              <span className="flex items-center gap-1 text-[12px] font-semibold text-black/45">
                <Star className="h-3.5 w-3.5 fill-current" style={{ color: m.accent }} /> 4.{8 - (i % 3)}
              </span>
            </div>
            <p className="text-[14px] font-bold text-black/60">{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Landing({ m }: { m: K<"landing"> }) {
  return (
    <div className="flex h-full flex-col bg-[#fbfbfa] text-[#111]">
      <div className="flex items-center gap-8 px-12 py-6">
        <span className="flex items-center gap-2 text-[22px] font-extrabold tracking-tight">
          <span className="h-7 w-7 rounded-[8px]" style={{ background: m.accent }} /> {m.brand}
        </span>
        <span className="ml-auto flex gap-8">
          {m.nav.map((n) => (
            <span key={n} className="text-[14px] font-semibold text-black/55">{n}</span>
          ))}
        </span>
        <span className="rounded-full bg-[#111] px-5 py-2.5 text-[14px] font-bold text-white">{m.ctas[0]}</span>
      </div>
      <div className="grid flex-1 grid-cols-[1.15fr_1fr] gap-10 px-12 pt-10">
        <div>
          <span className="rounded-full px-3.5 py-1.5 text-[13px] font-bold" style={{ background: `${m.accent}22`, color: "#111" }}>● {m.eyebrow}</span>
          <p className="mt-6 text-[64px] font-extrabold leading-[1.02] tracking-tight">{m.title}</p>
          <p className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-black/55">{m.sub}</p>
          <div className="mt-8 flex gap-3">
            <span className="rounded-full px-7 py-4 text-[15px] font-bold text-black" style={{ background: m.accent }}>{m.ctas[0]} →</span>
            <span className="rounded-full bg-white px-7 py-4 text-[15px] font-bold ring-1 ring-black/10">{m.ctas[1]}</span>
          </div>
          <div className="mt-12 flex gap-12">
            {m.stats.map(([v, l]) => (
              <div key={l}>
                <p className="text-[34px] font-extrabold tracking-tight">{v}</p>
                <p className="text-[14px] text-black/45">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-x-6 top-0 h-[460px] rounded-[28px]" style={{ background: `linear-gradient(160deg, ${m.accent}, ${m.accent}55)` }} />
          <div className="absolute left-0 top-16 w-[300px] rounded-[20px] bg-white p-5 shadow-xl">
            <p className="text-[13px] font-semibold text-black/45">This week</p>
            <p className="mt-1 text-[28px] font-extrabold">{m.stats[0][0]}</p>
            <p className="text-[13px] text-black/50">{m.stats[0][1]}</p>
            <div className="mt-4"><Bars data={[30, 45, 38, 60, 52, 74, 68]} accent={m.accent} h={80} /></div>
          </div>
          <div className="absolute bottom-24 right-0 w-[300px] space-y-3 rounded-[20px] bg-white p-5 shadow-xl">
            {m.cards.map(([t, s]) => (
              <div key={t} className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-[12px]" style={{ background: `${m.accent}22` }}>
                  <CheckCircle2 className="h-5 w-5" style={{ color: m.accent }} />
                </span>
                <span>
                  <span className="block text-[15px] font-bold">{t}</span>
                  <span className="text-[13px] text-black/45">{s}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const KW = /\b(export|function|const|let|return|public|sealed|record|async|await|var|if|for|while|void|auto|scene|say|choice|has|new|class|import|from|true|false|nullptr|size_t|decimal|Node|IRequest|Result)\b/;
const highlight = (line: string) =>
  line.split(/("[^"]*"|'[^']*'|\/\/.*$|\[[A-Za-z]+[^\]]*\]|\b\d+\b|\b[A-Za-z_]+\b)/).map((t, i) => {
    if (!t) return null;
    let c = "";
    if (/^\/\//.test(t)) c = "#6b7280";
    else if (/^["']/.test(t)) c = "#a5d6a7";
    else if (/^\[[A-Za-z]/.test(t)) c = "#fcd34d";
    else if (/^\d+$/.test(t)) c = "#f9a8d4";
    else if (KW.test(t) && t.match(KW)?.[0] === t) c = "#c4b5fd";
    else if (/^[A-Z][A-Za-z]+$/.test(t)) c = "#7dd3fc";
    return c ? <span key={i} style={{ color: c }}>{t}</span> : <span key={i}>{t}</span>;
  });

function Code({ m }: { m: K<"code"> }) {
  return (
    <div className="flex h-full bg-[#111318] font-mono text-[#e5e7eb]">
      <aside className="w-[250px] shrink-0 border-r border-white/[0.06] bg-[#0d0f13] px-4 py-5">
        <p className="mb-4 flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-wider text-white/40">
          <Upload className="h-3.5 w-3.5 rotate-180" /> {m.project}
        </p>
        {m.files.map((f) => {
          const active = f.trim() === m.file;
          return (
            <p key={f} className={cn("rounded-md px-2 py-1.5 text-[14px]", active ? "bg-white/[0.07] text-white" : "text-white/45")} style={{ paddingLeft: 8 + (f.length - f.trimStart().length) * 8 }}>
              {f.trim().endsWith("/") ? "▸ " : "· "}
              {f.trim()}
            </p>
          );
        })}
      </aside>
      <div className="flex flex-1 flex-col">
        <div className="flex border-b border-white/[0.06] bg-[#0d0f13]">
          <span className="flex items-center gap-2 border-r border-white/[0.06] bg-[#111318] px-5 py-3 text-[13px] text-white">
            <FileText className="h-4 w-4" style={{ color: m.accent }} /> {m.file}
          </span>
          <span className="px-5 py-3 text-[13px] text-white/35">README.md</span>
        </div>
        <div className="flex-1 px-6 py-6 text-[17px] leading-[1.75]">
          {m.code.map((l, i) => (
            <div key={i} className="flex">
              <span className="w-10 shrink-0 select-none text-right text-white/20">{i + 1}</span>
              <span className="whitespace-pre pl-6">{highlight(l)}</span>
            </div>
          ))}
        </div>
        <div className="h-[260px] border-t border-white/[0.08] bg-[#0b0c10] px-6 py-4">
          <p className="mb-3 flex items-center gap-4 font-sans text-[12px] font-bold uppercase tracking-wider text-white/40">
            <span className="border-b-2 pb-1 text-white" style={{ borderColor: m.accent }}>Terminal</span> Problems Output
          </p>
          {m.terminal.map((t) => (
            <p key={t} className="whitespace-pre text-[15px] leading-[1.9]" style={{ color: /✓|Passed|201|accepted/.test(t) ? m.accent === "#e5e5e5" ? "#86efac" : m.accent : t.startsWith("$") ? "#fff" : "rgb(255 255 255 / 0.6)" }}>
              {t}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function MapScreen({ m }: { m: K<"map"> }) {
  const route = "M120 690 C 260 640, 300 520, 420 500 S 560 360, 640 330 S 760 180, 820 140";
  return (
    <div className="flex h-full bg-white text-[#111]">
      <aside className="flex w-[390px] shrink-0 flex-col gap-4 border-r border-black/[0.06] p-6">
        <span className="flex items-center gap-2 text-[18px] font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-[10px] text-white" style={{ background: m.accent }}>
            {m.mode === "track" ? <Truck className="h-[18px] w-[18px]" /> : <Navigation className="h-[18px] w-[18px]" />}
          </span>
          {m.app}
        </span>
        <p className="mt-2 text-[22px] font-bold tracking-tight">{m.panelTitle}</p>
        {m.fields?.map(([k, v]) => (
          <div key={k} className="rounded-[12px] bg-[#f4f4f5] px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-black/40">{k}</p>
            <p className="text-[15px] font-semibold">{v}</p>
          </div>
        ))}
        <div className={cn("mt-1", m.mode === "track" ? "relative space-y-5 pl-6" : "space-y-3")}>
          {m.mode === "track" && <span className="absolute bottom-3 left-[7px] top-2 w-[2px] bg-black/10" />}
          {m.cards.map((c, i) =>
            m.mode === "track" ? (
              <div key={c.title} className="relative">
                <span className="absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full ring-4 ring-white" style={{ background: c.good ? m.accent : "#111" }} />
                <p className="text-[15px] font-semibold">{c.title}</p>
                <p className="text-[13px] text-black/45">{c.meta}</p>
              </div>
            ) : (
              <div key={c.title} className={cn("rounded-[14px] p-4 ring-1", i === 0 ? "ring-2" : "ring-black/[0.07]")} style={i === 0 ? { boxShadow: `inset 0 0 0 2px ${m.accent}`, background: `${m.accent}0f` } : undefined}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[15px] font-bold">{c.title}</p>
                  {c.tag && <span className="rounded-full px-2.5 py-0.5 text-[12px] font-bold" style={{ background: i === 0 ? m.accent : "#f1f1f1", color: i === 0 ? "#fff" : "#555" }}>{c.tag}</span>}
                </div>
                <p className="mt-1 text-[13px] text-black/50">{c.meta}</p>
              </div>
            )
          )}
        </div>
      </aside>
      <div className="relative flex-1 overflow-hidden bg-[#eef0ec]">
        <svg viewBox="0 0 810 860" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect width="810" height="860" fill="#eef0ec" />
          <path d="M0 260 Q 300 200 810 300" stroke="#bfdbfe" strokeWidth="60" fill="none" opacity="0.7" />
          <g stroke="#fff" strokeLinecap="round" fill="none">
            {[120, 300, 470, 640].map((y) => <path key={y} d={`M-20 ${y} L 830 ${y - 60}`} strokeWidth="14" />)}
            {[90, 260, 430, 600, 760].map((x) => <path key={x} d={`M${x} -20 L ${x + 80} 880`} strokeWidth="12" />)}
          </g>
          <g fill="#dfe3dc">
            {Array.from({ length: 16 }).map((_, i) => (
              <rect key={i} x={110 + (i % 4) * 170} y={150 + Math.floor(i / 4) * 170} width="110" height="90" rx="10" />
            ))}
          </g>
          {m.app === "SafeRoute" &&
            [[300, 420, 150], [610, 560, 120], [520, 200, 90]].map(([x, y, r]) => (
              <circle key={x} cx={x} cy={y} r={r} fill="url(#heat)" />
            ))}
          <defs>
            <radialGradient id="heat">
              <stop offset="0" stopColor="#ef4444" stopOpacity="0.55" />
              <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
          </defs>
          {m.mode !== "pins" && (
            <>
              <path d={route} stroke="#fff" strokeWidth="16" fill="none" strokeLinecap="round" />
              <path d={route} stroke={m.accent} strokeWidth="9" fill="none" strokeLinecap="round" />
              <circle cx="120" cy="690" r="14" fill="#111" stroke="#fff" strokeWidth="5" />
              <circle cx="820" cy="140" r="16" fill={m.accent} stroke="#fff" strokeWidth="5" />
            </>
          )}
          {m.mode === "pins" &&
            [[260, 300], [480, 220], [620, 460], [340, 560]].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="34" fill={m.accent} opacity="0.2" />
                <circle cx={x} cy={y} r="18" fill={i === 0 ? "#111" : m.accent} stroke="#fff" strokeWidth="4" />
                <text x={x} y={y + 6} textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">{i + 1}</text>
              </g>
            ))}
        </svg>
        {m.mode === "track" && (
          <span className="absolute left-[52%] top-[36%] flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-bold shadow-lg">
            <Truck className="h-4 w-4" style={{ color: m.accent }} /> Klang hub · 08:15
          </span>
        )}
        <span className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold shadow">
          <MapPin className="h-4 w-4" style={{ color: m.accent }} /> Live
        </span>
      </div>
    </div>
  );
}

function Ocr({ m }: { m: K<"ocr"> }) {
  return (
    <div className="flex h-full gap-6 bg-[#f4f4f6] p-7 text-[#111]">
      <div className="flex w-[560px] flex-col">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-[10px] text-white" style={{ background: m.accent }}>
            <ScanLine className="h-[18px] w-[18px]" />
          </span>
          <span className="text-[18px] font-bold">{m.app}</span>
          <span className="ml-auto rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-black/55 ring-1 ring-black/[0.06]">scan_2318.pdf · Urdu + English</span>
        </div>
        <div className="relative flex-1 rounded-[14px] bg-[#fffdf7] p-8 shadow-sm ring-1 ring-black/[0.06]">
          <p className="text-center text-[20px] font-bold tracking-wide">{m.docTitle}</p>
          <p className="mt-1 text-center text-[13px] text-black/45">{m.docLines[0]}</p>
          <div className="mt-8 space-y-6">
            {m.docLines.slice(1).map((l, i) => (
              <div key={l} className="relative flex items-center gap-4">
                <span className="w-[150px] text-[14px] text-black/55">{l}</span>
                <span className="relative flex-1 border-b border-dashed border-black/25 pb-1 font-serif text-[18px] italic text-black/75">
                  {m.fields[i]?.[1]}
                  <span className="absolute -inset-x-2 -inset-y-1.5 rounded-md border-2" style={{ borderColor: m.accent, background: `${m.accent}12` }} />
                  <span className="absolute -top-5 right-0 rounded px-1.5 text-[10px] font-bold text-white" style={{ background: m.accent }}>{m.fields[i]?.[2]}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-8 right-8 grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-black/20 text-[11px] font-bold text-black/30">SEAL</div>
        </div>
      </div>
      <div className="flex flex-1 flex-col rounded-[18px] bg-white p-6 ring-1 ring-black/[0.06]">
        <p className="text-[18px] font-bold">Extracted fields</p>
        <p className="text-[13px] text-black/45">Tesseract + OpenCV · LLM fallback not needed</p>
        <div className="mt-5 space-y-3">
          {m.fields.map(([k, v, c]) => (
            <div key={k}>
              <p className="text-[12px] font-bold uppercase tracking-wider text-black/40">{k}</p>
              <div className="mt-1 flex items-center rounded-[10px] bg-[#f4f4f6] px-4 py-2.5">
                <span className="text-[15px] font-semibold">{v}</span>
                <span className="ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold" style={{ background: `${m.accent}22`, color: "#111" }}>{c}</span>
              </div>
            </div>
          ))}
        </div>
        <span className="mt-auto flex items-center justify-center gap-2 rounded-[12px] py-3.5 text-[15px] font-bold text-white" style={{ background: "#111" }}>
          <CheckCircle2 className="h-5 w-5" style={{ color: m.accent }} /> Verify & save to register
        </span>
      </div>
    </div>
  );
}

function PhoneScreen({ p, accent }: { p: Phone; accent: string }) {
  return (
    <div className="flex h-full flex-col bg-[#f6f6f7] px-5 pb-6 pt-14 text-[#111]">
      <div className="flex items-center justify-between text-[13px] font-bold">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <Wifi className="h-4 w-4" /> 5G
        </span>
      </div>
      <p className="mt-6 text-[26px] font-extrabold tracking-tight">{p.title}</p>
      <p className="text-[14px] text-black/45">{p.sub}</p>
      {p.badge && (
        <div className="mt-6 flex items-center gap-3 rounded-[20px] p-4 text-white shadow-lg" style={{ background: "#111" }}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full" style={{ background: accent }}>
            <Check className="h-5 w-5 text-white" strokeWidth={3} />
          </span>
          <span className="text-[15px] font-bold leading-snug">{p.badge}</span>
        </div>
      )}
      <div className="mt-5 space-y-3">
        {p.items.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between rounded-[16px] bg-white px-4 py-4 shadow-sm">
            <span className="text-[14px] text-black/55">{k}</span>
            <span className="text-[15px] font-bold">{v}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-around rounded-[22px] bg-white py-3 shadow-sm">
        {[LayoutDashboard, CalendarDays, MessageSquare, Settings].map((I, i) => (
          <I key={i} className="h-6 w-6" style={{ color: i === 0 ? accent : "#a3a3a3" }} />
        ))}
      </div>
    </div>
  );
}
