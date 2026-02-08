'use client';

import { useEffect } from 'react';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon';
// TODO: Update when iOS launches
const APP_STORE_URL = 'https://apps.apple.com/app/empire-tycoon/id000000000';

export default function GetEmpire() {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Detect iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      // For now, still go to Play Store since iOS isn't ready
      // Change to APP_STORE_URL when iOS launches
      window.location.href = PLAY_STORE_URL;
      return;
    }
    
    // Default to Play Store (Android + desktop + everything else)
    window.location.href = PLAY_STORE_URL;
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to store...</p>
      </div>
    </div>
  );
}
