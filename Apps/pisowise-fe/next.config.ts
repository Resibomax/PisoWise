import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "i.pinimg.com",
      "i.ebayimg.com",
      "pisowise-receipts.s3.ap-southeast-1.amazonaws.com",
    ], // Add external domains here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
