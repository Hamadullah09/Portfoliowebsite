import { useCallback, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { Services } from "@/components/Services";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { ProjectSheet } from "@/components/ProjectSheet";
import { Preloader } from "@/components/Preloader";
import { Cursor } from "@/components/Cursor";
import { useReveal } from "@/hooks/useReveal";
import { useStackPanels } from "@/hooks/useStackPanels";
import { useSiteMotion } from "@/hooks/useSiteMotion";
import { startSmoothScroll } from "@/lib/motion";

/** Project pages live at `#work/<slug>` so deep links work on any static host. */
const slugFromHash = () => window.location.hash.match(/^#work\/([\w-]+)$/)?.[1] ?? null;

const Index = () => {
  const [ready, setReady] = useState(false);
  useReveal();
  useStackPanels();
  useSiteMotion(ready);
  useEffect(() => startSmoothScroll(), []);
  const [slug, setSlug] = useState<string | null>(slugFromHash);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const sync = () => setSlug(slugFromHash());
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const open = useCallback((s: string) => {
    const fromSheet = Boolean(window.history.state?.sheet);
    const url = `#work/${s}`;
    if (fromSheet) window.history.replaceState({ sheet: true }, "", url);
    else window.history.pushState({ sheet: true }, "", url);
    setSlug(s);
  }, []);

  const close = useCallback(() => {
    if (window.history.state?.sheet) {
      window.history.back();
    } else {
      // Landed directly on a project link: drop the hash and show the work grid
      window.history.replaceState(null, "", "#work");
      setSlug(null);
      document.getElementById("work")?.scrollIntoView();
    }
  }, []);

  return (
    <>
      <Preloader onDone={onReady} />
      <Cursor />
      <Navbar />
      <main>
        <Hero ready={ready} />
        <About />
        <Projects onOpen={open} />
        <Research />
        <Services />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <ProjectSheet slug={slug} onClose={close} onOpen={open} />
    </>
  );
};

export default Index;
