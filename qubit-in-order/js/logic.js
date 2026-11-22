/* Qubit in Order: game logic with no screen code.
 *
 * Sections:
 *   1. Quiz: shuffling, drawing 10 questions of one difficulty, grading, points
 *   2. One-qubit helpers used by the Level 1 Qubit Lab
 *   3. A small exact quantum simulator (state vector, up to ~10 qubits)
 *   4. The circuit builder model and one checker per level
 *   5. Classical helpers (gcd, XOR dot products, fractions)
 *
 * Everything is a plain function, so tests.html can check it directly.
 */
(function (root) {
  "use strict";

  /* =====================================================================
   * 1. Quiz
   * ===================================================================== */

  // Fisher-Yates shuffle. Returns a NEW array.
  function shuffle(items, rng) {
    rng = rng || Math.random;
    const a = items.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // Shuffle a question's 4 options and track where the correct one went.
  function prepareQuestion(q, rng) {
    const mixed = shuffle(q.options.map(function (text, i) { return { text: text, correct: i === q.correctIndex }; }), rng);
    return {
      id: q.id, difficulty: q.difficulty, type: q.type, prompt: q.prompt,
      options: mixed.map(function (o) { return o.text; }),
      correctIndex: mixed.findIndex(function (o) { return o.correct; }),
      explanation: q.explanation, source: q.source, visual: q.visual || null
    };
  }

  const DIFFICULTY_POINTS = { easy: 1, medium: 2, hard: 3 };

  // Draw one attempt: `size` questions of a single difficulty.
  // Questions used in the previous attempt (avoidIds) are picked last, and
  // at least one interactive-visual question is included when one exists.
  function drawQuiz(bank, difficulty, size, rng, avoidIds) {
    rng = rng || Math.random;
    const avoid = new Set(avoidIds || []);
    const pool = bank.filter(function (q) { return q.difficulty === difficulty; });
    if (pool.length < size) {
      throw new Error("This level has " + pool.length + " " + difficulty + " questions but a quiz needs " + size + ".");
    }
    const ordered = shuffle(pool.filter(function (q) { return !avoid.has(q.id); }), rng)
      .concat(shuffle(pool.filter(function (q) { return avoid.has(q.id); }), rng));
    const picked = ordered.slice(0, size);
    // Include an interactive-visual question if one is left that was not in
    // the last attempt (a fresh retry never repeats a question to get one).
    if (!picked.some(function (q) { return q.visual; })) {
      const vis = ordered.slice(size).find(function (q) { return q.visual && !avoid.has(q.id); });
      if (vis) picked[picked.length - 1] = vis;
    }
    // Leave at least one visual question unused, so a fresh retry can have one too.
    const vInPick = picked.filter(function (q) { return q.visual; }).length;
    const vLeft = ordered.slice(size).filter(function (q) { return q.visual; }).length;
    if (vInPick > 1 && vLeft === 0) {
      const swapIn = ordered.slice(size).find(function (q) { return !q.visual && !avoid.has(q.id); });
      if (swapIn) {
        for (let i = picked.length - 1; i >= 0; i--) { if (picked[i].visual) { picked[i] = swapIn; break; } }
      }
    }
    return shuffle(picked, rng).map(function (q) { return prepareQuestion(q, rng); });
  }

  // Retry the same questions: same ids, new question order, new answer order.
  function redrawQuiz(bank, ids, rng) {
    rng = rng || Math.random;
    const byId = {};
    bank.forEach(function (q) { byId[q.id] = q; });
    const picked = ids.map(function (id) { return byId[id]; }).filter(Boolean);
    if (picked.length !== ids.length) throw new Error("Some questions from the last attempt are missing from the bank.");
    return shuffle(picked, rng).map(function (q) { return prepareQuestion(q, rng); });
  }

  function gradeQuiz(questions, answers, passCorrect) {
    let score = 0;
    const missed = [];
    questions.forEach(function (q, i) { if (answers[i] === q.correctIndex) score++; else missed.push(i); });
    return { score: score, total: questions.length, passed: score >= passCorrect, missed: missed };
  }

  function quizPoints(score, difficulty) { return score * (DIFFICULTY_POINTS[difficulty] || 0); }

  // A player's points: the best quiz attempt on each level, added up.
  function totalPoints(player) {
    if (!player || !player.levels) return 0;
    return Object.keys(player.levels).reduce(function (t, id) { return t + (player.levels[id].bestPoints || 0); }, 0);
  }

  // Top players by points (ties broken by modules completed, then name).
  function leaderboard(players, limit) {
    return Object.keys(players).map(function (id) {
      const p = players[id];
      const modules = Object.keys(p.levels || {}).filter(function (k) { return p.levels[k].completed; }).length;
      return { id: id, name: p.name, points: totalPoints(p), modules: modules };
    }).sort(function (a, b) {
      return b.points - a.points || b.modules - a.modules || a.name.localeCompare(b.name);
    }).slice(0, limit || 5);
  }

  /* =====================================================================
   * 2. One-qubit helpers (Level 1 Qubit Lab)
   * ===================================================================== */
  const R = Math.SQRT1_2;

  const FUNCTIONS = [
    { id: "A", f: [0, 0], type: "constant" },
    { id: "B", f: [1, 1], type: "constant" },
    { id: "C", f: [0, 1], type: "balanced" },
    { id: "D", f: [1, 0], type: "balanced" }
  ];

  function clean(x) {
    if (Math.abs(x) < 1e-12) return 0;
    if (Math.abs(Math.abs(x) - 1) < 1e-12) return Math.sign(x);
    if (Math.abs(Math.abs(x) - R) < 1e-12) return Math.sign(x) * R;
    if (Math.abs(Math.abs(x) - 0.5) < 1e-12) return Math.sign(x) * 0.5;
    return x;
  }

  function labState(stagesOn, f) {
    let a0 = 1, a1 = 0, t;
    if (stagesOn[0]) { t = R * (a0 + a1); a1 = R * (a0 - a1); a0 = t; }
    if (stagesOn[1]) { a0 *= f[0] ? -1 : 1; a1 *= f[1] ? -1 : 1; }
    if (stagesOn[2]) { t = R * (a0 + a1); a1 = R * (a0 - a1); a0 = t; }
    return [clean(a0), clean(a1)];
  }

  function formatAmp(x) {
    x = clean(x);
    if (x === 0) return "0";
    const sign = x < 0 ? "−" : "";
    const m = Math.abs(x);
    if (m === 1) return sign + "1";
    if (Math.abs(m - R) < 1e-12) return sign + "1/√2";
    return sign + m.toFixed(3);
  }

  function describeState(s) {
    const a0 = clean(s[0]), a1 = clean(s[1]);
    const terms = [];
    [[a0, "|0⟩"], [a1, "|1⟩"]].forEach(function (t) {
      const a = t[0];
      if (a === 0) return;
      const mag = Math.abs(a) === 1 ? "" : "(" + formatAmp(Math.abs(a)) + ")";
      terms.push(terms.length === 0 ? (a < 0 ? "−" : "") + mag + t[1] : (a < 0 ? " − " : " + ") + mag + t[1]);
    });
    let name = null, globalMinus = false;
    const close = function (x, y) { return Math.abs(x - y) < 1e-9; };
    [[[1, 0], "|0⟩"], [[0, 1], "|1⟩"], [[R, R], "|+⟩"], [[R, -R], "|−⟩"]].forEach(function (sh) {
      if (close(a0, sh[0][0]) && close(a1, sh[0][1])) name = sh[1];
      else if (close(a0, -sh[0][0]) && close(a1, -sh[0][1])) { name = "−" + sh[1]; globalMinus = true; }
    });
    return { text: terms.join(""), name: name, globalMinus: globalMinus };
  }

  /* =====================================================================
   * 3. Exact state-vector simulator
   *
   * n qubits, 2^n complex amplitudes stored as two arrays (re, im).
   * Qubit 0 is the TOP wire and the LEFTMOST bit of a bit string, so the
   * basis state "110" means qubit 0 = 1, qubit 1 = 1, qubit 2 = 0.
   * ===================================================================== */

  function newState(n, initBits) {
    const N = 1 << n;
    const re = new Float64Array(N), im = new Float64Array(N);
    re[initBits || 0] = 1;
    return { n: n, re: re, im: im };
  }

  function bitOf(n, q) { return 1 << (n - 1 - q); }

  // Read the bits of index i on the listed qubits as an integer (first qubit = most significant).
  function bitsOn(i, qubits, n) {
    let x = 0;
    for (let k = 0; k < qubits.length; k++) x = (x << 1) | ((i >> (n - 1 - qubits[k])) & 1);
    return x;
  }
  function withBits(i, qubits, n, x) {
    const m = qubits.length;
    for (let k = 0; k < m; k++) {
      const b = bitOf(n, qubits[k]);
      if ((x >> (m - 1 - k)) & 1) i |= b; else i &= ~b;
    }
    return i;
  }

  // 2x2 gate matrices as [m00, m01, m10, m11], each [re, im].
  const GATES = {
    H: [[R, 0], [R, 0], [R, 0], [-R, 0]],
    X: [[0, 0], [1, 0], [1, 0], [0, 0]],
    Y: [[0, 0], [0, -1], [0, 1], [0, 0]],
    Z: [[1, 0], [0, 0], [0, 0], [-1, 0]],
    S: [[1, 0], [0, 0], [0, 0], [0, 1]]
  };

  // Apply a 2x2 gate to qubit q, only where every control qubit is 1.
  function applyGate(st, name, q, controls) {
    const M = GATES[name];
    if (!M) throw new Error("Unknown gate " + name);
    const n = st.n, N = 1 << n, t = bitOf(n, q);
    let cmask = 0;
    (controls || []).forEach(function (c) { cmask |= bitOf(n, c); });
    const re = st.re, im = st.im;
    for (let i = 0; i < N; i++) {
      if (i & t) continue;
      if ((i & cmask) !== cmask) continue;
      const j = i | t;
      const ar = re[i], ai = im[i], br = re[j], bi = im[j];
      re[i] = M[0][0] * ar - M[0][1] * ai + M[1][0] * br - M[1][1] * bi;
      im[i] = M[0][0] * ai + M[0][1] * ar + M[1][0] * bi + M[1][1] * br;
      re[j] = M[2][0] * ar - M[2][1] * ai + M[3][0] * br - M[3][1] * bi;
      im[j] = M[2][0] * ai + M[2][1] * ar + M[3][0] * bi + M[3][1] * br;
    }
  }

  // Phase oracle: multiply |x⟩ by (−1)^f(x), where x is read from `qubits`.
  function applyPhaseOracle(st, qubits, f) {
    const N = 1 << st.n;
    for (let i = 0; i < N; i++) {
      if (f[bitsOn(i, qubits, st.n)]) { st.re[i] = -st.re[i]; st.im[i] = -st.im[i]; }
    }
  }

  // Apply a permutation of basis states: new[map(i)] = old[i].
  function permute(st, map) {
    const N = 1 << st.n;
    const re = new Float64Array(N), im = new Float64Array(N);
    for (let i = 0; i < N; i++) { const j = map(i); re[j] = st.re[i]; im[j] = st.im[i]; }
    st.re = re; st.im = im;
  }

  // Function oracle |x⟩|y⟩ → |x⟩|y XOR f(x)⟩ (used by Simon).
  function applyXorOracle(st, inQ, outQ, f) {
    const n = st.n;
    permute(st, function (i) {
      return withBits(i, outQ, n, bitsOn(i, outQ, n) ^ f[bitsOn(i, inQ, n)]);
    });
  }

  // Controlled modular multiplication |x⟩|w⟩ → |x⟩|w·a^x mod N⟩ (for w < N).
  function applyModExp(st, xQ, wQ, a, N) {
    const n = st.n;
    permute(st, function (i) {
      const x = bitsOn(i, xQ, n), w = bitsOn(i, wQ, n);
      return w < N ? withBits(i, wQ, n, (w * powMod(a, x, N)) % N) : i;
    });
  }

  // Run fn(indices) for every assignment of the qubits NOT in `qubits`;
  // indices[x] is the full index whose `qubits` bits equal x.
  function forEachGroup(st, qubits, fn) {
    const n = st.n, N = 1 << n, M = 1 << qubits.length;
    let mask = 0;
    qubits.forEach(function (q) { mask |= bitOf(n, q); });
    const idx = new Array(M);
    for (let base = 0; base < N; base++) {
      if (base & mask) continue;
      for (let x = 0; x < M; x++) idx[x] = withBits(base, qubits, n, x);
      fn(idx);
    }
  }

  // Grover diffusion on `qubits`: reflect every amplitude about the mean.
  function applyDiffusion(st, qubits) {
    forEachGroup(st, qubits, function (idx) {
      let mr = 0, mi = 0;
      idx.forEach(function (i) { mr += st.re[i]; mi += st.im[i]; });
      mr /= idx.length; mi /= idx.length;
      idx.forEach(function (i) { st.re[i] = 2 * mr - st.re[i]; st.im[i] = 2 * mi - st.im[i]; });
    });
  }

  // Quantum Fourier transform (sign +1) or inverse QFT (sign −1) on `qubits`.
  function applyQFT(st, qubits, sign) {
    const M = 1 << qubits.length;
    forEachGroup(st, qubits, function (idx) {
      const vr = idx.map(function (i) { return st.re[i]; }), vi = idx.map(function (i) { return st.im[i]; });
      for (let y = 0; y < M; y++) {
        let sr = 0, si = 0;
        for (let x = 0; x < M; x++) {
          const ang = sign * 2 * Math.PI * x * y / M, c = Math.cos(ang), s = Math.sin(ang);
          sr += vr[x] * c - vi[x] * s;
          si += vr[x] * s + vi[x] * c;
        }
        st.re[idx[y]] = sr / Math.sqrt(M);
        st.im[idx[y]] = si / Math.sqrt(M);
      }
    });
  }

  // Probability of each outcome on the listed qubits.
  function probabilities(st, qubits) {
    const out = new Array(1 << qubits.length).fill(0);
    const N = 1 << st.n;
    for (let i = 0; i < N; i++) out[bitsOn(i, qubits, st.n)] += st.re[i] * st.re[i] + st.im[i] * st.im[i];
    return out.map(function (p) { return p < 1e-12 ? 0 : (Math.abs(p - 1) < 1e-12 ? 1 : p); });
  }

  /* =====================================================================
   * 4. Circuit builder model
   *
   * A level's `build` describes rows (wires) and columns (time steps).
   *   rows[k] = { label, size (qubits, default 1), editable, init (bit string) }
   * A circuit the player builds is { cells, macros }:
   *   cells[c][r]  = "H" | "X" | "Y" | "Z" | "S" | "C" (control dot) | null
   *   macros[c]    = id of an algorithm block filling column c, or null
   * In a column, every gate is controlled by every control dot in that column
   * (so a dot plus Pauli-X is a CNOT, a dot plus Pauli-Z is a CZ, and so on).
   * ===================================================================== */

  function layout(build) {
    let q = 0;
    const rowQubits = build.rows.map(function (row) {
      const size = row.size || 1, list = [];
      for (let k = 0; k < size; k++) list.push(q++);
      return list;
    });
    let init = 0;
    build.rows.forEach(function (row, r) {
      if (row.init) withBitsInto(row.init);
      function withBitsInto(bits) { init = withBits(init, rowQubits[r], q, parseInt(bits, 2)); }
    });
    return { n: q, rowQubits: rowQubits, init: init };
  }

  function emptyCircuit(build) {
    const cells = [], macros = [];
    for (let c = 0; c < build.cols; c++) { cells.push(build.rows.map(function () { return null; })); macros.push(null); }
    return { cells: cells, macros: macros };
  }

  function cloneCircuit(circ) {
    return { cells: circ.cells.map(function (col) { return col.slice(); }), macros: circ.macros.slice() };
  }

  function macroDef(build, id) {
    return build.macros.find(function (m) { return m.id === id; });
  }

  function qubitsOfRows(lay, rows) {
    return rows.reduce(function (acc, r) { return acc.concat(lay.rowQubits[r]); }, []);
  }

  // Run the player's circuit for one test case. Returns the final state.
  function runBuild(build, circ, testCase) {
    const lay = layout(build);
    const st = newState(lay.n, lay.init);
    for (let c = 0; c < build.cols; c++) {
      const mid = circ.macros[c];
      if (mid) {
        const m = macroDef(build, mid);
        applyMacro(st, m, qubitsOfRows(lay, m.rows), lay, testCase);
        continue;
      }
      const col = circ.cells[c];
      const controls = [];
      col.forEach(function (g, r) { if (g === "C") controls.push(lay.rowQubits[r][0]); });
      col.forEach(function (g, r) {
        if (g && g !== "C") applyGate(st, g, lay.rowQubits[r][0], controls);
      });
    }
    return { state: st, layout: lay };
  }

  function applyMacro(st, m, qubits, lay, tc) {
    switch (m.op) {
      case "phase-oracle": applyPhaseOracle(st, qubits, tc.f); break;
      case "xor-oracle": {
        const inQ = qubitsOfRows(lay, m.inRows), outQ = qubitsOfRows(lay, m.outRows);
        applyXorOracle(st, inQ, outQ, tc.f);
        break;
      }
      case "mark": applyPhaseOracle(st, qubits, tc.f); break;
      case "diffusion": applyDiffusion(st, qubits); break;
      case "modexp": applyModExp(st, qubitsOfRows(lay, m.inRows), qubitsOfRows(lay, m.outRows), m.a, m.N); break;
      case "qft": applyQFT(st, qubits, +1); break;
      case "iqft": applyQFT(st, qubits, -1); break;
      default: throw new Error("Unknown block " + m.op);
    }
  }

  function measuredProbs(build, circ, tc) {
    const run = runBuild(build, circ, tc);
    return probabilities(run.state, qubitsOfRows(run.layout, build.measureRows));
  }

  function countMacro(circ, build, op) {
    return circ.macros.filter(function (id) { return id && macroDef(build, id).op === op; }).length;
  }
  function countAnyMacro(circ, build, ops) {
    return circ.macros.filter(function (id) { return id && ops.indexOf(macroDef(build, id).op) >= 0; }).length;
  }

  function bin(x, width) { let s = x.toString(2); while (s.length < width) s = "0" + s; return s; }
  function pctText(p) { return (Math.round(p * 1000) / 10).toString().replace(/\.0$/, "") + "%"; }
  function near(a, b) { return Math.abs(a - b) < 1e-9; }

  // Summarise an outcome distribution like "always 01" or "00: 50%, 11: 50%".
  function describeDist(probs, width) {
    const list = probs.map(function (p, y) { return { y: y, p: p }; }).filter(function (o) { return o.p > 1e-9; })
      .sort(function (a, b) { return b.p - a.p; });
    if (list.length === 1) return "always " + bin(list[0].y, width);
    const shown = list.slice(0, 4).map(function (o) { return bin(o.y, width) + ": " + pctText(o.p); }).join(", ");
    return shown + (list.length > 4 ? ", ..." : "");
  }

  /* ---------- Test cases for each level ---------- */

  function allTruthTables(n) {
    const M = 1 << n, out = [];
    for (let k = 0; k < (1 << M); k++) {
      const f = [];
      for (let x = 0; x < M; x++) f.push((k >> (M - 1 - x)) & 1);
      out.push(f);
    }
    return out;
  }
  function ones(f) { return f.reduce(function (a, b) { return a + b; }, 0); }
  function dot2(a, b) { let x = a & b, c = 0; while (x) { c ^= x & 1; x >>= 1; } return c; }
  function simonFunction(s, n) {
    const f = [];
    for (let x = 0; x < (1 << n); x++) f.push(Math.min(x, x ^ s));
    return f;
  }

  /* ---------- Checkers ----------
   * Each returns { ok, message, table: { head: [...], rows: [[...]] }, verdict }.
   * They test the player's circuit against EVERY possible mystery box for the
   * level, so any circuit that truly works passes, and nothing else does.
   */
  const CHECKERS = {

    deutsch: function (build, circ) {
      const oracle = countMacro(circ, build, "phase-oracle");
      const cases = FUNCTIONS.map(function (fn) {
        const p = measuredProbs(build, circ, { f: fn.f });
        return { fn: fn, p1: p[1] };
      });
      const table = {
        head: ["Box", "f(0)", "f(1)", "Type", "Measurement"],
        rows: cases.map(function (c) {
          return ["Box " + c.fn.id, c.fn.f[0], c.fn.f[1], c.fn.type,
            c.p1 === 0 ? "always 0" : c.p1 === 1 ? "always 1" : "0: " + pctText(1 - c.p1) + ", 1: " + pctText(c.p1)];
        })
      };
      const want = function (c) { return c.fn.type === "constant" ? 0 : 1; };
      const works = cases.every(function (c) { return near(c.p1, want(c)); });
      const reversed = cases.every(function (c) { return near(c.p1, 1 - want(c)); });
      const sameForAll = cases.every(function (c) { return near(c.p1, cases[0].p1); });
      let msg = null;
      if (oracle === 0) msg = "Your circuit never uses the phase oracle U_f, so it never asks the mystery box anything.";
      else if (oracle > 1) msg = "You used U_f " + oracle + " times. Deutsch's algorithm answers with a single query.";
      else if (works) return { ok: true, table: table, verdict: "Constant boxes always give 0 and balanced boxes always give 1, using one query." };
      else if (reversed) msg = "Your circuit tells the boxes apart, but with the labels swapped (constant gives 1). Remove the extra gate so that constant gives 0, as in the lesson.";
      else if (sameForAll) msg = "Every box gives the same result, so the circuit learns nothing about f. Does the oracle receive a superposition of |0⟩ and |1⟩?";
      else if (cases.some(function (c) { return c.p1 > 1e-9 && c.p1 < 1 - 1e-9; })) msg = "Some boxes give random results. The oracle leaves its answer in a sign; something after the oracle has to turn that sign into a definite 0 or 1.";
      else msg = "This circuit does not separate constant from balanced boxes. Try a hint.";
      return { ok: false, message: msg, table: table, verdict: "Not yet: constant must always give 0 and balanced must always give 1." };
    },

    deutsch_jozsa: function (build, circ) {
      const oracle = countMacro(circ, build, "phase-oracle");
      const fs = allTruthTables(2).filter(function (f) { const k = ones(f); return k === 0 || k === 4 || k === 2; });
      const cases = fs.map(function (f) {
        const p = measuredProbs(build, circ, { f: f });
        return { f: f, type: ones(f) === 2 ? "balanced" : "constant", p: p };
      });
      const table = {
        head: ["Outputs f(00..11)", "Type", "Measurement", "P(00)"],
        rows: cases.map(function (c) { return [c.f.join(" "), c.type, describeDist(c.p, 2), pctText(c.p[0])]; })
      };
      const works = cases.every(function (c) { return near(c.p[0], c.type === "constant" ? 1 : 0); });
      let msg = null;
      if (oracle === 0) msg = "Your circuit never uses the phase oracle, so it never asks the box anything.";
      else if (oracle > 1) msg = "You used the oracle " + oracle + " times. Deutsch-Jozsa needs exactly one query.";
      else if (works) return { ok: true, table: table, verdict: "Constant functions always give 00 and balanced functions never do, using one query." };
      else if (cases.every(function (c) { return near(c.p[0], 1); })) msg = "Every function gives 00, so the circuit learns nothing. The oracle needs a superposition of all four inputs to act on.";
      else if (cases.some(function (c) { return c.type === "constant" && !near(c.p[0], 1); })) msg = "A constant function should give 00 with certainty, but yours does not. Each input qubit needs to be prepared before the oracle and interfered after it.";
      else msg = "Some balanced functions still give 00. Every input qubit needs the same treatment after the oracle.";
      return { ok: false, message: msg, table: table, verdict: "Not yet: constant must always give 00, balanced must never give 00." };
    },

    bernstein_vazirani: function (build, circ) {
      const oracle = countMacro(circ, build, "phase-oracle");
      const cases = [];
      for (let s = 0; s < 8; s++) {
        const f = [];
        for (let x = 0; x < 8; x++) f.push(dot2(s, x));
        cases.push({ s: s, p: measuredProbs(build, circ, { f: f }) });
      }
      const table = {
        head: ["Secret s", "Measurement", "P(result = s)"],
        rows: cases.map(function (c) { return [bin(c.s, 3), describeDist(c.p, 3), pctText(c.p[c.s])]; })
      };
      const works = cases.every(function (c) { return near(c.p[c.s], 1); });
      let msg = null;
      if (oracle === 0) msg = "Your circuit never uses the secret oracle, so it cannot learn anything about s.";
      else if (oracle > 1) msg = "You used the oracle " + oracle + " times. Bernstein-Vazirani finds s with a single query.";
      else if (works) return { ok: true, table: table, verdict: "For all 8 secrets the circuit outputs s with certainty, using one query." };
      else {
        // Which qubits fail to reveal their bit of s?
        const bad = [0, 1, 2].filter(function (q) {
          return cases.some(function (c) {
            let pr = 0;
            c.p.forEach(function (p, y) { if (((y >> (2 - q)) & 1) === ((c.s >> (2 - q)) & 1)) pr += p; });
            return !near(pr, 1);
          });
        });
        if (cases.every(function (c) { return near(c.p[0], 1); })) msg = "Every secret gives 000, so the circuit learns nothing. The oracle needs a superposition of inputs.";
        else msg = "Not every bit of s comes out right. Check wire" + (bad.length > 1 ? "s " : " ") + bad.map(function (q) { return String(q + 1); }).join(" and ") +
          " (counting from the top): each input qubit needs the same gates before and after the oracle.";
      }
      return { ok: false, message: msg, table: table, verdict: "Not yet: the measurement must equal s for every secret." };
    },

    simon: function (build, circ) {
      const oracle = countMacro(circ, build, "xor-oracle");
      const cases = [];
      for (let s = 1; s < 8; s++) cases.push({ s: s, p: measuredProbs(build, circ, { f: simonFunction(s, 3) }) });
      function verdictFor(c) {
        const support = c.p.map(function (p, y) { return p > 1e-9 ? y : -1; }).filter(function (y) { return y >= 0; });
        const allOrth = support.every(function (y) { return dot2(y, c.s) === 0; });
        const full = support.length === 4 && support.every(function (y) { return near(c.p[y], 0.25); });
        return { support: support, allOrth: allOrth, full: full };
      }
      const info = cases.map(verdictFor);
      const table = {
        head: ["Mask s", "Possible measured y", "All satisfy y·s = 0?"],
        rows: cases.map(function (c, i) {
          return [bin(c.s, 3), info[i].support.map(function (y) { return bin(y, 3); }).join(", "), info[i].allOrth ? "yes" : "no"];
        })
      };
      let msg = null;
      if (oracle === 0) msg = "Your circuit never uses the oracle, so it never learns anything about f.";
      else if (oracle > 1) msg = "Use the oracle once per run. Simon's algorithm repeats the whole circuit instead.";
      else if (info.every(function (v) { return v.allOrth && v.full; })) {
        return { ok: true, table: table, verdict: "Every measured y satisfies y·s = 0, and all four such strings appear equally often." };
      } else if (info.every(function (v) { return v.support.length === 1 && v.support[0] === 0; })) {
        msg = "Every run measures 000, which gives no information about s. The input register needs a superposition before the oracle.";
      } else if (info.some(function (v) { return !v.allOrth; })) {
        msg = "Some measured strings break the rule y·s = 0, so they are not valid equations. The input register needs a superposition before the oracle and interference after it.";
      } else {
        msg = "Your samples obey y·s = 0 but do not cover all the possibilities, so some masks could never be pinned down. Treat every input qubit the same way.";
      }
      return { ok: false, message: msg, table: table, verdict: "Not yet: every measured y must satisfy y·s = 0." };
    },

    grover: function (build, circ) {
      const oracle = countMacro(circ, build, "mark"), diff = countMacro(circ, build, "diffusion");
      const cases = [];
      for (let m = 0; m < 8; m++) {
        const f = []; for (let x = 0; x < 8; x++) f.push(x === m ? 1 : 0);
        cases.push({ m: m, p: measuredProbs(build, circ, { f: f }) });
      }
      const worst = Math.min.apply(null, cases.map(function (c) { return c.p[c.m]; }));
      const table = {
        head: ["Marked item", "P(measure the marked item)"],
        rows: cases.map(function (c) { return [bin(c.m, 3), pctText(c.p[c.m])]; })
      };
      if (worst >= 0.9 - 1e-9) {
        return { ok: true, table: table, verdict: "The marked item is found with probability " + pctText(worst) + " whichever item is marked (" + oracle + " oracle queries)." };
      }
      let msg;
      if (oracle === 0) msg = "Your circuit never uses the marking oracle, so it cannot know which item is marked.";
      else if (diff === 0) msg = "The oracle only flips a sign, which changes no probability by itself. Something has to turn that sign into a bigger amplitude.";
      else if (cases.every(function (c) { return near(c.p[c.m], c.p[(c.m + 1) % 8]); })) msg = "Every item is equally likely, so nothing was amplified. Start from an equal superposition of all 8 items.";
      else if (oracle >= 3) msg = "Success is only " + pctText(worst) + ". Too many rounds overshoot the best point. Try fewer.";
      else msg = "Success is only " + pctText(worst) + ". Aim for at least 90%. One round is not enough for 8 items.";
      return { ok: false, message: msg, table: table, verdict: "Not yet: worst-case success is " + pctText(worst) + " (target: at least 90%)." };
    },

    shor: function (build, circ) {
      const mod = countMacro(circ, build, "modexp"), ft = countAnyMacro(circ, build, ["qft", "iqft"]);
      const p = measuredProbs(build, circ, {});
      const peaks = [0, 4, 8, 12];
      const works = peaks.every(function (y) { return near(p[y], 0.25); });
      const table = {
        head: ["Measured y", "Probability", "y / 16"],
        rows: p.map(function (pr, y) { return { y: y, pr: pr }; }).filter(function (o) { return o.pr > 1e-6; })
          .sort(function (a, b) { return b.pr - a.pr; }).slice(0, 8)
          .map(function (o) { return [String(o.y), pctText(o.pr), o.y + "/16"]; })
      };
      if (works && mod === 1) return { ok: true, table: table, verdict: "The counting register gives only 0, 4, 8 or 12, each 25%: multiples of 16/4, which reveal the period r = 4." };
      let msg;
      if (mod === 0) msg = "Your circuit never computes 2^x mod 15, so there is no periodic pattern to find.";
      else if (mod > 1) msg = "Use the modular exponentiation block once.";
      else if (ft === 0) msg = "The period is hidden in the phases of the counting register. A Fourier transform is needed to turn it into sharp peaks.";
      else if (near(p[0], 1)) msg = "You always measure 0, which tells you nothing. The counting register needs a superposition of all exponents x before the modular exponentiation.";
      else msg = "The outcomes are not the clean peaks at 0, 4, 8, 12. Check the order: prepare the exponents, compute 2^x mod 15, then transform.";
      return { ok: false, message: msg, table: table, verdict: "Not yet: the counting register should show peaks at multiples of 4." };
    }
  };

  function checkCircuit(levelId, build, circ) {
    return CHECKERS[levelId](build, circ);
  }

  /* =====================================================================
   * 5. Classical helpers
   * ===================================================================== */
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a; }
  function powMod(a, e, m) { let r = 1 % m; a %= m; while (e > 0) { if (e & 1) r = (r * a) % m; a = (a * a) % m; e >>= 1; } return r; }
  function reduceFraction(p, q) { if (p === 0) return [0, 1]; const g = gcd(p, q); return [p / g, q / g]; }

  // Draw one outcome from a probability list.
  function sample(probs, rng) {
    rng = rng || Math.random;
    let u = rng(), acc = 0;
    for (let i = 0; i < probs.length; i++) { acc += probs[i]; if (u < acc) return i; }
    for (let i = probs.length - 1; i >= 0; i--) if (probs[i] > 0) return i;
    return 0;
  }

  // Nonzero 3-bit masks consistent with every equation y·s = 0.
  function simonCandidates(ys, n) {
    const out = [];
    for (let s = 1; s < (1 << n); s++) if (ys.every(function (y) { return dot2(y, s) === 0; })) out.push(s);
    return out;
  }

  /* ---------- Small closed-form helpers used by the labs ---------- */

  // Grover on N items, one marked: success after t ideal iterations.
  function groverSuccess(N, t) { const th = Math.asin(1 / Math.sqrt(N)); return Math.pow(Math.sin((2 * t + 1) * th), 2); }

  // Clock analogy: phase vectors e^{2πi x y / Q} for x = x0, x0+r, x0+2r, ... < Q.
  function clockVectors(Q, r, y, x0) {
    const out = [];
    for (let x = x0; x < Q; x += r) {
      const ang = 2 * Math.PI * x * y / Q;
      out.push({ x: x, re: Math.cos(ang), im: Math.sin(ang) });
    }
    return out;
  }
  // QFT output probability of frequency y for the periodic state above.
  function clockProbability(Q, r, y, x0) {
    const v = clockVectors(Q, r, y, x0);
    let sr = 0, si = 0;
    v.forEach(function (a) { sr += a.re; si += a.im; });
    return (sr * sr + si * si) / (Q * v.length);
  }

  const api = {
    shuffle: shuffle, prepareQuestion: prepareQuestion, drawQuiz: drawQuiz, redrawQuiz: redrawQuiz, gradeQuiz: gradeQuiz,
    DIFFICULTY_POINTS: DIFFICULTY_POINTS, quizPoints: quizPoints, totalPoints: totalPoints, leaderboard: leaderboard,
    FUNCTIONS: FUNCTIONS, labState: labState, formatAmp: formatAmp, describeState: describeState,
    newState: newState, applyGate: applyGate, applyPhaseOracle: applyPhaseOracle, applyXorOracle: applyXorOracle,
    applyModExp: applyModExp, applyDiffusion: applyDiffusion, applyQFT: applyQFT, probabilities: probabilities,
    layout: layout, emptyCircuit: emptyCircuit, cloneCircuit: cloneCircuit, macroDef: macroDef,
    runBuild: runBuild, measuredProbs: measuredProbs, checkCircuit: checkCircuit, countMacro: countMacro,
    simonFunction: simonFunction, allTruthTables: allTruthTables, describeDist: describeDist,
    gcd: gcd, powMod: powMod, reduceFraction: reduceFraction, sample: sample, dot2: dot2, bin: bin, pctText: pctText,
    simonCandidates: simonCandidates, groverSuccess: groverSuccess, clockVectors: clockVectors, clockProbability: clockProbability
  };
  root.QQLogic = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
