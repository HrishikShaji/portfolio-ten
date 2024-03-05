import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";
import { data } from "../lib/data";
import Image from "next/image";

gsap.registerPlugin(Draggable, InertiaPlugin);

export const Slider = () => {
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
	const cardRef = useRef<HTMLDivElement>(null);
	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			if (cardRef.current) {
				Draggable.create(cardRef.current, {
					type: "x",
					bounds: {
						maxX: 0,
						minX: window.innerWidth - cardRef.current.scrollWidth,
					},
					inertia: true,
				});
			}
		});
		return () => ctx.revert();
	}, []);

	return (
		<div className="w-fit h-[900px] overflow-hidden">
			<div ref={cardRef} className="flex gap-10 p-10">
				{data.testimonials.map((item, i) => (
					<div
						key={i}
						ref={(el) => (cardRefs.current[i] = el)}
						className=" h-[500px] w-[500px] flex-shrink-0  bg-neutral-700 rounded-3xl flex-col"
					>
						<div className="preview h-[50%] w-full">
							<Image
								height={1000}
								width={1000}
								src={item.img}
								className="h-full w-full object-cover"
								alt="The Plant"
								draggable="false"
							/>
						</div>
						<div className="infos h-[50%] w-full p-5">
							<h3>{item.name}</h3>
							<h2>{item.desc}</h2>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
