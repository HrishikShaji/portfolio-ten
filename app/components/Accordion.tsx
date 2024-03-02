import { useEffect, useRef, useState } from "react";
import { data } from "../lib/data";
import gsap from "gsap";

interface AccordionProps {
  items: any[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      projectRefs.current.forEach((el) => {
        const width = el?.getBoundingClientRect().width;
        const mouseEnter = (e: MouseEvent) => {
          gsap.to(projectRefs.current, {
            width: (i) =>
              projectRefs.current[i] === el ? width * 5 : width * 0.2,
          });
        };
        const mouseLeave = (e: MouseEvent) => {
          gsap.to(projectRefs.current, {
            width: width,
          });
        };
        el?.addEventListener("mouseenter", mouseEnter);
        el?.addEventListener("mouseleave", mouseLeave);

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
          className="bg-white rounded-3xl flex w-full items-center justify-center"
        >
          <h1>{i}</h1>
        </div>
      ))}
    </div>
  );
};
