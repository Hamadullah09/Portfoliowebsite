import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => (
  <section id="top" className="relative pt-36 pb-24 bg-hero">
    <div className="max-w-4xl mx-auto px-6 text-center reveal">
      <p className="text-sm md:text-base text-muted-foreground mb-6">
        Hi, I'm Hamadullah <span className="inline-block">👋</span>
      </p>
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] text-gradient">
        Full-Stack Web Developer<br className="hidden sm:block" /> & DevOps Engineer.
      </h1>
      <p className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Computer Science undergraduate at FAST-NUCES. I build scalable applications,
        optimize CI/CD pipelines, and write clean, architecture-driven code.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant">
          <a href="#projects">View Projects <ArrowRight className="h-4 w-4" /></a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="#contact">Contact Me</a>
        </Button>
      </div>
      <div className="mt-10 flex items-center justify-center gap-5 text-muted-foreground">
        <a aria-label="GitHub" href="https://github.com/Hamadullah09" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
          <Github className="h-5 w-5" />
        </a>
        <a aria-label="LinkedIn" href="https://linkedin.com/in/hamadullah-arain-100b8a294" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
          <Linkedin className="h-5 w-5" />
        </a>
        <a aria-label="Email" href="mailto:hamadullah.amjadali@gmail.com" className="hover:text-primary transition-colors">
          <Mail className="h-5 w-5" />
        </a>
      </div>
    </div>
  </section>
);
