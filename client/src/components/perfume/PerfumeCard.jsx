import { Link } from 'react-router-dom'
import { ClockIcon, WindIcon, DropIcon } from '@phosphor-icons/react'

function PerfumeCard({ perfume, similarity, savings, relationshipLabel, relationshipTone = 'alternative', className = '' }) {
  if (!perfume) return null

  const relationshipClasses = relationshipTone === 'original'
    ? 'badge-dark'
    : 'bg-gold-400 text-noir-950'

  return (
    <Link to={`/perfume/${perfume._id}`} className={`card group block ${className}`}>
      {/* Image on an ivory plinth; multiply melts white product shots into it */}
      <div className="aspect-4/5 relative overflow-hidden isolate bg-[radial-gradient(circle_at_50%_38%,var(--color-ivory-50),var(--color-ivory-300))]">
        {perfume.imageUrl ? (
          <img
            src={perfume.imageUrl}
            alt={perfume.name}
            loading="lazy"
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold-600">
            <DropIcon size={64} weight="duotone" aria-hidden="true" />
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          {relationshipLabel && <span className={`badge shadow-lg ${relationshipClasses}`}>{relationshipLabel}</span>}
          {similarity && <span className="badge badge-dark shadow-lg">{similarity}% match</span>}
          {savings && <span className="badge bg-accent-500 text-noir-950 shadow-lg">Save {savings}%</span>}
        </div>

        {perfume.trending && (
          <span className="absolute top-3 right-3 badge bg-noir-950 text-gold-300 tracking-widest">2026</span>
        )}
      </div>

      <div className="p-5">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold-400 truncate mb-1.5">
          {perfume.brand?.name || 'Unknown Brand'}
        </p>
        <h3 className="font-display text-xl text-ivory-50 truncate group-hover:text-gold-300 transition-colors">
          {perfume.name}
        </h3>

        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="badge badge-accent capitalize">{perfume.type}</span>
          <span className="badge badge-light capitalize">{perfume.category}</span>
        </div>

        <div className="mt-4 pt-4 border-t border-noir-600/70 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-ivory-400">
            <span className="flex items-center gap-1.5" title="Longevity">
              <ClockIcon size={16} aria-hidden="true" />
              <span className="sr-only">Longevity</span>
              {perfume.longevity}/10
            </span>
            <span className="flex items-center gap-1.5" title="Sillage">
              <WindIcon size={16} aria-hidden="true" />
              <span className="sr-only">Sillage</span>
              {perfume.sillage}/10
            </span>
          </div>
          {perfume.priceRange && (
            <span className="text-sm font-medium text-ivory-300 capitalize">{perfume.priceRange}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default PerfumeCard
