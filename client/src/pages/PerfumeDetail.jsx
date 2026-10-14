import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowRightIcon,
  CaretRightIcon,
  DropIcon,
  SmileySadIcon,
  StarIcon,
  RedditLogoIcon,
  YoutubeLogoIcon,
  CheckCircleIcon,
  UsersIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react'
import PerfumeCard from '../components/perfume/PerfumeCard'
import NotesPyramid from '../components/perfume/NotesPyramid'
import api from '../services/api'
import { gsap, useGSAP, useReveal, MOTION_OK, EASE } from '../lib/motion'

const middleEasternTypes = ['arabian', 'clone']
const getId = (item) => String(item?._id || item?.id || '')
// Review URLs can come from the API; only link out to http(s), never javascript: or data:.
const isWebUrl = (url) => typeof url === 'string' && /^https?:\/\//i.test(url)

const sourceIcons = {
  fragrantica: StarIcon,
  reddit: RedditLogoIcon,
  youtube: YoutubeLogoIcon,
  basenotes: CheckCircleIcon,
  community: UsersIcon,
}

function Meter({ label, value }) {
  return (
    <div className="rounded-2xl border border-noir-600/70 p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-ivory-400">{label}</p>
        <span className="text-sm text-ivory-50 tabular-nums">{value}/10</span>
      </div>
      <div className="bg-noir-600 rounded-full h-1.5 overflow-hidden">
        <div
          className="meter h-full rounded-full bg-linear-to-r from-gold-600 to-gold-300 origin-left"
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
    </div>
  )
}

