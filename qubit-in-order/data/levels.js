/* Qubit in Order level definitions (all six levels).
 *
 * Text rules:
 *   - lessonCards[].html is trusted HTML written by the team (shown as-is).
 *   - Everything else is plain text. The game escapes it, then turns
 *     "U_f" into U with a subscript f and "(−1)^f(x)" into a superscript.
 *
 * Each level has:
 *   lessonCards  - the Learn step
 *   lab          - which interactive lab the Explore step shows (see js/labs.js)
 *   challenges   - lab challenges, answered by changing the lab
 *   quizConfig   - 10 questions of the chosen difficulty, 8 correct to pass
 *   build        - the circuit puzzle: wires (rows), time steps (cols),
 *                  allowed gates, prebuilt algorithm blocks (macros), goals,
 *                  3 hints. The game simulates the circuit exactly and tests
 *                  it against every possible mystery box (js/logic.js).
 *   followup     - Simon and Shor finish with a classical step after the circuit
 */

/* The Clifford gates the player can place (plus a control dot).
 * Matrices are shown in the "What does each gate do?" panel. */
window.QQ_GATES = {
  H: { name: "Hadamard", symbol: "H", desc: "Creates and undoes superpositions: |0⟩ → (|0⟩+|1⟩)/√2, |1⟩ → (|0⟩−|1⟩)/√2.",
       matrix: [["1", "1"], ["1", "−1"]], factor: "1/√2" },
  X: { name: "Pauli-X", symbol: "X", desc: "The quantum NOT: swaps |0⟩ and |1⟩. With a control dot it becomes a CNOT.",
       matrix: [["0", "1"], ["1", "0"]] },
  Y: { name: "Pauli-Y", symbol: "Y", desc: "Swaps |0⟩ and |1⟩ and adds a phase: |0⟩ → i|1⟩, |1⟩ → −i|0⟩.",
       matrix: [["0", "−i"], ["i", "0"]] },
  Z: { name: "Pauli-Z", symbol: "Z", desc: "Flips the sign of |1⟩ and leaves |0⟩ alone. With a control dot it becomes a CZ.",
       matrix: [["1", "0"], ["0", "−1"]] },
  S: { name: "Phase (S)", symbol: "S", desc: "Multiplies |1⟩ by i (a quarter turn of phase). Two S gates make a Z.",
       matrix: [["1", "0"], ["0", "i"]] },
  C: { name: "Control", symbol: "●", desc: "Put a control dot on another wire in the same time step. Every gate in that step then acts only when this qubit is 1. Control + Pauli-X = CNOT, Control + Pauli-Z = CZ.",
       matrix: null }
};

