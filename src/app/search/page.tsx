import { searchProducts, Product } from '@/lib/api';
import ProductCard from '@/components/ui/ProductCard';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Search, ArrowLeft, Filter, AlertCircle } from 'lucide-react';

const KNOWN_CITIES = [
  'bengaluru',
  'bangalore',
  'delhi',
  'new delhi',
  'mumbai',
  'bombay',
  'pune',
  'chennai',
  'madras',
  'kolkata',
  'calcutta',
  'hyderabad',
  'ahmedabad',
  'jaipur',
  'surat',
  'khandela',
  'gurgaon',
  'gurugram',
  'noida',
  'indore',
  'coimbatore',
  'chandigarh',
  'vadodara',
  'lucknow',
];

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolved = await searchParams;
  const query = resolved.q || '';

  // If search query is a city name, forward seamlessly to regional products delivery view
  if (query.trim()) {
    const qLower = query.trim().toLowerCase();
    if (KNOWN_CITIES.includes(qLower)) {
      redirect(`/products?city=${encodeURIComponent(query.trim())}`);
    }
  }

  let products: Product[] = [];
  let total = 0;

  if (query.trim()) {
    try {
      const data = await searchProducts(query.trim(), { limit: 50 });
      products = data.products || [];
      total = data.total || products.length;
    } catch (err) {
      console.error(`Error searching products for "${query}":`, err);
    }
  }

  return (
    <div className="bg-[#f4f5f8] min-h-screen py-8">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#00a699]">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Search Results</span>
          {query && (
            <>
              <span>/</span>
              <span className="text-[#00a699] font-bold">"{query}"</span>
            </>
          )}
        </div>

        {/* Search Results Summary */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <Search size={14} className="text-[#00a699]" />
              <span>Search Query</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {query ? `Results for "${query}"` : 'Product Search'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Found {total} matching products in our direct manufacturing catalogue.
            </p>
          </div>

          <Link
            href="/products"
            className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <ArrowLeft size={14} />
            <span>Browse Full Catalogue</span>
          </Link>
        </div>

        {/* Results Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-lg mx-auto shadow-xs">
            <AlertCircle size={40} className="text-amber-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No matching products found
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              We couldn't find exact matches for "{query}". Try checking your spelling or search for broader keywords like "phone", "laptop", "watch", or "oil".
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-xs">
              <Link
                href="/search?q=phone"
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#00a699] hover:text-white transition font-medium text-slate-700"
              >
                Smartphones
              </Link>
              <Link
                href="/search?q=laptop"
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#00a699] hover:text-white transition font-medium text-slate-700"
              >
                Laptops
              </Link>
              <Link
                href="/search?q=perfume"
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#00a699] hover:text-white transition font-medium text-slate-700"
              >
                Fragrances
              </Link>
              <Link
                href="/search?q=motorcycle"
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#00a699] hover:text-white transition font-medium text-slate-700"
              >
                Motorcycle
              </Link>
            </div>
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
