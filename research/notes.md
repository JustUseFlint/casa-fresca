# Casa Fresca — research notes
Compiled Mon Nov 9, 2026 (America/Indianapolis). Raw captures in `research/src/` (git-ignored).

## What the business is
A **weekly meal-prep and catering company** in Crawfordsville, IN (Montgomery County) — not a restaurant. There is no dining room or posted opening hours (Google shows "Open 24 hours", which just reflects no hours set).
- Customers pick from a short **weekly rotating menu** on the Shopify store, order by **Thursday 6 PM**, and get meals on **Tuesday** — delivered to the door ("private clients") or at a pickup point. Meals are also **stocked in coolers around town**, notably **Ironsmith's Gym** (1714 E Main St, Crawfordsville), sold until they run out.
- Meals are single-serve, chef-cooked, "heat 2–3 minutes in the microwave", high-protein. Many have printed FDA-style nutrition labels.
- **Catering**: corporate dinners (160-person chicken & steak fajita dinner, Jul 2026), rehearsal dinners (Westfield, Aug 2026), wedding charcuterie table (Aug 2026), work lunches.

Sources:
- Site: https://casafrescameals.com (Shopify store `c77bdf-94.myshopify.com`; `/meta.json` description: "Delicious, fresh homemade meal prep delivered right to your door. Casa Fresca is Crawfordsville's tastiest meal prep company.")
- How It Works: https://casafrescameals.com/pages/how-it-works
- Facebook page (id 287589844441997) read via mirror https://www.foodbevg.com/US/Crawfordsville/287589844441997/Casa-Fresca (posts Jun 16 – Oct 20, 2026). Direct Facebook needs login.

