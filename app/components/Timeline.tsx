import { useEffect, useRef } from "react";
import { data } from "../lib/data";
import gsap from "gsap";

export const Timeline = () => {
	const educationRefs = useRef<(HTMLDivElement | null)[]>([]);
	const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const educationRef = useRef<HTMLHeadingElement>(null);
	const experienceRef = useRef<HTMLHeadingElement>(null);

	useEffect(() => {
		let ctx = gsap.context(() => {
			gsap.set(educationRef.current, { xPercent: -100 });
			gsap.set(experienceRef.current, { xPercent: 100 });
			gsap.set(educationRefs.current, { xPercent: -100 });
			gsap.set(experienceRefs.current, { xPercent: 100 });

			const timeline = gsap.timeline();

			timeline
				.to(educationRef.current, {
					xPercent: 0,
					scrollTrigger: {
						trigger: educationRef.current,
						start: "top 75%",
						end: "top top",
						scrub: 1,
					},
				})
				.to(experienceRef.current, {
					xPercent: 0,
					scrollTrigger: {
						trigger: experienceRef.current,
						start: "top 75%",
						end: "top top",
						scrub: 1,
					},
				})
				.to(experienceRefs.current, {
					xPercent: 0,
					stagger: 0.05,
					scrollTrigger: {
						trigger: experienceRef.current,
						start: "top 75%",
						end: "top top",
						scrub: 1,
					},
				})
				.to(educationRefs.current, {
					xPercent: 0,
					stagger: 0.05,
					scrollTrigger: {
						trigger: experienceRef.current,
						start: "top 75%",
						end: "top top",
						scrub: 1,
					},
				});
		}, containerRef);

		return () => ctx.kill();
	}, []);
	return (
		<div
			ref={containerRef}
			className="h-screen w-full flex flex-col items-center justify-center text-white"
		>
			<div className="flex gap-10 items-center">
				<h1 className="text-8xl font-semibold" ref={educationRef}>
					Education
				</h1>
				<h1 className="text-9xl font-semibold">&</h1>
				<h1 className="text-8xl font-semibold" ref={experienceRef}>
					Experience
				</h1>
			</div>
			<div className="flex gap-10  w-[75%] h-[50%]">
				<div className="flex flex-col w-full h-full">
					{data.education.data.map((item, i) => (
						<div
							ref={(el) => (educationRefs.current[i] = el)}
							className="p-5 h-full w-full"
							key={item.id}
						>
							<div className="bg-neutral-500 w-full h-full rounded-3xl flex items-center justify-center">
								<h1>{item.major}</h1>
							</div>
						</div>
					))}
				</div>
				<div className="flex flex-col w-full h-full">
					{data.experience.data.map((item, i) => (
						<div
							ref={(el) => (experienceRefs.current[i] = el)}
							className="p-5 h-full w-full"
							key={item.id}
						>
							<div className="bg-neutral-500 w-full h-full rounded-3xl flex items-center justify-center">
								<h1>{item.company}</h1>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
