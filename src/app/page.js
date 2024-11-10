"use client";

import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [number3, setNumber3] = useState("");
  const [solutionFound, setSolutionFound] = useState(false);
  const [steps, setSteps] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
      const x = parseInt(number1);
      const y = parseInt(number2);
      const z = parseInt(number3);

    if (x <= 0 || y <= 0 || z <= 0 || z > Math.max(x, y)) {
      alert(
        "Error: ingresá valores mayores a 0 y el valor de z, debe ser mayor al de x e y."
      );
      return;
    }

    const solutionSteps = bestSolution(x, y, z);
    setSteps(solutionSteps);
    setSolutionFound(true);
  };

  const bestSolution = (x, y, z) => {
    const steps = [];
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

    if (z % gcd(x, y) !== 0 || z > Math.max(x, y)) {
      console.log({ acction: "No hay solución" });
      return steps;
    }
      const solution1 = findSolution(x, y, z, "X");
      const solution2 = findSolution(x, y, z, "Y");

      return solution1.length <= solution2.length ? solution1 : solution2;
  }
  const findSolution = (x, y, z, firstTry) => {
  const steps = [];
  let jarraX = 0;
  let jarraY = 0;

    while (jarraX !== z && jarraY !== z) {
      if (firstTry === "X") {
        if (jarraX === 0) {
          jarraX = x;
          steps.push({ jarraX, jarraY, action: "Llenar jarra X" });
        } else if (jarraY === y) {
          jarraY = 0;
          steps.push({ jarraX, jarraY, action: "Vaciar jarra Y" });
        } else {
          const transfer = Math.min(jarraX, y - jarraY);
          jarraX -= transfer;
          jarraY += transfer;
          steps.push({ jarraX, jarraY, action: "Transferir de X a Y" });
        }
      } else {
        if (jarraY === 0) {
          jarraY = y;
          steps.push({ jarraX, jarraY, action: "Llenar jarra Y" });
        } else if (jarraX === x) {
          jarraX = 0;
          steps.push({ jarraX, jarraY, action: "Vaciar jarra X" });
        } else {
          const transfer = Math.min(jarraY, x - jarraX);
          jarraY -= transfer;
          jarraX += transfer;
          steps.push({ jarraX, jarraY, action: "Transferir de Y a X" });
        }
      }

      if (jarraX === z || jarraY === z) {
        break;
      }
    }
  return steps;
  };
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit}>
        <label>Número 1:</label>
        <input
          type="number"
          placeholder="Ingrese el primer número"
          min="1"
          value={number1}
          onChange={(e) => setNumber1(e.target.value)}
          required
        />
        <label>Número 2:</label>
        <input
          type="number"
          placeholder="Ingrese el segundo número"
          min="1"
          value={number2}
          onChange={(e) => setNumber2(e.target.value)}
          required
        />
        <label>Número 3:</label>
        <input
          type="number"
          placeholder="Ingrese el tercer número"
          min="1"
          value={number3}
          onChange={(e) => setNumber3(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </form>
      {solutionFound && (
        <div>
          <h3>Solucion por pasos</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Pasos
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Jarra X
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Jarra Y
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Accion
                </th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {index + 1}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {step.jarrax}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {step.jarray}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {step.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

