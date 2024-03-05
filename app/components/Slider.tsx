import { useLayoutEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { InertiaPlugin } from "gsap/all";

gsap.registerPlugin(Draggable, InertiaPlugin);

export const Slider = () => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelector(".cards");
      Draggable.create(cards, {
        type: "x",
        bounds: {
          maxX: 0,
          minX: window.innerWidth - cards.scrollWidth - 50,
        },
        inertia: true,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="cards">
          <div className="card">
            <img
              src="https://source.unsplash.com/random/900×700&1/?forest"
              alt=""
            />
          </div>
          <div className="card">
            <img
              src="https://source.unsplash.com/random/900×700&2/?forest"
              alt=""
            />
          </div>
          <div className="card">
            <img
              src="https://source.unsplash.com/random/900×700&3/?forest"
              alt=""
            />
          </div>
          <div className="card">
            <img
              src="https://source.unsplash.com/random/900×700&4/?forest"
              alt=""
            />
          </div>
          <div className="card">
            <img
              src="https://source.unsplash.com/random/900×700&5/?forest"
              alt=""
            />
          </div>
          <div className="card">
            <img
              src="https://source.unsplash.com/random/900×700&6/?forest"
              alt=""
            />
          </div>
          <div className="card">
            <img
              src="https://source.unsplash.com/random/900×700&7/?forest"
              alt=""
            />
          </div>
          <div className="card">
            <img
              src="https://source.unsplash.com/random/900×700&8/?forest"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
