/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["utfs.io"] },
  async rewrites() {
    return [
      {
        source: "/ads.txt",
        destination: "/public/ads.txt", // Assuming you put the ads.txt in your public folder
      },
    ];
  },
};

module.exports = nextConfig;
