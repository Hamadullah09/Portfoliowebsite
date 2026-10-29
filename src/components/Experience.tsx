import { Plus } from "lucide-react";
import { useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { education, experience } from "@/data/profile";
import { SectionTitle } from "@/components/SectionTitle";
import { FloatingPreview } from "@/components/FloatingPreview";

/** Screens previewed for each role, in order. */
const previews = ["retail25", "dental-ai-chatbot", "exp-devhub", "exp-fast"];

export const Experience = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div id="experience" className="anchor" />
      <section className="on-dark panel bg-night text-white">
        <div className="panel-shade" />
        <div className="wrap pb-[clamp(64px,9vw,128px)]">
          <SectionTitle
            watermark="Experience"
            title="Experience"
            aside={<span className="text-white/70">3 internships · 1 teaching role</span>}
          />

          <div ref={listRef} className="relative mt-[clamp(32px,5vw,64px)]" onMouseLeave={() => setHover(null)}>
            {/* Hidden over the expanded row so it never covers the details being read */}
            <FloatingPreview area={listRef} ids={previews} active={hover !== null && hover !== open ? hover : null} />

            {experience.map((x, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={x.org + x.role}
                  data-reveal
                  style={{ "--d": `${i * 80}ms` } as CSSProperties}
                  className="border-b border-white/10 first:border-t-0"
                  onMouseEnter={() => setHover(i)}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 py-6 text-left sm:px-3 md:py-7"
                  >
                    <span className="min-w-0 flex-1 transition-transform duration-500 ease-out group-hover:translate-x-3">
                      <span className="block text-lg font-medium text-white md:text-xl">{x.org}</span>
                      <span className="mt-1 block text-[15px] text-white/50 md:text-base">{x.role}</span>
                    </span>
                    <span className="hidden text-right text-[15px] text-white/60 sm:block md:text-base">
                      {x.period}
                      <span className="block text-xs text-white/35">{x.place}</span>
                    </span>
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ring-white/15 transition-all duration-300 group-hover:bg-white group-hover:text-ink",
                        isOpen && "rotate-45 bg-white text-ink"
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div className={cn("grid transition-[grid-template-rows] duration-500 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden">
                      <div className="pb-7 sm:px-3">
                        <span className="mb-4 block text-sm text-white/50 sm:hidden">
                          {x.period} · {x.place}
                        </span>
                        <ul className="max-w-3xl space-y-3">
                          {x.points.map((pt) => (
                            <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-white/70">
                              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-white/60" />
                              {pt}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {x.stack.map((s) => (
                            <span key={s} className="chip-dark">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <h3 data-reveal className="mt-[clamp(48px,6vw,80px)] text-xs font-semibold uppercase tracking-widest text-white/40">
            Education
          </h3>
          <div className="mt-2">
            {education.map((e, i) => (
              <div
                key={e.degree}
                data-reveal
                style={{ "--d": `${i * 80}ms` } as CSSProperties}
                className="flex flex-col gap-1 border-b border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-3"
              >
                <span>
                  <span className="block text-lg font-medium md:text-xl">{e.degree}</span>
                  <span className="mt-1 block text-[15px] text-white/50">{e.school}</span>
                </span>
                <span className="shrink-0 text-[15px] text-white/60">{e.period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
