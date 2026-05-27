function FilterPanel({ filters, onFilterChange }) {
  const categories = ['oud', 'musk', 'floral', 'amber', 'spicy', 'fresh']
  const types = ['designer', 'niche', 'arabian', 'clone']
  const priceRanges = ['budget', 'mid', 'luxury']
  const genders = ['masculine', 'feminine', 'unisex']

  const handleChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: filters[key] === value ? '' : value,
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

  const FilterSection = ({ title, options, filterKey }) => (
    <div className="mb-8">
      <h4 className="text-sm font-semibold text-dark-800 mb-3 uppercase tracking-wider">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleChange(filterKey, option)}
            className={`px-4 py-2 text-sm rounded-full transition-all duration-200 capitalize ${
              filters[filterKey] === option
                ? 'bg-accent-500 text-white shadow-md'
                : 'bg-cream-200 text-dark-600 hover:bg-cream-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-dark-100/50 p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-dark-100">
        <h3 className="font-display text-lg font-semibold text-dark-800">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-accent-500 hover:text-accent-600 font-medium transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterSection title="Category" options={categories} filterKey="category" />
      <FilterSection title="Type" options={types} filterKey="type" />
      <FilterSection title="Price Range" options={priceRanges} filterKey="priceRange" />
      <FilterSection title="Gender" options={genders} filterKey="gender" />
    </div>
  )
}

export default FilterPanel
