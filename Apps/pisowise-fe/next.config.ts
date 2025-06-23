import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.pinimg.com", "i.ebayimg.com"], // Add external domains here
  },
};

export default nextConfig;
