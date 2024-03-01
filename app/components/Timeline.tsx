import { useEffect, useRef } from "react";
import { data } from "../lib/data";
import gsap from "gsap";

export const Timeline = () => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(itemRefs);
    let ctx = gsap.context(() => {
      gsap.set(itemRefs.current, {
        yPercent: 100,
        xPercent: 100,
      });
      gsap.to(itemRefs.current, {
        yPercent: 0,
        xPercent: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "top top",
          scrub: true,
          markers: true,
        },
      });
    }, containerRef);

    return () => ctx.kill();
  }, []);
  return (
    <div
      ref={containerRef}
      className="h-screen w-full flex items-center justify-center text-white"
    >
      <div className="grid grid-cols-2  w-[75%] h-[50%]">
        {data.education.data.map((item, i) => (
          <div
            className="p-5  "
            key={item.id}
            ref={(el) => (itemRefs.current[item.id] = el)}
          >
            <div className="bg-neutral-500 w-full h-full rounded-3xl flex items-center justify-center">
              <h1>{item.major}</h1>
            </div>
          </div>
        ))}
        {data.experience.data.map((item, i) => (
          <div
            className="p-5 "
            key={item.id}
            ref={(el) => (itemRefs.current[item.id] = el)}
          >
            <div className="bg-neutral-500 w-full h-full rounded-3xl flex items-center justify-center">
              <h1>{item.company}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
