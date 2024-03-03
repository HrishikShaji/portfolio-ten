import { MutableRefObject, forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";

interface AccordionProps {
	items: any[];
	active: number;
	xValue: number;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
	({ items, active, xValue }, ref) => {
		const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
		const containerRef = useRef<HTMLDivElement>(null);
		const parentRef = ref as MutableRefObject<HTMLDivElement>;

		useEffect(() => {
			let ctx = gsap.context(() => {
				const timeline = gsap.timeline();

				timeline.fromTo(
					projectRefs.current,
					{
						x: xValue,
						opacity: 0,
					},
					{
						x: 0,
						opacity: 1,
						stagger: {
							from: xValue === 200 ? "start" : "end",
							each: 0.5,
						},
						scrollTrigger: {
							trigger: containerRef.current,
							start: "-50% 80%",
							end: () => `+=${projectRefs.current[0]?.offsetHeight}`,
							scrub: 3,
						},
					},
				);

				gsap.fromTo(
					projectRefs.current,
					{ width: "200px" },
					{
						duration: 0.5,
						width: (i) => (i === active ? "600px" : "200px"),
						scrollTrigger: {
							trigger: parentRef.current,
							start: "bottom bottom",
							end: "bottom bottom",
						},
					},
				);

				projectRefs.current.forEach((el) => {
					const width = el?.getBoundingClientRect().width;

					const mouseEnter = (e: MouseEvent) => {
						gsap.to(projectRefs.current, {
							width: (i) => (projectRefs.current[i] === el ? "600px" : "200px"),
						});
					};
					const mouseLeave = (e: MouseEvent) => {
						gsap.to(projectRefs.current, {
							width: width,
						});
					};
					el?.addEventListener("mouseenter", mouseEnter);

					return () => {
						el?.removeEventListener("mouseenter", mouseEnter);
						el?.removeEventListener("mouseleave", mouseLeave);
					};
				});
			}, containerRef);

			return () => ctx.kill();
		}, []);
		return (
			<div ref={containerRef} className="flex gap-2 w-full h-full">
				{items.map((item, i) => (
					<div
						key={i}
						ref={(el) => (projectRefs.current[i] = el)}
						className="bg-white rounded-3xl flex  items-center justify-center"
					>
						<h1>{i}</h1>
					</div>
				))}
			</div>
		);
	},
);

Accordion.displayName = "Accordion";

export default Accordion;
