'use client';

import { useState, useEffect } from 'react';
import { useLeadStore } from '@/lib/leadStore';
import { FileText, ArrowRight, UserCheck, BarChart2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function HeroBanner() {
  const { openRfqModal, openSignInModal, openEnquiriesModal, buyerUser, leads } = useLeadStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userLeadsCount = buyerUser
    ? leads.filter(
        (l) =>
          l.phone.replace(/\D/g, '').includes(buyerUser.phone.replace(/\D/g, '')) ||
          l.customerName.toLowerCase() === buyerUser.name.toLowerCase()
      ).length
    : 0;

  return (
    <section className="relative bg-[#2b3377] text-white overflow-hidden pt-16 lg:pt-24 pb-24 lg:pb-32 min-h-[520px] lg:min-h-[600px] xl:min-h-[660px] flex flex-col justify-between">
      
      {/* IndiaMART Concentric Circle Lines Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-end">
        <svg
          className="w-[1100px] h-[1100px] -mr-40 opacity-15"
          viewBox="0 0 1000 1000"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="500" cy="500" r="140" stroke="white" strokeWidth="1.5" />
          <circle cx="500" cy="500" r="260" stroke="white" strokeWidth="1.5" />
          <circle cx="500" cy="500" r="400" stroke="white" strokeWidth="1.5" />
          <circle cx="500" cy="500" r="560" stroke="white" strokeWidth="1.5" />
          <circle cx="500" cy="500" r="720" stroke="white" strokeWidth="1.5" />
          <circle cx="500" cy="500" r="880" stroke="white" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Main Wide Content Area */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 my-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
          
          {/* Left Title & Tagline */}
          <div className="space-y-4 text-center lg:text-left max-w-3xl">
            {mounted && buyerUser?.isLoggedIn && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs font-semibold text-emerald-300">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>Welcome back, <strong className="text-white">{buyerUser.name}</strong> ({buyerUser.companyName || 'Verified Buyer'})</span>
              </div>
            )}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              India's Largest Online <span className="font-extrabold text-white">B2B Marketplace</span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-200 font-medium max-w-2xl leading-relaxed">
              Connecting 21 Cr+ Buyers with Direct Factory Quality & Wholesale Rates
            </p>
          </div>

          {/* Right Action Buttons (Matching IndiaMART 3 White Pill Buttons in Screenshot) */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-4 flex-shrink-0">
            {/* Post Requirement Button */}
            <button
              onClick={() => openRfqModal()}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#2b3377] font-bold text-xs sm:text-sm shadow-lg transition flex items-center gap-2 group hover:scale-105 cursor-pointer"
            >
              <FileText size={17} className="text-[#2b3377]" />
              <span>Post Requirement</span>
              <ArrowRight size={15} className="text-[#2b3377] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Instant RFQ Button */}
            <Link
              href="/rfq"
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#00a699] font-bold text-xs sm:text-sm shadow-lg transition flex items-center gap-2 group hover:scale-105"
            >
              <BarChart2 size={17} className="text-[#00a699]" />
              <span>Instant RFQ</span>
              <ArrowRight size={15} className="text-[#00a699] group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Buyer Sign In / My Enquiries Button */}
            {mounted && buyerUser?.isLoggedIn ? (
              <Link
                href="/buyer"
                className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#00a699] font-bold text-xs sm:text-sm shadow-lg transition flex items-center gap-2.5 group hover:scale-105 border-2 border-emerald-400"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[#2b3377]">
                  My Enquiries <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">{userLeadsCount}</span>
                </span>
                <ArrowRight size={15} className="text-[#00a699] group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <button
                onClick={() => openSignInModal()}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#ff7e00] font-bold text-xs sm:text-sm shadow-lg transition flex items-center gap-2 group hover:scale-105 cursor-pointer"
              >
                <UserCheck size={17} className="text-[#ff7e00]" />
                <span>Sign In</span>
                <ArrowRight size={15} className="text-[#ff7e00] group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Stats Row inside Hero */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-6 mt-8 sm:mt-10 border-t border-white/10 mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center justify-between gap-6 text-xs sm:text-sm">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">21Cr+</span>
            <span className="text-slate-200 font-bold uppercase text-xs tracking-wider">Buyers</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">10,000+</span>
            <span className="text-slate-200 font-bold uppercase text-xs tracking-wider">Catalogue Items</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">50+</span>
            <span className="text-slate-200 font-bold uppercase text-xs tracking-wider">Categories</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white">30 Years</span>
            <span className="text-slate-200 font-bold uppercase text-xs tracking-wider">Empowering Businesses</span>
          </div>
        </div>
      </div>

      {/* Bottom Generous Gradient Fade: Light subtle top fade merging into solid pure white at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64 sm:h-80 lg:h-[380px] pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.10) 38%, rgba(255,255,255,0.26) 54%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0.85) 85%, rgba(255,255,255,0.98) 94%, rgba(255,255,255,1) 100%)',
        }}
      />

    </section>
  );
}
