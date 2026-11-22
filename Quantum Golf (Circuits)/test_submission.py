
from copy import deepcopy

from submission import optimize, weighted_cost


configurations = [
    {"w1": 1.0, "w2": 6.0, "wd": 0.2},
    {"w1": 6.0, "w2": 1.0, "wd": 0.2},
    {"w1": 1.0, "w2": 1.0, "wd": 5.0}
]


tests = [

    # Empty circuit
    ("Empty circuit",
     {"n_qubits": 1, "gates": []},
     []),

    # Adjacent H cancellation
    ("H cancellation",
     {"n_qubits": 1, "gates": [
         {"gate": "H", "qubits": [0]},
         {"gate": "H", "qubits": [0]}
     ]},
     []),

    # S and SDG cancellation
    ("S cancellation",
     {"n_qubits": 1, "gates": [
         {"gate": "S", "qubits": [0]},
         {"gate": "SDG", "qubits": [0]}
     ]},
     []),

    # T and TDG cancellation
    ("T cancellation",
     {"n_qubits": 1, "gates": [
         {"gate": "T", "qubits": [0]},
         {"gate": "TDG", "qubits": [0]}
     ]},
     []),

    # Adjacent CX cancellation
    ("CX cancellation",
     {"n_qubits": 2, "gates": [
         {"gate": "CX", "qubits": [0, 1]},
         {"gate": "CX", "qubits": [0, 1]}
     ]},
     []),

    # Z on control commutes with CX
    ("Control Z commutation",
     {"n_qubits": 2, "gates": [
         {"gate": "CX", "qubits": [0, 1]},
         {"gate": "Z", "qubits": [0]},
         {"gate": "CX", "qubits": [0, 1]}
     ]},
     [{"gate": "Z", "qubits": [0]}]),

    # X on target commutes with CX
    ("Target X commutation",
     {"n_qubits": 2, "gates": [
         {"gate": "CX", "qubits": [0, 1]},
         {"gate": "X", "qubits": [1]},
         {"gate": "CX", "qubits": [0, 1]}
     ]},
     [{"gate": "X", "qubits": [1]}]),

    # H on unrelated qubit commutes with CX
    ("Unrelated qubit commutation",
     {"n_qubits": 3, "gates": [
         {"gate": "CX", "qubits": [0, 1]},
         {"gate": "H", "qubits": [2]},
         {"gate": "CX", "qubits": [0, 1]}
     ]},
     [{"gate": "H", "qubits": [2]}]),

    # H on control does NOT commute with CX
    ("Control H does not commute",
     {"n_qubits": 2, "gates": [
         {"gate": "CX", "qubits": [0, 1]},
         {"gate": "H", "qubits": [0]},
         {"gate": "CX", "qubits": [0, 1]}
     ]},
     [
         {"gate": "CX", "qubits": [0, 1]},
         {"gate": "H", "qubits": [0]},
         {"gate": "CX", "qubits": [0, 1]}
     ]),

    # Z on target does NOT commute with CX
    ("Target Z does not commute",
     {"n_qubits": 2, "gates": [
         {"gate": "CX", "qubits": [0, 1]},
         {"gate": "Z", "qubits": [1]},
         {"gate": "CX", "qubits": [0, 1]}
     ]},
     [
         {"gate": "CX", "qubits": [0, 1]},
         {"gate": "Z", "qubits": [1]},
         {"gate": "CX", "qubits": [0, 1]}
     ])
]


# Run all tests
for name, circuit, expected_gates in tests:

    original = deepcopy(circuit)

    for config in configurations:

        original_config = deepcopy(config)

        result = optimize(circuit, config)

        # Check expected output
        assert result["gates"] == expected_gates, name

        # Check that input was not modified
        assert circuit == original, name

        # Check that config was not modified
        assert config == original_config, name

        # Check weighted cost did not increase
        before = weighted_cost(circuit["gates"], config)
        after = weighted_cost(result["gates"], config)

        assert after <= before + 1e-12, name

    print("PASSED:", name)

print("\nAll tests passed!")
