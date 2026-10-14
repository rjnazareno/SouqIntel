import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// Everything animated lives inside this query, so reduced motion gets the static page.
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const EASE = 'power3.out'

// Fades every `.reveal` inside `scope` in as it scrolls into view. Pass `deps` to re-run once data loads.
export function useReveal(scope, deps = []) {
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const els = scope.current?.querySelectorAll('.reveal') ?? []
      if (!els.length) return
      gsap.set(els, { y: 24, opacity: 0 })
      ScrollTrigger.batch(els, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, ease: EASE, stagger: 0.08, overwrite: true }),
      })
    })
  }, { scope, dependencies: deps, revertOnUpdate: true })
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
