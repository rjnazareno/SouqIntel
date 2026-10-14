import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon, ArrowRightIcon } from '@phosphor-icons/react'

function SearchBar({ placeholder = "Search for a designer perfume to find its dupe...", onSearch, initialValue = '' }) {
  const [query, setQuery] = useState(initialValue)
  const navigate = useNavigate()
  const trimmedQuery = query.trim()

  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (trimmedQuery) {
      if (onSearch) {
        onSearch(trimmedQuery)
      } else {
        navigate(`/dupe-finder?q=${encodeURIComponent(trimmedQuery)}`)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-ivory-400 pointer-events-none">
        <MagnifyingGlassIcon size={20} aria-hidden="true" />
      </div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search perfumes"
        className="w-full pl-14 pr-32 py-4 text-base rounded-full outline-none transition-all duration-300 bg-noir-800 border border-noir-600
                   text-ivory-50 placeholder:text-ivory-500 focus:border-gold-500/60 focus:ring-4 focus:ring-gold-500/10"
      />
      <button
        type="submit"
        disabled={!trimmedQuery}
        className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full font-medium flex items-center gap-2
                   bg-gold-400 text-noir-950 hover:bg-gold-300 transition-colors duration-200
                   disabled:cursor-not-allowed disabled:bg-noir-600 disabled:text-ivory-500"
      >
        <span className="hidden sm:inline">Search</span>
        <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
      </button>
    </form>
  )
}

export default SearchBar
