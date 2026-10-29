import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import portrait from "@/assets/hamad-cutout.webp";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { gsap, prefersReducedMotion } from "@/lib/motion";

const socials = [
  { label: "GitHub", href: profile.github, icon: Github, external: true },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin, external: true },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "Resume", href: profile.resume, icon: Download, download: "Hamadullah_Resume.pdf" },
];

const Word = ({ text, outline }: { text: string; outline?: boolean }) => (
  <span className={outline ? "text-outline" : "text-ink"}>
    {text.split("").map((ch, i) => (
      <span key={i} className="inline-block overflow-hidden pb-[0.04em] align-bottom">
        <span className="h-letter inline-block">{ch}</span>
      </span>
    ))}
  </span>
);

/**
 * Grayscale portrait with a colour spotlight that follows the cursor (or a finger),
 * as in the reference design. A one-off "tease" sweeps the spotlight over the face.
 */
const Portrait = ({ className, imgClassName, tease }: { className?: string; imgClassName: string; tease: boolean }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const color = useRef<HTMLImageElement>(null);
  const target = useRef({ x: 0, y: 0, r: 0 });

  useEffect(() => {
    const el = wrap.current;
    const c = color.current;
    if (!el || !c) return;
    const pos = { x: 0, y: 0, r: 0 };
    const t = target.current;
    const tick = () => {
      // Idle when the spotlight is closed and settled, so nothing repaints
      if (t.r === 0 && pos.r < 0.5) {
        if (pos.r !== 0) {
          pos.r = 0;
          c.style.setProperty("--r", "0px");
        }
        return;
      }
      pos.x += (t.x - pos.x) * 0.16;
      pos.y += (t.y - pos.y) * 0.16;
      pos.r += (t.r - pos.r) * 0.12;
      c.style.setProperty("--x", `${pos.x}px`);
      c.style.setProperty("--y", `${pos.y}px`);
      c.style.setProperty("--r", `${pos.r}px`);
    };
    gsap.ticker.add(tick);
    const at = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      t.x = e.clientX - r.left;
      t.y = e.clientY - r.top;
    };
    const enter = (e: PointerEvent) => {
      at(e);
      pos.x = t.x;
      pos.y = t.y;
      t.r = Math.min(170, el.offsetWidth * 0.32);
    };
    const leave = () => (t.r = 0);
    const up = (e: PointerEvent) => e.pointerType === "touch" && window.setTimeout(leave, 900);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", at);
    el.addEventListener("pointerdown", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("pointerup", up);
    return () => {
      gsap.ticker.remove(tick);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", at);
      el.removeEventListener("pointerdown", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("pointerup", up);
    };
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!tease || !el || prefersReducedMotion()) return;
    const t = target.current;
    const path = { p: 0 };
    const tl = gsap.timeline({ delay: 2.1 });
    tl.add(() => {
      t.x = el.offsetWidth * 0.36;
      t.y = el.offsetHeight * 0.3;
      t.r = Math.min(150, el.offsetWidth * 0.3);
    })
      .to(path, {
        p: 1,
        duration: 1.8,
        ease: "sine.inOut",
        onUpdate: () => {
          t.x = el.offsetWidth * (0.36 + 0.28 * path.p);
          t.y = el.offsetHeight * (0.3 - 0.05 * Math.sin(path.p * Math.PI));
        },
      })
      .add(() => (t.r = 0), "+=0.2");
    return () => {
      tl.kill();
    };
  }, [tease]);

  return (
    <div ref={wrap} data-cursor="hide" className={cn("h-portrait touch-pan-y", className)}>
      <img src={portrait} alt="Portrait of Hamadullah" draggable={false} className={cn("select-none grayscale contrast-[1.06]", imgClassName)} />
      <img
        ref={color}
        src={portrait}
        alt=""
        aria-hidden
        draggable={false}
        className="spotlight pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
      />
    </div>
  );
};

