import { ArrowUpRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SectionTitle } from "@/components/SectionTitle";
import { FloatingPreview } from "@/components/FloatingPreview";
import { Mockup } from "@/components/Mockup";
import { services } from "@/data/profile";

/** Screens shown for each service, in order. */
const previews = ["svc-backend", "recordflow", "dental-ai-chatbot", "warehouse-rfid-gate", "svc-testing"];

const canHover = () => window.matchMedia("(hover: hover)").matches;

export const Services = () => {
  const [active, setActive] = useState<number | null>(0);
  const [hover, setHover] = useState<number | null>(null);
  const list = useRef<HTMLUListElement>(null);

  return (
    <>
      <div id="services" className="anchor" />
      <section className="panel bg-white">
        <div className="panel-shade" />
        <div className="wrap pb-[clamp(64px,9vw,128px)]">
          <SectionTitle watermark="Service" title="Service" aside={<span className="text-ink/55">What I build, end to end</span>} />

          <ul
            ref={list}
            className="relative mt-[clamp(32px,5vw,64px)]"
            onMouseLeave={() => {
              setHover(null);
              if (canHover()) setActive(null);
            }}
          >
            <FloatingPreview area={list} ids={previews} active={hover} />
            {services.map((s, i) => {
              const open = active === i;
              return (
                <li key={s.title} data-reveal="left" style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className="relative">
                  <button
                    type="button"
                    aria-expanded={open}
                    onMouseEnter={() => {
                      if (!canHover()) return;
                      setActive(i);
                      setHover(i);
                    }}
                    onClick={() => setActive(open ? null : i)}
                    className={cn(
                      "group relative w-full rounded-2xl px-4 text-left transition-colors duration-500 sm:px-6",
                      open ? "roll-on bg-night text-white" : "text-ink"
                    )}
                  >
                    <span className="flex items-center justify-between gap-4 py-6 sm:py-8">
                      <span className="roll text-[clamp(26px,5vw,64px)] font-medium uppercase leading-none tracking-tight">
                        <span>{s.title}</span>
                        <span aria-hidden>{s.title}</span>
                      </span>
                      <span className={cn("grid h-10 w-10 shrink-0 place-items-center transition-transform duration-500", open && "rotate-90")}>
                        {open ? <X className="h-7 w-7" strokeWidth={1.5} /> : <ArrowUpRight className="h-7 w-7" strokeWidth={1.5} />}
                      </span>
                    </span>
                    <span className={cn("grid transition-[grid-template-rows] duration-500 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                      <span className="overflow-hidden">
                        <span className="block max-w-[460px] pb-6 text-[15px] leading-relaxed text-white/65">{s.desc}</span>
                        <span className="flex flex-wrap gap-2 pb-6">
                          {s.stack.map((t) => (
                            <span key={t} className="chip-dark">{t}</span>
                          ))}
                        </span>
                        <span className="block pb-6 lg:[@media(hover:hover)]:hidden">
                          <span className="block overflow-hidden rounded-xl ring-1 ring-white/10">
                            {open && <Mockup id={previews[i]} className="aspect-[16/11]" />}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                  {!open && active !== i + 1 && i < services.length - 1 && <div className="mx-4 h-px bg-line sm:mx-6" />}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
