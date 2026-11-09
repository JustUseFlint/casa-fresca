import { readFileSync } from 'node:fs';
const J = f => JSON.parse(readFileSync(new URL(f, import.meta.url)));
export const SHOP = 'https://casafrescameals.com';
export const WEEKLY_URL = SHOP + '/collections/weekly-meals';
export const ALL_URL = SHOP + '/collections/all-meals';
export const PHONE = '(317) 294-2433';
export const TEL = 'tel:+13172942433';
export const SMS = 'sms:+13172942433';
export const EMAIL = 'casafrescameals@gmail.com';
export const FB = 'https://www.facebook.com/287589844441997';
export const GYM = { name: "Ironsmith's Gym", addr: '1714 E Main St, Crawfordsville', maps: 'https://www.google.com/maps/search/?api=1&query=Ironsmith%27s+Gym+1714+E+Main+St+Crawfordsville+IN' };
export const CHECKED = 'Nov 9, 2026';
export const DIMS = J('./dims.json');

// Nutrition read from the label images on each product page (Nov 9, 2026)
const NUT = {
  'teriyaki-ground-turkey-bowl': { cal: 520, p: 42, c: 51, f: 17 },
  'grilled-chicken-parmesan-over-whole-wheat-penne-w-broccoli': { cal: 580, p: 61, c: 54, f: 14 },
  'buffalo-chicken-mac-n-cheese': { cal: 530, p: 57, c: 47, f: 13 },
  'beef-burger-bowl': { cal: 680, p: 38, c: 27, f: 46 },
};
const META = {
  'teriyaki-ground-turkey-bowl': { img: 'wk-teriyaki-turkey', short: 'Teriyaki Ground Turkey Bowl', tag: 'Bowl', blurb: 'Ground turkey in a tangy teriyaki sauce with carrots and broccoli, finished with green onion.' },
  'creamy-garlic-shrimp-over-rice-w-asparagus': { img: 'wk-garlic-shrimp', short: 'Creamy Garlic Shrimp', tag: 'Seafood', blurb: 'Shrimp in a velvety garlic cream sauce with asparagus spears over rice.' },
  'grilled-chicken-parmesan-over-whole-wheat-penne-w-broccoli': { img: 'wk-chicken-parm', short: 'Grilled Chicken Parmesan', tag: 'Pasta', blurb: 'Grilled chicken breast in zesty marinara with melted parmesan over penne, with steamed broccoli.' },
  'buffalo-chicken-mac-n-cheese': { img: 'wk-buffalo-mac', short: 'Buffalo Chicken Mac n Cheese', tag: 'Comfort', blurb: 'Tender chicken, creamy cheese and a spicy kick of buffalo sauce.' },
  'beef-burger-bowl': { img: 'wk-burger-bowl', short: 'Beef Burger Bowl', tag: 'Bowl', blurb: 'All the flavours of a classic burger, no bun: ground beef, onion, pickle, tomato and spicy mayo.' },
  'chicken-tortilla-soup': { img: 'wk-tortilla-soup', short: 'Chicken Tortilla Soup', tag: 'Soup', blurb: 'A fall favourite. Soups come back to the menu when the weather turns.' },
};
export const WEEK = J('./weekly_raw.json').map(m => ({ ...m, ...META[m.h], nut: NUT[m.h] || null, url: SHOP + '/products/' + m.h, from: Math.min(...m.variants.map(v => v.price)) }));

const CAT = { plates: 'Plates & bowls', pasta: 'Pasta & comfort', seafood: 'Seafood', salads: 'Salads & wraps', soups: 'Soups', breakfast: 'Breakfast & oats' };
export const CATS = CAT;
export const ARCHIVE = J('./archive_raw.json').filter(a => a.img).map(a => ({ ...a, catName: CAT[a.cat] }));
export const ARCHIVE_COUNT = J('./archive_raw.json').length;

export const REVIEWS = [
  { q: 'Ordering is simple and straightforward, and they have both pickup or delivery options. The food is always fresh and as advertised.', a: 'Adam Welcher', d: 'Google review · Mar 2025' },
  { q: 'Each meal is filling with a good serving size and has great flavor. Definitely recommend giving them a try!', a: 'Tamara Peck', d: 'Google review · Mar 2025' },
  { q: 'We use Casa Fresca for work lunch events and home personal meals. So good!', a: 'Justin Riggins', d: 'Google review' },
  { q: 'Casa Fresca has completely simplified mealtime for our family!', a: 'Brittani Cohee', d: 'Google review' },
  { q: 'It makes meal prep for my diet soooooo much easier. Thank you!', a: 'Adriana Smith', d: 'Google review · Feb 2025' },
  { q: 'The meals taste amazing and are healthy. They are great if you are on the go or just don\u2019t want to cook.', a: 'Ethan Chester', d: 'Google review' },
];
