import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eager-ardinghelli-jttzxw95u.storage.c2.liara.space',
      },
    ],
  },
};

export default nextConfig;
