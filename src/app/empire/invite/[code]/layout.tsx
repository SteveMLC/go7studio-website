import type { Metadata } from 'next';

const APP_PACKAGE = 'com.go7studio.empire_tycoon';
const APP_NAME = 'Empire Tycoon';

export const metadata: Metadata = {
  title: 'Join Empire Tycoon - Referral Invite',
  description:
    "You've been invited to Empire Tycoon! Get 50 Platinum Points and 1.5x income boost for 30 minutes when you join.",
  openGraph: {
    title: 'Join Empire Tycoon - Get Free Rewards!',
    description: 'Your friend invited you to Empire Tycoon. Get 50 PP + 1.5x income boost!',
    images: ['/games/empire-tycoon-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Empire Tycoon - Get Free Rewards!',
    description: 'Your friend invited you to Empire Tycoon. Get 50 PP + 1.5x income boost!',
    images: ['/games/empire-tycoon-og.jpg'],
  },
};

export default function ReferralLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { code: string };
}) {
  const code = (params.code || '').trim().toUpperCase();
  const canonical = `https://www.go7studio.com/empire/invite/${encodeURIComponent(code)}`;
  const deepLink = `empiretycoon://refer?code=${encodeURIComponent(code)}`;

  // Basic structured data so Google can parse a valid item (Rich Results Test was showing "No items detected").
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Join Empire Tycoon - Referral Invite',
    description:
      "You've been invited to Empire Tycoon! Get 50 Platinum Points and 1.5x income boost for 30 minutes when you join.",
    url: canonical,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Go7Studio',
      url: 'https://www.go7studio.com',
    },
    potentialAction: {
      '@type': 'ViewAction',
      target: [deepLink],
    },
  };

  return (
    <>
      {/* App Links (Facebook/Apple/Google supported) */}
      <meta property="al:android:app_name" content={APP_NAME} />
      <meta property="al:android:package" content={APP_PACKAGE} />
      <meta property="al:android:url" content={deepLink} />
      <meta property="al:web:url" content={canonical} />
      <link rel="canonical" href={canonical} />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {children}
    </>
  );
}
