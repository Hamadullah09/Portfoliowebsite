import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import { categoryLabel, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { Mockup } from "@/components/Mockup";
import { lockScroll } from "@/lib/motion";

type Props = { slug: string | null; onClose: () => void; onOpen: (slug: string) => void };

export const ProjectSheet = ({ slug, onClose, onOpen }: Props) => {
  const index = projects.findIndex((p) => p.slug === slug);
  const p = index >= 0 ? projects[index] : null;
  const next = projects[(index + 1) % projects.length];
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!p) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    lockScroll(true);
    scroller.current?.scrollTo({ top: 0 });
    scroller.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [p, onClose]);

  if (!p) return null;

  const meta = [
    { label: "Project", value: p.subtitle },
    { label: "Context", value: p.context },
    { label: "Category", value: categoryLabel[p.category] },
  ];

  return (
    <div
      ref={scroller}
      data-lenis-prevent
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-black/50 backdrop-blur-sm animate-in fade-in duration-300 focus:outline-none"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <article
        key={p.slug}
        className="relative mt-[3vh] min-h-[97vh] rounded-t-[var(--panel-radius)] bg-white [animation:sheet-up_0.7s_cubic-bezier(0.16,1,0.3,1)_both]"
      >
        <div className="wrap pb-20 pt-5 sm:pt-7">
          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={onClose} className="pill">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <span className="pill hidden sm:inline-flex">
              <span className="live-dot" /> Open to Opportunities
            </span>
          </div>

          <header className="mt-[clamp(36px,6vw,80px)] grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                <span className="chip !bg-mist">{p.type}</span>
                <span className="chip !bg-mist">{p.context}</span>
              </div>
              <h1 className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[clamp(40px,6vw,80px)] font-semibold leading-none tracking-tight text-ink">
                {p.title}
                <span className="text-[clamp(16px,1.6vw,22px)] font-medium tracking-normal text-ink/45">
                  /{p.live ? "Live Project" : "Case Study"}
                </span>
              </h1>
              <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-ink/65 md:text-base">{p.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="btn-dark">
                    Live Preview <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" className={p.live ? "btn-light !bg-mist" : "btn-dark"}>
                    <Github className="h-4 w-4" /> View Source
                  </a>
                )}
                <a href={`mailto:${profile.email}?subject=${encodeURIComponent(p.title)}`} className="btn-light !bg-mist">
                  Contact Me
                </a>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:gap-7 lg:text-right">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-ink/35">{m.label}</dt>
                  <dd className="mt-1.5 text-lg font-medium text-ink/70 md:text-xl">{m.value}</dd>
                </div>
              ))}
              <div className="col-span-full">
                <dt className="text-xs font-semibold uppercase tracking-widest text-ink/35">Tools</dt>
                <dd className="mt-3 flex flex-wrap gap-2 lg:justify-end">
                  {p.stack.map((s) => (
                    <span key={s} className="chip !bg-mist">{s}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </header>

          <div className="mt-[clamp(40px,6vw,80px)] rounded-2xl bg-mist p-2 ring-1 ring-black/[0.04] sm:p-3">
            <Mockup id={p.slug} variant="wide" className="aspect-[16/9] rounded-xl" />
          </div>

          <p className="mx-auto mt-10 max-w-3xl rounded-2xl bg-mist px-6 py-5 text-[clamp(16px,1.6vw,20px)] font-medium leading-relaxed text-ink/80 ring-1 ring-black/[0.05]">
            {p.summary}
          </p>

          <section className="mx-auto mt-14 max-w-3xl">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-ink/40">Highlights</h2>
            <ol className="mt-4">
              {p.highlights.map((h, i) => (
                <li key={h} className="flex gap-5 border-b border-line py-5 text-[15px] leading-relaxed text-ink/80 md:text-base">
                  <span className="pt-0.5 text-sm font-semibold tabular-nums text-ink/30">{String(i + 1).padStart(2, "0")}</span>
                  {h}
                </li>
              ))}
            </ol>
          </section>

          <a
            href={`#work/${next.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onOpen(next.slug);
            }}
            className="group mx-auto mt-16 flex max-w-3xl items-center justify-between gap-6 rounded-2xl bg-ink px-6 py-6 text-white transition-transform duration-300 hover:-translate-y-1 sm:px-8"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-widest text-white/40">Next project</span>
              <span className="mt-1 block text-[clamp(20px,2.4vw,30px)] font-medium tracking-tight">{next.title}</span>
            </span>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </a>
        </div>
      </article>
    </div>
  );
};
