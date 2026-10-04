import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export const SafetyDisclaimer = ({ variant = 'banner', className = '' }) => {
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 text-xs text-slate-500 py-1.5 px-3 bg-slate-100 rounded-md border border-slate-200 ${className}`}>
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Clinical decision support only. Not a prescribing system. Always verify decisions with a licensed medical professional.</span>
      </div>
    );
  }

  return (
    <aside
      aria-label="Clinical Decision Support Safety Notice"
      className={`rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 text-amber-950 text-sm shadow-xs ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-amber-900 flex items-center gap-2">
            Clinical Decision Support Prototype
            <span className="text-xs font-normal uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-800">
              Regulatory Notice
            </span>
          </h4>
          <p className="text-amber-800 leading-relaxed text-xs sm:text-sm">
            CureNova is designed solely to aggregate, connect, and analyze published biomedical evidence. It does
            <strong> not</strong> diagnose, prescribe, or replace professional clinical judgment. Patients must never alter, start,
            or stop medications without consulting a qualified physician or pharmacist.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default SafetyDisclaimer;
