import { WEEK, ARCHIVE, ARCHIVE_COUNT, CATS, REVIEWS, SHOP, WEEKLY_URL, ALL_URL, PHONE, TEL, SMS, EMAIL, FB, GYM, CHECKED } from './data.mjs';
import { esc, money, img, arrow, ext, phoneIco, bagIco, clockIco, pinIco, leaf, orderBtn, cutoff, page } from './shell.mjs';

const labelled = WEEK.filter(m => m.nut);
const nl = (m, cls = '') => m.nut ? `<div class="nl ${cls}" aria-label="Nutrition label for ${esc(m.short)}">
  <p class="nl-h">Nutrition Facts</p><p class="nl-s">1 serving per container · ${esc(m.short)}</p>
  <div class="nl-cal"><span>Calories</span><b>${m.nut.cal}</b></div>
  <div class="nl-r"><span><b>Protein</b> ${m.nut.p}g</span></div>
  <div class="nl-r"><span><b>Total Carbohydrate</b> ${m.nut.c}g</span></div>
  <div class="nl-r"><span><b>Total Fat</b> ${m.nut.f}g</span></div>
</div>` : '';
const macroChips = m => m.nut ? `<ul class="chips" aria-label="Nutrition"><li><b>${m.nut.p}g</b> protein</li><li><b>${m.nut.cal}</b> cal</li><li><b>${m.nut.c}g</b> carbs</li><li><b>${m.nut.f}g</b> fat</li></ul>` : `<p class="chips-none mono">Nutrition label not posted for this one</p>`;
const optsLine = m => m.variants.length > 1 ? m.variants.map(v => `${esc(v.t)} ${money(v.price)}`).join(' · ') : money(m.from);

