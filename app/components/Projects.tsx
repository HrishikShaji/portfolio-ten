import { useEffect, useRef } from "react";
import { data } from "../lib/data";
import gsap from "gsap";

export const Projects = () => {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      projectRefs.current.forEach((el) => {
        const mouseEnter = (e: MouseEvent) => {
          gsap.fromTo(
            projectRefs.current,
            {
              scale: 1,
            },
            {
              scale: (i) => (projectRefs.current[i] === e.target ? 2 : 0.5),
              duration: 0.5,
            },
          );
        };
        const mouseLeave = (e: MouseEvent) => {
          gsap.to(projectRefs.current, {
            scale: 1,
            duration: 0.5,
          });
        };
        el?.addEventListener("mouseenter", mouseEnter);
        el?.addEventListener("mouseleave", mouseLeave);

        return () => {
          el?.removeEventListener("mouseenter", mouseEnter);
          el?.removeEventListener("mouseleave", mouseLeave);
        };
      });
    });

    return () => ctx.kill();
  }, []);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-[80%] h-[80%] grid grid-cols-4 gap-5">
        {data.projects.data.map((item, i) => (
          <div
            key={i}
            ref={(el) => (projectRefs.current[i] = el)}
            className="bg-white rounded-3xl flex items-center justify-center"
          >
            <h1>{item.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
