// Query selectors
const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[data-equals]");
const percentBtn = document.querySelector("[data-percent]");
const operandTextElement = document.querySelector("[data-operand]");

// Class
class Calculator {
  constructor(operandTextElement) {
    this.operandTextElement = operandTextElement;
    this.clear();
  }
  //   Methods Hapus Semua
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }
  // Methods delete
  delete() {
    if (this.currentOperand !== "") {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    } else if (this.previousOperand !== "") {
      this.currentOperand = this.previousOperand;
      this.previousOperand = "";
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  }
  // Methods klik angka
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  // Methods Operasi
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand + this.operation;
    this.currentOperand = "";
  }
  // Methods Percent
  percent() {
    let percent;
    const current = parseFloat(this.currentOperand);
    percent = current / 100;
    this.currentOperand = percent;
  }
  // Methods eksekusi operasi
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  //   Methods update tampilan outout
  updateDisplay() {
    this.operandTextElement.innerText =
      this.previousOperand + this.currentOperand;
  }
}

const calculator = new Calculator(operandTextElement);

// Event Listener
clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

percentBtn.addEventListener("click", () => {
  calculator.percent();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

// GSAP animation
const tl = gsap.timeline();

tl.from(".calculator-grid", {
  scale: 0,
  duration: 1,
}).from("button", {
  scale: 0,
  opacity: 0,
  duration: 1,
  ease: "power1",
  stagger: 0.2,
});
