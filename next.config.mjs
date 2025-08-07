/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost:8800',
          pathname: '/uploads/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  