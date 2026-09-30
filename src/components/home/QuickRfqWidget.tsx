'use client';

import { useState } from 'react';
import { useLeadStore } from '@/lib/leadStore';
import { CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function QuickRfqWidget() {
  const { addLead } = useLeadStore();
  const [productName, setProductName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || !phone.trim()) return;

    const lead = addLead({
      customerName: 'Quick Website Visitor',
      companyName: 'B2B Procurement Desk',
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      email: 'quick-rfq@indiamart-buyer.in',
      productTitle: productName,
      quantity: 50,
      unit: 'Pieces',
      location: 'Pan India',
      requirementDetails: 'Immediate quotation requested via IndiaMART homepage lead capture.',
      source: 'Quick RFQ',
    });

    setLeadId(lead.id);
    setSubmitted(true);
  };

  return (
    <div
      className="bg-[#2b3377] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-md border border-[#232a6b] my-10 sm:my-14"
      data-aos="fade-up"
    >
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#00a699] block mb-2">
            Direct Lead Generation Engine
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            Get Quotes from Verified Supplier
          </h3>
          <p className="text-xs sm:text-base text-slate-200 mt-2 max-w-xl mx-auto leading-relaxed">
            Tell us what you need. Receive instant wholesale quotations, custom MOQs, and delivery terms directly from our sales desk.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20 text-center max-w-xl mx-auto space-y-3">
            <CheckCircle className="text-[#00a699] mx-auto" size={40} />
            <h4 className="text-xl font-bold text-white">Quotation Request Sent!</h4>
            <p className="text-xs sm:text-sm text-slate-200">
              Lead Ref: <span className="font-mono text-emerald-300 font-bold">{leadId}</span>. Our dedicated sales executive will contact you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setProductName('');
                setPhone('');
              }}
              className="mt-3 px-5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-xs sm:text-sm text-white font-bold transition"
            >
              Post Another Requirement
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3.5 max-w-3xl mx-auto">
            <input
              type="text"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter Product / Service name (e.g. Stainless Steel Wire, Apple MacBook)"
              className="flex-1 px-5 py-4 rounded-xl text-slate-900 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00a699] font-medium placeholder-slate-400 shadow-md"
            />
            <div className="flex sm:w-72 shadow-md">
              <span className="bg-slate-200 text-slate-700 px-4 py-4 rounded-l-xl text-sm font-bold flex items-center border-r border-slate-300">
                +91
              </span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your mobile"
                className="w-full px-4 py-4 rounded-r-xl text-slate-900 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00a699] font-medium placeholder-slate-400"
              />
            </div>
            <button
              type="submit"
              className="bg-[#ff7e00] hover:bg-[#e67100] text-white px-8 py-4 rounded-xl text-sm font-black transition flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] flex-shrink-0"
            >
              <span>Submit Requirement</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 pt-2">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck size={15} className="text-[#00a699]" /> 100% Privacy Protected
          </span>
          <span>•</span>
          <span>Zero Commission</span>
          <span>•</span>
          <span>Direct Single-Seller Wholesale Rates</span>
        </div>
      </div>
    </div>
  );
}