function PerfumeDetail() {
  const rootRef = useRef(null)
  const { id } = useParams()
  const [perfume, setPerfume] = useState(null)
  const [dupes, setDupes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPerfumeDetails()
  }, [id])

  useReveal(rootRef, [perfume, dupes])

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.from('.meter', { scaleX: 0, duration: 1.2, ease: EASE, stagger: 0.15, delay: 0.3 })
      gsap.from('.detail-bottle', { y: 30, opacity: 0, scale: 0.96, duration: 1.1, ease: EASE })
    })
  }, { scope: rootRef, dependencies: [perfume], revertOnUpdate: true })

  const fetchPerfumeDetails = async () => {
    setLoading(true)
    try {
      const [perfumeRes, dupesRes] = await Promise.all([
        api.getPerfume(id),
        api.getDupes(id)
      ])
      setPerfume(perfumeRes.data)
      setDupes(dupesRes.data)
    } catch (error) {
      console.error('Error fetching perfume:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-10 h-10 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!perfume) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-20 px-6 text-center">
        <SmileySadIcon size={64} weight="duotone" className="mb-6 text-gold-400" aria-hidden="true" />
        <h2 className="text-3xl font-display text-ivory-50 mb-2">Perfume not found</h2>
        <p className="text-ivory-400 mb-8">The perfume you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/browse" className="btn-primary">
          Browse collection
          <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
        </Link>
      </div>
    )
  }

  const isMiddleEastern = middleEasternTypes.includes(perfume.type)
  const relatedPerfumes = dupes
    .map((relation) => {
      const original = relation.original
      const alternative = relation.dupe || relation.perfume
      const currentId = getId(perfume)
      const originalId = getId(original)
      const alternativeId = getId(alternative)
      const relatedPerfume = originalId === currentId
        ? alternative
        : alternativeId === currentId
          ? original
          : isMiddleEastern
            ? original
            : alternative

      if (!relatedPerfume || getId(relatedPerfume) === currentId) return null

      return {
        ...relation,
        relatedPerfume,
        relationshipLabel: isMiddleEastern ? 'Original fragrance' : 'Middle Eastern Alternative',
        relationshipTone: isMiddleEastern ? 'original' : 'alternative'
      }
    })
    .filter(Boolean)

  const primaryRelatedPerfume = relatedPerfumes[0]?.relatedPerfume

  return (
    <div ref={rootRef} className="min-h-screen pt-24 page-transition">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <nav aria-label="Breadcrumb" className="text-sm text-ivory-500 flex items-center gap-2">
          <Link to="/" className="hover:text-gold-300 transition-colors">Home</Link>
          <CaretRightIcon size={14} aria-hidden="true" />
          <Link to="/browse" className="hover:text-gold-300 transition-colors">Collection</Link>
          <CaretRightIcon size={14} aria-hidden="true" />
          <span className="text-ivory-100 truncate" aria-current="page">{perfume.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="card-flat">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-square lg:aspect-auto isolate flex items-center justify-center p-10 lg:p-16 bg-[radial-gradient(circle_at_50%_40%,var(--color-ivory-50),var(--color-ivory-300))]">
              {perfume.imageUrl ? (
                <img src={perfume.imageUrl} alt={perfume.name} className="detail-bottle max-h-full max-w-full object-contain mix-blend-multiply" />
              ) : (
                <DropIcon size={160} weight="duotone" className="text-gold-600" aria-hidden="true" />
              )}
              {perfume.trending && (
                <span className="absolute top-5 left-5 badge bg-noir-950 text-gold-300 tracking-widest">Trending 2026</span>
              )}
            </div>

            <div className="p-8 lg:p-12 space-y-7">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gold-400 mb-3">{perfume.brand?.name}</p>
                <h1 className="text-4xl lg:text-5xl font-display text-ivory-50 leading-tight">{perfume.name}</h1>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="badge badge-accent capitalize">{perfume.type}</span>
                <span className="badge badge-light capitalize">{perfume.category}</span>
                <span className="badge badge-light capitalize">{perfume.gender}</span>
                <span className="badge badge-light">{perfume.concentration}</span>
              </div>

              {perfume.description && (
                <p className="text-ivory-300 text-lg leading-relaxed">{perfume.description}</p>
              )}

              {primaryRelatedPerfume && (
                <Link
                  to={`/perfume/${primaryRelatedPerfume._id}`}
                  className="group block rounded-2xl border border-gold-500/30 bg-gold-500/6 p-5 hover:border-gold-400 transition-colors"
                >
                  <p className="text-[11px] uppercase tracking-[0.25em] text-gold-300 mb-3">
                    {isMiddleEastern ? 'This is the Middle Eastern dupe of' : 'Middle Eastern alternative available'}
                  </p>
                  <div className="flex items-center gap-4">
                    {primaryRelatedPerfume.imageUrl && (
                      <span className="w-16 h-16 rounded-xl overflow-hidden bg-ivory-100 isolate shrink-0">
                        <img src={primaryRelatedPerfume.imageUrl} alt="" className="w-full h-full object-cover mix-blend-multiply" />
                      </span>
                    )}
                    <div className="grow min-w-0">
                      <p className="font-display text-2xl text-ivory-50 truncate group-hover:text-gold-300 transition-colors">
                        {primaryRelatedPerfume.name}
                      </p>
                      <p className="text-sm text-ivory-400">{primaryRelatedPerfume.brand?.name}</p>
                    </div>
                    <ArrowRightIcon size={20} className="text-gold-300 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </div>
                </Link>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-noir-600/70 p-5">
                  <p className="text-sm text-ivory-400 mb-2">Price</p>
                  <p className="text-xl font-display text-gold-300 capitalize">{perfume.priceRange}</p>
                </div>
                <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                  <Meter label="Longevity" value={perfume.longevity} />
                  <Meter label="Sillage" value={perfume.sillage} />
                </div>
              </div>

              <Link to={`/dupe-finder?q=${encodeURIComponent(perfume.name)}`} className="btn-primary w-full justify-center">
                Find similar
                <MagnifyingGlassIcon size={18} weight="bold" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {perfume.notes && (
            <div className="border-t border-noir-600/70 p-8 lg:p-12">
              <h2 className="reveal text-3xl font-display text-ivory-50 mb-10 text-center">
                Fragrance <em className="text-gold-300">notes</em>
              </h2>
              <NotesPyramid notes={perfume.notes} />
            </div>
          )}

          {perfume.reviews && perfume.reviews.length > 0 && (
            <div className="border-t border-noir-600/70 p-8 lg:p-12">
              <h2 className="reveal text-3xl font-display text-ivory-50 mb-10 text-center">
                Community <em className="text-gold-300">reviews</em>
              </h2>
              <div className="space-y-5 max-w-4xl mx-auto">
                {perfume.reviews.map((review, index) => {
                  const SourceIcon = sourceIcons[review.source] || UsersIcon
                  return (
                    <figure key={index} className="reveal rounded-2xl border border-noir-600/70 bg-noir-900 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-full bg-gold-500/10 text-gold-300 flex items-center justify-center">
                            <SourceIcon size={20} weight="fill" aria-hidden="true" />
                          </span>
                          <figcaption>
                            <p className="text-ivory-50">{review.author}</p>
                            <p className="text-xs text-ivory-500 capitalize">
                              {review.source} {review.date && `• ${review.date}`}
                            </p>
                          </figcaption>
                        </div>
                        {review.rating && (
                          <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5`}>
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} size={16} weight="fill" className={i < review.rating ? 'text-gold-400' : 'text-noir-600'} aria-hidden="true" />
                            ))}
                          </div>
                        )}
                      </div>
                      <blockquote className="text-ivory-300 leading-relaxed">&ldquo;{review.text}&rdquo;</blockquote>
                      {isWebUrl(review.url) && (
                        <a href={review.url} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-gold-400 hover:text-gold-300 mt-3 break-all">
                          View source
                        </a>
                      )}
                    </figure>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {relatedPerfumes.length > 0 && (
          <div className="mt-20">
            <div className="reveal mb-8">
              <h2 className="text-4xl md:text-5xl font-display text-ivory-50">
                {isMiddleEastern ? `${perfume.name} is a dupe of` : `Middle Eastern alternatives to ${perfume.name}`}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPerfumes.map((relation) => (
                <PerfumeCard
                  key={relation._id}
                  perfume={relation.relatedPerfume}
                  similarity={relation.similarityScore}
                  savings={relation.priceComparison?.savings}
                  relationshipLabel={relation.relationshipLabel}
                  relationshipTone={relation.relationshipTone}
                  className="reveal"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PerfumeDetail
