(function () {
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
