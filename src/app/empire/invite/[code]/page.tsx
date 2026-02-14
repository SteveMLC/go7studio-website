'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ReferralPage() {
  const params = useParams();
  const code = (params.code as string)?.toUpperCase() || '';
  const [countdown, setCountdown] = useState(3);
  const [showManual, setShowManual] = useState(false);

  // NOTE: Must match the Android applicationId in the app.
  const playStoreUrl = `https://play.google.com/store/apps/details?id=com.go7studio.empire_tycoon&referrer=${encodeURIComponent(code)}`;
  const appDeepLink = `empiretycoon://refer?code=${code}`;

  useEffect(() => {
    // Try to open the app immediately
    window.location.href = appDeepLink;

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowManual(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // After 2.5 seconds, redirect to Play Store (app link should have worked by now if installed)
    const redirect = setTimeout(() => {
      window.location.href = playStoreUrl;
    }, 2500);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [appDeepLink, playStoreUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-black/40 backdrop-blur-sm rounded-2xl p-8 text-center border border-amber-500/30">
        {/* Logo/Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
          <span className="text-4xl">🏢</span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">
          Empire Tycoon Invite
        </h1>
        
        <p className="text-amber-200 mb-6">
          You&apos;ve been invited to join Empire Tycoon!
        </p>

        {/* Referral Code Display */}
        <div className="bg-amber-500/20 border border-amber-500/40 rounded-xl p-4 mb-6">
          <p className="text-amber-300 text-sm mb-1">Your referral code:</p>
          <p className="text-3xl font-mono font-bold text-amber-400 tracking-wider">
            {code}
          </p>
        </div>

        {/* Rewards */}
        <div className="text-left bg-white/5 rounded-xl p-4 mb-6">
          <p className="text-amber-300 font-semibold mb-2">🎁 You&apos;ll receive:</p>
          <ul className="text-white/80 space-y-1 text-sm">
            <li>• 50 Platinum Points</li>
            <li>• 1.5x Income Boost for 30 minutes</li>
          </ul>
        </div>

        {/* Status */}
        {!showManual ? (
          <div className="text-amber-200 mb-4">
            <div className="animate-pulse mb-2">Opening Empire Tycoon...</div>
            <div className="text-sm text-amber-300/60">
              Redirecting to Play Store in {countdown}s
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-amber-200 text-sm mb-4">
              App not opening? Use these options:
            </p>
            
            <a
              href={playStoreUrl}
              className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-3 px-6 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all"
            >
              📱 Get on Play Store
            </a>

            <div className="text-amber-300/60 text-xs mt-4 p-3 bg-white/5 rounded-lg">
              <p className="font-semibold mb-1">Already have the app?</p>
              <p>Open Empire Tycoon → Social Hub → Enter code: <span className="font-mono font-bold text-amber-400">{code}</span></p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-white/10">
          <Link href="/" className="text-amber-400/60 text-sm hover:text-amber-400">
            ← Back to Go7Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
