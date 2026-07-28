import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "autoescolafillo.com",
      },
    ],
  },
};

export default nextConfig;
