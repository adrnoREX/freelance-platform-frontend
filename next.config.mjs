/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
  