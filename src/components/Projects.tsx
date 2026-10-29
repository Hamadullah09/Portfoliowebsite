import { ArrowUpRight } from "lucide-react";
import { useMemo, useRef, useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import { categories, categoryLabel, projects, type Category, type Project } from "@/data/projects";
import { profile } from "@/data/profile";
import { SectionTitle } from "@/components/SectionTitle";
import { Mockup } from "@/components/Mockup";
import { gsap, hasFinePointer, ScrollTrigger } from "@/lib/motion";

type Props = { onOpen: (slug: string) => void };

const ProjectCard = ({ p, index, onOpen }: { p: Project; index: number; onOpen: (slug: string) => void }) => {
  const stage = useRef<HTMLDivElement>(null);

  // The browser window tilts toward the cursor; the phone drifts the other way for depth
  const tilt = (e: PointerEvent) => {
    if (!hasFinePointer() || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(stage.current.querySelector("[data-mock-window]"), { rotateY: nx * 8, rotateX: -ny * 6, x: nx * 14, y: -10 + ny * 8, duration: 0.6 });
    gsap.to(stage.current.querySelector("[data-mock-phone]"), { x: -nx * 22, y: -ny * 16, rotate: nx * 3, duration: 0.6 });
  };
  const reset = () => {
    if (!stage.current) return;
    gsap.to(stage.current.querySelectorAll("[data-mock-window], [data-mock-phone]"), { rotateY: 0, rotateX: 0, x: 0, y: 0, rotate: 0, duration: 0.9, ease: "elastic.out(1, 0.6)" });
  };

  return (
    <article
      data-reveal
      style={{ "--d": `${(index % 2) * 110}ms` } as React.CSSProperties}
      className="group rounded-2xl bg-mist p-2 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.35)] ring-1 ring-black/[0.04] transition-shadow duration-500 hover:shadow-[0_30px_70px_-30px_rgb(0_0_0/0.45)]"
    >
      <a
        href={`#work/${p.slug}`}
        onClick={(e) => {
          e.preventDefault();
          onOpen(p.slug);
        }}
        className="block focus-visible:outline-none"
        aria-label={`${p.title} — ${p.subtitle}`}
      >
        <div ref={stage} data-cursor="view" onPointerMove={tilt} onPointerLeave={reset} className="relative overflow-hidden rounded-xl [perspective:1200px]">
          <Mockup id={p.slug} className="aspect-[16/11] transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm">
            {p.live && <span className="live-dot !h-1.5 !w-1.5" />}
            {p.live ? "Live Project" : categoryLabel[p.category]}
          </span>
          {/* Touch / keyboard affordance; on desktop the cursor itself becomes this button */}
          <span className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform duration-500 group-hover:rotate-45 [@media(hover:hover)]:hidden">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </div>
        <div className="px-2 pb-3 pt-4 sm:px-3">
          <h3 className="text-[clamp(18px,1.8vw,24px)] font-medium leading-snug tracking-tight text-ink">
            {p.title} <span className="text-ink/40">— {p.subtitle}</span>
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">{p.type}</span>
            <span className="chip">{p.context}</span>
          </div>
        </div>
      </a>
    </article>
  );
};

export const Projects = ({ onOpen }: Props) => {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [showAll, setShowAll] = useState(false);

  const list = useMemo(() => {
    if (filter !== "all") return projects.filter((p) => p.category === filter);
    return showAll ? projects : projects.filter((p) => p.featured);
  }, [filter, showAll]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    projects.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, []);

  // Panel heights change with the list, so re-measure scroll positions afterwards
  const change = (fn: () => void) => {
    fn();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <>
      <div id="work" className="anchor" />
      <section className="panel bg-white">
        <div className="panel-shade" />
        <div className="wrap pb-[clamp(64px,9vw,128px)]">
          <SectionTitle watermark="Portfolio" title="Selected Work" align="center" />

          <div className="mt-[clamp(32px,5vw,64px)] flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div role="tablist" aria-label="Filter projects" className="no-scrollbar -mx-[var(--gutter)] flex gap-1 overflow-x-auto px-[var(--gutter)] sm:mx-0 sm:px-0">
              {categories.map((c) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={filter === c.id}
                  onClick={() => change(() => setFilter(c.id))}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    filter === c.id ? "bg-ink text-white" : "text-ink/70 hover:text-ink"
                  )}
                >
                  {c.label}
                  <span className={cn("ml-1 text-xs", filter === c.id ? "text-white/50" : "text-ink/35")}>{counts[c.id]}</span>
                </button>
              ))}
            </div>
            <a href={profile.github} target="_blank" rel="noreferrer" data-magnetic className="pill self-start sm:self-auto">
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-7">
            {list.map((p, i) => (
              <ProjectCard key={p.slug} p={p} index={i} onOpen={onOpen} />
            ))}
          </div>

          {filter === "all" && (
            <div className="mt-12 flex justify-center">
              <button type="button" data-magnetic onClick={() => change(() => setShowAll((v) => !v))} className="btn-dark group">
                <span className="roll">
                  <span>{showAll ? "Show Featured Only" : `View All Work (${projects.length})`}</span>
                  <span aria-hidden>{showAll ? "Show Featured Only" : `View All Work (${projects.length})`}</span>
                </span>
                <ArrowUpRight className={cn("h-4 w-4 transition-transform", showAll && "rotate-[-45deg]")} />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
