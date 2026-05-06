const items = [
  {
    role: "Student Teaching Assistant",
    org: "FAST-NUCES, Karachi",
    period: "Spring 2025",
    desc: "Conducted labs and assisted in core computer science courses, focusing on algorithmic problem solving and low-level programming concepts.",
  },
  {
    role: "Independent Software Developer",
    org: "Self-employed",
    period: "2023 — Present",
    desc: "Architecting full-stack web solutions and implementing CI/CD workflows for efficient deployment.",
  },
];

export const Experience = () => (
  <section id="experience" className="py-24 border-t border-border/40">
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-14 reveal">
        <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-3">Experience</p>
        <h2 className="text-3xl md:text-4xl font-bold">A journey of building & teaching.</h2>
      </div>
      <div className="relative pl-8 md:pl-10">
        <div className="absolute left-2 md:left-3 top-2 bottom-2 w-px bg-border" />
        {items.map((it, i) => (
          <div key={i} className="relative mb-10 reveal">
            <div className="absolute -left-[26px] md:-left-[30px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
            <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="font-semibold text-lg">{it.role}</h3>
                <span className="text-xs text-muted-foreground">{it.period}</span>
              </div>
              <p className="text-sm text-primary mb-3">{it.org}</p>
              <p className="text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
