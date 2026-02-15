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
      // Empire Tycoon - App Store (ready for iOS launch)
      {
        source: '/ios/empire',
        destination: 'https://apps.apple.com/app/empire-tycoon/id0000000000', // Update with real ID when live
        permanent: false,
      },
      // Empire Tycoon - Smart link (defaults to Play Store for now)
      {
        source: '/get/empire',
        destination: 'https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
