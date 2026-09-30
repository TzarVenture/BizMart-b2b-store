'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  MapPin,
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
  LogOut,
  CheckCircle2,
  ChevronRight,
  Package,
  Sparkles,
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

const CATEGORY_ITEMS = [
  { name: 'Smartphones & Electronics', slug: 'smartphones', icon: '📱' },
  { name: 'Laptops & Computers', slug: 'laptops', icon: '💻' },
  { name: 'Furniture & Interior', slug: 'furniture', icon: '🪑' },
  { name: 'Beauty & Personal Care', slug: 'beauty', icon: '💄' },
  { name: 'Watches & Accessories', slug: 'mens-watches', icon: '⌚' },
  { name: 'Groceries & Provisions', slug: 'groceries', icon: '🛒' },
  { name: 'Automotive & Industrial', slug: 'motorcycle', icon: '⚙️' },
];

export default function Header() {
  const router = useRouter();
  const {
    openRfqModal,
    openSignInModal,
    rfqBasket,
    buyerUser,
    logoutBuyer,
    leads,
  } = useLeadStore();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All India');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const userLeadsCount = buyerUser
    ? leads.filter(
        (l) =>
          l.phone.replace(/\D/g, '').includes(buyerUser.phone.replace(/\D/g, '')) ||
          l.customerName.toLowerCase() === buyerUser.name.toLowerCase()
      ).length
    : 0;

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

  // Click outside to close desktop dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setIsMobileSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectSuggestion = (term: string) => {
    setSearchQuery(term);
    setShowSuggestions(false);
    setIsMobileSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs border-b border-slate-200">
      {/* Main Navigation Header */}
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3 lg:gap-5">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <img
              src="/logo-icon.png"
              alt="BizMart Logo"
              className="h-9 w-9 sm:h-11 sm:w-11 object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-2xl sm:text-[28px] font-black tracking-tight text-[#2b3377] leading-none">
              biz<span className="text-[#00a699]">mart</span>
            </span>
          </Link>

          {/* IndiaMART Location Selector Box: Desktop Only */}
          <div
            ref={cityDropdownRef}
            className="relative hidden md:flex items-center rounded-lg border border-slate-300 bg-white shadow-2xs flex-shrink-0"
          >
            <button
              type="button"
              onClick={() => {
                setIsCityDropdownOpen(!isCityDropdownOpen);
                setCityFilter('');
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-l-lg transition whitespace-nowrap cursor-pointer"
            >
              <MapPin size={15} className="text-[#d83734] shrink-0" />
              <span className="max-w-[110px] truncate">{selectedCity}</span>
              <ChevronDown
                size={13}
                className={`text-slate-400 transition-transform ${
                  isCityDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div className="h-5 w-[1px] bg-slate-200" />
            <button
              type="button"
              onClick={() => {
                setIsCityDropdownOpen(!isCityDropdownOpen);
                setCityFilter('');
              }}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-r-lg transition cursor-pointer"
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
                        className={`w-full text-left px-2.5 py-2 rounded-lg transition flex items-center justify-between whitespace-nowrap cursor-pointer ${
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

          {/* Desktop Search Bar (Hidden on Mobile to prevent any squeezing) */}
          <div ref={searchRef} className="hidden lg:block flex-1 max-w-2xl relative min-w-0">
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
                className="bg-[#00a699] hover:bg-[#00857a] text-white px-5 sm:px-6 py-2.5 rounded-r-lg font-bold text-xs sm:text-sm transition flex items-center justify-center border border-[#00a699] flex-shrink-0 cursor-pointer"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Desktop Autocomplete Suggestions Box */}
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
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-[#00a699]/10 hover:text-[#00857a] flex items-center gap-2 transition cursor-pointer"
                  >
                    <Search size={14} className="text-slate-400" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Right Utilities */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            {/* Get Best Price */}
            <button
              onClick={() => openRfqModal()}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#00a699] text-[#00a699] hover:bg-[#00a699] hover:text-white text-xs font-bold transition whitespace-nowrap shadow-2xs cursor-pointer"
            >
              <span>Get Best Price</span>
            </button>

            {/* Quick Links with Icons */}
            <div className="flex items-center gap-4 text-slate-600 text-xs font-medium">
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
                  <ShoppingCart
                    size={18}
                    className="text-slate-500 group-hover:text-[#00a699] transition"
                  />
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
                <MessageCircle
                  size={18}
                  className="text-slate-500 group-hover:text-green-600 transition"
                />
                <span className="text-[11px] mt-0.5">Messages</span>
              </a>

              <Link
                href="/admin"
                className="flex flex-col items-center hover:text-[#00a699] transition whitespace-nowrap group"
              >
                <Layers
                  size={18}
                  className="text-slate-500 group-hover:text-[#00a699] transition"
                />
                <span className="text-[11px] mt-0.5">CRM Leads</span>
              </Link>

              {mounted && buyerUser?.isLoggedIn ? (
                <div ref={userMenuRef} className="relative border-l border-slate-200 pl-3">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 hover:text-[#00a699] transition whitespace-nowrap group py-1 cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#00a699] text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-emerald-200">
                      {buyerUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-[#00a699] leading-tight">
                        {buyerUser.name.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Buyer Portal</span>
                    </div>
                    <ChevronDown
                      size={13}
                      className={`text-slate-400 transition-transform ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 text-xs divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-2.5">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-900 text-sm">{buyerUser.name}</p>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 size={10} /> Verified
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          {buyerUser.phone}
                        </p>
                        {buyerUser.companyName && (
                          <p className="text-[11px] text-slate-600 font-medium truncate mt-1">
                            🏢 {buyerUser.companyName}
                          </p>
                        )}
                      </div>

                      <div className="py-1.5 space-y-0.5">
                        <Link
                          href="/buyer"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition flex items-center justify-between text-slate-700 font-semibold group"
                        >
                          <span className="flex items-center gap-2 group-hover:text-[#00a699]">
                            <FileText size={15} className="text-[#00a699]" /> My Enquiries & RFQs
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                            {userLeadsCount}
                          </span>
                        </Link>

                        <Link
                          href="/buyer"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition flex items-center gap-2 text-slate-700 font-semibold group"
                        >
                          <User size={15} className="text-slate-400 group-hover:text-[#00a699]" />
                          <span>Buyer Profile & Settings</span>
                        </Link>

                        <Link
                          href="/rfq"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition flex items-center justify-between text-slate-700 font-semibold group"
                        >
                          <span className="flex items-center gap-2 group-hover:text-[#ff7e00]">
                            <ShoppingCart size={15} className="text-[#ff7e00]" /> My RFQ Cart
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-mono font-bold">
                            {rfqBasket.length}
                          </span>
                        </Link>
                      </div>

                      <div className="pt-1.5">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logoutBuyer();
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 transition font-semibold flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openSignInModal()}
                  className="flex items-center gap-1 hover:text-[#00a699] transition whitespace-nowrap group border-l border-slate-200 pl-3 py-1 cursor-pointer"
                >
                  <User size={18} className="text-slate-500 group-hover:text-[#00a699] transition" />
                  <span className="text-xs font-semibold">Sign In</span>
                  <ChevronDown size={13} className="text-slate-400" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Right Utilities: Search Icon ONLY (toggles search field), RFQ Cart, and Hamburger */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Search Icon Button (Opens Search Field without squeezing) */}
            <button
              type="button"
              onClick={() => {
                setIsMobileSearchOpen(!isMobileSearchOpen);
                if (!isMobileSearchOpen) {
                  setTimeout(() => mobileSearchInputRef.current?.focus(), 150);
                }
              }}
              className={`p-2 rounded-lg transition cursor-pointer ${
                isMobileSearchOpen
                  ? 'bg-[#00a699]/10 text-[#00a699]'
                  : 'text-slate-700 hover:text-[#00a699] hover:bg-slate-100'
              }`}
              title="Search BizMart"
              aria-label="Toggle Search Bar"
            >
              <Search size={21} />
            </button>

            {/* Mobile RFQ Cart Link with Live Counter Badge */}
            <Link
              href="/rfq"
              className="p-2 text-slate-700 hover:text-[#00a699] hover:bg-slate-100 rounded-lg relative transition"
              title="RFQ Cart"
              aria-label="RFQ Cart"
            >
              <ShoppingCart size={21} />
              {mounted && rfqBasket.length > 0 && (
                <span className="absolute 1 top-1 right-1 bg-[#ff7e00] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {rfqBasket.length}
                </span>
              )}
            </Link>

            {/* Industry Standard Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Expandable Mobile Search Field Bar: Opens cleanly without squeezing the navbar */}
        {isMobileSearchOpen && (
          <div className="lg:hidden mt-2.5 pt-2 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <div className="relative flex-1 flex items-center bg-slate-50 rounded-lg border border-slate-300 focus-within:border-[#00a699] focus-within:bg-white shadow-2xs">
                <Search size={15} className="absolute left-3 text-slate-400 shrink-0" />
                <input
                  ref={mobileSearchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Enter product / service to search..."
                  className="w-full pl-9 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none bg-transparent"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSuggestions([]);
                    }}
                    className="absolute right-2 text-slate-400 hover:text-slate-600 text-xs font-bold p-1"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="bg-[#00a699] hover:bg-[#00857a] text-white px-3.5 py-2 rounded-lg font-bold text-xs transition shrink-0 cursor-pointer shadow-2xs"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileSearchOpen(false);
                  setShowSuggestions(false);
                }}
                className="text-slate-500 hover:text-slate-800 text-xs font-semibold px-1 py-2 cursor-pointer"
              >
                Cancel
              </button>
            </form>

            {/* Mobile Autocomplete Suggestions Box */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="mt-2 bg-white border border-slate-200 rounded-xl shadow-xl divide-y divide-slate-100 overflow-hidden">
                <div className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                  <span>Suggested Products</span>
                  <span className="text-[#00a699]">Direct Catalogue</span>
                </div>
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full text-left px-3.5 py-2.5 text-xs text-slate-700 hover:bg-[#00a699]/10 flex items-center gap-2 transition cursor-pointer"
                  >
                    <Search size={13} className="text-slate-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Secondary Category Subnav Bar: Desktop Only */}
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
            <span>
              Need Help? <strong className="text-slate-700">096-9696-9696</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-[990] transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Industry Standard Mobile Side Drawer (Sliding from Left with dynamic viewport height) */}
      <aside
        className={`fixed inset-y-0 left-0 h-full h-[100dvh] max-h-[100dvh] w-[88%] max-w-[340px] bg-white z-[1000] shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 ease-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Industry Standard Navy Blue Header Banner */}
        <div className="bg-[#2b3377] text-white p-4 sm:p-5 flex-shrink-0 relative">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>

          {mounted && buyerUser?.isLoggedIn ? (
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white text-[#2b3377] flex items-center justify-center font-black text-base shadow-md ring-2 ring-emerald-300 shrink-0">
                  {buyerUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-white truncate">{buyerUser.name}</h3>
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[9px] font-bold shrink-0">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-mono truncate">{buyerUser.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Link
                  href="/buyer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold text-center transition border border-white/20 truncate"
                >
                  Buyer Portal ({userLeadsCount} RFQs)
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    logoutBuyer();
                  }}
                  className="py-1.5 px-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-semibold border border-red-400/30 transition cursor-pointer shrink-0"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center font-bold shrink-0">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Hello, Welcome!</h3>
                  <p className="text-[11px] text-slate-300">Sign in for direct factory rates</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  openSignInModal();
                }}
                className="w-full py-2 px-4 rounded-xl bg-[#00a699] hover:bg-[#008f84] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Sign In / Register</span>
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Container for All Body & Footer Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain flex flex-col justify-between">
          <div className="p-4 space-y-4">
            {/* Featured B2B Actions */}
            <div className="space-y-2">
              {/* Post Requirement CTA Button */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openRfqModal();
                }}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-[#00a699] to-[#008f84] text-white font-bold text-xs shadow-sm transition flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText size={17} className="text-white shrink-0" />
                  <div className="text-left">
                    <div className="leading-tight">Post Buy Requirement</div>
                    <div className="text-[10px] text-teal-100 font-normal">Get instant supplier quotes</div>
                  </div>
                </div>
                <ChevronRight size={16} className="text-white/80 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* Multi-Product RFQ Basket */}
              <Link
                href="/rfq"
                onClick={() => setIsMenuOpen(false)}
                className="w-full p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-slate-800 font-bold text-xs transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingCart size={17} className="text-[#ff7e00] shrink-0" />
                  <div className="text-left">
                    <div className="text-slate-900 leading-tight">Multi-Product RFQ Basket</div>
                    <div className="text-[10px] text-slate-500 font-normal">Bulk quotation cart</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#ff7e00] text-white text-[11px] font-mono font-black shrink-0">
                  {mounted ? rfqBasket.length : 0}
                </span>
              </Link>
            </div>

            {/* Quick Hub Location Selector */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <MapPin size={12} className="text-[#d83734] shrink-0" />
                  <span>Delivery Hub: <strong className="text-slate-900">{selectedCity}</strong></span>
                </span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                {TOP_CITIES.slice(0, 7).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setSelectedCity(city);
                      setIsMenuOpen(false);
                      if (city === 'All India') router.push('/products');
                      else router.push(`/products?city=${encodeURIComponent(city)}`);
                    }}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
                      selectedCity === city
                        ? 'bg-[#00a699] text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Sourcing Categories Directory */}
            <div>
              <div className="px-1 mb-1.5 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Sourcing Categories</span>
                <Link
                  href="/categories"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#00a699] hover:underline normal-case font-semibold"
                >
                  View All →
                </Link>
              </div>
              <div className="space-y-0.5 text-xs font-semibold text-slate-700">
                {CATEGORY_ITEMS.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition group"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base">{cat.icon}</span>
                      <span className="group-hover:text-[#00a699] transition">{cat.name}</span>
                    </span>
                    <ChevronRight size={13} className="text-slate-300 group-hover:text-[#00a699] transition shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Pages */}
            <div className="border-t border-slate-100 pt-2 space-y-0.5 text-xs font-semibold text-slate-700">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition"
              >
                <Globe size={15} className="text-[#00a699] shrink-0" />
                <span>Marketplace Home</span>
              </Link>

              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition"
              >
                <Package size={15} className="text-slate-400 shrink-0" />
                <span>Full Product Catalogue</span>
              </Link>

              <Link
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition"
              >
                <Layers size={15} className="text-slate-400 shrink-0" />
                <span>CRM Leads Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Guaranteed Visible Bottom Action Buttons with Ample Clearance (pb-10) */}
          <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50 space-y-2 text-xs mt-auto pb-10 sm:pb-6">
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition shadow-2xs"
              >
                <PhoneCall size={14} className="text-[#00a699] shrink-0" />
                <span>Call Help</span>
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#1da851] font-bold hover:bg-[#25D366]/20 transition shadow-2xs"
              >
                <MessageCircle size={14} className="shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="text-[10px] text-center text-slate-400 pt-1 pb-1">
              BizMart B2B Marketplace • Verified Direct Sourcing
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
}
