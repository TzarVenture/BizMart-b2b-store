'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Search, Sparkles, Clock, Bookmark, X, ArrowRight } from 'lucide-react';

export default function AIProductFinder() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [imageKeyword, setImageKeyword] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageKeyword.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(imageKeyword.trim())}`);
    }
  };

  return (
    <>
      <section
        className="bg-gradient-to-r from-[#221c61] via-[#1a214d] to-[#141533] rounded-3xl p-8 sm:p-12 lg:p-14 text-white shadow-xl relative overflow-hidden my-12 sm:my-16 border border-indigo-900/60"
        data-aos="fade-up"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Left Text */}
          <div className="space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-indigo-200 text-xs font-bold tracking-wider uppercase border border-white/10">
              <Sparkles size={14} className="text-yellow-400" />
              <span>Advanced AI Visual Search</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Find Any Product Instantly with Lens
            </h3>
            <p className="text-sm sm:text-base text-indigo-200 max-w-xl leading-relaxed">
              Upload any product photograph or describe technical specifications to discover exact and equivalent items from our verified catalogue.
            </p>

            {/* Sub-tabs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-3 text-xs sm:text-sm font-semibold text-indigo-200">
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1.5 hover:text-white transition"
              >
                <Camera size={16} className="text-[#00a699]" />
                <span>Visual Camera Search</span>
              </button>
              <span>•</span>
              <a href="/products" className="flex items-center gap-1.5 hover:text-white transition">
                <Clock size={16} />
                <span>Complete Catalogue</span>
              </a>
              <span>•</span>
              <a href="/rfq" className="flex items-center gap-1.5 hover:text-white transition">
                <Bookmark size={16} />
                <span>Consolidated RFQ Basket</span>
              </a>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setIsOpen(true)}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-[#221c61] font-black text-sm sm:text-base shadow-2xl transition flex items-center gap-2.5 group hover:scale-105"
            >
              <Camera size={20} className="text-[#00a699] group-hover:scale-110 transition-transform" />
              <span>Search with AI Lens</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* Visual Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden text-slate-800 border border-slate-200">
            <div className="p-5 bg-[#221c61] text-white flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-base">
                <Camera size={18} className="text-[#00a699]" />
                <span>AI Visual & Lens Search</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-[#00a699] transition bg-slate-50 cursor-pointer">
                <Camera size={42} className="mx-auto text-slate-400 mb-3" />
                <p className="text-sm font-bold text-slate-700">
                  Drag & Drop a product photo or click to upload
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports JPG, PNG, WEBP high-resolution photos
                </p>
              </div>

              <div className="relative text-center text-xs text-slate-400 before:absolute before:inset-0 before:top-1/2 before:border-t before:border-slate-200">
                <span className="relative bg-white px-3 font-semibold uppercase tracking-wider">
                  OR Search by Keywords
                </span>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                <input
                  type="text"
                  value={imageKeyword}
                  onChange={(e) => setImageKeyword(e.target.value)}
                  placeholder="e.g. Red running shoes, wireless headphones, steel pump..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#00a699] focus:ring-1 focus:ring-[#00a699] outline-none font-medium"
                />
                <button
                  type="submit"
                  className="w-full bg-[#00a699] hover:bg-[#00857a] text-white py-3.5 rounded-xl font-extrabold text-sm transition shadow-sm"
                >
                  Analyze & Match Catalogue
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
