import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PerfumeCard from '../components/perfume/PerfumeCard'
import FilterPanel from '../components/search/FilterPanel'
import api from '../services/api'

function Browse() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [perfumes, setPerfumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    type: searchParams.get('type') || '',
    priceRange: searchParams.get('priceRange') || '',
  })

  useEffect(() => {
    fetchPerfumes()
  }, [filters])

  const fetchPerfumes = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await api.getPerfumes(filters)
      setPerfumes(response.data)
    } catch (error) {
      console.error('Error fetching perfumes:', error)
      setError('Unable to load the collection. Make sure the API is deployed and VITE_API_URL is set correctly.')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    setSearchParams(params)
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 bg-cream-100 page-transition">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-dark-800 mb-3">
            Our <span className="italic text-accent-500">Collection</span>
          </h1>
          <p className="text-dark-500 text-lg">
            Explore our curated selection of Middle Eastern fragrances
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          {/* Perfume Grid */}
          <main className="grow">
            {loading ? (
              <div className="flex flex-col justify-center items-center py-20">
                <div className="w-12 h-12 border-2 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-dark-500">Loading fragrances...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-red-100">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
                  <span className="text-4xl">⚠️</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-dark-800 mb-2">
                  Collection unavailable
                </h3>
                <p className="text-dark-500 max-w-md mx-auto">
                  {error}
                </p>
              </div>
            ) : perfumes.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-dark-500">
                    Showing <span className="font-semibold text-dark-800">{perfumes.length}</span> fragrance{perfumes.length !== 1 ? 's' : ''}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-dark-500">Sort by:</span>
                    <select className="text-sm bg-white border border-dark-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500">
                      <option>Featured</option>
                      <option>Best Match</option>
                      <option>Most Popular</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {perfumes.map((perfume) => (
                    <PerfumeCard key={perfume._id} perfume={perfume} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cream-200 flex items-center justify-center">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-dark-800 mb-2">
                  No perfumes found
                </h3>
                <p className="text-dark-500 max-w-md mx-auto">
                  Try adjusting your filters to discover more fragrances.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Browse
