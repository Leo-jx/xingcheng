/* ============================================================
   长沙 · 星城风物志 | 十页通用「滑动层」脚本
   与「岳阳烧烤」一致的滑动方式：fixed 页头 + 滚动进度条
   + 滚动入场 + 返回顶部 + 平滑滚动 + 锚点偏移。
   不改原版任何业务功能；按 DOM 是否存在自动挂载。
   ============================================================ */
(function () {
  "use strict";

  var $ = function (s, p) { return (p || document).querySelector(s); };
  var $$ = function (s, p) { return Array.prototype.slice.call((p || document).querySelectorAll(s)); };

  var PAGE_FILE = {
    home: "index.html", spots: "spots.html", heritage: "heritage.html",
    routes: "routes.html", check: "check.html", food: "food.html",
    night: "night.html", outfit: "outfit.html", stay: "stay.html", me: "me.html"
  };
  var CUR = document.body.getAttribute("data-current") || "home";

  /* ---------- 跨页锚点：data-goto="页面:锚点" 真实跳转 ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("[data-goto]") : null;
    if (!b) return;
    var v = (b.getAttribute("data-goto") || "").split(":");
    var file = PAGE_FILE[v[0]] || (v[0] + ".html");
    e.preventDefault();
    e.stopPropagation();
    location.href = file + (v[1] ? "#" + v[1] : "");
  }, true);

  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest("[data-page]") : null;
    if (b) window.__GOTO_ANCHOR__ = "";
  }, true);

  /* ---------- 当前卷标记 / 页脚年份 ---------- */
  var VOL = {
    home: "卷一 · 山水洲城", spots: "卷二 · 十八处必到", heritage: "卷三 · 指尖上的长沙",
    routes: "卷四 · 行程建议", check: "卷五 · 打卡清单", food: "美食签 · 30 味星城",
    night: "氛围卷 · 年轻人的氛围世界", outfit: "卷七 · 星城四季穿搭",
    stay: "卷八 · 住在星城", me: "卷六 · 我的星城"
  };
  var fc = $("#footerCurrent");
  if (fc) fc.textContent = VOL[CUR] || "长沙 · 星城风物志";
  $$(".footer-links a[data-page]").forEach(function (a) {
    a.classList.toggle("on", a.getAttribute("data-page") === CUR);
  });
  var fy = $("#footerYear");
  if (fy) fy.textContent = new Date().getFullYear();

  /* ---------- 封面：十页互链时，本次会话只入城一次 ---------- */
  var entered = false;
  try { entered = sessionStorage.getItem("cswf_entered") === "1"; } catch (e) {}
  var cover = $("#cover");
  if (entered && cover) cover.classList.add("hide");
  var eb = $("#enterBtn");
  if (eb) eb.addEventListener("click", function () {
    try { sessionStorage.setItem("cswf_entered", "1"); } catch (e) {}
  });
  /* 「回到封面」仍可随时调出原版封面 */
  $$('[id^="backCover"], #footerToCover').forEach(function (b) {
    b.addEventListener("click", function () {
      document.documentElement.classList.remove("entered");
    });
  });

  /* ---------- 滚动进度条 / 返回顶部 ---------- */
  var bar = $("#progress"), top = $(".to-top");
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? (window.scrollY / h) * 100 : 0;
    if (bar) bar.style.width = Math.min(100, Math.max(0, p)) + "%";
    if (top) top.classList.toggle("show", window.scrollY > 420);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
  if (top) top.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 滚动入场动画 ---------- */
  function collectReveal() {
    var sel = ".page.on > .wrap > .sec-head, .page.on > .wrap > section, " +
              ".page.on > .wrap > .facts, .page.on > .wrap > .luck, " +
              ".page.on .guide-block, .page.on .railmap, .page.on .wear-panel.on, " +
              ".page.on .stay-card, .page.on .spot, .page.on .food-card";
    var els = $$(sel);
    els = els.filter(function (n) { return !n.parentNode.closest || !n.parentNode.closest(".reveal"); });
    els.forEach(function (n) {
      n.classList.add("reveal");
      /* 首屏内元素直接可见，避免长图出现空白 */
      if (n.getBoundingClientRect().top < window.innerHeight + 40) n.classList.add("in");
    });
    return $$(".reveal");
  }
  function initReveal() {
    var els = collectReveal();
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (n) { n.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: .04, rootMargin: "0px 0px 220px 0px" });
    els.forEach(function (n) { io.observe(n); });
    /* 兜底：任何情况下都不让内容长期保持透明 */
    setTimeout(function () {
      els.forEach(function (n) { n.classList.add("in"); });
    }, 3200);
  }

  /* ---------- 卷内锚点（#railmap / #gal-block 等） ---------- */
  function jumpHash() {
    var h = (location.hash || "").replace(/^#/, "");
    if (!h) return;
    var t = document.getElementById(h);
    if (t && t.scrollIntoView) {
      setTimeout(function () { t.scrollIntoView({ behavior: "smooth", block: "start" }); }, 260);
    }
  }

  function boot() {
    initReveal();
    jumpHash();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
