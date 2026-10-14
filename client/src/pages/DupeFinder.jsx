import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SparkleIcon, MagnifyingGlassIcon, DropIcon, ArrowRightIcon, SmileySadIcon } from '@phosphor-icons/react'
import SearchBar from '../components/search/SearchBar'
import PerfumeCard from '../components/perfume/PerfumeCard'
import api from '../services/api'
import { useReveal } from '../lib/motion'

const popularSearches = ['Baccarat Rouge 540', 'Althaïr', "Angels' Share", 'Le Male Elixir', 'Aventus']

function DupeFinder() {
  const rootRef = useRef(null)
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

  useReveal(rootRef, [dupes, searchedPerfume, loading])

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
    <div ref={rootRef} className="min-h-screen pt-32 pb-24 px-6 lg:px-8 page-transition bg-[radial-gradient(ellipse_at_top,rgb(201_163_106/0.14),transparent_50%)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl md:text-7xl text-ivory-50 tracking-tight mb-6">
            Find your <em className="text-gold-300">perfect</em> dupe
          </h1>
          <p className="text-lg text-ivory-400 max-w-2xl mx-auto">
            Search any designer or niche fragrance and we&apos;ll show you the Middle Eastern alternatives.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-14">
          <SearchBar
            placeholder="Try 'Baccarat Rouge 540' or 'Althaïr'..."
            onSearch={handleSearch}
            initialValue={initialQuery}
          />
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-ivory-400">Searching for dupes...</p>
          </div>
        )}

        {!loading && searched && (
          <div>
            {searchedPerfume ? (
              <div className="space-y-12">
                <Link to={`/perfume/${searchedPerfume._id}`} className="reveal card-flat flex items-center gap-6 p-6 md:p-8 hover:border-gold-500/50 transition-colors">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shrink-0 isolate bg-ivory-100 flex items-center justify-center">
                    {searchedPerfume.imageUrl ? (
                      <img src={searchedPerfume.imageUrl} alt={searchedPerfume.name} className="w-full h-full object-cover mix-blend-multiply" />
                    ) : (
                      <DropIcon size={40} weight="duotone" className="text-gold-600" aria-hidden="true" />
                    )}
                  </div>
                  <div className="grow min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-ivory-500 mb-2">You searched for</p>
                    <p className="text-gold-400 text-sm mb-1">{searchedPerfume.brand?.name}</p>
                    <h2 className="text-3xl md:text-4xl font-display text-ivory-50 truncate">{searchedPerfume.name}</h2>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="badge badge-accent capitalize">{searchedPerfume.type}</span>
                      <span className="badge badge-light capitalize">{searchedPerfume.priceRange}</span>
                    </div>
                  </div>
                </Link>

                {dupes.length > 0 ? (
                  <div>
                    <h3 className="reveal flex items-center gap-3 text-2xl font-display text-ivory-50 mb-6">
                      <SparkleIcon size={22} weight="fill" className="text-gold-400" aria-hidden="true" />
                      We found {dupes.length} match{dupes.length > 1 ? 'es' : ''}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {dupes.map((dupe) => (
                        <PerfumeCard
                          key={dupe._id}
                          perfume={dupe.perfume || dupe.dupe}
                          similarity={dupe.similarityScore}
                          savings={dupe.priceComparison?.savings}
                          className="reveal"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="card-flat text-center py-12 px-6">
                    <SmileySadIcon size={40} weight="duotone" className="mx-auto mb-4 text-gold-400" aria-hidden="true" />
                    <p className="text-ivory-400">No dupes found for this perfume yet. Check back later.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="card-flat text-center py-16 px-6">
                <MagnifyingGlassIcon size={48} weight="duotone" className="mx-auto mb-6 text-gold-400" aria-hidden="true" />
                <h3 className="text-2xl font-display text-ivory-50 mb-2">No perfume found for &ldquo;{query}&rdquo;</h3>
                <p className="text-ivory-400 mb-8">Try a different perfume name or brand.</p>
                <Link to="/browse" className="btn-primary">
                  Browse collection
                  <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        )}

        {!loading && !searched && (
          <div className="max-w-xl mx-auto text-center">
            <p className="text-sm text-ivory-400 mb-4">Popular searches</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularSearches.map((item) => (
                <button
                  key={item}
                  onClick={() => handleSearch(item)}
                  className="px-4 py-2 rounded-full border border-noir-600 text-sm text-ivory-300 hover:border-gold-500 hover:text-gold-300 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DupeFinder
