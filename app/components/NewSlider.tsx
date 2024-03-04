import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Draggable, InertiaPlugin);

export const NewSlider = () => {
	const pickerRef = useRef(null);
	const cellsRef = useRef([]);

	useGSAP(() => {
		gsap.defaults({ ease: "none" });
		const picker = pickerRef.current;
		const cells = cellsRef.current;
		const proxy = document.createElement("div");
		const myWrapper = gsap.utils.wrap(0, 1);

		const cellWidth = 450;

		const numCells = cells.length;
		const cellStep = 1 / numCells;
		const wrapWidth = cellWidth * numCells;

		const baseTl = gsap.timeline({ paused: true });

		gsap.set(picker, {
			width: wrapWidth - cellWidth,
		});
		cells.forEach((cell, i) => {
			initCell(cell, i);
		});

		const animation = gsap
			.timeline({ repeat: -1, paused: true })
			.add(baseTl.tweenFromTo(1, 2));

		const draggable = Draggable.create(proxy, {
			type: "x",
			trigger: picker,
			inertia: true,
			onDrag: updateProgress,
			onThrowUpdate: updateProgress,
			snap: {
				x: snapX,
			},
			onThrowComplete: () => {
				console.log("onThrowComplete");
				// TODO: animation that injects selected card title
			},
		})[0];

		function snapX(x) {
			return Math.round(x / cellWidth) * cellWidth;
		}

		function updateProgress() {
			animation.progress(myWrapper(draggable.x / wrapWidth));
		}

		function initCell(element, index) {
			gsap.set(element, {
				width: cellWidth,
				scale: 0.6,
				x: -cellWidth,
			});

			const tl = gsap
				.timeline({ repeat: 1 })
				.to(element, { duration: 1, x: `+=${wrapWidth}` }, 0)
				.to(
					element,
					{
						duration: cellStep,
						color: "#009688",
						scale: 1,
						repeat: 1,
						yoyo: true,
					},
					0.5 - cellStep,
				);

			baseTl.add(tl, index * -cellStep);
		}
	}, []);

	return (
		<div className="slider">
			<div ref={pickerRef} className="picker">
				{Array.from({ length: 8 }, (_, index) => (
					<div
						key={index}
						ref={(el) => (cellsRef.current[index] = el)}
						className="cell"
					>
						<div className="cell-content">{`Card ${index + 1}`}</div>
					</div>
				))}
			</div>
		</div>
	);
};
