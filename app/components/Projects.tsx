import { data } from "../lib/data";
import { Accordion } from "./Accordion";

export const Projects = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-[80%] h-[80%]  flex flex-col gap-2">
        <Accordion items={data.projects.data.slice(0, 4)} />
        <Accordion items={data.projects.data.slice(4, 8)} />
        <Accordion items={data.projects.data.slice(8, 12)} />
      </div>
    </div>
  );
};
