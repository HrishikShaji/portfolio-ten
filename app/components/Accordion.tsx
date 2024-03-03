import { Ref, forwardRef, useEffect, useRef, useState } from "react";
import { data } from "../lib/data";
import gsap from "gsap";

interface AccordionProps {
  items: any[];
  active: number;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, active }, ref) => {
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    console.log(ref);

    useEffect(() => {
      let ctx = gsap.context(() => {
        const timeline = gsap.timeline();

        timeline
          .fromTo(
            projectRefs.current,
            {
              xPercent: -100,
            },
            {
              xPercent: 0,
              stagger: 0.25,
              scrollTrigger: {
                trigger: containerRef.current,
                start: "-50% 80%",
                end: () => `+=${projectRefs.current[0]?.offsetHeight}`,
                scrub: 1,
              },
            },
          )
          .fromTo(
            projectRefs.current,
            { width: "200px" },
            {
              duration: 0.5,
              width: (i) => (i === active ? "600px" : "200px"),
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                markers: true,
              },
            },
          );

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
  },
);

Accordion.displayName = "Accordion";

export default Accordion;
