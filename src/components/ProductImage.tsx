import React, { useState } from 'react';
import { Cpu } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  eager = false,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-[#121D3D] dark:to-[#0B1224] text-slate-500 dark:text-slate-300 p-4 text-center ${className}`}
      >
        <Cpu className="w-8 h-8 mb-2 opacity-60" strokeWidth={1.5} />
        <span className="text-xs font-medium line-clamp-2 max-w-[180px]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
    />
  );
};
