import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MagnifyingGlassIcon, ListIcon, XIcon } from '@phosphor-icons/react'
import Logo from '../brand/Logo'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Collection' },
  { to: '/dupe-finder', label: 'Dupe Finder' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const solid = isScrolled || isMobileMenuOpen

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${solid ? 'glass bg-noir-950/80 border-x-0 border-t-0' : 'border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `group relative py-1 text-sm tracking-wide transition-colors duration-200 ${
                    isActive ? 'text-ivory-50' : 'text-ivory-400 hover:text-ivory-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-px bg-gold-400 origin-left transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2" aria-label="SouqIntel home">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/dupe-finder"
              className="p-2 text-ivory-300 hover:text-gold-300 transition-colors"
              aria-label="Search perfumes"
            >
              <MagnifyingGlassIcon size={20} aria-hidden="true" />
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-ivory-300 hover:text-ivory-50"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <XIcon size={24} aria-hidden="true" /> : <ListIcon size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-ivory-100/10">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-base transition-colors duration-200 ${
                      isActive ? 'bg-gold-500/15 text-gold-300' : 'text-ivory-300 hover:bg-ivory-100/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
