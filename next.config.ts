import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://raw.githubusercontent.com/**")],
  },
};

export default nextConfig;
