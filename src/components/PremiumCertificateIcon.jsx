import { HiOutlineBadgeCheck } from 'react-icons/hi'

export function PremiumCertificateIcon({ className = '' }) {
  return <span className={`relative inline-grid h-12 w-12 place-items-center rounded-full border-2 border-amber-300 bg-gradient-to-br from-yellow-200 via-amber-400 to-yellow-600 text-amber-950 shadow-[0_6px_20px_rgba(245,158,11,.35)] ${className}`} aria-label="Premium sertifikat"><span className="absolute -bottom-3 left-2 h-5 w-3 -rotate-12 bg-amber-500 [clip-path:polygon(0_0,100%_0,80%_100%,50%_72%,20%_100%)]"/><span className="absolute -bottom-3 right-2 h-5 w-3 rotate-12 bg-yellow-600 [clip-path:polygon(0_0,100%_0,80%_100%,50%_72%,20%_100%)]"/><HiOutlineBadgeCheck className="relative z-10 h-7 w-7"/></span>
}
