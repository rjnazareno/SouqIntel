import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import PerfumeCard from '../components/perfume/PerfumeCard'
import FilterPanel from '../components/search/FilterPanel'
import api from '../services/api'

function Browse() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [perfumes, setPerfumes] = useState([])
  const [loading, setLoading] = useState(true)
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
    try {
      const response = await api.getPerfumes(filters)
      setPerfumes(response.data)
    } catch (error) {
      console.error('Error fetching perfumes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    // Update URL params
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    setSearchParams(params)
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Browse Perfumes
          </h1>
          <p className="text-gray-600">
            Explore our collection of Middle Eastern fragrances
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          {/* Perfume Grid */}
          <main className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
              </div>
            ) : perfumes.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  {perfumes.length} perfume{perfumes.length !== 1 ? 's' : ''} found
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {perfumes.map((perfume) => (
                    <PerfumeCard key={perfume._id} perfume={perfume} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No perfumes found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more results.
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
