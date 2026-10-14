// Families that actually exist in the catalog
const categories = ['amber', 'aromatic', 'citrus', 'floral', 'fresh', 'gourmand', 'leather', 'oud', 'spicy', 'woody']
const types = ['designer', 'niche', 'arabian', 'clone']
const priceRanges = ['budget', 'mid', 'luxury']
const genders = ['masculine', 'feminine', 'unisex']

function FilterSection({ title, options, filterKey, filters, onChange }) {
  return (
    <div className="mb-8 last:mb-0">
      <h4 className="eyebrow mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = filters[filterKey] === option
          return (
            <button
              key={option}
              onClick={() => onChange(filterKey, option)}
              aria-pressed={active}
              className={`px-3.5 py-1.5 text-sm rounded-full border transition-all duration-200 capitalize ${
                active
                  ? 'bg-gold-400 border-gold-400 text-noir-950'
                  : 'border-noir-600 text-ivory-300 hover:border-gold-500/60 hover:text-ivory-50'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function FilterPanel({ filters, onFilterChange }) {
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
      gender: '',
    })
  }

  const hasActiveFilters = Object.values(filters).some(v => v)

  return (
    <div className="rounded-2xl border border-noir-600/70 bg-noir-900 p-6 lg:sticky lg:top-24">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-ivory-100/10">
        <h3 className="font-display text-xl text-ivory-50">Filters</h3>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-sm text-gold-300 hover:text-gold-400 transition-colors">
            Clear all
          </button>
        )}
      </div>

      <FilterSection title="Family" options={categories} filterKey="category" filters={filters} onChange={handleChange} />
      <FilterSection title="Type" options={types} filterKey="type" filters={filters} onChange={handleChange} />
      <FilterSection title="Price Range" options={priceRanges} filterKey="priceRange" filters={filters} onChange={handleChange} />
      <FilterSection title="Gender" options={genders} filterKey="gender" filters={filters} onChange={handleChange} />
    </div>
  )
}

export default FilterPanel
