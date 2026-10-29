import type { CSSProperties } from "react";
import { skills } from "@/data/profile";
import { SectionTitle } from "@/components/SectionTitle";

export const Skills = () => (
  <>
    <div id="skills" className="anchor" />
    <section className="panel bg-mist">
      <div className="panel-shade" />
      <div className="wrap pb-[clamp(64px,9vw,128px)]">
        <SectionTitle watermark="Stack" title="Toolkit" aside={<span className="text-ink/55">Tools I use in production</span>} />

        <div className="mt-[clamp(32px,5vw,64px)] border-t border-ink/10">
          {skills.map((g, i) => (
            <div
              key={g.title}
              data-reveal
              style={{ "--d": `${i * 60}ms` } as CSSProperties}
              className="grid gap-4 border-b border-ink/10 py-6 md:grid-cols-12 md:gap-8 md:py-8"
            >
              <h3 className="flex items-baseline gap-3 text-lg font-medium text-ink md:col-span-4 md:text-xl">
                <span className="text-sm font-semibold tabular-nums text-ink/30">{String(i + 1).padStart(2, "0")}</span>
                {g.title}
              </h3>
              <ul className="flex flex-wrap gap-2 md:col-span-8">
                {g.items.map((s) => (
                  <li key={s} className="chip !px-3.5 !py-2 !text-[13px] transition-colors duration-300 hover:!bg-ink hover:!text-white">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);
