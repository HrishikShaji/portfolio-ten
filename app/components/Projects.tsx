import { data } from "../lib/data";
import { Accordion } from "./Accordion";

export const Projects = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className=" flex h-[75%] flex-col gap-2">
        <Accordion active={0} items={data.projects.data.slice(0, 4)} />
        <Accordion active={1} items={data.projects.data.slice(4, 8)} />
        <Accordion active={2} items={data.projects.data.slice(8, 12)} />
      </div>
    </div>
  );
};
