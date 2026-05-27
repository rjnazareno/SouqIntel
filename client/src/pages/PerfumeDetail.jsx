import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PerfumeCard from '../components/perfume/PerfumeCard'
import NotesPyramid from '../components/perfume/NotesPyramid'
import api from '../services/api'

function PerfumeDetail() {
  const { id } = useParams()
  const [perfume, setPerfume] = useState(null)
  const [dupes, setDupes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPerfumeDetails()
  }, [id])

  const fetchPerfumeDetails = async () => {
    setLoading(true)
    try {
      const [perfumeRes, dupesRes] = await Promise.all([
        api.getPerfume(id),
        api.getDupes(id)
      ])
      setPerfume(perfumeRes.data)
      setDupes(dupesRes.data)
    } catch (error) {
      console.error('Error fetching perfume:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-cream-100">
        <div className="w-12 h-12 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!perfume) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-20 bg-cream-100">
        <div className="w-24 h-24 mb-6 rounded-full bg-cream-200 flex items-center justify-center">
          <span className="text-5xl">😕</span>
        </div>
        <h2 className="text-2xl font-display font-semibold text-dark-800 mb-2">Perfume not found</h2>
        <p className="text-dark-500 mb-6">The perfume you're looking for doesn't exist.</p>
        <Link to="/browse" className="btn-primary">
          Browse Collection
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-cream-100 page-transition">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <nav className="text-sm text-dark-400 flex items-center gap-2">
          <Link to="/" className="hover:text-accent-500 transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link to="/browse" className="hover:text-accent-500 transition-colors">Collection</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-dark-800 font-medium">{perfume.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-3xl shadow-sm border border-dark-100/50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="aspect-square bg-gradient-to-br from-cream-100 to-cream-200 flex items-center justify-center p-12">
              {perfume.imageUrl ? (
                <img src={perfume.imageUrl} alt={perfume.name} className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-[150px]">🌸</span>
              )}
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12 space-y-6">
              <div>
                <p className="text-accent-500 font-medium mb-2">{perfume.brand?.name}</p>
                <h1 className="text-3xl lg:text-4xl font-display font-semibold text-dark-800">{perfume.name}</h1>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-accent capitalize">{perfume.type}</span>
                <span className="badge badge-light capitalize">{perfume.category}</span>
                <span className="badge badge-light capitalize">{perfume.gender}</span>
                <span className="badge badge-light capitalize">{perfume.concentration}</span>
              </div>

              {/* Price Range */}
              <div className="bg-cream-100 rounded-2xl p-6">
                <p className="text-sm text-dark-500 mb-1">Price Range</p>
                <p className="text-3xl font-display font-semibold text-accent-500 capitalize">{perfume.priceRange}</p>
              </div>

              {/* Performance */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cream-50 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-dark-500">Longevity</p>
                    <span className="text-sm font-semibold text-dark-800">{perfume.longevity}/10</span>
                  </div>
                  <div className="bg-dark-100 rounded-full h-2">
                    <div
                      className="bg-accent-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(perfume.longevity / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-cream-50 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-dark-500">Sillage</p>
                    <span className="text-sm font-semibold text-dark-800">{perfume.sillage}/10</span>
                  </div>
                  <div className="bg-dark-100 rounded-full h-2">
                    <div
                      className="bg-accent-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(perfume.sillage / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {perfume.description && (
                <div>
                  <h3 className="font-semibold text-dark-800 mb-3">Description</h3>
                  <p className="text-dark-500 leading-relaxed">{perfume.description}</p>
                </div>
              )}

              {/* CTA */}
              <div className="flex gap-4 pt-4">
                <button className="btn-primary flex-1 justify-center">
                  Find Similar
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="w-12 h-12 rounded-full border border-dark-200 flex items-center justify-center text-dark-500 hover:text-accent-500 hover:border-accent-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Notes Pyramid */}
          {perfume.notes && (
            <div className="border-t border-dark-100 p-8 lg:p-12">
              <h3 className="text-2xl font-display font-semibold text-dark-800 mb-8 text-center">
                Fragrance <span className="italic text-accent-500">Notes</span>
              </h3>
              <NotesPyramid notes={perfume.notes} />
            </div>
          )}

          {/* Reviews Section */}
          {perfume.reviews && perfume.reviews.length > 0 && (
            <div className="border-t border-dark-100 p-8 lg:p-12">
              <h3 className="text-2xl font-display font-semibold text-dark-800 mb-8 text-center">
                Community <span className="italic text-accent-500">Reviews</span>
              </h3>
              <div className="space-y-6 max-w-4xl mx-auto">
                {perfume.reviews.map((review, index) => (
                  <div key={index} className="bg-cream-50 rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                          {review.source === 'fragrantica' && (
                            <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
                            </svg>
                          )}
                          {review.source === 'reddit' && (
                            <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                            </svg>
                          )}
                          {review.source === 'youtube' && (
                            <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                          )}
                          {review.source === 'basenotes' && (
                            <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          )}
                          {review.source === 'community' && (
                            <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-dark-800">{review.author}</p>
                          <p className="text-xs text-dark-400 capitalize">
                            {review.source} {review.date && `• ${review.date}`}
                          </p>
                        </div>
                      </div>
                      {review.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-accent-500' : 'text-dark-200'}`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/>
                            </svg>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-dark-600 leading-relaxed">"{review.text}"</p>
                    {review.url && (
                      <p className="text-xs text-dark-400 mt-2">
                        Source: <span className="text-accent-500">{review.url}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dupes Section */}
        {dupes.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-semibold text-dark-800 mb-8">
              {perfume.type === 'arabian' ? 'This perfume is a dupe for' : 'Middle Eastern Alternatives'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dupes.map((dupe) => (
                <PerfumeCard
                  key={dupe._id}
                  perfume={dupe.dupe || dupe.original}
                  similarity={dupe.similarityScore}
                  savings={dupe.priceComparison?.savings}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PerfumeDetail
