import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/get-data",
        destination:
          "https://api.jellyfaas.com/spacestation-cvm2ffq9io6g00dj7vpg-1-s",
      },
    ];
  },
};

export default nextConfig;
