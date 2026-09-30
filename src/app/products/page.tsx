import { getProducts, getCategories, Product, Category } from '@/lib/api';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: string;
    city?: string;
  }>;
}

export const revalidate = 3600;

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || '';
  const currentCity = resolvedParams.city || '';
  const sortBy = resolvedParams.sortBy || 'title';
  const order = resolvedParams.order || 'asc';

  let products: Product[] = [];
  let categories: Category[] = [];

  try {
    const [prodData, catData] = await Promise.all([
      getProducts({ limit: 194, sortBy, order }),
      getCategories(),
    ]);
    products = (prodData.products || []).filter((p) => p.category !== 'groceries');
    categories = (catData || []).filter((c) => c.slug !== 'groceries');
  } catch (err) {
    console.error('Error loading products:', err);
  }

  // Filter if category is selected
  const filteredProducts = currentCategory
    ? products.filter((p) => p.category.toLowerCase() === currentCategory.toLowerCase())
    : products;

  return (
    <div className="bg-[#f4f5f8] min-h-screen py-8">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#00a699]">Home</Link>
          <span>/</span>
          <Link href="/products" className="text-slate-800 hover:text-[#00a699] font-semibold">
            All Products
          </Link>
          {currentCity && (
            <>
              <span>/</span>
              <span className="text-[#00a699] font-bold">
                📍 {currentCity} Hub
              </span>
            </>
          )}
          {currentCategory && (
            <>
              <span>/</span>
              <span className="text-[#00a699] font-bold capitalize">{currentCategory}</span>
            </>
          )}
        </div>

        {/* City Delivery Hub Banner */}
        {currentCity && (
          <div className="bg-gradient-to-r from-[#2b3377] to-[#1e245a] text-white rounded-2xl p-5 sm:p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm border border-slate-700/60">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#00a699]/20 text-[#00a699] flex items-center justify-center shrink-0 border border-[#00a699]/30">
                <Filter size={22} className="text-[#00a699]" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#00a699] uppercase tracking-wider">
                    Regional Logistics Hub
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    Direct Factory Dispatch
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Commercial Products Delivering to {currentCity}
                </h2>
                <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                  Showing verified factory-direct catalogue available for wholesale delivery, GST invoice, and express freight across <strong>{currentCity}</strong> and surrounding industrial zones.
                </p>
              </div>
            </div>
            <Link
              href={currentCategory ? `/products?category=${currentCategory}` : '/products'}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold whitespace-nowrap transition border border-white/20"
            >
              Reset Location
            </Link>
          </div>
        )}

        {/* Page Header */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {currentCategory
                ? `${currentCategory.toUpperCase()} PRODUCTS`
                : currentCity
                ? `PRODUCTS DELIVERING TO ${currentCity.toUpperCase()}`
                : 'DIRECT MANUFACTURER CATALOGUE'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Showing {filteredProducts.length} verified products with wholesale pricing and custom MOQs{currentCity ? ` for ${currentCity}` : ''}.
            </p>
          </div>

          {/* Quick Sort Options */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1 text-slate-400">
              <ArrowUpDown size={13} /> Sort By:
            </span>
            <Link
              href={`/products?${currentCity ? `city=${encodeURIComponent(currentCity)}&` : ''}${currentCategory ? `category=${currentCategory}&` : ''}sortBy=price&order=asc`}
              className={`px-3 py-1.5 rounded-lg border transition ${
                sortBy === 'price' && order === 'asc'
                  ? 'bg-[#00a699] text-white border-[#00a699]'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Price: Low to High
            </Link>
            <Link
              href={`/products?${currentCity ? `city=${encodeURIComponent(currentCity)}&` : ''}${currentCategory ? `category=${currentCategory}&` : ''}sortBy=price&order=desc`}
              className={`px-3 py-1.5 rounded-lg border transition ${
                sortBy === 'price' && order === 'desc'
                  ? 'bg-[#00a699] text-white border-[#00a699]'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Price: High to Low
            </Link>
            <Link
              href={`/products?${currentCity ? `city=${encodeURIComponent(currentCity)}&` : ''}${currentCategory ? `category=${currentCategory}&` : ''}sortBy=rating&order=desc`}
              className={`px-3 py-1.5 rounded-lg border transition ${
                sortBy === 'rating'
                  ? 'bg-[#00a699] text-white border-[#00a699]'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Top Rated
            </Link>
          </div>
        </div>

        {/* Content Layout: Category Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 mb-3">
                <Filter size={16} className="text-[#00a699]" />
                <span>Categories</span>
              </div>
              
              <ul className="space-y-1 text-xs max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
                <li>
                  <Link
                    href="/products"
                    className={`block px-3 py-2 rounded-lg transition font-medium ${
                      !currentCategory
                        ? 'bg-[#00a699] text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    All Categories ({products.length})
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/products?category=${cat.slug}`}
                      className={`block px-3 py-2 rounded-lg transition font-medium capitalize ${
                        currentCategory === cat.slug
                          ? 'bg-[#00a699] text-white font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Procurement Assurance Card */}
            <div className="bg-[#1b2046] text-white rounded-xl p-5 border border-slate-700 shadow-xs text-xs space-y-2">
              <h4 className="font-bold text-sm text-[#00a699]">Single-Seller Assurance</h4>
              <p className="text-slate-300 leading-relaxed">
                All catalogue items are directly managed and supplied by BizMart. No external third-party seller markups.
              </p>
              <div className="pt-2">
                <a
                  href="/rfq"
                  className="block text-center bg-[#ff7e00] hover:bg-[#e67100] text-white py-2 rounded-lg font-bold transition"
                >
                  Post Bulk Requirement
                </a>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
                <p className="text-base font-semibold text-slate-700">No products found in this category.</p>
                <Link
                  href="/products"
                  className="mt-3 inline-block px-4 py-2 bg-[#00a699] text-white text-xs font-bold rounded-lg"
                >
                  View All Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
