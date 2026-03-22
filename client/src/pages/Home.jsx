import { Link } from 'react-router-dom'
import SearchBar from '../components/search/SearchBar'

function Home() {
  const featuredCategories = [
    { name: 'Oud', icon: '🪵', description: 'Rich, woody fragrances' },
    { name: 'Musk', icon: '🦌', description: 'Sensual, warm scents' },
    { name: 'Amber', icon: '✨', description: 'Sweet, resinous notes' },
    { name: 'Floral', icon: '🌹', description: 'Elegant rose & jasmine' },
  ]

  const popularDupes = [
    { original: 'Baccarat Rouge 540', dupe: 'Lattafa Raghba', savings: '90%' },
    { original: 'Tom Ford Oud Wood', dupe: 'Armaf Club de Nuit Intense', savings: '85%' },
    { original: 'Creed Aventus', dupe: 'Armaf CDNIM', savings: '95%' },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            Discover
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              {' '}Middle Eastern{' '}
            </span>
            Perfumes
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find affordable Arabian alternatives to expensive designer fragrances.
            Experience the magic of oud, musk, and amber.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dupe-finder" className="btn-primary inline-flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Find Dupes
            </Link>
            <Link to="/browse" className="btn-secondary inline-flex items-center justify-center">
              Browse Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link
                key={category.name}
                to={`/browse?category=${category.name.toLowerCase()}`}
                className="card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <span className="text-4xl mb-4 block">{category.icon}</span>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dupes Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-4">
            Popular Dupe Finds
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Save big with these community-verified alternatives
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularDupes.map((item, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="badge badge-green">{item.savings} savings</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Looking for</p>
                    <p className="font-semibold text-gray-900">{item.original}</p>
                  </div>
                  <div className="flex justify-center">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Try instead</p>
                    <p className="font-semibold text-amber-600">{item.dupe}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/dupe-finder" className="text-amber-600 font-medium hover:text-amber-700">
              View all dupes →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">
            Why SouqIntel?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Save Money</h3>
              <p className="text-gray-600">Find quality alternatives at a fraction of the price</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verified Dupes</h3>
              <p className="text-gray-600">Community-tested and expert-verified recommendations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Middle Eastern Focus</h3>
              <p className="text-gray-600">Specializing in authentic Arabian fragrances</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
