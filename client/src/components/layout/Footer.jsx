import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-800 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-2xl font-semibold tracking-wide uppercase">
                SouqIntel
              </span>
            </Link>
            <p className="text-dark-300 text-sm leading-relaxed mb-6">
              Discover the finest Middle Eastern perfumes and find affordable alternatives
              to your favorite designer fragrances.
            </p>
            <div className="flex gap-4">
              {['instagram', 'twitter', 'facebook'].map((social) => (
                <a 
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-dark-300 hover:bg-accent-500 hover:text-white transition-all"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { to: '/browse', label: 'Browse Collection' },
                { to: '/dupe-finder', label: 'Dupe Finder' },
                { to: '/browse?type=arabian', label: 'Middle Eastern Perfumes' },
                { to: '/browse?type=designer', label: 'Designer Dupes' },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-dark-300 hover:text-accent-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-6">Categories</h3>
            <ul className="space-y-4">
              {[
                { to: '/browse?category=oud', label: 'Oud' },
                { to: '/browse?category=musk', label: 'Musk' },
                { to: '/browse?category=amber', label: 'Amber' },
                { to: '/browse?category=floral', label: 'Floral' },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-dark-300 hover:text-accent-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-6">Stay Updated</h3>
            <p className="text-dark-300 text-sm mb-4">
              Subscribe to get updates on new dupe discoveries and fragrance guides.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-full text-white placeholder:text-dark-400 focus:outline-none focus:border-accent-500 transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-accent-500 text-white rounded-full font-medium hover:bg-accent-600 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-400 text-sm">
            &copy; {currentYear} SouqIntel. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
              <a 
                key={item}
                href="#"
                className="text-dark-400 hover:text-white text-sm transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
