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

  // Exponer variables de entorno del .env de la raíz al cliente de Next.js
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    OPENAI_MAX_TOKENS: process.env.OPENAI_MAX_TOKENS,
    CODA_API_KEY: process.env.CODA_API_KEY,
    CODA_DOC_ID: process.env.CODA_DOC_ID,
    CODA_TABLE_ID: process.env.CODA_TABLE_ID,
  },
};

export default nextConfig;
