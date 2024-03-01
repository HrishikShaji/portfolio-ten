"use client";

import Image from "next/image";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Features } from "./components/Features";
import { Timeline } from "./components/Timeline";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	return (
		<main className="bg-neutral-800 overflow-hidden">
			<Hero />
			<About />
			<Features />
			<Timeline />
		</main>
	);
}
