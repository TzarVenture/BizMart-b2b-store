import { getProductById, getProductsByCategory, Product } from '@/lib/api';
import ProductDetailView from '@/components/product/ProductDetailView';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const revalidate = 3600;

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  let product: Product | null = null;
  let relatedProducts: Product[] = [];

  try {
    product = await getProductById(id);
    if (product?.category) {
      const relData = await getProductsByCategory(product.category, { limit: 8 });
      relatedProducts = relData.products?.filter((p) => p.id !== product?.id) || [];
    }
  } catch (err) {
    console.error(`Error loading product #${id}:`, err);
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="bg-[#f4f5f8] min-h-screen py-8">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-[#00a699]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#00a699]">Products</Link>
          <span>/</span>
          <Link href={`/categories/${product.category}`} className="hover:text-[#00a699] capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate max-w-xs">{product.title}</span>
        </div>

        {/* Product Detail Interactive View */}
        <ProductDetailView product={product} relatedProducts={relatedProducts} />

      </div>
    </div>
  );
}
