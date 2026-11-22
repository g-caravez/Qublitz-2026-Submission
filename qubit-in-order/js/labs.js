/* Qubit in Order: the six interactive labs (one per level).
 *
 * Every lab has the same shape, so app.js can treat them alike:
 *   init()                 starting settings
 *   act(lab, op, value)    change the settings when a lab button is pressed
 *   render(key, lab, compact)   HTML for the lab
 *   summary(lab)           one sentence for screen readers
 *   checks[name](lab)      lab challenges: returns { ok, msg }
 *
 * Lab buttons use data-action="lab" data-lab="<key>" data-op="<op>" data-v="<value>".
 * All numbers shown are computed exactly; nothing is a canned animation.
 */
(function (root) {
  "use strict";
  const L = root.QQLogic, U = root.QQUI;
  const esc = U.esc, fmt = U.fmt, pct = U.pct, bits = U.bits;

  function btn(key, op, v, label, extra) {
    extra = extra || {};
    return '<button class="' + (extra.cls || "lab-btn") + '" data-action="lab" data-lab="' + key + '" data-op="' + op + '"' +
      (v !== undefined ? ' data-v="' + v + '"' : "") +
      (extra.pressed !== undefined ? ' aria-pressed="' + extra.pressed + '"' : "") +
      (extra.label ? ' aria-label="' + esc(extra.label) + '"' : "") +
      (extra.disabled ? " disabled" : "") + ">" + label + "</button>";
  }
  function bitToggles(key, op, arr, name) {
    return '<span class="bit-row" role="group" aria-label="' + esc(name) + '">' + arr.map(function (b, i) {
      return btn(key, op, i, String(b), { cls: "bit" + (b ? " on" : ""), label: name + " bit " + (i + 1) + " is " + b + ". Press to flip." });
    }).join("") + "</span>";
  }
  function toInt(arr) { return arr.reduce(function (a, b) { return a * 2 + b; }, 0); }
  function fromInt(x, n) { const out = []; for (let i = n - 1; i >= 0; i--) out.push((x >> i) & 1); return out; }
  function head(title, tag) {
    return '<div class="lab-top"><h3 class="lab-title">' + title + '</h3><span class="tag">' + (tag || "Exact math") + "</span></div>";
  }
  // mkey (optional) lets the bar glide to its new length (see motion.js).
  function probBar(label, p, hot, mkey) {
    const m = mkey ? ' data-m="' + mkey + '" data-mp="width"' : "", n = mkey ? ' data-m="' + mkey + ':n" data-mp="color" data-num="' + p + '" data-fmt="pct"' : "";
    return '<div class="prob' + (hot ? " hot" : "") + '"><span class="prob-label">' + label + '</span><div class="prob-track"><div class="prob-fill"' + m + ' style="width:' + (p * 100) + '%"></div></div><span class="prob-val"' + n + ">" + pct(p) + "</span></div>";
  }
  // A signed amplitude bar on a box whose middle line is zero. It is always
  // placed with top + height, so a sign change glides through zero.
  function ampBar(x, mkey, scale) {
    const h = Math.min(Math.abs(x), 1) * (scale || 50);
    return '<div class="amp-bar ' + (x < 0 ? "neg" : "pos") + '" data-m="' + mkey + '" data-mp="top,height,background-color" style="top:' + (x < 0 ? 50 : 50 - h) + "%;height:" + h + '%"></div>';
  }
  // True for the first redraw right after this lab's button was pressed
  // (so effects play once, not on every later redraw of the page).
  function just(lab, op) {
    const a = lab._acted;
    return !!(a && Date.now() - a.t < 300 && (!op || a.op === op));
  }

  const LABS = {};

  /* ===================== Level 1: Qubit Lab ===================== */
  LABS["qubit-lab"] = {
    init: function () { return { kind: "qubit-lab", stages: [false, false, false], fid: "C" }; },
    state: function (lab) {
      const fn = L.FUNCTIONS.find(function (f) { return f.id === lab.fid; });
      return { fn: fn, amps: L.labState(lab.stages, fn.f) };
    },
    act: function (lab, op, v) {
      if (op === "stage") lab.stages[Number(v)] = !lab.stages[Number(v)];
      if (op === "fn") lab.fid = v;
    },
    render: function (key, lab, compact) {
      const st = this.state(lab), a = st.amps, d = L.describeState(a), changed = just(lab);
      const labels = ["H", "U<sub>f</sub>", "H"], names = ["first Hadamard", "oracle U f", "second Hadamard"];
      // After a change, a pulse runs along the wire and each switched-on stage
      // lights up as the pulse passes it.
      const stages = labels.map(function (lb, i) {
        const on = lab.stages[i];
        return btn(key, "stage", i, '<span class="stage-gate">' + lb + '</span><span class="stage-state">' + (on ? "ON" : "OFF") + "</span>",
          { cls: "stage" + (on ? " on" : "") + (i === 1 ? " oracle" : "") + (changed && on ? " zap zap-" + i : ""), pressed: on, label: names[i] + (on ? " on" : " off") });
      }).join("");
      const funcs = L.FUNCTIONS.map(function (f) {
        const on = f.id === lab.fid;
        return btn(key, "fn", f.id, "<b>Box " + f.id + "</b><span>f(0)=" + f.f[0] + ", f(1)=" + f.f[1] + "</span><em>" + f.type + "</em>",
          { cls: "func" + (on ? " on" : ""), pressed: on });
      }).join("");
      function ampCol(label, x, i) {
        return '<div class="amp-col"><div class="amp-box"><div class="amp-zero"></div>' + ampBar(x, key + ":amp" + i) + "</div>" +
          '<div class="amp-val' + (changed ? " pop" : "") + '">' + L.formatAmp(x) + '</div><div class="amp-label">' + label + "</div></div>";
      }
      return '<div class="lab' + (compact ? " compact" : "") + '" data-lab-root="' + key + '" role="group" aria-label="Qubit demonstration">' +
        head("Qubit demonstration", "Exact math, one qubit") +
        '<p class="lab-help">Switch stages on or off and choose the mystery box hidden inside U<sub>f</sub>.</p>' +
        '<div class="lab-wire' + (changed ? " live" : "") + '"><span class="ket-start">|0⟩</span><div class="lab-stages">' + stages + '</div><span class="lab-meter">' + U.meterIcon() + "</span>" +
          (changed ? '<span class="wire-pulse" aria-hidden="true"></span>' : "") + "</div>" +
        '<fieldset class="lab-funcs"><legend>Mystery box inside U<sub>f</sub></legend><div class="func-grid">' + funcs + "</div></fieldset>" +
        '<div class="lab-readout"><div><p class="mini-head">Amplitudes</p><div class="amp-cols">' + ampCol("|0⟩", a[0], 0) + ampCol("|1⟩", a[1], 1) + "</div></div>" +
        '<div><p class="mini-head">If measured now</p>' + probBar("P(0)", a[0] * a[0], false, key + ":p0") + probBar("P(1)", a[1] * a[1], false, key + ":p1") +
        '<p class="state-line' + (changed ? " pop" : "") + '">State: <span class="math">' + esc(d.text) + "</span>" + (d.name && d.name !== d.text ? ' = <span class="math">' + esc(d.name) + "</span>" : "") + "</p>" +
        (d.globalMinus ? '<p class="lab-note strong">The minus sign in front of the whole state is a global phase. It changes no probability.</p>' : "") +
        "</div></div>" +
        (compact ? "" : '<p class="lab-note">Bars above the line are positive amplitudes, below the line negative. Probability is amplitude squared, so the sign never shows in P(0) or P(1). Only interference from a later Hadamard can reveal it.</p>') +
        "</div>";
    },
    summary: function (lab) {
      const st = this.state(lab), d = L.describeState(st.amps);
      return "State " + (d.name || d.text) + ". P of 0 is " + pct(st.amps[0] * st.amps[0]) + ".";
    },
    checks: {
      "fifty-fifty": function (lab) {
        const a = LABS["qubit-lab"].state(lab).amps, p0 = a[0] * a[0];
        if (Math.abs(p0 - 0.5) < 1e-9) return { ok: true, msg: "Right: both outcomes now have probability ½. If both amplitude bars are above the line, this is |+⟩. Turn on the oracle with a balanced box and you get a 50/50 state with a minus sign, |−⟩." };
        return { ok: false, msg: "Not 50/50 yet: P(0) is " + pct(p0) + ". Which gate creates a superposition?" };
      },
      "balanced-gives-one": function (lab) {
        const st = LABS["qubit-lab"].state(lab), p1 = st.amps[1] * st.amps[1];
        if (st.fn.type !== "balanced") return { ok: false, msg: "Pick a balanced box first (C or D)." };
        if (Math.abs(p1 - 1) < 1e-9) return { ok: true, msg: "That is Deutsch's algorithm: Hadamard, U_f, Hadamard, then measure. A balanced box gives 1 every time, using the oracle once." };
        if (Math.abs(p1 - 0.5) < 1e-9) return { ok: false, msg: "Close: the result is 50/50. You need a superposition, the oracle, and a final Hadamard that turns the oracle's sign into a definite answer." };
        return { ok: false, msg: "The measurement would give 0 every time. Make sure the oracle sits between two Hadamard stages." };
      },
      "sneaky-constant": function (lab) {
        const st = LABS["qubit-lab"].state(lab);
        if (!lab.stages.every(Boolean)) return { ok: false, msg: "Turn on all three stages first." };
        if (st.fn.id === "A") return { ok: false, msg: "Box A never outputs 1. Pick a box that does." };
        if (st.fn.type === "balanced") return { ok: false, msg: "That box is balanced, so the full circuit gives 1. Which other box outputs a 1?" };
        return { ok: true, msg: "Box B puts a minus sign on both parts, so the circuit ends in −|0⟩. An overall minus sign is a global phase, so you still measure 0. The circuit detects whether the outputs match, not what they are." };
      }
    }
  };

  /* ===================== Level 2: Truth-table lab ===================== */
  function djProbs(f) {
    const out = [];
    for (let y = 0; y < 4; y++) {
      let a = 0;
      for (let x = 0; x < 4; x++) a += (f[x] ^ L.dot2(x, y)) ? -1 : 1;
      out.push((a / 4) * (a / 4));
    }
    return out;
  }
  function ttKind(f) { const k = f.reduce(function (a, b) { return a + b; }, 0); return k === 0 || k === 4 ? "constant" : k === 2 ? "balanced" : "neither"; }
  LABS["tt-lab"] = {
    init: function () { return { kind: "tt-lab", f: [0, 0, 0, 0] }; },
    act: function (lab, op, v) { if (op === "t") lab.f[Number(v)] ^= 1; },
    render: function (key, lab, compact) {
      const kind = ttKind(lab.f), p = djProbs(lab.f), flipped = just(lab, "t") ? Number(lab._acted.v) : -1;
      const kindChanged = lab._kind !== undefined && lab._kind !== kind; lab._kind = kind;
      const rows = lab.f.map(function (b, x) {
        return '<tr class="' + (x === flipped ? "flash" : "") + '"><td class="mono">' + bits(x, 2) + "</td><td>" + btn(key, "t", x, String(b), { cls: "bit" + (b ? " on" : ""), label: "Output for input " + bits(x, 2) + " is " + b + ". Press to flip." }) +
          '</td><td class="sign ' + (b ? "neg" : "pos") + (x === flipped ? " flip" : "") + '">' + (b ? "−" : "+") + "</td></tr>";
      }).join("");
      const kindText = kind === "neither"
        ? '<span class="pill-warn">Neither: breaks the promise</span>'
        : '<span class="pill-kind">' + kind + "</span>";
      const kindHTML = '<span class="' + (kindChanged ? "pop" : "") + '">' + kindText + "</span>";
      return '<div class="lab' + (compact ? " compact" : "") + '" data-lab-root="' + key + '" role="group" aria-label="Truth-table demonstration">' +
        head("Truth-table demonstration", "Exact math, 2 qubits") +
        '<p class="lab-help">Click an output to flip it. The right side runs the ideal Deutsch-Jozsa circuit on your function.</p>' +
        '<div class="lab-two">' +
          '<div><table class="truth tt"><thead><tr><th>Input x</th><th>f(x)</th><th>Sign</th></tr></thead><tbody>' + rows + "</tbody></table>" +
          "<p>Type: " + kindHTML + "</p></div>" +
          '<div><p class="mini-head">Circuit result</p>' +
            [0, 1, 2, 3].map(function (y) { return probBar(bits(y, 2), p[y], y === 0, key + ":tt" + y); }).join("") +
            '<p class="big-read">P(00) = <b data-m="' + key + ':tt00" data-mp="color" data-num="' + p[0] + '" data-fmt="pct">' + pct(p[0]) + "</b></p>" +
            '<p class="lab-note">P(00) is the square of the average sign.</p></div>' +
        "</div></div>";
    },
    summary: function (lab) { return "Function is " + ttKind(lab.f) + ". P of 00 is " + pct(djProbs(lab.f)[0]) + "."; },
    checks: {
      "tt-balanced": function (lab) {
        if (ttKind(lab.f) === "balanced") return { ok: true, msg: "Balanced: two 0s and two 1s. The signs cancel on average, so P(00) = 0. The circuit never outputs 00." };
        return { ok: false, msg: "Not balanced yet: you need exactly two 0s and two 1s." };
      },
      "tt-constant-one": function (lab) {
        if (lab.f.every(function (b) { return b === 1; })) return { ok: true, msg: "All signs are −, so the average is −1 and P(00) = 100%. An overall minus sign changes nothing: constant-1 is detected just like constant-0." };
        if (lab.f.every(function (b) { return b === 0; })) return { ok: false, msg: "That is constant, but all zeros. Make every output 1 instead." };
        return { ok: false, msg: "Not constant yet: every output must be the same." };
      },
      "tt-break-promise": function (lab) {
        if (ttKind(lab.f) === "neither") return { ok: true, msg: "P(00) = " + pct(djProbs(lab.f)[0]) + ": neither 0 nor 1. Without the promise, one run cannot tell you anything for certain." };
        return { ok: false, msg: "This function is " + ttKind(lab.f) + ". Use one or three 1s to break the promise." };
      }
    }
  };

  /* ===================== Level 3: Parity lab ===================== */
  function bvResult(s) {
    const st = L.newState(3, 0);
    [0, 1, 2].forEach(function (q) { L.applyGate(st, "H", q); });
    const f = []; for (let x = 0; x < 8; x++) f.push(L.dot2(s, x));
    L.applyPhaseOracle(st, [0, 1, 2], f);
    [0, 1, 2].forEach(function (q) { L.applyGate(st, "H", q); });
    return L.probabilities(st, [0, 1, 2]);
  }
  LABS["bv-lab"] = {
    init: function () {
      return { kind: "bv-lab", s: [1, 1, 1], x: [1, 1, 0], secret: 1 + Math.floor(Math.random() * 7), queries: [], guess: [0, 0, 0] };
    },
    act: function (lab, op, v) {
      if (op === "s") lab.s[Number(v)] ^= 1;
      if (op === "x") lab.x[Number(v)] ^= 1;
      if (op === "g") lab.guess[Number(v)] ^= 1;
      if (op === "query") lab.queries.push({ x: toInt(lab.x), f: L.dot2(lab.secret, toInt(lab.x)) });
      if (op === "new") { lab.secret = 1 + Math.floor(Math.random() * 7); lab.queries = []; lab.guess = [0, 0, 0]; }
    },
    render: function (key, lab, compact) {
      const s = toInt(lab.s), x = toInt(lab.x), f = L.dot2(s, x);
      const prods = lab.s.map(function (b, i) { return b * lab.x[i]; });
      const pattern = []; for (let k = 0; k < 8; k++) pattern.push(L.dot2(s, k));
      const res = bvResult(s), out = res.indexOf(Math.max.apply(null, res));
      // Chips whose sign just changed flip over, one after another.
      const prev = lab._pattern, act = just(lab);
      lab._pattern = pattern.slice();
      let order = 0;
      const flip = pattern.map(function (v, k) { return act && prev && prev[k] !== v ? ++order : 0; });
      const log = lab.queries.length
        ? lab.queries.map(function (q) { return '<li class="mono">f(' + bits(q.x, 3) + ") = " + q.f + "</li>"; }).join("")
        : '<li class="muted">No queries yet.</li>';
      return '<div class="lab' + (compact ? " compact" : "") + '" data-lab-root="' + key + '" role="group" aria-label="Parity demonstration">' +
        head("Parity demonstration", "Exact math, 3 qubits") +
        '<div class="lab-two"><div>' +
          '<p class="bit-line"><span class="bit-name">Secret s</span>' + bitToggles(key, "s", lab.s, "Secret s") + "</p>" +
          '<p class="bit-line"><span class="bit-name">Input x</span>' + bitToggles(key, "x", lab.x, "Input x") + "</p>" +
          '<p class="mono calc' + (act ? " pop" : "") + '">' + lab.s.map(function (b, i) { return b + "·" + lab.x[i]; }).join(" + ") + " = " +
            prods.reduce(function (a, b) { return a + b; }, 0) + " → mod 2 → <b>f(x) = " + f + "</b></p>" +
          '<p class="mini-head">Phase pattern after one query, (−1)<sup>s·x</sup> for every x</p>' +
          '<div class="pattern">' + pattern.map(function (v, k) {
            return '<span class="pchip ' + (v ? "neg" : "pos") + (k === x ? " cur" : "") + (flip[k] ? " flip" : "") + '"' + (flip[k] ? ' style="--d:' + (flip[k] - 1) * 60 + 'ms"' : "") + '><span class="mono">' + bits(k, 3) + "</span><b>" + (v ? "−" : "+") + "</b></span>";
          }).join("") + "</div>" +
          '<p class="big-read' + (just(lab, "s") ? " pop" : "") + '">After the final Hadamards the circuit measures <b class="mono">' + bits(out, 3) + "</b> (" + pct(res[out]) + "). That is s.</p>" +
        "</div>" +
        (compact ? "" : '<div class="mystery"><p class="mini-head">Mystery code (classical queries)</p>' +
          '<p class="lab-note">A hidden secret is chosen. Set the input x on the left, then query the box.</p>' +
          btn(key, "query", undefined, "Query f(x) for x = " + bits(x, 3), { cls: "btn small" }) +
          '<ul class="qlog">' + log + "</ul>" +
          '<p class="bit-line"><span class="bit-name">Your guess</span>' + bitToggles(key, "g", lab.guess, "Your guess") + "</p>" +
          btn(key, "new", undefined, "New mystery", { cls: "btn ghost small" }) + "</div>") +
        "</div></div>";
    },
    summary: function (lab) { return "f of x is " + L.dot2(toInt(lab.s), toInt(lab.x)) + "."; },
    checks: {
      "bv-even-overlap": function (lab) {
        const s = toInt(lab.s), x = toInt(lab.x), ones = lab.x.reduce(function (a, b) { return a + b; }, 0);
        if (s !== 5) return { ok: false, msg: "Set the secret to 101 first." };
        if (ones < 2) return { ok: false, msg: "Your input needs at least two 1s." };
        if (L.dot2(s, x) !== 0) return { ok: false, msg: "f(" + bits(x, 3) + ") = 1: the overlap with 101 is odd. Try another input." };
        return { ok: true, msg: "f(" + bits(x, 3) + ") = 0: x shares an even number of 1s with s, so the sum is even." };
      },
      "bv-half-minus": function (lab) {
        const s = toInt(lab.s);
        if (s === 0) return { ok: false, msg: "The secret must be nonzero. With s = 000 every sign is +." };
        if (L.dot2(s, 7) !== 0) return { ok: false, msg: "With this secret, f(111) = 1. You need an even number of 1s in s." };
        return { ok: true, msg: "s = " + bits(s, 3) + " has an even number of 1s, so f(111) = 0. The pattern still has four − signs: every nonzero s splits the inputs in half." };
      },
      "bv-mystery": function (lab) {
        const g = toInt(lab.guess), qs = lab.queries;
        if (!qs.length) return { ok: false, msg: "Make some queries first: set x and press Query." };
        const bad = qs.find(function (q) { return L.dot2(g, q.x) !== q.f; });
        if (bad) return { ok: false, msg: "Your guess predicts f(" + bits(bad.x, 3) + ") = " + L.dot2(g, bad.x) + ", but the box said " + bad.f + "." };
        if (g !== lab.secret) return { ok: false, msg: "Your guess fits the queries so far, but other secrets do too. Query more inputs." };
        return { ok: true, msg: "Cracked it: s = " + bits(g, 3) + " using " + qs.length + " classical " + (qs.length === 1 ? "query" : "queries") + ". The quantum circuit needs just 1." };
      }
    }
  };

  /* ===================== Level 4: XOR-pairs lab ===================== */
  function simonLabels(s) {
    const mins = [];
    for (let x = 0; x < 8; x++) { const m = Math.min(x, x ^ s); if (mins.indexOf(m) < 0) mins.push(m); }
    mins.sort(function (a, b) { return a - b; });
    const out = [];
    for (let x = 0; x < 8; x++) out.push("ABCDEFGH"[mins.indexOf(Math.min(x, x ^ s))]);
    return out;
  }
  LABS["simon-lab"] = {
    init: function () { return { kind: "simon-lab", s: [1, 1, 0], sel: [], y: [0, 0, 0] }; },
    act: function (lab, op, v) {
      if (op === "s") { lab.s[Number(v)] ^= 1; }
      if (op === "y") lab.y[Number(v)] ^= 1;
      if (op === "sel") {
        const x = Number(v), i = lab.sel.indexOf(x);
        if (i >= 0) lab.sel.splice(i, 1);
        else { lab.sel.push(x); if (lab.sel.length > 2) lab.sel.shift(); }
      }
    },
    render: function (key, lab, compact) {
      const s = toInt(lab.s), labels = simonLabels(s), y = toInt(lab.y);
      const cells = []; for (let x = 0; x < 8; x++) cells.push(x);
      // When the mask changes, the outputs that changed pop in one by one; a
      // matching pair glows when it is found.
      const prev = lab._labels, maskMoved = just(lab, "s");
      lab._labels = labels.slice();
      const match = just(lab, "sel") && lab.sel.length === 2 && labels[lab.sel[0]] === labels[lab.sel[1]];
      let order = 0;
      const table = cells.map(function (x) {
        const on = lab.sel.indexOf(x) >= 0, moved = maskMoved && prev && prev[x] !== labels[x];
        return btn(key, "sel", x, '<span class="mono">' + bits(x, 3) + '</span><span class="out out-' + labels[x] + (moved ? " pop" : "") + '"' + (moved ? ' style="--d:' + (order++) * 45 + 'ms"' : "") + '>f = ' + labels[x] + "</span>",
          { cls: "xcell" + (on ? " on" : "") + (on && match ? " match" : ""), pressed: on, label: "Input " + bits(x, 3) + ", output " + labels[x] });
      }).join("");
      let pairInfo = '<p class="lab-note">Select two inputs to compare them.</p>';
      if (lab.sel.length === 2) {
        const a = lab.sel[0], b = lab.sel[1], same = labels[a] === labels[b];
        pairInfo = '<p class="mono calc' + (just(lab, "sel") ? " pop" : "") + '">' + bits(a, 3) + " XOR " + bits(b, 3) + " = <b>" + bits(a ^ b, 3) + "</b></p>" +
          '<p class="' + (same ? "good-text" : "muted") + '">' + (same ? "Same output: these two inputs are a pair." : "Different outputs: not a pair.") + "</p>";
      }
      return '<div class="lab' + (compact ? " compact" : "") + '" data-lab-root="' + key + '" role="group" aria-label="XOR-pairs demonstration">' +
        head("XOR-pairs demonstration", "Simon's promise, 3 bits") +
        '<p class="bit-line"><span class="bit-name">Hidden mask s</span>' + bitToggles(key, "s", lab.s, "Mask s") + "</p>" +
        (s === 0 ? '<p class="pill-warn">s = 000 is not allowed: every input would be alone, with no pairs.</p>' : "") +
        '<p class="lab-help">Each input shows its output letter. Inputs with the same letter share an output.</p>' +
        '<div class="xgrid">' + table + "</div>" + pairInfo +
        (compact ? "" : '<div class="ycheck"><p class="mini-head">What a quantum run can measure</p>' +
          '<p class="bit-line"><span class="bit-name">Measured y</span>' + bitToggles(key, "y", lab.y, "Measured y") + "</p>" +
          '<p class="mono calc' + (just(lab, "y") ? " pop" : "") + '">y·s = ' + lab.y.map(function (b, i) { return b + "·" + lab.s[i]; }).join(" + ") + " mod 2 = <b>" + L.dot2(y, s) + "</b> → " +
          (L.dot2(y, s) === 0 ? '<span class="good-text">can be measured</span>' : '<span class="bad-text">never measured</span>') + "</p></div>") +
        "</div>";
    },
    summary: function (lab) { return "Mask " + bits(toInt(lab.s), 3) + ". " + lab.sel.length + " inputs selected."; },
    checks: {
      "simon-find-pair": function (lab) {
        const s = toInt(lab.s), labels = simonLabels(s);
        if (s === 0) return { ok: false, msg: "Set a nonzero mask first." };
        if (lab.sel.length !== 2) return { ok: false, msg: "Select exactly two inputs." };
        const a = lab.sel[0], b = lab.sel[1];
        if (labels[a] !== labels[b]) return { ok: false, msg: "Those two have different outputs. Find two with the same letter." };
        return { ok: true, msg: bits(a, 3) + " XOR " + bits(b, 3) + " = " + bits(a ^ b, 3) + ", which is exactly the mask s. Every matching pair reveals s." };
      },
      "simon-pair-100": function (lab) {
        if (toInt(lab.s) !== 3) return { ok: false, msg: "Set the mask to 011 first." };
        const sel = lab.sel.slice().sort();
        if (lab.sel.indexOf(4) < 0) return { ok: false, msg: "Select input 100." };
        if (sel.length === 2 && sel[0] === 4 && sel[1] === 7) return { ok: true, msg: "100 XOR 011 = 111, and the two share an output." };
        return { ok: false, msg: "Which input equals 100 XOR 011?" };
      },
      "simon-orthogonal": function (lab) {
        const s = toInt(lab.s), y = toInt(lab.y);
        if (s !== 6) return { ok: false, msg: "Set the mask to 110 first." };
        if (y === 0) return { ok: false, msg: "000 always works, but it tells you nothing. Choose another y." };
        if (L.dot2(y, s) !== 0) return { ok: false, msg: "y·s = 1 for this y, so a run would never produce it." };
        return { ok: true, msg: "y = " + bits(y, 3) + " satisfies y·s = 0, so it can come out of a run. It gives the equation " + describeEq(y) + "." };
      }
    }
  };
  function describeEq(y) {
    const terms = [0, 1, 2].filter(function (i) { return (y >> (2 - i)) & 1; }).map(function (i) { return "s" + "₁₂₃"[i]; });
    return terms.join(" XOR ") + " = 0";
  }
  LABS.describeEq = describeEq;

  /* ===================== Level 5: Grover lab ===================== */
  function groverAmps(lab, ops) {
    let a = []; for (let i = 0; i < 8; i++) a.push(1 / Math.sqrt(8));
    (ops || lab.ops).forEach(function (op) {
      if (op === "O") a[lab.marked] = -a[lab.marked];
      if (op === "D") { const m = a.reduce(function (s, v) { return s + v; }, 0) / 8; a = a.map(function (v) { return 2 * m - v; }); }
    });
    return a;
  }
  LABS["grover-lab"] = {
    init: function () { return { kind: "grover-lab", marked: 5, ops: [] }; },
    act: function (lab, op, v) {
      lab._iterT = 0;
      if (op === "mark") { lab.marked = Number(v); lab.ops = []; }
      if (op === "O" || op === "D") lab.ops.push(op);
      if (op === "reset") lab.ops = [];
      // A full iteration is shown in two beats: the oracle, then diffusion.
      // The state itself is updated at once; only the picture is staged.
      if (op === "iter") {
        lab.ops.push("O", "D");
        if (root.QQMotion && root.QQMotion.reduced()) return;
        lab._iterT = Date.now(); return { redrawIn: 620 };
      }
    },
    render: function (key, lab, compact) {
      const since = lab._iterT ? Date.now() - lab._iterT : Infinity, staging = since < 600;
      const ops = staging ? lab.ops.slice(0, -1) : lab.ops;
      const phase = staging || just(lab, "O") ? "o" : since < 1000 || just(lab, "D") ? "d" : "";
      const a = groverAmps(lab, ops), mean = a.reduce(function (s, v) { return s + v; }, 0) / 8, p = a[lab.marked] * a[lab.marked];
      const oracles = ops.filter(function (o) { return o === "O"; }).length, diffs = ops.filter(function (o) { return o === "D"; }).length;
      const meanTop = 50 - Math.max(-1, Math.min(1, mean)) * 50, last = ops[ops.length - 1];
      const step = !last ? "Start: an equal superposition, every amplitude 0.35."
        : last === "O" ? "Last step: <b>oracle</b>. The marked item's sign flipped. No probability changed yet."
        : "Last step: <b>diffusion</b>. Every amplitude was reflected about the average (the dashed line).";
      const cols = a.map(function (v, i) {
        return '<div class="g-col' + (i === lab.marked ? " marked" : "") + (i === lab.marked && phase === "o" ? " zap-o" : "") + '"><div class="g-box"><div class="amp-zero"></div>' +
          '<div class="g-mean" data-m="' + key + ':gm' + i + '" style="top:' + meanTop + '%"></div>' + ampBar(v, key + ":g" + i) + "</div>" +
          '<span class="g-val" data-m="' + key + ':gv' + i + '" data-mp="color" data-num="' + v + '" data-fmt="a2">' + (v < 0 ? "−" : "") + Math.abs(v).toFixed(2) + "</span>" +
          btn(key, "mark", i, bits(i, 3), { cls: "g-label" + (i === lab.marked ? " on" : ""), pressed: i === lab.marked, label: "Mark item " + bits(i, 3) }) + "</div>";
      }).join("");
      return '<div class="lab' + (compact ? " compact" : "") + '" data-lab-root="' + key + '" role="group" aria-label="Grover demonstration">' +
        head("Grover demonstration", "Exact math, 8 items") +
        '<p class="lab-help">Starts in an equal superposition (after the Hadamard layer). Click an item\'s label to mark it. The dashed line is the average amplitude.</p>' +
        '<div class="g-cols' + (phase === "d" ? " zap-d" : "") + '">' + cols + "</div>" +
        '<p class="g-step' + (phase ? " pop" : "") + '" aria-live="off">' + step + "</p>" +
        '<div class="actions">' + btn(key, "O", undefined, "Oracle", { cls: "btn small" }) + btn(key, "D", undefined, "Diffusion", { cls: "btn small" }) +
          btn(key, "iter", undefined, "Full iteration", { cls: "btn small primary" }) + btn(key, "reset", undefined, "Reset", { cls: "btn ghost small" }) + "</div>" +
        '<p class="big-read">P(marked item ' + bits(lab.marked, 3) + ') = <b data-m="' + key + ':gp" data-mp="color" data-num="' + p + '" data-fmt="pct">' + pct(p) + "</b></p>" +
        '<p class="lab-note">Oracle calls: ' + oracles + " · Diffusions: " + diffs + " · Ideal with 2 iterations: 94.5%</p></div>";
    },
    summary: function (lab) { const a = groverAmps(lab); return "Probability of the marked item is " + pct(a[lab.marked] * a[lab.marked]) + "."; },
    checks: {
      "grover-90": function (lab) {
        const a = groverAmps(lab), p = a[lab.marked] * a[lab.marked];
        if (p >= 0.9) return { ok: true, msg: "P = " + pct(p) + ". Two iterations (oracle, diffusion, oracle, diffusion) are the sweet spot for 8 items." };
        return { ok: false, msg: "P = " + pct(p) + ". Keep alternating oracle and diffusion." };
      },
      "grover-overshoot": function (lab) {
        const a = groverAmps(lab), p = a[lab.marked] * a[lab.marked], o = lab.ops.filter(function (x) { return x === "O"; }).length;
        if (o >= 3 && p < 0.5) return { ok: true, msg: "P dropped to " + pct(p) + ". The state turned past the answer: more iterations are not always better." };
        return { ok: false, msg: "P is " + pct(p) + " after " + o + " oracle calls. Keep doing full iterations past the peak." };
      },
      "grover-oracle-only": function (lab) {
        if (lab.ops.length === 1 && lab.ops[0] === "O") return { ok: true, msg: "The marked bar points down, but its probability is still (−0.35)² = 12.5%, the same as before. Only diffusion turns the sign into a bigger probability." };
        return { ok: false, msg: "Press Reset, then press Oracle exactly once, then check." };
      }
    }
  };

  /* ===================== Level 6: QFT clock lab =====================
   * An original interactive version of the clock analogy for the Fourier
   * transform (inspired by Aaronson, Lecture 20, Figure 20.1).
   * Q = 16 outcomes; the surviving inputs are x = 1, 1+r, 1+2r, ...
   */
  const Q = 16, X0 = 1;
  function glide(lab, from, to) {
    if (Math.abs(from - to) < 1e-9 || (root.QQMotion && root.QQMotion.reduced())) { lab.anim = null; return; }
    lab.anim = { from: from, to: to, cur: from, t0: Date.now(), ms: Math.min(900, 280 + 45 * Math.abs(to - from)) };
  }
  LABS["clock-lab"] = {
    init: function () { return { kind: "clock-lab", r: 4, y: 0, playing: false }; },
    act: function (lab, op, v) {
      const from = lab.anim ? lab.anim.cur : lab.y;
      if (op === "r") { lab.r = Number(v); }
      if (op === "next") { const to = Math.floor(lab.y + 1e-9) + 1; lab.y = to % Q; lab.playing = false; glide(lab, from, to); }
      if (op === "prev") { const to = Math.ceil(lab.y - 1e-9) - 1; lab.y = (to + Q) % Q; lab.playing = false; glide(lab, from, to); }
      if (op === "play") { lab.playing = !lab.playing; lab.anim = null; lab.hold = 0; }
      if (op === "reset") { lab.playing = false; glide(lab, from, 0); lab.y = 0; }
    },
    // Play: sweep the frequency slowly. Step/back/reset: glide the hands to
    // the new frequency (the state already holds the new value).
    tick: function (lab) {
      if (lab.anim) {
        const t = Math.min(1, (Date.now() - lab.anim.t0) / lab.anim.ms), e = 1 - Math.pow(1 - t, 3);
        lab.anim.cur = lab.anim.from + (lab.anim.to - lab.anim.from) * e;
        if (t >= 1) lab.anim = null;
        return;
      }
      // Play: half a frequency step per second, with a short pause on each
      // whole number (the values a measurement can actually give).
      if (lab.hold && Date.now() < lab.hold) return false;
      const before = Math.floor(lab.y + 1e-9);
      lab.y = Math.round((lab.y + 0.02) * 100) / 100;
      if (Math.floor(lab.y + 1e-9) !== before) { lab.y = (before + 1) % Q; lab.hold = Date.now() + 700; }
      return true;
    },
    busy: function (lab) { return !!(lab.playing || lab.anim); },
    render: function (key, lab, compact) {
      const yy = lab.anim ? lab.anim.cur : lab.y, ys = ((yy % Q) + Q) % Q;
      const isInt = Math.abs(ys - Math.round(ys)) < 1e-9, yi = Math.round(ys) % Q;
      const vec = L.clockVectors(Q, lab.r, yy, X0);
      let sx = 0, sy = 0;
      vec.forEach(function (v) { sx += v.re; sy += v.im; });
      const frac = Math.sqrt(sx * sx + sy * sy) / vec.length;
      // Clocks: hand angle measured clockwise from 12 o'clock.
      const cw = 58, clocks = vec.map(function (v, i) {
        const cx = 30 + i * cw, cy = 34, R = 22, ang = Math.atan2(v.im, v.re);
        const hx = cx + R * 0.82 * Math.sin(ang), hy = cy - R * 0.82 * Math.cos(ang);
        return '<g><circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" class="clk"/>' +
          '<line x1="' + cx + '" y1="' + cy + '" x2="' + hx.toFixed(1) + '" y2="' + hy.toFixed(1) + '" class="clk-hand"/>' +
          '<circle cx="' + cx + '" cy="' + cy + '" r="2.5" class="clk-pin"/>' +
          '<text x="' + cx + '" y="' + (cy + R + 14) + '" text-anchor="middle" class="clk-lab">x=' + v.x + "</text></g>";
      }).join("");
      const clockW = Math.max(220, 30 + vec.length * cw);
      // Arrow sum, tip to tail.
      const step = 150 / Math.max(vec.length, 1);
      let px = 0, py = 0, arrows = "";
      vec.forEach(function (v) {
        const ang = Math.atan2(v.im, v.re), nx = px + step * Math.sin(ang), ny = py - step * Math.cos(ang);
        arrows += '<line x1="' + px.toFixed(1) + '" y1="' + py.toFixed(1) + '" x2="' + nx.toFixed(1) + '" y2="' + ny.toFixed(1) + '" class="arr" marker-end="url(#ah-' + key + ')"/>';
        px = nx; py = ny;
      });
      const res = '<line x1="0" y1="0" x2="' + px.toFixed(1) + '" y2="' + py.toFixed(1) + '" class="arr-sum" marker-end="url(#ahs-' + key + ')"/>';
      const sumSvg = '<svg class="sum-svg" viewBox="-170 -170 340 340" role="img" aria-label="Sum of the clock arrows: ' + Math.round(frac * 100) + ' percent of the maximum">' +
        '<defs><marker id="ah-' + key + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="arr-head"/></marker>' +
        '<marker id="ahs-' + key + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="arr-head-sum"/></marker></defs>' +
        '<circle cx="0" cy="0" r="150" class="sum-ring"/><circle cx="0" cy="0" r="3" class="clk-pin"/>' + arrows + (frac > 0.02 ? res : "") + "</svg>";
      // Probability of every whole-number frequency (the QFT output).
      const bars = [];
      for (let y = 0; y < Q; y++) bars.push(L.clockProbability(Q, lab.r, y, X0));
      const maxP = Math.max.apply(null, bars);
      const chart = '<div class="fchart" aria-hidden="true">' + bars.map(function (p, y) {
        return '<div class="fbar' + (isInt && y === yi ? " cur" : "") + '"><div class="fbar-fill" data-m="' + key + ':f' + y + '" data-mp="height" style="height:' + (p / maxP * 100) + '%"></div><span>' + y + "</span></div>";
      }).join("") + "</div>";
      const periods = [2, 3, 4, 8].map(function (r) {
        return btn(key, "r", r, String(r), { cls: "chip-btn" + (lab.r === r ? " on" : ""), pressed: lab.r === r, label: "Period " + r });
      }).join("");
      return '<div class="lab' + (compact ? " compact" : "") + '" data-lab-root="' + key + '" role="group" aria-label="Fourier clock demonstration">' +
        head("Fourier clock demonstration", "Exact QFT probabilities") +
        '<p class="lab-help">Each clock is one input x that survived measuring the work register (x = 1, 1 + r, 1 + 2r, …). For an outcome y, its hand shows the phase ω<sup>xy</sup>: it turns x·y/16 of a full circle. The Fourier transform adds the hands as arrows. When they all point the same way, the sum is long and y is a likely outcome.</p>' +
        (compact ? "" : '<p class="lab-note">Why y is called the frequency: each time x goes up by 1, the hand turns y/16 of a circle further, so y sets how fast the hands spin. ω = e<sup>2πi/16</sup> is not a frequency; it is the size of one step, 1/16 of a turn.</p>') +
        '<div class="clock-controls"><span class="ctl-group"><span class="bit-name">Period r</span>' + periods + "</span>" +
          '<span class="ctl-group">' + btn(key, "prev", undefined, "◀", { cls: "btn small", label: "Previous frequency" }) +
          '<span class="freq">frequency y = <b>' + (isInt ? yi : ys.toFixed(2)) + "</b></span>" +
          btn(key, "next", undefined, "▶", { cls: "btn small", label: "Next frequency (Step)" }) + "</span>" +
          '<span class="ctl-group">' + btn(key, "play", undefined, lab.playing ? "Pause" : "Play", { cls: "btn small primary" }) +
          btn(key, "next", undefined, "Step", { cls: "btn small" }) + btn(key, "reset", undefined, "Reset", { cls: "btn ghost small" }) + "</span></div>" +
        '<div class="clock-row"><svg class="clocks-svg" viewBox="0 0 ' + clockW + ' 78" role="img" aria-label="' + vec.length + ' clocks">' + clocks + "</svg></div>" +
        '<div class="clock-main"><div class="sum-box">' + sumSvg + '<p class="big-read">Arrow sum: <b>' + Math.round(frac * 100) + "%</b> of the maximum</p>" +
          '<p class="lab-note sum-note">' + (frac > 0.995 ? "All hands point the same way, so the arrows add up fully." : frac < 0.005 ? "The hands are spread evenly around the circle, so the arrows cancel." : "The hands partly agree, so the arrows partly add up.") + "</p></div>" +
          '<div class="chart-box"><p class="mini-head">Probability of each outcome y</p>' + chart +
          '<p class="lab-note">' + (isInt ? "P(y = " + yi + ") = <b>" + pct(bars[yi]) + "</b>." : "Between whole-number outcomes (only whole numbers can be measured).") +
          (lab.r === 3 ? " 16 is not a multiple of 3, so no frequency lines up perfectly." : " Peaks sit at multiples of 16/" + lab.r + " = " + (16 / lab.r) + ".") + "</p></div></div>" +
        "</div>";
    },
    summary: function (lab) { return "Period " + lab.r + ", frequency " + lab.y.toFixed(2) + "."; },
    checks: {
      "clock-align": function (lab) {
        if (Math.abs(lab.y - Math.round(lab.y)) > 1e-9) return { ok: false, msg: "Pause on a whole-number frequency first (use Step)." };
        const y = Math.round(lab.y) % Q;
        if (lab.r !== 4) return { ok: false, msg: "Set the period to 4 first." };
        if (y === 0) return { ok: false, msg: "Frequency 0 always lines up. Find another one." };
        if (y % 4 === 0) return { ok: true, msg: "At y = " + y + " every hand points the same way, so P(y) = 25%. The aligned frequencies 0, 4, 8, 12 are the multiples of 16/r." };
        return { ok: false, msg: "At y = " + y + " the hands spread out. Look for a multiple of 16/4." };
      },
      "clock-cancel": function (lab) {
        if (Math.abs(lab.y - Math.round(lab.y)) > 1e-9) return { ok: false, msg: "Pause on a whole-number frequency first (use Step)." };
        const y = Math.round(lab.y) % Q, p = L.clockProbability(Q, lab.r, y, X0);
        if (p < 1e-9) return { ok: true, msg: "At y = " + y + " the arrows form a closed loop and cancel exactly: this outcome never appears." };
        return { ok: false, msg: "At y = " + y + " the arrows still add up to something (P = " + pct(p) + "). Try another frequency." };
      },
      "clock-period8": function (lab) {
        if (Math.abs(lab.y - Math.round(lab.y)) > 1e-9) return { ok: false, msg: "Pause on a whole-number frequency first (use Step)." };
        const y = Math.round(lab.y) % Q;
        if (lab.r !== 8) return { ok: false, msg: "Set the period to 8 first." };
        if (y % 4 === 2) return { ok: true, msg: "With period 8 the peaks are 16/8 = 2 apart, so y = " + y + " lines up too. A smaller spacing between peaks means a bigger period." };
        if (y % 4 === 0) return { ok: false, msg: "That one lines up, but it is a multiple of 4. Find one that is not." };
        return { ok: false, msg: "At y = " + y + " the two hands point in different directions. Try another." };
      }
    }
  };

  root.QQLabs = LABS;
  root.QQ_VISUAL_TO_LAB = {
    "deutsch-hadamard-toggle": "qubit-lab",
    "dj-truth-table-toggle": "tt-lab",
    "bv-parity-toggle": "bv-lab",
    "simon-xor-pairs": "simon-lab",
    "grover-iterations-slider": "grover-lab",
    "shor-period-clocks": "clock-lab"
  };
})(window);
