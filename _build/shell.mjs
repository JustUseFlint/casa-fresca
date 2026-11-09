import { PHONE, TEL, EMAIL, FB, WEEKLY_URL, CHECKED, DIMS, GYM } from './data.mjs';
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const money = n => '$' + n.toFixed(2);
export const img = (root, n, alt = '', cls = '', extra = '') => { const [w, h] = DIMS[n] || [480, 600]; return `<img src="${root}assets/img/${n}.webp" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async"${cls ? ` class="${cls}"` : ''}${extra ? ' ' + extra : ''}>`; };
export const arrow = `<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`;
export const ext = `<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 16L16 8M9 8h7v7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`;
export const phoneIco = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5l2.6.3 1.2 4-2 1.6a12 12 0 006.2 6.2l1.6-2 4 1.2.3 2.6c0 1-.9 2-2 2C10.8 19.4 4.6 13.2 4.6 5.5c0-1.1 1-2 2-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
export const bagIco = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 016 0v2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
export const clockIco = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
export const pinIco = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0113 0c0 4.9-6.5 11-6.5 11z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`;
export const leaf = (cls = '') => `<svg class="leaf ${cls}" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 34C6 18 16 6 34 6c0 18-12 28-28 28z" fill="currentColor"/><path d="M8 32C15 24 21 18 29 11" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="1.6" stroke-linecap="round"/></svg>`;
export const orderBtn = (cls = '', label = 'Order this week') => `<a class="btn btn-tomato ${cls}" href="${WEEKLY_URL}" data-magnetic data-cursor="Order"><span>${bagIco}${label}</span></a>`;
export const cutoff = (cls = '') => `<span class="cut ${cls}" data-cutoff><i></i><span data-cutoff-t>Order by Thursday 6 PM for Tuesday</span></span>`;

const NAV = [['This week', 'menu/'], ['How it works', 'how-it-works/'], ['Catering', 'catering/'], ['About', 'about/']];
const FONTS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,300..800&family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&display=swap';

export function head({ root, title, desc, path = '' }) {
  const url = 'https://justuseflint.github.io/casa-fresca/' + path;
  return `<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#FBF4E6">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:type" content="website"><meta property="og:url" content="${url}">
<meta property="og:image" content="https://justuseflint.github.io/casa-fresca/assets/img/og.jpg">
<meta name="format-detection" content="telephone=no">
<link rel="canonical" href="${url}">
<link rel="icon" href="${root}assets/img/favicon.png" type="image/png"><link rel="apple-touch-icon" href="${root}assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="${root}assets/css/site.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FoodEstablishment","name":"Casa Fresca","description":"Weekly chef-made meal prep and catering in Crawfordsville, Indiana.","founder":{"@type":"Person","name":"Sergio Landaverde"},"telephone":"+1-317-294-2433","email":"${EMAIL}","areaServed":"Crawfordsville and Montgomery County, Indiana","address":{"@type":"PostalAddress","addressLocality":"Crawfordsville","addressRegion":"IN","addressCountry":"US"},"url":"https://casafrescameals.com","hasMenu":"${WEEKLY_URL}"}</script>
<script>(function(d,w){var h=d.documentElement;h.className=h.className.replace('no-js','js');var rm=w.matchMedia&&w.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm){h.classList.add('motion');try{if(sessionStorage.getItem('cf-pt')==='1')h.classList.add('pt-in')}catch(e){}}else{h.classList.add('no-motion')}setTimeout(function(){if(!w.__cfReady){h.classList.remove('motion','pt-in');h.classList.add('no-motion')}},4000)})(document,window)</script>
</head>`;
}

export const wordmark = (root, cls = '') => `<span class="wm ${cls}"><img src="${root}assets/img/mark-sm.png" alt="" width="240" height="219"><span class="wm-t"><i>casa</i><b>FRESCA</b></span></span>`;

