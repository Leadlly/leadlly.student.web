/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "leadlly-questions-options.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
