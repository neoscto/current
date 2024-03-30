/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose', '@typegoose/typegoose']
  }
};

module.exports = nextConfig;
