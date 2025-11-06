/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/projects',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },

  // Disable features not compatible with static export
  experimental: {
    // None needed for static export
  },

  // Optimize for production
  compress: true,
  poweredByHeader: false,

  // Ensure clean URLs
  async redirects() {
    return [];
  },
};

export default nextConfig;
