import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap, hasFinePointer } from "@/lib/motion";

/**
 * Custom cursor: a dot and a trailing ring that inverts over light and dark sections.
 * - links / buttons: the ring grows
 * - [data-cursor="view"]: the ring becomes a white "↗" disc, as on the reference cards
 * - [data-cursor="hide"]: the cursor hides (e.g. over the portrait colour spotlight)
 */
export const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || !dot.current || !ring.current) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });

    let state = "";
    const setState = (next: string) => {
      if (next === state) return;
      state = next;
      ring.current!.dataset.state = next;
      dot.current!.dataset.state = next;
    };

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      if (root.dataset.cursorOut) delete root.dataset.cursorOut;
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      if (tagged) return setState(tagged.dataset.cursor!);
      setState(t.closest("a, button, [role=tab], label") ? "link" : "");
    };
    const down = () => gsap.to(ring.current, { scale: 0.8, duration: 0.15 });
    const up = () => gsap.to(ring.current, { scale: 1, duration: 0.3, ease: "back.out(3)" });
    const out = (e: PointerEvent) => {
      if (!e.relatedTarget) root.dataset.cursorOut = "1";
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerout", out);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerout", out);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div aria-hidden className="cursor-layer">
      <div ref={ring} className="cursor-ring">
        <ArrowUpRight className="cursor-icon" />
      </div>
      <div ref={dot} className="cursor-dot" />
    </div>
  );
};
