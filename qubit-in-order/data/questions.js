/* Qubit in Order question bank.
 * Generated from quantum_quest_seed_questions.json (60 seed questions) with
 * reviewed fixes applied, plus 300 new questions
 * (each level now has 20 easy, 20 medium and 20 hard). You can edit this file directly.
 *
 * Each question needs: id (unique), algorithm, difficulty (easy|medium|hard),
 * type (mcq|visual_mcq), prompt, options (exactly 4), correctIndex (0-3),
 * explanation, source. Optional: visual { kind, instruction }.
 * Text is plain text (it is escaped before display). Open tests.html after
 * editing to check the bank.
 */
window.QQ_QUESTIONS = {
  "deutsch": [
    {
      "id": "deutsch-e01",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "A Boolean function is constant when...",
      "options": [
        "it returns the same output for inputs 0 and 1",
        "it always returns 0",
        "it returns different outputs for 0 and 1",
        "it returns an output identical to its input"
      ],
      "correctIndex": 0,
      "explanation": "Constant means f(0) = f(1). That can be both 0 or both 1, so \"always returns 0\" is only one of the two constant functions.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e02",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "What does a Hadamard gate do to an initial |0⟩ qubit?",
      "options": [
        "Makes |1⟩ with certainty",
        "Creates (|0⟩+|1⟩)/√2",
        "Measures in the computational basis",
        "Randomly sets the qubit to |0⟩ or |1⟩, like a coin flip"
      ],
      "correctIndex": 1,
      "explanation": "H|0⟩ = (|0⟩+|1⟩)/√2: equal amplitudes, so 0 and 1 are each measured with probability 1/2. It is not a coin that has secretly already landed: a second H turns this state back into |0⟩ every time, which a random coin flip could never do.",
      "source": "Lecture 17.3, printed pp. 138–139",
      "visual": {
        "kind": "deutsch-hadamard-toggle",
        "instruction": "Use the Qubit demonstration: turn on only the first H stage and read the amplitudes and probabilities."
      }
    },
    {
      "id": "deutsch-e03",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Under the ideal oracle-query model, Deutsch's algorithm needs how many queries?",
      "options": [
        "One quantum query",
        "Two quantum queries",
        "One query per possible function",
        "Two queries carried out in parallel"
      ],
      "correctIndex": 0,
      "explanation": "Deutsch's algorithm queries the oracle once. A classical computer has to ask for both f(0) and f(1) to be certain.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e04",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "In the state a|0⟩ + b|1⟩, what are the numbers a and b called?",
      "options": [
        "Eigenvalues",
        "Measurement results",
        "Probabilities",
        "Amplitudes"
      ],
      "correctIndex": 3,
      "explanation": "a and b are amplitudes. Probabilities come from squaring them (|a|² and |b|²).",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e05",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "A qubit is in a|0⟩ + b|1⟩ with real amplitudes. What is the probability of measuring 0?",
      "options": [
        "a²",
        "1 − b",
        "a/(a+b)",
        "a"
      ],
      "correctIndex": 0,
      "explanation": "The probability is the amplitude squared: a² for outcome 0 and b² for outcome 1, with a² + b² = 1.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e06",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "How many different functions take one bit as input and return one bit?",
      "options": [
        "4",
        "2",
        "3",
        "8"
      ],
      "correctIndex": 0,
      "explanation": "Each of f(0) and f(1) can be 0 or 1, giving 2 × 2 = 4 functions: two constant and two balanced.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e07",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which of these one-bit functions is balanced?",
      "options": [
        "f(x)=1 for every input x",
        "f(0)=1, f(1)=1",
        "f(0)=1, f(1)=0",
        "f(0)=0, f(1)=0"
      ],
      "correctIndex": 2,
      "explanation": "Balanced means f(0) ≠ f(1). Only f(0)=1, f(1)=0 has different outputs.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e08",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is H|1⟩?",
      "options": [
        "|0⟩",
        "−|1⟩",
        "(|0⟩ + |1⟩)/√2",
        "(|0⟩ − |1⟩)/√2"
      ],
      "correctIndex": 3,
      "explanation": "H|1⟩ = (|0⟩ − |1⟩)/√2, called |−⟩. It has the same probabilities as |+⟩ but a minus sign on |1⟩.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e09",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "When the phase oracle U_f acts on a part |x⟩ of the state with f(x)=1, what happens?",
      "options": [
        "That part is measured",
        "That part is flipped to the other bit value",
        "That part is multiplied by −1",
        "Nothing happens to it"
      ],
      "correctIndex": 2,
      "explanation": "A phase oracle multiplies |x⟩ by (−1)^f(x). It changes signs, not bit values.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e10",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "In the Qubit demonstration, turn on only the first H stage (oracle off) and click through boxes A to D. Does the box you choose change P(0)?",
      "options": [
        "Only box B changes it",
        "Yes: constant boxes give P(0) = 100%",
        "No: with the oracle off, the box never acts on the qubit",
        "Yes: balanced boxes give P(0) = 0%"
      ],
      "correctIndex": 2,
      "explanation": "The mystery box only matters when U_f is applied. With just one H the state is always |+⟩, so P(0) = 50% for every box.",
      "source": "Lecture 17.3, printed pp. 138–139",
      "visual": {
        "kind": "deutsch-hadamard-toggle",
        "instruction": "Use the Qubit demonstration: turn on only the first H, then click through boxes A to D."
      }
    },
    {
      "id": "deutsch-e11",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does measuring a qubit in the state |0⟩ give?",
      "options": [
        "1 with certainty",
        "0 or 1 at random",
        "0 with certainty",
        "Nothing until a Hadamard is applied"
      ],
      "correctIndex": 2,
      "explanation": "|0⟩ has amplitude 1 on 0, so the measurement gives 0 every time.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e12",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which gate turns |0⟩ into |1⟩ with certainty?",
      "options": [
        "Pauli-X",
        "Hadamard",
        "Pauli-Z",
        "Phase (S)"
      ],
      "correctIndex": 0,
      "explanation": "Pauli-X is the quantum NOT gate: it swaps |0⟩ and |1⟩.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e13",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does a Pauli-Z gate do to |0⟩?",
      "options": [
        "Leaves it as |0⟩",
        "Turns it into |1⟩",
        "Turns it into a 50/50 coin flip",
        "Turns it into (|0⟩+|1⟩)/√2"
      ],
      "correctIndex": 0,
      "explanation": "Pauli-Z only flips the sign of |1⟩, so |0⟩ is unchanged.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e14",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "In Deutsch's problem, what is the black box?",
      "options": [
        "A gate that computes the unknown function f, which we can query but not look inside",
        "A measurement device",
        "The Hadamard gate",
        "A computer that shows us both f(0) and f(1)"
      ],
      "correctIndex": 0,
      "explanation": "We may only ask the box questions (queries); we cannot read f directly.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e15",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is a global phase?",
      "options": [
        "The phase left after a measurement",
        "A sign or phase multiplying the whole state, which changes no measurement probability",
        "A phase on only the |1⟩ part",
        "A phase that makes every state 50/50"
      ],
      "correctIndex": 1,
      "explanation": "Multiplying the whole state by −1 (or any phase) never changes what you measure.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e16",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "A qubit has amplitudes 1/√2 on |0⟩ and −1/√2 on |1⟩. What is P(1)?",
      "options": [
        "1/√2",
        "1/2",
        "−1/2",
        "0"
      ],
      "correctIndex": 1,
      "explanation": "Probability is the amplitude squared: (−1/√2)² = 1/2. Signs never make probabilities negative.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e17",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "How many qubits does this game's version of Deutsch's circuit use?",
      "options": [
        "Three",
        "Two",
        "Four",
        "One"
      ],
      "correctIndex": 3,
      "explanation": "The game uses a one-qubit phase oracle. The textbook version adds a helper qubit and gives the same result.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e18",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "In the Qubit demonstration with every stage switched off, what is the state?",
      "options": [
        "|+⟩",
        "|0⟩",
        "|1⟩",
        "|−⟩"
      ],
      "correctIndex": 1,
      "explanation": "Nothing has acted on the qubit, so it is still in its starting state |0⟩.",
      "source": "Lecture 17.3, printed pp. 138–139",
      "visual": {
        "kind": "deutsch-hadamard-toggle",
        "instruction": "Use the Qubit demonstration: switch every stage off and read the state."
      }
    },
    {
      "id": "deutsch-e19",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Applying the Hadamard gate twice in a row is the same as...",
      "options": [
        "Doing nothing (the identity)",
        "A Pauli-X gate",
        "A Pauli-Z gate",
        "A measurement"
      ],
      "correctIndex": 0,
      "explanation": "H is its own inverse: H·H = I.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-e20",
      "algorithm": "deutsch",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does interference mean for amplitudes?",
      "options": [
        "They add when their signs match and cancel when the signs differ",
        "Two qubits are measured together",
        "Noise from the environment disturbs them",
        "A qubit is copied"
      ],
      "correctIndex": 0,
      "explanation": "Interference is how quantum algorithms make wrong answers cancel and right answers add up.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m01",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "If f(0)=0 and f(1)=1, what category is the function?",
      "options": [
        "Constant zero",
        "Constant one",
        "Balanced",
        "Neither category"
      ],
      "correctIndex": 2,
      "explanation": "Different outputs on the two inputs mean balanced in the one-bit case.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m02",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "If f(0)=1 and f(1)=1, how should an ideal Deutsch circuit classify f?",
      "options": [
        "Balanced, because both outputs are 1",
        "Constant, because the outputs match",
        "Balanced, because 1 is nonzero",
        "Undetermined, because f(0) is not zero"
      ],
      "correctIndex": 1,
      "explanation": "Equal output bits mean constant, regardless of whether the shared bit is 0 or 1.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m03",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Why is a final Hadamard used after the phase oracle?",
      "options": [
        "To turn relative phase into a measurable basis outcome",
        "To erase the phase information before measurement",
        "To create the superposition the oracle needs",
        "To apply a global phase to every input equally"
      ],
      "correctIndex": 0,
      "explanation": "The oracle leaves its answer in the relative sign between |0⟩ and |1⟩. The final H converts that sign into a definite 0 or 1. Creating the superposition is the job of the first H, not the last one.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m04",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Starting at |0⟩, what is the final state after H followed by H?",
      "options": [
        "|+⟩",
        "|−⟩",
        "|1⟩",
        "|0⟩"
      ],
      "correctIndex": 3,
      "explanation": "H is its own inverse, so H(H|0⟩)=|0⟩.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m05",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "In the Qubit demonstration, select box C and turn on all three stages. What would a measurement give?",
      "options": [
        "1 with certainty",
        "1 with probability 75%",
        "0 with certainty",
        "0 or 1, each with probability 50%"
      ],
      "correctIndex": 0,
      "explanation": "Box C is balanced, so H, U_f, H takes |0⟩ to |1⟩. The demonstration shows P(1) = 100%.",
      "source": "Lecture 17.3, printed pp. 138–139",
      "visual": {
        "kind": "deutsch-hadamard-toggle",
        "instruction": "Use the Qubit demonstration: select box C and turn on all three stages."
      }
    },
    {
      "id": "deutsch-m06",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "A classical algorithm asks the box for f(0) and gets 1. What can it conclude?",
      "options": [
        "f is constant",
        "Nothing yet: f could be constant (both 1) or balanced (f(1)=0)",
        "f is balanced",
        "f(1) must be 0"
      ],
      "correctIndex": 1,
      "explanation": "Knowing one output never settles the type. Both f(0)=f(1)=1 and f(0)=1, f(1)=0 are still possible, so a second query is needed.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m07",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Which statement about |+⟩ and |−⟩ is correct?",
      "options": [
        "They differ only by a global phase",
        "They are the same state",
        "They have the same measurement probabilities but a different relative phase",
        "|−⟩ always measures as 1"
      ],
      "correctIndex": 2,
      "explanation": "Both give 50/50. The minus sign in |−⟩ sits on the |1⟩ part only, so it is a relative phase, which a later H can detect. A global phase could never be detected.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m08",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Right before the final H the state is −|+⟩. What does the measurement give?",
      "options": [
        "0 with probability 1/√2",
        "0 with certainty",
        "1 with certainty",
        "0 or 1, each with probability 50%"
      ],
      "correctIndex": 1,
      "explanation": "H(−|+⟩) = −|0⟩. The overall minus sign is a global phase, so the result is 0 with certainty.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m09",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "After H and then U_f, the state is −|−⟩. Which box is inside the oracle?",
      "options": [
        "f(0)=0, f(1)=0",
        "f(0)=0, f(1)=1",
        "f(0)=1, f(1)=0",
        "f(0)=1, f(1)=1"
      ],
      "correctIndex": 2,
      "explanation": "After U_f the state is ((−1)^f(0)|0⟩ + (−1)^f(1)|1⟩)/√2. For −|−⟩ = (−|0⟩ + |1⟩)/√2 we need f(0)=1 and f(1)=0.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m10",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Which of these does Deutsch's algorithm NOT tell you?",
      "options": [
        "The individual values f(0) and f(1)",
        "Whether f(0) XOR f(1) is 1",
        "Whether f is constant or balanced",
        "Whether f(0) equals f(1)"
      ],
      "correctIndex": 0,
      "explanation": "The algorithm returns one bit, f(0) XOR f(1). That answers \"constant or balanced?\" but not the two values themselves.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m11",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "After the first Hadamard and the oracle for box A (f(0) = f(1) = 0), what is the state?",
      "options": [
        "|−⟩",
        "|+⟩",
        "−|+⟩",
        "|0⟩"
      ],
      "correctIndex": 1,
      "explanation": "Box A changes no signs, so |+⟩ stays |+⟩.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m12",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "What is H|−⟩?",
      "options": [
        "|1⟩",
        "−|0⟩",
        "|0⟩",
        "|−⟩"
      ],
      "correctIndex": 0,
      "explanation": "The two contributions to |0⟩ cancel (½ − ½) and the two contributions to |1⟩ add, giving |1⟩.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m13",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Two boxes leave the qubit in |−⟩ and in −|−⟩ just before the final Hadamard. What does each measure?",
      "options": [
        "Both give 0",
        "Both give 50/50",
        "|−⟩ gives 1 and −|−⟩ gives 0",
        "Both give 1 with certainty"
      ],
      "correctIndex": 3,
      "explanation": "−|−⟩ differs from |−⟩ only by a global phase, so both become ±|1⟩ and measure 1.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m14",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Which two boxes does Deutsch's algorithm group together as giving outcome 0?",
      "options": [
        "f = 00 and f = 01",
        "f = 01 and f = 10",
        "f = 00 and f = 11",
        "f = 11 and f = 10"
      ],
      "correctIndex": 2,
      "explanation": "Outcome 0 means constant: both outputs 0, or both outputs 1.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m15",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "In the Qubit demonstration, turn on only the oracle (both Hadamards off) and pick box D. What is P(0)?",
      "options": [
        "0%",
        "50%",
        "100%",
        "75%"
      ],
      "correctIndex": 2,
      "explanation": "The oracle acting on |0⟩ with f(0) = 1 gives −|0⟩: a global phase, so P(0) is still 100%.",
      "source": "Lecture 17.3, printed pp. 138–139",
      "visual": {
        "kind": "deutsch-hadamard-toggle",
        "instruction": "Use the Qubit demonstration: oracle on, both Hadamards off, box D selected."
      }
    },
    {
      "id": "deutsch-m16",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "A qubit is in (√3/2)|0⟩ + (1/2)|1⟩. What is P(1)?",
      "options": [
        "3/4",
        "1/4",
        "1/2",
        "√3/2"
      ],
      "correctIndex": 1,
      "explanation": "P(1) = (1/2)² = 1/4, and P(0) = 3/4. They add to 1.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m17",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Which quantity does Deutsch's algorithm compute with one query?",
      "options": [
        "f(0) XOR f(1)",
        "f(0) only",
        "f(0) + f(1) as a number 0, 1 or 2",
        "f(0) AND f(1)"
      ],
      "correctIndex": 0,
      "explanation": "Outcome 1 means f(0) ≠ f(1), which is exactly f(0) XOR f(1).",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m18",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "The textbook version uses an extra helper qubit prepared in |−⟩. What does it achieve?",
      "options": [
        "It measures the input qubit",
        "It turns a bit-flip oracle into a sign on the input (phase kickback)",
        "It doubles the number of queries",
        "It stores f(0) for later"
      ],
      "correctIndex": 1,
      "explanation": "XOR-ing f(x) into |−⟩ just multiplies it by (−1)^f(x), so the sign kicks back onto |x⟩.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m19",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "What is measured for any box if the oracle is applied twice in a row (H, U_f, U_f, H)?",
      "options": [
        "50/50",
        "1 for balanced, 0 for constant",
        "1 with certainty",
        "0 with certainty"
      ],
      "correctIndex": 3,
      "explanation": "Two sign flips cancel, so U_f twice does nothing and H·H returns |0⟩.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-m20",
      "algorithm": "deutsch",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Which statement about one classical query to the box is true?",
      "options": [
        "It reveals f(0) XOR f(1)",
        "It reveals nothing",
        "It reveals both outputs",
        "It reveals exactly one of f(0) or f(1)"
      ],
      "correctIndex": 3,
      "explanation": "A classical query on input x returns f(x), one value.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h01",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "A phase oracle acts on |+⟩ with f(0)=0, f(1)=1. Ignoring global phase, what state results?",
      "options": [
        "|+⟩",
        "|−⟩",
        "|0⟩",
        "|1⟩"
      ],
      "correctIndex": 1,
      "explanation": "Only the |1⟩ part gets a minus sign, because f(1)=1 and f(0)=0: (|0⟩+|1⟩)/√2 becomes (|0⟩−|1⟩)/√2, which is |−⟩.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h02",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For the constant-one function, what does Deutsch's ideal final input measurement return?",
      "options": [
        "0 with certainty",
        "1 with certainty",
        "0 or 1 equally",
        "0 in this run, but repeated runs are needed to be sure"
      ],
      "correctIndex": 0,
      "explanation": "f(0)=f(1)=1, so the oracle puts a minus sign on both parts. An overall sign is a global phase and changes no probability, so the final H gives |0⟩ exactly. The ideal circuit is deterministic: no repeated runs are needed.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h03",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "If the final Hadamard is omitted after a phase oracle, what happens when the input qubit is measured in the computational basis?",
      "options": [
        "Constant functions always yield 0",
        "Balanced functions always yield 1",
        "Both categories give 50/50 input measurement probabilities",
        "The result reveals both f(0) and f(1)"
      ],
      "correctIndex": 2,
      "explanation": "Before the last H, the phase patterns have equal |0⟩ and |1⟩ probabilities, so direct measurement cannot distinguish them.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h04",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "visual_mcq",
      "prompt": "In the Qubit demonstration, turn the first H OFF and turn the oracle and the second H ON. For which boxes is the measurement 1 with certainty?",
      "options": [
        "Only box B",
        "Boxes B and D",
        "Boxes C and D",
        "None: every box gives 50/50"
      ],
      "correctIndex": 3,
      "explanation": "Without the first H, U_f acts on |0⟩ alone and only multiplies it by ±1, a global phase. The last H then gives ±|+⟩, which is 50/50 for every box.",
      "source": "Lecture 17.3, printed pp. 138–139",
      "visual": {
        "kind": "deutsch-hadamard-toggle",
        "instruction": "Use the Qubit demonstration: first H off, oracle on, second H on. Try all four boxes."
      }
    },
    {
      "id": "deutsch-h05",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Suppose the first gate is X instead of H, so the circuit is X, U_f, H, measure. What happens?",
      "options": [
        "It reveals f(1) directly",
        "Constant gives 1 and balanced gives 0",
        "It still works, with the labels swapped",
        "Every box gives 50/50, so nothing is learned"
      ],
      "correctIndex": 3,
      "explanation": "X|0⟩ = |1⟩. U_f only multiplies |1⟩ by (−1)^f(1), a global phase. The final H gives ±|−⟩, which is 50/50 for every box.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h06",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "The circuit X, H, U_f, H, measure starts with an extra X. What does it output?",
      "options": [
        "1 for constant boxes, 0 for balanced boxes",
        "0 for constant boxes, 1 for balanced boxes",
        "50/50 for every box",
        "1 for every box"
      ],
      "correctIndex": 0,
      "explanation": "X then H gives |−⟩. A constant box leaves ±|−⟩ and a balanced box turns it into ±|+⟩. The final H maps |−⟩ to 1 and |+⟩ to 0, so the labels are reversed.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h07",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "After the final H, the amplitude of |0⟩ is ((−1)^f(0) + (−1)^f(1))/2. What is it for a balanced box?",
      "options": [
        "0",
        "±1",
        "1/2",
        "1/√2"
      ],
      "correctIndex": 0,
      "explanation": "For a balanced box the two signs are opposite, so they cancel: (1 − 1)/2 = 0. Outcome 0 never happens, so the result is always 1.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h08",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "One quantum query computes f(0) XOR f(1). Why doesn't this contradict \"one query gives one bit\"?",
      "options": [
        "It actually learns both f(0) and f(1)",
        "It only works with probability 1/2",
        "The quantum query secretly runs the box twice",
        "It still learns one bit, but a bit (f(0) XOR f(1)) that no single classical query can give"
      ],
      "correctIndex": 3,
      "explanation": "The quantum algorithm gains exactly one bit of information. The advantage is which bit: a global property of f that a single classical query cannot reveal.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h09",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For box B (f(0)=f(1)=1), what is the state right after the oracle?",
      "options": [
        "−|−⟩",
        "|−⟩",
        "−|+⟩",
        "|+⟩"
      ],
      "correctIndex": 2,
      "explanation": "H|0⟩ = |+⟩. Both parts get a minus sign, so the state is −(|0⟩ + |1⟩)/√2 = −|+⟩.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h10",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "How many queries does the best classical algorithm, even a randomized one, need to solve Deutsch's problem with certainty?",
      "options": [
        "1.5 on average",
        "2",
        "1",
        "0"
      ],
      "correctIndex": 1,
      "explanation": "After one classical query, both a constant and a balanced function remain possible. Certainty requires both values: 2 queries.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h11",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "The final Hadamard is replaced by Pauli-Z (H, U_f, Z, measure). What happens?",
      "options": [
        "Only constant boxes give 0",
        "It works as normal",
        "Every box gives 50/50",
        "It still works, with labels swapped"
      ],
      "correctIndex": 2,
      "explanation": "Before the last gate the state is ±|+⟩ or ±|−⟩. Pauli-Z only changes signs, so every box still measures 50/50.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h12",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "An S gate is inserted after the oracle (H, U_f, S, H). For box A, what is P(0)?",
      "options": [
        "1/2",
        "1",
        "1/4",
        "0"
      ],
      "correctIndex": 0,
      "explanation": "The state becomes (|0⟩ + i|1⟩)/√2. After H the amplitude of |0⟩ is (1+i)/2, whose squared size is 1/2.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h13",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For box D (f(0) = 1, f(1) = 0), what is the exact final state after H, U_f, H, including its sign?",
      "options": [
        "−|0⟩",
        "|0⟩",
        "−|1⟩",
        "|1⟩"
      ],
      "correctIndex": 2,
      "explanation": "H gives |+⟩; the oracle gives (−|0⟩ + |1⟩)/√2 = −|−⟩; the final H gives −|1⟩.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h14",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Pauli-Y is used in place of the first Hadamard (Y, U_f, H). What is measured?",
      "options": [
        "The algorithm works normally",
        "50/50 for every box",
        "Constant gives 1 and balanced gives 0",
        "Always 1"
      ],
      "correctIndex": 1,
      "explanation": "Y|0⟩ = i|1⟩, a basis state, so the oracle only adds a global phase and the final H gives 50/50.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h15",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "visual_mcq",
      "prompt": "In the Qubit demonstration with box B selected, which stage settings put the qubit in |−⟩ or −|−⟩?",
      "options": [
        "Oracle and second Hadamard",
        "None: box B only ever adds an overall minus sign",
        "All three stages",
        "First Hadamard and oracle"
      ],
      "correctIndex": 1,
      "explanation": "Box B flips both signs at once, which is a global phase, so you can only reach ±|0⟩ or ±|+⟩.",
      "source": "Lecture 17.3, printed pp. 138–139",
      "visual": {
        "kind": "deutsch-hadamard-toggle",
        "instruction": "Use the Qubit demonstration: select box B and try every combination of stages."
      }
    },
    {
      "id": "deutsch-h16",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "A faulty oracle applies its signs correctly 90% of the time and does nothing otherwise. For a balanced box, how often does the circuit output 1?",
      "options": [
        "10%",
        "100%",
        "90%",
        "50%"
      ],
      "correctIndex": 2,
      "explanation": "When the oracle works the result is 1; when it does nothing, H·H returns |0⟩ and the result is 0.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h17",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Why must a quantum oracle be reversible?",
      "options": [
        "Because it is measured afterward",
        "So that it can output f(0) and f(1) together",
        "Quantum gates must preserve total probability and be undoable, so a box that erased its input could not act on superpositions",
        "To make it faster"
      ],
      "correctIndex": 2,
      "explanation": "Every quantum gate is unitary. An irreversible function has to be made reversible (for example with an XOR output) before it can be a gate.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h18",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For complex amplitudes a and b, which condition must a qubit state a|0⟩ + b|1⟩ satisfy?",
      "options": [
        "a² + b² = 1 for any complex a and b",
        "|a|² + |b|² = 1",
        "a + b = 1",
        "|a| + |b| = 1"
      ],
      "correctIndex": 1,
      "explanation": "Probabilities are the squared sizes |a|² and |b|², and they must add to 1.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h19",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "After H and U_f the state is ((−1)^f(0)|0⟩ + (−1)^f(1)|1⟩)/√2. Up to a global phase this equals (|0⟩ + (−1)^(f(0)⊕f(1))|1⟩)/√2. What does this show?",
      "options": [
        "The state reveals f(1) directly",
        "The relative sign depends only on f(0) XOR f(1)",
        "The oracle has no effect",
        "The state depends only on f(0)"
      ],
      "correctIndex": 1,
      "explanation": "Factoring out (−1)^f(0) leaves a relative sign that is + for constant and − for balanced.",
      "source": "Lecture 17.3, printed pp. 138–139"
    },
    {
      "id": "deutsch-h20",
      "algorithm": "deutsch",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Up to global phase, how many different states can the qubit be in just before the final Hadamard, over all four boxes?",
      "options": [
        "One",
        "Eight",
        "Four",
        "Two: |+⟩ and |−⟩"
      ],
      "correctIndex": 3,
      "explanation": "Constant boxes give ±|+⟩ and balanced boxes give ±|−⟩.",
      "source": "Lecture 17.3, printed pp. 138–139"
    }
  ],
  "deutsch_jozsa": [
    {
      "id": "deutsch_jozsa-e01",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What promise makes the Deutsch–Jozsa problem well-defined?",
      "options": [
        "The function is either constant or balanced",
        "The function has exactly one input with output 1",
        "The function has an equal number of even and odd inputs",
        "The function is reversible on every input"
      ],
      "correctIndex": 0,
      "explanation": "The problem promises the function is one of two types: constant or balanced.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e02",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which input-register result means \"constant\" in the ideal Deutsch–Jozsa algorithm?",
      "options": [
        "Any bit string containing a 1",
        "The all-ones string",
        "The all-zeros string",
        "A uniformly random string"
      ],
      "correctIndex": 2,
      "explanation": "The all-zero input-register measurement occurs with certainty for a constant promised function.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e03",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Why apply Hadamard gates to all input qubits before the oracle?",
      "options": [
        "To measure the outputs early",
        "To prepare a uniform superposition of inputs",
        "To initialize the classical answer register",
        "To make every oracle output equal"
      ],
      "correctIndex": 1,
      "explanation": "H on each input qubit creates a uniform superposition over computational-basis inputs.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e04",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "How many possible inputs does a function of 3 bits have?",
      "options": [
        "9",
        "6",
        "3",
        "8"
      ],
      "correctIndex": 3,
      "explanation": "There are 2³ = 8 bit strings of length 3, from 000 to 111.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e05",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does it mean for a 2-bit function to be constant?",
      "options": [
        "The output equals the first input bit",
        "Two outputs are 0 and two are 1",
        "Exactly one output is 1",
        "All four outputs are equal"
      ],
      "correctIndex": 3,
      "explanation": "Constant means every input gives the same output: all 0 or all 1.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e06",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "In the truth-table demonstration, set all four outputs to 1. What kind of function is this?",
      "options": [
        "Constant",
        "Balanced",
        "Balanced, because the outputs are nonzero",
        "Neither constant nor balanced"
      ],
      "correctIndex": 0,
      "explanation": "All outputs equal means constant, whether they are all 0 or all 1.",
      "source": "Lecture 17.4, printed pp. 139–141",
      "visual": {
        "kind": "dj-truth-table-toggle",
        "instruction": "Use the truth-table demonstration: set all four outputs to 1."
      }
    },
    {
      "id": "deutsch_jozsa-e07",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "How many oracle queries does the ideal Deutsch–Jozsa algorithm use?",
      "options": [
        "n, one per input bit",
        "One",
        "Two",
        "2^(n−1) + 1"
      ],
      "correctIndex": 1,
      "explanation": "One quantum query decides the question, for any number of input bits.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e08",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Deutsch–Jozsa extends which algorithm?",
      "options": [
        "Shor's algorithm",
        "Deutsch's algorithm, from one input bit to n bits",
        "Grover's algorithm",
        "Simon's algorithm"
      ],
      "correctIndex": 1,
      "explanation": "It is the n-bit version of Deutsch's constant-or-balanced problem.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e09",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What kind of oracle does this game use for Deutsch–Jozsa?",
      "options": [
        "A measurement of f",
        "A phase oracle that multiplies |x⟩ by (−1)^f(x)",
        "A diffusion operator",
        "An oracle that prints f(x) on the screen"
      ],
      "correctIndex": 1,
      "explanation": "The oracle marks each input with a sign, + where f(x)=0 and − where f(x)=1.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e10",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does the final layer of Hadamard gates do?",
      "options": [
        "Turns the oracle's sign pattern into a measurable bit string",
        "Creates the first superposition",
        "Measures the qubits",
        "Removes the oracle's effect"
      ],
      "correctIndex": 0,
      "explanation": "The signs are invisible to measurement. The final H layer converts them into an outcome: all zeros for constant, something else for balanced.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e11",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "How many qubits does the input register need for a function of 4 bits?",
      "options": [
        "2",
        "16",
        "4",
        "8"
      ],
      "correctIndex": 2,
      "explanation": "One qubit per input bit.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e12",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "A balanced function of 2 bits has how many outputs equal to 0?",
      "options": [
        "3",
        "2",
        "1",
        "4"
      ],
      "correctIndex": 1,
      "explanation": "Balanced means half of the 4 outputs are 0 and half are 1.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e13",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which output list for inputs 00, 01, 10, 11 is constant?",
      "options": [
        "0, 1, 0, 1",
        "0, 0, 0, 1",
        "0, 0, 0, 0",
        "1, 1, 0, 0"
      ],
      "correctIndex": 2,
      "explanation": "Constant means every output is the same.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e14",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does one run of Deutsch-Jozsa tell you?",
      "options": [
        "Exactly how many 1s f has, for any function",
        "Which input gives 1",
        "Whether f is constant or balanced",
        "Every value of f"
      ],
      "correctIndex": 2,
      "explanation": "It answers exactly one question, and only under the promise.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e15",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does the measurement at the end of the circuit do?",
      "options": [
        "Reads the input register as a bit string",
        "Creates the superposition",
        "Applies the oracle",
        "Resets the qubits before the oracle"
      ],
      "correctIndex": 0,
      "explanation": "Measurement turns the final quantum state into an ordinary bit string.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e16",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "In the truth-table demonstration, set the outputs to 0, 0, 1, 1. What type of function is it?",
      "options": [
        "Constant",
        "Balanced",
        "Neither constant nor balanced",
        "Balanced only if reordered"
      ],
      "correctIndex": 1,
      "explanation": "Two 0s and two 1s make it balanced.",
      "source": "Lecture 17.4, printed pp. 139–141",
      "visual": {
        "kind": "dj-truth-table-toggle",
        "instruction": "Use the truth-table demonstration: set the outputs to 0, 0, 1, 1."
      }
    },
    {
      "id": "deutsch_jozsa-e17",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Is a function with outputs 1, 1, 1, 1 allowed by the promise?",
      "options": [
        "No: it is neither",
        "Yes: it is balanced",
        "No: constant must mean all 0",
        "Yes: it is constant"
      ],
      "correctIndex": 3,
      "explanation": "Constant includes both all-0 and all-1 functions.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e18",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which basic pattern does the Deutsch-Jozsa circuit use?",
      "options": [
        "Oracle, measure, Hadamards",
        "Hadamards, oracle, Hadamards, measure",
        "Diffusion, oracle, measure",
        "Measure, oracle, measure"
      ],
      "correctIndex": 1,
      "explanation": "It is the same Hadamard sandwich as Deutsch's algorithm, on more qubits.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e19",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "An ideal run measures 01. Under the promise, the function is...",
      "options": [
        "Unknown",
        "Constant",
        "Breaking the promise",
        "Balanced"
      ],
      "correctIndex": 3,
      "explanation": "Only constant functions give all zeros; any other result means balanced.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-e20",
      "algorithm": "deutsch_jozsa",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which two researchers is the Deutsch-Jozsa algorithm named after?",
      "options": [
        "David Deutsch and Richard Jozsa",
        "Ethan Bernstein and David Deutsch",
        "Daniel Simon and Umesh Vazirani",
        "Peter Shor and Lov Grover"
      ],
      "correctIndex": 0,
      "explanation": "Deutsch and Jozsa published the n-bit version in 1992.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m01",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "A two-bit function outputs [0,1,1,0] for inputs 00,01,10,11. How is it classified?",
      "options": [
        "Constant",
        "Balanced",
        "Neither constant nor balanced",
        "Balanced only if the outputs appear in alternating order"
      ],
      "correctIndex": 1,
      "explanation": "Two outputs are zero and two are one, so it is balanced.",
      "source": "Lecture 17.4, printed pp. 139–141",
      "visual": {
        "kind": "dj-truth-table-toggle",
        "instruction": "Adjust the interactive visual before choosing an answer."
      }
    },
    {
      "id": "deutsch_jozsa-m02",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For a promised two-input-bit function (4 possible inputs), how many deterministic classical queries may be necessary in the worst case?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correctIndex": 2,
      "explanation": "With a constant-or-balanced promise, 2^(n-1)+1 = 3 queries suffice and can be necessary for n=2.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m03",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "If an ideal two-input-qubit Deutsch–Jozsa circuit measures 10, what does this imply?",
      "options": [
        "The function is constant",
        "The function is balanced",
        "The oracle has exactly one output equal to 1",
        "The promise was violated"
      ],
      "correctIndex": 1,
      "explanation": "Any nonzero input-register measurement means balanced, under the promise.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m04",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For 3 input bits, how many of the 8 outputs are ones in a balanced Boolean function?",
      "options": [
        "2",
        "3",
        "4",
        "6"
      ],
      "correctIndex": 2,
      "explanation": "Balanced means exactly half zeros and half ones; half of 8 is 4.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m05",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For inputs 00, 01, 10, 11, which list of outputs is balanced?",
      "options": [
        "0, 0, 0, 1",
        "0, 0, 1, 1",
        "1, 1, 1, 1",
        "1, 0, 0, 0"
      ],
      "correctIndex": 1,
      "explanation": "Balanced means two 0s and two 1s. Only 0, 0, 1, 1 qualifies.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m06",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "How many different balanced functions are there on 2 input bits?",
      "options": [
        "8",
        "4",
        "2",
        "6"
      ],
      "correctIndex": 3,
      "explanation": "Choose which 2 of the 4 inputs output 1: there are 4·3/2 = 6 ways.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m07",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For 3 input bits, how many deterministic classical queries may be needed in the worst case?",
      "options": [
        "4",
        "8",
        "3",
        "5"
      ],
      "correctIndex": 3,
      "explanation": "With the promise, 2^(n−1) + 1 = 5 queries guarantee the answer: 4 equal outputs could still come from a balanced function, a 5th settles it.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m08",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "H is applied to each of 2 qubits starting from |00⟩. What is the amplitude of each of the four basis states?",
      "options": [
        "1/4",
        "1",
        "1/√2",
        "1/2"
      ],
      "correctIndex": 3,
      "explanation": "Each amplitude is (1/√2)(1/√2) = 1/2, and 4 × (1/2)² = 1.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m09",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "A classical algorithm queries 2 random inputs of a promised 3-bit function and sees different outputs. What can it conclude for certain?",
      "options": [
        "The function is constant",
        "The function is balanced",
        "Nothing yet",
        "The promise was broken"
      ],
      "correctIndex": 1,
      "explanation": "A constant function never gives two different outputs, so under the promise it must be balanced.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m10",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "After the full circuit, the amplitude of |00...0⟩ is the average of (−1)^f(x) over all inputs. What is it for the constant-1 function?",
      "options": [
        "0, so all zeros never appears",
        "−1, so all zeros is measured with certainty",
        "1/2, so all zeros appears half the time",
        "+1 only for constant 0, so constant 1 gives a random result"
      ],
      "correctIndex": 1,
      "explanation": "Every term is −1, so the average is −1. The probability is (−1)² = 1.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m11",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For 4 input bits, how many deterministic classical queries may be needed?",
      "options": [
        "8",
        "9",
        "5",
        "16"
      ],
      "correctIndex": 1,
      "explanation": "2^(n−1) + 1 = 2³ + 1 = 9.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m12",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "After the Hadamards and the oracle for outputs 0, 0, 1, 1, what are the signs on 00, 01, 10, 11?",
      "options": [
        "−, −, +, +",
        "+, −, −, +",
        "+, −, +, −",
        "+, +, −, −"
      ],
      "correctIndex": 3,
      "explanation": "Inputs with f(x) = 1 (here 10 and 11) get a minus sign.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m13",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For outputs 0, 0, 1, 1, what does the ideal circuit measure?",
      "options": [
        "01",
        "11",
        "10",
        "00"
      ],
      "correctIndex": 2,
      "explanation": "f equals the first bit, which is 10·x, so the final Hadamards give |10⟩.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m14",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "In the truth-table demonstration, make the outputs 1, 0, 0, 1. What P(00) does the demonstration show?",
      "options": [
        "50%",
        "100%",
        "25%",
        "0%"
      ],
      "correctIndex": 3,
      "explanation": "The function is balanced, so the signs average to 0 and 00 never appears.",
      "source": "Lecture 17.4, printed pp. 139–141",
      "visual": {
        "kind": "dj-truth-table-toggle",
        "instruction": "Use the truth-table demonstration: set the outputs to 1, 0, 0, 1."
      }
    },
    {
      "id": "deutsch_jozsa-m15",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "How many constant functions are there on n input bits?",
      "options": [
        "2^n",
        "1",
        "n",
        "2"
      ],
      "correctIndex": 3,
      "explanation": "All outputs 0, or all outputs 1.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m16",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Why does a balanced function never produce all zeros?",
      "options": [
        "The oracle deletes the all-zeros state",
        "Its signs are half + and half −, so the all-zeros amplitude (their average) is 0",
        "Balanced functions have an odd number of 1s",
        "All zeros is reserved for errors"
      ],
      "correctIndex": 1,
      "explanation": "The all-zeros amplitude after the final Hadamards is the average of the signs.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m17",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "With 3 input qubits, how many basis states does the first Hadamard layer put in superposition?",
      "options": [
        "9",
        "8",
        "3",
        "6"
      ],
      "correctIndex": 1,
      "explanation": "2³ = 8 inputs, each with amplitude 1/√8.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m18",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "A classical algorithm sees 3 equal outputs from a promised 2-bit function. What can it conclude?",
      "options": [
        "The promise is broken",
        "Constant",
        "Balanced",
        "Nothing yet"
      ],
      "correctIndex": 1,
      "explanation": "A balanced 2-bit function has only two equal outputs of each kind, so 3 equal outputs force constant.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m19",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Where in the circuit is the function f used?",
      "options": [
        "In the measurement",
        "In the final Hadamard layer",
        "In the first Hadamard layer",
        "Only in the oracle U_f"
      ],
      "correctIndex": 3,
      "explanation": "Everything else in the circuit is the same for every function.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-m20",
      "algorithm": "deutsch_jozsa",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "If the promise is dropped, does one run still decide constant versus not constant with certainty?",
      "options": [
        "Yes, always",
        "Yes, if n is even",
        "No: a function that is neither can still produce 00 sometimes",
        "Only for n = 1"
      ],
      "correctIndex": 2,
      "explanation": "Constant always gives 00, but some non-constant functions also give 00 with some probability.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h01",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For 2 input bits, a truth table has outputs [1,1,1,0]. What is the correct conclusion?",
      "options": [
        "Constant",
        "Balanced",
        "It violates the constant-or-balanced promise",
        "The function becomes balanced if the inputs are reordered"
      ],
      "correctIndex": 2,
      "explanation": "Three ones and one zero is neither constant nor balanced; the theorem does not apply without the promise.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h02",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For a balanced function, what is the ideal probability of measuring the input register as all zeros after the full Deutsch–Jozsa circuit?",
      "options": [
        "0",
        "1/4",
        "1/2",
        "1"
      ],
      "correctIndex": 0,
      "explanation": "The all-zero amplitude cancels by destructive interference for a balanced function.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h03",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Why is it generally insufficient to apply the final Hadamard layer on only one of several input qubits?",
      "options": [
        "It discards the phase oracle entirely",
        "It fails to perform the required basis transformation on the full input register",
        "It always transforms the function into a constant one",
        "It forces all measurements to be 1"
      ],
      "correctIndex": 1,
      "explanation": "The algorithm relies on H across the entire input register after the oracle for its zero-versus-nonzero guarantee.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h04",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "visual_mcq",
      "prompt": "In the truth-table demonstration, set the outputs to 1, 1, 1, 0. What probability of measuring 00 does the demonstration show?",
      "options": [
        "1",
        "1/4",
        "1/2",
        "0"
      ],
      "correctIndex": 1,
      "explanation": "The amplitude of 00 is (−1 −1 −1 +1)/4 = −1/2, so the probability is 1/4. This function breaks the promise, and the answer is no longer 0 or 1.",
      "source": "Lecture 17.4, printed pp. 139–141",
      "visual": {
        "kind": "dj-truth-table-toggle",
        "instruction": "Use the truth-table demonstration: set the outputs to 1, 1, 1, 0 and read P(00)."
      }
    },
    {
      "id": "deutsch_jozsa-h05",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For outputs 0, 1, 0, 1 on inputs 00, 01, 10, 11 (f equals the last bit), what does the ideal circuit measure?",
      "options": [
        "01, 10 or 11, each with probability 1/3",
        "11 with certainty",
        "01 with certainty",
        "00 with certainty"
      ],
      "correctIndex": 2,
      "explanation": "Here f(x) = 01·x mod 2, so the sign pattern is (−1)^(01·x). The final H layer turns it into |01⟩ exactly.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h06",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For outputs 0, 1, 1, 0 (f = first bit XOR second bit), what does the ideal circuit measure?",
      "options": [
        "11 with certainty",
        "01 with certainty",
        "00 with certainty",
        "A random nonzero string"
      ],
      "correctIndex": 0,
      "explanation": "f(x) = 11·x mod 2, so the H layer turns the sign pattern into |11⟩.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h07",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Why does the Deutsch–Jozsa advantage mostly disappear against randomized classical algorithms that may err slightly?",
      "options": [
        "Balanced functions are rare",
        "Randomized algorithms cannot use phase oracles",
        "A few random queries catch a balanced function with high probability",
        "Classical algorithms can also query superpositions"
      ],
      "correctIndex": 2,
      "explanation": "If a balanced function is queried at random points, getting the same value every time becomes very unlikely after a handful of queries.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h08",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "A balanced function is queried at k random inputs (with replacement). What is the chance that all k outputs are equal?",
      "options": [
        "0",
        "1/k",
        "2^(1−k)",
        "k/2^n"
      ],
      "correctIndex": 2,
      "explanation": "Each output is 0 or 1 with probability 1/2. All equal means all 0 or all 1: 2 × (1/2)^k = 2^(1−k).",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h09",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "If you apply H only BEFORE the oracle (no final H layer) and measure, what do you see for any promised function?",
      "options": [
        "Every string with probability 1/2^n",
        "Never all zeros for balanced functions",
        "The input where f(x)=1",
        "All zeros for constant functions"
      ],
      "correctIndex": 0,
      "explanation": "Signs do not change probabilities. Without the final H layer, every input string stays equally likely.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h10",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Which balanced 2-bit function is NOT of the form s·x mod 2 for any s?",
      "options": [
        "Outputs 1, 1, 0, 0",
        "Outputs 0, 1, 0, 1",
        "Outputs 0, 0, 1, 1",
        "Outputs 0, 1, 1, 0"
      ],
      "correctIndex": 0,
      "explanation": "1, 1, 0, 0 equals 1 XOR (first bit). The others are s·x for s = 10, 01 and 11. Every s·x function gives f(00) = 0.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h11",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For outputs 1, 1, 0, 0, what does the ideal circuit measure?",
      "options": [
        "01",
        "00",
        "11",
        "10"
      ],
      "correctIndex": 3,
      "explanation": "The signs −, −, +, + are minus the pattern for s = 10, so the result is −|10⟩: measured as 10.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h12",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "A 3-bit function outputs 1 on exactly 2 of its 8 inputs (the promise is broken). What is P(000)?",
      "options": [
        "1/2",
        "3/4",
        "1/4",
        "0"
      ],
      "correctIndex": 2,
      "explanation": "The average sign is (6 − 2)/8 = 1/2, and the probability is (1/2)² = 1/4.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h13",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For a balanced 3-bit function, P(000) = 0. Which other outcomes can occur?",
      "options": [
        "Some nonzero strings, depending on f",
        "None: the result is random",
        "Only 111",
        "All 7 nonzero strings, always equally likely"
      ],
      "correctIndex": 0,
      "explanation": "Different balanced functions spread their probability over different nonzero strings.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h14",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "How many balanced functions are there on 3 bits?",
      "options": [
        "35",
        "8",
        "56",
        "70"
      ],
      "correctIndex": 3,
      "explanation": "Choose which 4 of the 8 inputs output 1: C(8, 4) = 70.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h15",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "visual_mcq",
      "prompt": "In the truth-table demonstration, which balanced functions make the circuit output 01 with certainty?",
      "options": [
        "0, 1, 0, 1 or 1, 0, 1, 0",
        "Every balanced function",
        "0, 1, 1, 0 or 1, 0, 0, 1",
        "0, 0, 1, 1 or 1, 1, 0, 0"
      ],
      "correctIndex": 0,
      "explanation": "The sign pattern must be ±(−1)^(01·x), which is f = last bit or its complement.",
      "source": "Lecture 17.4, printed pp. 139–141",
      "visual": {
        "kind": "dj-truth-table-toggle",
        "instruction": "Use the truth-table demonstration: try balanced functions and watch which one gives 01."
      }
    },
    {
      "id": "deutsch_jozsa-h16",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Why does a bit-flip oracle with a helper qubit in |−⟩ behave like a phase oracle?",
      "options": [
        "The helper qubit stores all the outputs",
        "|y ⊕ f(x)⟩ applied to |−⟩ equals (−1)^f(x)|−⟩, so the sign kicks back onto |x⟩",
        "Measuring the helper reveals f",
        "The helper doubles the query count"
      ],
      "correctIndex": 1,
      "explanation": "This is phase kickback: the helper is unchanged except for a sign that belongs to |x⟩.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h17",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Random queries (with replacement) to a balanced function: what is the expected number of queries until two different values have appeared?",
      "options": [
        "3",
        "2",
        "2^(n−1) + 1",
        "4"
      ],
      "correctIndex": 0,
      "explanation": "After the first query, each new one differs with probability 1/2, so on average 2 more are needed: 3 in total.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h18",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Deutsch-Jozsa gives an exponential separation between which two models?",
      "options": [
        "Exact (zero-error) quantum and deterministic classical query complexity",
        "Noisy and noiseless quantum computers",
        "Quantum and randomized classical with small error",
        "Deterministic and randomized classical algorithms"
      ],
      "correctIndex": 0,
      "explanation": "Against randomized algorithms that may err slightly, the advantage almost disappears.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h19",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "The first Hadamard layer is replaced by Pauli-X on each qubit. What does the circuit output for any promised f?",
      "options": [
        "Never 00",
        "00 for constant functions",
        "11 always",
        "Each of the four strings with probability 1/4"
      ],
      "correctIndex": 3,
      "explanation": "X|00⟩ = |11⟩ is a single input, so the oracle adds only a global phase, and the final Hadamards give a uniform result.",
      "source": "Lecture 17.4, printed pp. 139–141"
    },
    {
      "id": "deutsch_jozsa-h20",
      "algorithm": "deutsch_jozsa",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "After H, U_f, H, the amplitude of a string y is the average of (−1)^(f(x) + x·y). For a constant f, what is the amplitude of any nonzero y?",
      "options": [
        "1/2^n",
        "1/2",
        "±1",
        "0"
      ],
      "correctIndex": 3,
      "explanation": "For y ≠ 0, the signs (−1)^(x·y) are half + and half −, so they average to 0.",
      "source": "Lecture 17.4, printed pp. 139–141"
    }
  ],
  "bernstein_vazirani": [
    {
      "id": "bernstein_vazirani-e01",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is the goal of Bernstein–Vazirani?",
      "options": [
        "Find a hidden binary string s",
        "Determine whether a function is balanced",
        "Find the period of modular exponentiation",
        "Recover only the parity of the hidden string"
      ],
      "correctIndex": 0,
      "explanation": "The promised oracle hides a bit string s, and the goal is to identify s.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e02",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which form describes the promised oracle?",
      "options": [
        "f(x) = s·x mod 2",
        "f(x) = s XOR x (bitwise)",
        "f(x) = s·x without reduction modulo 2",
        "f(x) = parity(x) regardless of s"
      ],
      "correctIndex": 0,
      "explanation": "Bernstein–Vazirani uses the mod-2 dot product of x with the secret s.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e03",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "How many ideal quantum oracle queries recover an n-bit secret string in Bernstein–Vazirani?",
      "options": [
        "One",
        "Two",
        "n/2",
        "n"
      ],
      "correctIndex": 0,
      "explanation": "The quantum algorithm extracts the full n-bit string using one phase query.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e04",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is (1·1 + 0·1 + 1·1) mod 2?",
      "options": [
        "1",
        "0",
        "3",
        "2"
      ],
      "correctIndex": 1,
      "explanation": "The sum is 2, which is even, so mod 2 it is 0.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e05",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does \"mod 2\" keep from a whole-number sum?",
      "options": [
        "Whether it is even (0) or odd (1)",
        "The sum divided by 2",
        "The last two digits",
        "Half of the sum"
      ],
      "correctIndex": 0,
      "explanation": "x mod 2 is the remainder after dividing by 2: 0 for even, 1 for odd.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e06",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "In the parity demonstration, set s = 000. What is f(x) for every input x?",
      "options": [
        "The first bit of x",
        "1",
        "The number of 1s in x",
        "0"
      ],
      "correctIndex": 3,
      "explanation": "With s = 000, every product is 0, so f(x) = 0 for every x.",
      "source": "Lecture 18.1, printed pp. 142–144",
      "visual": {
        "kind": "bv-parity-toggle",
        "instruction": "Use the parity demonstration: set s to 000 and try several inputs x."
      }
    },
    {
      "id": "bernstein_vazirani-e07",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "How many classical queries are needed to learn an n-bit secret s with certainty?",
      "options": [
        "n/2",
        "n",
        "2^n",
        "1"
      ],
      "correctIndex": 1,
      "explanation": "Each classical query returns one bit, and there are n unknown bits, so n queries are needed.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e08",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which input reveals the middle bit of a 3-bit secret s with one classical query?",
      "options": [
        "101",
        "111",
        "000",
        "010"
      ],
      "correctIndex": 3,
      "explanation": "s·010 mod 2 equals the middle bit of s, because only that position is multiplied by 1.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e09",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is the structure of the Bernstein–Vazirani circuit?",
      "options": [
        "Oracle, then measure",
        "H on every input, measure, then oracle",
        "Oracle, diffusion, measure",
        "H on every input, phase oracle, H on every input, measure"
      ],
      "correctIndex": 3,
      "explanation": "It uses the same pattern as Deutsch–Jozsa: H layer, oracle, H layer, measure.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e10",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does f(x) = s·x mod 2 tell you?",
      "options": [
        "Whether the number of positions where both s and x have a 1 is odd",
        "The number of 1s in x",
        "The number of positions where s and x differ",
        "Whether s and x are equal"
      ],
      "correctIndex": 0,
      "explanation": "The dot product counts overlapping 1s, and mod 2 keeps whether that count is odd.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e11",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "For s = 100, what is f(110)?",
      "options": [
        "3",
        "1",
        "2",
        "0"
      ],
      "correctIndex": 1,
      "explanation": "Only the first position has a 1 in both strings: 1·1 = 1.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e12",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "For s = 001, what is f(x)?",
      "options": [
        "The last bit of x",
        "The first bit of x",
        "Always 0",
        "The number of 1s in x"
      ],
      "correctIndex": 0,
      "explanation": "Only the last position of s is 1, so f(x) copies the last bit of x.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e13",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is (1 + 1) mod 2?",
      "options": [
        "0",
        "11",
        "2",
        "1"
      ],
      "correctIndex": 0,
      "explanation": "2 is even, so mod 2 it is 0.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e14",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "How many different 3-bit secrets are possible?",
      "options": [
        "9",
        "3",
        "8",
        "6"
      ],
      "correctIndex": 2,
      "explanation": "2³ = 8 strings, from 000 to 111.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e15",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does the final measurement return in the ideal algorithm?",
      "options": [
        "The secret string s",
        "The number of 1s in s",
        "f(x) for one x",
        "A random string"
      ],
      "correctIndex": 0,
      "explanation": "The final state is exactly |s⟩.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e16",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "In the parity demonstration, set s = 100 and x = 100. What is f(x)?",
      "options": [
        "1",
        "0",
        "2",
        "100"
      ],
      "correctIndex": 0,
      "explanation": "One overlapping 1, which is odd.",
      "source": "Lecture 18.1, printed pp. 142–144",
      "visual": {
        "kind": "bv-parity-toggle",
        "instruction": "Use the parity demonstration: set s to 100 and x to 100."
      }
    },
    {
      "id": "bernstein_vazirani-e17",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "The Bernstein-Vazirani circuit has the same shape as which algorithm?",
      "options": [
        "Shor",
        "Simon",
        "Deutsch-Jozsa",
        "Grover"
      ],
      "correctIndex": 2,
      "explanation": "Hadamards, oracle, Hadamards, measure: only the oracle differs.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e18",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What sign does the phase oracle give the input x?",
      "options": [
        "(−1)^x",
        "(−1)^(s·x)",
        "x XOR s",
        "s·x"
      ],
      "correctIndex": 1,
      "explanation": "Inputs with s·x = 1 get a minus sign; the others keep a plus sign.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e19",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Who introduced this algorithm, in 1993?",
      "options": [
        "Ethan Bernstein and Umesh Vazirani",
        "David Deutsch and Richard Jozsa",
        "Peter Shor",
        "Daniel Simon"
      ],
      "correctIndex": 0,
      "explanation": "It appeared in their paper on quantum complexity theory.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-e20",
      "algorithm": "bernstein_vazirani",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "For x = 000, what is f(x) for any secret s?",
      "options": [
        "1",
        "It depends on s",
        "The first bit of s",
        "0"
      ],
      "correctIndex": 3,
      "explanation": "Every product with a 0 is 0.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m01",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "For secret s=101 and x=110, what is f(x)=s·x mod 2?",
      "options": [
        "0",
        "1",
        "2",
        "3"
      ],
      "correctIndex": 1,
      "explanation": "The bitwise products are 1,0,0; their sum is 1 modulo 2.",
      "source": "Lecture 18.1, printed pp. 142–144",
      "visual": {
        "kind": "bv-parity-toggle",
        "instruction": "Adjust the interactive visual before choosing an answer."
      }
    },
    {
      "id": "bernstein_vazirani-m02",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For s=010 and x=101, which calculation correctly explains f(x)=s·x mod 2?",
      "options": [
        "0: no positions have 1 in both strings",
        "1: s has exactly one 1 bit",
        "1: x has two 1 bits, so the parity is odd",
        "0: the strings differ in their number of 1 bits"
      ],
      "correctIndex": 0,
      "explanation": "The bitwise products are 0,0,0, so the dot product is 0 modulo 2. The result depends on overlapping 1 bits, not bit counts alone.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m03",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "In the ideal algorithm, what happens after applying the final Hadamards to the input register?",
      "options": [
        "It becomes |s⟩, so measurement reveals the secret",
        "It becomes all zeros for any s",
        "Only a parity bit is revealed",
        "The oracle no longer influences any amplitude"
      ],
      "correctIndex": 0,
      "explanation": "The phase pattern generated by the oracle is converted into the basis state encoding s.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m04",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Why does querying x=001, x=010 and x=100 reveal a three-bit secret classically?",
      "options": [
        "Each query returns one specific bit of s",
        "These queries have identical outputs",
        "Each query returns all three bits of s",
        "They show only the parity of the full secret"
      ],
      "correctIndex": 0,
      "explanation": "Unit vectors isolate the corresponding bit in the mod-2 dot product.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m05",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For s = 011, which input x gives f(x) = 1?",
      "options": [
        "100",
        "111",
        "011",
        "010"
      ],
      "correctIndex": 3,
      "explanation": "010 overlaps s in one position, which is odd. 011 and 111 overlap in two (even), and 100 overlaps in none.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m06",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For s = 110, what are f(100), f(010) and f(001)?",
      "options": [
        "1, 1, 0",
        "0, 0, 1",
        "0, 1, 1",
        "1, 0, 1"
      ],
      "correctIndex": 0,
      "explanation": "Each unit input reads one bit of s, so the answers are the bits of s in order: 1, 1, 0.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m07",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "In the parity demonstration, set s = 101 and look at the phase pattern for all 8 inputs. How many inputs get a minus sign?",
      "options": [
        "3",
        "2",
        "4",
        "5"
      ],
      "correctIndex": 2,
      "explanation": "For any nonzero s, exactly half of the inputs have s·x = 1, so 4 of 8 get a minus sign.",
      "source": "Lecture 18.1, printed pp. 142–144",
      "visual": {
        "kind": "bv-parity-toggle",
        "instruction": "Use the parity demonstration: set s to 101 and count the minus signs in the phase pattern."
      }
    },
    {
      "id": "bernstein_vazirani-m08",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Before the final H layer, the state is a sum over all x of (−1)^(s·x)|x⟩, up to normalization. Why does H⊗n turn this into |s⟩?",
      "options": [
        "Because the minus signs cancel to leave |000⟩",
        "Because the oracle already wrote s into the register",
        "Because H⊗n|s⟩ is exactly that sum, and H undoes itself",
        "Because measurement picks the largest amplitude"
      ],
      "correctIndex": 2,
      "explanation": "Applying H to each qubit of |s⟩ gives the sum of (−1)^(s·x)|x⟩ over all x. Since H·H = I, applying H again returns |s⟩.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m09",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "If the oracle hides s = 000, what does the circuit measure?",
      "options": [
        "A random nonzero string",
        "111 with certainty",
        "A random string",
        "000 with certainty"
      ],
      "correctIndex": 3,
      "explanation": "The circuit always outputs s, so for s = 000 it outputs 000.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m10",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "A friend says Bernstein–Vazirani \"tries all inputs at once and reads all the answers\". What is a better description?",
      "options": [
        "It reads all 2^n outputs from one measurement",
        "It guesses s and checks it",
        "One query creates a sign pattern, and interference turns that pattern into s",
        "It copies the oracle 2^n times"
      ],
      "correctIndex": 2,
      "explanation": "One measurement gives only n bits. The trick is that the signs combine through interference into exactly the string s.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m11",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For s = 111, which inputs give f(x) = 1?",
      "options": [
        "Every input except 000",
        "111 only",
        "011, 101, 110, 000",
        "001, 010, 100, 111"
      ],
      "correctIndex": 3,
      "explanation": "With s = 111, f(x) is the parity of x: odd numbers of 1s give 1.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m12",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For a 4-bit secret, how many classical queries are needed to find s with certainty?",
      "options": [
        "1",
        "2",
        "4",
        "16"
      ],
      "correctIndex": 2,
      "explanation": "One bit of information per query, and 4 bits to learn.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m13",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "f(x) = s·x mod 2 satisfies f(x XOR y) = f(x) XOR f(y). What does this mean?",
      "options": [
        "f is constant",
        "f is reversible",
        "f is balanced only when x = y",
        "f is linear over bits"
      ],
      "correctIndex": 3,
      "explanation": "Parity functions respect XOR, which is what linear means for bit strings.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m14",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "In the parity demonstration, set s = 011 and x = 111. What is f(x)?",
      "options": [
        "1",
        "0",
        "3",
        "2"
      ],
      "correctIndex": 1,
      "explanation": "Two overlapping 1s: 1 + 1 = 2, which is even.",
      "source": "Lecture 18.1, printed pp. 142–144",
      "visual": {
        "kind": "bv-parity-toggle",
        "instruction": "Use the parity demonstration: set s to 011 and x to 111."
      }
    },
    {
      "id": "bernstein_vazirani-m15",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Classical queries give f(100) = 0, f(010) = 1, f(001) = 1. What is s?",
      "options": [
        "110",
        "011",
        "100",
        "101"
      ],
      "correctIndex": 1,
      "explanation": "Each unit input reads one bit of s, in order: 0, 1, 1.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m16",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Two queries give f(011) = 1 and f(101) = 0. Which of these secrets is consistent with both?",
      "options": [
        "110",
        "001",
        "111",
        "010"
      ],
      "correctIndex": 3,
      "explanation": "010 gives 1 and 0. (101 also fits, so two queries are not enough to decide.)",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m17",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For s = 101, which input has the same f-value as x = 000?",
      "options": [
        "111",
        "100",
        "001",
        "110"
      ],
      "correctIndex": 0,
      "explanation": "f(000) = 0 and f(111) = 1 + 0 + 1 = 2 → 0. The other three inputs give 1.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m18",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Just before the final Hadamards, which inputs have negative amplitudes for s = 010?",
      "options": [
        "100, 101, 110, 111",
        "Only 010",
        "010, 011, 110, 111",
        "001, 011, 101, 111"
      ],
      "correctIndex": 2,
      "explanation": "s·x is the middle bit of x, so inputs with middle bit 1 get a minus sign.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m19",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "The ideal circuit is run on a noisy quantum computer. What would you expect to see?",
      "options": [
        "Mostly s, but sometimes other strings",
        "Always 000",
        "Only the parity of s",
        "Always exactly s"
      ],
      "correctIndex": 0,
      "explanation": "Noise spreads some probability onto wrong strings; the ideal answer still appears most often if noise is small.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-m20",
      "algorithm": "bernstein_vazirani",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For a 10-bit secret, how many oracle queries are needed classically and quantumly?",
      "options": [
        "5 classically, 1 quantumly",
        "10 classically, 1 quantumly",
        "1,024 classically, 1 quantumly",
        "10 both ways"
      ],
      "correctIndex": 1,
      "explanation": "n classical queries versus a single quantum query.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h01",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Suppose x=110 and s=110. What is f(x)=s·x mod 2?",
      "options": [
        "0",
        "1",
        "2",
        "1, because the input has two set bits"
      ],
      "correctIndex": 0,
      "explanation": "The overlapping ones contribute 1+1=2, which is 0 modulo 2.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h02",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "A three-bit Bernstein–Vazirani circuit returns 101 with certainty. What is the secret s?",
      "options": [
        "010",
        "101",
        "111",
        "Only the parity of s is known"
      ],
      "correctIndex": 1,
      "explanation": "For the promised oracle and correct circuit, the final measurement string equals the hidden string s.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h03",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For s=111, what is the correct value of f(111)?",
      "options": [
        "0, because three ones cancel",
        "1, because 1+1+1 is odd",
        "0, because the number of matching bits is even",
        "1, because the dot product always matches one bit of s"
      ],
      "correctIndex": 1,
      "explanation": "The dot product is 3 mod 2 = 1.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h04",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "visual_mcq",
      "prompt": "In the parity demonstration, set s = 111 and choose any input x with exactly two 1s. What is f(x)?",
      "options": [
        "2",
        "1",
        "It depends on which two bits are 1",
        "0"
      ],
      "correctIndex": 3,
      "explanation": "Two overlapping 1s give 1 + 1 = 2, which is even, so f(x) = 0 for all three such inputs.",
      "source": "Lecture 18.1, printed pp. 142–144",
      "visual": {
        "kind": "bv-parity-toggle",
        "instruction": "Use the parity demonstration: set s to 111 and try inputs with exactly two 1s."
      }
    },
    {
      "id": "bernstein_vazirani-h05",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Classical queries give f(110) = 1, f(011) = 1 and f(111) = 0. What is the 3-bit secret s?",
      "options": [
        "101",
        "011",
        "110",
        "010"
      ],
      "correctIndex": 0,
      "explanation": "From s1+s2 = 1 and s1+s2+s3 = 0 (mod 2), s3 = 1. Then s2+s3 = 1 gives s2 = 0, and s1 = 1. Check: s = 101 fits all three.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h06",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Two secrets s and t give the same f(x) for every input x. What must be true?",
      "options": [
        "s and t differ in exactly one bit",
        "s and t have the same number of 1s",
        "s = t",
        "s XOR t = 111"
      ],
      "correctIndex": 2,
      "explanation": "Querying the unit inputs 100, 010, 001 reads each bit, so equal functions force every bit of s and t to match.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h07",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For n = 2, which phase pattern over inputs 00, 01, 10, 11 corresponds to s = 10?",
      "options": [
        "+, +, +, +",
        "+, +, −, −",
        "+, −, −, +",
        "+, −, +, −"
      ],
      "correctIndex": 1,
      "explanation": "s·x for s = 10 is the first bit of x: 0, 0, 1, 1. The signs are +, +, −, −.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h08",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "The oracle is changed to f(x) = 1 XOR (s·x). What does the ideal circuit measure now?",
      "options": [
        "Still s, because the extra 1 adds only a global phase",
        "A random string",
        "The complement of s",
        "000"
      ],
      "correctIndex": 0,
      "explanation": "The extra 1 multiplies every amplitude by −1, a global phase that changes no probability.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h09",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Why can no classical method find s with fewer than n queries, even with clever inputs?",
      "options": [
        "Queries have to be unit vectors",
        "Each query destroys part of the secret",
        "The oracle accepts one input per second",
        "Each query returns one bit, and there are 2^n possible secrets"
      ],
      "correctIndex": 3,
      "explanation": "k one-bit answers can tell apart at most 2^k secrets. Telling apart 2^n secrets needs k ≥ n.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h10",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "In the ideal circuit you measure only the first qubit of the final register. What do you learn?",
      "options": [
        "Whether s has an even number of 1s",
        "The first bit of s, with certainty",
        "Nothing until every qubit is measured",
        "A random bit"
      ],
      "correctIndex": 1,
      "explanation": "The final state is exactly |s⟩, a product of single-qubit states, so each qubit gives its bit of s on its own.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h11",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "If f(x) = 1 and f(y) = 1, what is f(x XOR y)?",
      "options": [
        "1",
        "2",
        "0",
        "It depends on s"
      ],
      "correctIndex": 2,
      "explanation": "Linearity: f(x XOR y) = f(x) XOR f(y) = 1 XOR 1 = 0.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h12",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "If the oracle computed s·x + t·x mod 2 for two secrets s and t, what would the circuit measure?",
      "options": [
        "s XOR t",
        "t",
        "s",
        "A random string"
      ],
      "correctIndex": 0,
      "explanation": "s·x + t·x = (s XOR t)·x mod 2, so it behaves like a single secret s XOR t.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h13",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Recursive Fourier sampling, built from Bernstein-Vazirani, is important because...",
      "options": [
        "it was the first algorithm run on hardware",
        "it gave the first superpolynomial quantum speedup over randomized classical algorithms (relative to an oracle)",
        "it searches unsorted databases",
        "it factors integers"
      ],
      "correctIndex": 1,
      "explanation": "Plain BV only beats randomized algorithms by a factor of n; the recursive version made the gap superpolynomial.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h14",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "visual_mcq",
      "prompt": "In the parity demonstration, with s = 110, how many of the 8 inputs give f(x) = 1, and which bit of x never matters?",
      "options": [
        "2, and the last bit never matters",
        "4, and the last bit never matters",
        "6, and no bit is ignored",
        "4, and the first bit never matters"
      ],
      "correctIndex": 1,
      "explanation": "The last bit of s is 0, so the last bit of x never affects f; any nonzero s splits the inputs in half.",
      "source": "Lecture 18.1, printed pp. 142–144",
      "visual": {
        "kind": "bv-parity-toggle",
        "instruction": "Use the parity demonstration: set s to 110 and look at the phase pattern."
      }
    },
    {
      "id": "bernstein_vazirani-h15",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "With 2 well-chosen classical queries, at most how many 3-bit secrets can you tell apart?",
      "options": [
        "6",
        "2",
        "4",
        "8"
      ],
      "correctIndex": 2,
      "explanation": "Two one-bit answers have only 2² = 4 possible outcomes.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h16",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "A Pauli-X is added on the top qubit just BEFORE the final Hadamards. What does the ideal circuit measure?",
      "options": [
        "000",
        "A random string",
        "s with its first bit flipped",
        "Still s: the X only adds an overall sign"
      ],
      "correctIndex": 3,
      "explanation": "X followed by H equals H followed by Z, and Z on |s⟩ only gives a sign (−1)^(s₁).",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h17",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "A Pauli-X is added on the top qubit just AFTER the final Hadamards. What does the ideal circuit measure?",
      "options": [
        "A random string",
        "s with its first bit flipped",
        "s",
        "000"
      ],
      "correctIndex": 1,
      "explanation": "The state is |s⟩ after the Hadamards, and X flips its first bit before the measurement.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h18",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Which complexity class did Bernstein and Vazirani define in the same 1993 paper?",
      "options": [
        "QMA",
        "BQP",
        "P",
        "NP"
      ],
      "correctIndex": 1,
      "explanation": "BQP is the class of problems a quantum computer solves efficiently with small error.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h19",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "A 4-bit BV circuit returns 1011. What is f(1101)?",
      "options": [
        "2",
        "3",
        "0",
        "1"
      ],
      "correctIndex": 2,
      "explanation": "s = 1011 and x = 1101: 1 + 0 + 0 + 1 = 2, which is even.",
      "source": "Lecture 18.1, printed pp. 142–144"
    },
    {
      "id": "bernstein_vazirani-h20",
      "algorithm": "bernstein_vazirani",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For an n-bit secret, how many basis states have nonzero amplitude just before the final Hadamards?",
      "options": [
        "n",
        "1",
        "All 2^n",
        "2^(n−1)"
      ],
      "correctIndex": 2,
      "explanation": "Every input has amplitude ±1/√(2^n); only the signs carry the secret.",
      "source": "Lecture 18.1, printed pp. 142–144"
    }
  ],
  "simon": [
    {
      "id": "simon-e01",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "In Simon's problem, what does the hidden mask s connect?",
      "options": [
        "Inputs x and x XOR s with equal outputs",
        "All inputs with a single fixed output",
        "Inputs that differ in precisely one bit",
        "Inputs whose numerical difference equals s"
      ],
      "correctIndex": 0,
      "explanation": "The function has paired inputs that differ by a hidden XOR mask and yield identical outputs.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e02",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Why does Simon's algorithm usually need several quantum samples?",
      "options": [
        "Each provides a linear constraint rather than the entire secret",
        "Each sample is the next bit of s in order",
        "Each sample reveals an entire second copy of the secret",
        "Every measurement gives one output bit of the oracle"
      ],
      "correctIndex": 0,
      "explanation": "Measurements yield equations y·s=0; enough independent constraints are needed to determine s.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e03",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does XOR mean for two binary bits?",
      "options": [
        "Addition modulo 2",
        "Ordinary binary addition with carries",
        "Bitwise OR",
        "Bitwise AND"
      ],
      "correctIndex": 0,
      "explanation": "XOR is 1 when bits differ and equals addition mod 2.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e04",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is 101 XOR 011?",
      "options": [
        "110",
        "001",
        "111",
        "100"
      ],
      "correctIndex": 0,
      "explanation": "XOR each position: 1⊕0 = 1, 0⊕1 = 1, 1⊕1 = 0, giving 110.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e05",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Under Simon's promise, how many inputs share each output?",
      "options": [
        "All of them",
        "Four",
        "One",
        "Exactly two: x and x XOR s"
      ],
      "correctIndex": 3,
      "explanation": "The function is 2-to-1. Each output comes from exactly one pair x and x XOR s.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e06",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "In the XOR-pairs demonstration, select two inputs with the same output. What does their XOR always equal?",
      "options": [
        "000",
        "111",
        "The mask s",
        "The shared output"
      ],
      "correctIndex": 2,
      "explanation": "Under the promise, inputs with equal outputs differ by exactly s.",
      "source": "Lecture 18.2, printed pp. 144–149",
      "visual": {
        "kind": "simon-xor-pairs",
        "instruction": "Use the XOR-pairs demonstration: select two inputs that share an output."
      }
    },
    {
      "id": "simon-e07",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which registers does Simon's oracle use?",
      "options": [
        "An input register and an output register",
        "Only an input register",
        "A single qubit",
        "Only an output register"
      ],
      "correctIndex": 0,
      "explanation": "The oracle writes f(x) into a separate output register: |x⟩|y⟩ becomes |x⟩|y XOR f(x)⟩.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e08",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "After collecting enough samples, how is s found?",
      "options": [
        "By reading it from the last sample",
        "By running Grover's algorithm",
        "By solving the equations y·s = 0 with ordinary (classical) algebra",
        "By measuring the output register"
      ],
      "correctIndex": 2,
      "explanation": "Each run gives one linear equation. A classical computer solves the system.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e09",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Why must Simon's mask s be nonzero?",
      "options": [
        "s = 000 would make every output equal",
        "Nonzero masks are easier to measure",
        "With s = 000 the oracle cannot be built",
        "With s = 000, x XOR s = x, so every input would pair only with itself"
      ],
      "correctIndex": 3,
      "explanation": "x XOR 000 = x, so there would be no real pairs and the function would be one-to-one, not 2-to-1.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e10",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What kind of speedup does Simon's algorithm give over classical algorithms (counting oracle queries)?",
      "options": [
        "Quadratic",
        "Exponential",
        "A constant factor",
        "None"
      ],
      "correctIndex": 1,
      "explanation": "Quantumly about n runs suffice. Classically about 2^(n/2) queries are needed.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e11",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is 111 XOR 111?",
      "options": [
        "222",
        "000",
        "111",
        "001"
      ],
      "correctIndex": 1,
      "explanation": "Equal bits XOR to 0.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e12",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is x XOR x for any bit string x?",
      "options": [
        "All zeros",
        "x itself",
        "Twice x",
        "All ones"
      ],
      "correctIndex": 0,
      "explanation": "Every bit is XOR-ed with itself, giving 0.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e13",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "For s = 011, which input is paired with 000?",
      "options": [
        "001",
        "100",
        "011",
        "111"
      ],
      "correctIndex": 2,
      "explanation": "000 XOR 011 = 011.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e14",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Roughly how many runs does Simon's algorithm need for n-bit inputs?",
      "options": [
        "About n",
        "One",
        "About n²",
        "About 2^n"
      ],
      "correctIndex": 0,
      "explanation": "Each run gives one equation, and about n equations pin down s.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e15",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What state does the output register start in?",
      "options": [
        "The mask s",
        "|111⟩",
        "|000⟩",
        "An equal superposition"
      ],
      "correctIndex": 2,
      "explanation": "The oracle XORs f(x) into an output register that starts at all zeros.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e16",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "In the XOR-pairs demonstration with mask 110, which input shares an output with 001?",
      "options": [
        "000",
        "010",
        "111",
        "110"
      ],
      "correctIndex": 2,
      "explanation": "001 XOR 110 = 111.",
      "source": "Lecture 18.2, printed pp. 144–149",
      "visual": {
        "kind": "simon-xor-pairs",
        "instruction": "Use the XOR-pairs demonstration: set the mask to 110 and compare inputs with 001."
      }
    },
    {
      "id": "simon-e17",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "If f(010) = f(111) under Simon's promise, what is s?",
      "options": [
        "000",
        "010",
        "101",
        "111"
      ],
      "correctIndex": 2,
      "explanation": "010 XOR 111 = 101.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e18",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Can y = 000 be a measurement result?",
      "options": [
        "Yes: it always satisfies y·s = 0",
        "Only if s = 000",
        "No, never",
        "Only on the first run"
      ],
      "correctIndex": 0,
      "explanation": "000 is orthogonal to every s, so it can always appear, though it carries no information.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e19",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "In which decade was Simon's algorithm published?",
      "options": [
        "1980s",
        "2010s",
        "1990s",
        "2000s"
      ],
      "correctIndex": 2,
      "explanation": "Daniel Simon published it in 1994.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-e20",
      "algorithm": "simon",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "How many different outputs does a Simon function on 3-bit inputs have?",
      "options": [
        "3",
        "4",
        "2",
        "8"
      ],
      "correctIndex": 1,
      "explanation": "8 inputs in pairs give 4 distinct outputs.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m01",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "A Simon oracle gives f(001)=f(111). Under Simon's promise (f(x)=f(y) only when y=x or y=x XOR s), what mask is indicated by this collision?",
      "options": [
        "001",
        "110",
        "111",
        "010"
      ],
      "correctIndex": 1,
      "explanation": "XOR the paired inputs: 001 XOR 111 = 110.",
      "source": "Lecture 18.2, printed pp. 144–149",
      "visual": {
        "kind": "simon-xor-pairs",
        "instruction": "Adjust the interactive visual before choosing an answer."
      }
    },
    {
      "id": "simon-m02",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For s=110 and y=001, does y·s=0 mod 2?",
      "options": [
        "Yes, because there are no overlapping 1 bits",
        "Yes, because s is nonzero",
        "No, because y has one 1 bit",
        "No, because the strings have different lengths"
      ],
      "correctIndex": 0,
      "explanation": "0·1 + 0·1 + 1·0 = 0 mod 2.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m03",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "If a measured sample is y=000, what information does y·s=0 impose?",
      "options": [
        "It forces s=000",
        "It adds no restriction to s",
        "It forces s to have one set bit",
        "It requires s to have even parity"
      ],
      "correctIndex": 1,
      "explanation": "The zero vector is orthogonal to every s, so this equation is uninformative.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m04",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Which choice is an appropriate circuit pattern for Simon's algorithm?",
      "options": [
        "H on input → function oracle → H on input → measure input, repeated",
        "H on output only → measure input once",
        "Measure all inputs before the oracle → H",
        "Inverse QFT → diffusion → measure"
      ],
      "correctIndex": 0,
      "explanation": "Simon uses an input-register H layer, a two-register function oracle, a second input H layer, and repeated input measurement samples.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m05",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For s = 110, which input is paired with 011?",
      "options": [
        "101",
        "010",
        "110",
        "100"
      ],
      "correctIndex": 0,
      "explanation": "011 XOR 110 = 101.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m06",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For s = 101, which y satisfies y·s = 0 (mod 2)?",
      "options": [
        "010",
        "110",
        "100",
        "001"
      ],
      "correctIndex": 0,
      "explanation": "010 shares no 1s with 101, so the dot product is 0. Each of the others overlaps s in exactly one position.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m07",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "In the XOR-pairs demonstration, set the mask to 011 and select input 100. Which input has the same output?",
      "options": [
        "000",
        "111",
        "011",
        "110"
      ],
      "correctIndex": 1,
      "explanation": "100 XOR 011 = 111.",
      "source": "Lecture 18.2, printed pp. 144–149",
      "visual": {
        "kind": "simon-xor-pairs",
        "instruction": "Use the XOR-pairs demonstration: set the mask to 011 and select input 100."
      }
    },
    {
      "id": "simon-m08",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For a nonzero 3-bit mask s, how many strings y satisfy y·s = 0?",
      "options": [
        "3",
        "4",
        "7",
        "2"
      ],
      "correctIndex": 1,
      "explanation": "Exactly half of the 8 strings are orthogonal to any nonzero s: 4 of them, including 000.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m09",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Why do the collected equations need to be independent?",
      "options": [
        "A repeated or combined equation adds no new information about s",
        "Only the first equation counts",
        "Quantum measurements cannot repeat",
        "Independent equations force s = 000"
      ],
      "correctIndex": 0,
      "explanation": "If an equation is the XOR of earlier ones, every s satisfying those also satisfies it, so it narrows nothing down.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m10",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Roughly how many classical queries are needed to find a matching pair in Simon's problem with n-bit inputs?",
      "options": [
        "About n",
        "Exactly 2",
        "About 2^(n/2), by the birthday bound",
        "About log n"
      ],
      "correctIndex": 2,
      "explanation": "Random queries find a collision after about √(2^n) = 2^(n/2) tries.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m11",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For s = 101, which strings y can be measured?",
      "options": [
        "Only 010",
        "000, 010, 101, 111",
        "001, 011, 100, 110",
        "Only 000 and 101"
      ],
      "correctIndex": 1,
      "explanation": "y·101 = y₁ XOR y₃ must be 0, so the first and last bits of y must match.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m12",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Two runs both give y = 011. How many nonzero masks still fit?",
      "options": [
        "3",
        "2",
        "7",
        "1"
      ],
      "correctIndex": 0,
      "explanation": "One distinct equation, s₂ XOR s₃ = 0, leaves 011, 100 and 111.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m13",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Which output list (for inputs 000 to 111) is a valid Simon function with s = 001?",
      "options": [
        "A, B, A, B, C, D, C, D",
        "A, A, A, A, B, B, B, B",
        "A, A, B, B, C, C, D, D",
        "A, B, C, D, A, B, C, D"
      ],
      "correctIndex": 2,
      "explanation": "Inputs differing only in the last bit must share an output, and nothing else may.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m14",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "In the XOR-pairs demonstration, set the mask to 111. Which input is paired with 010?",
      "options": [
        "111",
        "010",
        "000",
        "101"
      ],
      "correctIndex": 3,
      "explanation": "010 XOR 111 = 101.",
      "source": "Lecture 18.2, printed pp. 144–149",
      "visual": {
        "kind": "simon-xor-pairs",
        "instruction": "Use the XOR-pairs demonstration: set the mask to 111 and select 010."
      }
    },
    {
      "id": "simon-m15",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For s = 010, can y = 101 be measured?",
      "options": [
        "Yes, every y can appear",
        "No, because it has two 1s",
        "Yes, because 101·010 = 0",
        "No, only y = s can appear"
      ],
      "correctIndex": 2,
      "explanation": "No positions overlap, so the dot product is 0.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m16",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "After the output register is read, the input is (|x⟩ + |x XOR s⟩)/√2. Why not just measure it?",
      "options": [
        "It always gives 000",
        "You get x or x XOR s at random, and one value alone does not reveal s",
        "It destroys the output register",
        "It gives s directly"
      ],
      "correctIndex": 1,
      "explanation": "The final Hadamards are what turn the pair into information about s.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m17",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For n = 3, what is the probability that a run gives y = 000?",
      "options": [
        "1/2",
        "1/8",
        "1/4",
        "0"
      ],
      "correctIndex": 2,
      "explanation": "The 4 strings with y·s = 0 are equally likely.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m18",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "How many times does each run use the oracle?",
      "options": [
        "2^n times",
        "n times",
        "Once",
        "Twice"
      ],
      "correctIndex": 2,
      "explanation": "One query per run; the algorithm repeats whole runs.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m19",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Why does finding s classically take many queries?",
      "options": [
        "s changes after every query",
        "You need two inputs with equal outputs, and random queries rarely collide",
        "Each query returns only one bit",
        "The oracle is slow"
      ],
      "correctIndex": 1,
      "explanation": "Until a collision appears, the outputs look like distinct random values.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-m20",
      "algorithm": "simon",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Samples give y = 010 and y = 101 for a nonzero 3-bit s. What is s?",
      "options": [
        "001",
        "101",
        "111",
        "010"
      ],
      "correctIndex": 1,
      "explanation": "y = 010 gives s₂ = 0, and y = 101 gives s₁ = s₃. Nonzero means s = 101.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h01",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Suppose s is a nonzero 3-bit mask, and samples give constraints s3=0 and s1 XOR s2=0. What is s?",
      "options": [
        "000",
        "011",
        "101",
        "110"
      ],
      "correctIndex": 3,
      "explanation": "The first constraint fixes the last bit at 0, and the second forces the first two equal; nonzero yields 110.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h02",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Two independent measured constraints are y=011 and y=101, for a nonzero 3-bit mask s. Which mask satisfies both?",
      "options": [
        "001",
        "101",
        "111",
        "110"
      ],
      "correctIndex": 2,
      "explanation": "Equations s2 XOR s3=0 and s1 XOR s3=0 imply all three bits equal; nonzero gives 111.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h03",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Why is it incorrect to say a single generic Simon measurement directly returns the secret mask?",
      "options": [
        "The measurement returns a y constrained by y·s=0, not necessarily s",
        "The measurement yields one bit of s, not the mask",
        "The measurement always returns the output f(x)",
        "The measurement returns x XOR s directly"
      ],
      "correctIndex": 0,
      "explanation": "Simon samples constrain s; solving the resulting system, typically across several runs, is the classical recovery step.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h04",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "visual_mcq",
      "prompt": "In the XOR-pairs demonstration you find f(000) = f(101). Which other pair must also have equal outputs?",
      "options": [
        "011 and 100",
        "010 and 111",
        "001 and 110",
        "010 and 101"
      ],
      "correctIndex": 1,
      "explanation": "The collision reveals s = 101. Then 010 pairs with 010 XOR 101 = 111.",
      "source": "Lecture 18.2, printed pp. 144–149",
      "visual": {
        "kind": "simon-xor-pairs",
        "instruction": "Use the XOR-pairs demonstration: set the mask so that 000 and 101 match, then look at the other pairs."
      }
    },
    {
      "id": "simon-h05",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Samples gave y = 111 and y = 011 for a nonzero 3-bit s. What is s?",
      "options": [
        "011",
        "110",
        "101",
        "111"
      ],
      "correctIndex": 0,
      "explanation": "y = 111 gives s1⊕s2⊕s3 = 0 and y = 011 gives s2⊕s3 = 0, so s1 = 0 and s2 = s3. Nonzero means s = 011.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h06",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "A single sample y = 100 arrives. Which nonzero masks are still possible?",
      "options": [
        "All seven nonzero masks",
        "101, 110, 111",
        "100 only",
        "001, 010, 011"
      ],
      "correctIndex": 3,
      "explanation": "y·s = 0 with y = 100 means the first bit of s is 0, leaving 001, 010 and 011.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h07",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "If the output register is measured right after the oracle, what state is the input register left in?",
      "options": [
        "|000⟩",
        "(|x⟩ + |x XOR s⟩)/√2 for some random x",
        "|s⟩",
        "An equal superposition of all inputs"
      ],
      "correctIndex": 1,
      "explanation": "Seeing the output f(x) leaves only the two inputs that produce it, in an equal superposition.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h08",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "H⊗n applied to (|x⟩ + |x XOR s⟩)/√2 gives amplitude proportional to (−1)^(x·y)(1 + (−1)^(s·y)) on |y⟩. Which y can be measured?",
      "options": [
        "Every y equally often",
        "Only y = s",
        "Only y with s·y = 0",
        "Only y with s·y = 1"
      ],
      "correctIndex": 2,
      "explanation": "If s·y = 1, the bracket is 1 − 1 = 0 and that y never appears.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h09",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For n = 3, after 2 independent nonzero equations, how many nonzero masks still fit?",
      "options": [
        "3",
        "1",
        "0",
        "2"
      ],
      "correctIndex": 1,
      "explanation": "Two independent equations in 3 unknowns leave 2^(3−2) = 2 solutions, and one of them is 000. That leaves exactly one nonzero mask.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h10",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For s = 111, which strings y can the circuit produce?",
      "options": [
        "000, 011, 101, 110",
        "000 and 111",
        "001, 010, 100, 111",
        "111 only"
      ],
      "correctIndex": 0,
      "explanation": "y·111 is the parity of y, so the allowed y are the strings with an even number of 1s.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h11",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For n = 4, how many independent nonzero equations are needed to pin down s?",
      "options": [
        "3",
        "4",
        "2",
        "16"
      ],
      "correctIndex": 0,
      "explanation": "n − 1 independent equations leave exactly one nonzero solution.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h12",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Each run gives one of 4 equally likely strings, one of which is 000 (n = 3). What is the chance that 2 runs give two different nonzero strings?",
      "options": [
        "3/8",
        "1/4",
        "1/2",
        "3/4"
      ],
      "correctIndex": 0,
      "explanation": "First run nonzero: 3/4. Second run nonzero and different: 2/4. Together: 3/8.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h13",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Simon's problem is an example of which general framework?",
      "options": [
        "The hidden subgroup problem",
        "Unstructured search",
        "The traveling salesman problem",
        "Quantum error correction"
      ],
      "correctIndex": 0,
      "explanation": "The pairs {0, s} form a hidden subgroup; Shor's period finding is another example.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h14",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "visual_mcq",
      "prompt": "In the XOR-pairs demonstration, which mask makes 011 and 100 a pair?",
      "options": [
        "001",
        "111",
        "011",
        "100"
      ],
      "correctIndex": 1,
      "explanation": "011 XOR 100 = 111.",
      "source": "Lecture 18.2, printed pp. 144–149",
      "visual": {
        "kind": "simon-xor-pairs",
        "instruction": "Use the XOR-pairs demonstration: try masks until 011 and 100 share an output."
      }
    },
    {
      "id": "simon-h15",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For a nonzero 3-bit s, the set of strings y with y·s = 0 always has...",
      "options": [
        "4 elements, but it is not closed under XOR",
        "3 nonzero strings with no structure",
        "4 elements, and it is closed under XOR",
        "8 elements"
      ],
      "correctIndex": 2,
      "explanation": "It is a subspace: XOR-ing two solutions gives another solution.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h16",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Simon's algorithm gives an exponential speedup in queries. Why doesn't it directly break everyday encryption?",
      "options": [
        "No natural real-world problem is known with exactly Simon's structure",
        "It only works for n = 3",
        "It needs exponentially many qubits",
        "It is slower than classical algorithms"
      ],
      "correctIndex": 0,
      "explanation": "The lecture notes stress this caveat; its importance is as a stepping stone to Shor.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h17",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "If the function were 4-to-1, hiding two masks s and t, what would every measured y satisfy?",
      "options": [
        "y = s",
        "Only y·s = 0",
        "y·s = 0 and y·t = 0",
        "Nothing in particular"
      ],
      "correctIndex": 2,
      "explanation": "The function is constant on {x, x⊕s, x⊕t, x⊕s⊕t}, so y must be orthogonal to the whole hidden subgroup.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h18",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "What is the chance that 3 runs in a row all give y = 000 (n = 3)?",
      "options": [
        "1/64",
        "1/8",
        "3/4",
        "1/27"
      ],
      "correctIndex": 0,
      "explanation": "(1/4)³ = 1/64.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h19",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "According to the lecture notes, Simon's paper was first rejected. Who then adapted its idea into period finding?",
      "options": [
        "Lov Grover",
        "David Deutsch",
        "Peter Shor",
        "Umesh Vazirani"
      ],
      "correctIndex": 2,
      "explanation": "Shor was on the program committee and saw how to turn the idea into his factoring algorithm.",
      "source": "Lecture 18.2, printed pp. 144–149"
    },
    {
      "id": "simon-h20",
      "algorithm": "simon",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "What does applying the oracle |x⟩|y⟩ → |x⟩|y XOR f(x)⟩ twice in a row do?",
      "options": [
        "It measures f",
        "It computes 2f(x)",
        "Nothing: y XOR f(x) XOR f(x) = y",
        "It flips x"
      ],
      "correctIndex": 2,
      "explanation": "XOR-ing the same value twice cancels.",
      "source": "Lecture 18.2, printed pp. 144–149"
    }
  ],
  "grover": [
    {
      "id": "grover-e01",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is the job of Grover's marking oracle?",
      "options": [
        "Flip the phase of marked states",
        "Measure the entire register",
        "Set every amplitude equal to zero",
        "Flip the phase of every unmarked state instead"
      ],
      "correctIndex": 0,
      "explanation": "The marking oracle changes the relative sign of marked components so amplification can follow.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e02",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does the first Hadamard layer do in a standard Grover search?",
      "options": [
        "Prepare a uniform superposition of candidates",
        "Read out the target index",
        "Perform the diffusion automatically",
        "Prepare an equal classical mixture after measuring"
      ],
      "correctIndex": 0,
      "explanation": "Starting from all zeros, Hadamards put the register in a uniform superposition.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e03",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is the purpose of the diffusion operator?",
      "options": [
        "Reflect amplitudes about their mean to amplify marked outcomes",
        "Mark the target by measuring it",
        "Reverse the action of the marking oracle on every basis state",
        "Increase every basis-state probability by the same amount"
      ],
      "correctIndex": 0,
      "explanation": "Diffusion and the oracle together constitute amplitude amplification.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e04",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What kind of problem does Grover's algorithm solve?",
      "options": [
        "Factoring integers",
        "Finding a marked item in an unstructured search",
        "Finding a hidden XOR mask",
        "Sorting a list"
      ],
      "correctIndex": 1,
      "explanation": "Grover searches N possibilities for one that passes a test, with no structure to exploit.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e05",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Classically, how many items might you have to check in the worst case to find the one marked item among N?",
      "options": [
        "N",
        "1",
        "√N",
        "log₂ N"
      ],
      "correctIndex": 0,
      "explanation": "Without structure, the marked item could be the last one you check.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e06",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "In the Grover demonstration, press Oracle once with no diffusion. What happened to the marked item's probability?",
      "options": [
        "It doubled",
        "Nothing: it is still 1/8, only the sign of its amplitude flipped",
        "It became 1",
        "It became 0"
      ],
      "correctIndex": 1,
      "explanation": "The oracle flips a sign. Probabilities are amplitudes squared, so they do not change until diffusion acts.",
      "source": "Lecture 22, printed pp. 175–185",
      "visual": {
        "kind": "grover-iterations-slider",
        "instruction": "Use the Grover demonstration: reset, then press Oracle once."
      }
    },
    {
      "id": "grover-e07",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "With 3 qubits, how many items can Grover search over?",
      "options": [
        "3",
        "9",
        "6",
        "8"
      ],
      "correctIndex": 3,
      "explanation": "3 qubits have 2³ = 8 basis states.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e08",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does \"amplitude amplification\" mean?",
      "options": [
        "Increasing the marked state's amplitude so it is more likely to be measured",
        "Making a signal louder",
        "Increasing every amplitude equally",
        "Copying the marked state"
      ],
      "correctIndex": 0,
      "explanation": "Oracle plus diffusion moves amplitude from the unmarked states to the marked one.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e09",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Is Grover's result guaranteed to be correct every time?",
      "options": [
        "Yes, always",
        "No, it is right at most half the time",
        "Only if N is odd",
        "No: it is correct with high probability, and you can check the answer"
      ],
      "correctIndex": 3,
      "explanation": "For N = 8 the ideal success probability is about 94.5%. Checking the answer is easy, so you can rerun if needed.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e10",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "With 8 items in an equal superposition, what is the amplitude of each item?",
      "options": [
        "1/2",
        "1",
        "1/8",
        "1/√8"
      ],
      "correctIndex": 3,
      "explanation": "Probability 1/8 means amplitude 1/√8, because (1/√8)² = 1/8.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e11",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Who discovered this search algorithm, in 1996?",
      "options": [
        "Peter Shor",
        "Lov Grover",
        "David Deutsch",
        "Daniel Simon"
      ],
      "correctIndex": 1,
      "explanation": "It is named after Lov Grover.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e12",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "How many qubits are needed to search 16 items?",
      "options": [
        "4",
        "16",
        "8",
        "2"
      ],
      "correctIndex": 0,
      "explanation": "2⁴ = 16.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e13",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "A classical search of 1,000,000 items might need 1,000,000 checks. About how many Grover queries are needed?",
      "options": [
        "About 20",
        "About 800",
        "About 500,000",
        "About 1,000,000"
      ],
      "correctIndex": 1,
      "explanation": "About (π/4)·√1,000,000 ≈ 785.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e14",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which two steps make up one Grover iteration?",
      "options": [
        "Measurement, then oracle",
        "Diffusion, then reset",
        "Hadamard, then measurement",
        "Marking oracle, then diffusion"
      ],
      "correctIndex": 3,
      "explanation": "Oracle marks, diffusion amplifies.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e15",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "During a successful search, what happens to the unmarked items' amplitudes?",
      "options": [
        "They become large and negative",
        "They grow",
        "They stay at 1/√N",
        "They shrink"
      ],
      "correctIndex": 3,
      "explanation": "Amplitude moves from the unmarked items to the marked one.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e16",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "In the Grover demonstration, after one full iteration (Oracle then Diffusion), which bar is tallest?",
      "options": [
        "The unmarked items'",
        "The marked item's",
        "All bars are equal",
        "Item 000's"
      ],
      "correctIndex": 1,
      "explanation": "After one iteration the marked amplitude is about 0.88; the others are about 0.18.",
      "source": "Lecture 22, printed pp. 175–185",
      "visual": {
        "kind": "grover-iterations-slider",
        "instruction": "Use the Grover demonstration: reset, then press Full iteration once."
      }
    },
    {
      "id": "grover-e17",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Grover's algorithm is useful when...",
      "options": [
        "you need exact arithmetic",
        "you can easily check a candidate answer but have no shortcut to find it",
        "the answer is already known",
        "the data is sorted"
      ],
      "correctIndex": 1,
      "explanation": "The oracle is just the check; Grover needs no other structure.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e18",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does unstructured mean in unstructured search?",
      "options": [
        "The search has no answer",
        "The computer has no memory",
        "The items are random numbers",
        "Nothing about the items' order or labels helps find the answer"
      ],
      "correctIndex": 3,
      "explanation": "If the list were sorted, you could use binary search instead.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e19",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is the measurement at the end of Grover's algorithm for?",
      "options": [
        "To apply diffusion",
        "To reset the amplitudes",
        "To read out a candidate item",
        "To mark the item"
      ],
      "correctIndex": 2,
      "explanation": "After the iterations, measuring gives the marked item with high probability.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-e20",
      "algorithm": "grover",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Does Grover's algorithm give an exponential speedup?",
      "options": [
        "No, a quadratic one",
        "Only for N = 4",
        "No, none at all",
        "Yes"
      ],
      "correctIndex": 0,
      "explanation": "√N queries instead of N.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m01",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For 8 equally likely candidate items with one marked target, what is the target probability before Grover iterations?",
      "options": [
        "1/2",
        "1/4",
        "1/8",
        "1/16"
      ],
      "correctIndex": 2,
      "explanation": "Uniform superposition over 8 possibilities gives each probability 1/8.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m02",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "In Grover search, which ordering constitutes one full amplification iteration?",
      "options": [
        "Diffusion then measure",
        "Oracle then diffusion",
        "Hadamard then measure",
        "Measurement then oracle"
      ],
      "correctIndex": 1,
      "explanation": "One Grover iteration is the marking phase oracle followed by diffusion.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m03",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For a single marked item among four candidates, what is the ideal success probability after one Grover iteration?",
      "options": [
        "25%",
        "50%",
        "75%",
        "100%"
      ],
      "correctIndex": 3,
      "explanation": "For N=4, sin²(3·asin(1/2)) = sin²(pi/2) = 1.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m04",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "Why might Grover be worse after too many iterations?",
      "options": [
        "The probability rotates past its maximum and falls",
        "The diffusion ceases to preserve normalization",
        "The initial uniform state disappears before the oracle",
        "The amplitude amplification has no optimal stopping point"
      ],
      "correctIndex": 0,
      "explanation": "Amplitude amplification oscillates; additional iterations can overshoot the optimum.",
      "source": "Lecture 22, printed pp. 175–185",
      "visual": {
        "kind": "grover-iterations-slider",
        "instruction": "Adjust the interactive visual before choosing an answer."
      }
    },
    {
      "id": "grover-m05",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For N = 8 with one marked item, how many Grover iterations give the highest success probability?",
      "options": [
        "3",
        "2",
        "8",
        "1"
      ],
      "correctIndex": 1,
      "explanation": "The success probabilities are about 78% after 1, 94.5% after 2 and 33% after 3 iterations.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m06",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For N = 8, what is the ideal success probability after one iteration?",
      "options": [
        "About 78%",
        "About 95%",
        "Exactly 100%",
        "About 50%"
      ],
      "correctIndex": 0,
      "explanation": "sin²(3·asin(1/√8)) = 25/32 ≈ 78%.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m07",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "In the Grover demonstration, run 3 full iterations instead of 2. What happens?",
      "options": [
        "The success probability drops: the state overshoots",
        "It rises slightly",
        "It stays the same",
        "It reaches exactly 100%"
      ],
      "correctIndex": 0,
      "explanation": "After 2 iterations success is 94.5%, after 3 it is about 33%.",
      "source": "Lecture 22, printed pp. 175–185",
      "visual": {
        "kind": "grover-iterations-slider",
        "instruction": "Use the Grover demonstration: compare 2 iterations with 3."
      }
    },
    {
      "id": "grover-m08",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "About how many iterations are best for N items with one marked?",
      "options": [
        "(π/4)·√N",
        "N/2",
        "√N/π",
        "log₂ N"
      ],
      "correctIndex": 0,
      "explanation": "The optimal count is close to (π/4)·√N. For N = 8 that is about 2.2, so 2.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m09",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Why does the oracle flip a sign instead of simply announcing the answer?",
      "options": [
        "Flipping makes the marked probability 1 at once",
        "The oracle does not know the answer",
        "A sign changes no probability by itself, but diffusion can turn it into a larger amplitude",
        "Signs are easier to compute"
      ],
      "correctIndex": 2,
      "explanation": "The oracle is a reversible test applied to a superposition. The sign is the hook that diffusion uses to amplify.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m10",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Right after the oracle flips the marked amplitude from a to −a (all others stay a), what happens to the mean of the 8 amplitudes?",
      "options": [
        "It becomes zero",
        "It stays exactly the same",
        "It decreases slightly",
        "It increases"
      ],
      "correctIndex": 2,
      "explanation": "The new mean is (7a − a)/8 = 0.75a, which is lower than a.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m11",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For N = 64 with one marked item, about how many iterations are best?",
      "options": [
        "64",
        "6",
        "3",
        "8"
      ],
      "correctIndex": 1,
      "explanation": "(π/4)·√64 = (π/4)·8 ≈ 6.3, so 6.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m12",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For N = 4, sin θ = 1/2. Before any iteration, what is the success probability sin²(θ)?",
      "options": [
        "1/4",
        "1/2",
        "0",
        "1"
      ],
      "correctIndex": 0,
      "explanation": "(1/2)² = 1/4: one item out of four.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m13",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Diffusion sends each amplitude a to...",
      "options": [
        "mean − 2a",
        "2·(mean) − a",
        "a − mean",
        "−a"
      ],
      "correctIndex": 1,
      "explanation": "Reflecting about the mean: as far above the mean as it was below, or vice versa.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m14",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "In the Grover demonstration, after 2 full iterations, what is P(marked)?",
      "options": [
        "94.5%",
        "78.1%",
        "33%",
        "100%"
      ],
      "correctIndex": 0,
      "explanation": "sin²(5·asin(1/√8)) ≈ 0.945.",
      "source": "Lecture 22, printed pp. 175–185",
      "visual": {
        "kind": "grover-iterations-slider",
        "instruction": "Use the Grover demonstration: reset, then press Full iteration twice."
      }
    },
    {
      "id": "grover-m15",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "All 8 amplitudes are equal. What does diffusion do?",
      "options": [
        "It flips every sign",
        "It doubles every amplitude",
        "Nothing: each amplitude already equals the mean",
        "It sets them to 0"
      ],
      "correctIndex": 2,
      "explanation": "2·mean − a = 2a − a = a.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m16",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "If all 8 items were marked, what would Grover's algorithm do?",
      "options": [
        "Need 8 iterations",
        "Fail and return nothing",
        "Nothing useful: the oracle only adds an overall sign, though every outcome is marked anyway",
        "Find one item with certainty after 1 iteration"
      ],
      "correctIndex": 2,
      "explanation": "Flipping every sign is a global phase, so the state never changes.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m17",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Checking items in random order, how many checks does a classical search of N items need on average to find the one marked item?",
      "options": [
        "About √N",
        "About N/2",
        "About N²",
        "About log N"
      ],
      "correctIndex": 1,
      "explanation": "On average you find it halfway through.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m18",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Each Grover iteration rotates the state by 2θ, where sin θ = 1/√N. For N = 8, what is θ?",
      "options": [
        "45°",
        "7.5°",
        "30°",
        "About 20.7°"
      ],
      "correctIndex": 3,
      "explanation": "asin(1/√8) ≈ 20.7°.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m19",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "How is the cost of the oracle counted?",
      "options": [
        "Each oracle call costs N steps",
        "The oracle is free",
        "Each oracle call counts as one query, however complex the check inside",
        "The oracle cannot be built"
      ],
      "correctIndex": 2,
      "explanation": "Query complexity counts calls to the box.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-m20",
      "algorithm": "grover",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For N = 8 you measured after 2 iterations and the answer was wrong. What should you do?",
      "options": [
        "Apply one more diffusion only",
        "Give up: Grover cannot find it",
        "Measure again without rerunning",
        "Run the whole algorithm again"
      ],
      "correctIndex": 3,
      "explanation": "Measuring collapses the state, so you start over; the chance of failing twice is tiny.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h01",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For one marked item among N possibilities, the ideal number of Grover oracle queries scales roughly like...",
      "options": [
        "N",
        "log2 N",
        "√N",
        "N²"
      ],
      "correctIndex": 2,
      "explanation": "Grover gives a quadratic query advantage: O(√N) rather than O(N).",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h02",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For N=16 and one marked item, which statement about three Grover iterations is most accurate?",
      "options": [
        "They make success very likely but not exactly guaranteed",
        "They leave the target at its original 1/16 probability",
        "They always make success exactly zero",
        "They produce a guaranteed correct result without sampling"
      ],
      "correctIndex": 0,
      "explanation": "The ideal target probability after three iterations is sin²(7 asin(1/4)), about 96%.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h03",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "If there are multiple marked items, what needs to change in choosing Grover iteration count?",
      "options": [
        "The number of marked items affects the optimal count",
        "Nothing; always use exactly N rounds",
        "The Hadamard gates must all be removed",
        "The algorithm becomes deterministic after zero rounds"
      ],
      "correctIndex": 0,
      "explanation": "The initial overlap with the marked subspace depends on the number of solutions, so the optimal number of iterations changes.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h04",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "visual_mcq",
      "prompt": "In the Grover demonstration (N = 8), after 1 oracle and 1 diffusion, what is the marked amplitude?",
      "options": [
        "Exactly 1",
        "About 0.71",
        "About 0.35",
        "About 0.88, which is 5/(2√8)"
      ],
      "correctIndex": 3,
      "explanation": "Start with a = 1/√8. After the oracle the mean is 0.75a. Diffusion sends −a to 2(0.75a) + a = 2.5a ≈ 0.884. Its square is 78%.",
      "source": "Lecture 22, printed pp. 175–185",
      "visual": {
        "kind": "grover-iterations-slider",
        "instruction": "Use the Grover demonstration: reset, press Oracle, then Diffusion, and read the marked amplitude."
      }
    },
    {
      "id": "grover-h05",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Using the same numbers (N = 8, one iteration), what is each unmarked amplitude?",
      "options": [
        "0",
        "About −0.177",
        "About 0.177, which is 1/(2√8)",
        "About 0.354"
      ],
      "correctIndex": 2,
      "explanation": "Each unmarked amplitude becomes 2(0.75a) − a = 0.5a = 1/(2√8) ≈ 0.177.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h06",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "If 2 of 8 items are marked, what is the probability of measuring a marked item before any iterations?",
      "options": [
        "2/√8",
        "1/8",
        "1/4",
        "1/2"
      ],
      "correctIndex": 2,
      "explanation": "Each item has probability 1/8, and two are marked: 2/8 = 1/4.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h07",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "With 2 of 8 items marked, sin θ = √(2/8) = 1/2, so θ = 30°. After t iterations success is sin²((2t+1)θ). How many iterations reach certainty?",
      "options": [
        "0",
        "3",
        "1",
        "2"
      ],
      "correctIndex": 2,
      "explanation": "(2·1 + 1)·30° = 90°, and sin²(90°) = 1.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h08",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Grover's algorithm is optimal. Any quantum algorithm for unstructured search needs on the order of how many queries?",
      "options": [
        "N^(1/3)",
        "√N",
        "1",
        "log N"
      ],
      "correctIndex": 1,
      "explanation": "A known lower bound shows that about √N queries are necessary, so Grover's quadratic speedup cannot be beaten.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h09",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Which picture best describes one Grover iteration?",
      "options": [
        "A rotation by angle 2θ toward the marked state, in a 2D plane",
        "A random shuffle of amplitudes",
        "A measurement followed by a reset",
        "A rotation away from the marked state"
      ],
      "correctIndex": 0,
      "explanation": "Oracle and diffusion are two reflections, and two reflections make a rotation by 2θ.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h10",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For N = 8, the success probability after 4 iterations is only about 1%. Why?",
      "options": [
        "The oracle runs out of queries",
        "Noise builds up in the ideal circuit",
        "Diffusion stops working after 3 rounds",
        "The total angle (9θ ≈ 186°) is almost a half-turn, where the marked component is near zero"
      ],
      "correctIndex": 3,
      "explanation": "θ = asin(1/√8) ≈ 20.7°, so 9θ ≈ 186° and sin²(186°) ≈ 0.012.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h11",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For N = 8, what is the marked amplitude after 2 iterations?",
      "options": [
        "About 0.972",
        "Exactly 1",
        "About 0.884",
        "About 0.707"
      ],
      "correctIndex": 0,
      "explanation": "It is 2.75/√8 ≈ 0.972, whose square is 94.5%.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h12",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For N = 8, what is each unmarked amplitude after 2 iterations?",
      "options": [
        "0",
        "About 0.177",
        "About −0.088",
        "About +0.088"
      ],
      "correctIndex": 2,
      "explanation": "It is −1/(4√8) ≈ −0.088; seven of them hold the remaining 5.5%.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h13",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "The lecture notes mention a classical 3SAT algorithm taking about 1.3^n time. Plain Grover over all 2^n assignments takes about...",
      "options": [
        "1.41^n, which is slower than 1.3^n",
        "2^n",
        "1.14^n",
        "n²"
      ],
      "correctIndex": 0,
      "explanation": "√(2^n) = (√2)^n ≈ 1.41^n. Grover must be combined with clever classical methods to win.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h14",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "visual_mcq",
      "prompt": "In the Grover demonstration, how many full iterations (from 0 to 4) bring P(marked) closest to 0?",
      "options": [
        "3",
        "2",
        "4",
        "0"
      ],
      "correctIndex": 2,
      "explanation": "After 4 iterations P ≈ 1.2%, lower than the starting 12.5%.",
      "source": "Lecture 22, printed pp. 175–185",
      "visual": {
        "kind": "grover-iterations-slider",
        "instruction": "Use the Grover demonstration: count full iterations from 0 to 4 and watch P(marked)."
      }
    },
    {
      "id": "grover-h15",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "About how many queries would Grover need to search all 2^128 possible 128-bit keys?",
      "options": [
        "128",
        "2^64",
        "2^32",
        "2^128"
      ],
      "correctIndex": 1,
      "explanation": "√(2^128) = 2^64, which is why long-term guidance favors 256-bit keys.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h16",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "With K marked items among N, the best number of iterations is about...",
      "options": [
        "(π/4)·√(N/K)",
        "K·√N",
        "(π/4)·√(NK)",
        "N/K"
      ],
      "correctIndex": 0,
      "explanation": "More marked items means a larger starting overlap and fewer iterations.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h17",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "One Grover iteration is two reflections. Which two?",
      "options": [
        "The oracle and a measurement",
        "Two Hadamard layers",
        "A measurement and a reset",
        "The oracle (reflect about the unmarked states) and diffusion (reflect about the uniform state)"
      ],
      "correctIndex": 3,
      "explanation": "Two reflections make a rotation, by angle 2θ.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h18",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "According to the lecture notes, what can you do when the number of marked items is unknown?",
      "options": [
        "Always use 1 iteration",
        "Try random or decreasing iteration counts",
        "Nothing: it is impossible",
        "Use N iterations"
      ],
      "correctIndex": 1,
      "explanation": "Random choices of the iteration count still succeed with good probability.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h19",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Searching a physical database with Grover would need what hardware, which does not yet exist at scale?",
      "options": [
        "Quantum RAM (memory that can be queried in superposition)",
        "A photonic camera",
        "A classical hard drive",
        "A larger power supply"
      ],
      "correctIndex": 0,
      "explanation": "The lecture notes point out this engineering challenge.",
      "source": "Lecture 22, printed pp. 175–185"
    },
    {
      "id": "grover-h20",
      "algorithm": "grover",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For N = 4, one iteration reaches the marked item exactly. What is P(marked) after a second iteration?",
      "options": [
        "50%",
        "0%",
        "100%",
        "25%"
      ],
      "correctIndex": 3,
      "explanation": "The angle becomes 5 × 30° = 150°, and sin²(150°) = 1/4: back to the start.",
      "source": "Lecture 22, printed pp. 175–185"
    }
  ],
  "shor": [
    {
      "id": "shor-e01",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What problem is the period-finding subroutine used for in Shor's algorithm?",
      "options": [
        "Finding factors of an integer",
        "Finding a marked database item",
        "Classifying one-bit functions",
        "Determining whether XOR outputs collide"
      ],
      "correctIndex": 0,
      "explanation": "Shor reduces factoring to a period-finding problem plus classical number theory.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e02",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does the quantum Fourier transform help reveal?",
      "options": [
        "Periodic structure encoded in amplitudes",
        "A complete table of modular exponentiation outputs at once",
        "The exact prime factors directly from each single measurement",
        "Only the largest amplitude without any phase information"
      ],
      "correctIndex": 0,
      "explanation": "The QFT uses phase interference to provide information about frequencies and periods.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e03",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which classical operation helps recover factors from a suitable period?",
      "options": [
        "Greatest common divisor (GCD)",
        "A continued-fractions approximation by itself, with no GCD step",
        "A bitwise XOR of the measured register",
        "Repeated squaring by itself, without a period"
      ],
      "correctIndex": 0,
      "explanation": "Classical GCD computations using an even period can yield nontrivial factors.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e04",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is 2⁵ mod 15?",
      "options": [
        "7",
        "15",
        "32",
        "2"
      ],
      "correctIndex": 3,
      "explanation": "2⁵ = 32 = 2·15 + 2, so the remainder is 2.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e05",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does \"period\" mean for a sequence like 1, 2, 4, 8, 1, 2, 4, 8, ...?",
      "options": [
        "The sum of one cycle",
        "The largest value",
        "The first value",
        "How many steps it takes to repeat"
      ],
      "correctIndex": 3,
      "explanation": "This sequence repeats every 4 steps, so its period is 4.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e06",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "In the Fourier clock demonstration, set the frequency to 0. How do the clock hands look?",
      "options": [
        "Only one hand appears",
        "They spin at random",
        "They point in opposite pairs and cancel",
        "All hands point the same way, so the arrows add up fully"
      ],
      "correctIndex": 3,
      "explanation": "Every phase is 2π·x·0/16 = 0, so all hands align and the sum is as long as possible.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161",
      "visual": {
        "kind": "shor-period-clocks",
        "instruction": "Use the Fourier clock demonstration: set the frequency to 0."
      }
    },
    {
      "id": "shor-e07",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which part of Shor's algorithm needs a quantum computer?",
      "options": [
        "Computing the GCD",
        "Finding the period",
        "Checking the factors",
        "Choosing the number to factor"
      ],
      "correctIndex": 1,
      "explanation": "Only period finding is quantum. The rest is fast classical arithmetic.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e08",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What are the prime factors of 15?",
      "options": [
        "1 and 15",
        "3 and 5",
        "3 and 4",
        "2 and 7"
      ],
      "correctIndex": 1,
      "explanation": "15 = 3 × 5, and both are prime.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e09",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is gcd(12, 18)?",
      "options": [
        "2",
        "3",
        "36",
        "6"
      ],
      "correctIndex": 3,
      "explanation": "The divisors of 12 and 18 in common are 1, 2, 3 and 6. The largest is 6.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e10",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Why does fast factoring matter in practice?",
      "options": [
        "It sorts data faster",
        "It speeds up web search",
        "It compresses files",
        "Widely used public-key encryption (RSA) relies on factoring being hard"
      ],
      "correctIndex": 3,
      "explanation": "RSA's security assumes large numbers cannot be factored quickly. A large quantum computer running Shor's algorithm would break that assumption.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e11",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What do the letters RSA stand for?",
      "options": [
        "Rivest, Shamir and Adleman",
        "Rapid Signature Authentication",
        "Random Secure Algorithm",
        "Reversible Shor Algorithm"
      ],
      "correctIndex": 0,
      "explanation": "The three inventors published RSA in 1977.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e12",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "In RSA, which number is made public?",
      "options": [
        "q",
        "Both p and q",
        "p",
        "N = p × q"
      ],
      "correctIndex": 3,
      "explanation": "The primes stay secret; only their product is published.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e13",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Which is easy for a classical computer?",
      "options": [
        "Neither is possible",
        "Factoring their product",
        "Both are equally hard",
        "Multiplying two large primes"
      ],
      "correctIndex": 3,
      "explanation": "Multiplying is fast; undoing it is believed to be very slow.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e14",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is 2⁴ mod 15?",
      "options": [
        "15",
        "1",
        "4",
        "16"
      ],
      "correctIndex": 1,
      "explanation": "16 = 15 + 1, so the remainder is 1.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e15",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "Who published the quantum factoring algorithm in 1994?",
      "options": [
        "Peter Shor",
        "Daniel Simon",
        "Richard Feynman",
        "Lov Grover"
      ],
      "correctIndex": 0,
      "explanation": "It is named after Peter Shor.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e16",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "visual_mcq",
      "prompt": "In the Fourier clock demonstration with period 4, step to frequency 1. What does the arrow sum look like?",
      "options": [
        "The sum is 50%",
        "The sum is 100%",
        "The sum is 25%",
        "The arrows cancel: the sum is 0%"
      ],
      "correctIndex": 3,
      "explanation": "The four hands point a quarter turn apart, so they cancel exactly.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161",
      "visual": {
        "kind": "shor-period-clocks",
        "instruction": "Use the Fourier clock demonstration: keep the period at 4 and step to frequency 1."
      }
    },
    {
      "id": "shor-e17",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What does QFT stand for?",
      "options": [
        "Quantum factoring test",
        "Quick Fourier table",
        "Quantum Fourier transform",
        "Quantum function tracker"
      ],
      "correctIndex": 2,
      "explanation": "The QFT is the step that reveals the period.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e18",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is gcd(15, 25)?",
      "options": [
        "15",
        "75",
        "5",
        "3"
      ],
      "correctIndex": 2,
      "explanation": "5 is the largest number dividing both.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e19",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "What is post-quantum cryptography?",
      "options": [
        "Encryption designed to resist attacks by quantum computers",
        "A way to speed up RSA",
        "Encryption used after quantum computers are banned",
        "Cryptography that runs on quantum computers"
      ],
      "correctIndex": 0,
      "explanation": "NIST published its first post-quantum standards in 2024.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-e20",
      "algorithm": "shor",
      "difficulty": "easy",
      "type": "mcq",
      "prompt": "A 2025 estimate said a 2048-bit RSA key could be broken in under a week by about how many noisy qubits?",
      "options": [
        "About a billion",
        "About 50",
        "Less than a million",
        "About 1,000"
      ],
      "correctIndex": 2,
      "explanation": "Craig Gidney's 2025 estimate, down from 20 million in 2019.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m01",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For f(x)=2^x mod 15, the sequence begins 1,2,4,8,1,... What is the period?",
      "options": [
        "2",
        "3",
        "4",
        "5"
      ],
      "correctIndex": 2,
      "explanation": "The first 1 reappears after four exponent steps: 2^4 ≡ 1 mod 15.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m02",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For N=15, a=2 and period r=4, what is gcd(2^(r/2)-1,15)?",
      "options": [
        "1",
        "2",
        "3",
        "5"
      ],
      "correctIndex": 2,
      "explanation": "2^(4/2)-1=3, and gcd(3,15)=3.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m03",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "What is the relationship between the QFT result and the final factors in Shor's method?",
      "options": [
        "The QFT supplies information for estimating a period, then classical processing obtains factors",
        "The QFT directly outputs both primes in every single shot",
        "The QFT removes the need for a modular exponentiation function",
        "The QFT is identical to Grover's diffusion operator"
      ],
      "correctIndex": 0,
      "explanation": "Period reconstruction and GCD postprocessing are needed; the output is not simply the factor pair.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m04",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "What does the clock-arrow analogy illustrate for the QFT?",
      "options": [
        "Correctly matched frequencies can reinforce while others cancel",
        "All arrows always point in the same direction",
        "Every period corresponds to the same frequency",
        "Any randomly chosen clock frequency always reveals the same period"
      ],
      "correctIndex": 0,
      "explanation": "Aligning phase directions add constructively; misaligned ones can cancel.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161",
      "visual": {
        "kind": "shor-period-clocks",
        "instruction": "Adjust the interactive visual before choosing an answer."
      }
    },
    {
      "id": "shor-m05",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Powers of 7 mod 15 go 1, 7, 4, 13, 1, ... What is the period?",
      "options": [
        "2",
        "3",
        "7",
        "4"
      ],
      "correctIndex": 3,
      "explanation": "7⁴ = 2401 = 160·15 + 1, and no smaller power gives 1.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m06",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Powers of 4 mod 15 go 1, 4, 1, 4, ... so r = 2. What do gcd(4^(r/2) − 1, 15) and gcd(4^(r/2) + 1, 15) give?",
      "options": [
        "4 and 15",
        "1 and 15",
        "2 and 7",
        "3 and 5"
      ],
      "correctIndex": 3,
      "explanation": "4¹ − 1 = 3 and 4¹ + 1 = 5. gcd(3, 15) = 3 and gcd(5, 15) = 5.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m07",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "In the Fourier clock demonstration with period 4 and 16 positions, which frequencies make all the hands line up?",
      "options": [
        "0, 4, 8, 12",
        "1, 2, 3, 4",
        "Every even number",
        "Only 4"
      ],
      "correctIndex": 0,
      "explanation": "The hands align when y·4/16 is a whole number, i.e. y is a multiple of 16/4 = 4.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161",
      "visual": {
        "kind": "shor-period-clocks",
        "instruction": "Use the Fourier clock demonstration: keep the period at 4 and step through the frequencies."
      }
    },
    {
      "id": "shor-m08",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "With 16 possible outcomes and period r = 4, a measurement gives y = 12. What does y/16 reduce to, and what does it suggest?",
      "options": [
        "3/4, suggesting r = 4",
        "12/16, suggesting r = 16",
        "1/4, suggesting r = 12",
        "3/4, suggesting r = 3"
      ],
      "correctIndex": 0,
      "explanation": "12/16 = 3/4. The outcome is k·16/r with k = 3, and the denominator 4 is the period.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m09",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Why is Shor's algorithm sometimes run more than once?",
      "options": [
        "The GCD step is random",
        "A run can give a useless outcome (like y = 0), or the chosen a can have an odd period",
        "The quantum computer forgets N",
        "The QFT is wrong half the time"
      ],
      "correctIndex": 1,
      "explanation": "Some outcomes and some choices of a do not reveal a usable period. Each attempt succeeds with good probability, so a few repeats are enough.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m10",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "What happens if you use a^r instead of a^(r/2), for example gcd(2⁴ − 1, 15)?",
      "options": [
        "You get 1",
        "You get 15, a trivial factor",
        "You get 3",
        "You get 5"
      ],
      "correctIndex": 1,
      "explanation": "2⁴ − 1 = 15, and gcd(15, 15) = 15. a^r ≡ 1, so a^r − 1 is always a multiple of N.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m11",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "What is the QFT on one qubit (Q = 2)?",
      "options": [
        "The identity",
        "Phase (S)",
        "The Hadamard gate",
        "Pauli-X"
      ],
      "correctIndex": 2,
      "explanation": "With ω = −1 the QFT matrix is exactly the Hadamard matrix.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m12",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For Q = 4, what is ω = e^(2πi/4)?",
      "options": [
        "1",
        "−i",
        "−1",
        "i"
      ],
      "correctIndex": 3,
      "explanation": "A quarter turn around the circle.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m13",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Powers of 11 mod 15 go 1, 11, 1, 11, ... What is the period, and what factors result?",
      "options": [
        "r = 2, factors 3 and 5",
        "r = 2, factors 1 and 15",
        "r = 4, factors 3 and 5",
        "r = 11, no factors"
      ],
      "correctIndex": 0,
      "explanation": "11¹ = 11, so gcd(10, 15) = 5 and gcd(12, 15) = 3.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m14",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "visual_mcq",
      "prompt": "In the Fourier clock demonstration with period 2, how many frequencies from 0 to 15 line up perfectly?",
      "options": [
        "4",
        "8",
        "16",
        "2"
      ],
      "correctIndex": 3,
      "explanation": "Peaks are at multiples of 16/2 = 8: frequencies 0 and 8.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161",
      "visual": {
        "kind": "shor-period-clocks",
        "instruction": "Use the Fourier clock demonstration: set the period to 2 and step through the frequencies."
      }
    },
    {
      "id": "shor-m15",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "For a = 2 and N = 15, suppose the work register is read and shows 8. Which counting values remain?",
      "options": [
        "8 only",
        "1, 5, 9, 13",
        "0, 4, 8, 12",
        "3, 7, 11, 15"
      ],
      "correctIndex": 3,
      "explanation": "2^x mod 15 = 8 exactly when x = 3, 7, 11 or 15: spaced by the period 4.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m16",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "About how many gates does the QFT on n qubits need?",
      "options": [
        "About n·2^n",
        "About n²/2",
        "About n",
        "About 2^n"
      ],
      "correctIndex": 1,
      "explanation": "Hadamards plus controlled phase rotations: n(n + 1)/2, plus swaps.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m17",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "According to the lecture notes, at least what fraction of random choices of a lead to factors?",
      "options": [
        "Exactly 1/2",
        "Less than 1/100",
        "3/8",
        "All of them"
      ],
      "correctIndex": 2,
      "explanation": "If a choice fails, just pick another a.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m18",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Which other problem does Shor's algorithm solve, breaking Diffie-Hellman?",
      "options": [
        "Graph coloring",
        "Discrete logarithm",
        "The traveling salesman problem",
        "Sorting"
      ],
      "correctIndex": 1,
      "explanation": "The same period-finding idea computes discrete logarithms.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m19",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "According to the lecture notes, which kind of cryptography has no known quantum attack?",
      "options": [
        "Diffie-Hellman",
        "Lattice-based",
        "RSA",
        "Elliptic-curve"
      ],
      "correctIndex": 1,
      "explanation": "That is why most post-quantum standards are lattice-based.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-m20",
      "algorithm": "shor",
      "difficulty": "medium",
      "type": "mcq",
      "prompt": "Why does the work register in this game's Shor circuit start at 1 rather than 0?",
      "options": [
        "There is no reason",
        "Multiplying by 2^x needs a starting value of 1; starting at 0 would stay 0",
        "To make the QFT work",
        "Qubits must start at 1"
      ],
      "correctIndex": 1,
      "explanation": "0 × 2^x = 0 for every x, so no periodic pattern would appear.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h01",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For N=15, a=2 and period r=4, what is gcd(2^(r/2)+1,15)?",
      "options": [
        "1",
        "2",
        "3",
        "5"
      ],
      "correctIndex": 3,
      "explanation": "2²+1=5, and gcd(5,15)=5, giving the other nontrivial factor.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h02",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Why does an odd order r not immediately yield the standard factor formula using a^(r/2)±1?",
      "options": [
        "r/2 is not an integer, so the even-period factorization step is unavailable",
        "Because a^r cannot be computed",
        "Because an even r would force all Fourier peaks to vanish",
        "Because odd r always means N has no nontrivial factors"
      ],
      "correctIndex": 0,
      "explanation": "The standard reduction needs an even r, plus a nontriviality condition; an unsuccessful choice can be retried.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h03",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "In a teaching implementation that uses an \"inverse QFT\" block, what is the scientifically accurate claim?",
      "options": [
        "The block represents a real algorithmic step, but the game need not implement its internal gate decomposition",
        "The block proves the website runs a full quantum computer",
        "The block is interchangeable with a Grover diffusion block",
        "The block guarantees a factor after every measurement"
      ],
      "correctIndex": 0,
      "explanation": "A prebuilt inverse-QFT block is an instructional abstraction; it should not be presented as a full simulator.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h04",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "visual_mcq",
      "prompt": "In the Fourier clock demonstration, set the period to 3, which does not divide 16. What happens at frequency 5?",
      "options": [
        "They cancel exactly",
        "They line up perfectly",
        "The hands nearly line up, giving a large but not perfect sum",
        "Only one hand moves"
      ],
      "correctIndex": 2,
      "explanation": "16/3 ≈ 5.33 is not a whole number, so no frequency aligns perfectly. Frequency 5 is close, so the arrows mostly add up.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161",
      "visual": {
        "kind": "shor-period-clocks",
        "instruction": "Use the Fourier clock demonstration: set the period to 3 and the frequency to 5."
      }
    },
    {
      "id": "shor-h05",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "A run gives y/16 = 5/16 ≈ 0.3125, while the true pattern is near k/3. Which classical method recovers r = 3?",
      "options": [
        "gcd(y, 16)",
        "Grover search",
        "Continued fractions, which find the best simple fraction near y/Q",
        "y mod 3"
      ],
      "correctIndex": 2,
      "explanation": "Continued fractions find that 1/3 is the closest fraction with a small denominator to 0.3125.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h06",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For N = 21 and a = 2, the period is r = 6. Which factors does gcd(2³ ± 1, 21) give?",
      "options": [
        "3 and 7",
        "1 and 21",
        "7 and 9",
        "2 and 11"
      ],
      "correctIndex": 0,
      "explanation": "2³ = 8. gcd(7, 21) = 7 and gcd(9, 21) = 3.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h07",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Why does a = 14 fail for N = 15?",
      "options": [
        "Its period is odd",
        "Its period is 2 and a^(r/2) = 14 ≡ −1 (mod 15), so both gcds are trivial",
        "14 shares a factor with 15",
        "Its period is 4"
      ],
      "correctIndex": 1,
      "explanation": "14² = 196 ≡ 1 (mod 15), so r = 2. Then gcd(13, 15) = 1 and gcd(15, 15) = 15, both trivial.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h08",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "You pick a = 6 for N = 15. What should you do first?",
      "options": [
        "Choose a new N",
        "Run period finding as usual",
        "Notice that gcd(6, 15) = 3 is already a factor, so no quantum step is needed",
        "Square a and try again"
      ],
      "correctIndex": 2,
      "explanation": "Always check gcd(a, N) first. If it is bigger than 1, you have a factor for free.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h09",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "In the full algorithm, how large is the counting register's number of outcomes Q compared with N?",
      "options": [
        "Q = √N",
        "Q = N",
        "Q = log N",
        "About N² (between N² and 2N²)"
      ],
      "correctIndex": 3,
      "explanation": "A Q of about N² makes the peaks sharp enough for continued fractions. This game uses Q = 16 for simplicity, because r = 4 divides 16 exactly.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h10",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Why is the QFT step efficient even though it transforms 2^n amplitudes?",
      "options": [
        "It reads out every amplitude",
        "It needs only about n² gates on n qubits",
        "It uses 2^n gates that all run at once",
        "It is a single gate"
      ],
      "correctIndex": 1,
      "explanation": "The QFT factors into about n(n+1)/2 Hadamard and controlled-phase gates, which is polynomial in n.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h11",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For N = 35 and a = 2 the period is 12. Which factors does gcd(2⁶ ± 1, 35) give?",
      "options": [
        "7 and 9",
        "1 and 35",
        "5 and 7",
        "3 and 13"
      ],
      "correctIndex": 2,
      "explanation": "2⁶ = 64: gcd(63, 35) = 7 and gcd(65, 35) = 5.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h12",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "The QFT on Q = 4 sends |1⟩ to (1/2)(|0⟩ + i|1⟩ − |2⟩ − i|3⟩). Where does it send |2⟩?",
      "options": [
        "(1/2)(|0⟩ − |1⟩ + |2⟩ − |3⟩)",
        "|2⟩",
        "(1/2)(|0⟩ − i|1⟩ − |2⟩ + i|3⟩)",
        "(1/2)(|0⟩ + |1⟩ + |2⟩ + |3⟩)"
      ],
      "correctIndex": 0,
      "explanation": "For x = 2 the phases are ω^(2y) = (−1)^y.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h13",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "How does using the inverse QFT instead of the QFT change the measurement probabilities in period finding?",
      "options": [
        "It shifts every peak by 1",
        "It removes the peaks",
        "Not at all: only the phases are reversed",
        "It doubles the period"
      ],
      "correctIndex": 2,
      "explanation": "Reversing every phase leaves the size of each sum of arrows the same.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h14",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "visual_mcq",
      "prompt": "In the Fourier clock demonstration with period 3, which frequencies other than 0 give the largest probability?",
      "options": [
        "6 and 10",
        "8 only",
        "1 and 15",
        "5 and 11, tied"
      ],
      "correctIndex": 3,
      "explanation": "16/3 ≈ 5.33 and 32/3 ≈ 10.67, so 5 and 11 are closest, each about 22.7%.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161",
      "visual": {
        "kind": "shor-period-clocks",
        "instruction": "Use the Fourier clock demonstration: set the period to 3 and compare the bars."
      }
    },
    {
      "id": "shor-h15",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "One run gives denominator 2 and another gives denominator 4 (N = 15, a = 2). Which period should you take?",
      "options": [
        "2",
        "4",
        "8",
        "6"
      ],
      "correctIndex": 1,
      "explanation": "Take the least common multiple of the denominators, as the lecture notes describe.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h16",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "In the lecture notes' example, what fraction do continued fractions find for 0.25001?",
      "options": [
        "25001/100000",
        "1/4",
        "1/3",
        "2/7"
      ],
      "correctIndex": 1,
      "explanation": "Truncating the expansion once the leftover is tiny gives 1/4.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h17",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "Why didn't extending Shor's method to graph isomorphism give a big quantum speedup?",
      "options": [
        "It needs no quantum steps",
        "Grover already solved it",
        "It needs non-abelian groups, where the method has largely failed, and a 2016 classical algorithm is already quasipolynomial",
        "Graph isomorphism is NP-complete"
      ],
      "correctIndex": 2,
      "explanation": "The lecture notes describe both reasons.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h18",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "About how many decimal digits does a 2048-bit RSA key have?",
      "options": [
        "617",
        "1,000",
        "300",
        "2048"
      ],
      "correctIndex": 0,
      "explanation": "2048 × log₁₀(2) ≈ 616.5.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h19",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "How does the best known classical factoring method, the number field sieve, scale with the number of digits n?",
      "options": [
        "Like n²",
        "Almost exponentially: about 2 to the cube root of n, ignoring smaller factors",
        "Linearly",
        "Like n³"
      ],
      "correctIndex": 1,
      "explanation": "Shor's algorithm instead scales polynomially, roughly like n³.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    },
    {
      "id": "shor-h20",
      "algorithm": "shor",
      "difficulty": "hard",
      "type": "mcq",
      "prompt": "For N = 15 and a = 7 (period 4), which factors result?",
      "options": [
        "1 and 15",
        "7 and 15",
        "3 and 5",
        "2 and 7"
      ],
      "correctIndex": 2,
      "explanation": "7² mod 15 = 4, so gcd(3, 15) = 3 and gcd(5, 15) = 5.",
      "source": "Lectures 19–21, printed pp. 151–172; Figure 20.1 p. 161"
    }
  ]
};
