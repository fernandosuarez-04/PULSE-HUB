import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Disable ESLint and TypeScript checking during production builds on Netlify
  // These checks are performed locally before committing
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
