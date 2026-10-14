import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { WarningIcon, MagnifyingGlassIcon } from '@phosphor-icons/react'
import PerfumeCard from '../components/perfume/PerfumeCard'
import FilterPanel from '../components/search/FilterPanel'
import api from '../services/api'
import { useReveal } from '../lib/motion'

const sorters = {
  featured: null,
  trending: (a, b) => Number(!!b.trending) - Number(!!a.trending),
  name: (a, b) => a.name.localeCompare(b.name),
}

function Browse() {
  const rootRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [perfumes, setPerfumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sort, setSort] = useState('featured')
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    type: searchParams.get('type') || '',
    priceRange: searchParams.get('priceRange') || '',
  })

  useEffect(() => {
    fetchPerfumes()
  }, [filters])

  useReveal(rootRef, [perfumes, sort])

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

  const sorted = sorters[sort] ? [...perfumes].sort(sorters[sort]) : perfumes

  return (
    <div ref={rootRef} className="min-h-screen pt-32 pb-24 px-6 lg:px-8 page-transition bg-[radial-gradient(ellipse_at_top,rgb(201_163_106/0.12),transparent_50%)]">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-12">
          <h1 className="font-display text-5xl md:text-7xl text-ivory-50 tracking-tight mb-4">
            Our <em className="text-gold-300">collection</em>
          </h1>
          <p className="text-ivory-400 text-lg max-w-xl">
            Designer originals and the Middle Eastern fragrances that answer them.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 shrink-0">
            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          <main className="grow">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" aria-busy="true" aria-label="Loading fragrances">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="card-flat motion-safe:animate-pulse">
                    <div className="aspect-4/5 bg-noir-700" />
                    <div className="p-5 space-y-3">
                      <div className="h-3 w-1/3 rounded-full bg-noir-700" />
                      <div className="h-5 w-2/3 rounded-full bg-noir-700" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="card-flat text-center py-20 px-6">
                <WarningIcon size={48} weight="duotone" className="mx-auto mb-6 text-accent-400" aria-hidden="true" />
                <h3 className="text-2xl font-display text-ivory-50 mb-2">Collection unavailable</h3>
                <p className="text-ivory-400 max-w-md mx-auto">{error}</p>
              </div>
            ) : perfumes.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-ivory-400">
                    Showing <span className="text-ivory-50">{perfumes.length}</span> fragrance{perfumes.length !== 1 ? 's' : ''}
                  </p>
                  <label className="flex items-center gap-2 text-sm text-ivory-400">
                    Sort by
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="bg-noir-800 border border-noir-600 text-ivory-100 rounded-lg px-3 py-2 focus:outline-none focus:border-gold-500"
                    >
                      <option value="featured">Featured</option>
                      <option value="trending">Trending 2026</option>
                      <option value="name">Name A-Z</option>
                    </select>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sorted.map((perfume) => (
                    <PerfumeCard key={perfume._id} perfume={perfume} className="reveal" />
                  ))}
                </div>
              </>
            ) : (
              <div className="card-flat text-center py-20 px-6">
                <MagnifyingGlassIcon size={48} weight="duotone" className="mx-auto mb-6 text-gold-400" aria-hidden="true" />
                <h3 className="text-2xl font-display text-ivory-50 mb-2">No perfumes found</h3>
                <p className="text-ivory-400 max-w-md mx-auto">Try adjusting your filters to discover more fragrances.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Browse
