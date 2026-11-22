/* Qubit in Order: small display helpers shared by labs.js and app.js. */
(function (root) {
  "use strict";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }
  // Escape plain text, then add the small bits of math formatting we use.
  function fmt(s) {
    return esc(s)
      .replace(/U_f/g, "U<sub>f</sub>")
      .replace(/U_s/g, "U<sub>s</sub>")
      .replace(/\(−1\)\^f\(x\)/g, "(−1)<sup>f(x)</sup>")
      .replace(/\(−1\)\^\(s·x\)/g, "(−1)<sup>s·x</sup>")
      .replace(/(\w)\^x\b/g, "$1<sup>x</sup>");
  }
  /* Put every quantum/maths expression in the maths font, so kets look the
   * same everywhere. Works on finished HTML: tags are skipped, only text is
   * changed. Wrapped: kets and ket sums like (|0⟩+|1⟩)/√2, U_f, U_s,
   * (−1)^f(x), and fractions like 1/√2. */
  const KET = "\\|[^|\u27e9<>\\s]{1,8}\u27e9";
  const COEF = "(?:\\([0-9./\u221a\u2212]+\\)|[a-c](?=\\|))?";
  const KET_EXPR = new RegExp("\u2212?\\(?" + COEF + KET + "(?:\\s?[+\u2212]\\s?" + COEF + KET + ")*\\)?(?:\\/\u221a\\d+)?", "g");
  const FRAC = /\b\d+\/\u221a\d+\b/g;
  function wrap(m) { return '<span class="math">' + m + "</span>"; }
  function mathify(html) {
    html = html
      .replace(/\(\u22121\)<sup>[^<]{1,12}<\/sup>/g, wrap)
      .replace(/U<sub>[fs]<\/sub>/g, wrap);
    return html.split(/(<[^>]+>)/).map(function (part) {
      if (part.charAt(0) === "<") return part;
      return part.replace(KET_EXPR, wrap).replace(FRAC, wrap);
    }).join("");
  }

  function plain(s) { return String(s).replace(/U_f/g, "U f").replace(/U_s/g, "U s"); }
  function pct(p) { return (Math.round(p * 1000) / 10).toString().replace(/\.0$/, "") + "%"; }
  function bits(x, n) { let s = x.toString(2); while (s.length < n) s = "0" + s; return s; }

  function meterIcon() {
    return '<svg class="meter" viewBox="0 0 40 28" aria-hidden="true" focusable="false">' +
      '<rect x="1" y="1" width="38" height="26" rx="3" fill="#fff" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M8 21 A12 12 0 0 1 32 21" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<line x1="20" y1="21" x2="28" y2="10" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
  }

  /* Gate pictures in the style of a textbook gate table:
   * a white box with a bold letter on a wire, a filled dot for a control,
   * and ⊕ for a Pauli-X that is being controlled (a CNOT target). */
  function gateSymbol(g, opts) {
    opts = opts || {};
    const stubs = opts.stubs;
    const w = stubs ? 76 : 44, h = 40, cx = w / 2;
    let body = "";
    if (stubs) body += '<line x1="0" y1="20" x2="' + w + '" y2="20" class="gs-wire"/>';
    if (g === "C") {
      body += '<circle cx="' + cx + '" cy="20" r="6.5" class="gs-dot"/>';
    } else if (g === "X" && opts.target) {
      body += '<circle cx="' + cx + '" cy="20" r="12" class="gs-box"/>' +
        '<line x1="' + cx + '" y1="8" x2="' + cx + '" y2="32" class="gs-line"/>' +
        '<line x1="' + (cx - 12) + '" y1="20" x2="' + (cx + 12) + '" y2="20" class="gs-line"/>';
    } else {
      body += '<rect x="' + (cx - 18) + '" y="2" width="36" height="36" class="gs-box"/>' +
        '<text x="' + cx + '" y="27.5" text-anchor="middle" class="gs-letter">' + esc(g) + "</text>";
    }
    return '<svg class="gate-svg" viewBox="0 0 ' + w + " " + h + '" width="' + w + '" height="' + h + '" aria-hidden="true" focusable="false">' + body + "</svg>";
  }

  root.QQUI = { esc: esc, fmt: fmt, mathify: mathify, plain: plain, pct: pct, bits: bits, meterIcon: meterIcon, gateSymbol: gateSymbol };
})(window);
