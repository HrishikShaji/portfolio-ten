import { useRef } from "react";
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { data } from "../lib/data";
import Image from "next/image";

gsap.registerPlugin(Draggable, InertiaPlugin, useGSAP);

export const NewSlider = () => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      if (cell) {
        initCell({ element: cell, index: i });
      }
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

    function snapX(x: number) {
      return Math.round(x / cellWidth) * cellWidth;
    }

    function updateProgress() {
      animation.progress(myWrapper(draggable.x / wrapWidth));
    }

    function initCell({
      element,
      index,
    }: {
      element: HTMLDivElement;
      index: number;
    }) {
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
    <div className="flex flex-col items-center justify-center w-screen h-screen relative overflow-hidden">
      <div
        ref={pickerRef}
        className="relative h-[500px] w-screen overflow-hidden "
      >
        {data.testimonials.map((item, i) => (
          <div
            key={i}
            ref={(el) => (cellsRef.current[i] = el)}
            className="absolute top-0 left-0  h-[500px] w-[500px] flex-shrink-0 overflow-hidden bg-neutral-700 rounded-3xl flex-col"
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
