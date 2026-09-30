'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  TrendingUp,
  FileCheck,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Phone,
  Mail,
  Building,
  Calendar,
  Layers,
  ChevronDown,
  Trash2,
  PlusCircle,
  MessageSquare,
  ShieldAlert,
  ArrowUpRight,
  Package,
} from 'lucide-react';
import { useLeadStore, LeadStatus, Lead } from '@/lib/leadStore';

const SALES_REPS = [
  'Rahul Sharma',
  'Priya Patel',
  'Amit Kumar',
  'Neha Singh',
  'Vikram Malhotra',
];

const STATUS_COLORS: Record<LeadStatus, string> = {
  New: 'bg-blue-100 text-blue-800 border-blue-200',
  Contacted: 'bg-purple-100 text-purple-800 border-purple-200',
  Qualified: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Quotation Sent': 'bg-amber-100 text-amber-800 border-amber-200',
  'Follow-up': 'bg-orange-100 text-orange-800 border-orange-200',
  Negotiation: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Won: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Lost: 'bg-red-100 text-red-800 border-red-200',
};

function formatLeadDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export default function AdminLeadCRMPage() {
  const [mounted, setMounted] = useState(false);
  const {
    leads,
    updateLeadStatus,
    updateLeadSalesperson,
    addLeadNote,
    setFollowUpDate,
    deleteLead,
  } = useLeadStore();

  const [activeTab, setActiveTab] = useState<'leads' | 'followups'>('leads');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState('');
  const [followUpDateInput, setFollowUpDateInput] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const qualifiedLeads = leads.filter((l) => l.status === 'Qualified').length;
  const quotationsSent = leads.filter((l) => l.status === 'Quotation Sent').length;
  const wonLeads = leads.filter((l) => l.status === 'Won').length;

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      statusFilter === 'All' || lead.status === statusFilter;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      lead.customerName.toLowerCase().includes(query) ||
      lead.companyName.toLowerCase().includes(query) ||
      lead.phone.includes(query) ||
      lead.productTitle.toLowerCase().includes(query) ||
      lead.id.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const handleAddNote = (leadId: string) => {
    if (!newNote.trim()) return;
    addLeadNote(leadId, newNote.trim());
    setNewNote('');
    // refresh selected lead
    const updated = leads.find((l) => l.id === leadId);
    if (updated) {
      setSelectedLead({
        ...updated,
        notes: [...(updated.notes || []), newNote.trim()],
      });
    }
  };

  const handleSaveFollowUp = (leadId: string) => {
    if (!followUpDateInput) return;
    setFollowUpDate(leadId, followUpDateInput);
    if (selectedLead) {
      setSelectedLead({ ...selectedLead, followUpDate: followUpDateInput });
    }
  };

  if (!mounted) {
    return (
      <div className="bg-[#f4f5f8] min-h-screen py-8">
        <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="bg-[#1b2046] text-white rounded-2xl p-6 lg:p-8 shadow-md border border-slate-700/50 animate-pulse">
            <div className="h-4 w-40 bg-slate-700 rounded mb-2" />
            <div className="h-8 w-72 bg-slate-700 rounded mb-2" />
            <div className="h-4 w-96 bg-slate-700 rounded" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 h-24 animate-pulse" />
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-8 h-96 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f5f8] min-h-screen py-8">
      <div className="w-full max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header & Sub-Bar */}
        <div className="bg-[#1b2046] text-white rounded-2xl p-6 lg:p-8 shadow-md border border-slate-700/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00a699] uppercase tracking-wider mb-1">
              <Layers size={14} />
              <span>Centralized Single-Seller CRM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Lead & Enquiry Management Desk
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Direct B2B enquiry pipeline, quotation workflow, and sales team assignments.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
            >
              Public Marketplace
            </Link>
            <Link
              href="/rfq"
              className="px-4 py-2 rounded-lg bg-[#00a699] hover:bg-[#00857a] text-xs font-bold text-white transition flex items-center gap-1.5"
            >
              <span>+ New RFQ</span>
            </Link>
          </div>
        </div>

        {/* 5 KPI Metric Cards (PRD Section 17) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-400 font-semibold block">Total Enquiries</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900">{totalLeads}</span>
              <span className="text-[10px] text-emerald-600 font-bold">100% Direct</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-blue-200 bg-blue-50/20 shadow-xs">
            <span className="text-xs text-blue-600 font-semibold block">New Leads</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-blue-700">{newLeads}</span>
              <span className="text-[10px] text-blue-500 font-medium">Pending Action</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-indigo-200 bg-indigo-50/20 shadow-xs">
            <span className="text-xs text-indigo-600 font-semibold block">Qualified Leads</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-indigo-700">{qualifiedLeads}</span>
              <span className="text-[10px] text-indigo-500 font-medium">Verified Buyers</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-amber-200 bg-amber-50/20 shadow-xs">
            <span className="text-xs text-amber-600 font-semibold block">Quotations Sent</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-amber-700">{quotationsSent}</span>
              <span className="text-[10px] text-amber-500 font-medium">Under Review</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-emerald-200 bg-emerald-50/20 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-xs text-emerald-600 font-semibold block">Won Deals</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-700">{wonLeads}</span>
              <span className="text-[10px] text-emerald-600 font-medium">Fulfillment</span>
            </div>
          </div>
        </div>

        {/* Lead Table Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          
          {/* Controls Bar: Search & Status Filter */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search leads by name, phone, product, ID..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs focus:border-[#00a699] outline-none"
              />
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {[
                'All',
                'New',
                'Contacted',
                'Qualified',
                'Quotation Sent',
                'Follow-up',
                'Won',
                'Lost',
              ].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    statusFilter === st
                      ? 'bg-[#00a699] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Lead ID & Date</th>
                  <th className="py-3 px-4">Customer & Company</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Source & Location</th>
                  <th className="py-3 px-4">Assigned Rep</th>
                  <th className="py-3 px-4">Pipeline Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No leads match current filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-50/80 transition cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      {/* ID & Date */}
                      <td className="py-3.5 px-4 font-mono">
                        <span className="font-bold text-slate-900 block">{lead.id}</span>
                        <span className="text-[10px] text-slate-400" suppressHydrationWarning>
                          {formatLeadDate(lead.createdAt)}
                        </span>
                      </td>

                      {/* Customer & Company */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{lead.customerName}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Building size={11} className="text-slate-400" />
                          <span className="truncate max-w-[130px]">{lead.companyName}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {lead.phone}
                        </div>
                      </td>

                      {/* Product */}
                      <td className="py-3.5 px-4 max-w-[200px]">
                        <div className="font-semibold text-slate-800 line-clamp-1">
                          {lead.productTitle}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Qty: <strong className="text-slate-900">{lead.quantity} {lead.unit}</strong>
                          {lead.estimatedValue && (
                            <span className="ml-1 text-emerald-700 font-bold">
                              (₹{lead.estimatedValue.toLocaleString('en-IN')})
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Source & Location */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 block w-max mb-1">
                          {lead.source}
                        </span>
                        <span className="text-[11px] text-slate-500">{lead.location}</span>
                      </td>

                      {/* Sales Rep */}
                      <td
                        className="py-3.5 px-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={lead.assignedTo}
                          onChange={(e) =>
                            updateLeadSalesperson(lead.id, e.target.value)
                          }
                          className="px-2 py-1 rounded bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700 outline-none"
                        >
                          {SALES_REPS.map((rep) => (
                            <option key={rep} value={rep}>
                              {rep}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Pipeline Status */}
                      <td
                        className="py-3.5 px-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateLeadStatus(
                              lead.id,
                              e.target.value as LeadStatus
                            )
                          }
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold border outline-none ${
                            STATUS_COLORS[lead.status] || 'bg-slate-100'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Quotation Sent">Quotation Sent</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Negotiation">Negotiation</option>
                          <option value="Won">Won (Deal Closed)</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold text-[#00a699] hover:bg-[#00a699]/10 rounded transition mr-1"
                        >
                          Details
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete lead?')) deleteLead(lead.id);
                          }}
                          className="p-1 text-slate-300 hover:text-red-600 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead Detail & Follow-up Drawer Modal */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200">
              
              {/* Header */}
              <div className="bg-[#282c3f] text-white p-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#00a699]">
                      {selectedLead.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        STATUS_COLORS[selectedLead.status]
                      }`}
                    >
                      {selectedLead.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-white mt-1">
                    {selectedLead.productTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs">
                
                {/* Contact info grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block font-semibold">Customer:</span>
                    <span className="font-bold text-slate-900 text-sm">{selectedLead.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Company:</span>
                    <span className="font-semibold text-slate-800">{selectedLead.companyName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Phone:</span>
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      {selectedLead.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Email:</span>
                    <span className="text-slate-700">{selectedLead.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Location:</span>
                    <span className="text-slate-700">{selectedLead.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Order Quantity:</span>
                    <span className="font-bold text-slate-900">{selectedLead.quantity} {selectedLead.unit}</span>
                  </div>
                </div>

                {/* Requirement notes */}
                {selectedLead.requirementDetails && (
                  <div>
                    <h4 className="font-bold text-slate-700 mb-1">Requirement Notes:</h4>
                    <p className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                      {selectedLead.requirementDetails}
                    </p>
                  </div>
                )}

                {/* Follow up date scheduling */}
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-orange-900 flex items-center gap-1.5">
                      <Calendar size={14} /> Schedule Next Follow-up
                    </span>
                    {selectedLead.followUpDate && (
                      <span className="text-xs font-bold text-orange-800">
                        Current: {selectedLead.followUpDate}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={followUpDateInput || selectedLead.followUpDate || ''}
                      onChange={(e) => setFollowUpDateInput(e.target.value)}
                      className="px-3 py-1.5 rounded border border-orange-300 text-xs bg-white text-slate-800"
                    />
                    <button
                      onClick={() => handleSaveFollowUp(selectedLead.id)}
                      className="px-4 py-1.5 bg-[#ff7e00] hover:bg-[#e67100] text-white font-bold rounded text-xs transition"
                    >
                      Save Date
                    </button>
                  </div>
                </div>

                {/* Sales Remarks & Activity History */}
                <div>
                  <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <MessageSquare size={14} className="text-[#00a699]" />
                    <span>Sales Notes & Activity Log</span>
                  </h4>
                  
                  <div className="space-y-2 mb-3">
                    {selectedLead.notes && selectedLead.notes.length > 0 ? (
                      selectedLead.notes.map((note, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-slate-700"
                        >
                          • {note}
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 italic">No notes recorded yet.</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add conversation remark, quotation sent notes, payment term..."
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs outline-none focus:border-[#00a699]"
                    />
                    <button
                      onClick={() => handleAddNote(selectedLead.id)}
                      className="px-4 py-2 bg-[#00a699] hover:bg-[#00857a] text-white font-bold rounded-lg text-xs transition"
                    >
                      Add Remark
                    </button>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedLead.customerName}, this is ${selectedLead.assignedTo} from BizMart regarding your requirement for ${selectedLead.productTitle}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#25D366] text-white font-bold rounded-lg text-xs flex items-center gap-1.5"
                >
                  WhatsApp Buyer
                </a>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-xs"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
