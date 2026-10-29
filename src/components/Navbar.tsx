import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { lockScroll } from "@/lib/motion";
import { profile, experience, services } from "@/data/profile";
import { projects } from "@/data/projects";

const links = [
  { href: "#work", label: "Work", count: String(projects.length) },
  { href: "#research", label: "Research", count: "FYP" },
  { href: "#services", label: "Service", count: String(services.length) },
  { href: "#experience", label: "Experience", count: String(experience.length) },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <nav
        className={cn(
          "mx-auto flex h-14 items-center justify-between gap-3 rounded-full px-2 transition-all duration-500 sm:h-16 sm:px-3",
          scrolled
            ? "max-w-[1180px] bg-white/80 shadow-[0_12px_40px_-16px_rgb(0_0_0/0.35)] ring-1 ring-black/[0.05] backdrop-blur-xl"
            : "max-w-[1320px] bg-transparent"
        )}
      >
        <a href="#top" className="pill !px-3 !py-2 sm:!px-4" aria-label="Hamadullah — back to top">
          <span className="live-dot" />
          <span className="hidden sm:inline">Open to Opportunities</span>
          <span className="sm:hidden">Available</span>
        </a>

        <ul className="hidden items-center gap-8 text-[15px] font-medium text-ink lg:flex xl:gap-12">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="group inline-flex items-baseline gap-1.5">
                <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                  {l.label}
                </span>
                {l.count && <span className="text-xs text-ink/40">[{l.count}]</span>}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={`mailto:${profile.email}`} data-magnetic className="btn-dark group !px-4 !py-2.5 sm:!px-5">
            <span className="roll">
              <span>Let's Talk</span>
              <span aria-hidden>Let's Talk</span>
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink ring-1 ring-black/[0.06] lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white transition-all duration-500 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
        aria-hidden={!open}
        data-lenis-prevent
      >
        <div className="flex h-[68px] items-center justify-between px-4 pt-3">
          <span className="pill !px-3">
            <span className="live-dot" /> Open to Opportunities
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="mt-6 flex-1 px-5">
          {links.map((l, i) => (
            <li
              key={l.href}
              className={cn("border-b border-line transition-all duration-500", open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            >
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-5 text-[clamp(28px,8vw,44px)] font-medium uppercase leading-none tracking-tight"
              >
                <span>
                  {l.label}
                  {l.count && <sup className="ml-2 align-super text-sm font-semibold text-ink/40">[{l.count}]</sup>}
                </span>
                <ArrowUpRight className="h-6 w-6 text-ink/60" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 px-5 pb-8 pt-6">
          <a className="chip" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="chip" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="chip" href={profile.resume} download="Hamadullah_Resume.pdf">Resume</a>
          <a className="chip" href={profile.phoneHref}>{profile.phone}</a>
        </div>
      </div>
    </header>
  );
};
