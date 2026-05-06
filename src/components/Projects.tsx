import { Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "The Startup Project (CorePTx)",
    desc: "Designed and developed a scalable corporate web presence for a B2B healthcare startup.",
    stack: ["ASP.NET MVC", "Bootstrap", "CSS"],
    link: "https://www.coreptx.com",
    featured: true,
  },
  {
    title: "Fast-Carpool (Carpool Hub)",
    desc: "Enterprise-level carpool management system with optimized relational databases.",
    stack: ["ASP.NET MVC", "C#", "SQL Server", "Entity Framework"],
    link: "https://github.com/Hamadullah09/Fast-Carpool",
  },
  {
    title: "THK Protocol",
    desc: "Low-level network communication system utilizing raw socket programming.",
    stack: ["C/C++", "Network Programming", "Sockets", "Linux"],
    link: "https://github.com/Hamadullah09/THK_PROTOCOL",
  },
  {
    title: "Multi-Tape Turing Machine Simulator",
    desc: "Complex logic simulator built with a modern GUI to visualize automata theory.",
    stack: ["C++", "Qt GUI"],
    link: null,
  },
];

export const Projects = () => (
  <section id="projects" className="py-24 border-t border-border/40">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-14 reveal">
        <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-3">Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold">Selected work.</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <article key={p.title} className={`group reveal p-7 rounded-2xl bg-card border shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all flex flex-col ${p.featured ? "border-primary/40 lg:col-span-2" : "border-border"}`}>
            <div className="flex items-start justify-between mb-4 gap-3">
              <div>
                {p.featured && <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-primary mb-2">Featured</span>}
                <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
              </div>
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer" aria-label="Open repo" className="text-muted-foreground group-hover:text-primary transition-colors">
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              )}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {p.stack.map((s) => (
                <span key={s} className="text-[11px] px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border">{s}</span>
              ))}
            </div>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                {p.featured ? <><ArrowUpRight className="h-4 w-4" /> Visit Site</> : <><Github className="h-4 w-4" /> View Source</>}
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
);
