'use client';

import Link from 'next/link';
import { MessageCircle, FileText, ShoppingCart, ShieldCheck } from 'lucide-react';
import { Product, formatINR } from '@/lib/api';
import { useLeadStore } from '@/lib/leadStore';

interface ProductCardProps {
  product: Product | any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { openRfqModal, addToRfqBasket } = useLeadStore();

  const title = product.title || product.name || 'Industrial Product';
  const id = product.id || product.slug || 1;
  const image =
    product.thumbnail ||
    (product.images && product.images[0]) ||
    'https://dummyjson.com/image/300x300';
  const moq = product.minimumOrderQuantity || product.moq || 10;
  const brand = product.brand || 'BizMart Quality';
  const price = product.price || 0;
  const inrPrice = formatINR(price);
  const sku = product.sku || `BM-${id}`;

  const handleOpenRfq = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openRfqModal({
      id: Number(id) || 1,
      title,
      image,
      moq,
      price,
      unit: 'Pieces',
    });
  };

  const handleAddToBasket = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToRfqBasket({
      productId: Number(id) || 1,
      title,
      image,
      moq,
      price,
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello BizMart, I am interested in procuring "${title}" (SKU: ${sku}). Please share best bulk price, MOQ (${moq} Units) and delivery timeline.`
  );

  return (
    <div
      data-aos="fade-up"
      className="bg-white rounded-2xl shadow-xs hover:shadow-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col group h-full"
    >
      {/* Product Image Area */}
      <Link
        href={`/products/${id}`}
        className="block relative pt-[95%] bg-slate-50/70 overflow-hidden p-4 border-b border-slate-100 group-hover:bg-[#00a699]/5 transition-colors"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.discountPercentage && product.discountPercentage > 10 && (
            <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>
        <button
          onClick={handleAddToBasket}
          title="Add to RFQ Basket"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 shadow-md hover:bg-[#00a699] hover:text-white text-slate-700 flex items-center justify-center transition-all duration-200 hover:scale-105"
        >
          <ShoppingCart size={16} />
        </button>
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span className="uppercase font-bold tracking-wider text-[#00a699] truncate max-w-[130px]">
            {brand}
          </span>
          <span className="font-mono text-slate-400">SKU: {sku}</span>
        </div>

        <Link
          href={`/products/${id}`}
          className="block group-hover:text-[#00a699] transition-colors mb-2"
        >
          <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>

        {/* Pricing & MOQ */}
        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-black text-slate-900">
              {inrPrice}
            </span>
            <span className="text-xs text-slate-400">/ Piece</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 mb-3.5">
            <span>
              MOQ: <strong className="text-slate-800 font-bold">{moq} Pieces</strong>
            </span>
            <span className="text-emerald-700 font-semibold text-xs flex items-center gap-1">
              <ShieldCheck size={13} /> Verified
            </span>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
            <button
              onClick={handleOpenRfq}
              className="flex items-center justify-center gap-1.5 bg-[#00a699] hover:bg-[#00857a] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition shadow-xs"
            >
              <FileText size={14} />
              <span>Get Best Price</span>
            </button>

            <a
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-3 rounded-xl text-xs font-bold transition shadow-xs"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
