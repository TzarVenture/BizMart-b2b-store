import fallbackProductsData from '@/data/fallbackProducts.json';

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

const fallbackProducts = fallbackProductsData as unknown as Product[];

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

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${BASE_URL}/products${query}`, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.products && Array.isArray(data.products) && data.products.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('DummyJSON network error, seamlessly falling back to local catalogue dataset:', err);
  }

  // Guaranteed fallback using local catalogue dataset
  let localList = [...fallbackProducts];
  if (options?.sortBy) {
    localList.sort((a: any, b: any) => {
      const valA = a[options.sortBy!];
      const valB = b[options.sortBy!];
      if (valA < valB) return options.order === 'desc' ? 1 : -1;
      if (valA > valB) return options.order === 'desc' ? -1 : 1;
      return 0;
    });
  }

  const skip = options?.skip || 0;
  const limit = options?.limit !== undefined ? options.limit : localList.length;
  const paged = localList.slice(skip, skip + limit);

  return {
    products: paged,
    total: localList.length,
    skip,
    limit,
  };
}

export async function getProductById(id: string | number): Promise<Product> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`DummyJSON product ${id} fetch error, using local fallback`);
  }

  const found = fallbackProducts.find((p) => String(p.id) === String(id));
  if (found) return found;
  throw new Error(`Product ${id} not found`);
}

export async function searchProducts(
  q: string,
  options?: { limit?: number; skip?: number }
): Promise<ProductsResponse> {
  const params = new URLSearchParams({ q });
  if (options?.limit !== undefined) params.append('limit', String(options.limit));
  if (options?.skip !== undefined) params.append('skip', String(options.skip));

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${BASE_URL}/products/search?${params.toString()}`, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.products) return data;
    }
  } catch (err) {
    console.warn(`DummyJSON search for "${q}" error, using local fallback`);
  }

  const query = q.toLowerCase();
  const matching = fallbackProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.brand && p.brand.toLowerCase().includes(query))
  );

  const skip = options?.skip || 0;
  const limit = options?.limit !== undefined ? options.limit : matching.length;

  return {
    products: matching.slice(skip, skip + limit),
    total: matching.length,
    skip,
    limit,
  };
}

export async function getCategories(): Promise<Category[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${BASE_URL}/products/categories`, {
      next: { revalidate: 86400 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('DummyJSON categories fetch error, using local fallback');
  }

  // Derive categories from fallback products
  const categoryMap = new Map<string, string>();
  fallbackProducts.forEach((p) => {
    if (!categoryMap.has(p.category)) {
      categoryMap.set(
        p.category,
        p.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      );
    }
  });

  return Array.from(categoryMap.entries()).map(([slug, name]) => ({
    slug,
    name,
    url: `${BASE_URL}/products/category/${slug}`,
  }));
}

export async function getProductsByCategory(
  categorySlug: string,
  options?: { limit?: number; skip?: number }
): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  if (options?.limit !== undefined) params.append('limit', String(options.limit));
  if (options?.skip !== undefined) params.append('skip', String(options.skip));

  const query = params.toString() ? `?${params.toString()}` : '';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(
      `${BASE_URL}/products/category/${encodeURIComponent(categorySlug)}${query}`,
      {
        next: { revalidate: 3600 },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.products && Array.isArray(data.products) && data.products.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn(`DummyJSON category ${categorySlug} fetch error, using local fallback`);
  }

  const matching = fallbackProducts.filter(
    (p) => p.category.toLowerCase() === categorySlug.toLowerCase()
  );

  const skip = options?.skip || 0;
  const limit = options?.limit !== undefined ? options.limit : matching.length;

  return {
    products: matching.slice(skip, skip + limit),
    total: matching.length,
    skip,
    limit,
  };
}

// Convert USD to INR representation standard for IndiaMART (approx ₹83/$)
export function formatINR(usd: number): string {
  const inr = Math.round(usd * 83);
  return '₹' + inr.toLocaleString('en-IN');
}
