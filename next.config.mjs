/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "wallpapercave.com",
				protocol: "https",
			},
			{
				hostname: "images.pexels.com",
				protocol: "https",
			},
		],
	},
};

export default nextConfig;
