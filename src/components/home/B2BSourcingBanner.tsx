'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Search, FileText, ArrowRight, X, ShieldCheck } from 'lucide-react';
import { useLeadStore } from '@/lib/leadStore';

export default function B2BSourcingBanner() {
  const router = useRouter();
  const { openRfqModal } = useLeadStore();
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <>
      <section
        className="bg-[#2b3377] rounded-3xl p-8 sm:p-12 lg:p-14 text-white shadow-md relative overflow-hidden my-10 sm:my-14 border border-[#232a6b]"
        data-aos="fade-up"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Left Text */}
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="text-xs font-bold text-[#00a699] uppercase tracking-wider block">
              Direct Manufacturer Sourcing
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Find Products by Image or Technical Specification
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Upload product photos, engineering drawings, or describe technical grade and dimensions to get direct factory wholesale quotations.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#00a699]" /> 100% Verified Quality
              </span>
              <span>•</span>
              <span>Custom MOQs Available</span>
              <span>•</span>
              <span>All-India Insured Dispatch</span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#2b3377] font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 group hover:scale-105"
            >
              <Camera size={18} className="text-[#00a699]" />
              <span>Search by Image</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => openRfqModal()}
              className="px-6 py-3.5 rounded-full bg-[#00a699] hover:bg-[#00857a] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 hover:scale-105"
            >
              <FileText size={18} />
              <span>Submit RFQ</span>
            </button>
          </div>

        </div>
      </section>

      {/* Image Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden text-slate-800 border border-slate-200">
            <div className="p-5 bg-[#2b3377] text-white flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                <Camera size={18} className="text-[#00a699]" />
                <span>Search by Product Photo or Specs</span>
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
                <Camera size={38} className="mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-bold text-slate-700">
                  Drag & Drop a product photo or spec sheet
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports JPG, PNG, WEBP, or PDF datasheets
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
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. Submersible pump 5HP, steel pipe 2 inch, industrial watch..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#00a699] focus:ring-1 focus:ring-[#00a699] outline-none font-medium"
                />
                <button
                  type="submit"
                  className="w-full bg-[#00a699] hover:bg-[#00857a] text-white py-3.5 rounded-xl font-bold text-sm transition shadow-sm"
                >
                  Search Matching Catalogue Items
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
