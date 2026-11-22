/* Qubit in Order: screens, buttons, players and saved progress.
 *
 * How this file works, in four ideas:
 *   1. `progress` is what we save in the browser (players, their points and
 *      modules). `ui` is everything about the current screen (not saved).
 *   2. Each screen is a function that returns an HTML string
 *      (viewHome, viewLearn, viewQuiz, viewBuild, ...). render() shows it.
 *   3. Buttons carry data-action="something". One click listener looks up
 *      actions[something], runs it, then calls render().
 *   4. Rules and math live in logic.js, the labs in labs.js, and small display
 *      helpers in ui.js.
 */
(function () {
  "use strict";

  const L = window.QQLogic, U = window.QQUI, LABS = window.QQLabs, VIS = window.QQ_VISUAL_TO_LAB, M = window.QQMotion;
  const LEVELS = window.QQ_LEVELS, QUESTIONS = window.QQ_QUESTIONS, GATES = window.QQ_GATES;
  const esc = U.esc, fmt = U.fmt, plain = U.plain, pct = U.pct, bits = U.bits;
  const SAVE_KEY = "quantum-quest-save-v3";
  const STEPS = [{ id: "learn", label: "Learn" }, { id: "explore", label: "Explore" }, { id: "quiz", label: "Quiz" }, { id: "build", label: "Build" }];
  const DIFFS = [
    { id: "easy", label: "Easy", pts: 1, text: "Simpler, fundamental questions" },
    { id: "medium", label: "Medium", pts: 2, text: "More applied questions" },
    { id: "hard", label: "Hard", pts: 3, text: "Intensive, worked-out questions" }
  ];
  const CAPTION = { H: "Hadamard", X: "Pauli-X", Y: "Pauli-Y", Z: "Pauli-Z", S: "Phase S", C: "Control" };

  const app = document.getElementById("app");
  const announcer = document.getElementById("announcer");

  /* ================= Saved progress (players) ================= */

  function emptyProgress() { return { version: 3, current: null, players: {}, settings: defaultSettings() }; }
  // Device-wide settings. newQuestionsOnRetry: after a failed quiz, the next
  // try draws different questions (true) or the same ones reshuffled (false).
  function defaultSettings() { return { newQuestionsOnRetry: true }; }

  function cleanRecord(r) {
    const okInt = function (v, max) { return Number.isInteger(v) && v >= 0 && v <= max ? v : 0; };
    return {
      quizPassed: r.quizPassed === true,
      bestScore: okInt(r.bestScore, 100),
      bestPoints: okInt(r.bestPoints, 1000),
      bestDifficulty: ["easy", "medium", "hard"].indexOf(r.bestDifficulty) >= 0 ? r.bestDifficulty : null,
      completed: r.completed === true
    };
  }

  function loadProgress() {
    try {
      const raw = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (!raw || raw.version !== 3 || typeof raw.players !== "object") return emptyProgress();
      const out = emptyProgress();
      Object.keys(raw.players).forEach(function (id) {
        const p = raw.players[id];
        if (!p || typeof p.name !== "string" || !p.name.trim()) return;
        const levels = {};
        LEVELS.forEach(function (lv) { if (p.levels && p.levels[lv.id]) levels[lv.id] = cleanRecord(p.levels[lv.id]); });
        out.players[id] = { name: p.name.trim().slice(0, 20), difficulty: ["easy", "medium", "hard"].indexOf(p.difficulty) >= 0 ? p.difficulty : "medium", levels: levels };
      });
      if (raw.current && out.players[raw.current]) out.current = raw.current;
      if (raw.settings && raw.settings.newQuestionsOnRetry === false) out.settings.newQuestionsOnRetry = false;
      return out;
    } catch (e) {
      return emptyProgress();
    }
  }
  function saveProgress() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(progress)); } catch (e) { /* private mode: play without saving */ } }

  let progress = loadProgress();

  function player() { return progress.current ? progress.players[progress.current] : null; }
  function record(levelId) {
    const p = player();
    if (!p) return cleanRecord({});
    if (!p.levels[levelId]) p.levels[levelId] = cleanRecord({});
    return p.levels[levelId];
  }
  function isCompleted(lv) { const p = player(); return !!(p && p.levels[lv.id] && p.levels[lv.id].completed); }
  function modulesEarned() { return LEVELS.filter(isCompleted).length; }
  function myPoints() { return L.totalPoints(player()); }
  function myRank() {
    if (!progress.current) return null;
    const all = L.leaderboard(progress.players, 1000);
    const i = all.findIndex(function (e) { return e.id === progress.current; });
    return i >= 0 ? i + 1 : null;
  }

  /* ================= Screen state ================= */

  const ui = {
    screen: "home",          // home | level | reward | finale
    levelIndex: 0,
    step: "learn",
    lessonPage: 0,
    labs: {},                // lab settings by key ("explore", "quiz")
    challenges: {},          // lab challenge results per level
    quiz: null,
    quizError: null,
    lastQuizIds: {},         // question ids of the last attempt, by player + level + difficulty
    failedQuiz: {},          // same keys: true while the last attempt there was a fail
    poweredOn: {},           // power-on animation already shown (by player and screen)
    build: null,
    pickPlayer: false,
    nameError: null,
    logos: { princeton: false, psq: false },
    focus: null,
    scrollTop: false
  };

  function level() { return LEVELS[ui.levelIndex]; }
  function announce(msg) { announcer.textContent = ""; setTimeout(function () { announcer.textContent = msg; }, 30); }

  /* ================= Pictures ================= */

  /* The main picture: an original line drawing of a dilution-refrigerator
   * quantum computer (the "chandelier"). Its six cooling plates are the six
   * module slots: an installed module lights its plate orange and fills in its
   * callout label. Drawn in thin lines with no background, so it sits directly
   * on the page. */
  // power: seconds since the power-on sequence started (null when not playing).
  function computerSVG(highlightId, glow, power) {
    const n = modulesEarned(), online = n === LEVELS.length;
    if (!online) power = null;
    const cx = 170, f = function (v) { return Math.round(v * 10) / 10; };
    let s = "";
    const L = function (x1, y1, x2, y2, cls) { s += '<line x1="' + f(x1) + '" y1="' + f(y1) + '" x2="' + f(x2) + '" y2="' + f(y2) + '" class="' + (cls || "cl") + '"/>'; };
    const R = function (x, y, w, h, cls) { s += '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" class="' + (cls || "cf") + '"/>'; };
    const C = function (x, y, r, cls) { s += '<circle cx="' + f(x) + '" cy="' + f(y) + '" r="' + r + '" class="' + (cls || "cl") + '"/>'; };
    const P = function (d, cls) { s += '<path d="' + d + '" class="' + (cls || "cl") + '"/>'; };

    // Room-temperature hardware above the top flange
    [-118, -110, 110, 118].forEach(function (dx) { L(cx + dx, 0, cx + dx, 58); });
    [-114, 114].forEach(function (dx) { C(cx + dx, 46, 5.5); C(cx + dx, 46, 2.2); });
    R(cx - 36, 24, 72, 34); R(cx - 26, 12, 52, 12); R(cx - 7, 2, 14, 10);
    for (let k = 0; k < 4; k++) { R(cx - 31 + k * 16, 38, 14, 18); L(cx - 27 + k * 16, 41, cx - 27 + k * 16, 53, "cl thin"); L(cx - 21 + k * 16, 41, cx - 21 + k * 16, 53, "cl thin"); }
    P("M" + (cx + 12) + " 0 q 10 3 0 6 q -10 3 0 6 q 10 3 0 6 q -10 3 0 6");
    for (let k = 0; k < 7; k++) L(cx + 62 + k * 2.6, 0, cx + 62 + k * 2.6, 58, "cl thin");
    R(cx - 92, 40, 28, 18); R(cx + 46, 44, 30, 14);
    R(cx - 150, 58, 300, 9); R(cx - 140, 67, 280, 4);

    // Six stage plates, narrowing toward the cold end
    const stages = LEVELS.map(function (lv, i) { return { lv: lv, y: 122 + i * 54, hw: 130 - i * 10 }; });
    const gaps = [{ y0: 71, y1: stages[0].y, hw: 130 }].concat(stages.slice(0, -1).map(function (st, i) { return { y0: st.y + 7, y1: stages[i + 1].y, hw: stages[i + 1].hw }; }));
    gaps.forEach(function (g, gi) {
      const mid = (g.y0 + g.y1) / 2;
      // support rods (double lines)
      [-1, 1].forEach(function (sgn) { L(cx + sgn * (g.hw - 10), g.y0, cx + sgn * (g.hw - 10), g.y1); L(cx + sgn * (g.hw - 14), g.y0, cx + sgn * (g.hw - 14), g.y1); });
      // coaxial cable bundles weaving inward and outward
      const outer = 74 - gi * 3, inner = 44 - gi * 2, a = gi % 2 ? inner : outer, b = gi % 2 ? outer : inner;
      [-1, 1].forEach(function (sgn) {
        for (let k = 0; k < 6; k++) {
          const x0 = cx + sgn * (a - k * 3), x1 = cx + sgn * (b - k * 3);
          P("M" + f(x0) + " " + g.y0 + " C" + f(x0) + " " + f(mid) + " " + f(x1) + " " + f(mid) + " " + f(x1) + " " + g.y1, "cl thin");
        }
        R(Math.min(cx + sgn * b, cx + sgn * (b - 15)) - 2, g.y1 - 13, 19, 7);
        for (let k = 0; k < 5; k++) L(Math.min(cx + sgn * b, cx + sgn * (b - 15)) + 1 + k * 3.5, g.y1 - 13, Math.min(cx + sgn * b, cx + sgn * (b - 15)) + 1 + k * 3.5, g.y1 - 6, "cl thin");
      });
      // centre column: heat exchanger, then a threaded rod, then a plain line
      if (gi === 1 || gi === 2) { R(cx - 11, g.y0, 22, g.y1 - g.y0); for (let y = g.y0 + 3; y < g.y1; y += 3) L(cx - 11, y, cx + 11, y, "cl thin"); }
      else if (gi === 4) { R(cx - 4, g.y0, 8, g.y1 - g.y0); for (let y = g.y0 + 2; y < g.y1; y += 2.2) L(cx - 4, y, cx + 4, y, "cl thin"); }
      else if (gi > 0) L(cx, g.y0, cx, g.y1);
      // cable loops
      if (gi === 3) [-96, -80, 80, 96].forEach(function (dx) { C(cx + dx, mid, 8); });
      if (gi === 5) [-62, 62].forEach(function (dx) { C(cx + dx, mid + 4, 6); });
    });

    // When every module is installed, a signal flows down the centre column
    // to the chip. It sits under the plates, so it seems to pass through them.
    if (online) s += '<line x1="' + cx + '" y1="71" x2="' + cx + '" y2="' + f(stages[5].y + 50) + '" class="flow"/>';

    stages.forEach(function (st, i) {
      const on = isCompleted(st.lv), isNew = st.lv.id === highlightId, d = ' style="--i:' + i + '"';
      s += '<rect' + d + ' x="' + (cx - st.hw) + '" y="' + st.y + '" width="' + (2 * st.hw) + '" height="7" rx="1.5" class="plate' + (on ? " on" : "") + (isNew ? " new" : "") + '"/>';
      R(cx - st.hw + 8, st.y + 7, 2 * st.hw - 16, 2.5, "cf lip");
      // callout to the right, like a technical drawing
      const lx = cx + st.hw, ly = st.y + 3.5;
      s += '<polyline' + d + ' points="' + (lx + 3) + "," + ly + " " + (lx + 16) + "," + ly + " 318," + ly + '" class="lead' + (on ? " on" : "") + '"/>';
      s += '<circle' + d + ' cx="318" cy="' + ly + '" r="2" class="lead-dot' + (on ? " on" : "") + '"/>';
      s += '<text' + d + ' x="326" y="' + (ly + 4) + '" class="lbl' + (on ? " on" : "") + '">' + (i + 1) + "  " + esc(on ? st.lv.module.short : "empty") + "</text>";
    });

    // Cold end: sample mount and the quantum chip
    const yb = stages[5].y + 9.5;
    R(cx - 24, yb, 48, 26); L(cx - 24, yb + 8, cx + 24, yb + 8, "cl thin"); L(cx - 24, yb + 16, cx + 24, yb + 16, "cl thin");
    R(cx - 15, yb + 26, 30, 12);
    if (online) s += '<circle cx="' + cx + '" cy="' + (yb + 49) + '" r="12" class="chip-pulse"/>';
    s += '<rect x="' + (cx - 8) + '" y="' + (yb + 41) + '" width="16" height="16" rx="1.5" class="chip' + (online ? " on" : "") + '"/>';
    for (let k = 0; k < 4; k++) { L(cx - 6 + k * 4, yb + 41, cx - 6 + k * 4, yb + 38, "cl thin"); L(cx - 6 + k * 4, yb + 57, cx - 6 + k * 4, yb + 60, "cl thin"); }
    [-56, -50, 50, 56].forEach(function (dx) { P("M" + (cx + dx) + " " + yb + " v 30 q 0 10 " + (dx < 0 ? 10 : -10) + " 14", "cl thin"); });
    s += '<text x="326" y="' + (yb + 54) + '" class="lbl chip-lbl' + (online ? " on" : "") + '">' + (online ? "Online" : "Chip") + "</text>";
    L(cx + 10, yb + 49, 318, yb + 49, "lead chip-lead" + (online ? " on" : ""));

    return '<svg class="cryo' + (glow && online ? " glow" : "") + (power != null ? ' powering" style="--el:' + power.toFixed(2) + 's' : "") + '" viewBox="0 0 420 ' + f(yb + 70) + '" role="img" aria-label="Quantum computer: ' + n + " of " + LEVELS.length + ' modules installed">' + s + "</svg>";
  }

  // A small padlock: closed while modules are missing, open once all six are in.
  function lockIcon(open) {
    return '<svg class="lock' + (open ? " open" : "") + '" viewBox="0 0 16 20" aria-hidden="true">' +
      '<path class="shackle" d="M4.5 10 V6.5 a3.5 3.5 0 0 1 7 0 V10"/><rect x="2" y="10" width="12" height="9" rx="2"/></svg>';
  }
  function computerCaption(power) {
    const n = modulesEarned(), online = n === LEVELS.length;
    return '<p class="cryo-caption' + (online && power != null ? ' powering" style="--el:' + power.toFixed(2) + 's' : "") + '">' + lockIcon(online) +
      (online ? '<span class="cap-stack">' + (power != null ? '<span class="cap-boot">Powering on…</span>' : "") +
        '<span class="cap-on"><b class="on">System online.</b> All 6 modules installed.</span></span>'
        : "<span><b>" + n + " of " + LEVELS.length + "</b> modules installed</span>") + "</p>";
  }
  // The power-on sequence plays the first time the finished computer is shown
  // on a screen in this session (per player); after that it stays on. It is
  // timed from its first frame, so a re-render during the sequence (for
  // example when a logo finishes loading) continues it instead of restarting.
  const POWER_SECONDS = 4;
  function powerOnce(where) {
    if (modulesEarned() !== LEVELS.length) return null;
    const key = (progress.current || "-") + ":" + where, now = Date.now();
    if (!ui.poweredOn[key]) ui.poweredOn[key] = now;
    const el = (now - ui.poweredOn[key]) / 1000;
    return el < POWER_SECONDS ? el : null;
  }

  function logo(kind) {
    const info = {
      princeton: { src: "assets/princeton-logo.png", alt: "Princeton University logo", text: "Princeton logo" },
      psq: { src: "assets/psq-logo.png", alt: "PSQ logo", text: "PSQ logo" }
    }[kind];
    if (ui.logos[kind]) return '<span class="logo-chip logo-' + kind + '"><img class="logo" src="' + info.src + '" alt="' + info.alt + '"></span>';
    return '<span class="logo-placeholder logo-' + kind + '">' + info.text + "</span>";
  }

  /* ================= Header, footer, home ================= */

  function viewHeader() {
    const p = player();
    return '<header class="topbar"><div class="topbar-inner">' +
      '<div class="brand">' + logo("psq") +
      '<button class="wordmark" data-action="go-home" aria-label="Qubit in Order home">Qubit in <b>Order</b></button></div>' +
      '<div class="pills">' + (p ? '<span class="pill">' + esc(p.name) + "</span>" : "") +
      '<span class="pill" title="Modules installed">Modules <b>' + modulesEarned() + "/" + LEVELS.length + "</b></span>" +
      '<span class="pill" title="Points">Points <b>' + myPoints() + "</b></span></div></div></header>";
  }

  /* ----- Suggestions form -----
   * The site has no server, so messages go through FormSubmit (formsubmit.co),
   * a free service that forwards a form to an email address. The first message
   * ever sent triggers one activation email to SUGGEST.to; after the link in it
   * is clicked, messages arrive directly (with a copy to SUGGEST.cc). It only
   * works when the game is served from a website (for example GitHub Pages),
   * not opened as a local file; then, and on any other failure, the player is
   * offered a ready-made email instead. */
  const SUGGEST = {
    to: "gc5188@princeton.edu",
    cc: "ch7881@princeton.edu",
    endpoint: "https://formsubmit.co/ajax/gc5188@princeton.edu",
    subject: "Qubit in Order suggestion"
  };
  ui.suggest = { name: "", email: "", message: "", status: null, error: "" };

  function suggestMailto() {
    const g = ui.suggest;
    const body = g.message.trim() + (g.name.trim() ? "\n\nFrom: " + g.name.trim() : "");
    return "mailto:" + SUGGEST.to + "," + SUGGEST.cc + "?subject=" + encodeURIComponent(SUGGEST.subject) + "&body=" + encodeURIComponent(body);
  }

  function viewSuggestions() {
    const g = ui.suggest, sending = g.status === "sending";
    let status = "";
    if (g.status === "sent") status = '<p class="feedback ok" role="status">Thank you! Your suggestion was sent to the creators.</p>';
    else if (g.status === "invalid") status = '<p class="feedback err" role="alert">' + esc(g.error) + "</p>";
    else if (g.status === "error") status = '<p class="feedback err" role="alert">It could not be sent from here. <a href="' + esc(suggestMailto()) + '">Send it by email instead</a> (your message is filled in).</p>';
    else if (sending) status = '<p class="feedback info" role="status">Sending…</p>';
    return '<section class="suggest" aria-labelledby="suggest-h"><div class="suggest-intro"><h2 id="suggest-h">Suggestions?</h2>' +
      "<p>Found a mistake, or have an idea for the game? Send it straight to the creators.</p>" +
      '<p class="muted small">Or email <a href="mailto:' + SUGGEST.to + '">' + SUGGEST.to + '</a> or <a href="mailto:' + SUGGEST.cc + '">' + SUGGEST.cc + "</a>.</p></div>" +
      '<form class="suggest-form" data-form="suggest" novalidate>' +
      '<label class="field"><span>Your suggestion</span><textarea id="suggest-message" data-field="message" rows="4" maxlength="2000" required></textarea></label>' +
      '<div class="suggest-row"><label class="field"><span>Name <span class="muted">(optional)</span></span><input id="suggest-name" data-field="name" maxlength="60" autocomplete="name"></label>' +
      '<label class="field"><span>Email <span class="muted">(optional, for a reply)</span></span><input id="suggest-email" type="email" data-field="email" maxlength="120" autocomplete="email"></label></div>' +
      '<input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<div class="suggest-actions"><button type="submit" class="btn primary"' + (sending ? " disabled" : "") + ">Send suggestion</button></div>" + status + "</form></section>";
  }

  // The form's text lives in ui.suggest and is put back after every render
  // (set as values, not HTML, so nothing the player types is reformatted).
  function restoreSuggest() {
    ["message", "name", "email"].forEach(function (k) {
      const el = app.querySelector('[data-field="' + k + '"]');
      if (el && el.value !== ui.suggest[k]) el.value = ui.suggest[k];
    });
  }

  function sendSuggestion(form) {
    const g = ui.suggest;
    if (g.status === "sending") return;
    const honey = form.querySelector(".hp");
    if (honey && honey.value) { g.status = "sent"; g.message = ""; render(); return; } // a bot filled the hidden field
    if (g.message.trim().length < 3) { g.status = "invalid"; g.error = "Please write your suggestion first."; render(); focusField("message"); return; }
    if (g.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(g.email.trim())) { g.status = "invalid"; g.error = "That email address does not look right. Fix it or leave it empty."; render(); focusField("email"); return; }
    g.status = "sending"; render();
    const payload = { message: g.message.trim(), name: g.name.trim() || "(not given)", email: g.email.trim() || "(not given)",
      _subject: SUGGEST.subject, _cc: SUGGEST.cc, _template: "table", _captcha: "false" };
    if (!g.email.trim()) delete payload.email;
    fetch(SUGGEST.endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && (data.success === true || data.success === "true")) {
          g.status = "sent"; g.message = ""; g.name = ""; g.email = "";
          announce("Thank you. Your suggestion was sent.");
        } else { g.status = "error"; }
      })
      .catch(function () { g.status = "error"; })
      .then(function () { render(); });
  }
  function focusField(k) { const el = app.querySelector('[data-field="' + k + '"]'); if (el) el.focus(); }

  function viewFooter() {
    return '<footer class="site-footer">' + (ui.screen === "home" ? viewSuggestions() : "") + '<div class="footer-main"><div class="footer-text">' +
      "<p><b>About.</b> Qubit in Order is an educational game for Qublitz 2026, hosted by Princeton Students in Quantum. Lessons and questions are adapted from concepts in Scott Aaronson's <i>Introduction to Quantum Information Science</i> lecture notes.</p>" +
      "<p><b>What the game computes.</b> The demonstrations and the circuit builder run an exact simulation of small, ideal (noise-free) circuits, up to 8 qubits. Oracles, diffusion, modular exponentiation and the quantum Fourier transform are prebuilt blocks whose inside is not shown. This is a demonstrative game, not a simulation of real quantum hardware.</p>" +
      '<p class="credits">Created by Gerardo Caravez ’29 and Cristian Hernandez ’29</p>' +
      '</div><div class="footer-logo">' + logo("princeton") + "</div></div></footer>";
  }

  function viewPlayerCard() {
    const p = player();
    if (p && !ui.pickPlayer) {
      return '<div class="player-card"><span>Playing as <b>' + esc(p.name) + "</b> · " + myPoints() + " points" + (myRank() ? " · rank #" + myRank() : "") + "</span>" +
        '<button class="btn ghost small" data-action="switch-player">Switch player</button></div>';
    }
    const others = Object.keys(progress.players).map(function (id) {
      return '<li><button class="chip-btn" data-action="player-select" data-id="' + id + '">' + esc(progress.players[id].name) + "</button></li>";
    }).join("");
    return '<form class="player-form" data-form="player"><label for="player-name"><b>Who\'s playing?</b> Enter a name to save your points to the leaderboard.</label>' +
      '<div class="player-row"><input id="player-name" data-focus="player-name" maxlength="20" autocomplete="off" placeholder="Your name">' +
      '<button type="submit" class="btn primary">Start playing</button>' + (p ? '<button type="button" class="btn ghost" data-action="cancel-player">Cancel</button>' : "") + "</div>" +
      (ui.nameError ? '<p class="feedback err">' + esc(ui.nameError) + "</p>" : "") +
      (others ? '<p class="muted small">Or continue as:</p><ul class="chip-list">' + others + "</ul>" : "") + "</form>";
  }

  function viewLeaderboard() {
    const top = L.leaderboard(progress.players, 5);
    const rows = top.length ? top.map(function (e, i) {
      return '<li class="' + (e.id === progress.current ? "me" : "") + '"><span class="rank">' + (i + 1) + '</span><span class="who">' + esc(e.name) +
        '</span><span class="mods">' + e.modules + '/6 modules</span><span class="pts">' + e.points + " pts</span></li>";
    }).join("") : '<li class="empty">No scores yet. Be the first.</li>';
    return '<section class="panel board-panel"><div class="panel-head"><h2>Leaderboard</h2><span class="muted small">Top 5 on this device</span></div>' +
      '<ol class="board">' + rows + "</ol>" +
      '<p class="muted small">Points come from your best quiz on each level: +1 per correct Easy answer, +2 Medium, +3 Hard.</p></section>';
  }

  function viewSettings() {
    const on = progress.settings.newQuestionsOnRetry;
    return '<section class="panel settings" aria-labelledby="settings-h"><h2 id="settings-h">Settings</h2>' +
      '<label class="setting"><input type="checkbox" class="switch" data-action="toggle-retry" data-focus="toggle-retry"' + (on ? " checked" : "") + ">" +
      '<span class="setting-text"><b>New questions after a failed quiz</b>' +
      "<span>On: your retry uses 10 different questions. Off: you retry the same 10 questions in a new order.</span></span></label>" +
      '<div class="home-foot"><button class="btn ghost small" data-action="reset-me"' + (player() ? "" : " disabled") + '>Reset my progress</button>' +
      '<button class="btn ghost small" data-action="reset-all">Clear leaderboard</button></div></section>';
  }

  function viewHome() {
    const all = modulesEarned() === LEVELS.length;
    const next = LEVELS.findIndex(function (lv) { return !isCompleted(lv); });
    const cta = all
      ? '<button class="btn primary" data-action="finale">See the quantum computer →</button>'
      : '<button class="btn primary" data-action="open-level" data-i="' + next + '">' + (modulesEarned() ? "Continue: Level " : "Start Level ") + (next + 1) + " →</button>";
    const tiles = LEVELS.map(function (lv, i) {
      const r = player() && player().levels[lv.id];
      let status, cls;
      if (r && r.completed) { status = "✓ Module installed"; cls = "done"; }
      else if (r && r.quizPassed) { status = "Quiz passed: build next"; cls = "in-progress"; }
      else { status = "Not started"; cls = ""; }
      return '<li><button class="tile ' + cls + '" data-action="open-level" data-i="' + i + '">' +
        '<span class="tile-num">Level ' + (i + 1) + '</span><span class="tile-name">' + esc(lv.name) + "</span>" +
        '<span class="tile-sub">' + esc(lv.shortTitle) + " · " + esc(lv.module.name) + '</span><span class="tile-status">' + status +
        (r && r.bestPoints ? " · " + r.bestPoints + " pts" : "") + "</span></button></li>";
    }).join("");
    return '<section class="hero"><div class="hero-text"><p class="eyebrow">Qublitz 2026</p>' +
      "<h1>" + (all ? "The quantum computer is online." : "Unlock the Quantum Computer") + "</h1>" +
      '<p class="lead">Our quantum computer is locked. Restore its six algorithm modules by learning six well-known quantum algorithms, passing a quiz for each, and rebuilding each circuit.</p>' +
      '<div class="actions">' + cta + "</div></div>" +
      (function () { const pw = powerOnce("home"); return '<div class="hero-art">' + computerSVG(null, true, pw) + computerCaption(pw) + "</div></section>"; })() +
      '<section class="panel">' + viewPlayerCard() + "</section>" +
      '<div class="home-grid"><section class="panel"><div class="panel-head"><h2>The six modules</h2><span class="muted small">Play in any order. A module counts once its quiz and circuit are both done.</span></div>' +
      '<ol class="tiles">' + tiles + "</ol></section>" + viewLeaderboard() + "</div>" +
      '<section class="panel how"><h2>How each level works</h2><ol class="how-steps">' +
      "<li><b>Learn</b><span>Lesson cards with a worked example.</span></li>" +
      "<li><b>Explore</b><span>An interactive demonstration with challenges.</span></li>" +
      "<li><b>Quiz</b><span>Pick a difficulty. 10 questions, 8 to pass.</span></li>" +
      "<li><b>Build</b><span>Build the circuit from real gates. The game tests it.</span></li>" +
      "<li><b>Earn</b><span>Install the module in the computer.</span></li></ol></section>" + viewSettings();
  }

  /* ================= Level screens ================= */

  function viewStepper(lv) {
    const rec = record(lv.id);
    return '<nav aria-label="Level steps"><ol class="stepper">' + STEPS.map(function (s, i) {
      const locked = s.id === "build" && !rec.quizPassed;
      const done = (s.id === "quiz" && rec.quizPassed) || (s.id === "build" && rec.completed);
      const current = ui.step === s.id;
      return '<li><button class="step ' + (current ? "current " : "") + (done ? "done " : "") + (locked ? "locked" : "") + '" data-action="go-step" data-step="' + s.id + '"' +
        (locked ? ' disabled title="Pass the quiz to unlock"' : "") + (current ? ' aria-current="step"' : "") + '><span class="step-num">' + (done ? "✓" : i + 1) + "</span>" + s.label +
        (locked ? ' <span class="sr-only">(locked until you pass the quiz)</span>' : "") + "</button></li>";
    }).join("") + "</ol></nav>";
  }

  function viewLevel() {
    const lv = level();
    const body = ui.step === "learn" ? viewLearn(lv) : ui.step === "explore" ? viewExplore(lv) : ui.step === "quiz" ? viewQuiz(lv) : viewBuild(lv);
    const levelNav = LEVELS.map(function (l, i) {
      return '<li><button class="lvl-dot' + (i === ui.levelIndex ? " on" : "") + (isCompleted(l) ? " done" : "") + '" data-action="open-level" data-i="' + i + '" title="' + esc(l.name) + '" aria-label="Level ' + (i + 1) + ": " + esc(l.name) + '">' + (isCompleted(l) ? "✓" : i + 1) + "</button></li>";
    }).join("");
    return '<div class="crumbs"><button class="btn ghost small" data-action="go-home">← Level map</button><ol class="lvl-nav" aria-label="Jump to level">' + levelNav + "</ol></div>" +
      '<div class="level-head"><p class="eyebrow">Level ' + lv.order + " of " + LEVELS.length + " · " + esc(lv.module.name) + "</p>" +
      "<h1>" + esc(lv.name) + '</h1><p class="subtitle">' + esc(lv.shortTitle) + "</p></div>" + viewStepper(lv) + body;
  }

  function viewLearn(lv) {
    const cards = lv.lessonCards, i = ui.lessonPage, c = cards[i], last = i === cards.length - 1;
    const chips = cards.map(function (card, j) {
      return '<li><button class="chip ' + (j === i ? "on" : "") + (j < i ? " seen" : "") + '" data-action="lesson-page" data-i="' + j + '"' + (j === i ? ' aria-current="true"' : "") + ">" + (j + 1) + ". " + fmt(card.title) + "</button></li>";
    }).join("");
    return '<section class="panel">' + (i === 0 ? '<p class="intro">' + fmt(lv.intro) + "</p>" : "") +
      '<ol class="chips" aria-label="Lesson cards">' + chips + "</ol>" +
      '<article class="lesson-card' + (fresh(ui.enterT) ? (ui.enterDir < 0 ? " enter back" : " enter") : "") + '"><p class="eyebrow">Lesson ' + (i + 1) + " of " + cards.length + '</p><h2 tabindex="-1" data-focus="lesson">' + fmt(c.title) + "</h2>" + c.html + "</article>" +
      '<div class="actions spread"><button class="btn ghost" data-action="lesson-page" data-i="' + (i - 1) + '"' + (i === 0 ? " disabled" : "") + ">← Back</button>" +
      (last ? '<button class="btn primary" data-action="go-step" data-step="explore">Open the demonstration →</button>' : '<button class="btn primary" data-action="lesson-page" data-i="' + (i + 1) + '">Next →</button>') +
      '</div><p class="source">Source: ' + esc(lv.ref) + "</p></section>";
  }

  function getLab(key, kind) {
    if (!ui.labs[key] || ui.labs[key].kind !== kind) ui.labs[key] = LABS[kind].init();
    return ui.labs[key];
  }

  function viewExplore(lv) {
    const kind = lv.lab.kind, lab = getLab("explore", kind), results = ui.challenges[lv.id] || [];
    const list = lv.challenges.map(function (ch, i) {
      const r = results[i];
      return '<li class="challenge ' + (r ? (r.ok ? "ok" : "no") : "") + '"><div class="challenge-text"><b>' + (r && r.ok ? "✓ " : "") + esc(ch.title) + "</b><p>" + fmt(ch.task) + "</p></div>" +
        '<button class="btn small" data-action="challenge-check" data-i="' + i + '">Check my setup</button>' +
        (r ? '<p class="feedback ' + (r.ok ? "ok" : "err") + '">' + fmt(r.msg) + "</p>" : "") + "</li>";
    }).join("");
    const solved = results.filter(function (r) { return r && r.ok; }).length;
    return '<section class="panel' + (fresh(ui.enterT) ? " enter" : "") + '"><h2 tabindex="-1" data-focus="explore">Explore</h2>' +
      '<p class="muted">Play with the demonstration, then answer each challenge by changing it and pressing Check.</p>' +
      LABS[kind].render("explore", lab, false) +
      '<h3 class="challenge-head">Challenges <span class="muted">(' + solved + " of " + lv.challenges.length + " solved)</span></h3>" +
      '<ol class="challenges">' + list + "</ol>" +
      '<div class="actions spread"><button class="btn ghost" data-action="go-step" data-step="learn">← Lesson</button><button class="btn primary" data-action="go-step" data-step="quiz">Go to the quiz →</button></div></section>';
  }

  /* ----- Quiz ----- */

  function viewQuiz(lv) {
    const cfg = lv.quizConfig, rec = record(lv.id), q = ui.quiz, p = player();
    if (!q || q.levelId !== lv.id) {
      const diff = p ? p.difficulty : "medium";
      const cards = DIFFS.map(function (d) {
        return '<li><button class="diff ' + (diff === d.id ? "on" : "") + '" data-action="difficulty" data-v="' + d.id + '" aria-pressed="' + (diff === d.id) + '">' +
          "<b>" + d.label + '</b><span class="diff-pts">+' + d.pts + " per correct answer</span><span>" + d.text + "</span></button></li>";
      }).join("");
      return '<section class="panel quiz-intro' + (fresh(ui.enterT) ? " enter" : "") + '"><h2 tabindex="-1" data-focus="quiz">Quiz</h2>' +
        '<p class="mini-head">Choose your difficulty</p><ol class="diffs">' + cards + "</ol>" +
        '<ul class="rules"><li><b>' + cfg.roundSize + " questions</b> at the difficulty you choose, each with four answers.</li>" +
        "<li>Get <b>" + cfg.passCorrect + " or more</b> right to unlock the circuit builder.</li>" +
        "<li>One try per question, then an explanation. Questions and answers are shuffled every time.</li>" +
        "<li>If you fail, " + (progress.settings.newQuestionsOnRetry ? "your retry uses 10 different questions." : "you retry the same 10 questions in a new order.") + " You can change this in Settings on the home screen.</li>" +
        "<li>Your best attempt on each level counts toward the leaderboard.</li>" +
        "<li>Keyboard: press 1 to 4 to choose, then Enter to submit.</li></ul>" +
        (rec.bestPoints ? '<p class="feedback ok">Your best here: ' + rec.bestScore + "/" + cfg.roundSize + " on " + rec.bestDifficulty + " (" + rec.bestPoints + " points)." + (rec.quizPassed ? " Build is unlocked." : "") + "</p>" : "") +
        (ui.quizError ? '<p class="feedback err">' + esc(ui.quizError) + "</p>" : "") +
        '<div class="actions"><button class="btn primary" data-action="quiz-start">Start the quiz</button>' +
        (rec.quizPassed ? '<button class="btn" data-action="go-step" data-step="build">Go to Build →</button>' : "") + "</div></section>";
    }
    if (q.finished) return viewQuizResults(lv);
    const cur = q.questions[q.index];
    const score = q.answers.filter(function (a, i) { return a === q.questions[i].correctIndex; }).length;
    const justRevealed = q.revealed && fresh(q.revealT), entering = !q.revealed && fresh(q.shownT);
    const options = cur.options.map(function (opt, i) {
      let cls = "option";
      if (q.revealed) { if (i === cur.correctIndex) cls += " correct" + (justRevealed ? " celebrate" : ""); else if (i === q.selected) cls += " wrong" + (justRevealed ? " shake" : ""); }
      else if (i === q.selected) cls += " selected";
      const mark = q.revealed ? (i === cur.correctIndex ? '<span class="mark">✓</span>' : i === q.selected ? '<span class="mark">✗</span>' : "") : "";
      return '<li' + (entering ? ' class="enter" style="--i:' + i + '"' : "") + '><button class="' + cls + '" data-action="quiz-select" data-i="' + i + '" aria-pressed="' + (i === q.selected) + '"' + (q.revealed ? " disabled" : "") + '><span class="letter">' + "ABCD"[i] + "</span><span>" + fmt(opt) + "</span>" + mark + "</button></li>";
    }).join("");
    let visual = "";
    const kind = cur.visual ? VIS[cur.visual.kind] : null;
    if (kind) visual = '<div class="quiz-visual"><p class="visual-instruction">' + fmt(cur.visual.instruction) + "</p>" + LABS[kind].render("quiz", getLab("quiz", kind), true) + "</div>";
    const right = q.revealed && q.selected === cur.correctIndex, last = q.index === q.questions.length - 1;
    return '<section class="panel quiz-q' + (entering ? " enter" : "") + '"><div class="quiz-meta"><span>Question <b>' + (q.index + 1) + "</b> of " + q.questions.length + " · " + q.difficulty + "</span><span>Correct so far: <b>" + score + "</b> · need " + cfg.passCorrect + "</span></div>" +
      '<div class="progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="' + q.questions.length + '" aria-valuenow="' + q.answers.length + '"><div data-m="quiz-progress" data-mp="width" style="width:' + (q.answers.length / q.questions.length * 100) + '%"></div></div>' +
      '<h2 class="question" tabindex="-1" data-focus="question">' + fmt(cur.prompt) + "</h2>" + visual + '<ol class="options">' + options + "</ol>" +
      (q.revealed
        ? '<div class="feedback ' + (right ? "ok" : "err") + (justRevealed ? " pop" : "") + '"><b>' + (right ? "Correct." : "Not quite. The answer is " + "ABCD"[cur.correctIndex] + ".") + "</b> " + fmt(cur.explanation) + "</div>" +
          '<div class="actions"><button class="btn primary" data-action="quiz-next" data-focus="next">' + (last ? "See my score →" : "Next question →") + "</button></div>"
        : '<div class="actions"><button class="btn primary" data-action="quiz-submit"' + (q.selected === null ? " disabled" : "") + ">Submit answer</button></div>") + "</section>";
  }

  function viewQuizResults(lv) {
    const q = ui.quiz, r = q.result, cfg = lv.quizConfig, rec = record(lv.id), pts = L.quizPoints(r.score, q.difficulty);
    const missed = r.missed.map(function (i) {
      const item = q.questions[i];
      return '<li><p class="rq">' + fmt(item.prompt) + '</p><p><span class="tagline bad">Your answer</span> ' + fmt(item.options[q.answers[i]]) + "</p>" +
        '<p><span class="tagline good">Correct</span> ' + fmt(item.options[item.correctIndex]) + '</p><p class="muted">' + fmt(item.explanation) + "</p></li>";
    }).join("");
    const head = r.passed
      ? '<h2 tabindex="-1" data-focus="results">You scored ' + r.score + "/" + r.total + ". Circuit builder unlocked!</h2>"
      : '<h2 tabindex="-1" data-focus="results">You scored ' + r.score + "/" + r.total + ".</h2>" +
        '<p class="feedback info">You need ' + cfg.passCorrect + " to unlock the circuit builder. Read the explanations below, then try again. " +
        (progress.settings.newQuestionsOnRetry ? "Your next try uses 10 different questions." : "Your next try uses these same 10 questions, with the questions and answers in a new order.") + "</p>";
    return '<section class="panel results">' + head +
      '<p class="points-line">+' + pts + " points this attempt (" + r.score + " × " + L.DIFFICULTY_POINTS[q.difficulty] + " on " + q.difficulty + "). Best on this level: <b>" + rec.bestPoints + "</b>.</p>" +
      '<div class="scorebar" aria-hidden="true">' + q.questions.map(function (item, i) { return '<span class="' + (q.answers[i] === item.correctIndex ? "hit" : "miss") + '"></span>'; }).join("") + "</div>" +
      (missed ? '<h3>Review what you missed</h3><ol class="review">' + missed + "</ol>" : "") +
      '<div class="actions">' + (r.passed
        ? '<button class="btn primary" data-action="go-step" data-step="build">Build the circuit →</button><button class="btn" data-action="quiz-again">Try another quiz</button>'
        : '<button class="btn primary" data-action="quiz-again">Try again</button><button class="btn" data-action="go-step" data-step="learn">Review the lesson</button>') + "</div></section>";
  }

  /* ----- Circuit builder ----- */

  function newBuild(lv) {
    return { levelId: lv.id, circ: L.emptyCircuit(lv.build), history: [], selected: null, hints: 0, feedback: null, result: null, passed: false, follow: null };
  }

  function inventoryCard(kind, id, def, selected) {
    const pic = kind === "gate" ? U.gateSymbol(GATES[id].symbol === "●" ? "C" : id, { stubs: true }) : '<span class="macro-pic"><span>' + fmt(def.label) + "</span></span>";
    const name = kind === "gate" ? GATES[id].name : def.name;
    return '<li><button class="inv' + (selected ? " selected" : "") + (kind === "macro" ? " inv-macro" : "") + '" data-action="pick" data-kind="' + kind + '" data-id="' + id + '" aria-pressed="' + selected + '">' +
      pic + '<span class="inv-name">' + fmt(name) + "</span></button></li>";
  }

  function viewCircuit(lv) {
    const B = lv.build, b = ui.build, circ = b.circ, R = B.rows.length;
    // Right after "Check circuit", a light sweeps through the circuit step by
    // step and each gate flashes as it is applied; a newly placed gate pops in.
    const running = fresh(b.runT), placed = b.placed && fresh(b.placed.t) ? b.placed : null;
    let html = '<div class="cgrid' + (running ? " run" : "") + '" style="--cols:' + B.cols + ";--rows:" + R + '" role="group" aria-label="Circuit: ' + R + " wires, " + B.cols + ' time steps">';
    if (running) html += '<div class="scan" aria-hidden="true" style="grid-column:2 / span ' + (B.cols + 1) + ";grid-row:1 / span " + R + '"></div>';
    B.rows.forEach(function (row, r) {
      const gr = "grid-row:" + (r + 1);
      html += '<div class="clabel" style="' + gr + '">' + (row.label ? '<span class="clabel-name">' + esc(row.label) + "</span>" : "") + '<span class="ket">|' + esc(row.init) + "⟩</span>" + (row.note ? '<span class="clabel-note">' + esc(row.note) + "</span>" : "") + "</div>";
      html += '<div class="cwire' + (row.size > 1 ? " bundle" : "") + '" style="' + gr + ";grid-column:2 / span " + (B.cols + 1) + '">' + (row.size > 1 ? '<span class="slash">/' + row.size + "</span>" : "") + "</div>";
      html += '<div class="cmeter" style="' + gr + ";grid-column:" + (B.cols + 2) + '">' + (B.measureRows.indexOf(r) >= 0 ? U.meterIcon() : "") + "</div>";
    });
    for (let c = 0; c < B.cols; c++) {
      const gc = "grid-column:" + (c + 2);
      const mid = circ.macros[c];
      if (mid) {
        const m = L.macroDef(B, mid), r0 = Math.min.apply(null, m.rows), r1 = Math.max.apply(null, m.rows);
        html += '<button class="cblock op-' + m.op + (placed && placed.c === c ? " pop" : "") + '" style="' + gc + ";grid-row:" + (r0 + 1) + " / " + (r1 + 2) + ";--c:" + c + '" data-action="cell" data-c="' + c + '" data-r="' + r0 + '" aria-label="Step ' + (c + 1) + ": " + esc(plain(m.name)) + '. Press to remove.">' +
          '<span class="cblock-label">' + fmt(m.label) + '</span><span class="cblock-name">' + fmt(m.name) + "</span></button>";
        continue;
      }
      const col = circ.cells[c];
      const ctrl = [], tgt = [];
      col.forEach(function (g, r) { if (g === "C") ctrl.push(r); else if (g) tgt.push(r); });
      if (ctrl.length && tgt.length) {
        const all = ctrl.concat(tgt), r0 = Math.min.apply(null, all), r1 = Math.max.apply(null, all);
        html += '<div class="vline" style="' + gc + ";grid-row:" + (r0 + 1) + " / " + (r1 + 2) + '"></div>';
      }
      B.rows.forEach(function (row, r) {
        if (!row.editable) return;
        const g = col[r];
        const target = g === "X" && ctrl.length > 0;
        const label = "Step " + (c + 1) + ", wire " + (row.label || r + 1) + ": " + (g ? GATES[g].name + (target ? " (CNOT target)" : "") : "empty");
        html += '<button class="ccell' + (g ? " filled" : "") + (b.selected ? " targetable" : "") + (g && placed && placed.c === c && placed.r === r ? " pop" : "") + '" style="' + gc + ";grid-row:" + (r + 1) + ";--c:" + c + '" data-action="cell" data-c="' + c + '" data-r="' + r + '" aria-label="' + esc(label) + '">' +
          (g ? U.gateSymbol(g, { target: target }) + '<span class="cap">' + (target ? "CNOT" : CAPTION[g]) + "</span>" : "") + "</button>";
      });
    }
    return html + "</div>";
  }

  // True during the first redraw after an event stamped at time t.
  function fresh(t) { return !!t && Date.now() - t < 300; }

  function viewBuild(lv) {
    const B = lv.build, b = ui.build, sel = b.selected;
    const gates = B.gates.map(function (id) { return inventoryCard("gate", id, null, !!sel && sel.kind === "gate" && sel.id === id); }).join("");
    const macros = B.macros.map(function (m) { return inventoryCard("macro", m.id, m, !!sel && sel.kind === "macro" && sel.id === m.id); }).join("");
    let selText = "Choose a gate or block, then click a spot on the circuit. Click a placed gate (with nothing selected) to remove it.";
    if (sel && sel.kind === "gate") selText = "<b>" + esc(GATES[sel.id].name) + ".</b> " + fmt(GATES[sel.id].desc) + " <i>Now click a spot on a wire.</i>";
    if (sel && sel.kind === "macro") { const m = L.macroDef(B, sel.id); selText = "<b>" + fmt(m.name) + ".</b> " + fmt(m.desc) + " <i>Now click a time step to place it.</i>"; }
    const hints = B.hints.slice(0, b.hints).map(function (h, i) { return "<li><b>Hint " + (i + 1) + ":</b> " + fmt(h) + "</li>"; }).join("");
    const refRows = B.gates.map(function (id) {
      const g = GATES[id];
      return "<tr><td>" + U.gateSymbol(id) + "</td><td><b>" + esc(g.name) + "</b><br><span class=\"muted\">" + fmt(g.desc) + "</span></td><td>" + matrixHTML(g) + "</td></tr>";
    }).join("") + B.macros.map(function (m) {
      return '<tr><td><span class="macro-pic small"><span>' + fmt(m.label) + "</span></span></td><td><b>" + fmt(m.name) + '</b> <span class="tag">prebuilt</span><br><span class="muted">' + fmt(m.desc) + "</span></td><td></td></tr>";
    }).join("");
    const canFinish = b.passed && (!lv.followup || (b.follow && b.follow.done));
    const running = fresh(b.runT);
    return '<section class="panel build' + (running ? " just-ran" : "") + (fresh(ui.enterT) ? " enter" : "") + '" style="--T:' + (0.35 + B.cols * 0.16).toFixed(2) + 's"><div class="build-head"><div><h2 tabindex="-1" data-focus="build">Build the circuit</h2>' +
      '<p class="muted">Use any gates you like. The game simulates your circuit exactly and tests it against every possible mystery box, so only a circuit that truly works will pass.</p></div>' +
      '<div class="goals"><p class="mini-head">Your goal</p><ol>' + B.goals.map(function (g) { return "<li>" + fmt(g) + "</li>"; }).join("") + "</ol></div></div>" +
      '<div class="inventory-wrap"><div><p class="mini-head">Gates</p><ul class="inventory">' + gates + "</ul></div>" +
      '<div><p class="mini-head">Algorithm blocks</p><ul class="inventory">' + macros + "</ul></div></div>" +
      '<p class="inv-desc">' + selText + "</p>" +
      '<div class="circuit-board"><div class="board-scroll">' + viewCircuit(lv) + "</div></div>" +
      '<p class="scroll-note">Swipe the circuit sideways to see every time step.</p>' +
      '<div class="actions"><button class="btn primary" data-action="build-check">Check circuit</button>' +
      '<button class="btn" data-action="build-undo"' + (b.history.length ? "" : " disabled") + ">Undo</button>" +
      '<button class="btn" data-action="build-clear">Clear</button>' +
      '<button class="btn" data-action="build-hint"' + (b.hints >= B.hints.length ? " disabled" : "") + ">Hint (" + b.hints + "/" + B.hints.length + ")</button></div>" +
      (hints ? '<ul class="hints">' + hints + "</ul>" : "") +
      (b.feedback ? '<p class="feedback ' + b.feedback.type + '" tabindex="-1" data-focus="build-feedback">' + fmt(b.feedback.msg) + "</p>" : "") +
      (b.result ? viewResult(b.result, running) : "") +
      (b.passed && lv.followup ? viewFollowup(lv) : "") +
      (canFinish ? '<div class="actions"><button class="btn primary big" data-action="build-finish" data-focus="build-next">Install the ' + esc(lv.module.name) + " →</button></div>" : "") +
      '<details class="defs"><summary>What does each gate do?</summary><table class="ref"><tbody>' + refRows + "</tbody></table></details>" +
      "</section>";
  }

  function matrixHTML(g) {
    if (!g.matrix) return "";
    const fac = g.factor ? g.factor.split("/") : null;
    return '<span class="matrix">' + (fac ? '<span class="frac"><span>' + esc(fac[0]) + "</span><span>" + esc(fac[1]) + "</span></span>" : "") + '<span class="mbr">' +
      g.matrix.map(function (row) { return "<span>" + row.map(esc).join("</span><span>") + "</span>"; }).join("") + "</span></span>";
  }

  function viewResult(res, reveal) {
    const t = res.table;
    return '<div class="analysis' + (reveal ? " reveal" : "") + '"><h3>Test run on every case</h3><p class="muted small">Computed exactly by the game (ideal gates).</p>' +
      '<div class="table-wrap"><table><thead><tr>' + t.head.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      t.rows.map(function (row, i) { return '<tr style="--i:' + i + '">' + row.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>" +
      '<p class="verdict ' + (res.ok ? "ok" : "no") + '">' + fmt(res.verdict) + "</p></div>";
  }

  /* ----- Classical follow-up steps (Simon and Shor) ----- */

  function viewFollowup(lv) {
    const f = ui.build.follow;
    if (f.kind === "simon") {
      const eqs = f.samples.length ? f.samples.map(function (y) {
        return '<li><span class="mono">y = ' + bits(y, 3) + "</span> → " + (y === 0 ? '<span class="muted">no information</span>' : '<span class="mono">' + LABS.describeEq(y) + "</span>") + "</li>";
      }).join("") : '<li class="muted">No samples yet.</li>';
      return '<div class="follow"><h3>Classical step: repeat and solve</h3>' +
        '<p>A new hidden mask s has been chosen. Each run of your circuit returns one string y with y·s = 0. Collect equations, then enter the mask.</p>' +
        '<button class="btn" data-action="simon-run">Run the circuit once</button>' +
        '<ul class="qlog">' + eqs + "</ul>" +
        '<p class="bit-line"><span class="bit-name">Your mask s</span><span class="bit-row">' + f.guess.map(function (bv, i) {
          return '<button class="bit' + (bv ? " on" : "") + '" data-action="simon-guess" data-i="' + i + '" aria-label="Mask bit ' + (i + 1) + " is " + bv + '">' + bv + "</button>";
        }).join("") + '</span><button class="btn small primary" data-action="simon-check">Check mask</button></p>' +
        (f.msg ? '<p class="feedback ' + (f.done ? "ok" : "err") + '">' + fmt(f.msg) + "</p>" : "") + "</div>";
    }
    // Shor
    const samples = f.samples.length ? f.samples.map(function (y) {
      const fr = L.reduceFraction(y, 16);
      return '<li><span class="mono">y = ' + y + "</span> → " + y + "/16 = <b>" + (y === 0 ? "0" : fr[0] + "/" + fr[1]) + "</b>" + (y === 0 ? ' <span class="muted">(no information, run again)</span>' : "") + "</li>";
    }).join("") : '<li class="muted">No measurements yet.</li>';
    const rBtns = [2, 3, 4, 8].map(function (r) {
      return '<button class="chip-btn' + (f.r === r ? " on" : "") + '" data-action="shor-r" data-v="' + r + '"' + (f.samples.length ? "" : " disabled") + ">r = " + r + "</button>";
    }).join("");
    return '<div class="follow"><h3>Classical step: from measurements to factors</h3>' +
      "<p><b>1.</b> Run your circuit and read y/16 as a fraction k/r.</p>" +
      '<button class="btn" data-action="shor-run">Run the circuit once</button><ul class="qlog">' + samples + "</ul>" +
      "<p><b>2.</b> What is the period r of 2<sup>x</sup> mod 15? Check that 2<sup>r</sup> mod 15 = 1.</p><p>" + rBtns + "</p>" +
      (f.rMsg ? '<p class="feedback ' + (f.rOk ? "ok" : "err") + '">' + fmt(f.rMsg) + "</p>" : "") +
      (f.rOk ? "<p><b>3.</b> With r = 4, a<sup>r/2</sup> = 2² = 4. Compute the two gcds:</p>" +
        '<p class="gcd-row"><label>gcd(4 − 1, 15) = <input id="shor-g1" inputmode="numeric" maxlength="3" value="' + esc(f.g1 || "") + '"></label>' +
        '<label>gcd(4 + 1, 15) = <input id="shor-g2" inputmode="numeric" maxlength="3" value="' + esc(f.g2 || "") + '"></label>' +
        '<button class="btn small primary" data-action="shor-gcd">Check</button></p>' +
        (f.gMsg ? '<p class="feedback ' + (f.done ? "ok" : "err") + '">' + fmt(f.gMsg) + "</p>" : "") : "") + "</div>";
  }

  /* ----- Reward and finale ----- */

  function viewReward() {
    const lv = level(), rec = record(lv.id), n = modulesEarned(), all = n === LEVELS.length;
    const next = LEVELS.findIndex(function (l) { return !isCompleted(l); });
    return '<section class="panel reward"><div class="reward-art">' + computerSVG(lv.id, false) + "</div>" +
      '<div class="reward-text"><p class="eyebrow">Module ' + n + " of " + LEVELS.length + " installed</p>" +
      '<h1 tabindex="-1" data-focus="reward">' + esc(lv.module.name) + " installed!</h1>" +
      "<p>" + fmt(lv.build.expected) + "</p>" +
      '<table class="points"><tbody><tr><td>Best quiz on this level</td><td>' + rec.bestScore + "/10 on " + (rec.bestDifficulty || "-") + "</td></tr>" +
      "<tr><td>Points from this level</td><td>" + rec.bestPoints + '</td></tr><tr class="total"><td>Your total</td><td>' + myPoints() + (myRank() ? " (rank #" + myRank() + ")" : "") + "</td></tr></tbody></table>" +
      '<div class="actions">' + (all
        ? '<button class="btn primary big" data-action="finale">Power on the quantum computer →</button>'
        : '<button class="btn primary" data-action="open-level" data-i="' + next + '">Next: Level ' + (next + 1) + " →</button>") +
      '<button class="btn" data-action="go-home">Back to the map</button></div></div></section>';
  }

  function viewFinale() {
    const items = LEVELS.map(function (lv) { return "<li><b>" + esc(lv.name) + ".</b> " + fmt(lv.learned) + "</li>"; }).join("");
    return '<section class="panel finale"><div class="finale-art">' + computerSVG(null, true, powerOnce("finale")) + "</div>" +
      '<p class="eyebrow">All six modules installed</p><h1 tabindex="-1" data-focus="finale">You unlocked the quantum computer!</h1>' +
      '<p class="lead">' + esc(player() ? player().name : "Explorer") + ", you finished with <b>" + myPoints() + " points</b>" + (myRank() ? " (rank #" + myRank() + " on this device)" : "") + ".</p>" +
      '<h2>What you learned</h2><ol class="learned">' + items + "</ol>" +
      '<p class="muted">The big idea: quantum algorithms do not just "try every answer at once". They use superposition, structured oracles and interference so that wrong answers cancel and useful ones add up.</p>' +
      '<div class="actions"><button class="btn primary" data-action="go-home">Back to the map</button></div></section>' + viewLeaderboard();
  }

  /* ================= Render ================= */

  function signature(el) {
    if (!el || !el.dataset || !el.dataset.action) return null;
    const d = el.dataset;
    return [d.action, d.i, d.lab, d.op, d.v, d.step, d.c, d.r, d.id, d.kind].join("|");
  }

  function render() {
    const prevSig = signature(document.activeElement);
    let main;
    if (ui.screen === "home") main = viewHome();
    else if (ui.screen === "reward") main = viewReward();
    else if (ui.screen === "finale") main = viewFinale();
    else main = viewLevel();
    const snap = M.snapshot(app);
    app.innerHTML = U.mathify(viewHeader() + '<div class="wrap"><main id="main">' + main + "</main>" + viewFooter() + "</div>");
    restoreSuggest();
    M.play(app, snap);
    if (ui.scrollTop) window.scrollTo(0, 0);
    let target = null;
    if (ui.focus) target = app.querySelector('[data-focus="' + ui.focus + '"]');
    else if (prevSig) target = Array.prototype.find.call(app.querySelectorAll("[data-action]"), function (el) { return signature(el) === prevSig; });
    if (target && !target.disabled) target.focus({ preventScroll: ui.scrollTop });
    ui.focus = null;
    ui.scrollTop = false;
    syncClockTimer();
  }

  // The clock lab's Play button sweeps the frequency smoothly. Only the lab is
  // redrawn on each tick, not the whole page.
  let clockTimer = null;
  function syncClockTimer() {
    const playing = Object.keys(ui.labs).filter(function (k) {
      const lab = ui.labs[k];
      if (lab.kind !== "clock-lab" || !LABS["clock-lab"].busy(lab)) return false;
      if (!app.querySelector('[data-lab-root="' + k + '"]')) { lab.playing = false; lab.anim = null; return false; }
      return true;
    });
    if (playing.length && !clockTimer) {
      clockTimer = setInterval(function () {
        let any = false;
        Object.keys(ui.labs).forEach(function (k) {
          const lab = ui.labs[k];
          if (lab.kind !== "clock-lab" || !LABS["clock-lab"].busy(lab)) return;
          const el = app.querySelector('[data-lab-root="' + k + '"]');
          if (!el) { lab.playing = false; lab.anim = null; return; }
          any = true;
          if (LABS["clock-lab"].tick(lab) === false) return;
          // Redraw only the moving parts (clocks, arrow sum, frequency, chart).
          // The buttons stay put, so they do not flicker while the hands move.
          const tmp = document.createElement("div");
          tmp.innerHTML = U.mathify(LABS["clock-lab"].render(k, lab, k === "quiz"));
          [".freq", ".clock-row", ".sum-box", ".chart-box"].forEach(function (sel) {
            const a = el.querySelector(sel), b = tmp.querySelector(sel);
            if (a && b) a.replaceWith(b);
          });
        });
        if (!any) { clearInterval(clockTimer); clockTimer = null; }
      }, 40);
    } else if (!playing.length && clockTimer) {
      clearInterval(clockTimer); clockTimer = null;
    }
  }

  /* ================= Actions ================= */

  function needPlayer() {
    if (player()) return false;
    ui.screen = "home"; ui.pickPlayer = true; ui.nameError = "Enter your name first so your points are saved."; ui.focus = "player-name"; ui.scrollTop = true;
    return true;
  }

  function openLevel(i) {
    if (!LEVELS[i] || needPlayer()) return;
    ui.screen = "level"; ui.levelIndex = i; ui.step = "learn"; ui.lessonPage = 0;
    ui.labs = {}; ui.quiz = null; ui.quizError = null; ui.build = null;
    ui.focus = "lesson"; ui.scrollTop = true;
  }

  function goStep(step) {
    const lv = level();
    if (step === "build" && !record(lv.id).quizPassed) return;
    if (step !== ui.step) { ui.enterT = Date.now(); ui.enterDir = 1; }
    if (step === "build" && (!ui.build || ui.build.levelId !== lv.id)) ui.build = newBuild(lv);
    ui.step = step;
    ui.focus = step === "learn" ? "lesson" : step === "explore" ? "explore" : step === "build" ? "build"
      : (ui.quiz && ui.quiz.levelId === lv.id ? (ui.quiz.finished ? "results" : "question") : "quiz");
    ui.scrollTop = true;
  }

  function quizKey(lv, diff) { return (progress.current || "-") + ":" + lv.id + ":" + diff; }

  function startQuiz() {
    const lv = level(), diff = player().difficulty;
    ui.quizError = null;
    try {
      const key = quizKey(lv, diff), last = ui.lastQuizIds[key];
      // After a failed attempt with the setting off, retry the same questions
      // (new order, new answer order). Otherwise draw, putting the questions
      // from the last attempt at the back of the line.
      const questions = ui.failedQuiz[key] && last && !progress.settings.newQuestionsOnRetry
        ? L.redrawQuiz(QUESTIONS[lv.id] || [], last, Math.random)
        : L.drawQuiz(QUESTIONS[lv.id] || [], diff, lv.quizConfig.roundSize, Math.random, last);
      ui.quiz = { levelId: lv.id, difficulty: diff, questions: questions, index: 0, answers: [], selected: null, revealed: false, finished: false, result: null, shownT: Date.now() };
      delete ui.labs.quiz;
      ui.focus = "question";
    } catch (e) { ui.quiz = null; ui.quizError = e.message; }
    ui.scrollTop = true;
  }

  function quizSelect(i) { const q = ui.quiz; if (q && !q.revealed && !q.finished && i >= 0 && i < 4) q.selected = i; }

  function quizSubmit() {
    const q = ui.quiz;
    if (!q || q.revealed || q.selected === null) return;
    q.answers[q.index] = q.selected; q.revealed = true; q.revealT = Date.now();
    const cur = q.questions[q.index], right = q.selected === cur.correctIndex;
    announce((right ? "Correct. " : "Not quite. The answer is " + "ABCD"[cur.correctIndex] + ". ") + plain(cur.explanation));
    ui.focus = "next";
  }

  function quizNext() {
    const q = ui.quiz, lv = level();
    if (!q || !q.revealed) return;
    if (q.index < q.questions.length - 1) {
      q.index++; q.selected = null; q.revealed = false; q.shownT = Date.now(); delete ui.labs.quiz;
      ui.focus = "question"; ui.scrollTop = true; return;
    }
    q.finished = true;
    q.result = L.gradeQuiz(q.questions, q.answers, lv.quizConfig.passCorrect);
    const rec = record(lv.id), pts = L.quizPoints(q.result.score, q.difficulty);
    if (pts > rec.bestPoints || (pts === rec.bestPoints && q.result.score > rec.bestScore)) {
      rec.bestPoints = pts; rec.bestScore = q.result.score; rec.bestDifficulty = q.difficulty;
    }
    if (q.result.passed) rec.quizPassed = true;
    saveProgress();
    const key = quizKey(lv, q.difficulty);
    ui.lastQuizIds[key] = q.questions.map(function (x) { return x.id; });
    ui.failedQuiz[key] = !q.result.passed;
    announce("You scored " + q.result.score + " out of 10. " + (q.result.passed ? "Circuit builder unlocked." : "You need 8 to pass. Try again."));
    ui.focus = "results"; ui.scrollTop = true;
  }

  function pushHistory() { ui.build.history.push(L.cloneCircuit(ui.build.circ)); ui.build.result = null; ui.build.passed = false; ui.build.feedback = null; }

  function cellClick(c, r) {
    const b = ui.build, B = level().build, circ = b.circ, sel = b.selected;
    if (sel && sel.kind === "macro") {
      if (circ.macros[c] === sel.id) { pushHistory(); circ.macros[c] = null; return; }
      pushHistory(); circ.macros[c] = sel.id; circ.cells[c] = B.rows.map(function () { return null; }); b.placed = { c: c, r: -1, t: Date.now() }; return;
    }
    if (sel && sel.kind === "gate") {
      if (!B.rows[r] || !B.rows[r].editable) return;
      pushHistory();
      if (circ.macros[c]) { circ.macros[c] = null; }
      circ.cells[c][r] = circ.cells[c][r] === sel.id ? null : sel.id;
      if (circ.cells[c][r]) b.placed = { c: c, r: r, t: Date.now() };
      return;
    }
    if (circ.macros[c]) { pushHistory(); circ.macros[c] = null; return; }
    if (circ.cells[c][r]) { pushHistory(); circ.cells[c][r] = null; return; }
    b.feedback = { type: "info", msg: "Choose a gate or block first, then click a spot on the circuit." };
  }

  function buildCheck() {
    const b = ui.build, lv = level(), B = lv.build;
    const res = L.checkCircuit(lv.id, B, b.circ);
    b.result = res; b.passed = res.ok; b.selected = null; b.runT = Date.now();
    b.feedback = res.ok ? { type: "ok", msg: B.success } : { type: "err", msg: res.message };
    if (res.ok && lv.followup && !b.follow) {
      b.follow = lv.followup === "simon"
        ? { kind: "simon", s: 1 + Math.floor(Math.random() * 7), samples: [], guess: [0, 0, 0], msg: null, done: false }
        : { kind: "shor", samples: [], r: null, rMsg: null, rOk: false, g1: "", g2: "", gMsg: null, done: false };
    }
    announce(plain(b.feedback.msg));
    ui.focus = res.ok && !lv.followup ? "build-next" : "build-feedback";
  }

  function finishLevel() {
    const lv = level(), b = ui.build;
    if (!b || !b.passed || (lv.followup && !(b.follow && b.follow.done))) return;
    record(lv.id).completed = true;
    saveProgress();
    ui.screen = "reward"; ui.focus = "reward"; ui.scrollTop = true;
    announce(lv.module.name + " installed.");
  }

  function createPlayer(name) {
    name = String(name || "").trim().replace(/\s+/g, " ").slice(0, 20);
    if (!name) { ui.nameError = "Please type a name."; ui.focus = "player-name"; return; }
    const existing = Object.keys(progress.players).find(function (id) { return progress.players[id].name.toLowerCase() === name.toLowerCase(); });
    if (existing) progress.current = existing;
    else {
      const id = "p" + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
      progress.players[id] = { name: name, difficulty: "medium", levels: {} };
      progress.current = id;
    }
    ui.pickPlayer = false; ui.nameError = null;
    saveProgress();
  }

  const actions = {
    "go-home": function () { ui.screen = "home"; ui.scrollTop = true; },
    "open-level": function (d) { openLevel(Number(d.i)); },
    "go-step": function (d) { goStep(d.step); },
    "lesson-page": function (d) {
      const i = Number(d.i);
      if (i >= 0 && i < level().lessonCards.length && i !== ui.lessonPage) { ui.enterDir = i < ui.lessonPage ? -1 : 1; ui.enterT = Date.now(); ui.lessonPage = i; ui.focus = "lesson"; ui.scrollTop = true; }
    },
    "lab": function (d) {
      const lab = ui.labs[d.lab]; if (!lab) return;
      lab._acted = { op: d.op, v: d.v, t: Date.now() };
      const ret = LABS[lab.kind].act(lab, d.op, d.v);
      // Some steps are shown in two beats (Grover's full iteration).
      if (ret && ret.redrawIn) setTimeout(function () { if (ui.labs[d.lab] === lab) render(); }, ret.redrawIn);
      announce(LABS[lab.kind].summary(lab));
    },
    "challenge-check": function (d) {
      const lv = level(), i = Number(d.i), ch = lv.challenges[i], lab = getLab("explore", lv.lab.kind);
      const r = LABS[lv.lab.kind].checks[ch.check](lab);
      (ui.challenges[lv.id] = ui.challenges[lv.id] || [])[i] = r;
      announce(plain(r.msg));
    },
    "difficulty": function (d) { player().difficulty = d.v; saveProgress(); },
    "quiz-start": startQuiz,
    "quiz-again": startQuiz,
    "quiz-select": function (d) { quizSelect(Number(d.i)); },
    "quiz-submit": quizSubmit,
    "quiz-next": quizNext,
    "pick": function (d) {
      const b = ui.build;
      b.selected = b.selected && b.selected.kind === d.kind && b.selected.id === d.id ? null : { kind: d.kind, id: d.id };
    },
    "cell": function (d) { cellClick(Number(d.c), Number(d.r)); },
    "build-undo": function () { const b = ui.build; if (b.history.length) { b.circ = b.history.pop(); b.result = null; b.passed = false; b.feedback = null; } },
    "build-clear": function () { pushHistory(); ui.build.circ = L.emptyCircuit(level().build); },
    "build-hint": function () { const b = ui.build, h = level().build.hints; b.hints = Math.min(b.hints + 1, h.length); announce(plain(h[b.hints - 1])); },
    "build-check": buildCheck,
    "build-finish": finishLevel,
    "simon-run": function () {
      const f = ui.build.follow, lv = level();
      const probs = L.measuredProbs(lv.build, ui.build.circ, { f: L.simonFunction(f.s, 3) });
      f.samples.push(L.sample(probs)); f.msg = null;
    },
    "simon-guess": function (d) { ui.build.follow.guess[Number(d.i)] ^= 1; },
    "simon-check": function () {
      const f = ui.build.follow, g = f.guess[0] * 4 + f.guess[1] * 2 + f.guess[2];
      if (!f.samples.length) { f.msg = "Run the circuit first to collect equations."; return; }
      if (g === 0) { f.msg = "The mask must be nonzero."; return; }
      const bad = f.samples.find(function (y) { return L.dot2(y, g) !== 0; });
      if (bad !== undefined) { f.msg = "That mask breaks the equation from y = " + bits(bad, 3) + " (y·s would be 1)."; return; }
      const cands = L.simonCandidates(f.samples, 3);
      if (cands.length > 1) { f.msg = "That mask fits every equation so far, but so " + (cands.length === 2 ? "does 1 other mask" : "do " + (cands.length - 1) + " other masks") + ". Run the circuit again to get another independent equation."; return; }
      f.done = true;
      f.msg = "Solved: s = " + bits(g, 3) + ", found from " + f.samples.length + " runs of your circuit. Solving the equations was the classical step.";
      ui.focus = "build-next";
    },
    "shor-run": function () {
      const f = ui.build.follow, lv = level();
      f.samples.push(L.sample(L.measuredProbs(lv.build, ui.build.circ, {})));
    },
    "shor-r": function (d) {
      const f = ui.build.follow, r = Number(d.v), v = L.powMod(2, r, 15);
      f.r = r;
      if (r === 4) { f.rOk = true; f.rMsg = "2⁴ mod 15 = 1, and no smaller power of 2 gives 1. The period is r = 4 (even, as needed)."; }
      else if (v === 1) { f.rOk = false; f.rMsg = "2^" + r + " mod 15 = 1, but a smaller power already gives 1. The period is the smallest such r."; }
      else { f.rOk = false; f.rMsg = "2^" + r + " mod 15 = " + v + ", not 1, so r = " + r + " is not the period." + (r === 2 ? " (A measurement of 8 gives 1/2, which only tells you r is a multiple of 2.)" : ""); }
    },
    "shor-gcd": function () {
      const f = ui.build.follow;
      f.g1 = (document.getElementById("shor-g1") || {}).value || "";
      f.g2 = (document.getElementById("shor-g2") || {}).value || "";
      const a = parseInt(f.g1, 10), b = parseInt(f.g2, 10);
      if (a === 3 && b === 5) { f.done = true; f.gMsg = "15 = 3 × 5. Factored, using the period your circuit found."; ui.focus = "build-next"; }
      else f.gMsg = "Not quite. gcd(3, 15) is the largest number dividing both 3 and 15; do the same for gcd(5, 15).";
    },
    "switch-player": function () { ui.pickPlayer = true; ui.nameError = null; ui.focus = "player-name"; },
    "cancel-player": function () { ui.pickPlayer = false; ui.nameError = null; },
    "player-select": function (d) { if (progress.players[d.id]) { progress.current = d.id; ui.pickPlayer = false; ui.nameError = null; saveProgress(); } },
    "finale": function () { if (modulesEarned() === LEVELS.length) { ui.screen = "finale"; ui.focus = "finale"; ui.scrollTop = true; } },
    "reset-me": function () {
      const p = player();
      if (!p || !window.confirm("Reset all progress for " + p.name + "? Their modules and points will be cleared.")) return;
      p.levels = {}; saveProgress(); ui.quiz = null; ui.build = null; ui.challenges = {};
    },
    "toggle-retry": function () {
      progress.settings.newQuestionsOnRetry = !progress.settings.newQuestionsOnRetry; saveProgress();
      announce(progress.settings.newQuestionsOnRetry ? "New questions after a failed quiz: on." : "New questions after a failed quiz: off. Retries reshuffle the same questions.");
    },
    "reset-all": function () {
      if (!window.confirm("Clear the leaderboard and every player on this device?")) return;
      const keep = progress.settings;
      progress = emptyProgress(); progress.settings = keep; saveProgress(); ui.quiz = null; ui.build = null; ui.challenges = {}; ui.pickPlayer = false;
    }
  };

  /* ================= Event listeners ================= */

  app.addEventListener("click", function (e) {
    const el = e.target.closest("[data-action]");
    if (!el || el.disabled || !app.contains(el)) return;
    const fn = actions[el.dataset.action];
    if (!fn) return;
    fn(el.dataset);
    render();
  });

  app.addEventListener("input", function (e) {
    const k = e.target.dataset && e.target.dataset.field;
    if (k && e.target.closest('[data-form="suggest"]')) {
      ui.suggest[k] = e.target.value;
      if (ui.suggest.status === "sent" || ui.suggest.status === "invalid") ui.suggest.status = null;
    }
  });

  app.addEventListener("submit", function (e) {
    if (e.target.matches('[data-form="suggest"]')) { e.preventDefault(); sendSuggestion(e.target); return; }
    if (!e.target.matches('[data-form="player"]')) return;
    e.preventDefault();
    createPlayer((document.getElementById("player-name") || {}).value);
    render();
  });

  // Keyboard: 1-4 / A-D pick a quiz answer, Enter submits or continues,
  // Escape drops the selected gate in the builder.
  document.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || ui.screen !== "level") return;
    const active = document.activeElement, tag = active ? active.tagName : "";
    if (tag === "INPUT" || tag === "TEXTAREA") return;
    if (ui.step === "build" && e.key === "Escape" && ui.build && ui.build.selected) { ui.build.selected = null; render(); return; }
    const q = ui.quiz;
    if (ui.step !== "quiz" || !q || q.finished || q.levelId !== level().id) return;
    const k = e.key.length === 1 ? e.key.toLowerCase() : "";
    const idx = k ? Math.max("1234".indexOf(k), "abcd".indexOf(k)) : -1;
    if (idx >= 0 && !q.revealed) {
      e.preventDefault(); quizSelect(idx); render();
      const btn = app.querySelector('[data-action="quiz-select"][data-i="' + idx + '"]');
      if (btn) btn.focus();
      return;
    }
    if (e.key === "Enter" && active && active.dataset && active.dataset.action === "quiz-select" && !q.revealed) {
      e.preventDefault(); quizSelect(Number(active.dataset.i)); quizSubmit(); render(); return;
    }
    if (e.key === "Enter" && tag !== "BUTTON" && tag !== "A" && tag !== "SUMMARY") {
      if (!q.revealed && q.selected !== null) { e.preventDefault(); quizSubmit(); render(); }
      else if (q.revealed) { e.preventDefault(); quizNext(); render(); }
    }
  });

  /* ================= Start ================= */

  function probe(src) {
    return new Promise(function (resolve) {
      const img = new Image();
      img.onload = function () { resolve(true); };
      img.onerror = function () { resolve(false); };
      img.src = src;
    });
  }

  render();
  Promise.all([probe("assets/princeton-logo.png"), probe("assets/psq-logo.png")]).then(function (ok) {
    ui.logos.princeton = ok[0]; ui.logos.psq = ok[1];
    if (ok[0] || ok[1]) render();
  });

  // Hook for automated tests and demos. Not used by the game itself.
  window.QQApp = { ui: ui, getProgress: function () { return progress; }, render: render };
})();
