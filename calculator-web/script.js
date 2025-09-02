const display = document.getElementById("display");
const keys = document.querySelector(".keys");

let current = "";   // what's shown (string)
let lastResult = null;
let justEvaluated = false;

keys.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const digit = btn.textContent;
  const op = btn.dataset.op;
  const action = btn.dataset.action;

  if (action === "clear") {
    current = "";
    lastResult = null;
    justEvaluated = false;
    render();
    return;
  }

  if (action === "delete") {
    if (justEvaluated) {
      // If the last thing was a result, DEL clears it
      current = "";
      justEvaluated = false;
    } else {
      current = current.slice(0, -1);
    }
    render();
    return;
  }

  if (action === "equals") {
    evaluate();
    return;
  }

  if (op) {
    appendOperator(op);
    return;
  }

  // digits and dot
  appendDigit(digit);
});

function appendDigit(d) {
  if (justEvaluated) {
    // start fresh after equals if a digit comes
    current = "";
    justEvaluated = false;
  }
  if (d === ".") {
    // prevent multiple dots in the current number segment
    const lastNumber = current.split(/[\+\-\*\/]/).pop();
    if (lastNumber.includes(".")) return;
  }
  current += d;
  render();
}

function appendOperator(o) {
  justEvaluated = false;
  if (current === "" && (o === "+" || o === "-" )) {
    // allow leading +/-
    current = o;
    render();
    return;
  }
  if (current === "") return;

  // Replace last operator if user presses another operator
  if (/[\+\-\*\/]$/.test(current)) {
    current = current.slice(0, -1) + o;
  } else {
    current += o;
  }
  render();
}

function evaluate() {
  if (!current) return;
  // Avoid trailing operator
  if (/[\+\-\*\/]$/.test(current)) current = current.slice(0, -1);

  try {
    // Safely evaluate with Function (avoids eval)
    // Only numbers, + - * / . and spaces are allowed
    if (!/^[0-9\.\+\-\*\/\s]+$/.test(current)) throw new Error("Invalid input");
    const result = Function(`"use strict"; return (${current})`)();
    if (!isFinite(result)) throw new Error("Math error");
    lastResult = result;
    current = String(result);
    justEvaluated = true;
    render();
  } catch (err) {
    current = "Error";
    justEvaluated = true;
    render();
  }
}

function render() {
  display.value = current || "0";
}
