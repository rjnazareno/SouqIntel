// The SouqIntel mark: a souq arch holding a single drop. Same geometry as public/favicon.svg.
export function LogoMark({ className = '' }) {
  return (
    <svg viewBox="0 0 40 51" className={className} fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M2 50V23C2 12 10 5.5 20 1c10 4.5 18 11 18 22v27zM8 50V24c0-8.5 5-14 12-17.5C27 10 32 15.5 32 24v26z" />
      <path d="M20 22.5s-6 7.6-6 12a6 6 0 0 0 12 0c0-4.4-6-12-6-12z" />
    </svg>
  )
}

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-7 w-auto text-gold-400" />
      <span className="font-display text-[1.65rem] leading-none tracking-[0.18em] uppercase text-ivory-50">SouqIntel</span>
    </span>
  )
}
