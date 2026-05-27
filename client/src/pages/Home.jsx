import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/search/SearchBar'

function Home() {
  // Hero image carousel - using background-removed images
  const heroImages = [
    { src: '/images/perfumes/nobg/baccarat-rouge-540.png', name: 'Baccarat Rouge 540' },
    { src: '/images/perfumes/nobg/oud-wood.png', name: 'Oud Wood' },
    { src: '/images/perfumes/nobg/aventus.png', name: 'Aventus' },
    { src: '/images/perfumes/nobg/layton.png', name: 'Layton' },
    { src: '/images/perfumes/nobg/sauvage.png', name: 'Sauvage' },
    { src: '/images/perfumes/nobg/tobacco-vanille.png', name: 'Tobacco Vanille' },
    { src: '/images/perfumes/nobg/black-orchid.png', name: 'Black Orchid' },
    { src: '/images/perfumes/nobg/grand-soir.png', name: 'Grand Soir' },
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
        setIsTransitioning(false)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  const featuredCategories = [
    { name: 'Oud', icon: '🪵', description: 'Rich, woody fragrances', image: '/oud-category.jpg' },
    { name: 'Musk', icon: '🦌', description: 'Sensual, warm scents', image: '/musk-category.jpg' },
    { name: 'Amber', icon: '✨', description: 'Sweet, resinous notes', image: '/amber-category.jpg' },
    { name: 'Floral', icon: '🌹', description: 'Elegant rose & jasmine', image: '/floral-category.jpg' },
  ]

  const popularDupes = [
    { original: 'Baccarat Rouge 540', dupe: 'Lattafa Raghba', savings: '90%', image: '/images/perfumes/baccarat-rouge-540.jpg' },
    { original: 'Tom Ford Oud Wood', dupe: 'Armaf Club de Nuit', savings: '85%', image: '/images/perfumes/oud-wood.jpg' },
    { original: 'Creed Aventus', dupe: 'Armaf CDNIM', savings: '95%', image: '/images/perfumes/aventus.jpg' },
  ]

  const marqueeItems = [
    'Expert Recommendations',
    'Verified Dupe Matches',
    'Community Reviews',
    'Fragrance Comparisons',
    'Middle Eastern Alternatives',
    'Save Up to 95%',
  ]

  const stats = [
    { value: '50+', label: 'Fragrances' },
    { value: '25k+', label: 'Active Users' },
    { value: '100%', label: 'Authentic' },
  ]

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="min-h-screen pt-20 pb-8 px-6 lg:px-8 bg-gradient-to-br from-cream-100 via-cream-200/50 to-accent-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)]">
            {/* Left Content */}
            <div className="order-2 lg:order-1 space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-dark-800 leading-[1.1] tracking-tight">
                  Discover{' '}
                  <span className="text-accent-500 italic">Middle Eastern</span>
                  <br />
                  Alternatives.
                </h1>
                <p className="text-lg text-dark-500 max-w-lg leading-relaxed">
                  Experience the art of fine fragrance. Find affordable Middle Eastern 
                  alternatives to expensive designer perfumes. Each scent tells a story.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/browse" className="btn-primary group">
                  Explore Collection
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link to="/dupe-finder" className="btn-icon">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </Link>
              </div>

              {/* Popular Comparisons Preview */}
              <div className="pt-6">
                <p className="text-sm font-medium text-dark-500 mb-4">Popular Comparisons</p>
                <div className="flex gap-4">
                  {[
                    { name: 'Baccarat Rouge', dupe: 'Has 12 dupes', image: '/images/perfumes/baccarat-rouge-540.jpg' },
                    { name: 'Oud Wood', dupe: 'Has 8 dupes', image: '/images/perfumes/oud-wood.jpg' },
                  ].map((product, i) => (
                    <Link 
                      key={i} 
                      to="/dupe-finder" 
                      className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-3 pr-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cream-200 to-cream-300 flex items-center justify-center overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-dark-800 text-sm">{product.name}</p>
                        <p className="text-accent-500 text-sm">{product.dupe}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Hero Image Carousel */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
                {/* Background decorative circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-100/50 to-cream-200/80 rounded-full scale-90" />
                
                {/* Image carousel */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-8 pb-24">
                  <div className="relative w-[380px] h-[480px]">
                    {/* Main image with transition */}
                    <div 
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                        isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                      }`}
                    >
                      <img 
                        src={heroImages[currentImageIndex].src}
                        alt={heroImages[currentImageIndex].name}
                        className="w-full h-full object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Info tag - positioned below carousel */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg z-20">
                  <p className="text-sm text-dark-500">Find your</p>
                  <p className="text-2xl font-display font-semibold italic text-accent-500">perfect match</p>
                </div>

                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsTransitioning(true)
                        setTimeout(() => {
                          setCurrentImageIndex(index)
                          setIsTransitioning(false)
                        }, 300)
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-accent-500 w-6' 
                          : 'bg-dark-300 hover:bg-dark-400'
                      }`}
                      aria-label={`View ${heroImages[index].name}`}
                    />
                  ))}
                </div>

                {/* Floating badges */}
                <div className="absolute top-10 right-10 bg-white rounded-full px-4 py-2 shadow-lg z-20">
                  <span className="text-sm font-medium text-dark-800">Verified Reviews</span>
                </div>
                <div className="absolute bottom-40 left-0 bg-accent-500 text-white rounded-full px-4 py-2 shadow-lg z-20">
                  <span className="text-sm font-medium">50+ Fragrances</span>
                </div>

                {/* Current perfume name */}
                <div className={`absolute top-1/2 -left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md z-20 transition-all duration-500 ${
                  isTransitioning ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'
                }`}>
                  <p className="text-xs text-dark-400 uppercase tracking-wider">Featured</p>
                  <p className="text-sm font-semibold text-dark-800">{heroImages[currentImageIndex].name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <section className="bg-dark-800 py-4 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={index} className="mx-8 text-white/90 uppercase tracking-widest text-sm font-medium flex items-center gap-3">
              {item}
              <span className="text-accent-500">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-4">
            Find Your <span className="italic text-accent-500">Perfect</span> Dupe
          </h2>
          <p className="section-subtitle mb-8">
            Search for any designer fragrance and discover affordable alternatives
          </p>
          <SearchBar />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 lg:px-8 bg-cream-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="section-title mb-3">
                Explore by <span className="italic text-accent-500">Category</span>
              </h2>
              <p className="section-subtitle">Discover scents that match your style</p>
            </div>
            <Link to="/browse" className="btn-ghost mt-4 md:mt-0">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link
                key={category.name}
                to={`/browse?category=${category.name.toLowerCase()}`}
                className="group relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cream-100 to-cream-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                  <h3 className="text-xl font-display font-semibold text-dark-800 mb-1">{category.name}</h3>
                  <p className="text-sm text-dark-400">{category.description}</p>
                  <div className="mt-4 flex items-center text-accent-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dupes Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">
              Popular <span className="italic text-accent-500">Dupe</span> Finds
            </h2>
            <p className="section-subtitle">Save big with these community-verified alternatives</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularDupes.map((item, index) => (
              <div key={index} className="card p-8 text-center group">
                <div className="mb-6">
                  <span className="badge-success font-semibold">Save {item.savings}</span>
                </div>
                
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cream-100 to-cream-200 flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
                  <img src={item.image} alt={item.original} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-dark-400 uppercase tracking-wider mb-1">Looking for</p>
                    <p className="font-display font-semibold text-dark-800">{item.original}</p>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-dark-400 uppercase tracking-wider mb-1">Try instead</p>
                    <p className="font-display font-semibold text-accent-500">{item.dupe}</p>
                  </div>
                </div>

                <Link 
                  to="/dupe-finder" 
                  className="mt-6 inline-flex items-center text-sm text-dark-500 hover:text-accent-500 transition-colors"
                >
                  View Details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/dupe-finder" className="btn-primary">
              Find Your Dupe
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Why Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-cream-100 to-accent-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-3">
              Why <span className="italic text-accent-500">SouqIntel</span>?
            </h2>
            <p className="section-subtitle">Your trusted source for Middle Eastern fragrances</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Save Up to 95%',
                description: 'Find quality alternatives at a fraction of the designer price',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Verified Dupes',
                description: 'Community-tested and expert-verified recommendations',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Authentic Middle Eastern',
                description: 'Specializing in genuine Middle Eastern fragrances',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-accent-100 text-accent-500 flex items-center justify-center mb-6 group-hover:bg-accent-500 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-dark-800 mb-3">{feature.title}</h3>
                <p className="text-dark-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-display font-bold text-dark-800">{stat.value}</p>
                <p className="text-dark-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 bg-dark-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-4">
            Ready to find your signature scent?
          </h2>
          <p className="text-dark-300 text-lg mb-8 max-w-2xl mx-auto">
            Explore our curated collection of Middle Eastern fragrances and discover affordable alternatives to luxury perfumes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse" className="btn-primary">
              Start Exploring
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link to="/dupe-finder" className="btn-primary-outline !border-white !text-white hover:!bg-white hover:!text-dark-800">
              Find a Dupe
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
