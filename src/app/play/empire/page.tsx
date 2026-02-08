import { redirect } from 'next/navigation';

export default function PlayStoreEmpire() {
  redirect('https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon');
}

export const metadata = {
  title: 'Empire Tycoon - Download on Google Play',
  description: 'Download Empire Tycoon on Google Play Store',
};
