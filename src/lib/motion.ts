import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.defaults({ ease: "power3.out" });

export { gsap, ScrollTrigger, SplitText };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

let lenis: Lenis | null = null;

/** Smooth wheel scrolling driven by GSAP's ticker so ScrollTrigger stays in sync. Native scroll is kept,
 *  so the CSS sticky panels keep working. */
export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {};
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Route in-page anchor links through Lenis
  const onClick = (e: MouseEvent) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    const id = a.getAttribute("href")!.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target && id !== "top") return;
    e.preventDefault();
    lenis?.scrollTo(id === "top" ? 0 : target!, { duration: 1.4 });
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Pause smooth scrolling while an overlay (menu, project sheet) owns the scroll. */
export const lockScroll = (locked: boolean) => (locked ? lenis?.stop() : lenis?.start());

export const scrollToTarget = (target: string | HTMLElement | number) => {
  if (lenis) lenis.scrollTo(target, { duration: 1.4 });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else (typeof target === "string" ? document.querySelector(target) : target)?.scrollIntoView({ behavior: "smooth" });
};
