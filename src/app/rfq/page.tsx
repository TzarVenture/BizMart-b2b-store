'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Trash2,
  FileText,
  ShieldCheck,
  CheckCircle,
  Plus,
  ArrowRight,
  Clock,
  Building2,
} from 'lucide-react';
import { useLeadStore } from '@/lib/leadStore';
import { formatINR } from '@/lib/api';

export default function MultiProductRFQPage() {
  const [mounted, setMounted] = useState(false);
  const {
    rfqBasket,
    removeFromRfqBasket,
    updateRfqQuantity,
    clearRfqBasket,
    addLead,
  } = useLeadStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('New Delhi');
  const [gstNumber, setGstNumber] = useState('');
  const [deliveryUrgency, setDeliveryUrgency] = useState('Within 1-2 Weeks');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLeadIds, setSubmittedLeadIds] = useState<string[]>([]);

  const totalEstPrice = rfqBasket.reduce(
    (sum, item) => sum + item.price * 83 * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    if (rfqBasket.length === 0) {
      // General RFQ
      const lead = addLead({
        customerName,
        companyName: companyName || 'Commercial Buyer',
        phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
        email: email || 'procurement@buyer.in',
        productTitle: 'Multi-Category General Sourcing Enquiry',
        quantity: 1,
        unit: 'Consignment',
        location: location || 'Pan India',
        gstNumber,
        requirementDetails: `General Sourcing. Notes: ${notes}. Delivery Timeline: ${deliveryUrgency}`,
        source: 'Request Quote',
      });
      setSubmittedLeadIds([lead.id]);
      setIsSubmitted(true);
      return;
    }

    // Consolidated leads for each item in basket
    const createdIds: string[] = [];
    rfqBasket.forEach((item) => {
      const lead = addLead({
        customerName,
        companyName: companyName || 'Commercial Enterprise Buyer',
        phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
        email: email || 'procurement@buyer.in',
        productId: item.productId,
        productTitle: item.title,
        quantity: item.quantity,
        unit: item.unit || 'Pieces',
        location: location || 'Pan India',
        gstNumber,
        requirementDetails: `Consolidated B2B RFQ. Timeline: ${deliveryUrgency}. Additional specs: ${notes}`,
        source: 'Bulk Requirement',
        estimatedValue: Math.round(item.price * 83 * item.quantity),
      });
      createdIds.push(lead.id);
    });

    setSubmittedLeadIds(createdIds);
    clearRfqBasket();
    setIsSubmitted(true);
  };

  if (!mounted) {
    return (
      <div className="bg-[#f4f5f8] min-h-screen py-8">
        <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 animate-pulse">
            <div className="h-5 w-48 bg-slate-200 rounded mb-3" />
            <div className="h-8 w-80 bg-slate-200 rounded mb-2" />
            <div className="h-4 w-96 bg-slate-100 rounded" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 h-80 animate-pulse" />
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 h-96 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f5f8] min-h-screen py-8">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#00a699]">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">Multi-Product RFQ</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 mb-8 shadow-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff7e00]/10 text-[#e67100] text-xs font-bold uppercase mb-2">
            <FileText size={13} />
            <span>Procurement Cart • Consolidated RFQ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Multi-Product Request for Quotation (RFQ)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Bundle multiple products into a single purchase requirement. Our centralized B2B sales team prepares one consolidated volume quotation with GST invoice.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm max-w-2xl mx-auto text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Consolidated RFQ Submitted Successfully!
            </h2>
            <p className="text-sm text-slate-600">
              Thank you, <strong>{customerName}</strong>. Your requirement has been logged directly into our central CRM.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Generated Lead Ref IDs:</span>
                <span className="font-mono font-bold text-primary">
                  {submittedLeadIds.join(', ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Mobile:</span>
                <span className="font-medium text-slate-800">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Expected Sales Callback:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <Clock size={12} /> Within 15-30 minutes
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center pt-2">
              <Link
                href="/admin"
                className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition"
              >
                View in Lead CRM
              </Link>
              <Link
                href="/products"
                className="px-6 py-2.5 bg-[#00a699] hover:bg-[#00857a] text-white rounded-xl text-xs font-bold transition"
              >
                Browse More Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Basket Items */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={18} className="text-[#00a699]" />
                    <h3 className="font-bold text-slate-900 text-base">
                      Selected Items ({rfqBasket.length})
                    </h3>
                  </div>
                  {rfqBasket.length > 0 && (
                    <button
                      onClick={clearRfqBasket}
                      className="text-xs text-red-500 hover:text-red-700 transition font-semibold"
                    >
                      Clear List
                    </button>
                  )}
                </div>

                {rfqBasket.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 space-y-3">
                    <ShoppingCart size={40} className="mx-auto text-slate-300" />
                    <p className="text-sm font-semibold text-slate-700">
                      Your RFQ Basket is currently empty
                    </p>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Add products from our catalogue or submit a custom requirement using the form on the right.
                    </p>
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00a699] text-white text-xs font-bold rounded-lg hover:bg-[#00857a] transition"
                    >
                      <Plus size={14} />
                      <span>Browse Products to Add</span>
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {rfqBasket.map((item) => (
                      <div
                        key={item.productId}
                        className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-14 object-contain rounded-lg bg-slate-50 p-1 border border-slate-200 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <Link
                              href={`/products/${item.productId}`}
                              className="font-bold text-sm text-slate-800 hover:text-[#00a699] transition line-clamp-1 block"
                            >
                              {item.title}
                            </Link>
                            <p className="text-xs text-slate-400">
                              Wholesale: <strong className="text-slate-700">{formatINR(item.price)}</strong> / Piece (Min: {item.moq})
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                            <button
                              onClick={() =>
                                updateRfqQuantity(item.productId, item.quantity - 5)
                              }
                              className="px-2.5 py-1 text-slate-600 font-bold hover:bg-slate-200 text-xs"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateRfqQuantity(
                                  item.productId,
                                  Number(e.target.value)
                                )
                              }
                              className="w-14 text-center text-xs font-bold bg-white outline-none py-1"
                            />
                            <button
                              onClick={() =>
                                updateRfqQuantity(item.productId, item.quantity + 5)
                              }
                              className="px-2.5 py-1 text-slate-600 font-bold hover:bg-slate-200 text-xs"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs text-slate-500 font-medium">
                            {item.unit || 'Pieces'}
                          </span>
                          <button
                            onClick={() => removeFromRfqBasket(item.productId)}
                            className="text-slate-400 hover:text-red-500 p-1 transition"
                            title="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {rfqBasket.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center text-xs">
                    <span className="text-slate-500">Estimated Sourcing Value:</span>
                    <span className="font-extrabold text-base text-slate-900">
                      ₹{totalEstPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Consolidated Buyer RFQ Form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-base pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Building2 size={18} className="text-[#00a699]" />
                  <span>Buyer Information & Requirements</span>
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-[#00a699] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number (+91) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="9876543210"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-[#00a699] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="buyer@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-[#00a699] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Acme Industries Ltd"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-[#00a699] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        GST Number (Optional)
                      </label>
                      <input
                        type="text"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
                        placeholder="07AAAAA0000A1Z5"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-[#00a699] outline-none uppercase font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Delivery City / State
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Pune, Maharashtra"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-[#00a699] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Required Timeline
                      </label>
                      <select
                        value={deliveryUrgency}
                        onChange={(e) => setDeliveryUrgency(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-[#00a699] outline-none bg-white"
                      >
                        <option>Immediate (1-3 Days)</option>
                        <option>Within 1-2 Weeks</option>
                        <option>Within 1 Month</option>
                        <option>Rate Contract / Long Term</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Consolidated Requirement Notes
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Specify packaging specifications, custom branding, payment terms or delivery dock instructions..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:border-[#00a699] outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ff7e00] hover:bg-[#e67100] text-white py-3 rounded-xl font-bold text-sm transition shadow-md shadow-[#ff7e00]/25 flex items-center justify-center gap-2"
                  >
                    <span>Submit Consolidated Procurement RFQ</span>
                    <ArrowRight size={16} />
                  </button>
                </form>

                <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  Direct Single-Seller Quotation • Official Commercial Terms
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
