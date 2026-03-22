import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchBar({ placeholder = "Search for a designer perfume to find its dupe...", onSearch }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        onSearch(query)
      } else {
        navigate(`/dupe-finder?q=${encodeURIComponent(query)}`)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-6 py-4 pr-14 text-lg border border-gray-200 rounded-xl shadow-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all duration-200 bg-white"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchBar
