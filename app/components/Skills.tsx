import { useEffect, useRef } from "react";
import { data } from "../lib/data";
import { cookies } from "next/headers";
import gsap from "gsap";

const coords = [
	{ y: 60, x: 600 },
	{ y: 90, x: 900 },
	{ y: 600, x: 350 },
	{ y: 200, x: 1000 },
	{ y: 270, x: 250 },
	{ y: 350, x: 1200 },
	{ y: 400, x: 350 },
	{ y: 159, x: 1300 },
	{ y: 210, x: 500 },
	{ y: 450, x: 550 },
	{ y: 500, x: 1000 },
	{ y: 600, x: 700 },
	{ y: 258, x: 750 },
	{ y: 400, x: 80 },
	{ y: 500, x: 850 },
	{ y: 700, x: 900 },
];
export const Skills = () => {
	const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
	useEffect(() => {
		let ctx = gsap.context(() => {
			gsap.to(skillRefs.current, {
				ease: "sine.inOut",
				yoyo: true,
				duration: 1,
				scale: 1.1,
				xPercent: (i) => (i % 2 === 0 ? (i + 1) * 2 : (i + 1) * -2),
				repeat: -1,
			});
		});

		return () => ctx.kill();
	}, []);

	return (
		<div className="h-screen relative w-full text-white flex items-center  justify-center ">
			<h1 className="text-7xl">Skills</h1>
			{data.skills.data.map((item, i) => (
				<div
					style={{ top: `${coords[i].y}px`, left: `${coords[i].x}px` }}
					ref={(el) => (skillRefs.current[i] = el)}
					key={i}
					className="absolute p-3 rounded-2xl bg-white text-black"
				>
					<div className="relative ">
						<h1>{item.name}</h1>
					</div>
				</div>
			))}
		</div>
	);
};
