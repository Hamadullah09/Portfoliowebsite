import { useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const KEY = "hamad:intro-seen";

const seen = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

/** Counter-and-curtain intro, shown once per browser session. Calls onDone as the curtain lifts. */
export const Preloader = ({ onDone }: { onDone: () => void }) => {
  const [skip] = useState(() => seen() || prefersReducedMotion());
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (skip) {
      onDone();
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode — show the intro again next time */
    }
    document.documentElement.style.overflow = "hidden";
    const n = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".pl-letter", { yPercent: 110, duration: 0.9, stagger: 0.045, ease: "expo.out" })
        .to(n, {
          v: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(n.v)).padStart(2, "0");
          },
        }, 0)
        .to(bar.current, { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
        .to(".pl-letter", { yPercent: -110, duration: 0.6, stagger: 0.02, ease: "power3.in" })
        .add(() => {
          document.documentElement.style.overflow = "";
          onDone();
        })
        .to(root.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "<-0.1")
        .set(root.current, { display: "none" });
    }, root);
    return () => {
      ctx.revert();
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (skip) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex flex-col bg-night text-white" aria-hidden>
      <div className="flex flex-1 items-center justify-center overflow-hidden">
        <p className="display flex overflow-hidden text-[clamp(40px,10vw,140px)]">
          {"HAMADULLAH".split("").map((ch, i) => (
            <span key={i} className="pl-letter inline-block" style={i < 5 ? { color: "transparent", WebkitTextStroke: "2px #fff" } : undefined}>
              {ch}
            </span>
          ))}
        </p>
      </div>
      <div className="wrap flex items-end justify-between pb-8">
        <span className="text-sm text-white/50">Software Developer — Portfolio 2026</span>
        <span className="text-[clamp(48px,8vw,120px)] font-semibold leading-none tabular-nums">
          <span ref={count}>00</span>
          <span className="text-white/30">%</span>
        </span>
      </div>
      <span ref={bar} className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-white" />
    </div>
  );
};
