'use client';

import { useLeadStore, LeadStatus } from '@/lib/leadStore';
import { X, FileText, Clock, Building2, Phone, MessageSquare, ArrowRight, CheckCircle2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const STATUS_BADGES: Record<LeadStatus, string> = {
  New: 'bg-blue-50 text-blue-700 border-blue-200',
  Contacted: 'bg-purple-50 text-purple-700 border-purple-200',
  Qualified: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Quotation Sent': 'bg-amber-50 text-amber-700 border-amber-200',
  'Follow-up': 'bg-orange-50 text-orange-700 border-orange-200',
  Negotiation: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Won: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Lost: 'bg-red-50 text-red-700 border-red-200',
};

export default function BuyerEnquiriesModal() {
  const {
    isEnquiriesModalOpen,
    closeEnquiriesModal,
    buyerUser,
    leads,
    openRfqModal,
  } = useLeadStore();

  if (!isEnquiriesModalOpen) return null;

  // Filter leads for this buyer if logged in, or fallback to first 4 leads for demo
  const userLeads = buyerUser?.phone
    ? leads.filter(
        (l) =>
          l.phone.replace(/\D/g, '').includes(buyerUser.phone.replace(/\D/g, '')) ||
          l.customerName.toLowerCase() === buyerUser.name.toLowerCase()
      )
    : leads.slice(0, 3);

  const displayLeads = userLeads.length > 0 ? userLeads : leads.slice(0, 3);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#2b3377] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00a699] flex items-center justify-center text-white shrink-0">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="font-black text-lg text-white">My Enquiries & Quotations</h3>
              <p className="text-xs text-slate-200">
                Track status, quotation updates, and sales callback history
              </p>
            </div>
          </div>
          <button
            onClick={closeEnquiriesModal}
            className="text-slate-300 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Buyer summary banner */}
        {buyerUser && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">{buyerUser.name}</span>
              <span className="text-slate-400">•</span>
              <span className="font-mono text-slate-600">{buyerUser.phone}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Active Buyer
              </span>
            </div>
            <span className="text-slate-500 font-semibold">
              Total Enquiries: <strong className="text-slate-900">{displayLeads.length}</strong>
            </span>
          </div>
        )}

        {/* Enquiries List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 flex-1 text-xs">
          {displayLeads.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FileText size={24} />
              </div>
              <h4 className="text-sm font-bold text-slate-800">No Enquiries Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You haven't requested any quotations yet. Browse our verified products or post your bulk requirement.
              </p>
              <button
                onClick={() => {
                  closeEnquiriesModal();
                  openRfqModal();
                }}
                className="px-5 py-2 rounded-xl bg-[#00a699] text-white font-bold hover:bg-[#00857a] transition"
              >
                Post Requirement
              </button>
            </div>
          ) : (
            displayLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-[#00a699]/60 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-slate-900 text-xs">
                        {lead.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          STATUS_BADGES[lead.status] || 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                      {lead.productTitle}
                    </h4>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-semibold text-slate-500 block">
                      Qty: <strong className="text-slate-800">{lead.quantity} {lead.unit}</strong>
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {lead.requirementDetails && (
                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] leading-relaxed">
                    "{lead.requirementDetails}"
                  </p>
                )}

                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-slate-500 text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Assigned Rep: <strong className="text-slate-700">{lead.assignedTo || 'Sales Desk'}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold transition flex items-center gap-1"
                    >
                      <MessageSquare size={12} />
                      WhatsApp Updates
                    </a>
                    <button
                      onClick={() => {
                        closeEnquiriesModal();
                        openRfqModal({
                          id: lead.productId || 1,
                          title: lead.productTitle,
                          image: '',
                          moq: lead.quantity,
                          price: 100,
                          unit: lead.unit,
                        });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#2b3377] hover:bg-[#1e245a] text-white font-bold transition"
                    >
                      Repeat Enquiry
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
          <Link
            href="/admin"
            onClick={closeEnquiriesModal}
            className="text-slate-500 hover:text-[#00a699] font-semibold flex items-center gap-1"
          >
            <span>Internal Sales CRM Desk</span>
            <ArrowRight size={13} />
          </Link>
          <button
            onClick={closeEnquiriesModal}
            className="px-4 py-2 bg-slate-800 hover:bg-black text-white font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
