/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.vox-cdn.com',
      'thecinemaholic.com',
      'images.squarespace-cdn.com',
      'static1.colliderimages.com',
      'images.alphacoders.com',
      'www.biooko.net',
      'images.moviesanywhere.com',
      'hotcorn-cdn.s3.amazonaws.com',
      'static01.nyt.com',
      'media.newyorker.com',
      'static1.colliderimages.com',
    ],
  },
};

module.exports = nextConfig;
