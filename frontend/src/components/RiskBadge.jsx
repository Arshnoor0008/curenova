import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle, ShieldCheck, HelpCircle, Info } from 'lucide-react';


export const RiskBadge = ({ severity = 'Low Risk', size = 'md', className = '' }) => {
  const norm = severity.toLowerCase();

  let colors = 'bg-slate-100 text-slate-700 border-slate-200';
  let icon = <Info className="w-3.5 h-3.5" />;

  if (norm.includes('high') || norm.includes('severe') || norm.includes('fatal')) {
    colors = 'bg-rose-50 text-rose-800 border-rose-200';
    icon = <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />;
  } else if (norm.includes('moderate')) {
    colors = 'bg-amber-50 text-amber-800 border-amber-200';
    icon = <AlertCircle className="w-3.5 h-3.5 text-amber-600" />;
  } else if (norm.includes('low') || norm.includes('mild') || norm.includes('safe')) {
    colors = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    icon = <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />;
  } else if (norm.includes('strong evidence')) {
    colors = 'bg-sky-50 text-sky-800 border-sky-200';
    icon = <CheckCircle className="w-3.5 h-3.5 text-sky-600" />;
  } else if (norm.includes('conflicting')) {
    colors = 'bg-purple-50 text-purple-800 border-purple-200';
    icon = <HelpCircle className="w-3.5 h-3.5 text-purple-600" />;
  }

  const sizeClasses =
    size === 'sm'
      ? 'text-xs px-2 py-0.5 gap-1'
      : size === 'lg'
      ? 'text-sm px-3.5 py-1.5 gap-2 font-medium'
      : 'text-xs px-2.5 py-1 gap-1.5 font-medium';

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-2xs ${colors} ${sizeClasses} ${className}`}
    >
      {icon}
      <span>{severity}</span>
    </span>
  );
};

export default RiskBadge;