export function header(root, path) {
  const cur = p => path.startsWith(p) ? ' aria-current="page"' : '';
  return `<div class="pt" aria-hidden="true"><div class="pt-panel"></div><div class="pt-mark"><img src="${root}assets/img/mark-sm.png" alt="" width="240" height="219"></div></div>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr" data-hdr>
  <div class="hdr-in">
    <a class="hdr-logo" href="${root}" aria-label="Casa Fresca, home">${wordmark(root)}</a>
    <nav class="hdr-nav" aria-label="Primary">${NAV.map(([t, h]) => `<a href="${root}${h}"${cur(h)} class="ul">${t}</a>`).join('')}</nav>
    <div class="hdr-r">
      ${cutoff('hdr-cut')}
      <a class="btn btn-tomato btn-sm hdr-cta" href="${WEEKLY_URL}" data-magnetic><span>${bagIco}Order</span></a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-menu-btn><span class="mb-t"><span>Menu</span><span>Close</span></span><span class="mb-i"><i></i><i></i></span></button>
    </div>
  </div>
</header>
<div class="menu" id="menu" data-menu aria-hidden="true">
  <nav class="menu-nav" aria-label="Mobile">${[['Home', ''], ...NAV].map(([t, h], i) => `<a href="${root}${h}"><span class="mono">0${i + 1}</span><span class="mn-t">${t}</span></a>`).join('')}</nav>
  <div class="menu-foot">
    ${cutoff()}
    <a class="btn btn-tomato" href="${WEEKLY_URL}"><span>${bagIco}Order on casafrescameals.com</span></a>
    <a class="menu-call" href="${TEL}">${phoneIco}<span><span class="eyebrow">Questions? Call or text</span>${PHONE}</span></a>
  </div>
</div>`;
}

export function footer(root, { cta = true } = {}) {
  return `${cta ? `<section class="cta-band" aria-labelledby="cta-h">
  <div class="wrap cta-in">
    ${cutoff('cut-inv')}
    <h2 id="cta-h" class="h-xl cta-h" data-split>Dinner&rsquo;s handled<br><em>by Tuesday.</em></h2>
    <div class="cta-row">
      <p class="cta-p">Pick your meals by Thursday at 6&nbsp;PM. Sergio and the team cook on Monday and Tuesday, then it&rsquo;s at your door or in the cooler at ${GYM.name}.</p>
      <div class="cta-btns">${orderBtn('btn-lg', 'Order this week')}<a class="btn btn-ghost-inv" href="${root}menu/"><span>See what&rsquo;s cooking ${arrow}</span></a></div>
    </div>
  </div>
</section>` : ''}
<footer class="ftr">
  <div class="wrap">
    <div class="ftr-grid">
      <div class="ftr-col ftr-brand">
        <img src="${root}assets/img/logo.svg" alt="Casa Fresca logo: a house roof framed by tomatoes, greens and an apple" width="200" height="200" loading="lazy" class="ftr-logo">
        <p class="ftr-copy">Chef-made meal prep and catering from Sergio Landaverde and family, in Crawfordsville, Indiana.</p>
      </div>
      <div class="ftr-col">
        <p class="eyebrow">Eat</p>
        <ul class="ftr-links"><li><a class="ul" href="${root}menu/">This week&rsquo;s menu</a></li><li><a class="ul" href="${root}menu/#build">Build your week</a></li><li><a class="ul" href="${root}menu/#rotation">The rotation</a></li><li><a class="ul" href="${root}catering/">Catering</a></li></ul>
      </div>
      <div class="ftr-col">
        <p class="eyebrow">Casa Fresca</p>
        <ul class="ftr-links"><li><a class="ul" href="${root}how-it-works/">How it works</a></li><li><a class="ul" href="${root}how-it-works/#pickup">Pickup &amp; delivery</a></li><li><a class="ul" href="${root}how-it-works/#faq">FAQ</a></li><li><a class="ul" href="${root}about/">About Sergio</a></li></ul>
      </div>
      <div class="ftr-col">
        <p class="eyebrow">Reach us</p>
        <ul class="ftr-links"><li><a class="ul" href="${TEL}">${PHONE}</a></li><li><a class="ul" href="mailto:${EMAIL}">${EMAIL}</a></li><li><a class="ul" href="${FB}" target="_blank" rel="noopener">Facebook ↗</a></li><li><span class="muted">Crawfordsville, Indiana</span></li></ul>
      </div>
    </div>
  </div>
  <div class="ftr-wm" data-wm aria-hidden="true">${'eat fresh, together'.split('').map(c => c === ' ' ? '<span class="sp"> </span>' : `<span>${c}</span>`).join('')}</div>
  <div class="wrap ftr-base mono"><span>© 2026 Casa Fresca</span><span>Concept site · details checked ${CHECKED}</span></div>
</footer>
<div class="cursor" aria-hidden="true"><span class="cursor-t"></span></div>
<script src="${root}assets/vendor/gsap.min.js" defer></script>
<script src="${root}assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="${root}assets/vendor/lenis.min.js" defer></script>
<script src="${root}assets/js/site.js" defer></script>`;
}

export const page = ({ root, title, desc, path, body, cta = true, cls = '' }) => `${head({ root, title, desc, path })}
<body class="${cls}">
${header(root, path)}
<main id="main">
${body}
</main>
${footer(root, { cta })}
</body>
</html>`;
