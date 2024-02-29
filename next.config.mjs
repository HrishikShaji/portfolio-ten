/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "wallpapercave.com",
				protocol: "https",
			},
		],
	},
};

export default nextConfig;
