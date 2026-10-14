import { Link } from 'react-router-dom'
import { InstagramLogoIcon, TiktokLogoIcon, XLogoIcon } from '@phosphor-icons/react'
import Logo from '../brand/Logo'

const socials = [
  { label: 'Instagram', href: '#instagram', Icon: InstagramLogoIcon },
  { label: 'TikTok', href: '#tiktok', Icon: TiktokLogoIcon },
  { label: 'X', href: '#x', Icon: XLogoIcon },
]

const columns = [
  {
    title: 'Explore',
    links: [
      { to: '/browse', label: 'Browse Collection' },
      { to: '/dupe-finder', label: 'Dupe Finder' },
      { to: '/browse?type=arabian', label: 'Middle Eastern Perfumes' },
      { to: '/browse?type=designer', label: 'Designer Originals' },
    ],
  },
  {
    title: 'Families',
    links: [
      { to: '/browse?category=oud', label: 'Oud' },
      { to: '/browse?category=gourmand', label: 'Gourmand' },
      { to: '/browse?category=amber', label: 'Amber' },
      { to: '/browse?category=floral', label: 'Floral' },
    ],
  },
]

function Footer() {
  return (
    <footer className="relative bg-noir-950 border-t border-noir-600/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="inline-block mb-6" aria-label="SouqIntel home">
              <Logo />
            </Link>
            <p className="text-ivory-400 text-sm leading-relaxed mb-6 max-w-xs">
              The finest Middle Eastern perfumes, matched to the designer and niche icons they echo.
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-noir-600 flex items-center justify-center text-ivory-400 hover:border-gold-500 hover:text-gold-300 transition-colors"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow mb-6">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-ivory-300 hover:text-gold-300 transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow mb-6">Stay Updated</h3>
            <p className="text-ivory-400 text-sm mb-4">New dupe discoveries and fragrance guides, now and then.</p>
            <form className="space-y-3">
              <input type="email" placeholder="Your email" aria-label="Email address" className="input-field text-sm" />
              <button type="submit" className="btn-primary w-full justify-center text-sm">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-noir-600/60 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ivory-500">
          <p>&copy; {new Date().getFullYear()} SouqIntel. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
              <a key={item} href="#" className="hover:text-ivory-100 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
