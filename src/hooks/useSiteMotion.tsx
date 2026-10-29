import { useLayoutEffect } from "react";
import { gsap, hasFinePointer, prefersReducedMotion, ScrollTrigger, SplitText } from "@/lib/motion";

/**
 * Page-wide scroll choreography:
 * - "/TITLE" headings and [data-split] text rise in letter by letter
 * - watermark words drift sideways as their section scrolls
 * - [data-scrub-words] paragraphs light up word by word
 * - [data-count] numbers count up
 * - [data-magnetic] elements lean toward the cursor
 */
export function useSiteMotion(ready: boolean) {
  useLayoutEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const splits: SplitText[] = [];
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>(".section-title, [data-split]").forEach((el) => {
        const split = SplitText.create(el, { type: "chars,words", mask: "chars" });
        splits.push(split);
        gsap.from(split.chars, {
          yPercent: 110,
          duration: 1,
          stagger: 0.025,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      document.querySelectorAll<HTMLElement>(".watermark > span").forEach((el) => {
        const panel = el.closest(".panel") ?? el;
        gsap.fromTo(el, { xPercent: -7 }, {
          xPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-scrub-words]").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        splits.push(split);
        gsap.fromTo(split.words, { opacity: 0.12 }, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        });
      });

      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const raw = el.dataset.count!;
        const target = parseFloat(raw.replace(/[^\d.]/g, ""));
        const suffix = raw.replace(/[\d.,]/g, "");
        const n = { v: 0 };
        gsap.to(n, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => (el.textContent = Math.round(n.v).toLocaleString("en-US") + suffix),
        });
      });
    });

    if (hasFinePointer()) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          x((e.clientX - (r.left + r.width / 2)) * 0.35);
          y((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    // Fonts change line breaks; re-measure once they're in
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cleanups.forEach((c) => c());
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, [ready]);
}
