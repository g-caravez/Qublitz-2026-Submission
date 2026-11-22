# Experimental Results – Quantum Circuit Golf

## 1. Overview

This document presents the test cases, optimization results, weighted-cost comparisons, and limitations of the quantum circuit optimizer developed for the Qublitz 2026 Quantum Circuit Golf Challenge.

The optimizer uses rule-based transformations to reduce circuit complexity while preserving the circuit's unitary operation.

## 2. Test Cases

The following test cases are designed to evaluate the optimizer's ability to identify valid simplifications and avoid invalid transformations.

| Test | Description | Expected Behavior |
|---|---|---|
| 1 | Empty circuit | Remains unchanged |
| 2 | H followed by H | Both gates removed |
| 3 | S followed by SDG | Both gates removed |
| 4 | T followed by TDG | Both gates removed |
| 5 | Two identical CX gates | Both gates removed |
| 6 | CX, Z(control), CX | CX gates removed |
| 7 | CX, X(target), CX | CX gates removed |
| 8 | CX, H(unrelated qubit), CX | CX gates removed |
| 9 | CX, H(control), CX | No cancellation |
| 10 | CX, Z(target), CX | No cancellation |

These tests evaluate both successful optimization transformations and cases where gates cannot safely be simplified.

## 3. Weighted Cost Evaluation

The optimizer is evaluated using the weighted cost function:

\[
C(Q)=w_1N_{1q}+w_2N_{2q}+w_dD
\]

The following example is taken from the challenge's technical instructions.

### Example: Nonadjacent CNOT Cancellation

**Original circuit:**

```python
[
    ("CX", 0, 1),
    ("Z", 0),
    ("CX", 0, 1)
]
```

**Optimized circuit:**

```python
[
    ("Z", 0)
]
```

The Z gate acts on the control qubit and therefore commutes with the CNOT operation.

Using the example configuration:

```python
config = {
    "w1": 1.0,
    "w2": 6.0,
    "wd": 0.2
}
```

| Metric | Original | Optimized |
|---|---:|---:|
| Single-qubit gates | 1 | 1 |
| Two-qubit gates | 2 | 0 |
| Circuit depth | 3 | 1 |
| Weighted cost | 13.6 | 1.2 |

The weighted cost decreases by approximately 91.18%.

This demonstrates how nonadjacent CNOT cancellation can substantially reduce circuit cost.

## 4. Testing Across Different Configurations

The optimizer is tested using multiple weight configurations to evaluate its behavior under different resource priorities.

| Configuration | w1 | w2 | wd | Main Priority |
|---|---:|---:|---:|---|
| 1 | 1.0 | 6.0 | 0.2 | Two-qubit gate reduction |
| 2 | 6.0 | 1.0 | 0.2 | Single-qubit gate reduction |
| 3 | 1.0 | 1.0 | 5.0 | Circuit depth reduction |

All three configurations should be evaluated using the automated test suite.

## 5. Unitary Equivalence

An essential requirement is that the optimized circuit implements the same unitary operation as the original circuit, up to global phase.

\[
U_{\text{optimized}}=e^{i\phi}U_{\text{original}}
\]

The challenge-provided NumPy verification utilities are intended to check this condition.

| Test | Equivalence Result |
|---|---|
| Adjacent inverse-gate cancellation | Pending verification |
| Identical CNOT cancellation | Pending verification |
| Control Z commutation | Pending verification |
| Target X commutation | Pending verification |
| Unrelated-qubit commutation | Pending verification |

These results should be updated after running the provided unitary-equivalence checker.

## 6. Limitations

The current optimizer uses a limited collection of rule-based transformations.

Its limitations include:

- It does not identify every possible gate commutation relationship.
- It does not perform general quantum circuit resynthesis.
- It does not recognize every identity involving sequences of different quantum gates.
- It does not guarantee a globally minimum weighted circuit cost.

The optimizer focuses on local simplifications and selected nonadjacent CNOT cancellations.

## 7. Conclusion

The current implementation demonstrates how basic quantum circuit identities and commutation relationships can be used to reduce circuit complexity.

The iterative optimization approach allows multiple simplifications to be applied until no additional supported transformations are available.

Future improvements could include additional gate identities, more general commutation rules, and more advanced optimization techniques that consider tradeoffs between gate count and circuit depth.

