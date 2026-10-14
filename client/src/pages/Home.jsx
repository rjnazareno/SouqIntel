import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, ArrowUpRightIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import SearchBar from '../components/search/SearchBar'
import PerfumeCard from '../components/perfume/PerfumeCard'
import { fallbackPerfumes, fallbackDupeRelations } from '../data/fallbackPerfumes'
import { gsap, ScrollTrigger, SplitText, useGSAP, useReveal, MOTION_OK, EASE } from '../lib/motion'

const HeroSmoke = lazy(() => import('../components/effects/HeroSmoke'))
const LiquidArch = lazy(() => import('../components/effects/LiquidArch'))

// WebGL only where motion is welcome and the screen is wide enough to run it smoothly;
// everyone else gets the CSS gradient and the static gold arch.
const canRunFX = typeof window !== 'undefined'
  && window.matchMedia(`${MOTION_OK} and (min-width: 768px)`).matches

const ARCH_FRAME = 'M0 560V252C0 128 88 46 200 0c112 46 200 128 200 252v308zM28 560V256c0-110 78-180 172-224 94 44 172 114 172 224v304z'

const byId = new Map(fallbackPerfumes.map((p) => [p._id, p]))
const noteNames = (p) => Object.values(p.notes || {}).flat().map((n) => n.name)

// Every catalog pair where both sides are trending entries (real note pyramids and images),
// best match first. New trending pairs added to the catalog show up here automatically.
const pairs = fallbackDupeRelations
  .filter((r) => byId.get(r.originalId)?.trending && byId.get(r.dupeId)?.trending)
  .sort((a, b) => b.similarityScore - a.similarityScore)
  .map((r) => {
    const original = byId.get(r.originalId)
    const dupe = byId.get(r.dupeId)
    const inDupe = new Set(noteNames(dupe).map((n) => n.toLowerCase()))
    const inOriginal = new Set(noteNames(original).map((n) => n.toLowerCase()))
    return {
      ...r,
      original,
      dupe,
      shared: noteNames(original).filter((n) => inDupe.has(n.toLowerCase())),
      originalOnly: noteNames(original).filter((n) => !inDupe.has(n.toLowerCase())),
      dupeOnly: noteNames(dupe).filter((n) => !inOriginal.has(n.toLowerCase())),
    }
  })

const trending = fallbackPerfumes.filter((p) => p.trending)

// The most common notes across the catalog, for the marquee.
const topNotes = [...fallbackPerfumes.flatMap(noteNames).reduce((m, n) => m.set(n, (m.get(n) || 0) + 1), new Map())]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .map(([n]) => n)

const families = [
  { id: 'oud', name: 'Oud', description: 'Smoky agarwood and resin', image: byId.get('oud-wood')?.imageUrl },
  { id: 'gourmand', name: 'Gourmand', description: 'Vanilla, praline, pistachio', image: byId.get('lattafa-khamrah')?.imageUrl },
  { id: 'amber', name: 'Amber', description: 'Warm, resinous, glowing', image: byId.get('jpg-le-male-elixir')?.imageUrl },
  { id: 'floral', name: 'Floral', description: 'Rose, jasmine, violet', image: byId.get('miu-miu-miutine')?.imageUrl },
].map((f) => ({ ...f, count: fallbackPerfumes.filter((p) => p.category === f.id).length }))

