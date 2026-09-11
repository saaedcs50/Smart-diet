import React, { useMemo, useState } from 'react';
import { BRAND } from '../config/brand';

type BrandLogoProps = {
 size?: number;
 className?: string;
 /** rounded-2xl | rounded-full | rounded-xl */
 rounded?: string;
 /** إظهار حرف من الاسم لو فشل تحميل الصورة */
 showMonogramFallback?: boolean;
};

function monogramLetter(): string {
 const raw = (BRAND.shortName || BRAND.appName || 'D').trim();
 return raw.charAt(0) || 'D';
}

/**
 * شعار العيادة من BRAND.logoPath
 * - يحمّل الصورة من المسار (مثل /icon.svg أو /brands/clinic.png)
 * - عند الفشل: حرف من اسم التطبيق على خلفية التدرج اللوني للهوية
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
 size = 40,
 className = '',
 rounded = 'rounded-2xl',
 showMonogramFallback = true,
}) => {
 const [failed, setFailed] = useState(false);
 const src = (BRAND.logoPath || '').trim();
 const letter = useMemo(() => monogramLetter(), []);

 if (src && !failed) {
 return (
 <img
 src={src}
 alt={BRAND.shortName || BRAND.appName || 'logo'}
 width={size}
 height={size}
 onError={() => setFailed(true)}
 className={`${rounded} object-cover shrink-0 bg-white dark:bg-[var(--app-card)] ${className}`}
 style={{ width: size, height: size }}
 />
 );
 }

 if (!showMonogramFallback) {
 return null;
 }

 return (
 <div
 className={`${rounded} bg-[var(--app-hero)] flex items-center justify-center text-white font-black shrink-0 select-none ${className}`}
 style={{ width: size, height: size, fontSize: Math.max(14, size * 0.42) }}
 aria-label={BRAND.shortName || BRAND.appName}
 >
 {letter}
 </div>
 );
};
