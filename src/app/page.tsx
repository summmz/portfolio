import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SectionMarquee } from "@/components/section-marquee";
import { profile } from "@/lib/data";

export default function Home() {
  return (
    <main id="main" className="relative">
      <div className="relative z-[1]">
        <Hero />
        <Marquee
          outline
          items={[
            "Available for work",
            "Let's build",
            "React",
            "JavaScript",
            "Node.js",
            "TypeScript",
            "MongoDB",
            "Vercel",
          ]}
        />
        <About />
        <SectionMarquee label="build in public" rotate={-1.2} />
        <Skills />
        <Projects />
        <SectionMarquee label="kill it with consistency" rotate={1} />
        <Experience />
        <Blog />
        <Marquee
          items={[
            "Consistency beats motivation",
            profile.email,
            "GitHub / summmz",
            "Open to internships",
            "Building in public",
          ]}
        />
        <SectionMarquee label="let's ship" rotate={-0.8} />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}