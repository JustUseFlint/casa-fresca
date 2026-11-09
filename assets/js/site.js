/* Casa Fresca concept: interaction + motion (GSAP + ScrollTrigger + Lenis) */
(function () {
  'use strict';
  var d = document, H = d.documentElement, W = window;
  var RM = W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = W.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasG = !!(W.gsap && W.ScrollTrigger);
  var motion = !RM && hasG;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var lenis = null;
  W.__cfReady = true;
  H.classList.toggle('motion', motion);
  H.classList.toggle('no-motion', !motion);
  if (hasG) gsap.registerPlugin(ScrollTrigger);
  var entering = H.classList.contains('pt-in');
  try { sessionStorage.removeItem('cf-pt'); } catch (e) {}

  /* ---------- Order cut-off: Thursday 6 PM (America/Indianapolis) for Tuesday ---------- */
  var DN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function local() {
    try {
      var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Indianapolis', year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'short', hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
      var o = {}; p.forEach(function (x) { o[x.type] = x.value; });
      return { y: +o.year, m: +o.month - 1, d: +o.day, wd: DN.indexOf(o.weekday), s: (+o.hour % 24) * 3600 + +o.minute * 60 + +o.second };
    } catch (e) { var n = new Date(); return { y: n.getFullYear(), m: n.getMonth(), d: n.getDate(), wd: n.getDay(), s: n.getHours() * 3600 + n.getMinutes() * 60 + n.getSeconds() }; }
  }
  function addDays(t, k) { var x = new Date(Date.UTC(t.y, t.m, t.d + k)); return { y: x.getUTCFullYear(), m: x.getUTCMonth(), d: x.getUTCDate(), wd: x.getUTCDay() }; }
  function cutoffInfo() {
    var n = local(), CUT = 18 * 3600;
    var k = (4 - n.wd + 7) % 7; if (k === 0 && n.s >= CUT) k = 7;
    var left = k * 86400 + CUT - n.s;
    var thu = addDays(n, k), tue = addDays(thu, 5);
    return { left: left, thu: thu, tue: tue, now: n };
  }
  function dstr(t) { return DN[t.wd] + ', ' + MN[t.m] + ' ' + t.d; }
  function paintCutoff() {
    var c = cutoffInfo(), h = Math.floor(c.left / 3600), dd = Math.floor(h / 24), hh = h % 24, mm = Math.floor((c.left % 3600) / 60);
    var soon = c.left < 86400;
    var t = soon ? 'Orders close today 6 PM · ' + hh + 'h ' + mm + 'm left' : 'Order by ' + dstr(c.thu) + ', 6 PM';
    $$('[data-cutoff]').forEach(function (el) { el.classList.toggle('is-soon', soon); var s = $('[data-cutoff-t]', el); if (s) s.textContent = t; });
    var cd = (dd ? dd + 'd ' : '') + hh + 'h ' + mm + 'm left · for ' + dstr(c.tue);
    $$('[data-countdown]').forEach(function (el) { el.textContent = cd; });
    // timeline "where are we"
    var wn = $('[data-week-now]');
    if (wn) {
      var wd = c.now.wd, key, label;
      if (wd === 2) { key = 'tue'; label = 'Today is Tuesday: meals are going out and the cooler is being stocked.'; }
      else if (wd === 4 && c.now.s < 18 * 3600) { key = 'thu'; label = 'Today is Thursday: ordering closes at 6 PM.'; }
      else if (wd === 1) { key = 'cook'; label = 'Today is Monday: the kitchen is cooking for tomorrow.'; }
      else { key = 'thu'; label = 'Ordering is open for ' + dstr(c.tue) + ' until ' + dstr(c.thu) + ', 6 PM.'; }
      if (wd === 5 || wd === 6 || wd === 0 || (wd === 4 && c.now.s >= 18 * 3600)) { key = 'menu'; label = 'Next up: the menu for ' + dstr(c.tue) + '. Orders close ' + dstr(c.thu) + ', 6 PM.'; }
      wn.textContent = label;
      $$('[data-step]').forEach(function (s) { s.classList.toggle('is-now', s.dataset.step === key); });
    }
  }
  paintCutoff(); setInterval(paintCutoff, 30000);

  /* ---------- Lenis ---------- */
  if (motion && W.Lenis) {
    lenis = new Lenis({ duration: 1.1, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); }); gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function (e) { var id = a.getAttribute('href'); if (id.length > 1 && $(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -80 }); } }); });
  }

  /* ---------- Header ---------- */
  var hdr = $('[data-hdr]'), lastY = 0;
  function onScroll() { var y = W.scrollY; if (!hdr) return; hdr.classList.toggle('is-scrolled', y > 20); if (!H.classList.contains('menu-open')) hdr.classList.toggle('is-hidden', y > 300 && y > lastY + 4); if (y < lastY - 4) hdr.classList.remove('is-hidden'); lastY = y; }
  W.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Mobile menu ---------- */
  var mb = $('[data-menu-btn]'), menu = $('[data-menu]');
  function closeMenu() { if (!H.classList.contains('menu-open')) return; H.classList.remove('menu-open'); mb.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-hidden', 'true'); if (lenis) lenis.start(); d.body.style.overflow = ''; }
  if (mb) mb.addEventListener('click', function () {
    if (H.classList.contains('menu-open')) return closeMenu();
    H.classList.add('menu-open'); mb.setAttribute('aria-expanded', 'true'); menu.setAttribute('aria-hidden', 'false'); hdr.classList.remove('is-hidden');
    if (lenis) lenis.stop(); d.body.style.overflow = 'hidden';
    if (motion) gsap.fromTo($$('.menu-nav a', menu), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.06, delay: 0.2 });
  });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Page transitions ---------- */
  var pt = $('.pt'), ptp = $('.pt-panel'), ptm = $('.pt-mark');
  if (motion && pt) {
    if (entering) {
      gsap.set(pt, { visibility: 'visible' });
      gsap.timeline({ onComplete: function () { H.classList.remove('pt-in'); gsap.set(pt, { visibility: 'hidden' }); gsap.set([ptp, ptm], { clearProps: 'all' }); } })
        .to(ptm, { opacity: 0, scale: 0.8, duration: 0.35, ease: 'power2.in' }, 0.1)
        .to(ptp, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 0.2);
    }
    d.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a'); if (!a) return;
      var href = a.getAttribute('href') || '';
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return;
      if (/^(mailto:|tel:|sms:|#|javascript:)/.test(href)) return;
      var url; try { url = new URL(a.href, location.href); } catch (er) { return; }
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
      e.preventDefault(); closeMenu();
      try { sessionStorage.setItem('cf-pt', '1'); } catch (er) {}
      gsap.set(pt, { visibility: 'visible' });
      gsap.timeline({ onComplete: function () { location.href = url.href; } })
        .fromTo(ptp, { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: 'expo.inOut' })
        .fromTo(ptm, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }, 0.45);
    });
    W.addEventListener('pageshow', function (e) { if (e.persisted) { gsap.set(pt, { visibility: 'hidden' }); gsap.set(ptp, { yPercent: 100 }); gsap.set(ptm, { opacity: 0 }); } });
  }

  /* ---------- Build your week ---------- */
  $$('[data-build]').forEach(function (b) {
    var shop = b.dataset.shop, rows = $$('.bw-row', b);
    var mbar = $('[data-b-mbar]', b), elMn = $('[data-b-mn]', b), elMt = $('[data-b-mt]', b), elMeals = $('[data-b-meals]', b), elTot = $('[data-b-total]', b), elPro = $('[data-b-pro]', b), elAvg = $('[data-b-avg]', b), go = $('[data-b-go]', b);
    function row(r) { var sel = $('select[data-var]', r), one = $('[data-var-one]', r); var o = sel ? sel.options[sel.selectedIndex] : null; return { id: sel ? sel.value : one.dataset.id, price: +(o ? o.dataset.price : one.dataset.price), q: +$('[data-qty]', r).textContent, p: +r.dataset.protein || 0, lab: !!r.dataset.protein }; }
    function upd(bump) {
      var n = 0, tot = 0, pro = 0, lab = 0, items = [];
      rows.forEach(function (r) { var x = row(r); r.classList.toggle('has', x.q > 0); if (!x.q) return; n += x.q; tot += x.q * x.price; if (x.lab) { pro += x.q * x.p; lab += x.q; } items.push(x.id + ':' + x.q); });
      elMeals.textContent = n; elTot.textContent = '$' + tot.toFixed(2); elPro.textContent = pro + ' g'; elAvg.textContent = lab ? Math.round(pro / lab) + ' g protein' : '—';
      if (mbar) { mbar.classList.toggle('is-off', !n); elMn.textContent = n; elMt.textContent = '$' + tot.toFixed(2); }
      if (n) { go.href = shop + '/cart/' + items.join(','); go.classList.remove('is-off'); go.removeAttribute('aria-disabled'); } else { go.href = shop + '/collections/weekly-meals'; go.classList.add('is-off'); go.setAttribute('aria-disabled', 'true'); }
      if (bump && motion) gsap.fromTo(elMeals, { yPercent: -30, opacity: 0.3 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'back.out(3)' });
      try { localStorage.setItem('cf-week', JSON.stringify(rows.map(function (r) { var s = $('select', r); return [r.dataset.meal, +$('[data-qty]', r).textContent, s ? s.selectedIndex : 0]; }))); } catch (e) {}
    }
    function setQ(r, q) { $('[data-qty]', r).textContent = Math.max(0, Math.min(20, q)); }
    rows.forEach(function (r) {
      $('[data-inc]', r).addEventListener('click', function () { setQ(r, +$('[data-qty]', r).textContent + 1); upd(true); });
      $('[data-dec]', r).addEventListener('click', function () { setQ(r, +$('[data-qty]', r).textContent - 1); upd(true); });
      var s = $('select', r); if (s) s.addEventListener('change', function () { upd(false); });
    });
    $$('[data-preset]', b).forEach(function (p) {
      p.addEventListener('click', function () {
        var k = p.dataset.preset; rows.forEach(function (r) { setQ(r, 0); });
        if (k === 'one') rows.forEach(function (r) { setQ(r, 1); });
        if (k === 'protein') { rows.filter(function (r) { return r.dataset.protein; }).sort(function (a, c) { return c.dataset.protein - a.dataset.protein; }).forEach(function (r, i) { setQ(r, i < 2 ? 2 : 1); }); }
        if (k === 'lunch') { rows.slice(0, 5).forEach(function (r) { setQ(r, 1); }); }
        upd(true);
      });
    });
    try { var sv = JSON.parse(localStorage.getItem('cf-week') || 'null'); if (sv) sv.forEach(function (x) { var r = rows.filter(function (r) { return r.dataset.meal === x[0]; })[0]; if (r) { setQ(r, x[1]); var s = $('select', r); if (s && s.options[x[2]]) s.selectedIndex = x[2]; } }); } catch (e) {}
    upd(false);
  });

  /* ---------- Rotation filter ---------- */
  $$('[data-rot]').forEach(function (t) {
    var grid = $('[data-rot-grid]'), cards = $$('.rot-card', grid), q = $('[data-rot-q]', t), more = $('[data-rot-more]'), empty = $('[data-rot-empty]'), cat = 'all', LIM = 12, open = false;
    function apply() {
      var s = (q.value || '').trim().toLowerCase(), shown = 0;
      cards.forEach(function (c) { var ok = (cat === 'all' || c.dataset.c === cat) && (!s || c.dataset.s.indexOf(s) > -1); c.classList.toggle('is-x', !ok); if (ok) { shown++; c.classList.toggle('is-over', shown > LIM); } else c.classList.remove('is-over'); });
      var clamp = !open && cat === 'all' && !s && shown > LIM;
      grid.classList.toggle('is-clamped', clamp); more.parentNode.hidden = !clamp; empty.hidden = shown > 0;
      if (hasG) ScrollTrigger.refresh();
    }
    $$('[data-cat]', t).forEach(function (b) { b.addEventListener('click', function () { cat = b.dataset.cat; $$('[data-cat]', t).forEach(function (x) { var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on); }); apply(); if (motion) gsap.fromTo($$('.rot-card:not(.is-x)', grid).slice(0, 12), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', stagger: 0.03 }); }); });
    q.addEventListener('input', apply);
    more.addEventListener('click', function () { open = true; apply(); });
    apply();
  });

  /* ---------- Macro matcher ---------- */
  $$('[data-macro]').forEach(function (f) {
    var oc = $('[data-mx-cal]'), op = $('[data-mx-pro]'), meals = $$('[data-mx-meal]');
    function calc() {
      var v = function (n) { return parseFloat(f.elements[n].value) || 0; };
      var sex = f.querySelector('input[name="sex"]:checked').value, goal = f.querySelector('input[name="goal"]:checked').value;
      var kg = v('lb') * 0.4536, cm = (v('ft') * 12 + v('in')) * 2.54, age = v('age');
      if (!kg || !cm || !age) return;
      var bmr = 10 * kg + 6.25 * cm - 5 * age + (sex === 'm' ? 5 : -161);
      var tdee = bmr * parseFloat(f.elements.act.value);
      var cal = Math.round((tdee * (goal === 'cut' ? 0.8 : goal === 'gain' ? 1.1 : 1)) / 10) * 10;
      var pro = Math.round(v('lb') * (goal === 'keep' ? 0.7 : 0.9));
      oc.textContent = cal.toLocaleString(); op.textContent = pro + 'g';
      meals.forEach(function (m) { var pct = Math.min(100, Math.round(+m.dataset.p / pro * 100)); $('[data-pct]', m).textContent = pct + '%'; $('[data-bar]', m).style.width = pct + '%'; });
    }
    f.addEventListener('input', calc); f.addEventListener('change', calc); calc();
  });

  /* ---------- Catering planner ---------- */
  $$('[data-plan]').forEach(function (f) {
    var prev = $('[data-plan-prev]', f), mail = $('[data-plan-mail]', f), sms = $('[data-plan-sms]', f), rng = $('[data-guests-range]', f), g = f.elements.guests;
    function vals(n) { return $$('input[name="' + n + '"]:checked', f).map(function (i) { return i.value; }); }
    function build() {
      var dt = f.elements.date.value, ds = '';
      if (dt) { var p = dt.split('-'); ds = new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }); }
      var lines = ['Hi Casa Fresca,', '', 'I\u2019d like a catering quote.', '', 'Occasion: ' + (vals('occ')[0] || '—'), 'Date: ' + (ds || 'TBD'), 'Guests: about ' + (g.value || '—'), 'Where: ' + (f.elements.where.value || 'TBD'), 'Service: ' + (vals('svc').join(', ') || 'Not sure yet'), 'Meal: ' + (vals('meal').join(', ') || 'Not sure yet')];
      if (f.elements.notes.value.trim()) lines.push('Notes: ' + f.elements.notes.value.trim());
      lines.push('', 'Thanks,', f.elements.name.value.trim() || '');
      var body = lines.join('\n').trim();
      prev.textContent = body;
      var subj = 'Catering quote: ' + (vals('occ')[0] || 'event') + (ds ? ', ' + ds : '');
      mail.href = 'mailto:' + f.dataset.email + '?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
      sms.href = f.dataset.sms + '?&body=' + encodeURIComponent(body);
    }
    rng.addEventListener('input', function () { g.value = rng.value; build(); });
    g.addEventListener('input', function () { if (+g.value >= 10 && +g.value <= 300) rng.value = g.value; });
    f.addEventListener('input', build); f.addEventListener('change', build); build();
  });

  /* ---------- Counters & chapters (work without motion too) ---------- */
  function setChapter(sec, k) { var chs = $$('.cc-ch', sec), plates = $$('.cc-plate', sec), num = $('[data-cc-i]', sec); chs.forEach(function (c, j) { c.classList.toggle('on', j === k); }); plates.forEach(function (p, j) { p.classList.toggle('on', j <= k); }); if (num) num.textContent = '0' + (k + 1) + ' / 0' + chs.length; }

  if (!motion) { $$('[data-chapters]').forEach(function (s) { $$('.cc-ch', s).forEach(function (c) { c.classList.add('on'); }); }); return; }

  /* ================= GSAP motion ================= */
  var ease = 'expo.out', SP = /[ \t\n\r]+/;
  function splitWords(el) {
    if (el._words) return el._words;
    var frag = d.createDocumentFragment(), words = [];
    var add = function (node) { var s = d.createElement('span'); s.className = 'w'; s.appendChild(node); frag.appendChild(s); words.push(s); };
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) { n.textContent.split(/([ \t\n\r]+)/).forEach(function (p) { if (!p) return; if (SP.test(p) && !p.replace(SP, '')) frag.appendChild(d.createTextNode(' ')); else add(d.createTextNode(p)); }); }
      else if (n.nodeType === 1) {
        if (n.tagName === 'BR') { frag.appendChild(n); return; }
        var txt = n.textContent.trim();
        if (!n.children.length && SP.test(txt)) { txt.split(SP).forEach(function (wd, k, arr) { var c = n.cloneNode(false); c.textContent = wd; add(c); if (k < arr.length - 1) frag.appendChild(d.createTextNode(' ')); }); }
        else add(n);
      }
    });
    el.innerHTML = ''; el.appendChild(frag); el._words = words; return words;
  }
  function splitLines(el) {
    el._orig = el.innerHTML;
    var words = splitWords(el), lines = [], top = null;
    words.forEach(function (w) { var t = w.offsetTop; if (top === null || Math.abs(t - top) > 4) { lines.push([]); top = t; } lines[lines.length - 1].push(w); });
    el.innerHTML = '';
    var inners = lines.map(function (ws) { var ln = d.createElement('span'); ln.className = 'ln'; var inn = d.createElement('span'); ws.forEach(function (w, k) { inn.appendChild(w); if (k < ws.length - 1) inn.appendChild(d.createTextNode(' ')); }); ln.appendChild(inn); el.appendChild(ln); return inn; });
    el._words = null; return inners;
  }
  function revealSplit(el, delay) {
    var inners = splitLines(el); el.classList.add('is-split');
    gsap.fromTo(inners, { yPercent: 115, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.2, ease: ease, stagger: 0.09, delay: delay || 0, onComplete: function () { el.innerHTML = el._orig; el.classList.remove('is-split'); el.classList.add('done'); } });
  }
  var fontsReady = (d.fonts && d.fonts.ready) ? Promise.race([d.fonts.ready, new Promise(function (r) { setTimeout(r, 1800); })]) : Promise.resolve();
  fontsReady.then(function () {
    var heroDelay = entering ? 0.55 : 0.12;
    $$('[data-split]').forEach(function (el) {
      if (el.dataset.split === 'hero') { revealSplit(el, heroDelay); return; }
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () { revealSplit(el); } });
    });
    $$('[data-fade]').forEach(function (el, i) {
      var inHero = el.closest('.hero,.phero');
      gsap.fromTo(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.1, ease: ease, delay: inHero ? heroDelay + 0.35 + (i % 5) * 0.08 : 0, scrollTrigger: inHero ? null : { trigger: el, start: 'top 94%', once: true } });
    });
    ScrollTrigger.batch('[data-reveal]', { start: 'top 92%', once: true, onEnter: function (bt) { gsap.fromTo(bt, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1, ease: ease, stagger: 0.08, overwrite: true }); } });
    $$('[data-focus]').forEach(function (el) { var ws = splitWords(el); gsap.fromTo(ws, { opacity: 0.15 }, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 55%', scrub: true } }); });
    setTimeout(function () { ScrollTrigger.refresh(); }, 80);
  });

  // hero art
  var hp = $('[data-hero-photo]'), hp2 = $('[data-hero-photo2]'), hnl = $('.hero-nl'), hlf = $('.hero-leaf'), dl = entering ? 0.45 : 0.05;
  if (hp) {
    gsap.fromTo(hp, { clipPath: 'inset(100% 0% 0% 0% round 22px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: 1.5, ease: 'expo.inOut', delay: dl });
    gsap.fromTo($('img', hp), { scale: 1.35 }, { scale: 1, duration: 2.1, ease: ease, delay: dl });
    gsap.to(hp, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }
  if (hp2) { gsap.fromTo(hp2, { yPercent: 40, opacity: 0, rotate: 4 }, { yPercent: 0, opacity: 1, rotate: -5, duration: 1.5, ease: ease, delay: dl + 0.5 }); gsap.to(hp2, { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } }); }
  if (hnl) { gsap.fromTo(hnl, { y: 60, opacity: 0, rotate: 12 }, { y: 0, opacity: 1, rotate: 3, duration: 1.4, ease: 'elastic.out(1,0.75)', delay: dl + 0.9 }); gsap.to(hnl, { yPercent: -30, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } }); }
  if (hlf) gsap.fromTo(hlf, { scale: 0, rotate: -80 }, { scale: 1, rotate: -20, duration: 1.4, ease: 'back.out(2)', delay: dl + 1.1 });

  // image clip reveal
  $$('[data-img-reveal]').forEach(function (el) {
    var im = $('img', el);
    gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
    ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () { gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' }); if (im) gsap.fromTo(im, { scale: 1.3 }, { scale: 1, duration: 1.9, ease: ease, clearProps: 'transform' }); } });
  });
  // nutrition labels peel in
  $$('.ml-nl').forEach(function (n) { gsap.fromTo(n, { y: 50, opacity: 0, rotate: 8 }, { y: 0, opacity: 1, rotate: -2, duration: 1.3, ease: 'elastic.out(1,0.8)', scrollTrigger: { trigger: n, start: 'top 95%', once: true } }); });

  // counters
  $$('[data-count]').forEach(function (el) { var v = parseFloat(el.dataset.count), o = { x: 0 }; el.textContent = '0'; ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: function () { gsap.to(o, { x: v, duration: 1.8, ease: 'power3.out', onUpdate: function () { el.textContent = Math.round(o.x); } }); } }); });

  // marquee driven by scroll velocity
  $$('[data-marquee]').forEach(function (m) {
    var tr = $('.mq-track', m); tr.innerHTML += tr.innerHTML; $$('.rv', tr).slice(tr.children.length / 2).forEach(function (x) { x.setAttribute('aria-hidden', 'true'); });
    var x = 0, vis = false, boost = 0, hover = false;
    new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }).observe(m);
    m.addEventListener('pointerenter', function () { hover = true; }); m.addEventListener('pointerleave', function () { hover = false; });
    gsap.ticker.add(function () {
      if (!vis) return; var w = tr.scrollWidth / 2; if (!w) return;
      var v = lenis ? lenis.velocity : 0; boost += (Math.abs(v) * 0.3 - boost) * 0.1;
      x -= (hover ? 0.15 : 0.5) + boost; x = gsap.utils.wrap(-w, 0, x);
      tr.style.transform = 'translate3d(' + x + 'px,0,0)';
    });
  });

  // magnetic
  if (FINE) $$('[data-magnetic]').forEach(function (el) {
    var s = 0.26, inner = el.firstElementChild;
    el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); var x = (e.clientX - r.left - r.width / 2) * s, y = (e.clientY - r.top - r.height / 2) * s; gsap.to(el, { x: x, y: y, duration: 0.6, ease: 'power3.out' }); if (inner) gsap.to(inner, { x: x * 0.35, y: y * 0.35, duration: 0.6, ease: 'power3.out' }); });
    el.addEventListener('pointerleave', function () { gsap.to(inner ? [el, inner] : el, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1,0.35)' }); });
  });

  // cursor
  if (FINE) {
    H.classList.add('has-cursor');
    var cur = $('.cursor'), ct = $('.cursor-t', cur);
    var cx = gsap.quickTo(cur, 'x', { duration: 0.3, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: 0.3, ease: 'power3' }), seen = false;
    cur.classList.add('is-hidden');
    W.addEventListener('pointermove', function (e) { if (!seen) { seen = true; gsap.set(cur, { x: e.clientX, y: e.clientY }); cur.classList.remove('is-hidden'); } cx(e.clientX); cy(e.clientY); }, { passive: true });
    d.addEventListener('pointerover', function (e) { var t = e.target.closest ? e.target.closest('[data-cursor]') : null; if (t) { ct.textContent = t.dataset.cursor; cur.classList.add('is-label'); } else cur.classList.remove('is-label'); });
    d.addEventListener('pointerleave', function () { cur.classList.add('is-hidden'); });
  }

  var mm = gsap.matchMedia();
  // chapters (desktop sticky)
  $$('[data-chapters]').forEach(function (sec) {
    var chs = $$('.cc-ch', sec);
    mm.add('(min-width: 980px)', function () { setChapter(sec, 0); chs.forEach(function (c, k) { ScrollTrigger.create({ trigger: c, start: 'top 60%', end: 'bottom 60%', onToggle: function (s) { if (s.isActive) setChapter(sec, k); } }); }); });
    mm.add('(max-width: 979px)', function () { chs.forEach(function (c) { c.classList.add('on'); }); });
  });

  // horizontal timeline (desktop)
  $$('[data-hscroll]').forEach(function (sec) {
    var track = $('[data-htrack]', sec), pin = $('.tl-pin', sec);
    mm.add('(min-width: 980px)', function () {
      var dist = function () { return Math.max(0, track.scrollWidth - W.innerWidth); };
      gsap.to(track, { x: function () { return -dist(); }, ease: 'none', scrollTrigger: { trigger: pin, start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 0.6, invalidateOnRefresh: true } });
    });
    gsap.fromTo($$('.tl-step', sec), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: ease, stagger: 0.08, scrollTrigger: { trigger: sec, start: 'top 70%', once: true } });
  });

  // about strip drift
  $$('[data-strip]').forEach(function (st) { $$('.ab-s', st).forEach(function (f, i) { gsap.fromTo(f, { yPercent: i % 2 ? 12 : -4 }, { yPercent: i % 2 ? -10 : 6, ease: 'none', scrollTrigger: { trigger: st, start: 'top bottom', end: 'bottom top', scrub: true } }); }); });

  // footer wordmark
  $$('[data-wm]').forEach(function (wm) { gsap.fromTo($$('span', wm), { yPercent: 100 }, { yPercent: 0, ease: 'none', stagger: 0.03, scrollTrigger: { trigger: wm, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } }); });

  W.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
