import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-dark-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search perfumes"
          className="w-full pl-14 pr-32 py-4 text-base border border-dark-200 rounded-full shadow-sm 
                     focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 focus:shadow-lg
                     outline-none transition-all duration-300 bg-white text-dark-800 
                     placeholder:text-dark-400"
        />
        <button
          type="submit"
          disabled={!trimmedQuery}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-accent-500 text-white 
                     font-medium rounded-full hover:bg-accent-600 transition-all duration-200 
                     flex items-center gap-2 shadow-sm disabled:cursor-not-allowed disabled:bg-dark-300 disabled:hover:bg-dark-300"
        >
          <span className="hidden sm:inline">Search</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchBar
