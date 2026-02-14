'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Main Card */}
        <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 text-center border border-amber-500/20 shadow-2xl shadow-amber-500/10">
          
          {/* Game Logo */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl blur-xl opacity-50" />
            <Image
              src="/images/games/empire-tycoon/icon.jpg"
              alt="Empire Tycoon"
              width={96}
              height={96}
              className="relative rounded-2xl shadow-lg border-2 border-amber-500/30"
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent mb-2">
            Empire Tycoon
          </h1>
          
          <p className="text-amber-100/80 mb-6 text-lg">
            You&apos;ve been invited to build your empire!
          </p>

          {/* Referral Code Display */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 rounded-xl blur-sm" />
            <div className="relative bg-slate-800/80 border border-amber-500/40 rounded-xl p-5">
              <p className="text-amber-300/80 text-sm font-medium mb-1 uppercase tracking-wider">Your Invite Code</p>
              <p className="text-4xl font-mono font-bold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent tracking-widest">
                {code}
              </p>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="mb-6">
            <p className="text-amber-300 font-semibold mb-3 text-sm uppercase tracking-wider">
              🎁 Your Welcome Bonus
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* Platinum Points Card */}
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-900/20 border border-purple-500/30 rounded-xl p-4">
                <div className="text-3xl mb-1">💎</div>
                <div className="text-2xl font-bold text-purple-300">50</div>
                <div className="text-xs text-purple-300/70 font-medium">Platinum Points</div>
              </div>
              
              {/* Income Boost Card */}
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-900/20 border border-amber-500/30 rounded-xl p-4">
                <div className="text-3xl mb-1">⚡</div>
                <div className="text-2xl font-bold text-amber-300">1.5x</div>
                <div className="text-xs text-amber-300/70 font-medium">Income • 30 min</div>
              </div>
            </div>
          </div>

          {/* Status */}
          {!showManual ? (
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 text-amber-200 mb-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span>Opening Empire Tycoon...</span>
              </div>
              <div className="text-sm text-amber-300/50">
                Redirecting to Play Store in {countdown}s
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <a
                href={playStoreUrl}
                className="group block w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold py-4 px-6 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  Get on Google Play
                </span>
              </a>

              <div className="text-amber-300/60 text-sm mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="font-semibold text-amber-200 mb-2">Already have the app?</p>
                <p>Open Empire Tycoon → Social Hub → Enter code:</p>
                <p className="font-mono font-bold text-amber-400 text-lg mt-1">{code}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-amber-400/50 text-sm hover:text-amber-400 transition-colors">
            ← Back to Go7Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
