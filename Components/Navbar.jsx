import React from "react";
import { FloatingNav } from "@/Components/ui/FloatingNav";

const Navbar = () => {
  const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Stack", link: "#skills" },
    { name: "Footer", link: "#footer" },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default Navbar;