/* ======================= HOME ======================= */
function home() {
  const root = './';
  const hero = `<section class="hero" aria-labelledby="h1">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow" data-fade>Meal prep &amp; catering · Crawfordsville, Indiana</p>
      <h1 id="h1" class="h-hero" data-split="hero">Chef-made meals, <em>ready</em> by Tuesday.</h1>
      <p class="lede" data-fade>A short menu that changes every week, cooked fresh by chef Sergio Landaverde and sealed in a certified kitchen. Heat for two or three minutes and eat.</p>
      <div class="hero-ctas" data-fade>${orderBtn('btn-lg')}<a class="btn btn-line" href="${root}menu/" data-magnetic><span>See this week&rsquo;s menu ${arrow}</span></a></div>
      <div class="hero-cut" data-fade>${cutoff('cut-lg')}<span class="mono hero-cut-n" data-countdown></span></div>
    </div>
    <div class="hero-art">
      <figure class="hero-photo" data-hero-photo>${img(root, 'real-shrimp-plate', 'Creamy garlic shrimp over rice with asparagus and a lemon slice, plated on a white dish', '', 'loading="eager" fetchpriority="high"')}</figure>
      <figure class="hero-photo2" data-hero-photo2>${img(root, 'wk-chicken-parm', 'Grilled chicken parmesan over penne with broccoli in a black meal-prep container', '', 'loading="eager"')}</figure>
      ${nl(WEEK.find(m => m.h.startsWith('grilled-chicken-parmesan')), 'hero-nl')}
      ${leaf('hero-leaf')}
    </div>
  </div>
</section>`;

  const facts = `<section class="facts" aria-label="Casa Fresca at a glance">
  <div class="wrap facts-row">
    <div class="fact" data-reveal><b><span data-count="${WEEK.length}">${WEEK.length}</span></b><span>meals on this week&rsquo;s menu</span></div>
    <div class="fact" data-reveal><b><span data-count="${ARCHIVE_COUNT}">${ARCHIVE_COUNT}</span></b><span>dishes in the rotation since Sept 2024</span></div>
    <div class="fact" data-reveal><b>5.0<small>★</small></b><span>on Google, from 12 reviews</span></div>
    <div class="fact" data-reveal><b>2–3<small>min</small></b><span>in the microwave, and dinner&rsquo;s on</span></div>
  </div>
</section>`;

  const week = `<section class="sec week-sec dark" aria-labelledby="wk-h">
  <div class="wrap">
    <div class="sec-head">
      <p class="eyebrow">On the menu · checked ${CHECKED}</p>
      <h2 id="wk-h" class="h-xl" data-split>This week from <em>Sergio&rsquo;s kitchen</em></h2>
      <p class="sec-sub" data-fade>Six meals, one order. Pick a base where there&rsquo;s a choice, and every meal is one generous single serving.</p>
    </div>
    <div class="wk-rail" data-rail>
      ${WEEK.map((m, i) => `<article class="wk-card" data-reveal>
        <a href="${root}menu/#m-${m.h}" class="wk-link" data-cursor="View">
          <figure class="wk-img">${img(root, m.img, m.t)}<span class="wk-n mono">0${i + 1}</span></figure>
          <div class="wk-body">
            <p class="mono wk-tag">${m.tag}</p>
            <h3 class="wk-t">${esc(m.short)}</h3>
            <p class="wk-p"><span class="mono">from</span> ${money(m.from)}</p>
            ${m.nut ? `<p class="wk-pro"><b>${m.nut.p}g</b> protein · ${m.nut.cal} cal</p>` : `<p class="wk-pro muted">Label not posted</p>`}
          </div>
        </a>
      </article>`).join('')}
    </div>
    <div class="sec-foot"><a class="btn btn-ghost-inv" href="${root}menu/#build" data-magnetic><span>Build your week ${arrow}</span></a><a class="ul ul-inv mono" href="${WEEKLY_URL}" target="_blank" rel="noopener">Live menu on casafrescameals.com ↗</a></div>
  </div>
</section>`;

  const how = `<section class="sec how-sec" aria-labelledby="how-h" data-chapters>
  <div class="wrap how-grid">
    <div class="how-sticky">
      <p class="eyebrow">How a week works</p>
      <h2 id="how-h" class="h-xl" data-split>Order Thursday. <em>Eat all week.</em></h2>
      <p class="mono how-i" data-cc-i>01 / 04</p>
      <div class="how-plates">
        <figure class="cc-plate on">${img(root, 'wk-teriyaki-turkey', 'Teriyaki ground turkey bowl in a black container')}</figure>
        <figure class="cc-plate">${img(root, 'gen-portioning', 'Gloved hands portioning grilled chicken, rice and broccoli into containers (illustrative image)')}</figure>
        <figure class="cc-plate">${img(root, 'wk-burger-bowl', 'Beef burger bowl in a black container')}</figure>
        <figure class="cc-plate">${img(root, 'wk-buffalo-mac', 'Buffalo chicken mac and cheese in a white bowl')}</figure>
      </div>
    </div>
    <ol class="how-steps">
      <li class="cc-ch on"><span class="mono">01 · Early in the week</span><h3>The new menu goes live</h3><p>New meals every week, posted on the website. Fall brings the soups back.</p></li>
      <li class="cc-ch"><span class="mono">02 · By Thursday, 6 PM</span><h3>Pick your meals</h3><p>Add what you want to your cart and check out online. Ordering closes Thursday at 6 PM for the following Tuesday.</p></li>
      <li class="cc-ch"><span class="mono">03 · Monday &amp; Tuesday</span><h3>We cook and seal</h3><p>Everything is made from fresh ingredients in a certified kitchen and sealed for freshness.</p></li>
      <li class="cc-ch"><span class="mono">04 · Tuesday</span><h3>Your door, or the cooler</h3><p>Delivered to your door, or grab yours from the cooler at ${GYM.name}. Then heat for 2–3 minutes.</p></li>
    </ol>
  </div>
  <div class="wrap"><a class="ul mono" href="${root}how-it-works/">Pickup, delivery &amp; FAQ ${arrow}</a></div>
</section>`;

  const story = `<section class="sec story-sec" aria-labelledby="st-h">
  <div class="wrap story-grid">
    <figure class="story-img" data-img-reveal>${img(root, 'real-beef-broccoli', 'Asian beef and broccoli with green onions on a white plate')}</figure>
    <div class="story-copy">
      <p class="eyebrow">The chef</p>
      <h2 id="st-h" class="h-lg" data-split>From El Salvador, by way of <em>fine-dining kitchens</em>, to Crawfordsville.</h2>
      <p class="focus" data-focus>Sergio Landaverde grew up around the pupusas, tamales and stews of his family&rsquo;s kitchen. He spent years as a career chef in high-end restaurant kitchens before starting Casa Fresca to cook for his own community.</p>
      <a class="btn btn-line" href="${root}about/" data-magnetic><span>Meet Sergio ${arrow}</span></a>
    </div>
  </div>
</section>`;

  const reviews = `<section class="sec rev-sec" aria-labelledby="rv-h">
  <div class="wrap"><div class="sec-head"><p class="eyebrow">5.0 on Google · 12 reviews</p><h2 id="rv-h" class="h-xl" data-split>What the regulars <em>say</em></h2></div></div>
  <div class="mq" data-marquee><div class="mq-track">
    ${REVIEWS.map(r => `<figure class="rv"><blockquote>&ldquo;${esc(r.q)}&rdquo;</blockquote><figcaption><b>${esc(r.a)}</b><span class="mono">${esc(r.d)}</span></figcaption></figure>`).join('')}
  </div></div>
</section>`;

  const split = `<section class="sec duo-sec" aria-label="Pickup and catering">
  <div class="wrap duo">
    <a class="duo-card duo-pick" href="${root}how-it-works/#pickup" data-reveal data-cursor="Pickup">
      <figure>${img(root, 'gen-cooler', 'A glass-door cooler stocked with meal-prep containers (illustrative image)')}</figure>
      <div class="duo-b"><p class="mono">Grab &amp; go</p><h3>Stocked at ${GYM.name}</h3><p>Fresh meals in the cooler at ${GYM.addr}, until they sell out.</p><span class="ul">Pickup &amp; delivery ${arrow}</span></div>
    </a>
    <a class="duo-card duo-cat" href="${root}catering/" data-reveal data-cursor="Catering">
      <figure>${img(root, 'real-parm-plate', 'Chicken parmesan over penne with broccoli on a white plate')}</figure>
      <div class="duo-b"><p class="mono">Catering</p><h3>Rehearsal dinners to 160-person team meals</h3><p>Corporate events, weddings and parties across central Indiana.</p><span class="ul">Plan an event ${arrow}</span></div>
    </a>
  </div>
</section>`;

  return page({ root, path: '', title: 'Casa Fresca · Chef-made meal prep & catering in Crawfordsville, IN', desc: 'A fresh weekly menu from chef Sergio Landaverde. Order by Thursday 6 PM, get your meals Tuesday by delivery or from the cooler at Ironsmith\u2019s Gym. Catering too.', cls: 'pg-home', body: hero + facts + week + how + story + reviews + split });
}

