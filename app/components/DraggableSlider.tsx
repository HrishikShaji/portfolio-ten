import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { data } from "../lib/data";
import Image from "next/image";
gsap.registerPlugin(Draggable);

interface SlideProps {
	imageSource: string;
	content: string;
	name: string;
}

const Slide: React.FC<SlideProps> = ({ imageSource, content, name }) => {
	return (
		<div className="slide h-[500px] w-[500px] flex-shrink-0 overflow-hidden bg-neutral-700 rounded-3xl flex-col">
			<div className="preview h-[50%] w-full">
				<Image
					height={1000}
					width={1000}
					src={imageSource}
					className="h-full w-full object-cover"
					alt="The Plant"
					draggable="false"
				/>
			</div>
			<div className="infos h-[50%] w-full p-5">
				<h3>{content}</h3>
				<h2>{name}</h2>
			</div>
		</div>
	);
};

export const Slider = () => {
	const sliderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let ctx = gsap.context(() => {
			const width = sliderRef.current?.getBoundingClientRect().width;
			if (width) {
				Draggable.create(sliderRef.current, {
					type: "x",
					bounds: {
						minX: -width + window.innerWidth,
						maxX: 0,
					},
				});
			}
		}, sliderRef);

		return () => ctx.kill();
	}, []);

	return (
		<div
			id="slider"
			className="slider bg-teal-500 flex flex-shrink-0 p-5 gap-10 w-fit pr-40"
			ref={sliderRef}
		>
			{data.testimonials.slice(0, 5).map((item, index) => {
				return (
					<Slide
						key={index}
						name={item.name}
						imageSource={item.img}
						content={item.desc}
					/>
				);
			})}
		</div>
	);
};
