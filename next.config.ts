import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // cacheComponents: true,
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "s3.miniapp.lol"
      },
      {
        protocol: "https",
        hostname: "s4.anilist.co"
      }
    ]
  }
};

export default nextConfig;
