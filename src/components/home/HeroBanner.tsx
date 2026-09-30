'use client';

import { useState, useEffect } from 'react';
import { useLeadStore } from '@/lib/leadStore';
import { FileText, ArrowRight, UserCheck, BarChart2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function HeroBanner() {
  const { openRfqModal } = useLeadStore();

  return (
    <section className="relative bg-[#2b3377] text-white overflow-hidden pt-12 sm:pt-16 lg:pt-24 pb-20 sm:pb-24 lg:pb-32 min-h-[460px] sm:min-h-[520px] lg:min-h-[600px] xl:min-h-[660px] flex flex-col justify-between">
      
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
          <div className="space-y-3 sm:space-y-4 text-center lg:text-left max-w-3xl">
            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              India's Largest Online <span className="font-extrabold text-white">B2B Marketplace</span>
            </h1>
            <p className="text-xs sm:text-lg text-slate-200 font-medium max-w-2xl leading-relaxed">
              Connecting 21 Cr+ Buyers with Direct Factory Quality & Wholesale Rates
            </p>
          </div>

          {/* Right Action Buttons: Completely Identical, Uniform Pill Buttons on Both Mobile & Desktop */}
          <div className="w-full max-w-md sm:max-w-none sm:w-auto grid grid-cols-2 gap-2.5 sm:flex sm:flex-row sm:gap-4 flex-shrink-0">
            {/* Post Requirement Button */}
            <button
              onClick={() => openRfqModal()}
              className="w-full sm:w-auto px-4 sm:px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#2b3377] font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-1.5 sm:gap-2 group hover:scale-105 cursor-pointer text-center"
            >
              <FileText size={16} className="text-[#00a699] shrink-0" />
              <span className="truncate">Post Requirement</span>
              <ArrowRight size={14} className="text-[#00a699] shrink-0 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Instant RFQ Button */}
            <Link
              href="/rfq"
              className="w-full sm:w-auto px-4 sm:px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#2b3377] font-bold text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-1.5 sm:gap-2 group hover:scale-105 text-center"
            >
              <BarChart2 size={16} className="text-[#00a699] shrink-0" />
              <span className="truncate">Instant RFQ</span>
              <ArrowRight size={14} className="text-[#00a699] shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Stats Row inside Hero */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-6 mt-6 sm:mt-10 border-t border-white/10 mb-8 sm:mb-12">
        <div className="grid grid-cols-2 md:flex items-center justify-between gap-4 sm:gap-6 text-xs sm:text-sm">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-3xl font-black text-white">21Cr+</span>
            <span className="text-slate-200 font-bold uppercase text-[10px] sm:text-xs tracking-wider">Buyers</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-3xl font-black text-white">10,000+</span>
            <span className="text-slate-200 font-bold uppercase text-[10px] sm:text-xs tracking-wider">Catalogue Items</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-3xl font-black text-white">50+</span>
            <span className="text-slate-200 font-bold uppercase text-[10px] sm:text-xs tracking-wider">Categories</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-3xl font-black text-white">30 Years</span>
            <span className="text-slate-200 font-bold uppercase text-[10px] sm:text-xs tracking-wider">Empowering Businesses</span>
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
