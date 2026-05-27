import { Link } from 'react-router-dom'

function PerfumeCard({ perfume, similarity, savings }) {
  if (!perfume) return null

  return (
    <Link to={`/perfume/${perfume._id}`} className="card group block">
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-cream-100 to-cream-200 relative overflow-hidden">
        {perfume.imageUrl ? (
          <img
            src={perfume.imageUrl}
            alt={perfume.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-7xl group-hover:scale-110 transition-transform duration-300">🌸</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {similarity && (
            <span className="badge bg-dark-800 text-white shadow-lg">
              {similarity}% match
            </span>
          )}
          {savings && (
            <span className="badge bg-accent-500 text-white shadow-lg">
              Save {savings}%
            </span>
          )}
        </div>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-dark-800/0 group-hover:bg-dark-800/10 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-sm text-accent-500 font-medium truncate mb-1">
          {perfume.brand?.name || 'Unknown Brand'}
        </p>
        <h3 className="font-display text-lg font-semibold text-dark-800 truncate group-hover:text-accent-600 transition-colors">
          {perfume.name}
        </h3>
        
        {/* Tags */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="badge badge-accent text-xs capitalize">{perfume.type}</span>
          <span className="badge badge-light text-xs capitalize">{perfume.category}</span>
        </div>

        {/* Performance + Range Row */}
        <div className="mt-4 pt-4 border-t border-dark-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-dark-400">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{perfume.longevity}/10</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>{perfume.sillage}/10</span>
            </div>
          </div>
          
          {perfume.priceRange && (
            <span className="text-sm font-semibold text-dark-700 capitalize">
              {perfume.priceRange}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default PerfumeCard
