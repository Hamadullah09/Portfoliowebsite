import { ArrowUpRight, MapPin } from "lucide-react";
import { profile, stats } from "@/data/profile";
import { SectionTitle } from "@/components/SectionTitle";

export const About = () => (
  <>
    <div id="about" className="anchor" />
    <section className="panel bg-mist">
      <div className="panel-shade" />
      <div className="wrap pb-[clamp(64px,9vw,128px)]">
        <SectionTitle
          watermark="About"
          title="About"
          aside={
            <span className="inline-flex items-center gap-2 text-ink/60">
              <MapPin className="h-4 w-4" /> {profile.location}
            </span>
          }
        />

        <div className="mt-[clamp(40px,6vw,80px)] grid gap-10 lg:grid-cols-12 lg:gap-16">
          <p
            data-scrub-words
            className="text-balance text-[clamp(26px,3.6vw,48px)] font-medium leading-[1.12] tracking-tight text-ink lg:col-span-8"
          >
            I build software that runs on shop counters, warehouse gates and school entrances — and the AI and research
            systems behind it.
          </p>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="space-y-5 text-[15px] leading-relaxed text-ink/65 md:text-base lg:col-span-4 lg:pt-3">
            {profile.about.map((p) => (
              <p key={p.slice(0, 16)}>{p}</p>
            ))}
            <a href={profile.resume} download="Hamadullah_Resume.pdf" data-magnetic className="btn-dark !mt-7">
              Download Resume <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <dl className="mt-[clamp(48px,7vw,96px)] grid grid-cols-2 border-t border-ink/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              className="flex flex-col border-b border-ink/10 py-7 pr-4 odd:border-r odd:pl-0 even:pl-5 lg:border-b-0 lg:border-r lg:!pl-6 lg:first:!pl-0 lg:last:border-r-0"
            >
              <dt className="order-2 mt-2 text-sm text-ink/55">{s.label}</dt>
              <dd data-count={s.value} className="order-1 text-[clamp(36px,5vw,64px)] font-semibold leading-none tracking-tight text-ink tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  </>
);
