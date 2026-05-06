import { Download, Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="text-lg">
          <span className="font-extrabold">Hamadullah</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground">
            <a href="/Hamadullah_Arain_Resume.pdf" download>
              <Download className="h-4 w-4" /> Download CV
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95">
          <ul className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a onClick={() => setOpen(false)} href={l.href} className="block text-muted-foreground hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
            <a href="/Hamadullah_Arain_Resume.pdf" download className="text-primary font-medium">Download CV</a>
          </ul>
        </div>
      )}
    </header>
  );
};
