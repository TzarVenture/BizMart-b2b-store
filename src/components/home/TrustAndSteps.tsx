'use client';

import { useLeadStore } from '@/lib/leadStore';
import { ShieldCheck, Video, ArrowRight, Truck, FileCheck, Layers } from 'lucide-react';

export default function TrustAndSteps() {
  const { openRfqModal } = useLeadStore();

  return (
    <div className="space-y-10 sm:space-y-14 my-10 sm:my-14">
      
      {/* Trust & Video Showcase Strip */}
      <div
        className="bg-[#2b3377] rounded-3xl p-8 sm:p-12 text-white shadow-md border border-[#232a6b]"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 4 Trust Points */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#00a699] flex items-center justify-center flex-shrink-0 border border-white/15">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-base font-bold text-white">Trusted by 50,000+ Buyers</p>
                <p className="text-xs text-slate-200 mt-0.5">Direct enterprise single-seller procurement</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-white/15">
                <FileCheck size={24} />
              </div>
              <div>
                <p className="text-base font-bold text-white">100% GST Tax Invoices</p>
                <p className="text-xs text-slate-200 mt-0.5">Compliant B2B commercial input credit</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-blue-300 flex items-center justify-center flex-shrink-0 border border-white/15">
                <Truck size={24} />
              </div>
              <div>
                <p className="text-base font-bold text-white">Insured Nationwide Logistics</p>
                <p className="text-xs text-slate-200 mt-0.5">Doorstep delivery across all Indian pin-codes</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#ff7e00] flex items-center justify-center flex-shrink-0 border border-white/15">
                <Layers size={24} />
              </div>
              <div>
                <p className="text-base font-bold text-white">Direct Factory Pricing</p>
                <p className="text-xs text-slate-200 mt-0.5">Zero intermediary margins or commissions</p>
              </div>
            </div>
          </div>

          {/* Video Showcase Card */}
          <div className="lg:col-span-4 bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/15 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-white/15 text-white flex items-center justify-center mb-3">
              <Video size={28} />
            </div>
            <h4 className="text-base font-bold text-white mb-1.5">
              Explore Live Product Demos
            </h4>
            <p className="text-xs text-slate-200 mb-4 max-w-xs leading-relaxed">
              Watch product demonstrations, load testing, and manufacturing specs.
            </p>
            <button
              onClick={() => openRfqModal()}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#2b3377] text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-sm"
            >
              <span>Request Video Demo</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>

      {/* 3 Simple Steps Container (Consistent #2b3377 Navy) */}
      <div
        className="bg-[#2b3377] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-md border border-[#232a6b] text-center"
        data-aos="fade-up"
      >
        <div className="max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#00a699] block mb-2">
            Procurement Made Effortless
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
            Get Wholesale Quotations in 3 Simple Steps
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Fast-track your procurement cycle with instant quotations directly from our central sales team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-10">
          <div className="bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/15 text-center space-y-3 hover:bg-white/15 transition">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#2b3377] font-black flex items-center justify-center mx-auto text-base shadow-md">
              1
            </div>
            <h4 className="text-base font-bold text-white">Post Requirement</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Specify required product name, estimated order quantity, and delivery destination.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/15 text-center space-y-3 hover:bg-white/15 transition">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#00a699] font-black flex items-center justify-center mx-auto text-base shadow-md">
              2
            </div>
            <h4 className="text-base font-bold text-white">Receive Best Rates</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Our direct sales desk calculates volume tier discounts and sends official commercial quote.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/15 text-center space-y-3 hover:bg-white/15 transition">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#ff7e00] font-black flex items-center justify-center mx-auto text-base shadow-md">
              3
            </div>
            <h4 className="text-base font-bold text-white">Direct Fulfillment</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Confirm order specifications and get immediate insured freight dispatch with GST billing.
            </p>
          </div>
        </div>

        <button
          onClick={() => openRfqModal()}
          className="px-8 py-4 rounded-full bg-[#ff7e00] hover:bg-[#e67100] text-white font-black text-sm sm:text-base shadow-md transition inline-flex items-center gap-2.5 hover:scale-105"
        >
          <span>Post Buy Requirement Now</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Hindi & Vernacular Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs" data-aos="fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="text-base font-black text-slate-900">BizMart in Hindi</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              हिंदी में उपलब्ध
            </span>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            भारत का अपना सबसे विश्वसनीय B2B मार्केटप्लेस
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700">
          <span className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#00a699] hover:text-[#00a699] cursor-pointer transition">
            📱 स्मार्टफोन एवं एक्सेसरीज़
          </span>
          <span className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#00a699] hover:text-[#00a699] cursor-pointer transition">
            💻 लैपटॉप और कंप्यूटर
          </span>
          <span className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#00a699] hover:text-[#00a699] cursor-pointer transition">
            🪑 फर्नीचर और इंटीरियर
          </span>
          <span className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#00a699] hover:text-[#00a699] cursor-pointer transition">
            💄 सौंदर्य प्रसाधन सामग्री
          </span>
          <span className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#00a699] hover:text-[#00a699] cursor-pointer transition">
            🏍️ मोटरसाइकिल और स्पेयर पार्ट्स
          </span>
          <span className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#00a699] hover:text-[#00a699] cursor-pointer transition">
            👕 पुरुषों और महिलाओं के परिधान
          </span>
          <span className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#00a699] hover:text-[#00a699] cursor-pointer transition">
            🍲 रसोई के बर्तन एवं किराने का सामान
          </span>
        </div>
      </div>

    </div>
  );
}
