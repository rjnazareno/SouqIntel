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
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (!perfume) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-20">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Perfume not found</h2>
        <p className="text-gray-600 mb-6">The perfume you're looking for doesn't exist.</p>
        <Link to="/browse" className="btn-primary">Browse Collection</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-amber-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/browse" className="hover:text-amber-600">Browse</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{perfume.name}</span>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image */}
            <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
              {perfume.imageUrl ? (
                <img src={perfume.imageUrl} alt={perfume.name} className="max-h-full max-w-full object-contain" />
              ) : (
                <div className="text-center">
                  <span className="text-8xl">🌸</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <p className="text-amber-600 font-medium">{perfume.brand?.name}</p>
                <h1 className="text-3xl font-display font-bold text-gray-900">{perfume.name}</h1>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-gold">{perfume.type}</span>
                <span className="badge bg-gray-100 text-gray-700">{perfume.category}</span>
                <span className="badge bg-gray-100 text-gray-700">{perfume.gender}</span>
                <span className="badge bg-gray-100 text-gray-700">{perfume.concentration}</span>
              </div>

              {/* Price Range */}
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-sm text-amber-700 font-medium">Price Range</p>
                <p className="text-2xl font-bold text-amber-600 capitalize">{perfume.priceRange}</p>
              </div>

              {/* Performance */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Longevity</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${(perfume.longevity / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{perfume.longevity}/10</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Sillage</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${(perfume.sillage / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{perfume.sillage}/10</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {perfume.description && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{perfume.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes Pyramid */}
          {perfume.notes && (
            <div className="border-t border-gray-100 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Fragrance Notes
              </h3>
              <NotesPyramid notes={perfume.notes} />
            </div>
          )}
        </div>

        {/* Dupes Section */}
        {dupes.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
              {perfume.type === 'arabian' ? 'This perfume is a dupe for' : 'Arabian Alternatives'}
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
