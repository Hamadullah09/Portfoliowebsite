import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { useReveal } from "@/hooks/useReveal";
import { useEffect } from "react";

const Index = () => {
  useReveal();
  useEffect(() => {
    document.title = "Hamadullah — Full-Stack & DevOps Engineer";
    const desc = "Portfolio of Hamadullah — Full-Stack Web Developer & DevOps Engineer building scalable apps and CI/CD pipelines.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name','description'); document.head.appendChild(m); }
    m.setAttribute('content', desc);
  }, []);
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
};

export default Index;
