function FilterPanel({ filters, onFilterChange }) {
  const categories = ['oud', 'musk', 'floral', 'amber', 'spicy', 'fresh']
  const types = ['designer', 'niche', 'arabian', 'clone']
  const priceRanges = ['budget', 'mid', 'luxury']
  const genders = ['masculine', 'feminine', 'unisex']

  const handleChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: filters[key] === value ? '' : value, // Toggle off if same value
    })
  }

  const clearFilters = () => {
    onFilterChange({
      category: '',
      brand: '',
      type: '',
      priceRange: '',
    })
  }

  const hasActiveFilters = Object.values(filters).some(v => v)

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-amber-600 hover:text-amber-700"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleChange('category', category)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                filters.category === category
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Type</h4>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => handleChange('type', type)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                filters.type === type
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <button
              key={range}
              onClick={() => handleChange('priceRange', range)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                filters.priceRange === range
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Gender</h4>
        <div className="flex flex-wrap gap-2">
          {genders.map((gender) => (
            <button
              key={gender}
              onClick={() => handleChange('gender', gender)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                filters.gender === gender
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
