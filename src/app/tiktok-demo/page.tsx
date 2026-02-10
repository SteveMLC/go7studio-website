'use client';

import { useState } from 'react';

export default function TikTokDemoPage() {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

  const handleLogin = () => {
    // Simulate TikTok OAuth redirect
    setStep(2);
  };

  const handleFileSelect = () => {
    setFileSelected(true);
  };

  const handleUpload = () => {
    setUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => {
          setSuccess(true);
        }, 500);
      }
      setProgress(p);
    }, 200);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
            G7
          </div>
          <h1 className="text-2xl font-bold">Go7Studio</h1>
          <p className="text-gray-400 text-sm">TikTok Content Manager</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center gap-8 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex flex-col items-center ${step >= s ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step > s ? 'bg-green-500' : step === s ? 'bg-cyan-400 text-black' : 'bg-gray-700'
              }`}>
                {step > s ? '✓' : s}
              </div>
              <span className="text-xs mt-1 text-gray-400">
                {s === 1 ? 'Connect' : s === 2 ? 'Upload' : 'Publish'}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Login */}
        {step === 1 && (
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Connect Your TikTok</h2>
            <p className="text-gray-400 text-sm mb-6">
              Authorize Go7Studio to post gaming content to your TikTok account using the Content Posting API.
            </p>
            <button
              onClick={handleLogin}
              className="w-full py-3 px-4 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              Login with TikTok
            </button>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Uses TikTok Login Kit for secure authentication
            </p>
          </div>
        )}

        {/* Step 2: Upload */}
        {step === 2 && !uploading && !success && (
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            {/* Connected Status */}
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-sm">Connected as <strong>@go7studio</strong></span>
            </div>

            <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
            
            {/* File Drop Zone */}
            <div 
              onClick={handleFileSelect}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                fileSelected 
                  ? 'border-orange-500 bg-orange-500/10' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
            >
              {fileSelected ? (
                <>
                  <div className="text-4xl mb-2">🎬</div>
                  <p className="font-medium">empire_tycoon_promo.mp4</p>
                  <p className="text-green-400 text-sm mt-1">5.4 MB • Ready to upload</p>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-2">📁</div>
                  <p className="text-gray-400">Click to select video</p>
                  <p className="text-gray-500 text-xs mt-1">MP4, MOV up to 50MB</p>
                </>
              )}
            </div>

            {/* Caption */}
            <div className="mt-4">
              <label className="text-sm text-gray-400 block mb-2">Caption</label>
              <textarea
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-sm resize-none h-20"
                defaultValue="🎮 Building my empire one business at a time! 💰 #EmpireTycoon #IdleGame #MobileGaming #Gaming"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {['#EmpireTycoon', '#IdleGame', '#MobileGaming', '#Gaming'].map(tag => (
                <span key={tag} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!fileSelected}
              className={`w-full mt-6 py-3 px-4 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
                fileSelected 
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400' 
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Upload to TikTok
            </button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Uses Content Posting API with video.upload scope
            </p>
          </div>
        )}

        {/* Step 3: Uploading Progress */}
        {uploading && !success && (
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 text-center">
            <h2 className="text-xl font-semibold mb-4">Publishing to TikTok...</h2>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm">
              {progress < 40 ? 'Uploading video...' : 
               progress < 70 ? 'Processing...' : 
               progress < 95 ? 'Publishing to TikTok...' : 'Almost done...'}
            </p>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-green-500/30 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Published!</h2>
            <p className="text-gray-400 mb-4">Your video is now live on TikTok</p>
            <a 
              href="https://tiktok.com/@go7studio" 
              target="_blank"
              className="text-cyan-400 hover:underline text-sm"
            >
              View on TikTok →
            </a>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-8">
          Go7Studio © 2026 • Powered by TikTok for Developers
        </p>
      </div>
    </main>
  );
}