window.QQ_LEVELS = [
  /* ================================================================== */
  {
    id: "deutsch",
    order: 1,
    name: "Deutsch's Algorithm",
    shortTitle: "The Two-Input Mystery",
    module: { name: "Oracle Module", short: "Oracle" },
    learned: "One quantum query can reveal a global property (constant or balanced) that takes two classical queries.",
    ref: "Scott Aaronson, Introduction to Quantum Information Science lecture notes, Lecture 17.3 (printed pp. 138-139)",
    intro: "A sealed box computes a secret function of one bit. Is it constant or balanced? A classical computer must ask the box twice. You will learn how one quantum question is enough.",
    lessonCards: [
      { title: "The mystery box", html: `
<p>Someone hands you a sealed box. You give it one bit, 0 or 1, and it gives back one bit: <b>f(0)</b> or <b>f(1)</b>. There are only four boxes it could be:</p>
<table class="truth">
  <thead><tr><th>Box</th><th>f(0)</th><th>f(1)</th><th>Type</th></tr></thead>
  <tbody>
    <tr><td>A</td><td>0</td><td>0</td><td>constant</td></tr>
    <tr><td>B</td><td>1</td><td>1</td><td>constant</td></tr>
    <tr><td>C</td><td>0</td><td>1</td><td>balanced</td></tr>
    <tr><td>D</td><td>1</td><td>0</td><td>balanced</td></tr>
  </tbody>
</table>
<p><b>Constant</b> means f(0) = f(1). <b>Balanced</b> means f(0) ≠ f(1). Your job is to find the <i>type</i>, not the two individual outputs.</p>
<p>A classical computer has to ask twice. Learning f(0) = 0 alone settles nothing: the box could still be A or C. Deutsch's algorithm gets the answer with <b>one</b> question to the box. To see how, we need three ideas: amplitudes, the Hadamard gate, and the phase oracle.</p>` },
      { title: "Qubits and amplitudes", html: `
<p>A qubit's state is written <span class="math">a|0⟩ + b|1⟩</span>. The numbers <i>a</i> and <i>b</i> are called <b>amplitudes</b>. When you measure the qubit you get 0 with probability a² and 1 with probability b², so a² + b² = 1.</p>
<p>Amplitudes are not probabilities. The big difference: <b>amplitudes can be negative</b>. When two contributions to the same outcome meet, they add if their signs match and cancel if their signs are opposite. This adding and cancelling is called <b>interference</b>, and every algorithm in this game depends on it.</p>
<p>The sign difference between the |0⟩ part and the |1⟩ part is called the <b>relative phase</b>. In this level a phase is always just + or −.</p>
<p class="aside">In general, amplitudes can be complex numbers and the probability is |a|². Every amplitude in this level is a real number, so the probability is simply the amplitude squared.</p>` },
      { title: "The Hadamard gate", html: `
<p>The Hadamard gate is the main tool for making superpositions:</p>
<p class="math-block">H|0⟩ = (|0⟩ + |1⟩)/√2, called |+⟩<br>H|1⟩ = (|0⟩ − |1⟩)/√2, called |−⟩</p>
<p>Both |+⟩ and |−⟩ give 0 or 1 with probability ½ each. Measured directly, they look identical. They differ only in the sign of the |1⟩ part.</p>
<p>Now apply the Hadamard a second time to |+⟩. The two contributions to |1⟩ are +½ and −½, so they <b>cancel</b>. The two contributions to |0⟩ are +½ and +½, so they <b>add</b> to 1. The result is |0⟩ with certainty. Applying it to |−⟩ gives |1⟩ with certainty.</p>
<p>So "Hadamard, then measure" reads the hidden sign: <b>+ gives 0, − gives 1</b>. A coin flip cannot do this. You cannot un-flip a coin, but a Hadamard turns a 50/50 superposition back into a definite answer.</p>` },
      { title: "The phase oracle U_f", html: `
<p>The mystery box is given to us as a quantum gate called a <b>phase oracle</b>, written <b>U<sub>f</sub></b>. It does not print f(x). Instead it multiplies the |x⟩ part of the state by (−1)<sup>f(x)</sup>: parts where f(x) = 0 keep their sign, parts where f(x) = 1 get a minus sign.</p>
<p>Give it |+⟩ = (|0⟩ + |1⟩)/√2 and it acts on both inputs in a single query:</p>
<ul>
  <li><b>Constant box</b> (A or B): both parts get the same sign. Result: |+⟩ or −|+⟩.</li>
  <li><b>Balanced box</b> (C or D): the parts get opposite signs. Result: |−⟩ or −|−⟩.</li>
</ul>
<p>A minus sign in front of the <i>whole</i> state is a <b>global phase</b>. It never changes any measurement probability, so −|+⟩ behaves exactly like |+⟩. What matters is the relative sign, and that depends only on whether f(0) = f(1).</p>
<p class="aside">Many textbooks build the oracle from a two-qubit gate plus a helper qubit prepared in |−⟩ (a trick called phase kickback). The one-qubit phase oracle used here gives the same result and is easier to follow.</p>` },
      { title: "Deutsch's algorithm, step by step", html: `
<p>The full circuit is <b>Hadamard → U<sub>f</sub> → Hadamard → Measure</b>. Worked example with box C, where f(0) = 0 and f(1) = 1:</p>
<ol class="steps">
  <li>Start: <span class="math">|0⟩</span></li>
  <li>After the Hadamard: <span class="math">(|0⟩ + |1⟩)/√2</span></li>
  <li>After U<sub>f</sub>: f(1) = 1, so only the |1⟩ part flips: <span class="math">(|0⟩ − |1⟩)/√2 = |−⟩</span></li>
  <li>After the second Hadamard: <span class="math">|1⟩</span></li>
  <li>Measure: <b>1</b>, with certainty. The box is balanced.</li>
</ol>
<p>For a constant box, the state before the last Hadamard is ±|+⟩, so the measurement gives <b>0</b> with certainty.</p>
<p class="rule"><b>Rule:</b> measure 0 → constant. Measure 1 → balanced. One query instead of two.</p>
<p class="aside">What this does <i>not</i> tell you: the individual values f(0) and f(1). The algorithm answers exactly one yes/no question. These results assume ideal, noise-free gates.</p>` },
      { title: "Applications", html: `
<p>Deutsch's algorithm does not solve a practical problem by itself. Its value is that it was the <b>first proof</b> that a quantum computer can beat every classical computer at something (counting questions to a black box), even something tiny.</p>
<ul>
  <li><b>The first quantum speedup (1985).</b> David Deutsch showed that one quantum query can compute f(0) XOR f(1), the parity of two bits, which no single classical query can do. This launched the study of <b>query complexity</b>: counting how many questions an algorithm must ask a black box.</li>
  <li><b>A pattern reused everywhere.</b> The trick of turning an answer into a <b>phase</b> and reading it with interference (phase kickback) reappears in Deutsch-Jozsa, Bernstein-Vazirani, Grover, and the phase-estimation step inside Shor's algorithm.</li>
  <li><b>An early hardware test.</b> In 1998 it was among the first algorithms run on real quantum hardware (small nuclear magnetic resonance experiments). It is still a standard first program for anyone learning to program a quantum computer.</li>
</ul>
<p class="aside">Takeaway: quantum computers do not win by "trying both inputs and reading both answers". They win by making the wrong answers cancel.</p>` }
    ],
    lab: { kind: "qubit-lab" },
    challenges: [
      { check: "fifty-fifty", title: "Make it 50/50", task: "Set up the demonstration so that measuring gives 0 and 1 with equal probability." },
      { check: "balanced-gives-one", title: "Detect a balanced box", task: "Pick a balanced function and turn on stages so the measurement is guaranteed to give 1." },
      { check: "sneaky-constant", title: "The sneaky constant", task: "With all three stages on, choose a function that outputs 1 for at least one input but still makes the measurement 0 with certainty." }
    ],
    quizConfig: { roundSize: 10, passCorrect: 8 },
    build: {
      cols: 5,
      rows: [{ label: "", init: "0", editable: true }],
      measureRows: [0],
      gates: ["H", "X", "Y", "Z", "S"],
      macros: [
        { id: "U", op: "phase-oracle", rows: [0], label: "U_f", name: "Phase oracle U_f",
          desc: "The mystery box, supplied as a ready-made block. It multiplies |x⟩ by (−1)^f(x). The game tests your circuit with all four boxes." }
      ],
      goals: [
        "Prepare: give the oracle both inputs at once.",
        "Query: ask the box exactly one question.",
        "Interfere: turn the oracle's sign into a definite answer.",
        "Read out: constant must give 0, balanced must give 1."
      ],
      hints: [
        "The oracle can only compare f(0) and f(1) if the qubit is in a superposition of |0⟩ and |1⟩ when it arrives.",
        "The oracle leaves its answer in a sign. The same gate that created the superposition can turn a sign into a 0 or 1.",
        "Hadamard → U_f → Hadamard. The measurement at the end is built in."
      ],
      success: "Circuit complete. You built Deutsch's algorithm.",
      expected: "Ideal behavior: a constant box gives 0 every time and a balanced box gives 1 every time. One query decides the question."
    },
    scoring: true
  },

  /* ================================================================== */
  {
    id: "deutsch_jozsa",
    order: 2,
    name: "Deutsch-Jozsa Algorithm",
    shortTitle: "The Pattern Test",
    module: { name: "Pattern Module", short: "Pattern" },
    learned: "With a promise, one query separates constant from balanced functions of many bits; a deterministic classical algorithm can need exponentially many.",
    ref: "Scott Aaronson, Introduction to Quantum Information Science lecture notes, Lecture 17.4 (printed pp. 139-141)",
    intro: "Now the mystery box takes several bits. It is promised to be either constant or balanced. Can one quantum query still tell which?",
    lessonCards: [
      { title: "From one bit to many", html: `
<p>The box now takes an <b>n-bit</b> input x and returns one bit f(x). With 2 input bits there are 4 inputs (00, 01, 10, 11), with 3 bits there are 8, and with n bits there are 2<sup>n</sup>.</p>
<p>We are given a <b>promise</b>: f is either</p>
<ul>
  <li><b>constant</b>: every input gives the same output, or</li>
  <li><b>balanced</b>: exactly half the inputs give 0 and half give 1.</li>
</ul>
<p>Example with 2 bits: outputs <b>0, 1, 1, 0</b> for inputs 00, 01, 10, 11 contain two 0s and two 1s, so f is balanced.</p>
<p>A classical computer that must be certain may need to check just over half the inputs: 2<sup>n−1</sup> + 1 queries. If the first half all match, the function could still be balanced. For n = 2 that is 3 queries. For n = 10 it is 513.</p>` },
      { title: "One superposition, every input", html: `
<p>Put a Hadamard on each of the n qubits. Starting from |00⟩, two Hadamards give</p>
<p class="math-block">½ (|00⟩ + |01⟩ + |10⟩ + |11⟩)</p>
<p>All 2<sup>n</sup> inputs now have the same amplitude, 1/√(2<sup>n</sup>). For two qubits that is ½.</p>
<p>The phase oracle acts on this superposition once and gives each input its sign: (−1)<sup>f(x)</sup>. For outputs 0, 1, 1, 0 the signs are <b>+, −, −, +</b>.</p>
<p>Measuring now would be useless: signs do not change probabilities, so every input would be equally likely. The information is hidden in the sign pattern.</p>` },
      { title: "Why all-zeros decides it", html: `
<p>Apply a Hadamard to every qubit again. The amplitude of the all-zeros outcome works out to the <b>average of the signs</b>:</p>
<p class="math-block">amplitude of |00…0⟩ = average of (−1)<sup>f(x)</sup> over all x</p>
<ul>
  <li><b>Constant:</b> every sign is the same, so the average is +1 or −1. All zeros is measured with certainty.</li>
  <li><b>Balanced:</b> half the signs are + and half are −, so the average is 0. All zeros <b>never</b> appears.</li>
</ul>
<p>Worked example: for 0, 1, 1, 0 the signs are +, −, −, + with average 0, so you never measure 00. (In fact you measure 11 every time.)</p>
<p class="rule"><b>Rule:</b> all zeros → constant. Anything else → balanced. One query.</p>` },
      { title: "Deutsch-Jozsa algorithm, step by step", html: `
<p>The circuit is <b>Hadamard on every qubit → U<sub>f</sub> → Hadamard on every qubit → Measure</b>. Worked example with 2 input bits and outputs 0, 1, 1, 0 (balanced):</p>
<ol class="steps">
  <li>Start: <span class="math">|00⟩</span></li>
  <li>After the Hadamards: <span class="math">½(|00⟩ + |01⟩ + |10⟩ + |11⟩)</span>. All four inputs at once.</li>
  <li>After U<sub>f</sub>: the inputs with f(x) = 1 flip sign: <span class="math">½(|00⟩ − |01⟩ − |10⟩ + |11⟩)</span></li>
  <li>After the second Hadamards: the amplitude of |00⟩ is the average of the signs, (1 − 1 − 1 + 1)/4 = 0. (The whole state becomes <span class="math">|11⟩</span>.)</li>
  <li>Measure: <b>11</b>, which is not all zeros. The function is balanced.</li>
</ol>
<p>For a constant function every sign is the same, the average is ±1, and the measurement is <b>00</b> with certainty.</p>
<p class="rule"><b>Rule:</b> all zeros → constant. Anything else → balanced. One query, zero chance of error, under the promise.</p>` },
      { title: "Limits of the speedup", html: `
<p>The guarantee depends on the promise. Outputs 1, 1, 1, 0 are neither constant nor balanced. Their signs −, −, −, + average to −½, so all zeros appears with probability ¼: not 0, not 1. Without the promise, the one-shot test is not reliable.</p>
<p>A randomized classical algorithm can also do well. If the function is balanced, a few random queries will almost surely show two different outputs. The clean advantage of Deutsch-Jozsa is against algorithms that must be <i>certain</i>: one quantum query versus 2<sup>n−1</sup> + 1.</p>
<p class="aside">In this game the oracle is a prebuilt phase-oracle block acting on the input qubits. Textbooks often build it with an extra helper qubit, which gives the same result.</p>` },
      { title: "Applications", html: `
<ul>
  <li><b>The first exponential gap for exact answers (1992).</b> To be <i>certain</i>, a classical computer may need 2<sup>n−1</sup> + 1 queries; the quantum algorithm needs 1. It was the first problem showing an exponential separation between zero-error quantum and deterministic classical computation.</li>
  <li><b>An honest limitation.</b> The lecture notes point out that the speedup is modest in practice: a randomized classical algorithm that checks a few random inputs is almost always right. Closing that loophole is exactly what Bernstein-Vazirani and Simon went on to do.</li>
  <li><b>A benchmark for real machines.</b> Because the ideal answer is deterministic (00 or not), Deutsch-Jozsa is a common test for small quantum processors: any wrong answer exposes noise.</li>
  <li><b>The "Hadamard sandwich".</b> The pattern H layer → oracle → H layer is reused directly by Bernstein-Vazirani and Simon.</li>
</ul>` }
    ],
    lab: { kind: "tt-lab" },
    challenges: [
      { check: "tt-balanced", title: "Build a balanced function", task: "Toggle the outputs to make a balanced function, then check." },
      { check: "tt-constant-one", title: "A constant that isn't zero", task: "Make a constant function whose outputs are not all 0. What does the circuit measure?" },
      { check: "tt-break-promise", title: "Break the promise", task: "Make a function that is neither constant nor balanced, then look at P(00)." }
    ],
    quizConfig: { roundSize: 10, passCorrect: 8 },
    build: {
      cols: 5,
      rows: [{ label: "", init: "0", editable: true }, { label: "", init: "0", editable: true }],
      measureRows: [0, 1],
      gates: ["H", "X", "Y", "Z", "S", "C"],
      macros: [
        { id: "U", op: "phase-oracle", rows: [0, 1], label: "U_f", name: "Phase oracle U_f (2 qubits)",
          desc: "The mystery box on two input bits. It multiplies |x⟩ by (−1)^f(x). The game tests your circuit with both constant and all six balanced functions." }
      ],
      goals: [
        "Prepare: give the oracle all four inputs at once.",
        "Query: ask the box exactly one question.",
        "Interfere: turn the sign pattern into a bit string.",
        "Read out: constant must give 00, balanced must never give 00."
      ],
      hints: [
        "Every input qubit needs to be in superposition before the oracle, just like in Deutsch's algorithm.",
        "After the oracle, each qubit needs the gate that turns signs back into bits.",
        "A Hadamard on both wires → U_f → a Hadamard on both wires."
      ],
      success: "Circuit complete. You built the Deutsch-Jozsa algorithm.",
      expected: "Ideal behavior: constant functions always give 00, balanced functions never do. One query decides the question."
    },
    scoring: true
  },

  /* ================================================================== */
  {
    id: "bernstein_vazirani",
    order: 3,
    name: "Bernstein-Vazirani Algorithm",
    shortTitle: "The Hidden Code",
    module: { name: "Code Module", short: "Code" },
    learned: "One query to a parity oracle reveals a whole hidden n-bit string; classically each query reveals at most one bit.",
    ref: "Scott Aaronson, Introduction to Quantum Information Science lecture notes, Lecture 18.1 (printed pp. 142-144)",
    intro: "A secret 3-bit code s is locked inside a box. Classically you need one question per bit. Quantum needs one question in total.",
    lessonCards: [
      { title: "A secret inside the box", html: `
<p>The box hides a secret string <b>s</b>, for example s = 101. Give it an input x and it returns</p>
<p class="math-block">f(x) = s·x mod 2</p>
<p>To compute s·x, multiply matching bits, add them up, and keep only whether the total is even (0) or odd (1).</p>
<p>Worked example: s = 101, x = 110. The products are 1·1 = 1, 0·1 = 0, 1·0 = 0. The sum is 1, which is odd, so <b>f(110) = 1</b>.</p>
<p>Another way to say it: f(x) is 1 when s and x share an <b>odd</b> number of 1s.</p>` },
      { title: "The classical way: one bit per query", html: `
<p>Ask the box about x = 100. Only the first position can contribute, so the answer is the first bit of s. Then x = 010 gives the second bit, and x = 001 gives the third.</p>
<p>That takes 3 queries for a 3-bit secret, and you cannot do better: each answer is a single bit, and there are 2³ = 8 possible secrets to tell apart. In general a classical computer needs <b>n queries</b> for an n-bit secret.</p>` },
      { title: "The quantum way: one query", html: `
<p>Use the same circuit as Deutsch-Jozsa: Hadamards on every qubit, the oracle, Hadamards again.</p>
<p>After the oracle, every input x carries the sign (−1)<sup>s·x</sup>. Here is the key fact: putting a Hadamard on every qubit of the state |s⟩ produces <b>exactly this sign pattern</b>. And applying Hadamards twice does nothing at all.</p>
<p>So the final Hadamards undo the pattern and leave <b>|s⟩</b>. Measuring reads out the whole secret, with certainty, after one query.</p>` },
      { title: "Worked example with 2 bits", html: `
<p>Take s = 10. For inputs 00, 01, 10, 11, the values s·x are 0, 0, 1, 1, so the signs are <b>+, +, −, −</b>.</p>
<p>Now check: a Hadamard on each qubit of |10⟩ gives ½(|00⟩ + |01⟩ − |10⟩ − |11⟩), the same signs. The final Hadamards therefore turn the pattern back into |10⟩, and you measure <b>10</b>.</p>
<p class="aside">The guarantee assumes the promise that f really has the form s·x mod 2. The oracle is a prebuilt phase-oracle block; it is not correct to say one measurement identifies an arbitrary unknown function.</p>` },
      { title: "Bernstein-Vazirani algorithm, step by step", html: `
<p>The circuit is <b>Hadamard on every qubit → U<sub>s</sub> → Hadamard on every qubit → Measure</b>. Worked example with the secret s = 101:</p>
<ol class="steps">
  <li>Start: <span class="math">|000⟩</span></li>
  <li>After the Hadamards: all 8 inputs, each with amplitude 1/√8.</li>
  <li>After U<sub>s</sub>: an input x gets a minus sign when s·x is odd. For s = 101 that is x = 001, 011, 100 and 110; the other four keep a plus sign.</li>
  <li>After the second Hadamards: this sign pattern is exactly the pattern a Hadamard on each qubit makes from <span class="math">|101⟩</span>, so the state becomes <span class="math">|101⟩</span>.</li>
  <li>Measure: <b>101</b>, with certainty. That is the secret.</li>
</ol>
<p class="rule"><b>Rule:</b> the measurement <i>is</i> the secret string. One query instead of n.</p>` },
      { title: "Applications", html: `
<ul>
  <li><b>Defining quantum computing as a field (1993).</b> In the same paper, Ethan Bernstein and Umesh Vazirani defined <b>BQP</b>, the class of problems a quantum computer can solve efficiently. It is still the standard definition used today.</li>
  <li><b>Beating randomized algorithms.</b> A randomized classical algorithm still needs n queries, because each answer is only one bit. A recursive version of this problem gave the first evidence that quantum computers can beat <i>randomized</i> classical ones by more than a polynomial amount, which Simon's algorithm then made exponential.</li>
  <li><b>Learning a hidden rule in one shot.</b> f(x) = s·x is a simple linear rule. Recovering such rules from examples is a central problem in learning theory, and Bernstein-Vazirani is the cleanest case where quantum queries help.</li>
  <li><b>A popular hardware benchmark.</b> Like Deutsch-Jozsa, the ideal answer is one exact string, so it is easy to see how often a noisy machine gets it right.</li>
</ul>` }
    ],
    lab: { kind: "bv-lab" },
    challenges: [
      { check: "bv-even-overlap", title: "An even overlap", task: "Set s = 101. Find an input x with at least two 1s that gives f(x) = 0." },
      { check: "bv-half-minus", title: "Balanced but quiet on 111", task: "Choose a nonzero secret s for which the input 111 gives f = 0." },
      { check: "bv-mystery", title: "Crack a mystery code", task: "A secret is hidden. Use classical queries (set x, press Query) to work out s, then enter your answer." }
    ],
    quizConfig: { roundSize: 10, passCorrect: 8 },
    build: {
      cols: 5,
      rows: [{ label: "", init: "0", editable: true }, { label: "", init: "0", editable: true }, { label: "", init: "0", editable: true }],
      measureRows: [0, 1, 2],
      gates: ["H", "X", "Y", "Z", "S", "C"],
      macros: [
        { id: "U", op: "phase-oracle", rows: [0, 1, 2], label: "U_s", name: "Secret oracle U_s (3 qubits)",
          desc: "Multiplies |x⟩ by (−1)^(s·x) for a hidden 3-bit secret s. The game tests your circuit with all 8 secrets." }
      ],
      goals: [
        "Prepare: give the oracle every input at once.",
        "Query: ask the box exactly one question.",
        "Interfere: turn the sign pattern into a bit string.",
        "Read out: the measurement must equal the secret s."
      ],
      hints: [
        "This is the same shape as the Deutsch-Jozsa circuit, with one more qubit.",
        "Each of the three qubits needs the same gate before and after the oracle.",
        "A Hadamard on all three wires → U_s → a Hadamard on all three wires."
      ],
      success: "Circuit complete. You built the Bernstein-Vazirani algorithm.",
      expected: "Ideal behavior: for every secret s, the measurement equals s with certainty, after one query."
    },
    scoring: true
  },

  /* ================================================================== */
  {
    id: "simon",
    order: 4,
    name: "Simon's Algorithm",
    shortTitle: "The Hidden XOR Pair",
    module: { name: "XOR Module", short: "XOR" },
    learned: "Repeated runs give linear equations y·s = 0 that pin down a hidden XOR mask; classically finding it takes exponentially more queries.",
    ref: "Scott Aaronson, Introduction to Quantum Information Science lecture notes, Lecture 18.2 (printed pp. 144-149)",
    intro: "Inputs come in hidden pairs that share an output. The pairs are linked by a secret XOR mask. Each quantum run gives you one clue, and a little algebra does the rest.",
    lessonCards: [
      { title: "Pairs that share an output", html: `
<p><b>XOR</b> compares two bits: it gives 1 when they differ and 0 when they match. For strings, XOR each position: 001 XOR 111 = 110.</p>
<p>Simon's box hides a nonzero mask <b>s</b> and makes this promise:</p>
<p class="math-block">f(x) = f(y) exactly when y = x or y = x XOR s</p>
<p>So the inputs come in pairs. With s = 110 the pairs are (000, 110), (001, 111), (010, 100) and (011, 101). Each pair shares an output, and different pairs have different outputs.</p>
<p>Worked example: if you ever see f(001) = f(111), the mask must be 001 XOR 111 = <b>110</b>.</p>
<p>Classically you have to stumble onto such a collision. With n-bit inputs that takes about 2<sup>n/2</sup> queries on average.</p>` },
      { title: "Two registers", html: `
<p>Simon's oracle does not flip signs. It writes its answer into a second register:</p>
<p class="math-block">|x⟩|y⟩ → |x⟩|y XOR f(x)⟩</p>
<p>The circuit uses an <b>input register</b> (3 qubits, starting at |000⟩) and an <b>output register</b> (3 more qubits, also |000⟩).</p>
<p>Hadamards on the input register create every x at once. One oracle call then attaches f(x) to each of them. Because paired inputs share an output, the input register ends up linked in pairs: x together with x XOR s.</p>` },
      { title: "What one run tells you", html: `
<p>Apply Hadamards to the input register again and measure it. You get a string <b>y</b>. Interference guarantees that</p>
<p class="math-block">y·s = 0 (mod 2)</p>
<p>The two members of each pair add with signs (−1)<sup>x·y</sup> and (−1)<sup>(x XOR s)·y</sup>. When y·s = 1 those signs are opposite and cancel, so such a y never appears.</p>
<p>One run does <b>not</b> give s. It gives one equation about s. For example, y = 001 means the last bit of s is 0.</p>` },
      { title: "Simon's algorithm, step by step", html: `
<p>Worked example with 3 input bits and the hidden mask s = 110.</p>
<ol class="steps">
  <li>Start: input register <span class="math">|000⟩</span>, output register <span class="math">|000⟩</span>.</li>
  <li>Hadamard on each input qubit: every x from 000 to 111 at once.</li>
  <li>Oracle: each x gets its output attached, <span class="math">|x⟩|f(x)⟩</span>.</li>
  <li>Imagine reading the output register (you do not have to). If it shows the value shared by 001 and 111, the input register is left as <span class="math">(|001⟩ + |111⟩)/√2</span>: one hidden pair.</li>
  <li>Hadamard on each input qubit, then measure it. You get a string y with <b>y·s = 0</b>. For s = 110 the possible results are 000, 001, 110 and 111.</li>
  <li>Repeat. Suppose two runs give y = 001 (so s₃ = 0) and y = 111 (so s₁ XOR s₂ XOR s₃ = 0, meaning s₁ = s₂). The only nonzero mask that fits is <b>110</b>.</li>
</ol>
<p class="rule"><b>Rule:</b> about n runs, each giving one equation; then solve the equations classically (Gaussian elimination). "Repeat" and "solve" are classical steps, not quantum gates.</p>` },
      { title: "Applications", html: `
<ul>
  <li><b>The first exponential speedup over randomized algorithms (1994).</b> Classically, finding s needs about 2<sup>n/2</sup> queries, even with randomness; quantumly about n runs suffice. The lecture notes call this a true exponential speedup, at least in the black-box setting.</li>
  <li><b>The direct ancestor of Shor's algorithm.</b> According to the lecture notes, Simon's paper was first rejected from a conference. Peter Shor, on the committee, saw how the same idea (find hidden structure by repeated sampling and interference) could find periods, and that became his factoring algorithm.</li>
  <li><b>The hidden subgroup framework.</b> Simon's, Shor's and several other algorithms are all ways of finding a hidden pattern, called a hidden subgroup. This view organizes much of the theory of quantum speedups.</li>
  <li><b>Attacks on some ciphers.</b> Researchers have shown that if an attacker could query certain encryption schemes in superposition, Simon's algorithm would break them (for example the Even-Mansour construction). That attack model is debated, but it affects how new ciphers are designed.</li>
</ul>
<p class="aside">The lecture notes also stress the caveat: no natural real-world problem is known to have exactly Simon's structure. Its importance is as a stepping stone.</p>` }
    ],
    lab: { kind: "simon-lab" },
    challenges: [
      { check: "simon-find-pair", title: "Find a pair", task: "Select two different inputs that share an output. What is their XOR?" },
      { check: "simon-pair-100", title: "Predict a partner", task: "Set the mask to 011, then select input 100 and the input it is paired with." },
      { check: "simon-orthogonal", title: "A valid measurement", task: "Set the mask to 110 and choose a measured string y, other than 000, that satisfies y·s = 0." }
    ],
    quizConfig: { roundSize: 10, passCorrect: 8 },
    build: {
      cols: 4,
      rows: [
        { label: "", init: "0", editable: true },
        { label: "", init: "0", editable: true },
        { label: "", init: "0", editable: true },
        { label: "output", init: "000", size: 3, editable: false, note: "3 qubits" }
      ],
      measureRows: [0, 1, 2],
      gates: ["H", "X", "Y", "Z", "S", "C"],
      macros: [
        { id: "O", op: "xor-oracle", rows: [0, 1, 2, 3], inRows: [0, 1, 2], outRows: [3], label: "U_f", name: "Simon oracle U_f",
          desc: "Writes f(x) into the output register: |x⟩|y⟩ → |x⟩|y XOR f(x)⟩, where f pairs inputs by a hidden mask s. The game tests all seven masks." }
      ],
      goals: [
        "Prepare: put the input register into a superposition of every x.",
        "Query: call the oracle once per run.",
        "Interfere: make the input register produce strings y with y·s = 0.",
        "Then (classical step): repeat runs and solve for s."
      ],
      hints: [
        "Only the input register (the top three wires) needs gates. The output register just receives f(x).",
        "Treat each input qubit the same way before and after the oracle.",
        "A Hadamard on each of the top three wires → U_f → a Hadamard on each of the top three wires. Then collect samples."
      ],
      success: "Circuit works. Now collect samples and solve for the hidden mask.",
      expected: "Ideal behavior: each run gives a random y with y·s = 0. Two independent equations pin down a 3-bit mask."
    },
    followup: "simon",
    scoring: true
  },

  /* ================================================================== */
  {
    id: "grover",
    order: 5,
    name: "Grover's Algorithm",
    shortTitle: "Find the Marked Item",
    module: { name: "Search Module", short: "Search" },
    learned: "Alternating a marking oracle with diffusion rotates amplitude toward the answer: about √N queries instead of N, with an optimal stopping point.",
    ref: "Scott Aaronson, Introduction to Quantum Information Science lecture notes, Lectures 22-23 (printed pp. 175-185 and following): Grover's algorithm, the BBBV theorem and applications",
    intro: "One of eight boxes holds the answer, and nothing about the boxes gives a clue. Grover's algorithm finds it with high probability in two queries.",
    lessonCards: [
      { title: "Searching without a map", html: `
<p>Imagine 8 boxes, numbered 000 to 111. Exactly one is <b>marked</b>. You can test any box, but nothing about the numbering helps you guess.</p>
<p>Classically, you might have to open all 8, and on average about half of them. In general, finding one marked item among N takes about N tests.</p>
<p>Grover's algorithm needs about <b>√N</b> queries. That is a quadratic speedup, not an exponential one, but it works for almost any search problem.</p>` },
      { title: "Mark, then amplify", html: `
<p>Start with a Hadamard on each of the 3 qubits: every box gets amplitude 1/√8 ≈ 0.354, so each has probability 1/8.</p>
<p>One <b>Grover iteration</b> has two steps:</p>
<ol class="steps">
  <li><b>Marking oracle:</b> flips the sign of the marked box. Its probability is still 1/8, because only the sign changed.</li>
  <li><b>Diffusion:</b> reflects every amplitude about the <b>average</b>. The marked amplitude sits far below the average, so it bounces far above it.</li>
</ol>
<p>Worked numbers: after the oracle, the average is (7 × 0.354 − 0.354)/8 ≈ 0.265. Diffusion sends the marked amplitude to 2(0.265) + 0.354 ≈ <b>0.884</b> (probability 78%) and every other amplitude to about 0.177.</p>` },
      { title: "Don't overdo it", html: `
<p>Each iteration turns the state by the same angle toward the marked box. With one marked item among N, the success probability after t iterations is</p>
<p class="math-block">sin²((2t + 1)·θ), where sin θ = 1/√N</p>
<p>For N = 8: <b>78%</b> after 1 iteration, <b>94.5%</b> after 2, but only <b>33%</b> after 3 and about 1% after 4. Turning too far overshoots the answer.</p>
<p>The best number of iterations is about (π/4)·√N. For N = 8 that is about 2.2, so we use 2.</p>` },
      { title: "Grover's algorithm, step by step", html: `
<p>Worked example: 8 items, the marked item is <b>101</b>. All numbers are exact amplitudes.</p>
<ol class="steps">
  <li>Hadamard on each of the 3 qubits: every item has amplitude 1/√8 ≈ 0.354 (probability 12.5%).</li>
  <li>Marking oracle: item 101 becomes −0.354. Probabilities are unchanged.</li>
  <li>Diffusion: the average is 0.265. Item 101 is reflected to <b>0.884</b> (78%); every other item drops to 0.177.</li>
  <li>Marking oracle again: item 101 becomes −0.884.</li>
  <li>Diffusion again: the average is now 0.044. Item 101 rises to <b>0.972</b> (94.5%); the others become −0.088 (under 1% each).</li>
  <li>Measure: <b>101</b> with probability 94.5%. Check the answer with one ordinary test, and rerun in the rare case it is wrong.</li>
</ol>
<p class="rule"><b>Rule:</b> repeat (oracle, diffusion) about (π/4)·√N times, then measure. For N = 8 that is 2 times. With K marked items, about (π/4)·√(N/K) times.</p>
<p>The answer is <b>likely, not guaranteed</b>. That is fine here, because checking one candidate is easy: test it, and rerun in the rare case it is wrong. With several marked items the starting overlap is larger, which is why fewer iterations are needed.</p>
<p class="aside">In this game the marking oracle and diffusion are prebuilt blocks. Diffusion could itself be built from Hadamard, Pauli-X and a doubly controlled Pauli-Z gate (up to an overall sign).</p>` },
      { title: "Applications", html: `
<p>Grover's algorithm speeds up <b>any</b> search where you can recognize a correct answer when you see it.</p>
<ul>
  <li><b>Hard puzzles (NP problems).</b> Problems like satisfiability (SAT) can be solved by searching all 2<sup>n</sup> possible assignments; Grover cuts that to about 2<sup>n/2</sup>. The lecture notes add a caveat: clever classical algorithms already beat plain brute force for many such problems (about 1.3<sup>n</sup> for 3SAT), so the real question is how well Grover combines with those tricks.</li>
  <li><b>Cryptography keys.</b> Searching for a 128-bit encryption key would take about 2<sup>64</sup> quantum steps instead of 2<sup>128</sup>. This is why long-term security guidance favors 256-bit symmetric keys.</li>
  <li><b>A building block: amplitude amplification.</b> The same oracle-plus-reflection trick boosts the success chance of other quantum algorithms, and is used for counting solutions, finding minimums, and evaluating game trees in about √N steps.</li>
  <li><b>Why it is optimal (BBBV theorem).</b> The lecture notes prove that no quantum algorithm can search a black box with fewer than about √N queries. So quantum computers cannot solve NP-complete problems just by fast brute force: the speedup is quadratic, not exponential.</li>
</ul>
<p class="aside">Practical catch: searching a physical database would need a "quantum RAM", which nobody knows how to build at scale, and error correction adds large overheads that eat into a quadratic speedup.</p>` }
    ],
    lab: { kind: "grover-lab" },
    challenges: [
      { check: "grover-90", title: "Find it", task: "Use Oracle and Diffusion to get the marked item's probability above 90%." },
      { check: "grover-overshoot", title: "Overshoot", task: "Keep iterating until the success probability falls below 50%." },
      { check: "grover-oracle-only", title: "Sign without change", task: "Reset, then apply only the oracle once. Check while the demonstration is in that state." }
    ],
    quizConfig: { roundSize: 10, passCorrect: 8 },
    build: {
      cols: 7,
      rows: [{ label: "", init: "0", editable: true }, { label: "", init: "0", editable: true }, { label: "", init: "0", editable: true }],
      measureRows: [0, 1, 2],
      gates: ["H", "X", "Y", "Z", "S", "C"],
      macros: [
        { id: "M", op: "mark", rows: [0, 1, 2], label: "Mark", name: "Marking oracle",
          desc: "Flips the sign of the marked item's amplitude. The game tests all 8 possible marked items." },
        { id: "D", op: "diffusion", rows: [0, 1, 2], label: "Diffuse", name: "Diffusion",
          desc: "Reflects every amplitude about the average amplitude (a prebuilt block)." }
      ],
      goals: [
        "Prepare: an equal superposition of all 8 items.",
        "Iterate: mark, then amplify.",
        "Stop at the right time: at least 90% success, whichever item is marked."
      ],
      hints: [
        "Start like the earlier levels: every item should be equally likely before the first oracle.",
        "One iteration is Marking oracle then Diffusion. For 8 items, one iteration only reaches 78%.",
        "A Hadamard on all three wires → Mark → Diffuse → Mark → Diffuse."
      ],
      success: "Circuit complete. You built Grover search for 8 items.",
      expected: "Ideal behavior: after 2 iterations the marked item is measured with probability 94.5%, whichever item is marked."
    },
    scoring: true
  },

  /* ================================================================== */
  {
    id: "shor",
    order: 6,
    name: "Shor's Algorithm",
    shortTitle: "The Final Period",
    module: { name: "Fourier Module", short: "Fourier" },
    learned: "Factoring reduces to finding the period of a^x mod N; the quantum Fourier transform makes that period show up as peaks, and gcds finish the job.",
    ref: "Scott Aaronson, Introduction to Quantum Information Science lecture notes, Lectures 19-21 (printed pp. 151-172): RSA (19.1), the quantum Fourier transform and the clock analogy (20.1, Figure 20.1 p. 161), continued fractions and applications (21.1-21.2)",
    intro: "The final module: factor 15. You will find a hidden period with a quantum circuit, then turn it into factors with a little classical number theory.",
    lessonCards: [
      { title: "Why factoring matters: RSA encryption", html: `
<p>Every time you visit a secure website, your computer and the server agree on secret keys using <b>public-key cryptography</b>: anyone can lock a message, but only one person can unlock it.</p>
<p>The most famous system is <b>RSA</b> (Rivest, Shamir, Adleman, 1977). The receiver picks two large secret primes p and q and publishes only their product <b>N = p × q</b>.</p>
<ul>
  <li><b>Locking:</b> anyone turns a message x into something like <span class="math">x³ mod N</span> (the simplest version in the lecture notes; real systems use a larger exponent and padding).</li>
  <li><b>Unlocking:</b> easy if you know p and q, and believed to be very hard if you only know N.</li>
</ul>
<p>Multiplying two 300-digit primes takes a computer a fraction of a second. Going backwards, <b>factoring</b> N, is a different story. The best known classical method, the number field sieve, takes time that grows almost exponentially with the number of digits. The record so far is a 250-digit number (RSA-250, factored in 2020), which took about 2,700 CPU-core years. Real keys use 617 digits (2048 bits).</p>
<p>In 1994 Peter Shor showed that a quantum computer could factor in time that grows only <b>polynomially</b> with the number of digits. Breaking RSA is believed to require factoring (nobody has proved it), so a large quantum computer would break RSA.</p>` },
      { title: "Factoring through a period", html: `
<p>Shor's insight is that factoring can be turned into finding a <b>period</b>. Pick a number a that shares no factor with N. For N = 15 and <b>a = 2</b>, list the powers of a mod 15:</p>
<p class="math-block">2⁰, 2¹, 2², 2³, 2⁴, ... mod 15 = 1, 2, 4, 8, 1, 2, 4, 8, ...</p>
<p>The pattern repeats every <b>r = 4</b> steps. That r is the period. If r is even, then a<sup>r/2</sup> is a useful number, here 2² = 4, and</p>
<p class="math-block">gcd(4 − 1, 15) = 3 and gcd(4 + 1, 15) = 5</p>
<p>so 15 = 3 × 5. (gcd means greatest common divisor, which a classical computer finds quickly with Euclid's algorithm.)</p>
<p>Why it works: 4² ≡ 1 (mod 15) means (4 − 1)(4 + 1) is a multiple of 15, but neither factor is, so each one shares a piece of 15. The lecture notes show that a randomly chosen a works with probability at least 3/8; if one fails, pick another.</p>
<p>Finding r classically is as hard as factoring for large N. Finding it quantumly is where the Fourier transform comes in.</p>` },
      { title: "The quantum Fourier transform", html: `
<p class="lead-in">The quantum Fourier transform finds the rhythm in a quantum state, turning a pattern that repeats at a regular spacing into sharp peaks that reveal how often it repeats.</p>
<p>The <b>quantum Fourier transform</b> (QFT), written F<sub>Q</sub>, acts on Q = 2<sup>n</sup> basis states. It sends each basis state to an equal superposition of all of them, with phases that turn at a speed set by x:</p>
<div class="eq-display" role="math" aria-label="F sub Q applied to ket x equals 1 over the square root of Q, times the sum over y from 0 to Q minus 1 of omega to the power x y, times ket y">
  <span><i>F</i><sub><i>Q</i></sub>|<i>x</i>⟩</span><span class="eqs">=</span>
  <span class="frac"><span>1</span><span><span class="sqrt"><svg class="rad-sign" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 60 L24 49 L52 98 L93 2.5 L100 2.5"/></svg><span class="rad"><i>Q</i></span></span></span></span>
  <span class="bigop"><span class="lim"><i>Q</i> − 1</span><span class="op">∑</span><span class="lim"><i>y</i> = 0</span></span>
  <span><i>ω</i><sup><i>xy</i></sup> |<i>y</i>⟩</span>
</div>
<p class="eq-where">where <i>ω</i> = <i>e</i><sup>2π<i>i</i>/<i>Q</i></sup> is a <i>Q</i><sup>th</sup> root of unity.</p>
<p>ω is one step around a circle cut into Q equal steps. Two examples:</p>
<ul>
  <li><b>Q = 2:</b> ω = −1, and the QFT is exactly the Hadamard gate.</li>
  <li><b>Q = 4:</b> ω = i, and the QFT matrix is
    <span class="matrix lesson-matrix"><span class="op-name"><i>F</i><sub>4</sub> =</span><span class="frac"><span>1</span><span>2</span></span><span class="mbr mbr4"><span>1</span><span>1</span><span>1</span><span>1</span><span>1</span><span>i</span><span>−1</span><span>−i</span><span>1</span><span>−1</span><span>1</span><span>−1</span><span>1</span><span>−i</span><span>−1</span><span>i</span></span></span>
  <br>Each row turns around the circle at a different speed: 0, 1, 2 or 3 quarter-turns per step.</li>
</ul>
<p><b>Why it is fast:</b> on n qubits the QFT needs only about n(n + 1)/2 gates: Hadamards and controlled phase rotations, plus swaps to reverse the qubit order. The classical fast Fourier transform needs about n · 2<sup>n</sup> steps for the same 2<sup>n</sup> numbers.</p>
<p><b>The catch:</b> the QFT leaves its answer in amplitudes, and a measurement gives only one sample. It is useful exactly when one sample reveals something global, like a period.</p>` },
      { title: "How the QFT finds a period: clocks", html: `
<p>After computing a<sup>x</sup> mod N for every x at once (next card), the x values that remain are evenly spaced by the period, for example <b>1, 5, 9, 13</b> when r = 4.</p>
<p>Picture each surviving x as a clock. For a candidate frequency y, the clock for x has its hand turned by the fraction x·y/16 of a full circle. The QFT adds all the hands together as arrows:</p>
<ul>
  <li>If y is a multiple of 16/r = 4, every hand points the same way. The arrows add up and y is <b>likely</b>.</li>
  <li>Otherwise the hands spread evenly around the circle and the arrows <b>cancel</b>. That y essentially never appears.</li>
</ul>
<p>So the measurement gives y = 0, 4, 8 or 12, each 25% of the time. When r does not divide the number of outcomes exactly, the hands only nearly line up near multiples of Q/r, which is still enough.</p>
<p class="aside">This is the clock picture from Lecture 20 of the notes (Figure 20.1). Try it in the Fourier clock demonstration in Explore: it is an original interactive version.</p>` },
      { title: "Shor's algorithm, step by step", html: `
<p>Worked example: factor N = 15 with a = 2, using a 4-qubit counting register (Q = 16 outcomes) and a 4-qubit work register.</p>
<ol class="steps">
  <li><b>Classical check:</b> compute gcd(a, N). Here gcd(2, 15) = 1, so continue. (If it were bigger than 1, you would already have a factor.)</li>
  <li><b>Prepare:</b> Hadamards on the counting register give every exponent x from 0 to 15 at once. The work register starts at 1.</li>
  <li><b>Compute:</b> a modular exponentiation block writes <span class="math">2<sup>x</sup> mod 15</span> into the work register, for every x together.</li>
  <li><b>Hidden spacing:</b> the x values that share a work value are spaced by r. For example, 2, 6, 10 and 14 all give 4.</li>
  <li><b>Transform and measure:</b> the QFT on the counting register turns that spacing into peaks. You measure y = 0, 4, 8 or 12.</li>
  <li><b>Read the period (classical):</b> y/16 ≈ k/r. y = 4 gives 1/4 and y = 12 gives 3/4, so r = 4. y = 8 gives 1/2, which only says r is a multiple of 2; y = 0 says nothing, so run again. For general N, continued fractions find the best simple fraction, and combining a few runs recovers r.</li>
  <li><b>Verify and factor (classical):</b> check 2⁴ mod 15 = 1. Since r is even, compute gcd(2² − 1, 15) = <b>3</b> and gcd(2² + 1, 15) = <b>5</b>.</li>
</ol>
<p class="aside">This game simulates the period-finding circuit exactly for N = 15 (8 qubits). Modular exponentiation and the Fourier transform are prebuilt blocks. Aaronson writes the transform as a QFT; many textbooks use the inverse QFT here. For period finding the measurement probabilities are the same.</p>` },
      { title: "Applications", html: `
<ul>
  <li><b>Breaking today's public-key cryptography.</b> Shor's algorithm factors (breaking RSA) and also computes discrete logarithms, which breaks Diffie-Hellman key exchange and elliptic-curve cryptography. Together these protect most secure web traffic and digital signatures today.</li>
  <li><b>How close is it?</b> Not close yet. The numbers factored by real quantum hardware running Shor's algorithm are tiny (like 15 and 21). A 2025 estimate by Craig Gidney at Google Quantum AI put breaking a 2048-bit RSA key at less than a million noisy qubits running for less than a week, down from 20 million qubits in a 2019 estimate. Today's best machines have hundreds to about a thousand qubits.</li>
  <li><b>The response: post-quantum cryptography.</b> In August 2024 NIST published its first post-quantum standards, mostly based on mathematical lattices. The lecture notes explain why: no quantum algorithm is known that breaks lattice-based cryptography. Data encrypted today could be stored and decrypted later ("harvest now, decrypt later"), so the switch is already under way.</li>
  <li><b>Beyond factoring.</b> The QFT and the closely related <b>phase estimation</b> routine are building blocks for simulating molecules and materials. The lecture notes also describe the long effort to extend Shor's method to harder "non-abelian" problems such as graph isomorphism, which has largely not worked out.</li>
</ul>
<p class="aside">The lecture notes also correct a popular myth: Shor's algorithm does not try all divisors in parallel. It finds a period through interference, then finishes with classical number theory.</p>` }
    ],
    lab: { kind: "clock-lab" },
    challenges: [
      { check: "clock-align", title: "Line them up", task: "With period 4, find a frequency other than 0 where all the hands line up." },
      { check: "clock-cancel", title: "Total cancellation", task: "Find a whole-number frequency where the arrows cancel completely." },
      { check: "clock-period8", title: "A different period", task: "Change the period to 8 and find a frequency that lines up but is NOT a multiple of 4." }
    ],
    quizConfig: { roundSize: 10, passCorrect: 8 },
    build: {
      cols: 5,
      rows: [
        { label: "", init: "0", editable: true },
        { label: "", init: "0", editable: true },
        { label: "", init: "0", editable: true },
        { label: "", init: "0", editable: true },
        { label: "work", init: "0001", size: 4, editable: false, note: "4 qubits, starts at 1" }
      ],
      measureRows: [0, 1, 2, 3],
      gates: ["H", "X", "Y", "Z", "S", "C"],
      macros: [
        { id: "E", op: "modexp", rows: [0, 1, 2, 3, 4], inRows: [0, 1, 2, 3], outRows: [4], a: 2, N: 15, label: "2^x mod 15", name: "Modular exponentiation",
          desc: "Multiplies the work register by 2^x mod 15, where x is the value of the counting register (a prebuilt block)." },
        { id: "F", op: "qft", rows: [0, 1, 2, 3], label: "QFT", name: "Quantum Fourier transform",
          desc: "Fourier transform on the counting register, as Aaronson writes it (a prebuilt block)." },
        { id: "I", op: "iqft", rows: [0, 1, 2, 3], label: "QFT†", name: "Inverse QFT",
          desc: "The inverse Fourier transform, as many textbooks write this step. For period finding it gives the same probabilities as the QFT." }
      ],
      goals: [
        "Prepare: every exponent x from 0 to 15 at once.",
        "Compute: 2^x mod 15 into the work register.",
        "Transform: turn the hidden spacing into peaks.",
        "Then (classical step): read the period and compute the factors."
      ],
      hints: [
        "The modular exponentiation needs all 16 exponents at once, so the counting register needs a superposition first.",
        "After computing 2^x mod 15, the period is hidden in phases. A Fourier transform turns it into peaks.",
        "A Hadamard on each of the four counting wires → 2^x mod 15 → QFT (or QFT†)."
      ],
      success: "Circuit works. Now turn the measurements into the factors of 15.",
      expected: "Ideal behavior: the counting register gives 0, 4, 8 or 12, each 25% of the time: multiples of 16/r with r = 4."
    },
    followup: "shor",
    scoring: true
  }
];
