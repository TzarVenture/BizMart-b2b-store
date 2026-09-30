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
      <div className="flex items-end justify-between gap-2 mb-4 sm:mb-8 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#00a699] uppercase tracking-wider mb-1">
            <TrendingUp size={16} />
            <span>High Buyer Demand</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Trending on BizMart
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="hidden sm:block text-xs sm:text-sm text-slate-500 font-medium">
            Verified products receiving highest enquiries from buyers this week
          </p>
          <span className="sm:hidden text-xs text-[#00a699] font-bold flex items-center gap-1">
            Swipe →
          </span>
        </div>
      </div>

      {/* Mobile: Horizontal Swipeable Row with Snap Scrolling, Desktop: Spacious 6-Column Grid */}
      <div className="flex md:grid overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory md:snap-none gap-3 sm:gap-4 md:gap-5 pb-3 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid-cols-4 lg:grid-cols-6">
        {products.slice(0, 18).map((product, idx) => {
          const image = product.thumbnail || product.images?.[0] || '';
          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              data-aos="fade-up"
              data-aos-delay={(idx % 6) * 50}
              className="w-[155px] sm:w-[175px] md:w-auto flex-shrink-0 md:flex-shrink snap-start md:snap-align-none bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-5 flex flex-col items-center justify-between text-center hover:shadow-xl hover:border-[#00a699] transition-all duration-300 hover:-translate-y-1.5 group"
            >
              {/* Product Thumbnail Container */}
              <div className="w-full h-24 sm:h-32 rounded-xl p-2 flex items-center justify-center mb-3 overflow-hidden bg-slate-50/70 border border-slate-100 group-hover:bg-[#00a699]/5 transition-colors">
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
