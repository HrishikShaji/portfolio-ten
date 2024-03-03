import { MutableRefObject, forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";

interface AccordionProps {
	items: any[];
	active: number;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
	({ items, active }, ref) => {
		const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
		const containerRef = useRef<HTMLDivElement>(null);
		const parentRef = ref as MutableRefObject<HTMLDivElement>;

		useEffect(() => {
			let ctx = gsap.context(() => {
				const timeline = gsap.timeline();

				timeline.fromTo(
					projectRefs.current,
					{
						x: -200,
					},
					{
						x: 0,
						stagger: {
							from: "end",
							each: 0.2,
						},
						scrollTrigger: {
							trigger: containerRef.current,
							start: "-50% 80%",
							end: () => `+=${projectRefs.current[0]?.offsetHeight}`,
							scrub: 1,
						},
					},
				);

				gsap.fromTo(
					projectRefs.current,
					{ width: "200px" },
					{
						duration: 0.25,
						width: (i) => (i === active ? "600px" : "200px"),
						scrollTrigger: {
							trigger: parentRef.current,
							start: "bottom bottom",
							markers: true,
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
