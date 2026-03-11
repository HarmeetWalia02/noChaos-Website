# Aura — Luxury Social & Dating App Landing Page

## Project Overview
A premium, minimalistic luxury landing website for "Aura" — a social media and dating app. Built with a world-class design agency aesthetic.

## Design Aesthetic
- **Color Palette**: Deep near-black (#07080f) with electric blue (#1a6cff) accents
- **Typography**: Playfair Display (serif, headings) + Plus Jakarta Sans (body)
- **Style**: Dark luxury, glass morphism, subtle glows, editorial photography

## Architecture
- **Frontend only** — single-page landing site, no backend/database needed
- Framer Motion for all animations and smooth transitions
- Scroll spy navigation with animated active pill indicator
- All images AI-generated and saved to `client/public/images/`

## Sections
1. **Home / Hero** — Massive headline, iPhone mockup with floating notification cards, stats
2. **Features** — 6 feature cards with icons and hover effects
3. **App Showcase** — Photo grid with stats, diversity-focused narrative
4. **About Us** — Mission/philosophy/impact cards + editorial full-width photo quote
5. **Feedback / Testimonials** — 6 testimonial cards + contact form with success animation
6. **CTA** — Download buttons (App Store + Google Play)
7. **Footer** — Links, branding

## Generated Images
- `client/public/images/hero-person.png` — Hero lifestyle portrait (9:16)
- `client/public/images/couple-app.png` — Couple using app (4:3)
- `client/public/images/diverse-people.png` — Diverse group (16:9)
- `client/public/images/iphone-mockup-1.png` — iPhone app mockup (9:16)
- `client/public/images/hero-bg.png` — Abstract blue/black background (16:9)

## Key Files
- `client/src/pages/Home.tsx` — Full landing page (all sections)
- `client/src/App.tsx` — Router with Home route
- `client/src/index.css` — CSS variables (dark luxury black/blue theme)
- `tailwind.config.ts` — Extended with electric blue colors, luxury animations

## Running
Workflow `Start application` runs `npm run dev` on port 5000.
