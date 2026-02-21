import { redirect } from 'next/navigation';

// Bare /empire/invite with no code → redirect to Play Store
// This prevents 404 when deep link fires without a referral code
export default function InviteRedirectPage() {
  redirect('https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon');
}
