/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["static.guim.co.uk", "media.guim.co.uk"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
