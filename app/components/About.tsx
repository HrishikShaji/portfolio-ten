"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { data } from "../lib/data";

export const About = () => {
	const imageRef = useRef<HTMLImageElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		let ctx = gsap.context(() => {
			gsap.set(imageRef.current, { yPercent: -110, xPercent: 25, scale: 0.5 });

			const timeline = gsap.timeline();
			timeline
				.to(imageRef.current, {
					yPercent: 0,
					xPercent: 0,
					scale: 0.5,
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top bottom",
						end: "top 40%",
						scrub: 1,
					},
				})
				.fromTo(
					imageRef.current,
					{ scale: 0.5 },
					{
						scale: 1,
						scrollTrigger: {
							trigger: containerRef.current,
							start: "top 40%",
							end: "top top",
							scrub: 1,
						},
					},
				)
				.fromTo(
					textRef.current,
					{ opacity: 0 },
					{
						opacity: 1,
						scrollTrigger: {
							trigger: textRef.current,
							start: "top 70%",
							end: "top 60%",
							scrub: true,
						},
					},
				);
		});
	}, []);

	return (
		<div
			ref={containerRef}
			className="h-screen relative w-full p-10 flex items-center justify-center"
		>
			<h1
				ref={textRef}
				className="absolute z-10 bottom-20 text-2xl font-semibold mix-blend-difference text-white w-[80%] text-center"
			>
				{data.about.description}
			</h1>
			<Image
				ref={imageRef}
				src={data.personal.profileImg}
				alt=""
				height={1000}
				width={1000}
				className="object-cover h-full w-full rounded-3xl"
			/>
		</div>
	);
};
