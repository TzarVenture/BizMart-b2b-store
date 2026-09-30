import { getCategories, getProducts, Category } from '@/lib/api';
import Link from 'next/link';
import { ArrowRight, Layers, Package } from 'lucide-react';

export const revalidate = 86400;

export default async function CategoriesPage() {
  let categories: Category[] = [];

  try {
    const allCats = await getCategories();
    categories = allCats.filter((c) => c.slug !== 'groceries');
  } catch (err) {
    console.error('Error fetching categories:', err);
  }

  return (
    <div className="bg-[#f4f5f8] min-h-screen py-8">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#00a699]">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Categories</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 mb-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00a699] uppercase tracking-wider mb-1">
            <Layers size={14} />
            <span>Industrial & Consumer Classification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore All Product Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Browse through our wide range of B2B industrial, electronics, hardware, and consumer merchandise available with direct factory pricing and MOQ specifications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-[#00a699] hover:shadow-md transition duration-200 group flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-200 group-hover:bg-[#00a699]/10 group-hover:border-[#00a699]/40 flex items-center justify-center text-slate-600 group-hover:text-[#00a699] transition">
                  <Package size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 group-hover:text-[#00a699] transition capitalize">
                    {category.name}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Direct Manufacturer Rates
                  </span>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-300 group-hover:text-[#00a699] group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
