# SouqIntel design system: Oud Noir

A dark, luxe look: near-black oud tones, brushed gold, ivory serif type. Tokens live in `client/src/index.css` (`@theme`).

## Colour

| Token | Hex | Use |
|---|---|---|
| `noir-950` | `#0B0907` | Page background |
| `noir-900` | `#0E0B09` | Alternate section background |
| `noir-800` | `#1A1512` | Cards and surfaces |
| `noir-700` | `#251E19` | Raised surfaces |
| `noir-600` | `#3A2F27` | Hairlines and borders |
| `ivory-50` / `ivory-100` | `#FBF6EE` / `#F3EADB` | Headings / body text |
| `ivory-300` / `ivory-400` / `ivory-500` | `#CDBFAA` / `#A89B8A` / `#7D7062` | Secondary / muted / faint text |
| `gold-300` to `gold-600` | `#E3C893` to `#A9844E` | Accents, CTAs, italic emphasis |
| `accent-500` | `#E86835` | Ember: savings badges only, always with noir text |

- Muted text (`ivory-400`) on `noir-950` is about 7:1. Gold-500 on noir is about 8:1.
- Product images sit on an ivory radial "plinth" with `mix-blend-multiply`, so white product shots melt into it.

## Type

- **Display:** Cormorant Garamond (variable, self-hosted via `@fontsource-variable/cormorant-garamond`). Italic in `gold-300` for the one emphasised phrase per heading, always in the same family.
- **UI and body:** Jost (variable, `@fontsource-variable/jost`). There are no Google Fonts requests.
- **No eyebrows:** no kicker labels above section headings; the heading carries the section. Small uppercase labels are only used for footer column titles and note-pyramid tiers.

## Brand mark

- **The mark:** a souq arch holding a single drop. Sources: `client/src/components/brand/Logo.jsx` (navbar and footer) and `client/public/favicon.svg`.
- **The hero frame:** the same arch, as a frame only. `client/public/brand/arch.svg` is the frame and `arch-window.svg` masks the lit window inside it.
- **Shape system:** product images sit in arch-topped plinths (`rounded-t-full`), buttons are pills, and cards use a 16px radius.

## Liquid glass (`.glass`)

- **The look:** fill `rgb(243 234 219 / .06)`, `backdrop-filter: blur(16px) saturate(1.4)`, a 1px ivory/14% border, and an inset top highlight.
- **Fallback:** it turns into solid `noir-800` under `prefers-reduced-transparency: reduce` or `prefers-contrast: more`.
- **Text over glass:** if glass sits over bright content (the navbar over product images), add a tint under the text with `bg-noir-950/80`.

## Motion (GSAP 3.15.0, `client/src/lib/motion.js`)

| Token | Value |
|---|---|
| Entrance | 0.8–1.1s, `power3.out` |
| Stagger | 0.08s |
| Micro-interactions | 0.2–0.3s (CSS transitions) |
| Ambient float | 3.2s `sine.inOut` yoyo |

- **Scroll reveals:** `useReveal(scopeRef, deps)` fades every `.reveal` in on scroll with `ScrollTrigger.batch`.
- **Reduced motion:** everything runs inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`. With reduced motion on, content is static and fully visible, the marquee stops, and there is no SplitText and no shader.
- **Home hero:** the H1 reveals line by line with a SplitText mask, and the bottle showcase crossfades on a loop.
- **Detail page:** the longevity and sillage meters fill from `scaleX: 0`.

## Hero: the lit arch (Home only)

The focal moment is the brand arch, lit as a window and framed in liquid gold, showing a designer original next to its Middle Eastern dupe.

- **Intro:** the window lights from the bottom up (clip-path), then the original appears, then the dupe, then the caption with match % and saving.
- **Cycle:** pairs rotate every ~5s with a blur cross-fade. Hovering or focusing the arch holds the current pair.
- **Data-driven:** the pairs are every catalog relation where both sides are `trending` entries, best match first. New trending pairs appear automatically.
- **Caption:** links to the dupe's detail page.
- **Liquid gold frame:** `client/src/components/effects/LiquidArch.jsx`, using `@paper-design/shaders-react` 0.0.81 `LiquidMetal` (Apache-2.0). Settings: tint `#C99A52`, repetition 2.4, softness 0.25, no chromatic shift, speed 0.55. Its speed drops to 0 when the hero leaves the viewport.
- **Pointer:** with a fine pointer, the arch tilts toward the cursor and its glow drifts the other way. The CTAs are magnetic.
- **Fallback:** the static gold-gradient SVG arch on phones, with reduced motion, or while the shader loads.
- **WebGL budget:** two contexts on desktop (smoke and liquid gold). This deliberately exceeds the effects toolkit's one-canvas guideline, at the user's request. Both are desktop-only, and both idle or unmount off screen.

## Scent smoke (behind the hero)

**Component:** `client/src/components/effects/HeroSmoke.jsx`, using `@shadergradient/react` 2.4.20 on `@react-three/fiber` 9.8.1 and `three` 0.186.1.

**Props:**
```
type: plane, animate: on, uSpeed 0.15, uStrength 4, uDensity 1.3, uFrequency 5.5, uAmplitude 1
position (-1.4, 0, 0), rotation (0, 10, 50)
color1 #1A0D06, color2 #8E5B2C, color3 #5A1F1A
reflection 0.1, lightType 3d, brightness 0.8, grain off (the page has its own grain)
camera: azimuth 180, polar 90, distance 2.9, zoom 1, fov 45, pixelDensity 1
gold dust: 220 additive points in the same R3F canvas, drifting up and leaning toward the cursor
```

**When it loads:**
- It is lazy-loaded (~288 KB gzipped), and only when motion is allowed **and** the viewport is at least 768px.
- `lazyLoad` unmounts the canvas whenever the hero is off screen.

**Fallback:** a CSS gradient in the same colours always sits underneath. A noir scrim (88% → 15%, left → right) keeps hero text at AA contrast over the brightest frame.

## Icons

- **Library:** Phosphor (`@phosphor-icons/react` 2.1.10). Use the `*Icon` export names.
- **Weights:** regular for UI, bold for small arrows, fill for active and hover states, duotone for feature and family cards.
- **Accessibility:** every icon is `aria-hidden`. Icon-only buttons carry an `aria-label`.

## Licences

| Library | Licence |
|---|---|
| GSAP 3.15.0 (incl. ScrollTrigger, SplitText) | Webflow "Standard No Charge". Keep its licence notices in shipped files. |
| @gsap/react | MIT |
| @phosphor-icons/react | MIT |
| three, @react-three/fiber | MIT |
| @shadergradient/react | MIT |
| @paper-design/shaders-react | Apache-2.0 (keep the NOTICE if vendored) |
| Cormorant Garamond, Jost (fontsource) | SIL Open Font License 1.1 |

## Catalog: trending 2026

- **Where entries live:** trending entries in `client/src/data/expandedDupeCatalog.js` use `trend()`. It adds real note pyramids, copy and `trending: true`, and points the image at `/images/perfumes/expanded/<id>.jpg`.
- **Image source:** images come from Fragrantica (fimgs.net) and are stored locally.
- **Dupe pairs:** only added when at least two independent sources agree.
- **Check after any catalog edit:** `node scripts/check-catalog.mjs`.
