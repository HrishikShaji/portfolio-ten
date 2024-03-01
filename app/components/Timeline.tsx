import { data } from "../lib/data";

export const Timeline = () => {
	return (
		<div className="h-screen w-full flex items-center justify-center text-white">
			<div className="grid grid-cols-2  w-[75%] h-[50%]">
				{data.education.data.map((item, i) => (
					<div className="p-5  " key={i}>
						<div className="bg-neutral-500 w-full h-full rounded-3xl flex items-center justify-center">
							<h1>{item.major}</h1>
						</div>
					</div>
				))}
				{data.experience.data.map((item, i) => (
					<div className="p-5 " key={i}>
						<div className="bg-neutral-500 w-full h-full rounded-3xl flex items-center justify-center">
							<h1>{item.company}</h1>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
