"""Convert the seed-question JSON into data/questions.js (loadable from file://),
apply reviewed fixes, and switch |0> style kets to |0⟩ for display."""
import json, re, sys

src, out = sys.argv[1], sys.argv[2]
data = json.load(open(src, encoding="utf-8"))
qs = data["questions"]

def by_id(qid):
    for arr in qs.values():
        for q in arr:
            if q["id"] == qid:
                return q
    raise KeyError(qid)

# ---- Level 1 fixes (reviewed) ----
q = by_id("deutsch-e01")
q["explanation"] = "Constant means f(0) = f(1). That can be both 0 or both 1, so \"always returns 0\" is only one of the two constant functions."
q = by_id("deutsch-e02")
q["options"][3] = "Randomly sets the qubit to |0> or |1>, like a coin flip"
q["explanation"] = ("H|0> = (|0>+|1>)/sqrt(2): equal amplitudes, so 0 and 1 are each measured with probability 1/2. "
                    "It is not a coin that has secretly already landed: a second H turns this state back into |0> every time, which a random coin flip could never do.")
q["visual"]["instruction"] = "Use the Qubit Lab: turn on only the first H stage and read the amplitudes and probabilities."
q = by_id("deutsch-e03")
q["explanation"] = "Deutsch's algorithm queries the oracle once. A classical computer has to ask for both f(0) and f(1) to be certain."
q = by_id("deutsch-m03")
q["options"][2] = "To create the superposition the oracle needs"
q["explanation"] = ("The oracle leaves its answer in the relative sign between |0> and |1>. The final H converts that sign into a definite 0 or 1. "
                    "Creating the superposition is the job of the first H, not the last one.")
q = by_id("deutsch-h01")
q["explanation"] = "Only the |1> part gets a minus sign, because f(1)=1 and f(0)=0: (|0>+|1>)/sqrt(2) becomes (|0>\u2212|1>)/sqrt(2), which is |->."
q = by_id("deutsch-h02")
q["options"][3] = "0 in this run, but repeated runs are needed to be sure"
q["explanation"] = ("f(0)=f(1)=1, so the oracle puts a minus sign on both parts. An overall sign is a global phase and changes no probability, "
                    "so the final H gives |0> exactly. The ideal circuit is deterministic: no repeated runs are needed.")

# ---- Clear fixes in later levels (rest is flagged in the review) ----
q = by_id("simon-e02")
q["prompt"] = "Why does Simon's algorithm usually need several quantum samples?"
q = by_id("simon-m01")
q["prompt"] = ("A Simon oracle gives f(001)=f(111). Under Simon's promise (f(x)=f(y) only when y=x or y=x XOR s), "
               "what mask is indicated by this collision?")

# ---- Merge the 120 new questions (10 easy / 10 medium / 10 hard per level) ----
import random, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import new_questions as NQ
import new_questions_b2 as NQ2
VIS = {"qubit-lab": "deutsch-hadamard-toggle"}
rnd = random.Random(2026)
for alg in NQ.Q:
    items = NQ.Q[alg] + NQ2.Q.get(alg, [])
    for (suf, diff, prompt, opts, expl, vis, instr) in items:
        assert len(opts) == 4 and len(set(opts)) == 4, suf
        order = list(range(4)); rnd.shuffle(order)
        q = {"id": f"{alg}-{suf}", "algorithm": alg, "difficulty": diff,
             "type": "visual_mcq" if vis else "mcq", "prompt": prompt,
             "options": [opts[i] for i in order], "correctIndex": order.index(0),
             "explanation": expl, "source": NQ.SRC[alg]}
        if vis:
            q["visual"] = {"kind": VIS.get(vis, vis), "instruction": instr}
        qs[alg].append(q)
    order_key = {"easy": 0, "medium": 1, "hard": 2}
    qs[alg].sort(key=lambda q: (order_key[q["difficulty"]], q["id"]))

KET = re.compile(r"\|([^|<>\n]{1,16}?)>")
SQRT = re.compile(r"sqrt\(([^()]+)\)")
LAB = re.compile(r"\b(Qubit|clock|Grover|truth-table|parity|XOR-pairs) [Ll]ab\b")
def pretty(s):
    s = LAB.sub(lambda m: ("Fourier clock" if m.group(1) == "clock" else m.group(1)) + " demonstration", s)
    s = s.replace("does the lab show", "does the demonstration show").replace("The lab shows", "The demonstration shows")
    s = KET.sub(lambda m: "|" + m.group(1).replace("-", "−") + "⟩", s)
    s = SQRT.sub(lambda m: "√" + m.group(1), s)
    return s
def walk(x):
    if isinstance(x, str): return pretty(x)
    if isinstance(x, list): return [walk(v) for v in x]
    if isinstance(x, dict): return {k: (walk(v) if k not in ("id", "algorithm", "difficulty", "type", "kind") else v) for k, v in x.items()}
    return x
qs = walk(qs)

header = """/* Qubit in Order question bank.
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
"""
with open(out, "w", encoding="utf-8") as f:
    f.write(header)
    f.write("window.QQ_QUESTIONS = ")
    json.dump(qs, f, ensure_ascii=False, indent=2)
    f.write(";\n")
print("wrote", out)
