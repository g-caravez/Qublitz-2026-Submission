/* Qubit in Order: smooth motion between screen updates.
 *
 * The game redraws its HTML after every click. Without help, a bar that
 * changes height would just jump. This file makes it glide instead:
 *
 *   const snap = QQMotion.snapshot(root);   // before the redraw
 *   ...redraw...
 *   QQMotion.play(root, snap);              // after the redraw
 *
 * Any element with data-m="<unique key>" is tracked. Its old look (the CSS
 * properties named in data-mp, default "height,top,width") is animated to
 * its new look. An element with data-num="<number>" and data-fmt="pct" or
 * "a2" also counts its number up or down. Elements that are new are left to
 * their own CSS entrance animations.
 *
 * The numbers on screen are always the exact final values; the motion only
 * fills in the in-between frames. Nothing moves for players who turn off
 * animations in their system settings.
 */
(function (root) {
  "use strict";
  const DURATION = 520;
  const EASE = "cubic-bezier(.2, .75, .25, 1)";

  function reduced() {
    return !!(root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }
  function propsOf(el) { return (el.dataset.mp || "height,top,width").split(","); }
  function camel(p) { return p.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); }); }

  function snapshot(scope) {
    const snap = {};
    if (!scope || reduced()) return snap;
    scope.querySelectorAll("[data-m]").forEach(function (el) {
      const cs = getComputedStyle(el), rec = { style: {} };
      propsOf(el).forEach(function (p) { rec.style[p] = cs.getPropertyValue(p); });
      if (el.dataset.num !== undefined) rec.num = currentNumber(el);
      snap[el.dataset.m] = rec;
    });
    return snap;
  }

  // While a number is still counting, use the value it is showing right now.
  function currentNumber(el) {
    const n = el._qqShown;
    return typeof n === "number" ? n : parseFloat(el.dataset.num);
  }

  function format(v, kind) {
    if (kind === "pct") return root.QQUI.pct(Math.max(0, v));
    if (kind === "a2") return (v < -0.005 ? "−" : "") + Math.abs(v).toFixed(2);
    return String(Math.round(v));
  }

  function countUp(el, from, to) {
    const kind = el.dataset.fmt, finalText = el.textContent, t0 = performance.now();
    if (Math.abs(from - to) < 1e-6) return;
    function frame(now) {
      if (!el.isConnected) return;
      const t = Math.min(1, (now - t0) / DURATION), e = 1 - Math.pow(1 - t, 3);
      if (t >= 1) { el.textContent = finalText; el._qqShown = undefined; return; }
      el._qqShown = from + (to - from) * e;
      el.textContent = format(el._qqShown, kind);
      requestAnimationFrame(frame);
    }
    el._qqShown = from;
    el.textContent = format(from, kind);
    requestAnimationFrame(frame);
  }

  function play(scope, snap) {
    if (!scope || reduced() || !snap) return;
    scope.querySelectorAll("[data-m]").forEach(function (el) {
      const old = snap[el.dataset.m];
      if (!old) return;
      const cs = getComputedStyle(el), from = {}, to = {};
      let changed = false;
      propsOf(el).forEach(function (p) {
        const now = cs.getPropertyValue(p);
        if (old.style[p] !== undefined && old.style[p] !== now) { from[camel(p)] = old.style[p]; to[camel(p)] = now; changed = true; }
      });
      if (changed && el.animate) el.animate([from, to], { duration: Number(el.dataset.md) || DURATION, easing: EASE });
      if (old.num !== undefined && el.dataset.num !== undefined) countUp(el, old.num, parseFloat(el.dataset.num));
    });
  }

  root.QQMotion = { snapshot: snapshot, play: play, reduced: reduced };
})(window);
