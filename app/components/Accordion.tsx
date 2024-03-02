import { useEffect, useRef, useState } from "react";
import { data } from "../lib/data";
import gsap from "gsap";

interface AccordionProps {
  items: any[];
  active: number;
}

export const Accordion: React.FC<AccordionProps> = ({ items, active }) => {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(projectRefs.current, {
        width: (i) => (i === active ? "600px" : "200px"),
      });
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
  }, [active]);
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
};
