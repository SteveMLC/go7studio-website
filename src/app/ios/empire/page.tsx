import { redirect } from 'next/navigation';

// TODO: Update with real App Store URL when iOS version launches
const APP_STORE_URL = 'https://apps.apple.com/app/empire-tycoon/id000000000';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon';

export default function AppStoreEmpire() {
  // For now, redirect to Play Store with a note
  // Update APP_STORE_URL when iOS launches
  redirect(PLAY_STORE_URL);
}

export const metadata = {
  title: 'Empire Tycoon - Download on App Store',
  description: 'Download Empire Tycoon on the App Store',
};
