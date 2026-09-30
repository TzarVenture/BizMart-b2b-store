'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { useLeadStore } from '@/lib/leadStore';

export default function GlobalToast() {
  const { toast, hideToast } = useLeadStore();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[200] max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-[#282c3f] text-white p-4 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#00a699]/20 text-[#00a699] flex items-center justify-center flex-shrink-0 border border-[#00a699]/30">
            <CheckCircle2 size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white leading-tight truncate">
              {toast.text}
            </p>
            {toast.link && (
              <Link
                href={toast.link}
                onClick={hideToast}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ff7e00] hover:underline mt-0.5"
              >
                <span>{toast.linkText || 'View Details'}</span>
                <ArrowRight size={11} />
              </Link>
            )}
          </div>
        </div>
        <button
          onClick={hideToast}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition flex-shrink-0"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
