import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["100.64.0.2", "192.168.0.156"],
  async redirects() {
    return [
      { source: "/karate-university", destination: "/karate", permanent: true },
    ];
  },
};

export default nextConfig;
