'use client';

import Link from 'next/link';
import { ChevronRight, FileText, ShieldCheck } from 'lucide-react';
import { Product, formatINR } from '@/lib/api';
import { useLeadStore } from '@/lib/leadStore';

interface IndustryShowcaseProps {
  title: string;
  categorySlug: string;
  products: Product[];
}

export default function IndustryShowcase({
  title,
  categorySlug,
  products,
}: IndustryShowcaseProps) {
  const { openRfqModal } = useLeadStore();

  return (
    <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 shadow-xs my-6 sm:my-12" data-aos="fade-up">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-8 pb-3 sm:pb-4 border-b border-slate-100">
        <div className="min-w-0">
          <span className="text-[10px] sm:text-xs font-bold text-[#00a699] uppercase tracking-wider block mb-0.5 sm:mb-1">
            Enterprise Category Sourcing
          </span>
          <h3 className="text-base sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight truncate">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href={`/categories/${categorySlug}`}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-50 hover:bg-[#00a699]/10 text-xs sm:text-sm font-bold text-[#00a699] border border-slate-200/80 hover:border-[#00a699]/30 transition group"
          >
            <span>Explore All</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Mobile: Horizontal Swipeable Row, Desktop: 6-Column Grid */}
      <div className="flex md:grid overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory md:snap-none gap-3 sm:gap-4 md:gap-5 pb-2 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid-cols-3 lg:grid-cols-6">
        {products.slice(0, 6).map((product, idx) => {
          const image = product.thumbnail || product.images?.[0] || '';
          const inrPrice = formatINR(product.price);
          const moq = product.minimumOrderQuantity || 10;

          return (
            <div
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={(idx % 6) * 60}
              className="w-[190px] sm:w-[220px] md:w-auto flex-shrink-0 md:flex-shrink snap-start md:snap-align-none bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 flex flex-col justify-between hover:shadow-xl hover:border-[#00a699] transition-all duration-300 hover:-translate-y-1.5 group relative"
            >
              {/* Product Image Box */}
              <Link
                href={`/products/${product.id}`}
                className="w-full h-36 sm:h-44 rounded-xl bg-slate-50/70 relative block mb-3 p-3 border border-slate-100/80 overflow-hidden group-hover:bg-[#00a699]/5 transition-colors"
              >
                <img
                  src={image}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                />
              </Link>

              {/* Title, Pricing & MOQ */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#00a699] transition line-clamp-2 leading-snug mb-2"
                  >
                    {product.title}
                  </Link>
                  
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-sm sm:text-base font-black text-slate-900">
                      {inrPrice}
                    </span>
                    <span className="text-[10px] text-slate-400">/ Piece</span>
                  </div>

                  <div className="text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 mb-3 flex items-center justify-between">
                    <span>MOQ: <strong className="text-slate-700 font-bold">{moq}</strong></span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                      <ShieldCheck size={11} /> Verified
                    </span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() =>
                    openRfqModal({
                      id: product.id,
                      title: product.title,
                      image,
                      moq,
                      price: product.price,
                      unit: 'Pieces',
                    })
                  }
                  className="w-full py-2.5 px-3 bg-[#00a699] hover:bg-[#00857a] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm shadow-[#00a699]/20"
                >
                  <FileText size={13} />
                  <span>Get Best Price</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