## Identity / contact
- Name: Casa Fresca ("casa FRESCA" wordmark). Tagline in use: "Meal Prep & Catering".
- Phone: **(317) 294-2433** (site Locations page, policies, Google, Facebook).
- Email: **casafrescameals@gmail.com** (Locations/contact page) vs **casafrescamealprep@gmail.com** (Shopify contact-information + refund policy). CONFLICT — concept site uses casafrescameals@gmail.com; confirm with owner.
- Address: 303 N Grace Ave, Crawfordsville, IN 47933 (Shopify contact-information policy; Google listing via the site's embedded Google-reviews widget and exa.ai place page). Customer-facing pages only say "Crawfordsville, Indiana". Possibly a private address → concept site does NOT publish the street address.
- Google: 5.0 stars, 12 reviews (embedded Appio widget data on the home page, Nov 9, 2026); exa.ai place page shows 5.0 from 13. Category "Delivery Restaurant" / "Restaurant; Caterer".
- Instagram: none found. Facebook: the page above. Posts say "please excuse our lack of social media presence" (Jun 16, 2026).
- Prospect list: `/workspace/prospects-montgomery-in/` — Casa Fresca was **excluded as "good site"** (excluded_tally.json; raw/verif.tsv row: casafrescameals.com, (317) 294-2433, 303 N Grace Ave). So this is a redesign pitch, not a no-website pitch.

## Owner / story (only what sources name)
- **Founder & head chef: Sergio Landaverde** (About Us page, FAQs page body, Google reviews mention "Sergio and his Casa Fresca team").
- From El Salvador; career chef in high-end restaurant kitchens in the US; family man ("his wife and three children"). Grew up around pupusas, tamales, stews (About Us page).
- Founding year: About page text literally says "In [insert founding year if known, or leave vague], he took a leap of faith…". The FAQs page says "In 2025". But products were published from **Sept 2, 2024** and Google reviews date from **Feb 2025**, and the Contact page was created Feb 2024 → year conflicts; **concept site gives no founding year.**
- Facebook voice is a family ("We're really just a normal family with young kids…", vacations to Traverse City and Florida, "God has blessed us with an amazing and supportive community"). Posts are written by a family member ("I"); not named → not named on site.
- Community: Harvest Partner Sponsor of the 2026 Davidson Greenhouse Harvest Festival (Sep 26–27, 2026) — Davidson Greenhouse post shared on their page (Aug 6, 2026).
- New Casa Fresca merch mentioned (Aug 24, 2026).

## Ordering flow (current)
- Shopify store with **working checkout** (Shop Pay, cards). Collection "Weekly Meals" = this week's menu: https://casafrescameals.com/collections/weekly-meals ; "All Meals" = 88-item archive (mostly sold out).
- Ordering window: "open until **Thursday at 6pm**" for **Tuesday** delivery (FB Jun 16, Jul 15, Aug 24, Oct 20, 2026). Menu goes live roughly Sun–Mon before (Oct 15 post: "menu will be up… this coming Monday").
- How It Works page contradicts itself: "We prep and ship meals every Tuesday" vs "every Monday and Tuesday, with an expected delivery date on Tuesday".
- Delivery: "Delivered to a local pickup location or straight to your door" (home). Door delivery for "private clients" (FB Jul 7). Delivery area, fee and minimum: **not published** (Shopify ships_to_countries is empty → local delivery/pickup only, rates set at checkout). Unknown.
- Pickup: Ironsmith's Gym cooler (FB Jul 7, 2026; Google review Feb 2025). "Stocking coolers around town" (FB Jun 16) — other locations not named.
- Weeks off: announced on Facebook (Jul 2026, Oct 2026).
- Concept site: CTAs link to their real Shopify collection; the "build your week" tool hands off via Shopify **cart permalinks** (`/cart/<variantId>:<qty>,…`) which pre-fill their real cart. No fake checkout.

## THIS WEEK'S MENU — primary source
Shopify `/collections/weekly-meals/products.json`, fetched **Nov 9, 2026**. Prices exactly as published (USD, per meal):
| Meal | Options & price | Nutrition label (per container) |
|---|---|---|
| Teriyaki Ground Turkey Bowl | White Rice $10.99 · Brown Rice $11.50 · Quinoa $11.99 | 520 cal · 42 g protein · 51 g carbs · 17 g fat |
| Creamy Garlic Shrimp over Rice w/ Asparagus | White Rice $11.99 · Brown Rice $12.50 · Quinoa $12.99 | no label published |
| Grilled Chicken Parmesan over Penne with Steamed Broccoli | Penne $10.99 · Quinoa $11.99 | 580 cal · 61 g protein · 54 g carbs · 14 g fat |
| Buffalo Chicken Mac n Cheese | $10.99 | 530 cal · 57 g protein · 47 g carbs · 13 g fat |
| Beef Burger Bowl | $12.99 | 680 cal · 38 g protein · 27 g carbs · 46 g fat |
| Chicken Tortilla Soup | $9.99 | no label published |
Nutrition values read from the label images on each product (Shopify product images, e.g. `Teriyaki_Ground_Turkey_Nutrition.jpg`, `ChickenParmesanNutrition.jpg`, `BuffaloChickenNutrition.jpg`, `Burger_Bowl_Nutrition_Label.jpg`). Labels don't say which base option they describe.
Descriptions are quoted/paraphrased from the product body text.

## Full rotation (archive)
`/products.json?limit=250` → 89 products (88 in All Meals), published Sep 2, 2024 → Nov 1, 2026. Price range $6.99 (high-protein overnight oats) to $13.99 (Yum Yum Salmon quinoa $14.99; BIG BOY Burrito $13.99). Base upcharges: brown rice +$0.51, quinoa +$1.00 typical. One item listed at $0.00 (Asian Thai Peanut Chicken Wrap) → shown without price. Most are sold out = not on this week's menu. Raw: `src/home_products.json_limit_250`. Concept site shows these as "From the rotation — past menus, may return", with last-listed prices.
Latest additions (Oct–Nov 2026): Beef Stuffed Peppers with Refried Beans ($12.99, Nov 1), Teriyaki Chicken Thighs ($11.99), Chicken Fajita with Rice and Beans ($12.99), Sausage Gravy and Biscuits ($9.99), Loaded Potato Soup (seasonal soups return in fall, FB Oct 20).

## Reviews (Google, via the Appio widget on their own home page; dates from exa.ai)
- "Ordering is simple and straightforward, and they have both pickup or delivery options. The food is always fresh and as advertised." — Adam Welcher, Google, Mar 2025
- "Each meal is filling with a good serving size and has great flavor." — Tamara Peck, Google, Mar 2025
- "We use Casa Fresca for work lunch events and home personal meals. So good!" — Justin Riggins, Google
- "Casa Fresca has completely simplified mealtime for our family!" — Brittani Cohee, Google
- "It makes meal prep for my diet soooooo much easier." — Adriana Smith, Google, Feb 2025

## Branding (from theme CSS + logo files)
- Logo: illustrated house with roof of brown tiles, tomatoes, leaves, yellow apple; "casa / FRESCA" wordmark in condensed slab (FULL.svg, HOUSE_TEXTURELESS.png).
- Theme colours: cream bg rgb(254,247,234) #FEF7EA, gold buttons rgb(241,180,53) #F1B435, tomato rgb(244,83,65) #F45341, sage rgb(137,158,94) #899E5E, olive rgb(68,78,46) #444E2E, logo ink ~#3D201E.
- Fonts: Fjalla One (headings), Questrial (body).
- Photos: real phone photos of meals on black backgrounds and in black containers (good, consistent). Some product images are `gps_generated_*.png` (likely Shopify AI-generated backgrounds) and ~15 items show a "PHOTO COMING SOON" placeholder.

## What's weak about the current site (pitch)
1. **Template text left live**: About page says "In [insert founding year if known, or leave vague]"; the Locations and Crawfordsville-meal-prep pages have 10 FAQs answered with **Lorem ipsum** ("Is there a free trial available?", "Do I need a referral?", "parking and public transport"); Catering FAQ is "How much is catering services?" + three rows titled "Collapsible row".
2. **The most important facts aren't on the site**: the Thursday 6 PM cut-off, Tuesday delivery, the Ironsmith's Gym cooler, delivery area/fee — all only in Facebook posts.
3. **Contradictions**: Tuesday vs Monday-and-Tuesday prep; two different email addresses; FAQ page and Monthly Meals page both show the About text (wrong pages); "Explored Our Menu" typo.
4. **Catering page** has no menu, no pricing guidance, no enquiry form — just a grid of sold-out meal-prep items.
5. Placeholder "PHOTO COMING SOON" images on ~15 products; nutrition labels exist but are buried as the 2nd–7th product image.
6. Blog posts are generic (all published the same day, Feb 21, 2025).
7. Macro calculator and "nutrition quiz" exist but don't connect to this week's meals.
