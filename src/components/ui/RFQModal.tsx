'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldCheck, Clock, FileText, Phone, Building2 } from 'lucide-react';
import { useLeadStore } from '@/lib/leadStore';
import { formatINR } from '@/lib/api';

export default function RFQModal() {
  const { isRfqModalOpen, selectedProductForRfq, closeRfqModal, addLead, buyerUser } = useLeadStore();

  const [productTitle, setProductTitle] = useState('');
  const [quantity, setQuantity] = useState<number>(50);
  const [unit, setUnit] = useState('Pieces');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('Delhi');
  const [gstNumber, setGstNumber] = useState('');
  const [requirementDetails, setRequirementDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState('');

  useEffect(() => {
    if (selectedProductForRfq) {
      setProductTitle(selectedProductForRfq.title);
      setQuantity(selectedProductForRfq.moq || 25);
    } else {
      setProductTitle('');
      setQuantity(50);
    }

    if (buyerUser && buyerUser.isLoggedIn) {
      setCustomerName(buyerUser.name || '');
      setPhone(buyerUser.phone.replace('+91 ', '').replace('+91', '').trim());
      setEmail(buyerUser.email || '');
      setCompanyName(buyerUser.companyName || '');
      setLocation(buyerUser.city || 'Delhi');
      setGstNumber(buyerUser.gstNumber || '');
    }

    setIsSubmitted(false);
  }, [selectedProductForRfq, isRfqModalOpen, buyerUser]);

  if (!isRfqModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productTitle || !phone || !customerName) return;

    const lead = addLead({
      customerName,
      companyName: companyName || 'Individual Trader / Buyer',
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      email: email || 'buyer@indiamart-buyer.in',
      productId: selectedProductForRfq?.id,
      productTitle,
      quantity,
      unit,
      location: location || 'All India',
      requirementDetails,
      gstNumber,
      source: selectedProductForRfq ? 'Product Enquiry' : 'Request Quote',
      estimatedValue: selectedProductForRfq
        ? Math.round(selectedProductForRfq.price * 83 * quantity)
        : undefined,
    });

    setSubmittedLeadId(lead.id);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#282c3f] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00a699] flex items-center justify-center font-bold text-white text-sm">
              RFQ
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {isSubmitted ? 'Requirement Submitted' : 'Request for Quotation (RFQ)'}
              </h3>
              <p className="text-xs text-slate-300">
                Direct Manufacturer Quotes • Fast B2B Response
              </p>
            </div>
          </div>
          <button
            onClick={closeRfqModal}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>
            <h4 className="text-2xl font-bold text-slate-800">Thank You, {customerName}!</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your requirement for <strong className="text-slate-900">{productTitle}</strong> ({quantity} {unit}) has been dispatched to our sales desk.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Lead Reference ID:</span>
                <span className="font-mono font-bold text-primary">{submittedLeadId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Team:</span>
                <span className="font-medium text-slate-700">Central Sales Desk</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Response:</span>
                <span className="font-medium text-emerald-600 flex items-center gap-1">
                  <Clock size={12} /> Within 15 minutes
                </span>
              </div>
            </div>

            <div className="pt-4 flex gap-3 justify-center">
              <a
                href="/admin"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold transition"
              >
                View in Sales Dashboard
              </a>
              <button
                onClick={closeRfqModal}
                className="px-5 py-2.5 bg-[#00a699] hover:bg-[#00857a] text-white rounded-lg text-sm font-semibold transition"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            {buyerUser && buyerUser.isLoggedIn && (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-emerald-600 flex-shrink-0" />
                  <span>
                    Auto-filled for <strong>{buyerUser.name}</strong> ({buyerUser.phone})
                  </span>
                </div>
                <span className="font-semibold text-[11px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                  Verified Buyer
                </span>
              </div>
            )}
            {selectedProductForRfq && (
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <img
                  src={selectedProductForRfq.image}
                  alt={selectedProductForRfq.title}
                  className="w-14 h-14 object-contain rounded bg-white p-1 border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-slate-900 truncate">
                    {selectedProductForRfq.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    Est. Wholesale: <span className="font-semibold text-emerald-700">{formatINR(selectedProductForRfq.price)}</span> • Min Order: {selectedProductForRfq.moq} Units
                  </p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Product / Service Required *
              </label>
              <input
                type="text"
                required
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="e.g. Industrial Centrifugal Pump or Wireless Earbuds"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#00a699] focus:ring-1 focus:ring-[#00a699] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quantity Required *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#00a699] focus:ring-1 focus:ring-[#00a699] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unit
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#00a699] focus:ring-1 focus:ring-[#00a699] outline-none bg-white"
                >
                  <option value="Pieces">Pieces</option>
                  <option value="Units">Units</option>
                  <option value="Sets">Sets</option>
                  <option value="Kg">Kilograms (Kg)</option>
                  <option value="Tons">Tons</option>
                  <option value="Meters">Meters</option>
                  <option value="Boxes">Boxes / Cartons</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Amit Sharma"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#00a699] focus:ring-1 focus:ring-[#00a699] outline-none"
                />
              </div>
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
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#00a699] focus:ring-1 focus:ring-[#00a699] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Metro Enterprises"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#00a699] focus:ring-1 focus:ring-[#00a699] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Location (City)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#00a699] focus:ring-1 focus:ring-[#00a699] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Requirement Details / Specifications
              </label>
              <textarea
                rows={2}
                value={requirementDetails}
                onChange={(e) => setRequirementDetails(e.target.value)}
                placeholder="Mention specific model, voltage, material grade, or delivery urgency..."
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-[#00a699] focus:ring-1 focus:ring-[#00a699] outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#ff7e00] hover:bg-[#e67100] text-white py-3 rounded-xl font-bold text-base shadow-lg shadow-[#ff7e00]/25 transition flex items-center justify-center gap-2"
              >
                <span>Submit Requirement & Get Instant Quotes</span>
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2 flex items-center justify-center gap-1">
                <ShieldCheck size={13} className="text-emerald-600" />
                Verified Single-Seller Catalogue • No Spam Guarantee • Direct Factory Price
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