const Intro = ({ className = "" }: { className?: string }) => (
  <div className={className}>
    <h2 className="h-fade text-[clamp(24px,2.6vw,34px)] font-bold tracking-tight text-ink">{profile.role}</h2>
    <p className="h-fade mt-3 max-w-[320px] text-[15px] leading-relaxed text-ink/60">
      Building production-grade .NET, React and AI systems — RFID platforms, RAG assistants and well-tested APIs.
    </p>
    <a href="#contact" data-magnetic className="h-fade btn-dark mt-6">
      Let's collaborate <ArrowUpRight className="h-4 w-4" />
    </a>
  </div>
);

const Socials = ({ className = "" }: { className?: string }) => (
  <ul className={className}>
    {socials.map((s) => (
      <li key={s.label} className="h-social">
        <a
          href={s.href}
          data-magnetic
          className="pill !bg-white/90 !font-semibold backdrop-blur"
          {...(s.external ? { target: "_blank", rel: "noreferrer" } : {})}
          {...(s.download ? { download: s.download } : {})}
        >
          <s.icon className="h-4 w-4" />
          {s.label}
        </a>
      </li>
    ))}
  </ul>
);

export const Hero = ({ ready }: { ready: boolean }) => {
  const root = useRef<HTMLElement>(null);
  const reduce = prefersReducedMotion();

  // Hide everything before the first paint so the intro starts from a clean slate
  useLayoutEffect(() => {
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.set(".h-letter", { yPercent: 115 });
      gsap.set(".h-portrait", { clipPath: "inset(100% 0% 0% 0%)", y: 80 });
      gsap.set(".h-fade", { autoAlpha: 0, y: 28 });
      gsap.set(".h-social", { autoAlpha: 0, x: 30 });
      gsap.set("header nav", { autoAlpha: 0, y: -24 });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  useEffect(() => {
    if (!ready || reduce) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(".h-letter", { yPercent: 0, duration: 1.3, stagger: 0.055 })
        .to(".h-portrait", { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.6, ease: "expo.inOut" }, 0.25)
        .to("header nav", { autoAlpha: 1, y: 0, duration: 1 }, 0.6)
        .to(".h-fade", { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 1)
        .to(".h-social", { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.08 }, 1.1);

      // Depth while the next panel slides over the hero
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
        .to(".h-name", { yPercent: -35, ease: "none" }, 0)
        .to(".h-portrait", { yPercent: 8, scale: 0.94, transformOrigin: "50% 100%", ease: "none" }, 0)
        .to(".h-side", { autoAlpha: 0, y: -40, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, [ready, reduce]);

  return (
    <section ref={root} id="top" className="panel is-first bg-white">
      <div className="panel-shade" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-[var(--gutter)] pt-24 sm:pt-28 lg:pt-32">
        {/* Name: outlined first half, solid second half */}
        <h1 className="h-name display relative z-0 select-none text-center text-[clamp(64px,22vw,150px)] md:text-[clamp(64px,11.4vw,200px)]">
          <span className="sr-only">Hamadullah</span>
          <span aria-hidden className="flex flex-col items-center md:block md:whitespace-nowrap">
            <Word text="HAMAD" outline />
            <Word text="ULLAH" />
          </span>
        </h1>

        {/* Desktop composition */}
        <div className="relative hidden flex-1 xl:block">
          <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
            <Portrait tease={ready} className="relative" imgClassName="block h-[min(74vh,760px)] w-auto max-w-none" />
          </div>
          <Intro className="h-side absolute bottom-[12%] left-0 z-20" />
          <Socials className="h-side absolute bottom-[10%] right-0 z-20 flex flex-col items-end gap-3" />
        </div>

        {/* Mobile / tablet composition */}
        <div className="flex flex-1 flex-col xl:hidden">
          <div className="relative -mt-[6vw] flex justify-center">
            <Portrait tease={ready} className="relative z-10" imgClassName="block h-[min(50svh,520px)] w-auto" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white to-transparent" />
          </div>
          <div className="relative z-20 flex flex-col items-center gap-7 pb-12 pt-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <Intro className="flex flex-col items-center sm:items-start" />
            <Socials className="flex flex-wrap justify-center gap-2 sm:flex-col sm:items-end" />
          </div>
        </div>
      </div>
    </section>
  );
};
