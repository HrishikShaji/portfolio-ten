"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { data } from "../lib/data";

export const About = () => {
	const imageRef = useRef<HTMLImageElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let ctx = gsap.context(() => {
			gsap.set(imageRef.current, { y: -900, x: 900 });

			gsap.to(imageRef.current, {
				y: 0,
				x: 0,
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top center",
					end: "top top",
					scrub: 1,
					markers: true,
				},
			});
		}, containerRef);
	}, []);

	return (
		<div
			ref={containerRef}
			className="h-screen w-full flex items-center justify-center"
		>
			<Image
				ref={imageRef}
				src={data.personal.profileImg}
				alt=""
				height={1000}
				width={1000}
				className="object-cover h-[500px] w=[500px] rounded-3xl"
			/>
		</div>
	);
};
