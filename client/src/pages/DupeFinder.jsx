import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import SearchBar from '../components/search/SearchBar'
import PerfumeCard from '../components/perfume/PerfumeCard'
import api from '../services/api'

function DupeFinder() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [searchedPerfume, setSearchedPerfume] = useState(null)
  const [dupes, setDupes] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery)
    }
  }, [])

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery)
    setLoading(true)
    setSearched(true)

    try {
      const perfumeResponse = await api.searchPerfumes(searchQuery)
      if (perfumeResponse.data.length > 0) {
        const perfume = perfumeResponse.data[0]
        setSearchedPerfume(perfume)
        const dupeResponse = await api.getDupes(perfume._id)
        setDupes(dupeResponse.data)
      } else {
        setSearchedPerfume(null)
        setDupes([])
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchedPerfume(null)
      setDupes([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 lg:px-8 bg-cream-100 page-transition">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-semibold text-dark-800 mb-4">
            Find Your <span className="italic text-accent-500">Perfect</span> Dupe
          </h1>
          <p className="text-lg text-dark-500 max-w-2xl mx-auto">
            Search for any designer or niche fragrance, and we'll show you
            affordable Middle Eastern alternatives.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar
            placeholder="Try 'Baccarat Rouge 540' or 'Tom Ford Oud Wood'..."
            onSearch={handleSearch}
            initialValue={initialQuery}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-dark-500">Searching for dupes...</p>
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <div>
            {searchedPerfume ? (
              <div className="space-y-10">
                {/* Original Perfume */}
                <div className="bg-white rounded-3xl shadow-sm border border-dark-100/50 p-8">
                  <p className="text-xs text-dark-400 uppercase tracking-widest mb-4">
                    You searched for
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-cream-100 to-cream-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {searchedPerfume.imageUrl ? (
                        <img 
                          src={searchedPerfume.imageUrl} 
                          alt={searchedPerfume.name}
                          className="w-full h-full object-cover rounded-2xl"
                        />
                      ) : (
                        <span className="text-4xl">🌸</span>
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="text-accent-500 font-medium text-sm mb-1">
                        {searchedPerfume.brand?.name}
                      </p>
                      <h2 className="text-2xl md:text-3xl font-display font-semibold text-dark-800">
                        {searchedPerfume.name}
                      </h2>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="badge badge-accent capitalize">{searchedPerfume.type}</span>
                        <span className="badge badge-light capitalize">{searchedPerfume.priceRange}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dupes */}
                {dupes.length > 0 ? (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center">
                        <span className="text-accent-500">✨</span>
                      </div>
                      <h3 className="text-xl font-display font-semibold text-dark-800">
                        We found {dupes.length} alternative{dupes.length > 1 ? 's' : ''}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {dupes.map((dupe) => (
                        <PerfumeCard
                          key={dupe._id}
                          perfume={dupe.dupe}
                          similarity={dupe.similarityScore}
                          savings={dupe.priceComparison?.savings}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream-200 flex items-center justify-center">
                      <span className="text-3xl">😔</span>
                    </div>
                    <p className="text-dark-500">
                      No dupes found for this perfume yet. Check back later!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl shadow-sm">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cream-200 flex items-center justify-center">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-dark-800 mb-2">
                  No perfume found for "{query}"
                </h3>
                <p className="text-dark-500 mb-6">
                  Try searching for a different perfume name or brand.
                </p>
                <Link to="/browse" className="btn-primary">
                  Browse Collection
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!loading && !searched && (
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-accent-100 to-cream-200 flex items-center justify-center">
              <span className="text-5xl">🔮</span>
            </div>
            <h3 className="text-2xl font-display font-semibold text-dark-800 mb-4">
              Find Your Perfect Dupe
            </h3>
            <p className="text-dark-500 mb-8">
              Enter the name of a designer or niche fragrance above, and we'll
              find you affordable Middle Eastern alternatives.
            </p>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm font-semibold text-dark-800 mb-4">Popular searches</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Baccarat Rouge 540', 'Aventus', 'Oud Wood', 'Sauvage'].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSearch(item)}
                    className="px-4 py-2 bg-cream-100 text-dark-600 text-sm rounded-full 
                               hover:bg-accent-100 hover:text-accent-600 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DupeFinder
