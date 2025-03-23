import { Footer } from "@/Components/Footer";
import Grid from "@/Components/Grid";
import Hero from "@/Components/Hero";
import RecentProjects from "@/Components/RecentProjects";
import { FloatingNav } from "@/Components/ui/FloatingNav";
import { SkillsSection } from "@/Components/SkillsSection";
import { FaHome } from "react-icons/fa";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: "Home", link: "#home", icon: <FaHome /> },
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#skills" },
  { name: "Contact", link: "#footer" }
];

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <section id="home" className="pt-20">
          <Hero />
        </section>
        <section id="about" className="pt-20">
          <Grid />
        </section>
        <section id="projects" className="pt-20">
          <RecentProjects />
        </section>
        <section id="skills" className="pt-20">
          <SkillsSection />
        </section>
        <section id="footer" className="pt-20">
          <Footer />
        </section>
      </div>
    </main>
  );
}
