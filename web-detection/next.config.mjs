/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/", // automatically becomes /docs/with-basePath
        destination: "/prediction", // automatically becomes /docs/another
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
