import Footer from "@/Components/Footer";
import Grid from "@/Components/Grid";
import Hero from "@/Components/Hero";
import RecentProjects from "@/Components/RecentProjects";
import { FloatingNav } from "@/Components/ui/FloatingNav";
import Navbar from "@/Components/Navbar";
import { SkillsSection } from "@/Components/SkillsSection";
import Image from "next/image";
import { FaHome } from "react-icons/fa";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
      <Navbar />
      <Hero />
      <section id="about"><Grid /></section>
      <section id="projects"><RecentProjects /></section>
      <section id="skills"><SkillsSection /></section>
      <section id="footer"><Footer /></section>
      </div>
    </main>
  );
}
