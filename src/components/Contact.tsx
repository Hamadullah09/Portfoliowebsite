import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import portrait from "@/assets/hamad-cutout.webp";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#services", label: "Service" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Toolkit" },
];

export const Contact = () => (
  <>
    <div id="contact" className="anchor" />
    <section className="panel clouds">
      <div className="panel-shade" />
      <div aria-hidden className="clouds-drift" />
      <div className="wrap relative flex min-h-[88svh] flex-col items-center justify-center py-28 text-center">
        <span data-reveal className="pill">
          <span className="live-dot" /> Open to internships & full-time roles
        </span>
        <h2
          data-split
          className="mt-8 text-balance text-[clamp(38px,7vw,96px)] font-bold uppercase leading-[0.95] tracking-tight text-ink"
        >
          Have a project in mind?
        </h2>
        <p
          data-reveal
          style={{ "--d": "180ms" } as React.CSSProperties}
          className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-ink/60 md:text-lg"
        >
          Whether it's a .NET platform, an AI assistant or a research collaboration — let's build something reliable together.
        </p>
        <div data-reveal style={{ "--d": "260ms" } as React.CSSProperties} className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={`mailto:${profile.email}`} data-magnetic className="btn-dark group !px-6 !py-3.5">
            <span className="roll">
              <span>Let's Talk</span>
              <span aria-hidden>Let's Talk</span>
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href={profile.resume} download="Hamadullah_Resume.pdf" data-magnetic className="btn-light !px-6 !py-3.5">
            <Download className="h-4 w-4" /> Download CV
          </a>
        </div>
        <ul data-reveal style={{ "--d": "340ms" } as React.CSSProperties} className="absolute inset-x-0 bottom-8 flex flex-wrap justify-center gap-2 px-4">
          <li className="pill !py-1.5 !pl-1.5">
            <img src={portrait} alt="" className="h-7 w-7 rounded-full bg-mist object-cover object-top grayscale" />
            {profile.name}
          </li>
          {[
            { label: "GitHub", href: profile.github, icon: Github },
            { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
            { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
            { label: profile.phone, href: profile.phoneHref, icon: Phone },
          ].map((l) => (
            <li key={l.label}>
              <a href={l.href} data-magnetic className="pill !py-1.5" {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                <l.icon className="h-4 w-4" /> {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <footer className="panel bg-white">
      <div className="wrap pt-[clamp(48px,7vw,96px)]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">Say hello</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 block break-all text-[clamp(22px,3.2vw,42px)] font-medium leading-tight tracking-tight text-ink underline decoration-ink/15 underline-offset-8 transition-colors hover:decoration-ink"
            >
              {profile.email}
            </a>
            <div className="mt-6 flex flex-col gap-2 text-[15px] text-ink/60">
              <a href={profile.phoneHref} className="inline-flex items-center gap-2 hover:text-ink">
                <Phone className="h-4 w-4" /> {profile.phone}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {profile.location}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-6 lg:justify-items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">Navigate</p>
              <ul className="mt-4 space-y-2.5 text-[15px] font-medium">
                {nav.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-ink/70 hover:text-ink">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">Elsewhere</p>
              <ul className="mt-4 space-y-2.5 text-[15px] font-medium">
                <li>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-ink/70 hover:text-ink">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                </li>
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-ink/70 hover:text-ink">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-ink/70 hover:text-ink">
                    <Mail className="h-4 w-4" /> Email
                  </a>
                </li>
                <li>
                  <a href={profile.resume} download="Hamadullah_Resume.pdf" className="inline-flex items-center gap-2 text-ink/70 hover:text-ink">
                    <Download className="h-4 w-4" /> Resume
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p aria-hidden data-split className="display mt-[clamp(48px,7vw,96px)] select-none whitespace-nowrap pb-[0.12em] text-center text-[clamp(44px,11.4vw,200px)]">
          <span className="text-outline">HAMAD</span>
          <span className="text-ink">ULLAH</span>
        </p>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-6 text-sm text-ink/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Hamadullah. All rights reserved.</span>
          <a href="#top" className="inline-flex items-center gap-1 font-medium text-ink/70 hover:text-ink">
            Back to top <ArrowUpRight className="h-4 w-4 -rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  </>
);
