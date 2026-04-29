/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "play.google.com",
      },
    ],
  },
  async redirects() {
    return [
      // Empire Tycoon - Smart link (defaults to Play Store; restore /ios/empire when iOS ships)
      {
        source: '/get/empire',
        destination: 'https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
