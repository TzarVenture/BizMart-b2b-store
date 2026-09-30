import Link from 'next/link';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

const TOP_CITIES = [
  {
    name: 'Bengaluru',
    state: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=300&q=80&auto=format&fit=crop',
  },
  {
    name: 'Delhi',
    state: 'NCR',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&q=80&auto=format&fit=crop',
  },
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=300&q=80&auto=format&fit=crop',
  },
  {
    name: 'Chennai',
    state: 'Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&q=80&auto=format&fit=crop',
  },
  {
    name: 'Ahmedabad',
    state: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=300&q=80&auto=format&fit=crop',
  },
  {
    name: 'Kolkata',
    state: 'West Bengal',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=300&q=80&auto=format&fit=crop',
  },
  {
    name: 'Pune',
    state: 'Maharashtra',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f4439f0b?w=300&q=80&auto=format&fit=crop',
  },
  {
    name: 'Surat',
    state: 'Gujarat',
    image: 'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=300&q=80&auto=format&fit=crop',
  },
  {
    name: 'Jaipur',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300&q=80&auto=format&fit=crop',
  },
  {
    name: 'Hyderabad',
    state: 'Telangana',
    image: 'https://images.unsplash.com/photo-1605007493699-ce65834f8a00?w=300&q=80&auto=format&fit=crop',
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1e245a] text-slate-300 pt-12 pb-8 border-t border-slate-700/60">
      
      {/* Top Cities Hub (Directly from IndiaMART) */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-slate-700/60">
        <div className="flex items-center gap-2 mb-6">
          <MapPin size={18} className="text-[#00a699]" />
          <h4 className="text-base font-bold text-white tracking-wide">
            Find Products & Deliveries Across Top Cities
          </h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 text-center">
          {TOP_CITIES.map((city) => (
            <Link
              key={city.name}
              href={`/products?city=${encodeURIComponent(city.name)}`}
              className="group p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700 hover:border-[#00a699] transition flex flex-col items-center overflow-hidden"
            >
              <div className="w-full h-14 rounded-lg overflow-hidden relative mb-2 bg-slate-700">
                <img
                  src={city.image}
                  alt={city.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <p className="text-xs font-bold text-slate-200 group-hover:text-white truncate w-full">
                {city.name}
              </p>
              <span className="text-[10px] text-slate-400 block truncate w-full">{city.state}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main 5-Column IndiaMART Footer */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10 text-xs">
          
          {/* Brand Info with BizMart icon */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <img
                src="/logo-icon.png"
                alt="BizMart Logo"
                className="h-10 w-10 sm:h-11 sm:w-11 object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-2xl sm:text-[28px] font-black text-white tracking-tight leading-none">
                biz<span className="text-[#00a699]">mart</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-xs">
              India's largest online single-seller B2B marketplace. Connecting verified buyers directly with factory pricing and fast procurement.
            </p>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#00a699]" />
                <span className="font-semibold text-white">096-9696-9696</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#00a699]" />
                <span>customercare@bizmart.com</span>
              </div>
            </div>
            <div className="flex space-x-2 pt-2">
              <span className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#00a699] flex items-center justify-center text-white font-bold cursor-pointer transition">
                f
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#00a699] flex items-center justify-center text-white font-bold cursor-pointer transition">
                𝕏
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#00a699] flex items-center justify-center text-white font-bold cursor-pointer transition">
                in
              </span>
              <span className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-[#00a699] flex items-center justify-center text-white font-bold cursor-pointer transition">
                ▶
              </span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-white font-bold uppercase tracking-wider mb-4">Company</h5>
            <ul className="space-y-2.5 text-slate-400">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">BizMart Export</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Join Sales Team</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Success Stories</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Press Section</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Careers</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h5 className="text-white font-bold uppercase tracking-wider mb-4">Help & Support</h5>
            <ul className="space-y-2.5 text-slate-400">
              <li><Link href="/contact" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Feedback</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Complaints</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Customer Care</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/admin" className="hover:text-[#00a699] font-semibold transition">Lead Dashboard</Link></li>
            </ul>
          </div>

          {/* Buyers Tool Kit */}
          <div>
            <h5 className="text-white font-bold uppercase tracking-wider mb-4">Buyers Tool Kit</h5>
            <ul className="space-y-2.5 text-slate-400">
              <li><Link href="/rfq" className="hover:text-white transition">Post Your Requirement</Link></li>
              <li><Link href="/products" className="hover:text-white transition">Products You Buy</Link></li>
              <li><Link href="/categories" className="hover:text-white transition">Search Products & Categories</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Payment Protection</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Direct Sourcing Guarantee</Link></li>
            </ul>
          </div>

          {/* Direct Seller Portal */}
          <div>
            <h5 className="text-white font-bold uppercase tracking-wider mb-4">Enterprise Catalogue</h5>
            <ul className="space-y-2.5 text-slate-400">
              <li><Link href="/categories/smartphones" className="hover:text-white transition">Smartphones & Electronics</Link></li>
              <li><Link href="/categories/laptops" className="hover:text-white transition">Laptops & Computers</Link></li>
              <li><Link href="/categories/furniture" className="hover:text-white transition">Furniture & Supplies</Link></li>
              <li><Link href="/categories/groceries" className="hover:text-white transition">Groceries & Commodities</Link></li>
              <li><Link href="/categories/beauty" className="hover:text-white transition">Cosmetics & Personal Care</Link></li>
              <li><Link href="/categories/motorcycle" className="hover:text-white transition">Automobile & Spares</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/60 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© 1996-2026 BizMart InterMESH Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/shipping" className="hover:text-white transition">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
