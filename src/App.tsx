import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Share2,
  Check,
} from 'lucide-react';

import { DEFAULT_PROFILE, ProfileConfig } from './types';
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/HeroSection';
import ProfileSection from './components/ProfileSection';
import FeaturedCard from './components/FeaturedCard';
import MenuCard from './components/MenuCard';
import MusicToggle from './components/MusicToggle';
import FidzDevLogo from './components/FidzDevLogo';

export default function App() {
  const [profile, setProfile] = useState<ProfileConfig>(DEFAULT_PROFILE);
  const [showToast, setShowToast] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor document scrolling for navbar blending
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize and load custom configuration from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fidzdev_premium_bio_config');
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('LocalStorage access is blocked in this container/sandbox environment:', e);
    }
  }, []);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  // Robust clipboard copy with fallback for sandboxed frames
  const handleCopyLink = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const link = window.location.href;
    
    if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(link)
        .then(() => triggerToast())
        .catch((err) => {
          console.warn('Navigator clipboard write failed, utilizing fallback:', err);
          fallbackCopyText(link);
        });
    } else {
      fallbackCopyText(link);
    }
  };

  const fallbackCopyText = (text: string) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      // Fixed positioning off-screen
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        triggerToast();
      } else {
        alert(`Salin link manual: ${text}`);
      }
    } catch (err) {
      console.error('Fallback copy method failed:', err);
    }
  };

  const getGlowTextClass = () => {
    switch (profile.themeColor) {
      case 'blue': return 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]';
      case 'green': return 'text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]';
      case 'purple': return 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]';
      default: return 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]'; // cyan
    }
  };

  const getBorderThemeClass = () => {
    switch (profile.themeColor) {
      case 'blue': return 'border-blue-500/20 hover:border-blue-500/40';
      case 'green': return 'border-green-500/20 hover:border-green-500/40';
      case 'purple': return 'border-purple-500/20 hover:border-purple-500/40';
      default: return 'border-cyan-500/20 hover:border-cyan-500/40';
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between font-sans selection:bg-cyan-500/35 selection:text-white">
      {/* 1. DYNAMIC CYBER BACKGROUND (Particles, blur, zoom, glow, mouse parallax) */}
      <ParticleBackground coverUrl={profile.coverUrl} themeColor={profile.themeColor} />

      {/* 2. TOP FLOATING ACTIONS CONTROL BAR */}
      <header className={`fixed top-0 inset-x-0 z-40 px-4 py-1.5 md:py-2 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-black/35 backdrop-blur-[24px] border-white/5 shadow-2xl shadow-cyan-950/15' 
          : 'bg-transparent border-transparent'
      }`}>
        <div className="max-w-lg mx-auto flex items-center justify-between h-14">
          {/* Logo Brand Title with Custom Glow and Slanted Icon */}
          <div className="flex items-center gap-2.5 select-none hover:scale-105 transition-all duration-300 cursor-pointer">
            <FidzDevLogo className="h-8 md:h-9 w-[85px] md:w-[120px]" />
          </div>

          {/* Action buttons (MUSIC on left, SHARE on right) */}
          <div className="flex items-center gap-2.5">
            {/* Music ambient Toggle */}
            <MusicToggle themeColor={profile.themeColor} />

            {/* Copy Bio Link Button */}
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center p-2 rounded-xl bg-white/[0.03] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08] hover:border-cyan-400/40 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] backdrop-blur-md transition-all duration-300 cursor-pointer shadow-md"
              title="Copy Profile URL"
              id="share-button-top"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. MAIN CONTENTS VIEWPORT (Strictly centered phone preview card on Desktop, fluid on Mobile) */}
      <main className="flex-1 w-full max-w-xl mx-auto md:my-14 md:shadow-[0_12px_60px_rgba(0,0,0,0.85)] md:bg-[#04081c]/65 md:backdrop-blur-2xl md:ring-1 md:ring-white/5 md:rounded-[36px] overflow-hidden flex flex-col pb-16">
        
        {/* 1. CINEMATIC COVER BANNER */}
        <HeroSection coverUrl={profile.coverUrl} themeColor={profile.themeColor} />

        {/* 2. PROFILE PROFILE DETAILS */}
        <ProfileSection
          name={profile.name}
          username={profile.username}
          bio={profile.bio}
          avatarUrl={profile.avatarUrl}
          themeColor={profile.themeColor}
          whatsApp={profile.whatsApp}
          instagram={profile.instagram}
          tikTok={profile.tikTok}
          email={profile.email}
        />

        {/* 5. HERO CARD #1: Website Top Up (Neon styled shine block) */}
        <div className="-mt-3 mb-2.5">
          <FeaturedCard
            url={profile.topUpUrl}
            title={profile.topUpTitle}
            description={profile.topUpDesc}
            themeColor={profile.themeColor}
          />
        </div>

        {/* 6. KUROPEDIA-STYLE LINK MENU LISTING */}
        <div className="space-y-0.5">
          <MenuCard
            title="Tentang Saya"
            description="Lihat profil, karya, dan perjalanan digital saya."
            iconName="person"
            url="https://porto-wheat-five.vercel.app/"
            themeColor={profile.themeColor}
          />

          <MenuCard
            title="WhatsApp"
            description="Jika ada yang mau tanya monggo boleh wa saya"
            iconName="MessageSquare"
            url={profile.whatsApp}
            themeColor={profile.themeColor}
          />

          <MenuCard
            title="Update Terbaru Instagram"
            description="Follow akun saya"
            iconName="Instagram"
            url={profile.instagram}
            themeColor={profile.themeColor}
          />

          <MenuCard
            title="TikTok"
            description="Follow akun tiktok saya"
            iconName="Video"
            url={profile.tikTok}
            themeColor={profile.themeColor}
          />

          <MenuCard
            title="Email"
            description="Jika mau diskusi boleh lewat email"
            iconName="Mail"
            url={profile.email}
            themeColor={profile.themeColor}
          />
        </div>

        {/* 8. MINI UTILITY BAR - COPYS LINK PROMPT */}
        <div className="text-center mt-3 mb-2">
          <button
            onClick={handleCopyLink}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs text-slate-400 hover:text-white rounded-full bg-white/5 border border-white/5 hover:border-white/10 cursor-pointer transition-all ${getBorderThemeClass()}`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan bio ini ke Bio Sosial Media Anda</span>
          </button>
        </div>

      </main>

      {/* 4. FOOTER CREDITS METADATA */}
      <footer className="w-full py-8 text-center text-xs text-slate-550 border-t border-white/5 bg-[#01030d] z-10 relative">
        <div className="max-w-xl mx-auto px-4 flex flex-col sm:flex-row items-center sm:justify-between gap-3">
          <p className="font-mono text-[11px] tracking-wide text-slate-500">
            &copy; 2026 <span className={getGlowTextClass()}>FidzDev</span>. All Rights Reserved.
          </p>
          <p className="text-slate-500">
            Made with <span className="text-red-500 animate-pulse inline-block">💙</span> by <a href="https://instagram.com/haofizzz" target="_blank" rel="noopener" className="hover:text-white font-semibold transition-colors">Hafidh</a>
          </p>
        </div>
      </footer>

      {/* 5. CUSTOM FLOATING TOAST POPUPS (✓ Link Berhasil Disalin) */}
      <AnimatePresence>
        {showToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 w-full max-w-sm">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#0a0f29]/95 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.35)] backdrop-blur-xl"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-5.5 h-5.5 rounded-full bg-cyan-400/25 text-cyan-300">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-xs font-bold font-mono tracking-wide text-slate-100 uppercase">
                ✓ Link berhasil disalin
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
