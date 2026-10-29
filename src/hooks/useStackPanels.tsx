import { useEffect } from "react";

/**
 * Makes every `.panel` sticky so the next one slides over it like a stacked card.
 * Panels taller than the viewport stick by their bottom edge, so all of their
 * content scrolls past before they get covered.
 */
export function useStackPanels() {
  useEffect(() => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>(".panel"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const layout = () => {
      const vh = window.innerHeight;
      panels.forEach((p, i) => {
        p.style.top = `${Math.min(0, vh - p.offsetHeight)}px`;
        p.style.zIndex = String(i + 1);
      });
    };

    const shades = panels.map((p) => p.querySelector<HTMLElement>(":scope > .panel-shade"));
    const last = shades.map(() => -1);

    const shade = () => {
      frame = 0;
      if (reduce) return;
      const vh = window.innerHeight;
      // Read every position first, then write, so layout is computed once per frame
      const tops = panels.map((p) => p.getBoundingClientRect().top);
      shades.forEach((overlay, i) => {
        if (!overlay || i === panels.length - 1) return;
        const o = Math.round(Math.min(1, Math.max(0, (vh - tops[i + 1]) / vh)) * 50) / 100;
        if (o !== last[i]) {
          last[i] = o;
          overlay.style.opacity = String(o);
        }
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(shade);
    };

    const ro = new ResizeObserver(() => {
      layout();
      shade();
    });
    panels.forEach((p) => ro.observe(p));
    window.addEventListener("resize", layout);
    window.addEventListener("scroll", onScroll, { passive: true });
    layout();
    shade();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", layout);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
}
