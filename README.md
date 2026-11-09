# Casa Fresca — concept website

A pitch-quality redesign for **Casa Fresca**, chef Sergio Landaverde's weekly meal-prep and catering business in Crawfordsville, IN · (317) 294-2433.
Their current site is a Shopify store at https://casafrescameals.com (working checkout; ordering stays there).

Live: https://justuseflint.github.io/casa-fresca/

## Pages
- `/` Home: hero with live order cut-off countdown (Thu 6 PM → Tue), this week's six meals with protein/calories, how a week works (sticky chapters), chef story, Google review quotes, pickup + catering
- `/menu/` This week's menu with prices, bases and nutrition labels; **Build your week** (quantities, bases, subtotal, protein) that hands off to their real Shopify checkout via cart permalinks; filterable archive of the full rotation
- `/how-it-works/` Week timeline that highlights where we are today (horizontal scroll on desktop), pickup at Ironsmith's Gym vs Tuesday delivery, macro matcher (Mifflin–St Jeor) against this week's labelled meals, FAQ
- `/catering/` Recent real events (from their Facebook posts), what they offer, and an event planner that writes an email or text to Casa Fresca
- `/about/` Sergio's story (from their own About page), mission, community sponsorship

## Sources
See `research/notes.md`. This week's menu, prices and the 89-item rotation come from their Shopify store's public product data, fetched Nov 9, 2026; nutrition figures were read from the label images on each product. Ordering cut-off, Tuesday delivery, the Ironsmith's Gym cooler and catering events come from their Facebook posts (Jun–Oct 2026, read via a public mirror). Review quotes are from their Google reviews (shown on their own site).

The menu on this concept is a **snapshot**; the real menu changes weekly. A production version should pull the "Weekly Meals" collection live (Shopify Storefront API) so it never goes stale.

## Images
Real (the business's own, from casafrescameals.com product photos; need the owner's OK):
- `wk-*.webp` (this week's six meals), `real-shrimp-plate`, `real-parm-plate`, `real-buffalo-tray`, `real-beef-broccoli`, `real-breakfast`
- `assets/img/m/*.webp`: rotation thumbnails (first product photo of each past meal; items that only had a "photo coming soon" placeholder are left out)
- `logo.svg`, `mark.png`, `mark-sm.png`, `favicon.png`, `apple-touch-icon.png`: their logo files

AI-generated atmosphere (not photos of Casa Fresca; replace with real photos):
- `gen-portioning.webp` (gloved hands portioning meals), `gen-cooler.webp` (stocked cooler)

`og.jpg` is a share card built from their photo and logo.

## Needs from the owner
Permission for the photos; which email is current (casafrescameals@ vs casafrescamealprep@gmail.com); delivery area, fee and minimum; the other cooler locations "around town"; whether to show a founding year (sources conflict); nutrition labels for the shrimp and soup; a photo of Sergio and the kitchen; catering menu or starting prices.

## Stack
Plain HTML, CSS and JavaScript; no build step needed to serve. Pages are generated with `node _build/build.mjs` from `_build/data.mjs` and `_build/pages.mjs`.
Motion: GSAP + ScrollTrigger + Lenis (vendored in `assets/vendor/`). Respects `prefers-reduced-motion`. Fonts: Bricolage Grotesque, Instrument Serif, DM Mono (Google Fonts).

    python3 -m http.server 8765   # from the parent folder, then open /casa-fresca/
