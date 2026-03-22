import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-display text-xl font-semibold text-white">
                SouqIntel
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              Discover the finest Middle Eastern perfumes and find affordable alternatives
              to your favorite designer fragrances. Experience the magic of Arabian oud,
              musk, and amber.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dupe-finder" className="text-sm hover:text-amber-400 transition-colors">
                  Dupe Finder
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-sm hover:text-amber-400 transition-colors">
                  Browse Perfumes
                </Link>
              </li>
              <li>
                <Link to="/browse?category=oud" className="text-sm hover:text-amber-400 transition-colors">
                  Oud Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/browse?category=oud" className="text-sm hover:text-amber-400 transition-colors">
                  Oud
                </Link>
              </li>
              <li>
                <Link to="/browse?category=musk" className="text-sm hover:text-amber-400 transition-colors">
                  Musk
                </Link>
              </li>
              <li>
                <Link to="/browse?category=amber" className="text-sm hover:text-amber-400 transition-colors">
                  Amber
                </Link>
              </li>
              <li>
                <Link to="/browse?category=floral" className="text-sm hover:text-amber-400 transition-colors">
                  Floral
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SouqIntel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
