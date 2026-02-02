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
      },
      {
        protocol: "https",
        hostname: "supabase.miniapp.lol"
      },
      {
        protocol: "http",
        hostname: "sv12.albookz.com"
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
      {
        source: '/fonts/:path*.mkv', // مسیر فایل‌های ماتروسکا
        headers: [
          {
            key: 'Content-Type',
            value: 'video/x-matroska',
          },
          {
            key: 'Content-Disposition',
            value: 'inline', // اجبار به پخش به جای دانلود
          },
        ],
      },
    ];
  },
};

export default nextConfig;
