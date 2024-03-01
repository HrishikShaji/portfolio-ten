import { useEffect, useRef } from "react";
import { data } from "../lib/data";
import { cookies } from "next/headers";

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
	const skillRefs = useRef<(HTMLHeadingElement | null)[]>([]);
	useEffect(() => {
		skillRefs.current.forEach((el) => {
			console.log(el?.offsetTop, el?.offsetLeft);
		});
	}, []);

	return (
		<div className="h-screen relative w-full text-white flex items-center  justify-center ">
			<h1 className="text-7xl">Skills</h1>
			{data.skills.data.map((item, i) => (
				<h1
					className="absolute"
					style={{ top: `${coords[i].y}px`, left: `${coords[i].x}px` }}
					ref={(el) => (skillRefs.current[i] = el)}
					key={i}
				>
					{item.name}
				</h1>
			))}
		</div>
	);
};
