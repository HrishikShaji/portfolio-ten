import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const Slide = ({ imageSource, content }) => {
	return (
		<div className="slide">
			<div className="preview">
				<img src={imageSource} alt="The Plant" draggable="false" />
			</div>
			<div className="infos">
				<h3>{content.date}</h3>
				<h2>{content.desc}</h2>
			</div>
		</div>
	);
};

export const Slider = () => {
	const sliderRef = useRef(null);

	useEffect(() => {
		console.log(sliderRef.current.clientWidth, sliderRef.current.innerWidth);
		Draggable.create(sliderRef.current, {
			type: "x",
			/*bounds: {
					    minX: -sliderRef.current.clientWidth + window.innerWidth * 0.88,
					    maxX: 0
					  }*/
		});
	}, []);

	return (
		<div id="slider" className="slider" ref={sliderRef}>
			{pictures.map((item, index) => {
				return (
					<Slide key={index} imageSource={item.source} content={item.content} />
				);
			})}
		</div>
	);
};
