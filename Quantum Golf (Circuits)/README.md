# Quantum Circuit Golf – Qublitz 2026

## Project Overview

This project implements a quantum circuit optimizer for the Qublitz 2026 Quantum Circuit Golf Challenge.

The goal is to optimize quantum circuits by reducing their resource cost while preserving their unitary operation. The optimizer focuses on simplifying gate sequences, eliminating redundant operations, and reducing circuit depth.

The optimization objective is:

\[
C(Q) = w_1N_{1q} + w_2N_{2q} + w_dD
\]

where:

- \(N_{1q}\) is the number of single-qubit gates.
- \(N_{2q}\) is the number of two-qubit gates (CX).
- \(D\) is the logical circuit depth.
- \(w_1,w_2,w_d\) are configurable resource weights.

## Optimization Techniques

The current implementation uses the following optimization techniques:

### 1. Adjacent Gate Cancellation

The optimizer identifies and removes neighboring inverse gates.

Examples include:

- H followed by H.
- X followed by X.
- Z followed by Z.
- S followed by SDG.
- SDG followed by S.
- T followed by TDG.
- TDG followed by T.

### 2. CNOT Cancellation

Two identical CNOT gates cancel because applying the same CNOT operation twice produces the identity operation.

\[
CX_{a,b}CX_{a,b}=I
\]

### 3. CNOT Commutation

The optimizer can identify certain gates that commute with a CNOT operation.

This allows it to cancel two identical CNOT gates even when they are separated by another gate.

Currently supported cases include:

- Z, S, SDG, T, and TDG on the control qubit.
- X on the target qubit.
- Single-qubit gates acting on unrelated qubits.

### 4. Iterative Optimization

The optimizer repeatedly searches for simplifications until no further supported transformations can be made.

This allows multiple optimization opportunities to be discovered within the same circuit.

## Project Structure

```text
quantum-circuit-golf/
│
├── submission.py
├── test_submission.py
├── requirements.txt
├── README.md
└── RESULTS.md
```

## Installation

Python 3 and NumPy are required.

Clone the repository:

```bash
git clone https://github.com/g-caravez/Qublitz-2026-Submission
cd quantum-circuit-golf
```

Install dependencies:

```bash
python3 -m pip install -r requirements.txt
```

## Running the Optimizer

Run the submission file:

```bash
python3 submission.py
```

The optimizer can also be imported into another Python file:

```python
from submission import optimize

result = optimize(circuit, config)
```

The optimizer accepts a circuit dictionary and a configuration dictionary and returns a new optimized circuit dictionary.

## Running Tests

Run the test suite using:

```bash
python3 test_submission.py
```

The test suite checks:

- Adjacent inverse-gate cancellation.
- Identical CNOT cancellation.
- CNOT commutation relationships.
- Cases where CNOT cancellation is not valid.
- Preservation of the original input circuit.
- Weighted circuit cost under different configurations.

Unitary equivalence should also be verified using the numerical verification utilities provided with the challenge.

## Limitations

The current optimizer uses a rule-based approach and does not guarantee a globally optimal quantum circuit.

It currently focuses on local gate cancellation and selected CNOT commutation relationships.

It does not yet implement general circuit resynthesis or recognize every possible quantum gate identity.

## Results

Experimental results, test cases, weighted-cost comparisons, and known limitations are documented in [RESULTS.md](RESULTS.md).

## Challenge

Qublitz 2026 – Quantum Circuit Golf

