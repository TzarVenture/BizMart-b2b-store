'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  ShoppingCart,
  CheckCircle2,
  Clock,
  MessageCircle,
  PhoneCall,
  RotateCcw,
  LogOut,
  Save,
  ArrowRight,
  ShieldCheck,
  Search,
  Filter,
  Package,
} from 'lucide-react';
import { useLeadStore, LeadStatus } from '@/lib/leadStore';
import { formatINR } from '@/lib/api';

export default function BuyerProfilePage() {
  const router = useRouter();
  const {
    buyerUser,
    logoutBuyer,
    loginBuyer,
    updateBuyerProfile,
    leads,
    rfqBasket,
    openRfqModal,
    openSignInModal,
  } = useLeadStore();

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'enquiries' | 'rfq' | 'profile'>('enquiries');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Profile Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    companyName: '',
    city: '',
    gstNumber: '',
  });

  // Login Form state for unauthenticated state
  const [loginPhone, setLoginPhone] = useState('9876543210');
  const [loginOtp, setLoginOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (buyerUser) {
      setFormData({
        name: buyerUser.name || '',
        phone: buyerUser.phone || '',
        email: buyerUser.email || '',
        companyName: buyerUser.companyName || '',
        city: buyerUser.city || 'Bengaluru',
        gstNumber: buyerUser.gstNumber || '',
      });
    }
  }, [buyerUser]);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#00a699] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If user is not logged in, show dedicated Buyer Portal Login page
  if (!buyerUser || !buyerUser.isLoggedIn) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Info Panel */}
            <div className="bg-gradient-to-br from-[#282c3f] to-[#1e2230] text-white p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#00a699]/20 text-[#00a699] text-xs font-bold uppercase tracking-wider mb-4 border border-[#00a699]/30">
                  BizMart Buyer Hub
                </span>
                <h1 className="text-2xl md:text-3xl font-black leading-tight text-white mb-3">
                  Access Your B2B Buyer Account
                </h1>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-6">
                  Track live manufacturer quotations, manage your multi-product RFQ carts, and access wholesale deals directly.
                </p>

                <div className="space-y-3.5 text-xs text-slate-200">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#00a699] flex-shrink-0" />
                    <span>Real-time quotation tracking & price negotiations</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#00a699] flex-shrink-0" />
                    <span>Pre-filled RFQ forms for one-click requirements</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#00a699] flex-shrink-0" />
                    <span>Direct access to dedicated B2B Key Account Managers</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#00a699] flex-shrink-0" />
                    <span>Verified GST tax invoices & pro-forma billing</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-700/60 mt-8 text-xs text-slate-400">
                <span>Direct B2B Helpline: <strong>+91 98765 43210</strong></span>
              </div>
            </div>

            {/* Right Login Action Panel */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Sign In as Buyer</h2>
              <p className="text-xs text-slate-500 mb-6">Enter your mobile number to receive a secure OTP</p>

              {!otpSent ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (+91)
                    </label>
                    <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden focus-within:border-[#00a699] focus-within:ring-1 focus-within:ring-[#00a699]">
                      <span className="bg-slate-100 px-3 py-2.5 text-xs font-semibold text-slate-600 border-r border-slate-300">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={loginPhone}
                        onChange={(e) => setLoginPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full px-3 py-2.5 text-sm outline-none font-medium"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setOtpSent(true)}
                    className="w-full py-3 bg-[#00a699] hover:bg-[#008f84] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
                  >
                    Request OTP via SMS
                  </button>

                  <div className="relative my-4 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <span className="relative bg-white px-3 text-[11px] text-slate-400 font-medium uppercase">
                      Or Quick Demo Access
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      loginBuyer({
                        name: 'Rajesh Sharma',
                        phone: '+91 98765 43210',
                        companyName: 'Sharma Industrial Supplies',
                        email: 'rajesh.sharma@sharmasupplies.in',
                        city: 'Bengaluru',
                        gstNumber: '29ABCDE1234F1Z5',
                      });
                    }}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-2 border border-slate-300"
                  >
                    <User size={15} className="text-[#00a699]" />
                    <span>Instant Demo Login (Rajesh Sharma)</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Demo OTP <strong>1234</strong> sent to +91 {loginPhone}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Enter 4-Digit OTP
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      placeholder="1234"
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-center text-lg font-black tracking-widest outline-none focus:border-[#00a699] focus:ring-1 focus:ring-[#00a699]"
                    />
                  </div>

                  <button
                    onClick={() => {
                      loginBuyer({
                        name: 'Rajesh Sharma',
                        phone: `+91 ${loginPhone}`,
                        companyName: 'Sharma Industrial Supplies',
                        email: 'rajesh.sharma@sharmasupplies.in',
                        city: 'Bengaluru',
                        gstNumber: '29ABCDE1234F1Z5',
                      });
                    }}
                    className="w-full py-3 bg-[#00a699] hover:bg-[#008f84] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
                  >
                    Verify & Enter Buyer Portal
                  </button>

                  <button
                    onClick={() => setOtpSent(false)}
                    className="w-full text-center text-xs text-slate-500 hover:underline cursor-pointer"
                  >
                    Change Mobile Number
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Filter leads matching this buyer
  const userLeads = leads.filter(
    (l) =>
      l.phone.replace(/\D/g, '').includes(buyerUser.phone.replace(/\D/g, '')) ||
      l.customerName.toLowerCase() === buyerUser.name.toLowerCase()
  );

  const filteredLeads = userLeads.filter((lead) => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      lead.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const quotationsSentCount = userLeads.filter((l) => l.status === 'Quotation Sent').length;

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBuyerProfile(formData);
  };

  return (
    <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* User Details */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#00a699] text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-md ring-4 ring-[#00a699]/10">
              {buyerUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {buyerUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Verified Buyer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5 flex items-center gap-1.5">
                <Building2 size={14} className="text-slate-400" />
                {buyerUser.companyName || 'Industrial Trader / Buyer'}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2 flex-wrap">
                <span className="font-mono text-slate-600 font-medium">{buyerUser.phone}</span>
                <span>•</span>
                <span>{buyerUser.email || 'buyer@indiamart.in'}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {buyerUser.city || 'Bengaluru'}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
            <button
              onClick={() => openRfqModal()}
              className="px-4 py-2.5 bg-[#00a699] hover:bg-[#008f84] text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <FileText size={15} />
              <span>Post New RFQ</span>
            </button>
            <button
              onClick={() => {
                logoutBuyer();
                router.push('/');
              }}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-200"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>

        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
            <span className="text-slate-400 block font-medium mb-1">Total RFQs Submitted</span>
            <span className="text-2xl font-black text-slate-900">{userLeads.length}</span>
          </div>

          <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100">
            <span className="text-emerald-700 block font-medium mb-1">Quotations Ready</span>
            <span className="text-2xl font-black text-emerald-800">{quotationsSentCount}</span>
          </div>

          <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-100">
            <span className="text-amber-700 block font-medium mb-1">Items in RFQ Cart</span>
            <span className="text-2xl font-black text-amber-800">{rfqBasket.length}</span>
          </div>

          <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100">
            <span className="text-blue-700 block font-medium mb-1">Direct Sales Support</span>
            <span className="text-sm font-black text-blue-900 block mt-1">+91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6 pb-2 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'enquiries'
              ? 'bg-[#00a699] text-white shadow-xs'
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <FileText size={16} />
          <span>My Enquiries & RFQs ({userLeads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('rfq')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'rfq'
              ? 'bg-[#00a699] text-white shadow-xs'
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <ShoppingCart size={16} />
          <span>RFQ Basket ({rfqBasket.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#00a699] text-white shadow-xs'
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <Building2 size={16} />
          <span>Company & Billing Profile</span>
        </button>
      </div>

      {/* Tab 1: Enquiries & Quotations */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search size={15} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product or RFQ ID..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-[#00a699]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
              <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
                <Filter size={13} /> Filter:
              </span>
              {['All', 'Quotation Sent', 'New', 'Follow-up', 'Won'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    statusFilter === status
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Leads Listing */}
          {filteredLeads.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FileText size={28} />
              </div>
              <h3 className="font-bold text-base text-slate-800">No Enquiries Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                You haven't submitted any RFQ requirements matching this filter yet. Browse products or submit an instant requirement.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openRfqModal()}
                  className="px-5 py-2.5 bg-[#00a699] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#008f84] cursor-pointer"
                >
                  Post Your First Requirement
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredLeads.map((lead) => {
                const whatsappMessage = encodeURIComponent(
                  `Hello BizMart Sales Team, I would like an update on my Quotation Reference "${lead.id}" for "${lead.productTitle}". Please share proforma invoice and delivery timeline.`
                );

                return (
                  <div
                    key={lead.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between gap-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-slate-800">
                            {lead.id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              lead.status === 'Quotation Sent'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : lead.status === 'Won'
                                ? 'bg-purple-100 text-purple-800'
                                : lead.status === 'Follow-up'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {lead.status === 'Quotation Sent' ? '✓ Quotation Sent' : lead.status}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 mt-0.5 block">
                          Submitted on {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[11px] text-slate-400 block">Assigned Key Account Manager</span>
                        <span className="text-xs font-bold text-slate-800">
                          {lead.assignedTo || 'Rahul Sharma (Senior B2B Specialist)'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
                          {lead.productTitle}
                        </h4>
                        <div className="flex items-center gap-4 text-slate-600 mt-1">
                          <span>
                            Quantity: <strong className="text-slate-900">{lead.quantity} {lead.unit}</strong>
                          </span>
                          {lead.estimatedValue && (
                            <span>
                              Estimated Value: <strong className="text-emerald-700">{formatINR(lead.estimatedValue)}</strong>
                            </span>
                          )}
                          <span>
                            Delivery City: <strong className="text-slate-900">{lead.location}</strong>
                          </span>
                        </div>
                        {lead.requirementDetails && (
                          <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2.5">
                            "{lead.requirementDetails}"
                          </p>
                        )}
                      </div>

                      {/* Action Buttons for Lead */}
                      <div className="flex flex-col justify-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-100 sm:pl-4 pt-3 sm:pt-0">
                        <a
                          href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
                        >
                          <MessageCircle size={14} />
                          <span>Discuss on WhatsApp</span>
                        </a>

                        <button
                          onClick={() => {
                            openRfqModal({
                              id: lead.productId || 1,
                              title: lead.productTitle,
                              image: 'https://dummyjson.com/image/300x300',
                              moq: lead.quantity,
                              price: Math.round((lead.estimatedValue || 5000) / lead.quantity / 83),
                            });
                          }}
                          className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <RotateCcw size={13} />
                          <span>Repeat / Re-order RFQ</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* Tab 2: RFQ Cart */}
      {activeTab === 'rfq' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Multi-Product RFQ Basket</h3>
              <p className="text-xs text-slate-500">
                Submit a single composite quotation request for multiple catalogue items
              </p>
            </div>
            <Link
              href="/rfq"
              className="px-4 py-2 bg-[#ff7e00] hover:bg-[#e67100] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>Go to RFQ Checkout</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {rfqBasket.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingCart size={24} />
              </div>
              <p className="text-sm font-bold text-slate-800">Your RFQ basket is empty</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click "+ Add to Multi-Product RFQ" on any product card or catalogue page to aggregate items into your quote.
              </p>
              <Link
                href="/products"
                className="inline-block px-5 py-2.5 bg-[#00a699] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#008f84]"
              >
                Explore Catalogue
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {rfqBasket.map((item) => (
                <div key={item.productId} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain bg-slate-50 rounded-lg p-1 border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">{item.title}</h4>
                      <p className="text-[11px] text-slate-500">
                        Wholesale Rate: {formatINR(item.price)} • Quantity: {item.quantity} {item.unit || 'Pieces'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900 block">
                      {formatINR(item.price * item.quantity * 83)}
                    </span>
                    <span className="text-[10px] text-slate-400">Est. Total</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Company & Billing Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-3xl">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h3 className="font-bold text-lg text-slate-900">Company & Billing Profile</h3>
            <p className="text-xs text-slate-500">
              Your saved contact information is automatically pre-filled into all RFQs for fastest turnaround
            </p>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#00a699] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Firm Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#00a699] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#00a699] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Business Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#00a699] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Delivery City / Hub
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#00a699] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GSTIN / Tax Identification
                </label>
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                  placeholder="e.g. 29ABCDE1234F1Z5"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#00a699] outline-none font-mono uppercase"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                🔒 Data secured under BizMart B2B Enterprise Privacy Guidelines
              </span>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#00a699] hover:bg-[#008f84] text-white rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Save size={15} />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
