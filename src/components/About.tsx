import photo from "@/assets/hamad.jpg";

export const About = () => (
  <section id="about" className="py-24 border-t border-border/40">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
      <div className="reveal flex justify-center md:justify-start">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
          <img
            src={photo}
            alt="Hamadullah"
            className="relative w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl glow-ring"
          />
        </div>
      </div>
      <div className="reveal">
        <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-3">About Me</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Bridging code, systems, and deployment.</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          I am an independent software developer and a student at FAST-NUCES Karachi (Expected 2027).
          My core focus lies in bridging the gap between robust backend systems and seamless deployment.
          I specialize in ASP.NET MVC, C#, and SQL Server, heavily supported by DevOps practices like
          Docker, Linux, and CI/CD pipelines.
        </p>
      </div>
    </div>
  </section>
);
