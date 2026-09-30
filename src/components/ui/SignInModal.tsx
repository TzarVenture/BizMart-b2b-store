'use client';

import { useState } from 'react';
import { X, User, Phone, CheckCircle2, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { useLeadStore } from '@/lib/leadStore';

export default function SignInModal() {
  const { isSignInModalOpen, closeSignInModal, loginBuyer } = useLeadStore();
  const [identifier, setIdentifier] = useState('');
  const [step, setStep] = useState<'input' | 'otp' | 'success'>('input');
  const [otp, setOtp] = useState('');

  if (!isSignInModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    loginBuyer({
      phone: identifier.startsWith('+91') ? identifier : `+91 ${identifier}`,
      name: identifier.includes('@') ? identifier.split('@')[0] : 'Rajesh Sharma',
      companyName: 'Sharma Industrial Supplies',
    });
    setStep('success');
    setTimeout(() => {
      closeSignInModal();
      setStep('input');
      setIdentifier('');
      setOtp('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#2b3377] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00a699] flex items-center justify-center text-white">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-black text-lg text-white">Buyer Sign In</h3>
              <p className="text-xs text-slate-200">Access enquiries, RFQs & quotations</p>
            </div>
          </div>
          <button
            onClick={closeSignInModal}
            className="text-slate-300 hover:text-white p-1 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {step === 'success' ? (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
              <h4 className="text-xl font-bold text-slate-900">Signed In Successfully!</h4>
              <p className="text-xs text-slate-500">Welcome back to BizMart Enterprise Sourcing.</p>
            </div>
          ) : step === 'otp' ? (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-xs text-slate-600">
                Enter the 4-digit verification code sent to <strong className="text-slate-900">{identifier}</strong>:
              </p>
              <div>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 4-digit OTP (e.g. 1234)"
                  className="w-full text-center tracking-widest text-xl font-mono py-3 rounded-xl border border-slate-300 focus:border-[#00a699] outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#00a699] hover:bg-[#00857a] text-white py-3 rounded-xl font-bold text-sm transition shadow-sm"
              >
                Verify & Continue
              </button>
              <button
                type="button"
                onClick={() => setStep('input')}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-700"
              >
                ← Change Mobile Number / Email
              </button>
            </form>
          ) : (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mobile Number or Email Address *
                </label>
                <div className="flex">
                  <span className="bg-slate-100 border border-slate-300 border-r-0 px-3.5 py-3 rounded-l-xl text-xs font-bold text-slate-600 flex items-center">
                    +91
                  </span>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter mobile or email"
                    className="w-full px-4 py-3 rounded-r-xl border border-slate-300 text-sm focus:border-[#00a699] outline-none font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff7e00] hover:bg-[#e67100] text-white py-3.5 rounded-xl font-black text-sm transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue with OTP</span>
                <ArrowRight size={16} />
              </button>

              {/* Benefits Checklist */}
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#00a699]" />
                  <span>Instant access to previous quotes & orders</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#00a699]" />
                  <span>One-click RFQ submission with saved address</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#00a699]" />
                  <span>Zero password hassles — 100% OTP security</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-center">
                <a
                  href="/admin"
                  onClick={closeSignInModal}
                  className="text-xs text-slate-400 hover:text-[#00a699] font-medium"
                >
                  Are you sales staff? Access CRM Desk →
                </a>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