// Rotates the arch through every pair. `gentle` is the reduced-motion version: opacity only.
// Hovering or focusing the arch holds the current pair so it can be read (WCAG 2.2.2).
function cyclePairs(gentle) {
  const groups = gsap.utils.toArray('.arch-pair').map((g) => g.querySelectorAll('img'))
  const captions = gsap.utils.toArray('.arch-caption')
  const hold = gentle ? '+=6' : '+=4.5'
  const loop = gsap.timeline({ repeat: -1, delay: gentle ? 6 : 4.5 })
  groups.forEach((imgs, i) => {
    const n = (i + 1) % groups.length
    loop
      .to(imgs, gentle
        ? { opacity: 0, duration: 0.6 }
        : { opacity: 0, y: -16, filter: 'blur(6px)', duration: 0.7, stagger: 0.08, ease: 'power2.in' }, i === 0 ? 0 : hold)
      .to(captions[i], { autoAlpha: 0, y: gentle ? 0 : -8, duration: 0.4 }, '<')
      .fromTo(groups[n], gentle
        ? { opacity: 0 }
        : { opacity: 0, y: 28, filter: 'blur(6px)' }, gentle
        ? { opacity: 1, duration: 0.6 }
        : { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.3, ease: EASE }, gentle ? '>' : '-=0.15')
      .fromTo(captions[n], { autoAlpha: 0, y: gentle ? 0 : 8 }, { autoAlpha: 1, y: 0, duration: 0.6 }, '<0.3')
  })

  const stage = document.querySelector('.hero-stage')
  const pause = () => loop.pause()
  const resume = () => loop.resume()
  const events = [['pointerenter', pause], ['pointerleave', resume], ['focusin', pause], ['focusout', resume]]
  events.forEach(([type, fn]) => stage?.addEventListener(type, fn))
  return { loop, cleanup: () => events.forEach(([type, fn]) => stage?.removeEventListener(type, fn)) }
}

function StaticArch() {
  return (
    <svg viewBox="0 0 400 560" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="arch-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F1DDB0" />
          <stop offset="0.45" stopColor="#B88E52" />
          <stop offset="0.7" stopColor="#E3C893" />
          <stop offset="1" stopColor="#8A6A3C" />
        </linearGradient>
      </defs>
      <path fill="url(#arch-gold)" fillRule="evenodd" d={ARCH_FRAME} />
    </svg>
  )
}

function Bottle({ perfume, label }) {
  return (
    <Link to={`/perfume/${perfume._id}`} className="group block text-center">
      <span className="share-img block mx-auto w-full max-w-[260px] aspect-3/4 rounded-t-full overflow-hidden isolate bg-[radial-gradient(ellipse_at_50%_40%,var(--color-ivory-50),var(--color-ivory-300))]">
        <img src={perfume.imageUrl} alt={perfume.name} className="w-full h-full object-cover mix-blend-multiply scale-110 transition-transform duration-700 group-hover:scale-[1.15]" />
      </span>
      <span className="mt-5 block text-sm text-ivory-400">{label}, {perfume.brand?.name}</span>
      <span className="block font-display text-3xl text-ivory-50 group-hover:text-gold-300 transition-colors">{perfume.name}</span>
    </Link>
  )
}

