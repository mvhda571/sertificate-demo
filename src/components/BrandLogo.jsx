import { useId } from 'react'

export function BrandLogo({ className = '', title = 'Certificate Academy' }) {
  const filterId = `brand-logo-key-${useId().replace(/:/g, '')}`
  return <svg viewBox="0 0 1536 1024" role="img" aria-label={title} className={className} preserveAspectRatio="xMidYMid meet"><defs><filter id={filterId} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0"/></filter></defs><image href="/brand/certificate-logo-chroma.png" width="1536" height="1024" filter={`url(#${filterId})`} preserveAspectRatio="xMidYMid meet"/></svg>
}
