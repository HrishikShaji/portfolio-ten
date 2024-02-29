"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { data } from "../lib/data";

export const About = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(imageRef.current, { yPercent: -200, xPercent: 10, scale: 0.5 });

      const timeline = gsap.timeline();
      timeline
        .to(imageRef.current, {
          yPercent: -50,
          xPercent: 0,
          scale: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top 60%",
            scrub: 1,
            markers: true,
          },
        })
        .fromTo(
          imageRef.current,
          { yPercent: -50, xPercent: 0, scale: 1 },
          {
            immediateRender: false,
            yPercent: 0,
            xPercent: 0,
            scale: 1.5,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 40%",
              end: "bottom bottom",
              scrub: 1,
              markers: true,
            },
          },
        );
    }, containerRef);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex items-center justify-center"
    >
      <Image
        ref={imageRef}
        src={data.personal.profileImg}
        alt=""
        height={1000}
        width={1000}
        className="object-cover h-[500px] w=[500px] rounded-3xl"
      />
    </div>
  );
};
