'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Star,
  FileText,
  MessageCircle,
  PhoneCall,
  ShoppingCart,
  Truck,
  CheckCircle2,
  Share2,
  Package,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { Product, formatINR } from '@/lib/api';
import { useLeadStore } from '@/lib/leadStore';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { openRfqModal, addToRfqBasket } = useLeadStore();
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || product.thumbnail || ''
  );
  const [quantity, setQuantity] = useState(product.minimumOrderQuantity || 10);
  const [copied, setCopied] = useState(false);

  const images = product.images?.length
    ? product.images
    : [product.thumbnail || 'https://dummyjson.com/image/400x400'];

  const inrPrice = formatINR(product.price);
  const totalPriceEst = formatINR(product.price * quantity);

  const whatsappMessage = encodeURIComponent(
    `Hello BizMart Sales Desk, I am interested in purchasing "${product.title}" (SKU: ${product.sku || product.id}). Required Quantity: ${quantity} Pieces. Delivery Location: India. Please send your best wholesale price quote.`
  );

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Top Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Featured Image with Zoom View Container */}
            <div className="relative pt-[90%] rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden p-6 flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-contain p-6 hover:scale-110 transition-transform duration-300"
              />
              {product.discountPercentage && product.discountPercentage > 10 && (
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                  {Math.round(product.discountPercentage)}% WHOLESALE DISCOUNT
                </span>
              )}
            </div>

            {/* Thumbnail Carousel */}
            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-lg border-2 p-1 bg-white flex-shrink-0 transition ${
                      selectedImage === img
                        ? 'border-[#00a699] ring-2 ring-[#00a699]/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Direct Verification Badge */}
            <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
              <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Direct Single-Seller Stock:</strong> Certified quality inspection passed before warehouse dispatch.
              </span>
            </div>
          </div>

          {/* Right Column: Product Info & B2B Purchase Box */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <div className="flex items-center gap-2">
                  <span className="uppercase font-bold tracking-wider text-[#00a699]">
                    {product.brand || 'BizMart Quality'}
                  </span>
                  <span>•</span>
                  <Link
                    href={`/categories/${product.category}`}
                    className="capitalize hover:underline"
                  >
                    {product.category}
                  </Link>
                </div>
                <div className="flex items-center gap-2 font-mono text-slate-400">
                  <span>SKU: {product.sku || `BM-${product.id}`}</span>
                  <button
                    onClick={handleShare}
                    title="Copy Link"
                    className="hover:text-slate-700 transition"
                  >
                    <Share2 size={13} />
                  </button>
                  {copied && <span className="text-[10px] text-emerald-600">Copied!</span>}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {product.title}
              </h1>

              {/* Ratings & Reviews */}
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded border border-amber-200">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span>({product.reviews?.length || 3} verified client reviews)</span>
                <span>•</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} /> {product.availabilityStatus || 'In Stock'} ({product.stock} units available)
                </span>
              </div>

              {/* Pricing & MOQ Card */}
              <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-900">
                    {inrPrice}
                  </span>
                  <span className="text-sm font-semibold text-slate-500">/ Piece</span>
                  <span className="text-xs text-slate-400">
                    (Excl. GST & Freight)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1 border-t border-slate-200/80">
                  <div>
                    <span className="text-slate-500 block">Minimum Order Quantity (MOQ):</span>
                    <span className="font-bold text-slate-800 text-sm">
                      {product.minimumOrderQuantity || 10} Pieces
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Estimated Delivery:</span>
                    <span className="font-bold text-slate-800 text-sm flex items-center gap-1">
                      <Truck size={14} className="text-[#00a699]" />
                      {product.shippingInformation || '3-5 business days'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Short Description */}
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* B2B Sourcing Action Container */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <label className="text-xs font-bold text-slate-700">
                  Requirement Quantity:
                </label>
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() =>
                      setQuantity((q) =>
                        Math.max(product.minimumOrderQuantity || 1, q - 5)
                      )
                    }
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={product.minimumOrderQuantity || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-16 text-center text-sm font-bold text-slate-800 outline-none"
                  />
                  <button
                    onClick={() => setQuantity((q) => q + 5)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  Est. Batch Total: <strong className="text-slate-800 font-bold">{totalPriceEst}</strong>
                </span>
              </div>

              {/* Primary CTAs Matching PRD Section 10 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* 1. Get Best Price (Triggers RFQ Modal) */}
                <button
                  onClick={() =>
                    openRfqModal({
                      id: product.id,
                      title: product.title,
                      image: selectedImage,
                      moq: product.minimumOrderQuantity || 10,
                      price: product.price,
                      unit: 'Pieces',
                    })
                  }
                  className="bg-[#00a699] hover:bg-[#00857a] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <FileText size={16} />
                  <span>Get Best Price</span>
                </button>

                {/* 2. Add to Multi-Product RFQ Basket */}
                <button
                  onClick={() =>
                    addToRfqBasket({
                      productId: product.id,
                      title: product.title,
                      image: selectedImage,
                      moq: product.minimumOrderQuantity || 10,
                      price: product.price,
                      quantity,
                      unit: 'Pieces',
                    })
                  }
                  className="bg-[#ff7e00] hover:bg-[#e67100] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShoppingCart size={16} />
                  <span>Add to RFQ List</span>
                </button>

                {/* 3. WhatsApp Us */}
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Us</span>
                </a>

                {/* 4. Call Sales Desk */}
                <a
                  href="tel:+919876543210"
                  className="bg-[#282c3f] hover:bg-slate-900 text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2"
                >
                  <PhoneCall size={16} />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Structured Technical Specifications Table (PRD Section 10) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-xs">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-6">
          <Layers size={18} className="text-[#00a699]" />
          <h2 className="text-lg font-extrabold text-slate-800">
            Technical Specifications & Product Details
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px]">
              <tr>
                <th className="py-3 px-4 w-1/3 border-b border-r border-slate-200">
                  Specification Parameter
                </th>
                <th className="py-3 px-4 w-2/3 border-b border-slate-200">
                  Technical Details / Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr className="hover:bg-slate-50 transition">
                <td className="py-2.5 px-4 font-semibold bg-slate-50/50 border-r border-slate-200">
                  Brand / Manufacturer
                </td>
                <td className="py-2.5 px-4 font-medium">
                  {product.brand || 'BizMart Certified Manufacturing'}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="py-2.5 px-4 font-semibold bg-slate-50/50 border-r border-slate-200">
                  SKU / Model Number
                </td>
                <td className="py-2.5 px-4 font-mono font-medium">
                  {product.sku || `BM-${product.id}`}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="py-2.5 px-4 font-semibold bg-slate-50/50 border-r border-slate-200">
                  Category Classification
                </td>
                <td className="py-2.5 px-4 capitalize">
                  {product.category}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="py-2.5 px-4 font-semibold bg-slate-50/50 border-r border-slate-200">
                  Dimensions (W × H × D)
                </td>
                <td className="py-2.5 px-4">
                  {product.dimensions
                    ? `${product.dimensions.width} cm × ${product.dimensions.height} cm × ${product.dimensions.depth} cm`
                    : 'Standard Industrial Size'}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="py-2.5 px-4 font-semibold bg-slate-50/50 border-r border-slate-200">
                  Unit Weight
                </td>
                <td className="py-2.5 px-4">
                  {product.weight ? `${product.weight} kg` : 'Standard Weight'}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="py-2.5 px-4 font-semibold bg-slate-50/50 border-r border-slate-200">
                  Minimum Order Quantity (MOQ)
                </td>
                <td className="py-2.5 px-4 font-bold text-slate-900">
                  {product.minimumOrderQuantity || 10} Units
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="py-2.5 px-4 font-semibold bg-slate-50/50 border-r border-slate-200">
                  Warranty Coverage
                </td>
                <td className="py-2.5 px-4 text-emerald-700 font-semibold">
                  {product.warrantyInformation || '1 Year Manufacturer Warranty'}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="py-2.5 px-4 font-semibold bg-slate-50/50 border-r border-slate-200">
                  Shipping & Dispatch
                </td>
                <td className="py-2.5 px-4">
                  {product.shippingInformation || 'Doorstep delivery via insured freight'}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="py-2.5 px-4 font-semibold bg-slate-50/50 border-r border-slate-200">
                  Return / Quality Inspection Policy
                </td>
                <td className="py-2.5 px-4">
                  {product.returnPolicy || '7 days replacement against transit damage'}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="py-2.5 px-4 font-semibold bg-slate-50/50 border-r border-slate-200">
                  Barcode / QR Verification
                </td>
                <td className="py-2.5 px-4 font-mono text-slate-500">
                  {product.meta?.barcode || '8901004829102'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Reviews & Quality Feedback */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-xs">
          <h2 className="text-lg font-extrabold text-slate-800 mb-4">
            Client Reviews & Industrial Feedback
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {product.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{rev.reviewerName}</span>
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={11} className="fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 italic">"{rev.comment}"</p>
                <span className="text-[10px] text-slate-400 block">
                  Verified B2B Purchase
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Similar & Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-800">
              Related Products in {product.category.toUpperCase()}
            </h3>
            <Link
              href={`/categories/${product.category}`}
              className="text-xs font-bold text-[#00a699] hover:underline"
            >
              View All Category Items →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {relatedProducts.slice(0, 6).map((rp) => (
              <Link
                key={rp.id}
                href={`/products/${rp.id}`}
                className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-md hover:border-[#00a699] transition text-center group"
              >
                <div className="w-full pt-[85%] relative mb-2 bg-slate-50/50 rounded overflow-hidden">
                  <img
                    src={rp.thumbnail || rp.images?.[0]}
                    alt={rp.title}
                    className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                </div>
                <p className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-[#00a699]">
                  {rp.title}
                </p>
                <p className="text-[11px] font-bold text-slate-900 mt-1">
                  {formatINR(rp.price)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
