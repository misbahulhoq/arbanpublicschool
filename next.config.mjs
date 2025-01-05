/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV == "production",
  },
};

export default nextConfig;
