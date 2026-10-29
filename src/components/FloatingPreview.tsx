import { useEffect, useRef, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { gsap, hasFinePointer } from "@/lib/motion";
import { Mockup } from "@/components/Mockup";

type Props = {
  /** The element whose area the preview follows the pointer within. */
  area: RefObject<HTMLElement>;
  /** Mockup ids, in row order. */
  ids: string[];
  /** Index of the row under the pointer, or null to hide. */
  active: number | null;
  className?: string;
};

/**
 * A tilted screenshot card that trails the cursor and leans with its velocity,
 * like the hover previews in the reference design. Desktop pointers only.
 */
export const FloatingPreview = ({ area, ids, active, className }: Props) => {
  const card = useRef<HTMLDivElement>(null);
  // Mount each screen the first time it is shown, then keep it for instant cross-fades
  const [seen, setSeen] = useState<Set<number>>(() => new Set());
  useEffect(() => {
    if (active !== null && !seen.has(active)) setSeen((s) => new Set(s).add(active));
  }, [active, seen]);

  useEffect(() => {
    const el = area.current;
    const c = card.current;
    if (!el || !c || !hasFinePointer()) return;
    const x = gsap.quickTo(c, "x", { duration: 0.6, ease: "power3" });
    const y = gsap.quickTo(c, "y", { duration: 0.6, ease: "power3" });
    const rot = gsap.quickTo(c, "rotation", { duration: 0.8, ease: "power3" });
    let last = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x(e.clientX - r.left - c.offsetWidth * 0.35);
      y(e.clientY - r.top - c.offsetHeight * 0.6);
      const v = gsap.utils.clamp(-14, 14, (e.clientX - last) * 0.6);
      last = e.clientX;
      rot(7 + v);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, [area]);

  useEffect(() => {
    if (!card.current) return;
    gsap.to(card.current, {
      autoAlpha: active === null ? 0 : 1,
      scale: active === null ? 0.6 : 1,
      duration: active === null ? 0.3 : 0.5,
      ease: active === null ? "power2.in" : "back.out(1.6)",
    });
  }, [active]);

  return (
    <div
      ref={card}
      aria-hidden
      className={cn(
        "pointer-events-none invisible absolute left-0 top-0 z-30 hidden w-[340px] opacity-0 lg:[@media(hover:hover)]:block",
        className
      )}
    >
      <div className="rounded-[14px] bg-white p-1.5 shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6)]">
        <div className="relative aspect-[16/11] overflow-hidden rounded-[10px] bg-[#0e0e10]">
          {ids.map((id, i) =>
            seen.has(i) ? (
              <div key={id + i} className={cn("absolute inset-0 transition-opacity duration-300", active === i ? "opacity-100" : "opacity-0")}>
                <Mockup id={id} className="h-full" />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};
