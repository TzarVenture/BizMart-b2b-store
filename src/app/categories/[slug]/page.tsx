import { getProductsByCategory, getCategories, Product } from '@/lib/api';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import { ArrowLeft, Layers, ShieldCheck, FileText } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 3600;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  let products: Product[] = [];
  let categoryName = slug.replace(/-/g, ' ');

  try {
    const data = await getProductsByCategory(slug, { limit: 50 });
    products = data.products || [];
  } catch (err) {
    console.error(`Error loading category ${slug}:`, err);
  }

  return (
    <div className="bg-[#f4f5f8] min-h-screen py-8">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#00a699]">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-[#00a699]">Categories</Link>
          <span>/</span>
          <span className="text-[#00a699] font-bold capitalize">{categoryName}</span>
        </div>

        {/* Category Header */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 mb-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a699]/10 text-[#00857a] text-xs font-semibold uppercase mb-2">
              <Layers size={13} />
              <span>Category Sourcing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 capitalize tracking-tight">
              {categoryName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {products.length} verified products with direct wholesale pricing and manufacturer warranty.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/categories"
              className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>All Categories</span>
            </Link>
            <a
              href="/rfq"
              className="px-4 py-2 rounded-lg bg-[#ff7e00] hover:bg-[#e67100] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <FileText size={14} />
              <span>Post Category RFQ</span>
            </a>
          </div>
        </div>

        {/* Product Cards Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-base font-semibold text-slate-700">No products found for this category.</p>
            <Link
              href="/products"
              className="mt-4 inline-block px-5 py-2.5 bg-[#00a699] text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
