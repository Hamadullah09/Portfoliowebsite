import type { CSSProperties } from "react";
import { research } from "@/data/profile";
import { SectionTitle } from "@/components/SectionTitle";

const methodNotes: Record<string, string> = {
  Protenix: "Open AlphaFold3-style all-atom diffusion",
  NuFold: "AlphaFold2-style Evoformer adapted to RNA",
  "DRfold / DRfold2": "End-to-end local frames + learned geometric potentials",
  "RhoFold+": "RNA-FM language model + MSA",
  RNAbpFlow: "SE(3) flow matching on base-pair maps",
  trRosettaRNA2: "Pretrained secondary-structure prior + structure-aware attention",
};

const BASES = "GGCAUCCGAUAGCUAGCUGA";
const pair: Record<string, string> = { G: "C", C: "G", A: "U", U: "A" };

/** Rotating double helix drawn with CSS — each rung is a base pair. */
const Helix = () => (
  <div className="relative mx-auto h-[300px] w-[150px] sm:h-[360px]" aria-hidden>
    {BASES.split("").map((b, i) => {
      const t = -i * 0.3;
      // depth runs a quarter turn (1.5s) ahead of the sideways motion
      const dot = { animationDelay: `${t}s, ${t - 1.5}s` };
      return (
        <div key={i} className="absolute inset-x-0 flex items-center justify-center" style={{ top: `${(i / BASES.length) * 100}%` }}>
          <span className="helix-rung" style={{ animationDelay: `${t}s` }} />
          <span className="helix-dot" style={dot}>
            <i>{b}</i>
          </span>
          <span className="helix-dot helix-dot--b" style={dot}>
            <i>{pair[b]}</i>
          </span>
        </div>
      );
    })}
  </div>
);

export const Research = () => (
  <>
    <div id="research" className="anchor" />
    <section className="panel bg-mist">
      <div className="panel-shade" />
      <div className="wrap pb-[clamp(64px,9vw,128px)]">
        <SectionTitle
          watermark="Research"
          title="Research"
          aside={
            <span className="inline-flex items-center gap-2 font-medium text-ink/70">
              <span className="live-dot" /> Final Year Project · In progress
            </span>
          }
        />

        <div className="mt-[clamp(36px,5vw,64px)] grid items-stretch gap-6 lg:grid-cols-12">
          <div data-reveal className="rounded-3xl bg-white p-6 ring-1 ring-black/[0.04] sm:p-9 lg:col-span-8">
            <div className="flex flex-wrap gap-2">
              <span className="chip !bg-mist">Bioinformatics</span>
              <span className="chip !bg-mist">Deep Learning</span>
              <span className="chip !bg-mist">FAST-NUCES</span>
            </div>
            <h3 className="mt-6 text-balance text-[clamp(26px,3.2vw,44px)] font-semibold leading-[1.08] tracking-tight text-ink">
              {research.title}
            </h3>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink/65 md:text-base">{research.summary}</p>
            <div className="mt-7 rounded-2xl bg-mist p-5 text-[15px] leading-relaxed text-ink/75 ring-1 ring-black/[0.04]">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-ink/40">The gap</span>
              {research.problem}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-widest text-ink/40">Team</span>
                <span className="mt-1 block font-medium text-ink/80">{research.team.join(" · ")}</span>
              </div>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-widest text-ink/40">Metrics</span>
                <span className="mt-1 block font-medium text-ink/80">{research.metrics.join(" · ")}</span>
              </div>
            </div>
          </div>

          <div
            data-reveal
            style={{ "--d": "120ms" } as CSSProperties}
            className="relative flex flex-col overflow-hidden rounded-3xl bg-night p-6 text-white sm:p-8 lg:col-span-4"
          >
            <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_100%,rgb(255_255_255/0.08),transparent_70%)]" />
            <span className="relative text-xs font-semibold uppercase tracking-widest text-white/40">Template-sparse RNA</span>
            <div className="relative my-auto py-6">
              <Helix />
            </div>
            <p className="relative text-sm leading-relaxed text-white/55">
              Benchmarked on PDB / RNA3DB structures with sequence- and structure-dissimilar splits.
            </p>
          </div>
        </div>

        {/* Workflow */}
        <div className="mt-[clamp(48px,6vw,88px)]">
          <h3 data-reveal className="text-xs font-semibold uppercase tracking-widest text-ink/40">Research workflow</h3>
          <ol className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {research.pipeline.map((step, i) => (
              <li
                key={step}
                data-reveal
                style={{ "--d": `${(i % 4) * 80}ms` } as CSSProperties}
                className="group flex min-h-[128px] flex-col justify-between bg-mist p-5 transition-colors duration-300 hover:bg-ink hover:text-white"
              >
                <span className="text-sm font-semibold tabular-nums text-ink/35 group-hover:text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-6 text-lg font-medium leading-snug tracking-tight">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-[clamp(48px,6vw,88px)] grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 data-reveal className="text-xs font-semibold uppercase tracking-widest text-ink/40">Methods under evaluation</h3>
            <ul className="mt-3">
              {research.methods.map((m, i) => (
                <li
                  key={m}
                  data-reveal
                  style={{ "--d": `${i * 60}ms` } as CSSProperties}
                  className="flex flex-col gap-1 border-b border-ink/10 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-lg font-medium text-ink">{m}</span>
                  <span className="text-sm text-ink/55 sm:text-right">{methodNotes[m]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 data-reveal className="text-xs font-semibold uppercase tracking-widest text-ink/40">My part</h3>
            <ul className="mt-3">
              {research.myRole.map((r, i) => (
                <li
                  key={r}
                  data-reveal
                  style={{ "--d": `${i * 60}ms` } as CSSProperties}
                  className="flex gap-4 border-b border-ink/10 py-4 text-[15px] leading-relaxed text-ink/80 md:text-base"
                >
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  {r}
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-6 flex flex-wrap gap-2">
              {research.stack.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
