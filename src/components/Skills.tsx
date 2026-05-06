import { Code2, Cloud, Cpu } from "lucide-react";

const groups = [
  {
    icon: Code2,
    title: "Web Development",
    items: ["ASP.NET MVC", "C#", "RESTful APIs", "HTML5", "CSS3", "JavaScript"],
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    items: ["Docker", "Linux (Ubuntu)", "CI/CD Pipelines", "Git", "GitHub"],
  },
  {
    icon: Cpu,
    title: "Systems & Core",
    items: ["C", "C++", "SQL Server", "Bash", "Database Design"],
  },
];

export const Skills = () => (
  <section id="skills" className="py-24 border-t border-border/40">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-14 reveal">
        <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-3">Skills</p>
        <h2 className="text-3xl md:text-4xl font-bold">A toolkit forged across the stack.</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {groups.map((g, i) => (
          <div key={g.title} className="reveal p-7 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <g.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold mb-4">{g.title}</h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((it) => (
                <span key={it} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border">
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
