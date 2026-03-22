import { Link } from 'react-router-dom'

function PerfumeCard({ perfume, similarity, savings }) {
  if (!perfume) return null

  return (
    <Link to={`/perfume/${perfume._id}`} className="card group">
      {/* Image */}
      <div className="aspect-square bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
        {perfume.imageUrl ? (
          <img
            src={perfume.imageUrl}
            alt={perfume.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🌸</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {similarity && (
            <span className="badge bg-green-500 text-white">
              {similarity}% match
            </span>
          )}
          {savings && (
            <span className="badge bg-amber-500 text-white">
              Save {savings}%
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-amber-600 font-medium truncate">
          {perfume.brand?.name || 'Unknown Brand'}
        </p>
        <h3 className="font-semibold text-gray-900 truncate group-hover:text-amber-600 transition-colors">
          {perfume.name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="badge badge-gold text-xs capitalize">{perfume.type}</span>
          <span className="badge bg-gray-100 text-gray-600 text-xs capitalize">
            {perfume.category}
          </span>
        </div>

        {/* Performance indicators */}
        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{perfume.longevity}/10</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>{perfume.sillage}/10</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PerfumeCard
