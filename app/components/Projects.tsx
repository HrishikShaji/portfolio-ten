import { useRef } from "react";
import { data } from "../lib/data";
import Accordion from "./Accordion";

export const Projects = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={containerRef}
			className="h-screen w-full flex justify-center items-center"
		>
			<div className=" flex h-[75%] flex-col gap-2">
				<Accordion
					active={0}
					items={data.projects.data.slice(0, 4)}
					ref={containerRef}
				/>
				<Accordion
					active={1}
					items={data.projects.data.slice(4, 8)}
					ref={containerRef}
				/>
				<Accordion
					active={2}
					items={data.projects.data.slice(8, 12)}
					ref={containerRef}
				/>
			</div>
		</div>
	);
};
