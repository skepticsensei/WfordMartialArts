# WMAC Website - Prompt Tree

## Phase: v1 Build Complete & Verified
## Selected Design: Dojo Ledger
## Tech Stack: Next.js 16.2.3 + Tailwind CSS + TypeScript

## Project: Weatherford Martial Arts Center
- **URL:** skill-blend.com/wfordmartialarts
- **Location:** Weatherford, Texas
- **Core Arts:** Aikido, Judo, Daito Ryu Aikijujutsu
- **Hosted Groups:** The Karate University, Just Move Health (Autumn Nelson)

## Design: Dojo Ledger
- **BG:** Rice Paper #F7F3EB | **Text:** Ink #171717 | **Accent:** Hanko Red #B21E2B
- **Secondary:** Teal #00C2CB | **Muted:** Warm Gray #CFC8BC
- **Fonts:** Noto Serif JP (headings) + Inter (body)
- **Style:** Calm editorial, Japanese-inspired minimalism

## Decisions Made
1. Selected "Dojo Ledger" design template (from 5 options presented)
2. Next.js App Router with /wfordmartialarts route
3. All 3 logos in public/logos/
4. CSS custom properties for color tokens via @theme inline
5. Placeholder schedule data (sample times)
6. Placeholder instructor data (generic titles)
7. Root page (/) redirects to /wfordmartialarts
8. Build verified clean — all 12 routes generate as static pages

## Build Status
- **Last build:** SUCCESS (all 12 routes, 0 errors)
- **Dev server:** http://localhost:3001 (port 3000 was in use)
- **Type fix applied:** HOSTED_GROUPS array typed explicitly for accent: "red" | "teal"

## Files Created
### Config
- `package.json`, `next.config.ts`, `tsconfig.json` (scaffolded via create-next-app)
- `src/app/globals.css` — Design tokens + theme
- `src/app/layout.tsx` — Root layout with Noto Serif JP + Inter fonts
- `src/app/page.tsx` — Root redirect to /wfordmartialarts

### Components (src/components/wmac/)
- `Header.tsx` — Utility strip (phone/location/Book CTA) + sticky nav + mobile hamburger menu
- `Footer.tsx` — 4-column footer (brand, disciplines, programs, contact)
- `Hero.tsx` — Dark bg hero with seal logo, tagline, dual CTAs
- `DisciplineCard.tsx` — Card with kanji, name, subtitle, description, hover effects
- `ProgramCard.tsx` — Hosted group card with logo, accent color, "Hosted at WMAC" tag
- `ScheduleTable.tsx` — Weekly schedule table with color-coded class tags, compact mode
- `ContactForm.tsx` — Client-side form with name/email/phone/program/message fields

### Pages (src/app/wfordmartialarts/)
- `layout.tsx` — WMAC layout wrapper (Header + main + Footer)
- `page.tsx` — Home (hero, disciplines, programs, schedule preview, beginner CTA, FAQ accordion)
- `aikido/page.tsx` — Aikido detail (description, who it's for, outcomes)
- `judo/page.tsx` — Judo detail
- `daito-ryu/page.tsx` — Daito Ryu Aikijujutsu detail
- `karate-university/page.tsx` — Karate University (hosted, red accent)
- `just-move/page.tsx` — Just Move Health (hosted, teal accent, lists class types)
- `schedule/page.tsx` — Full schedule with color legend
- `start-here/page.tsx` — 3-step onboarding + first class checklist (7 items)
- `instructors/page.tsx` — Instructor cards with arts tags
- `about/page.tsx` — Mission + dojo etiquette cards
- `contact/page.tsx` — 2-column: contact info left, form right

### Data
- `src/lib/wmac-constants.ts` — SITE config, NAV_LINKS, DISCIPLINES (3), HOSTED_GROUPS (2), SCHEDULE (6 days), INSTRUCTORS (2), FAQS (6)

### Assets
- `public/logos/Weatherford_Martial_Arts.png` (1800x1800)
- `public/logos/The_Karate_University.png` (1188x545)
- `public/logos/Just_Move_Fitness.svg` (500x500, teal #00c2cb)

## Current Task: Awaiting user review & feedback
## Next Steps
- User reviews site in browser at localhost:3001
- Design polish based on feedback
- Replace placeholder content with real data:
  - Real phone number, email, physical address
  - Real instructor names and bios
  - Actual class schedule/times
  - Dojo photos if available
- Add contact form API route (currently client-side only)
- SEO meta tags + Open Graph images
- Mobile responsive polish
- Deploy configuration

## Key Context for Resume
- All editable content centralized in `src/lib/wmac-constants.ts`
- Color tokens in `src/app/globals.css` as CSS custom properties
- Contact form submits client-side only (shows thank you, no backend)
- Each discipline page follows same template: dark banner → description → who/outcomes → CTAs
- Hosted group pages have accent-colored variants (red for Karate U, teal for Just Move)
- FAQ uses native `<details>` elements with + icon rotation
- Schedule table has `compact` prop for home page preview (shows 3 days)