/* ======================= MENU ======================= */
function menu() {
  const root = '../';
  const phero = `<section class="phero" aria-labelledby="h1">
  <div class="wrap">
    <p class="eyebrow" data-fade>This week · menu checked ${CHECKED}</p>
    <h1 id="h1" class="h-hero" data-split="hero">This week&rsquo;s <em>menu</em></h1>
    <div class="phero-row" data-fade><p class="lede">Six meals, cooked Monday and Tuesday and ready Tuesday. Prices are per meal, exactly as listed on casafrescameals.com.</p><div class="phero-cut">${cutoff('cut-lg')}<span class="mono" data-countdown></span></div></div>
  </div>
</section>`;

  const list = `<section class="sec ml-sec" aria-label="This week's meals">
  <div class="wrap ml">
    ${WEEK.map((m, i) => `<article class="ml-item" id="m-${m.h}" data-reveal>
      <figure class="ml-img" data-img-reveal>${img(root, m.img, m.t)}</figure>
      <div class="ml-body">
        <p class="mono ml-k"><span>0${i + 1}</span><span>${m.tag}</span></p>
        <h2 class="ml-t">${esc(m.t)}</h2>
        <p class="ml-d">${esc(m.blurb)}</p>
        ${macroChips(m)}
        <p class="ml-opts mono">${optsLine(m)}</p>
        <a class="ul ml-shop" href="${m.url}" target="_blank" rel="noopener">View on casafrescameals.com ↗</a>
      </div>
      ${m.nut ? nl(m, 'ml-nl') : ''}
    </article>`).join('')}
  </div>
</section>`;

  const build = `<section class="sec build-sec" id="build" aria-labelledby="b-h">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">Build your week</p><h2 id="b-h" class="h-xl" data-split>Plan it here. <em>Check out there.</em></h2>
    <p class="sec-sub" data-fade>Choose meals and bases, see your total and your protein for the week, then send the whole list to Casa Fresca&rsquo;s own checkout in one tap.</p></div>
    <div class="bw" data-build data-shop="${SHOP}">
      <div class="bw-presets" role="group" aria-label="Quick picks"><span class="mono">Quick picks</span><button type="button" class="pill" data-preset="lunch">5 work lunches</button><button type="button" class="pill" data-preset="protein">Highest protein</button><button type="button" class="pill" data-preset="one">One of each</button><button type="button" class="pill pill-ghost" data-preset="clear">Clear</button></div>
      <ul class="bw-list">
        ${WEEK.map(m => `<li class="bw-row" data-meal="${m.h}" data-protein="${m.nut ? m.nut.p : ''}" data-cal="${m.nut ? m.nut.cal : ''}">
          <img src="${root}assets/img/${m.img}.webp" alt="" width="96" height="120" loading="lazy">
          <div class="bw-info"><p class="bw-t">${esc(m.short)}</p>
            ${m.variants.length > 1 ? `<label class="bw-sel"><span class="sr">Base for ${esc(m.short)}</span><select data-var>${m.variants.map(v => `<option value="${v.id}" data-price="${v.price}">${esc(v.t)} · ${money(v.price)}</option>`).join('')}</select></label>` : `<p class="mono bw-one" data-var-one data-id="${m.variants[0].id}" data-price="${m.variants[0].price}">${money(m.variants[0].price)}</p>`}
            <p class="mono bw-mac">${m.nut ? `${m.nut.p}g protein · ${m.nut.cal} cal` : 'No label posted'}</p>
          </div>
          <div class="step" role="group" aria-label="Quantity of ${esc(m.short)}"><button type="button" data-dec aria-label="One fewer">−</button><output data-qty>0</output><button type="button" data-inc aria-label="One more">+</button></div>
        </li>`).join('')}
      </ul>
      <a class="bw-mbar is-off" href="#bw-sum" data-b-mbar><span><b data-b-mn>0</b> meals · <b data-b-mt>$0.00</b></span><span class="mono">Review ↓</span></a>
      <aside class="bw-sum" id="bw-sum" aria-live="polite">
        <p class="eyebrow">Your week</p>
        <div class="bw-big"><b data-b-meals>0</b><span>meals</span></div>
        <dl class="bw-dl">
          <div><dt>Subtotal</dt><dd data-b-total>$0.00</dd></div>
          <div><dt>Protein (labelled meals)</dt><dd data-b-pro>0 g</dd></div>
          <div><dt>Average per labelled meal</dt><dd data-b-avg>—</dd></div>
        </dl>
        <p class="bw-note">Before tax and any delivery charge, which Casa Fresca&rsquo;s checkout works out.</p>
        <a class="btn btn-tomato btn-lg bw-go is-off" href="${WEEKLY_URL}" data-b-go data-cursor="Checkout" aria-disabled="true"><span>${bagIco}Continue to checkout</span></a>
        <p class="mono bw-fine">Opens Casa Fresca&rsquo;s own secure checkout with these meals already added. Order by Thursday 6 PM.</p>
      </aside>
    </div>
  </div>
</section>`;

  const cats = Object.entries(CATS);
  const rot = `<section class="sec rot-sec" id="rotation" aria-labelledby="r-h">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">From the rotation</p><h2 id="r-h" class="h-xl" data-split>${ARCHIVE_COUNT} dishes and <em>counting</em></h2>
    <p class="sec-sub" data-fade>Meals from past menus, newest first. Any of them can come back; prices are what they were last listed at.</p></div>
    <div class="rot-tools" data-rot>
      <div class="rot-chips" role="group" aria-label="Filter by type"><button type="button" class="pill is-on" data-cat="all" aria-pressed="true">All</button>${cats.map(([k, v]) => `<button type="button" class="pill" data-cat="${k}" aria-pressed="false">${v}</button>`).join('')}</div>
      <label class="rot-search"><span class="sr">Search past meals</span><input type="search" placeholder="Search: salmon, oats, burrito…" data-rot-q></label>
    </div>
    <ul class="rot-grid" data-rot-grid>
      ${ARCHIVE.map(a => `<li class="rot-card${a.avail ? ' is-now' : ''}" data-c="${a.cat}" data-s="${esc(a.t.toLowerCase())}">
        <figure><img src="${root}assets/img/${a.img}" alt="${esc(a.t)}" width="480" height="600" loading="lazy" decoding="async">${a.avail ? '<span class="rot-now mono">On this week</span>' : ''}</figure>
        <p class="mono rot-k">${a.catName}</p><h3>${esc(a.t)}</h3>
        <p class="rot-p mono">${a.prices[0] > 0 ? (a.prices.length > 1 ? 'from ' : '') + money(a.prices[0]) : 'Price not listed'} · first listed ${new Date(a.pub + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
      </li>`).join('')}
    </ul>
    <p class="rot-empty" data-rot-empty hidden>Nothing matches that. Try another word.</p>
    <div class="rot-more"><button type="button" class="btn btn-line" data-rot-more><span>Show all ${ARCHIVE.length} with photos</span></button></div>
  </div>
</section>`;
  return page({ root, path: 'menu/', title: 'This week\u2019s menu · Casa Fresca meal prep', desc: 'This week\u2019s six meals from Casa Fresca with prices, bases and nutrition labels. Build your week and check out on casafrescameals.com.', cls: 'pg-menu', body: phero + list + build + rot });
}

/* ======================= HOW IT WORKS ======================= */
function how() {
  const root = '../';
  const steps = [
    ['Early in the week', 'Menu goes live', 'The next Tuesday&rsquo;s menu is posted on casafrescameals.com. Facebook gets a heads-up, and new dishes are called out.', 'menu'],
    ['Thursday · 6 PM', 'Ordering closes', 'Get your order in before 6 PM Thursday. After that, the kitchen locks its shopping list.', 'thu'],
    ['Monday &amp; Tuesday', 'Cooked and sealed', 'Meals are prepared with fresh ingredients in a certified kitchen and sealed for freshness.', 'cook'],
    ['Tuesday', 'Delivered or stocked', 'Door delivery for home orders, and the cooler at Ironsmith&rsquo;s Gym is restocked.', 'tue'],
    ['Any night', 'Heat and eat', 'Two to three minutes in the microwave. A large, high-protein portion, no prep.', 'eat'],
  ];
  const phero = `<section class="phero" aria-labelledby="h1">
  <div class="wrap">
    <p class="eyebrow" data-fade>How it works</p>
    <h1 id="h1" class="h-hero" data-split="hero">One order a week. <em>That&rsquo;s it.</em></h1>
    <div class="phero-row" data-fade><p class="lede">No meal kits and no chopping. Choose from the week&rsquo;s menu, then pick it up or have it brought to you.</p><div class="phero-cut">${cutoff('cut-lg')}<span class="mono" data-countdown></span></div></div>
  </div>
</section>`;
  const tl = `<section class="sec tl-sec dark" aria-labelledby="tl-h" data-hscroll>
  <div class="tl-pin">
    <div class="wrap tl-head"><p class="eyebrow">The week, step by step</p><h2 id="tl-h" class="h-xl">Where we are <em>right now</em></h2><p class="mono tl-now" data-week-now>&nbsp;</p></div>
    <ol class="tl-track" data-htrack>
      ${steps.map((s, i) => `<li class="tl-step" data-step="${s[3]}"><span class="tl-dot"></span><p class="mono">${s[0]}</p><h3><span class="tl-n">0${i + 1}</span>${s[1]}</h3><p>${s[2]}</p></li>`).join('')}
    </ol>
  </div>
</section>`;
  const pickup = `<section class="sec pk-sec" id="pickup" aria-labelledby="pk-h">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">Pickup &amp; delivery</p><h2 id="pk-h" class="h-xl" data-split>Two ways to <em>get your meals</em></h2></div>
    <div class="pk">
      <article class="pk-card" data-reveal>
        <p class="mono pk-k">01 · To your door</p>
        <h3>Tuesday delivery</h3>
        <p>Meals come &ldquo;straight to your door&rdquo; on Tuesday. Your delivery options and any charge show up at checkout once you enter your address.</p>
        <ul class="ticks"><li>Order by Thursday, 6 PM</li><li>Delivered Tuesday; timing depends on your location</li><li>Serving Crawfordsville and Montgomery County</li></ul>
      </article>
      <article class="pk-card pk-gym" data-reveal>
        <figure>${img(root, 'gen-cooler', 'A glass-door cooler stocked with meal-prep containers (illustrative image)')}</figure>
        <div><p class="mono pk-k">02 · Grab &amp; go</p>
        <h3>The cooler at ${GYM.name}</h3>
        <p>Meals are stocked at the gym and sold until they run out. Good for a post-workout lunch, or if you missed Thursday.</p>
        <p class="pk-addr">${pinIco}<span>${GYM.addr}</span></p>
        <a class="btn btn-line btn-sm" href="${GYM.maps}" target="_blank" rel="noopener" data-magnetic><span>Directions ${ext}</span></a></div>
      </article>
    </div>
    <p class="pk-note">Casa Fresca also stocks coolers at other spots around town. Ask for the closest one: <a class="ul" href="${TEL}">${PHONE}</a>.</p>
  </div>
</section>`;
  const macro = `<section class="sec mx-sec" id="macros" aria-labelledby="mx-h">
  <div class="wrap mx-grid">
    <div>
      <p class="eyebrow">Macro matcher</p>
      <h2 id="mx-h" class="h-lg" data-split>How far does a meal <em>get you</em>?</h2>
      <p class="sec-sub">Estimate your daily calories and protein, then see how this week&rsquo;s labelled meals fit. It uses the Mifflin–St Jeor equation, so treat it as a starting point, not medical advice.</p>
      <form class="mx-form" data-macro novalidate>
        <fieldset class="seg"><legend class="sr">Sex</legend><label><input type="radio" name="sex" value="m" checked><span>Male</span></label><label><input type="radio" name="sex" value="f"><span>Female</span></label></fieldset>
        <div class="mx-row">
          <label class="fld"><span>Age</span><input type="number" name="age" value="35" min="16" max="90" inputmode="numeric"></label>
          <label class="fld"><span>Weight (lb)</span><input type="number" name="lb" value="180" min="80" max="450" inputmode="numeric"></label>
          <label class="fld"><span>Height (ft)</span><input type="number" name="ft" value="5" min="4" max="7" inputmode="numeric"></label>
          <label class="fld"><span>(in)</span><input type="number" name="in" value="10" min="0" max="11" inputmode="numeric"></label>
        </div>
        <label class="fld"><span>Activity</span><select name="act"><option value="1.2">Mostly sitting</option><option value="1.375">Exercise 1–3 days a week</option><option value="1.55" selected>Exercise 3–5 days a week</option><option value="1.725">Exercise 6–7 days a week</option><option value="1.9">Hard training every day</option></select></label>
        <fieldset class="seg"><legend class="sr">Goal</legend><label><input type="radio" name="goal" value="cut"><span>Lose fat</span></label><label><input type="radio" name="goal" value="keep" checked><span>Maintain</span></label><label><input type="radio" name="goal" value="gain"><span>Build muscle</span></label></fieldset>
      </form>
    </div>
    <div class="mx-out" aria-live="polite">
      <div class="mx-tot"><div><b data-mx-cal>—</b><span>calories a day</span></div><div><b data-mx-pro>—</b><span>grams of protein</span></div></div>
      <ul class="mx-list">${labelled.map(m => `<li data-mx-meal data-p="${m.nut.p}" data-cal="${m.nut.cal}"><img src="${root}assets/img/${m.img}.webp" alt="" width="64" height="80" loading="lazy"><div><p>${esc(m.short)}</p><div class="bar"><i data-bar></i></div></div><span class="mono" data-pct>—</span></li>`).join('')}</ul>
      <p class="mono mx-fine">Share of your daily protein in one meal. From the labels posted ${CHECKED}.</p>
    </div>
  </div>
</section>`;
  const faqs = [
    ['When do I need to order?', 'By Thursday at 6 PM for delivery or pickup the following Tuesday. The countdown at the top of this site shows how long is left.'],
    ['When is the new menu posted?', 'Early in the week before. Casa Fresca also posts on Facebook when the menu is live and when new dishes are added.'],
    ['How do I heat the meals?', 'Two to three minutes in the microwave.'],
    ['Are the meals frozen?', 'No. Meals are made with fresh, never-frozen ingredients and sealed for freshness.'],
    ['Can I choose my base?', 'On many bowls, yes: white rice, brown rice (about 50¢ more) or quinoa (about $1 more). Pasta dishes can sometimes swap to quinoa.'],
    ['Where can I see nutrition information?', 'Many meals have a printed nutrition label. It&rsquo;s on each meal here on the menu page and in the product photos on casafrescameals.com.'],
    ['Can I pick up instead of delivery?', `Yes. Meals are stocked in the cooler at ${GYM.name}, ${GYM.addr}, until they sell out.`],
    ['Do you ever take a week off?', 'Occasionally, for family time. Weeks off are announced on Facebook, and the gym cooler is usually still stocked.'],
    ['How do I pay?', 'Online at checkout on casafrescameals.com. Major cards and Shop Pay are accepted.'],
    ['Do you cater?', 'Yes: corporate meals, rehearsal dinners, weddings and parties. See the catering page to send the details of your event.'],
  ];
  const faq = `<section class="sec faq-sec" id="faq" aria-labelledby="faq-h">
  <div class="wrap faq-grid">
    <div><p class="eyebrow">FAQ</p><h2 id="faq-h" class="h-xl" data-split>Good <em>questions</em></h2><p class="sec-sub">Still wondering? Call or text <a class="ul" href="${TEL}">${PHONE}</a>.</p></div>
    <div class="faq">${faqs.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary><span>${f[0]}</span><i aria-hidden="true"></i></summary><div class="faq-a"><p>${f[1]}</p></div></details>`).join('')}</div>
  </div>
</section>`;
  return page({ root, path: 'how-it-works/', title: 'How it works · Pickup, delivery & FAQ · Casa Fresca', desc: 'Order by Thursday 6 PM, get your meals Tuesday. Door delivery or the cooler at Ironsmith\u2019s Gym. Macro matcher and FAQ.', cls: 'pg-how', body: phero + tl + pickup + macro + faq });
}

/* ======================= CATERING ======================= */
function catering() {
  const root = '../';
  const phero = `<section class="phero phero-cat" aria-labelledby="h1">
  <div class="wrap cat-hero">
    <div><p class="eyebrow" data-fade>Catering · Central Indiana</p>
    <h1 id="h1" class="h-hero" data-split="hero">Feed the whole <em>room.</em></h1>
    <p class="lede" data-fade>Corporate meetings, rehearsal dinners, weddings, birthdays. Breakfast, lunch, dinner and appetizers, buffet or plated, built around your event.</p>
    <div class="hero-ctas" data-fade><a class="btn btn-tomato btn-lg" href="#plan" data-magnetic><span>Plan your event ${arrow}</span></a><a class="btn btn-line" href="${TEL}" data-magnetic><span>${phoneIco}${PHONE}</span></a></div></div>
    <figure class="cat-img" data-img-reveal>${img(root, 'gen-portioning', 'Gloved hands portioning grilled chicken, rice and broccoli into containers (illustrative image)')}</figure>
  </div>
</section>`;
  const events = [
    ['Jul 2026', '160', 'employees', 'Chicken and steak fajita dinner for a local team, prepared and delivered in one evening.'],
    ['Aug 2026', 'Westfield', 'rehearsal dinner', 'The groom first had the Marry Me chicken at a corporate event and wanted it again. Served with bacon-and-onion green beans, cheesy garlic bread and salad.'],
    ['Aug 2026', '2', 'days, one couple', 'Rehearsal dinner on Friday, then a charcuterie table at the wedding on Saturday.'],
    ['Ongoing', 'Work', 'lunch events', '&ldquo;We use Casa Fresca for work lunch events and home personal meals.&rdquo; &mdash; Justin Riggins, Google review'],
  ];
  const ev = `<section class="sec ev-sec dark" aria-labelledby="ev-h">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">Recent events</p><h2 id="ev-h" class="h-xl" data-split>From the <em>last few months</em></h2><p class="sec-sub" data-fade>As shared on Casa Fresca&rsquo;s Facebook page. Client names left out.</p></div>
    <ol class="ev">${events.map(e => `<li class="ev-item" data-reveal><p class="mono">${e[0]}</p><p class="ev-big">${e[1]}<span>${e[2]}</span></p><p>${e[3]}</p></li>`).join('')}</ol>
  </div>
</section>`;
  const offer = `<section class="sec offer-sec" aria-labelledby="of-h">
  <div class="wrap offer">
    <figure class="offer-img" data-img-reveal>${img(root, 'real-breakfast', 'Breakfast plate of cheesy hashbrown casserole, sausage links and scrambled eggs')}</figure>
    <div><p class="eyebrow">What we can do</p><h2 id="of-h" class="h-lg" data-split>Built around <em>your event</em></h2>
    <ul class="offer-list">
      <li><b>Buffet or plated</b><span>From a spread for a small office lunch to a full-course meal for a large wedding.</span></li>
      <li><b>Any time of day</b><span>Breakfast, lunch, dinner and appetizers.</span></li>
      <li><b>Dietary needs</b><span>Customisable options for different tastes and diets.</span></li>
      <li><b>Delivered on time</b><span>Prepared fresh and brought to you, so you can enjoy your own event.</span></li>
    </ul></div>
  </div>
</section>`;
  const plan = `<section class="sec plan-sec" id="plan" aria-labelledby="pl-h">
  <div class="wrap plan-grid">
    <div class="plan-intro"><p class="eyebrow">Plan your event</p><h2 id="pl-h" class="h-xl" data-split>Tell us <em>the basics</em></h2><p class="sec-sub">Fill this in and we&rsquo;ll write the message for you. It opens in your email or texting app, addressed to Casa Fresca, ready to send.</p>
    <p class="plan-direct">Rather talk? <a class="ul" href="${TEL}">${PHONE}</a> · <a class="ul" href="mailto:${EMAIL}">${EMAIL}</a></p></div>
    <form class="plan" data-plan data-email="${EMAIL}" data-sms="${SMS}" novalidate>
      <fieldset><legend class="mono">01 · Occasion</legend><div class="pills">${['Corporate meal', 'Rehearsal dinner', 'Wedding', 'Birthday or party', 'Other'].map((o, i) => `<label class="pill-in"><input type="radio" name="occ" value="${o}"${i === 0 ? ' checked' : ''}><span>${o}</span></label>`).join('')}</div></fieldset>
      <fieldset><legend class="mono">02 · When &amp; how many</legend><div class="mx-row">
        <label class="fld"><span>Date</span><input type="date" name="date"></label>
        <label class="fld"><span>Guests</span><input type="number" name="guests" min="5" max="1000" value="40" inputmode="numeric"></label>
        <label class="fld fld-w"><span>Town or venue</span><input type="text" name="where" placeholder="e.g. Crawfordsville"></label></div>
        <label class="range"><span class="sr">Guests</span><input type="range" min="10" max="300" step="5" value="40" data-guests-range></label></fieldset>
      <fieldset><legend class="mono">03 · Service</legend><div class="pills">${['Buffet', 'Plated', 'Drop-off', 'Charcuterie table'].map((o, i) => `<label class="pill-in"><input type="checkbox" name="svc" value="${o}"${i === 0 ? ' checked' : ''}><span>${o}</span></label>`).join('')}</div></fieldset>
      <fieldset><legend class="mono">04 · Meal</legend><div class="pills">${['Breakfast', 'Lunch', 'Dinner', 'Appetizers'].map((o, i) => `<label class="pill-in"><input type="checkbox" name="meal" value="${o}"${i === 2 ? ' checked' : ''}><span>${o}</span></label>`).join('')}</div></fieldset>
      <label class="fld"><span>Anything else? Favourite dishes, dietary needs, budget</span><textarea name="notes" rows="3" placeholder="e.g. Marry Me chicken, one vegetarian option"></textarea></label>
      <label class="fld"><span>Your name</span><input type="text" name="name" autocomplete="name"></label>
      <div class="plan-prev"><p class="mono">Your message</p><pre data-plan-prev></pre></div>
      <div class="plan-go"><a class="btn btn-tomato btn-lg" href="mailto:${EMAIL}" data-plan-mail data-magnetic><span>Email it</span></a><a class="btn btn-line btn-lg" href="${SMS}" data-plan-sms data-magnetic><span>Text it</span></a></div>
    </form>
  </div>
</section>`;
  return page({ root, path: 'catering/', title: 'Catering · Casa Fresca', desc: 'Casa Fresca catering for corporate meals, rehearsal dinners, weddings and parties in central Indiana. Buffet or plated; send your event details in a minute.', cls: 'pg-cat', body: phero + ev + offer + plan });
}

/* ======================= ABOUT ======================= */
function about() {
  const root = '../';
  const phero = `<section class="phero" aria-labelledby="h1">
  <div class="wrap">
    <p class="eyebrow" data-fade>About Casa Fresca</p>
    <h1 id="h1" class="h-hero" data-split="hero">Every meal <em>tells a story.</em></h1>
  </div>
  <div class="ab-strip" data-strip>${['wk-garlic-shrimp', 'real-breakfast', 'wk-teriyaki-turkey', 'real-beef-broccoli', 'wk-tortilla-soup'].map((n, i) => `<figure class="ab-s ab-s${i}">${img(root, n, ['Creamy garlic shrimp over rice with asparagus', 'Breakfast casserole with sausage links and eggs', 'Teriyaki ground turkey bowl', 'Asian beef and broccoli', 'Chicken tortilla soup'][i])}</figure>`).join('')}</div>
</section>`;
  const chapters = `<section class="sec ab-sec" aria-label="Sergio's story">
  <div class="wrap ab-grid">
    <figure class="ab-logo" data-reveal><img src="${root}assets/img/logo.svg" alt="Casa Fresca logo" width="420" height="420" loading="lazy"></figure>
    <div class="ab-copy">
      <p class="focus" data-focus>Casa Fresca is Sergio Landaverde&rsquo;s kitchen. He grew up in El Salvador surrounded by the aromas of fresh pupusas, tamales and stews, and brought that love of cooking to the United States.</p>
      <div class="ab-ch" data-reveal><p class="mono">01 · The training</p><h2>Years in top restaurant kitchens</h2><p>Sergio worked as a career chef in high-end restaurants, from mastering knife work to perfecting complex dishes. That&rsquo;s where the precision comes from.</p></div>
      <div class="ab-ch" data-reveal><p class="mono">02 · The leap</p><h2>Something of his own</h2><p>He started Casa Fresca to blend that professional training with the soul of the food he grew up with, and to build a better life for his wife and three children. It began small and grew with the support of the community.</p></div>
      <div class="ab-ch" data-reveal><p class="mono">03 · Today</p><h2>A family business, every week</h2><p>Meals made every week, coolers stocked around town, and catering for everything from rehearsal dinners to company dinners for 160. &ldquo;Meeting great new people is one of our favorite parts of owning this business.&rdquo;</p></div>
    </div>
  </div>
</section>`;
  const quote = `<section class="sec qt-sec dark" aria-label="Our mission">
  <div class="wrap qt">
    <p class="eyebrow">Our mission</p>
    <blockquote class="qt-q" data-focus>&ldquo;To deliver delicious, high-quality meals that nourish the body and soul.&rdquo;</blockquote>
    <p class="mono">From Casa Fresca&rsquo;s own About page</p>
  </div>
</section>`;
  const values = `<section class="sec val-sec" aria-labelledby="v-h">
  <div class="wrap">
    <div class="sec-head"><p class="eyebrow">What we promise</p><h2 id="v-h" class="h-xl" data-split>Fresh, consistent, <em>personal</em></h2></div>
    <div class="vals">
      <div class="val" data-reveal><span class="val-n mono">01</span><h3>Fresh, never frozen</h3><p>Premium ingredients, locally sourced whenever possible, cooked fresh every week.</p></div>
      <div class="val" data-reveal><span class="val-n mono">02</span><h3>Made in a certified kitchen</h3><p>Every meal is prepared and sealed for freshness.</p></div>
      <div class="val" data-reveal><span class="val-n mono">03</span><h3>Part of the family</h3><p>&ldquo;Sergio is a hard working, kind human being who treats all of his customers like family.&rdquo; &mdash; Adam Welcher, Google review</p></div>
    </div>
  </div>
</section>`;
  const community = `<section class="sec com-sec" aria-labelledby="c-h">
  <div class="wrap com">
    <div><p class="eyebrow">In the community</p><h2 id="c-h" class="h-lg" data-split>Proud to <em>pitch in</em></h2>
    <p class="sec-sub">Casa Fresca was a Harvest Partner Sponsor of the 2026 Davidson Greenhouse Harvest Festival, September 26–27: a weekend of live music, local vendors, food and family fun.</p>
    <a class="btn btn-line" href="${FB}" target="_blank" rel="noopener" data-magnetic><span>Follow on Facebook ${ext}</span></a></div>
    <figure class="com-img" data-img-reveal>${img(root, 'real-buffalo-tray', 'Shredded buffalo chicken over creamy macaroni and cheese')}</figure>
  </div>
</section>`;
  return page({ root, path: 'about/', title: 'About Sergio Landaverde · Casa Fresca', desc: 'Casa Fresca is chef Sergio Landaverde\u2019s family meal-prep and catering business in Crawfordsville, Indiana, rooted in El Salvador and fine-dining kitchens.', cls: 'pg-about', body: phero + chapters + quote + values + community });
}

function notFound() {
  const root = '/casa-fresca/';
  return page({ root, path: '404.html', title: 'Page not found · Casa Fresca', desc: 'That page isn\u2019t on the menu.', cls: 'pg-404', cta: false, body: `<section class="phero nf"><div class="wrap"><p class="eyebrow">404</p><h1 class="h-hero" data-split="hero">Not on <em>this week&rsquo;s menu.</em></h1><p class="lede">That page doesn&rsquo;t exist. Try one of these instead.</p><div class="hero-ctas"><a class="btn btn-tomato" href="${root}menu/"><span>This week&rsquo;s menu ${arrow}</span></a><a class="btn btn-line" href="${root}"><span>Home</span></a></div></div></section>` });
}

export const PAGES = { 'index.html': home, 'menu/index.html': menu, 'how-it-works/index.html': how, 'catering/index.html': catering, 'about/index.html': about, '404.html': notFound };
