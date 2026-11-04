// Photos (hotlinked from Unsplash) and the site's animations. All motion stops under prefers-reduced-motion.
export const photos = {
  hero: "photo-1476514525535-07fb3b4ae5f1",
  "how-to-pack-carry-on-only": "photo-1488646953014-85cb44e25828",
  "cheap-flights-timing": "photo-1436491865332-7a61a109cc05",
  "hostel-vs-guesthouse": "photo-1555854877-bab0e564b8d5",
  "eat-on-a-budget": "photo-1533900298318-6b8da08a523e",
  "visa-free-basics": "photo-1473625247510-8ceb1760943f",
  "packing-list-backpack": "photo-1551632811-561732d1e306",
};

export const photo = (id, w) => `https://images.unsplash.com/${id}?w=${w}&q=75&auto=format&fit=crop`;

const shots = [
  ["photo-1469854523086-cc02fe5d8800", "Desert road trips"],
  ["photo-1544735716-392fe2489ffa", "Mountain trails"],
  ["photo-1506929562872-bb421503ef21", "Quiet coves"],
  ["photo-1493976040374-85c8e12f0c0e", "Old streets at dusk"],
  ["photo-1528127269322-539801943592", "Boats on the bay"],
  ["photo-1517760444937-f6397edcbbcd", "Waterfall walks"],
  ["photo-1527631746610-bca00a040d60", "Backstreet wandering"],
];

export function gallery() {
  const tiles = (hidden) => shots.map(([id, cap]) => `<figure${hidden ? ' aria-hidden="true"' : ""}><img src="${photo(id, 640)}" alt="${hidden ? "" : cap}" loading="lazy"><figcaption>${cap}</figcaption></figure>`).join("");
  return `<section class="strip reveal"><div class="wrap-head"><h2 class="sec">Where a small budget can take you</h2></div><div class="rail"><div class="run">${tiles(false)}${tiles(true)}</div></div></section>`;
}

export const motionCss = `
.hero{height:640px}
.hero .kb{animation:kb 26s ease-in-out infinite alternate;transform-origin:60% 50%}
@keyframes kb{from{transform:scale(1)}to{transform:scale(1.14) translate(-1.5%,-1%)}}
.shade{position:absolute;inset:0;background:linear-gradient(100deg,rgba(9,32,40,.74),rgba(9,32,40,.18) 62%,rgba(9,32,40,.1))}
.hero img.plane{object-fit:cover;pointer-events:none}
.hero-in{padding-top:150px}
.hero h1,.hero p,.hero .btn{opacity:0;animation:up .9s cubic-bezier(.2,.7,.2,1) forwards}
.hero p{animation-delay:.25s}.hero .btn{animation-delay:.5s}
@keyframes up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
.btn{transition:transform .25s,box-shadow .25s,background .25s}
.btn:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 12px 26px rgba(232,89,12,.45)}
.cue{position:absolute;left:50%;bottom:76px;width:26px;height:42px;margin-left:-13px;border:2px solid #fff;border-radius:14px;opacity:.8}
.cue:after{content:"";position:absolute;left:50%;top:8px;width:4px;height:8px;margin-left:-2px;border-radius:2px;background:#fff;animation:cue 1.6s infinite}
@keyframes cue{to{transform:translateY(14px);opacity:0}}
.stats{max-width:1000px;margin:-56px auto 0;position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:#fff;border-radius:16px;box-shadow:0 14px 34px rgba(18,52,59,.16);overflow:hidden}
.stats div{padding:24px;text-align:center}.stats b{display:block;font:800 44px/1 Arial,sans-serif;color:var(--accent)}
.stats span{font:15px Arial,sans-serif;color:var(--muted)}
.pic{overflow:hidden;aspect-ratio:16/9;background:#DDE7E6}.pic img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.card:hover .pic img{transform:scale(1.1)}
.strip{padding:0 0 10px}.wrap-head{max-width:1120px;margin:0 auto 22px;padding:0 24px}
.rail{overflow:hidden;-webkit-mask:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent);mask:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)}
.run{display:flex;gap:18px;width:max-content;animation:rail 52s linear infinite}.rail:hover .run{animation-play-state:paused}
@keyframes rail{to{transform:translateX(calc(-50% - 9px))}}
.run figure{position:relative;margin:0;width:320px;height:220px;border-radius:14px;overflow:hidden;flex:none}
.run img{width:100%;height:100%;object-fit:cover;transition:transform .6s}.run figure:hover img{transform:scale(1.08)}
.run figcaption{position:absolute;left:0;right:0;bottom:0;padding:26px 14px 10px;color:#fff;font:700 16px Arial,sans-serif;background:linear-gradient(transparent,rgba(0,0,0,.65))}
.grow i{transform:scaleX(0);transform-origin:left;transition:transform .9s cubic-bezier(.2,.7,.2,1)}
.grow i:nth-child(2){transition-delay:.15s}.grow i:nth-child(3){transition-delay:.3s}.grow i:nth-child(4){transition-delay:.45s}
.in .grow i,.grow.in i{transform:none}
.js .reveal{opacity:0;transform:translateY(34px);transition:opacity .75s ease,transform .75s cubic-bezier(.2,.7,.2,1)}
.js .reveal.in{opacity:1;transform:none}
html:not(.js) .grow i{transform:none}
.art-head{height:420px}.art-head:after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 55%,rgba(9,32,40,.45))}
.art-head img{height:120%;object-position:50% 50%;will-change:transform}
.progress{position:fixed;top:0;left:0;right:0;height:4px;z-index:9}.progress i{display:block;height:100%;width:0;background:var(--accent)}
main.article{animation:up .8s cubic-bezier(.2,.7,.2,1) both}
.top{transition:box-shadow .3s}.top.scrolled{box-shadow:0 6px 18px rgba(18,52,59,.12)}
@media(max-width:640px){.hero{height:520px}.hero-in{padding-top:90px}.stats{margin:-30px 16px 0;grid-template-columns:1fr}.stats div{padding:14px}.run figure{width:250px;height:170px}.art-head{height:280px}}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;transition:none!important}.hero h1,.hero p,.hero .btn,.js .reveal{opacity:1;transform:none}.grow i{transform:none}}
`;

export const motionJs = `(function () {
  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var count = function (el) {
    var end = +el.dataset.count, pre = el.dataset.prefix || "", start = performance.now();
    (function tick(now) {
      var t = Math.min(1, (now - start) / 1200), e = 1 - Math.pow(1 - t, 3);
      el.textContent = pre + Math.round(end * e);
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  };
  var seen = new IntersectionObserver(function (items) {
    items.forEach(function (i) {
      if (!i.isIntersecting) return;
      i.target.classList.add("in");
      if (!still) i.target.querySelectorAll("[data-count]").forEach(count);
      seen.unobserve(i.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el, n) {
    el.style.transitionDelay = (el.classList.contains("card") ? (n % 3) * 90 : 0) + "ms";
    seen.observe(el);
  });
  var top = document.querySelector(".top"), bar = document.querySelector(".progress i"), hero = document.querySelector("[data-parallax]");
  var scroll = function () {
    var y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    top.classList.toggle("scrolled", y > 10);
    if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    if (hero && !still) hero.style.transform = "translateY(" + -Math.min(70, y * 0.18) + "px)";
  };
  addEventListener("scroll", scroll, { passive: true });
  scroll();
})();
`;
