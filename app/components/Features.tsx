"use client";

import { useEffect, useRef } from "react";
import { data } from "../lib/data";
import gsap from "gsap";

export const Features = () => {
  const featureRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      featureRefs.current.forEach((el, i) => {
        gsap.set(el, { xPercent: i % 2 === 0 ? -100 : 100 });
        gsap.to(el, {
          xPercent: 0,
          scrollTrigger: {
            trigger: el,
            start: `top 75%`,
            end: `top center`,
            scrub: 1,
          },
        });
      });
    }, mainContainerRef);

    return () => ctx.kill();
  }, []);

  return (
    <div ref={mainContainerRef} className="flex flex-col gap-10 p-10">
      {data.features.data.map((item, i) => (
        <div className="p-5 text-center" key={i}>
          <h1
            ref={(el) => (featureRefs.current[i] = el)}
            className="text-6xl font-bold text-white"
          >
            {item.title}
          </h1>
        </div>
      ))}
    </div>
  );
};
