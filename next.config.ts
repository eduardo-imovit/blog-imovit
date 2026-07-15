import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignora erros de ESLint durante o build (validar depois com lint local)
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;