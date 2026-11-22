
# Check whether two neighboring gates cancel each other
def are_inverses(gate1, gate2):

    name1 = gate1["gate"]
    name2 = gate2["gate"]

    qubits1 = gate1["qubits"]
    qubits2 = gate2["qubits"]

    # CNOT applied twice equals identity
    if name1 == "CX" and name2 == "CX":
        return qubits1 == qubits2

    # Same self-inverse gate applied twice equals identity
    if name1 == name2 and name1 in ["H", "X", "Z"]:
        return qubits1 == qubits2

    # S and SDG are inverses
    if name1 == "S" and name2 == "SDG":
        return qubits1 == qubits2

    if name1 == "SDG" and name2 == "S":
        return qubits1 == qubits2

    # T and TDG are inverses
    if name1 == "T" and name2 == "TDG":
        return qubits1 == qubits2

    if name1 == "TDG" and name2 == "T":
        return qubits1 == qubits2

    return False


# Check whether a single-qubit gate commutes with a CNOT
def commutes_with_cx(gate, control, target):

    gate_name = gate["gate"]
    qubits = gate["qubits"]

    # Only considering single-qubit gates
    if len(qubits) == 1:

        qubit = qubits[0]

        # Gates on unrelated qubits commute
        if qubit != control and qubit != target:
            return True

        # Diagonal gates on the control commute with CNOT
        if qubit == control and gate_name in ["Z", "S", "SDG", "T", "TDG"]:
            return True

        # X on the target commutes with CNOT
        if qubit == target and gate_name == "X":
            return True

    return False

# Calculate circuit depth
def circuit_depth(gates):

    last_layer = {}
    depth = 0

    for gate in gates:

        qubits = gate["qubits"]

        layer = 1 + max(
            (last_layer.get(q, 0) for q in qubits),
            default=0
        )

        for q in qubits:
            last_layer[q] = layer

        depth = max(depth, layer)

    return depth


# Calculate weighted circuit cost
def weighted_cost(gates, config):

    n1 = sum(g["gate"] != "CX" for g in gates)
    n2 = sum(g["gate"] == "CX" for g in gates)

    depth = circuit_depth(gates)

    return (
        config["w1"] * n1
        + config["w2"] * n2
        + config["wd"] * depth
    )


# Level 2 optimizer
def optimize(circuit, config):

    # Create a new circuit without modifying the original
    optimized = {
        "n_qubits": circuit["n_qubits"],
        "gates": [dict(gate=g["gate"], qubits=g["qubits"].copy())
                  for g in circuit["gates"]]
    }

    gates = optimized["gates"]

    changed = True

    # Keep optimizing until no more changes can be made
    while changed:

        changed = False

        # Look for two matching CNOT gates
        for i in range(len(gates)):

            if gates[i]["gate"] != "CX":
                continue

            control = gates[i]["qubits"][0]
            target = gates[i]["qubits"][1]

            # Search for another matching CNOT
            for j in range(i + 1, len(gates)):

                # Found the same CNOT
                if gates[j] == gates[i]:

                    # Remove the two CNOT gates
                    del gates[j]
                    del gates[i]

                    changed = True
                    break

                # Check whether the intervening gate commutes
                if not commutes_with_cx(gates[j], control, target):
                    break

            if changed:
                break

        # If no CNOT simplification happened,
        # look for ordinary adjacent cancellations
        if not changed:

            for i in range(len(gates) - 1):

                if are_inverses(gates[i], gates[i + 1]):

                    del gates[i + 1]
                    del gates[i]

                    changed = True
                    break

    return optimized

