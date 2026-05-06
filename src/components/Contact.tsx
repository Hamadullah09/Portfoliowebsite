import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => (
  <section id="contact" className="py-24 border-t border-border/40 bg-hero">
    <div className="max-w-3xl mx-auto px-6 text-center reveal">
      <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
        Let's build something scalable together.
      </h2>
      <p className="text-muted-foreground mb-8">
        Open to internships, freelance and full-time roles. I'd love to hear from you.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant">
          <a href="mailto:hamadullah.amjadali@gmail.com"><Mail className="h-4 w-4" /> Email Me</a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href="tel:+923099084040"><Phone className="h-4 w-4" /> +92 309 9084040</a>
        </Button>
      </div>
      <div className="flex justify-center gap-5 text-muted-foreground">
        <a href="https://github.com/Hamadullah09" target="_blank" rel="noreferrer" className="hover:text-primary"><Github className="h-5 w-5" /></a>
        <a href="https://linkedin.com/in/hamadullah-arain-100b8a294" target="_blank" rel="noreferrer" className="hover:text-primary"><Linkedin className="h-5 w-5" /></a>
        <a href="mailto:hamadullah.amjadali@gmail.com" className="hover:text-primary"><Mail className="h-5 w-5" /></a>
      </div>
    </div>
    <footer className="mt-20 pt-8 border-t border-border/40">
      <p className="text-center text-xs text-muted-foreground">© 2026 Hamadullah. All rights reserved.</p>
    </footer>
  </section>
);
