const isProd = process.env.NODE_ENV === 'production';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? '/mohtasimhadi.github.io' : '',
  basePath: isProd ? '/mohtasimhadi.github.io' : '',
  output: 'export'
};

export default nextConfig;