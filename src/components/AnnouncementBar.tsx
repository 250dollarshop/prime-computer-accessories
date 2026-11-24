import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-40 bg-[#080E1F] text-slate-200 border-b border-white/10 text-[11px] sm:text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-3 sm:gap-5 truncate">
          <span className="truncate tracking-wide text-[#F5C26B] font-medium">
            Free Express Delivery above Rs. 15,000
          </span>
          <span className="hidden sm:inline text-slate-500" aria-hidden="true">
            ·
          </span>
          <span className="hidden sm:inline text-slate-300 whitespace-nowrap tracking-wide">
            Cash on Delivery Across Pakistan
          </span>
          <span className="hidden md:inline text-slate-500" aria-hidden="true">
            ·
          </span>
          <span className="hidden md:inline text-slate-300 whitespace-nowrap tracking-wide">
            7-Day Replacement Warranty
          </span>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="p-1 text-slate-400 hover:text-white transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
