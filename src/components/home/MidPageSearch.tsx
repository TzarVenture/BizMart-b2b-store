'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function MidPageSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      className="bg-[#2b3377] rounded-3xl p-8 sm:p-12 lg:p-14 text-white my-10 sm:my-14 shadow-md border border-[#232a6b]"
      data-aos="fade-up"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#00a699] block">
            Single-Seller B2B Marketplace
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Find the Verified Products & Direct Factory Pricing
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Search thousands of industrial, hardware, electronics, and consumer items
          </p>
        </div>

        <form onSubmit={handleSearch} className="w-full md:w-auto flex-1 max-w-lg flex shadow-md rounded-xl overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter product / service to search..."
            className="w-full px-5 py-3.5 bg-white text-slate-900 text-sm focus:outline-none placeholder-slate-400 font-medium"
          />
          <button
            type="submit"
            className="bg-[#00a699] hover:bg-[#00857a] text-white px-7 py-3.5 font-bold text-xs sm:text-sm uppercase tracking-wider transition flex-shrink-0"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
