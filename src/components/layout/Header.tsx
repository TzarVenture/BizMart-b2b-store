'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  MapPin,
  ShoppingBag,
  FileText,
  PhoneCall,
  MessageCircle,
  ShoppingCart,
  HelpCircle,
  Globe,
  User,
  ChevronDown,
  Layers,
  Camera,
} from 'lucide-react';
import { useLeadStore } from '@/lib/leadStore';

const TOP_CITIES = [
  'All India',
  'Bengaluru',
  'New Delhi',
  'Mumbai',
  'Ahmedabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Jaipur',
  'Surat',
  'Khandela',
  'Gurgaon',
  'Noida',
  'Coimbatore',
  'Indore',
  'Chandigarh',
  'Vadodara',
  'Nagpur',
  'Lucknow',
];

export default function Header() {
  const router = useRouter();
  const { openRfqModal, openSignInModal, rfqBasket } = useLeadStore();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All India');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Autocomplete suggestions using DummyJSON search
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            searchQuery.trim()
          )}&limit=5`
        );
        const data = await res.json();
        if (data.products) {
          setSuggestions(data.products.map((p: any) => p.title));
        }
      } catch (err) {
        // fallback
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectSuggestion = (term: string) => {
    setSearchQuery(term);
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs border-b border-slate-200">
      
      {/* Main Wide Navigation Header (Matching IndiaMART exact layout) */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 lg:gap-5">
          
          {/* Logo with ShoppingBag icon as requested */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2b3377] to-[#00a699] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <ShoppingBag size={22} className="stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-black tracking-tight text-[#2b3377] leading-none">
                biz<span className="text-[#00a699]">mart</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">
                B2B Marketplace
              </span>
            </div>
          </Link>

          {/* IndiaMART Location Selector Box: [ 📍 City ▾ | 🔍 ] */}
          <div ref={cityDropdownRef} className="relative hidden md:flex items-center rounded-lg border border-slate-300 bg-white shadow-2xs flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsCityDropdownOpen(!isCityDropdownOpen);
                setCityFilter('');
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-l-lg transition whitespace-nowrap"
            >
              <MapPin size={15} className="text-[#d83734] shrink-0" />
              <span className="max-w-[110px] truncate">{selectedCity}</span>
              <ChevronDown size={13} className={`text-slate-400 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className="h-5 w-[1px] bg-slate-200" />
            <button
              type="button"
              onClick={() => {
                setIsCityDropdownOpen(!isCityDropdownOpen);
                setCityFilter('');
              }}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-r-lg transition"
              title="Search and select delivery city"
            >
              <Search size={14} className="text-[#00a699]" />
            </button>

            {/* Custom City Selector Dropdown */}
            {isCityDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 p-2 text-xs">
                {/* Search Bar inside Dropdown */}
                <div className="p-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <Search size={13} className="text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                      placeholder="Search city or hub..."
                      className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none"
                      autoFocus
                    />
                    {cityFilter && (
                      <button
                        type="button"
                        onClick={() => setCityFilter('')}
                        className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="px-2 pt-2 pb-1 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Delivery Hub Cities</span>
                  <span className="text-[#00a699] font-normal normal-case">Direct Freight</span>
                </div>

                {/* Cities list with quick scroll */}
                <div className="max-h-56 overflow-y-auto space-y-0.5 pr-0.5 mt-1">
                  {TOP_CITIES.filter((c) =>
                    c.toLowerCase().includes(cityFilter.trim().toLowerCase())
                  ).map((city) => {
                    const isSelected = selectedCity === city;
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setSelectedCity(city);
                          setIsCityDropdownOpen(false);
                          setCityFilter('');
                          if (city === 'All India') {
                            router.push('/products');
                          } else {
                            router.push(`/products?city=${encodeURIComponent(city)}`);
                          }
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-lg transition flex items-center justify-between whitespace-nowrap ${
                          isSelected
                            ? 'bg-[#00a699]/10 text-[#00a699] font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin
                            size={13}
                            className={isSelected ? 'text-[#00a699]' : 'text-slate-400'}
                          />
                          <span>{city}</span>
                        </div>
                        {isSelected && (
                          <span className="text-xs text-[#00a699] font-black">✓</span>
                        )}
                      </button>
                    );
                  })}

                  {TOP_CITIES.filter((c) =>
                    c.toLowerCase().includes(cityFilter.trim().toLowerCase())
                  ).length === 0 && (
                    <div className="p-3 text-center text-slate-400 text-xs">
                      No matching city found. Delivering pan-India.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* IndiaMART Search Bar: [ Enter product / service to search     📷 | 🔍 ] */}
          <div ref={searchRef} className="flex-1 max-w-2xl relative min-w-0">
            <form onSubmit={handleSearchSubmit} className="flex items-center w-full shadow-xs">
              <div className="relative flex-1 min-w-0 flex items-center bg-white rounded-l-lg border border-r-0 border-slate-300 focus-within:border-[#00a699]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Enter product / service to search"
                  className="w-full pl-4 pr-16 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => router.push('/search?q=phone')}
                  title="Search by Camera / Image"
                  className="absolute right-3 text-slate-400 hover:text-[#00a699] transition p-1"
                >
                  <Camera size={18} className="text-[#00a699]" />
                </button>
              </div>

              <button
                type="submit"
                className="bg-[#00a699] hover:bg-[#00857a] text-white px-5 sm:px-6 py-2.5 rounded-r-lg font-bold text-xs sm:text-sm transition flex items-center justify-center border border-[#00a699] flex-shrink-0"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Autocomplete Suggestions Box */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden divide-y divide-slate-100">
                <div className="px-4 py-2 bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Suggested Products</span>
                  <span>Direct Catalogue</span>
                </div>
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-[#00a699]/10 hover:text-[#00857a] flex items-center gap-2 transition"
                  >
                    <Search size={14} className="text-slate-400" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* IndiaMART Right Utilities (From screenshot: Get Best Price, Exporters, Help, Messages, Sign In) */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            
            {/* Get Best Price (Pill button with teal border matching screenshot) */}
            <button
              onClick={() => openRfqModal()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#00a699] text-[#00a699] hover:bg-[#00a699] hover:text-white text-xs font-bold transition whitespace-nowrap shadow-2xs"
            >
              <span>Get Best Price</span>
            </button>

            {/* Quick Links with Icons (Matching IndiaMART Top Right Bar) */}
            <div className="hidden lg:flex items-center gap-4 text-slate-600 text-xs font-medium">
              <Link
                href="/products"
                className="flex flex-col items-center hover:text-[#00a699] transition whitespace-nowrap group"
              >
                <Globe size={18} className="text-slate-500 group-hover:text-[#00a699] transition" />
                <span className="text-[11px] mt-0.5">Catalogue</span>
              </Link>

              <Link
                href="/rfq"
                className="flex flex-col items-center hover:text-[#00a699] transition whitespace-nowrap relative group"
              >
                <div className="relative">
                  <ShoppingCart size={18} className="text-slate-500 group-hover:text-[#00a699] transition" />
                  {mounted && rfqBasket.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-[#ff7e00] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                      {rfqBasket.length}
                    </span>
                  )}
                </div>
                <span className="text-[11px] mt-0.5">RFQ Cart</span>
              </Link>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center hover:text-green-600 transition whitespace-nowrap group"
              >
                <MessageCircle size={18} className="text-slate-500 group-hover:text-green-600 transition" />
                <span className="text-[11px] mt-0.5">Messages</span>
              </a>

              <Link
                href="/admin"
                className="flex flex-col items-center hover:text-[#00a699] transition whitespace-nowrap group"
              >
                <Layers size={18} className="text-slate-500 group-hover:text-[#00a699] transition" />
                <span className="text-[11px] mt-0.5">CRM Leads</span>
              </Link>

              <button
                onClick={() => openSignInModal()}
                className="flex items-center gap-1 hover:text-[#00a699] transition whitespace-nowrap group border-l border-slate-200 pl-3 py-1 cursor-pointer"
              >
                <User size={18} className="text-slate-500 group-hover:text-[#00a699] transition" />
                <span className="text-xs font-semibold">Sign In</span>
                <ChevronDown size={13} className="text-slate-400" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Secondary Category Subnav Bar */}
        <div className="hidden lg:flex items-center justify-between border-t border-slate-100 mt-2.5 pt-2 text-xs font-semibold text-slate-600 gap-4">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1 flex-1">
            <Link
              href="/"
              className="text-[#00a699] hover:underline flex items-center gap-1 whitespace-nowrap flex-shrink-0 font-bold"
            >
              <span>Home</span>
            </Link>
            <Link
              href="/products"
              className="hover:text-[#00a699] transition whitespace-nowrap flex-shrink-0"
            >
              All Products
            </Link>
            <Link
              href="/categories"
              className="hover:text-[#00a699] transition whitespace-nowrap flex-shrink-0"
            >
              Categories
            </Link>
            <Link
              href="/categories/smartphones"
              className="hover:text-[#00a699] transition whitespace-nowrap flex-shrink-0"
            >
              Smartphones & Electronics
            </Link>
            <Link
              href="/categories/laptops"
              className="hover:text-[#00a699] transition whitespace-nowrap flex-shrink-0"
            >
              Laptops & Computers
            </Link>
            <Link
              href="/categories/furniture"
              className="hover:text-[#00a699] transition whitespace-nowrap flex-shrink-0"
            >
              Furniture & Interior
            </Link>
            <Link
              href="/categories/beauty"
              className="hover:text-[#00a699] transition whitespace-nowrap flex-shrink-0"
            >
              Cosmetics & Personal Care
            </Link>
            <Link
              href="/categories/mens-watches"
              className="hover:text-[#00a699] transition whitespace-nowrap flex-shrink-0"
            >
              Watches & Accessories
            </Link>
            <Link
              href="/rfq"
              className="text-[#ff7e00] hover:underline font-bold whitespace-nowrap flex-shrink-0"
            >
              Multi-Product RFQ
            </Link>
          </div>

          <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5 whitespace-nowrap flex-shrink-0">
            <HelpCircle size={14} className="text-[#00a699]" />
            <span>Need Help? <strong className="text-slate-700">096-9696-9696</strong></span>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 mt-3 pt-3 pb-4 space-y-3">
            {/* Mobile City Selector */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin size={13} className="text-[#d83734]" />
                <span>Delivery Hub: <strong className="text-slate-900">{selectedCity}</strong></span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {TOP_CITIES.slice(0, 8).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setSelectedCity(city);
                      setIsMenuOpen(false);
                      if (city === 'All India') router.push('/products');
                      else router.push(`/products?city=${encodeURIComponent(city)}`);
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                      selectedCity === city
                        ? 'bg-[#00a699] text-white'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 text-slate-800"
              >
                Home
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 text-slate-800"
              >
                All Products
              </Link>
              <Link
                href="/categories"
                onClick={() => setIsMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 text-slate-800"
              >
                Categories Hub
              </Link>
              <Link
                href="/rfq"
                onClick={() => setIsMenuOpen(false)}
                className="p-2.5 rounded-lg bg-slate-50 text-[#ff7e00] font-bold"
              >
                Multi-Product RFQ
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openRfqModal();
                }}
                className="p-2.5 rounded-lg bg-[#00a699] text-white font-bold text-center col-span-2"
              >
                Get Best Price / Post Requirement
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5 text-xs">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-slate-700 py-1 font-semibold"
              >
                <PhoneCall size={15} className="text-[#00a699]" />
                <span>Call Us: +91 98765 43210</span>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#25D366] py-1 font-bold"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Instant Inquiry</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
