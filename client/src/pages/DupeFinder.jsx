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
      // Search for the perfume
      const perfumeResponse = await api.searchPerfumes(searchQuery)
      if (perfumeResponse.data.length > 0) {
        const perfume = perfumeResponse.data[0]
        setSearchedPerfume(perfume)

        // Get dupes for this perfume
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Dupe Finder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search for any designer or niche fragrance, and we'll show you
            affordable Middle Eastern alternatives.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar
            placeholder="Try 'Baccarat Rouge 540' or 'Tom Ford Oud Wood'..."
            onSearch={handleSearch}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching for dupes...</p>
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <div>
            {searchedPerfume ? (
              <div className="space-y-8">
                {/* Original Perfume */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    You searched for
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">🌸</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {searchedPerfume.name}
                      </h2>
                      <p className="text-gray-600">{searchedPerfume.brand?.name}</p>
                      <span className="badge badge-gold mt-2">{searchedPerfume.priceRange}</span>
                    </div>
                  </div>
                </div>

                {/* Dupes */}
                {dupes.length > 0 ? (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <span className="text-amber-500">✨</span>
                      We found {dupes.length} alternative{dupes.length > 1 ? 's' : ''}
                    </h3>
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
                  <div className="text-center py-12 bg-white rounded-2xl">
                    <p className="text-gray-600">
                      No dupes found for this perfume yet. Check back later!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No perfume found for "{query}"
                </h3>
                <p className="text-gray-600 mb-6">
                  Try searching for a different perfume name or brand.
                </p>
                <Link to="/browse" className="text-amber-600 font-medium hover:text-amber-700">
                  Browse our collection →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!loading && !searched && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">🔮</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Find Your Perfect Dupe
              </h3>
              <p className="text-gray-600 mb-6">
                Enter the name of a designer or niche fragrance above, and we'll
                find you affordable Arabian alternatives.
              </p>
              <div className="text-left bg-amber-50 rounded-xl p-4">
                <p className="text-sm font-medium text-amber-800 mb-2">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {['Baccarat Rouge 540', 'Aventus', 'Oud Wood'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSearch(item)}
                      className="px-3 py-1 bg-white text-amber-700 text-sm rounded-full border border-amber-200 hover:bg-amber-100 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DupeFinder