function PairExplorer() {
  const [active, setActive] = useState(0)
  const panelRef = useRef(null)
  const pair = pairs[active]

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.from('.share-img', { opacity: 0, y: 24, duration: 0.8, stagger: 0.1, ease: EASE })
      gsap.from('.note-chip', { opacity: 0, y: 10, duration: 0.45, stagger: 0.03, ease: EASE, delay: 0.15 })
    })
  }, { scope: panelRef, dependencies: [active], revertOnUpdate: true })

  if (!pair) return null

  return (
    <section className="px-6 lg:px-8 py-28 md:py-36">
      <div className="max-w-7xl mx-auto">
        <div className="reveal max-w-2xl">
          <h2 className="section-title">Same accord, <em className="text-gold-300">a fraction</em> of the price.</h2>
          <p className="section-subtitle mt-5">Pick a pair. The notes they share are lit in gold.</p>
        </div>

        <div role="tablist" aria-label="Dupe pairs" className="reveal mt-10 flex flex-wrap gap-2">
          {pairs.map((p, i) => (
            <button
              key={p._id}
              role="tab"
              aria-selected={i === active}
              aria-controls="pair-panel"
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                i === active ? 'bg-gold-400 border-gold-400 text-noir-950' : 'border-noir-600 text-ivory-300 hover:border-gold-500 hover:text-ivory-50'
              }`}
            >
              {p.original.name} / {p.dupe.name}
            </button>
          ))}
        </div>

        <div id="pair-panel" role="tabpanel" ref={panelRef} className="mt-14 grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] gap-12 md:gap-10 items-center">
          <Bottle perfume={pair.original} label="Original" />

          <div className="text-center">
            <p className="font-display text-7xl md:text-8xl text-gold-300 leading-none tabular-nums">
              {pair.shared.length}<span className="text-ivory-500">/{pair.shared.length + pair.originalOnly.length}</span>
            </p>
            <p className="mt-3 text-ivory-300">notes in common</p>
            <ul className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Notes">
              {pair.shared.map((n) => (
                <li key={`s-${n}`} className="note-chip px-3.5 py-1.5 rounded-full text-sm bg-gold-400 text-noir-950">{n}</li>
              ))}
              {pair.originalOnly.map((n) => (
                <li key={`o-${n}`} className="note-chip px-3.5 py-1.5 rounded-full text-sm border border-noir-600 text-ivory-500 line-through decoration-ivory-500/60">
                  {n}
                </li>
              ))}
              {pair.dupeOnly.map((n) => (
                <li key={`d-${n}`} className="note-chip px-3.5 py-1.5 rounded-full text-sm border border-ivory-100/25 text-ivory-300">+ {n}</li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-ivory-400">
              {pair.similarityScore}% match, about {pair.priceComparison?.savings}% cheaper
            </p>
          </div>

          <Bottle perfume={pair.dupe} label="Dupe" />
        </div>
      </div>
    </section>
  )
}

function FamilyIndex() {
  const listRef = useRef(null)

  useGSAP(() => {
    gsap.matchMedia().add(`${MOTION_OK} and (pointer: fine)`, () => {
      const preview = listRef.current.querySelector('.family-preview')
      const imgs = preview.querySelectorAll('img')
      const x = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3' })
      const y = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3' })
      const move = (e) => {
        const r = listRef.current.getBoundingClientRect()
        x(e.clientX - r.left - 110)
        y(e.clientY - r.top - 150)
      }
      const enterRow = (e) => {
        const i = Number(e.currentTarget.dataset.index)
        gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.4, ease: EASE })
        imgs.forEach((img, j) => gsap.to(img, { opacity: i === j ? 1 : 0, duration: 0.3 }))
      }
      const leave = () => gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.3 })
      const rows = listRef.current.querySelectorAll('.family-row')
      listRef.current.addEventListener('pointermove', move)
      listRef.current.addEventListener('pointerleave', leave)
      rows.forEach((row) => row.addEventListener('pointerenter', enterRow))
      return () => {
        listRef.current?.removeEventListener('pointermove', move)
        listRef.current?.removeEventListener('pointerleave', leave)
        rows.forEach((row) => row.removeEventListener('pointerenter', enterRow))
      }
    })
  }, { scope: listRef })

  return (
    <section className="px-6 lg:px-8 py-28 md:py-36 border-t border-noir-600/60">
      <div className="max-w-7xl mx-auto">
        <h2 className="reveal section-title mb-14">Explore by family</h2>
        <div ref={listRef} className="relative">
          <div
            aria-hidden="true"
            className="family-preview hidden md:block pointer-events-none absolute left-0 top-0 z-10 w-[220px] aspect-3/4 rounded-t-full overflow-hidden isolate invisible opacity-0 bg-[radial-gradient(ellipse_at_50%_40%,var(--color-ivory-50),var(--color-ivory-300))] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]"
          >
            {families.map((f) => (
              <img key={f.id} src={f.image} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply scale-110 opacity-0" />
            ))}
          </div>
          <ul className="group/list border-b border-noir-600/60">
            {families.map((f, i) => (
              <li key={f.id} className="reveal border-t border-noir-600/60 transition-opacity duration-300 group-hover/list:opacity-40 hover:opacity-100!">
                <Link
                  to={`/browse?category=${f.id}`}
                  data-index={i}
                  className="family-row group grid grid-cols-[auto_minmax(0,1fr)_auto] md:grid-cols-[1fr_auto_auto] items-center gap-4 md:gap-10 py-6 md:py-8"
                >
                  <span className="md:hidden w-14 aspect-3/4 rounded-t-full overflow-hidden isolate bg-ivory-100">
                    <img src={f.image} alt="" className="w-full h-full object-cover mix-blend-multiply" />
                  </span>
                  <span className="truncate font-display text-4xl sm:text-5xl md:text-8xl leading-none text-ivory-50 transition-[color,translate] duration-500 group-hover:text-gold-300 md:group-hover:translate-x-4">
                    {f.name}
                  </span>
                  <span className="hidden md:block text-ivory-400 text-right">{f.description}</span>
                  <span className="flex items-center gap-2 text-sm text-ivory-300 tabular-nums whitespace-nowrap">
                    {f.count} scents
                    <ArrowUpRightIcon size={18} className="text-gold-400 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Home() {
  const rootRef = useRef(null)
  const heroRef = useRef(null)
  const railRef = useRef(null)
  const [heroInView, setHeroInView] = useState(true)

  useReveal(rootRef)

  // Lets the liquid arch idle (speed 0) once the hero has scrolled away.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting))
    io.observe(heroRef.current)
    return () => io.disconnect()
  }, [])

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(MOTION_OK, () => {
      // Focal moment: the arch is lit, the original appears, then its dupe steps in beside it.
      SplitText.create('.hero-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.2, stagger: 0.12, ease: EASE }),
      })
      const firstPair = gsap.utils.toArray('.arch-pair')[0]?.querySelectorAll('img')
      const intro = gsap.timeline({ defaults: { ease: EASE } })
      intro
        .from('.arch-glow', { opacity: 0, scale: 0.6, duration: 2 }, 0.1)
        .from('.arch', { opacity: 0, scale: 0.94, duration: 1.4 }, 0.15)
        .fromTo('.arch-window', { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' }, 0.55)
        .from(firstPair, { opacity: 0, y: 40, filter: 'blur(8px)', duration: 1.1, stagger: 0.35 }, 0.9)
        .from('.arch-caption-0', { opacity: 0, y: 10, duration: 0.8 }, 1.5)
        .from('.hero-fade', { opacity: 0, y: 20, duration: 0.9, stagger: 0.1 }, 0.6)

      // Then cycle through the pairs.
      const cycle = cyclePairs(false)
      intro.add(cycle.loop, 2.2)

      // Leaving the hero: copy lifts away, the arch recedes.
      const exit = { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.hero-copy', { yPercent: -18, opacity: 0.15, ease: 'none', scrollTrigger: exit })
      gsap.to('.hero-stage', { yPercent: -10, scale: 0.94, ease: 'none', scrollTrigger: exit })

      // Kinetic marquee: drifts on its own, speeds up with scroll velocity.
      const drift = gsap.to('.marquee-track', { xPercent: -50, ease: 'none', duration: 60, repeat: -1 })
      ScrollTrigger.create({
        trigger: '.marquee',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          gsap.to(drift, {
            timeScale: 1 + Math.min(Math.abs(self.getVelocity()) / 250, 6),
            duration: 0.2,
            overwrite: true,
            onComplete: () => gsap.to(drift, { timeScale: 1, duration: 1.2, overwrite: true }),
          })
        },
      })

      return cycle.cleanup
    })

    // Reduced motion still rotates the pairs, as a plain cross-fade with no movement or WebGL.
    mm.add('(prefers-reduced-motion: reduce)', () => cyclePairs(true).cleanup)

    mm.add(`${MOTION_OK} and (pointer: fine)`, () => {
      // The arch turns gently toward the cursor; its glow drifts the other way.
      gsap.set('.arch', { transformPerspective: 1100 })
      const rotY = gsap.quickTo('.arch', 'rotationY', { duration: 0.9, ease: 'power3' })
      const rotX = gsap.quickTo('.arch', 'rotationX', { duration: 0.9, ease: 'power3' })
      const glowX = gsap.quickTo('.arch-glow', 'x', { duration: 1.2, ease: 'power3' })
      const glowY = gsap.quickTo('.arch-glow', 'y', { duration: 1.2, ease: 'power3' })
      const onMove = (e) => {
        const x = e.clientX / window.innerWidth - 0.5
        const y = e.clientY / window.innerHeight - 0.5
        rotY(x * 10)
        rotX(-y * 6)
        glowX(x * -40)
        glowY(y * -40)
      }
      window.addEventListener('pointermove', onMove, { passive: true })

      // Magnetic CTAs.
      const cleanups = gsap.utils.toArray('.magnetic').map((el) => {
        const mx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
        const my = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
        const move = (e) => {
          const r = el.getBoundingClientRect()
          mx((e.clientX - r.left - r.width / 2) * 0.3)
          my((e.clientY - r.top - r.height / 2) * 0.4)
        }
        const leave = () => { mx(0); my(0) }
        el.addEventListener('pointermove', move)
        el.addEventListener('pointerleave', leave)
        return () => {
          el.removeEventListener('pointermove', move)
          el.removeEventListener('pointerleave', leave)
        }
      })

      return () => {
        window.removeEventListener('pointermove', onMove)
        cleanups.forEach((fn) => fn())
      }
    })
  }, { scope: rootRef })

  const scrollRail = (dir) => railRef.current?.scrollBy({ left: dir * railRef.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <div ref={rootRef} className="page-transition">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-dvh overflow-hidden flex items-center pt-24 pb-16 px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_72%_45%,#4A1712_0%,transparent_55%),radial-gradient(ellipse_at_20%_85%,rgb(201_163_106/0.18)_0%,transparent_50%),linear-gradient(160deg,#1A0D06,#0B0907_70%)]"
        >
          {canRunFX && (
            <Suspense fallback={null}>
              <HeroSmoke />
            </Suspense>
          )}
        </div>
        {/* Scrim: keeps the copy at AA over the brightest smoke frame */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgb(11_9_7/0.85)_0%,rgb(11_9_7/0.5)_45%,rgb(11_9_7/0.05)_100%),linear-gradient(to_top,var(--color-noir-950)_0%,transparent_30%)]"
        />

        <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-[1.25fr_0.75fr] gap-14 lg:gap-10 items-center">
          <div className="hero-copy">
            <h1 className="hero-title font-display font-medium text-[clamp(2.75rem,4.8vw,4.3rem)] leading-[1.06] tracking-[-0.015em] text-ivory-50">
              <span className="block lg:whitespace-nowrap">Designer icons.</span>
              <span className="block lg:whitespace-nowrap"><em className="text-gold-300">Middle Eastern</em> alternatives.</span>
            </h1>
            <p className="hero-fade mt-8 text-lg md:text-xl text-ivory-300 max-w-[34ch] leading-relaxed">
              The Arabian perfumes that echo Baccarat Rouge, Althaïr and Angels&apos; Share, for a fraction of the price.
            </p>
            <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
              <Link to="/browse" className="magnetic btn-primary group">
                Explore the collection
                <ArrowRightIcon size={18} weight="bold" className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link to="/dupe-finder" className="magnetic glass inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-ivory-50 hover:text-gold-300">
                Find a dupe
              </Link>
            </div>
          </div>

          {/* The arch: designer original and its dupe, side by side in the lit window */}
          <figure className="hero-stage relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px]">
            <div aria-hidden="true" className="arch-glow absolute -inset-[30%] rounded-full bg-[radial-gradient(closest-side,rgb(227_200_147/0.3),transparent)] blur-2xl" />
            <div className="arch relative aspect-400/560">
              <div className="arch-window absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,var(--color-ivory-50),var(--color-ivory-300)_80%)]">
                {pairs.map((pair, i) => (
                  <div key={pair._id} className="arch-pair absolute inset-x-[10%] top-[34%] bottom-[3%] grid grid-cols-2 gap-3 items-end">
                    {[pair.original, pair.dupe].map((p) => (
                      <img
                        key={p._id}
                        src={p.imageUrl}
                        alt={i === 0 ? p.name : ''}
                        className="w-full h-full object-contain object-bottom mix-blend-multiply scale-125 origin-bottom"
                        style={{ opacity: i === 0 ? 1 : 0 }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              {canRunFX ? (
                <Suspense fallback={<StaticArch />}>
                  <LiquidArch running={heroInView} />
                </Suspense>
              ) : (
                <StaticArch />
              )}
            </div>
            <figcaption className="relative mt-7 grid text-center">
              {pairs.map((pair, i) => (
                <Link
                  key={pair._id}
                  to={`/perfume/${pair.dupe._id}`}
                  className={`arch-caption arch-caption-${i} group [grid-area:1/1]`}
                  style={i === 0 ? undefined : { opacity: 0, visibility: 'hidden' }}
                >
                  <span className="block font-display text-2xl text-ivory-50">
                    {pair.original.name} <span className="text-gold-400">/</span>{' '}
                    <span className="underline decoration-gold-500/40 underline-offset-4 group-hover:decoration-gold-300">{pair.dupe.name}</span>
                  </span>
                  <span className="block mt-1 text-sm text-ivory-400">
                    {pair.similarityScore}% match, about {pair.priceComparison?.savings}% cheaper
                  </span>
                </Link>
              ))}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Kinetic marquee of the catalog's most-used notes */}
      <section aria-label="Notes in the catalog" className="marquee border-y border-noir-600/60 py-8 overflow-hidden">
        <div className="marquee-track flex w-max">
          {[...topNotes, ...topNotes].map((note, i) => (
            <span
              key={i}
              aria-hidden={i >= topNotes.length}
              className="font-display italic text-4xl md:text-6xl text-ivory-100/90 whitespace-nowrap px-8 md:px-12 flex items-center gap-16 md:gap-24"
            >
              {note}
              <span className="block w-2 h-2 rotate-45 bg-gold-400" aria-hidden="true" />
            </span>
          ))}
        </div>
      </section>

      {/* Trending 2026 */}
      <section id="trending" className="py-28 md:py-36 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-end justify-between gap-6 mb-12">
          <div className="reveal max-w-2xl">
            <h2 className="section-title">Trending in <em className="text-gold-300">2026</em></h2>
            <p className="section-subtitle mt-5">Viral Arabian gourmands, the pistachio and berry launches, and the dupes people are asking about.</p>
          </div>
          <div className="hidden md:flex gap-2 shrink-0">
            <button onClick={() => scrollRail(-1)} className="btn-icon" aria-label="Scroll trending left">
              <CaretLeftIcon size={20} aria-hidden="true" />
            </button>
            <button onClick={() => scrollRail(1)} className="btn-icon" aria-label="Scroll trending right">
              <CaretRightIcon size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div
          ref={railRef}
          role="region"
          aria-label="Trending 2026 fragrances"
          tabIndex={0}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 px-6 scroll-px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:scroll-px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {trending.map((perfume) => (
            <PerfumeCard key={perfume._id} perfume={perfume} className="reveal snap-start shrink-0 w-[250px] md:w-[280px]" />
          ))}
        </div>
      </section>

      <PairExplorer />

      <FamilyIndex />

      {/* Search */}
      <section className="relative overflow-hidden px-6 lg:px-8 py-28 md:py-36 text-center border-t border-noir-600/60">
        <div className="relative max-w-3xl mx-auto">
          <h2 className="reveal section-title">Find your <em className="text-gold-300">perfect</em> dupe</h2>
          <p className="reveal section-subtitle mt-5 mb-10">Search any designer or niche fragrance.</p>
          <div className="reveal">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden px-6 lg:px-8 pt-28 md:pt-36 pb-32 text-center">
        <svg viewBox="0 0 400 560" aria-hidden="true" className="absolute left-1/2 top-10 -translate-x-1/2 h-[120%] w-auto text-gold-400/6">
          <path fill="currentColor" fillRule="evenodd" d={ARCH_FRAME} />
        </svg>
        <div className="reveal relative max-w-3xl mx-auto">
          <h2 className="font-display font-medium text-5xl md:text-7xl leading-[1.05] pb-1 text-ivory-50 mb-6">
            Your signature scent, <em className="text-gold-300">for less.</em>
          </h2>
          <p className="text-ivory-400 text-lg mb-10">
            Search {fallbackPerfumes.length} fragrances and {fallbackDupeRelations.length} matched pairs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse" className="magnetic btn-primary justify-center">
              Explore the collection
              <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
            </Link>
            <Link to="/dupe-finder" className="magnetic btn-primary-outline justify-center">
              Find a dupe
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
