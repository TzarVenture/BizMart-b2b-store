export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<{
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }>;
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = 'https://dummyjson.com';

export async function getProducts(options?: {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  select?: string;
}): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  if (options?.limit !== undefined) params.append('limit', String(options.limit));
  if (options?.skip !== undefined) params.append('skip', String(options.skip));
  if (options?.sortBy) params.append('sortBy', options.sortBy);
  if (options?.order) params.append('order', options.order);
  if (options?.select) params.append('select', options.select);

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${BASE_URL}/products${query}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProductById(id: string | number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch product with id ${id}`);
  return res.json();
}

export async function searchProducts(
  q: string,
  options?: { limit?: number; skip?: number }
): Promise<ProductsResponse> {
  const params = new URLSearchParams({ q });
  if (options?.limit !== undefined) params.append('limit', String(options.limit));
  if (options?.skip !== undefined) params.append('skip', String(options.skip));

  const res = await fetch(`${BASE_URL}/products/search?${params.toString()}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Failed to search products for "${q}"`);
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/products/categories`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getProductsByCategory(
  categorySlug: string,
  options?: { limit?: number; skip?: number }
): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  if (options?.limit !== undefined) params.append('limit', String(options.limit));
  if (options?.skip !== undefined) params.append('skip', String(options.skip));

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(categorySlug)}${query}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Failed to fetch products for category "${categorySlug}"`);
  return res.json();
}

// Convert USD to INR representation standard for IndiaMART (approx ₹83/$)
export function formatINR(usd: number): string {
  const inr = Math.round(usd * 83);
  return '₹' + inr.toLocaleString('en-IN');
}
