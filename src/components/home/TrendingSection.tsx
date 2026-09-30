'use client';

import Link from 'next/link';
import { Product } from '@/lib/api';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface TrendingSectionProps {
  products: Product[];
}

export default function TrendingSection({ products }: TrendingSectionProps) {
  return (
    <section className="pt-2 sm:pt-4 pb-8 sm:pb-12" data-aos="fade-up">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 sm:mb-8 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#00a699] uppercase tracking-wider mb-1">
            <TrendingUp size={16} />
            <span>High Buyer Demand</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trending on BizMart
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Verified products receiving highest enquiries from buyers this week
        </p>
      </div>

      {/* 3 Rows of 6 = 18 Spacious Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
        {products.slice(0, 18).map((product, idx) => {
          const image = product.thumbnail || product.images?.[0] || '';
          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              data-aos="fade-up"
              data-aos-delay={(idx % 6) * 50}
              className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col items-center justify-between text-center hover:shadow-xl hover:border-[#00a699] transition-all duration-300 hover:-translate-y-1.5 group"
            >
              {/* Product Thumbnail Container */}
              <div className="w-full h-28 sm:h-32 rounded-xl p-2 flex items-center justify-center mb-3 overflow-hidden bg-slate-50/70 border border-slate-100 group-hover:bg-[#00a699]/5 transition-colors">
                <img
                  src={image}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Title & Micro-indicator */}
              <div className="w-full flex flex-col items-center">
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#00a699] transition line-clamp-1 leading-snug w-full mb-1">
                  {product.title}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 transition flex items-center gap-0.5">
                  <span>Direct Rates</span>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00a699]" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
