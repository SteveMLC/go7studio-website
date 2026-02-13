import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Empire Tycoon - Referral Invite',
  description: 'You\'ve been invited to Empire Tycoon! Get 50 Platinum Points and 2x income boost for 1 hour when you join.',
  openGraph: {
    title: 'Join Empire Tycoon - Get Free Rewards!',
    description: 'Your friend invited you to Empire Tycoon. Get 50 PP + 2x income boost!',
    images: ['/games/empire-tycoon-og.jpg'],
  },
};

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
