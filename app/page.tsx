"use client";

import Image from "next/image";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Features } from "./components/Features";
import { Timeline } from "./components/Timeline";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <main className="bg-neutral-800 overflow-hidden">
      <Hero />
      <About />
      <Features />
      <Timeline />
      <Skills />
      <Projects />
    </main>
  );
}
