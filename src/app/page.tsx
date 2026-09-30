import { getProducts, Product } from '@/lib/api';
import HeroBanner from '@/components/home/HeroBanner';
import TrendingSection from '@/components/home/TrendingSection';
import IndustryShowcase from '@/components/home/IndustryShowcase';
import B2BSourcingBanner from '@/components/home/B2BSourcingBanner';
import MidPageSearch from '@/components/home/MidPageSearch';
import TrustAndSteps from '@/components/home/TrustAndSteps';
import QuickRfqWidget from '@/components/home/QuickRfqWidget';

export const revalidate = 3600; // ISR cache for 1 hour

export default async function HomePage() {
  let allProducts: Product[] = [];

  try {
    const data = await getProducts({ limit: 194 });
    allProducts = data.products || [];
  } catch (err) {
    console.error('Error fetching DummyJSON products on homepage:', err);
  }

  // Strictly filter out all food and groceries
  const nonFoodProducts = allProducts.filter(
    (p) => p.category !== 'groceries'
  );

  // Industry Showcases (Exclusively Non-Food)
  const electronicsProducts = nonFoodProducts.filter(
    (p) =>
      p.category === 'smartphones' ||
      p.category === 'tablets' ||
      p.category === 'mobile-accessories'
  );

  const laptopProducts = nonFoodProducts.filter((p) => p.category === 'laptops');

  const autoProducts = nonFoodProducts.filter(
    (p) => p.category === 'motorcycle' || p.category === 'vehicle'
  );

  const furnitureProducts = nonFoodProducts.filter(
    (p) => p.category === 'furniture' || p.category === 'home-decoration'
  );

  const beautyProducts = nonFoodProducts.filter(
    (p) =>
      p.category === 'beauty' ||
      p.category === 'skin-care' ||
      p.category === 'fragrances'
  );

  const fashionProducts = nonFoodProducts.filter(
    (p) =>
      p.category === 'mens-shirts' ||
      p.category === 'womens-dresses' ||
      p.category === 'tops' ||
      p.category === 'womens-bags' ||
      p.category === 'mens-shoes'
  );

  const watchProducts = nonFoodProducts.filter(
    (p) =>
      p.category === 'mens-watches' ||
      p.category === 'womens-watches' ||
      p.category === 'womens-jewellery' ||
      p.category === 'sunglasses'
  );

  const sportsProducts = nonFoodProducts.filter(
    (p) => p.category === 'sports-accessories'
  );

  // Curate Trending on BizMart (Strictly Furniture, Electronics, Cosmetics - Zero Food!)
  const furnitureTrending = furnitureProducts.slice(0, 6);
  const electronicsTrending = [
    ...nonFoodProducts.filter((p) => p.category === 'smartphones').slice(0, 3),
    ...laptopProducts.slice(0, 3),
  ];
  const cosmeticsTrending = beautyProducts.slice(0, 6);

  const trendingList = [
    ...furnitureTrending,
    ...electronicsTrending,
    ...cosmeticsTrending,
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f5f8]">
      
      {/* 1. IndiaMART Top Navy Blue Hero Banner with Concentric Wave Background & Bottom Fade */}
      <HeroBanner />

      {/* 2. Trending on BizMart Section (Starts on clean solid white merging seamlessly from hero bottom fade with proper gap) */}
      <div className="w-full bg-white pb-8 sm:pb-12 pt-6 sm:pt-10">
        <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
          <TrendingSection products={trendingList} />
        </div>
      </div>

      {/* 3. Main Wide Content Showcases */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-6 sm:space-y-14">
        
        {/* Industry Showcase 1: Consumer Electronics & Smartphones */}
        {electronicsProducts.length > 0 && (
          <IndustryShowcase
            title="Consumer Electronics, Smartphones & Gadgets"
            categorySlug="smartphones"
            products={electronicsProducts}
          />
        )}

        {/* Industry Showcase 2: Laptops & Computers */}
        {laptopProducts.length > 0 && (
          <IndustryShowcase
            title="Laptops, Computers & Computing Equipment"
            categorySlug="laptops"
            products={laptopProducts}
          />
        )}

        {/* Industry Showcase 3: Housewares, Furniture & Interiors */}
        {furnitureProducts.length > 0 && (
          <IndustryShowcase
            title="Housewares, Furniture & Interior Decoration"
            categorySlug="furniture"
            products={furnitureProducts}
          />
        )}

        {/* Mid-Page Technical Specification & Image Sourcing Banner */}
        <B2BSourcingBanner />

        {/* Industry Showcase 4: Cosmetics, Beauty & Personal Care */}
        {beautyProducts.length > 0 && (
          <IndustryShowcase
            title="Cosmetics, Fragrances & Personal Care"
            categorySlug="beauty"
            products={beautyProducts}
          />
        )}

        {/* Industry Showcase 5: Automobile, Motorcycle & Spares */}
        {autoProducts.length > 0 && (
          <IndustryShowcase
            title="Automobile, Motorcycle & Spares"
            categorySlug="motorcycle"
            products={autoProducts}
          />
        )}

        {/* Mid-Page IndiaMART Search Strip */}
        <MidPageSearch />

        {/* Industry Showcase 6: Watches, Jewellery & Accessories */}
        {watchProducts.length > 0 && (
          <IndustryShowcase
            title="Watches, Jewellery & Fashion Accessories"
            categorySlug="mens-watches"
            products={watchProducts}
          />
        )}

        {/* Industry Showcase 7: Apparel & Fashion Wear */}
        {fashionProducts.length > 0 && (
          <IndustryShowcase
            title="Apparel, Garments & Fashion Wear"
            categorySlug="mens-shirts"
            products={fashionProducts}
          />
        )}

        {/* Industry Showcase 8: Sports & Fitness Goods */}
        {sportsProducts.length > 0 && (
          <IndustryShowcase
            title="Sports Equipment & Fitness Accessories"
            categorySlug="sports-accessories"
            products={sportsProducts}
          />
        )}

        {/* Trust Bar, 3 Simple Steps & Hindi Strip */}
        <TrustAndSteps />

        {/* Iconic IndiaMART Bottom Quick RFQ Lead Widget */}
        <QuickRfqWidget />

      </div>
    </div>
  );
}
