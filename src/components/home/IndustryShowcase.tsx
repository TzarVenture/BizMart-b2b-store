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
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs my-8 sm:my-12" data-aos="fade-up">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold text-[#00a699] uppercase tracking-wider block mb-1">
            Enterprise Category Sourcing
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {title}
          </h3>
        </div>
        <Link
          href={`/categories/${categorySlug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 hover:bg-[#00a699]/10 text-xs sm:text-sm font-bold text-[#00a699] border border-slate-200/80 hover:border-[#00a699]/30 transition group self-start sm:self-auto"
        >
          <span>Explore Category</span>
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid of 6 Spacious Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
        {products.slice(0, 6).map((product, idx) => {
          const image = product.thumbnail || product.images?.[0] || '';
          const inrPrice = formatINR(product.price);
          const moq = product.minimumOrderQuantity || 10;

          return (
            <div
              key={product.id}
              data-aos="fade-up"
              data-aos-delay={(idx % 6) * 60}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between hover:shadow-xl hover:border-[#00a699] transition-all duration-300 hover:-translate-y-1.5 group relative"
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
