import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.robynpreston.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
