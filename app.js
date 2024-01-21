const buttons = document.querySelectorAll(".common");
const input = document.getElementById("input");
const AC = document.getElementById("AC");
let currentExpression = "";

function evaluateExpression(expression) {
  try {
    if (expression.includes("x")) {
      expression = expression.replace("x", "*");
    }
    const evalResult = eval(expression);

    if (isFinite(evalResult)) {
      let resultString = evalResult.toString();

      if (resultString.length > 15) {
        resultString = resultString.slice(0, 15);
      }

      return resultString;
    } else {
      return "Infinity";
    }
  } catch (error) {
    console.error("Error:", error.message);
    return "Error";
  }
}

function updateDisplay(value) {
  input.innerHTML = value;
}

function handleButtonClick(value) {
  const lastChar = currentExpression[currentExpression.length - 1];

  if (/[\d.]/.test(value)) {
    currentExpression += value;
    updateDisplay(currentExpression);
    AC.innerHTML = "C";
  } else if (value === "C") {
    currentExpression = "";
    updateDisplay("0");
    AC.innerHTML = "AC";
  } else if (value === "=") {
    if (["+", "-", "x", "/", "%"].includes(lastChar)) {
      currentExpression = currentExpression.slice(0, -1);
    }
    currentExpression = evaluateExpression(currentExpression);
    updateDisplay(currentExpression);
  } else if (value === "+/-") {
    if (!/[\d.]/.test(lastChar)) {
      currentExpression += "-";
      updateDisplay(currentExpression);
    }
  } else if (["+", "-", "x", "/", "%"].includes(value)) {
    if (["+", "-", "x", "/", "%"].includes(lastChar)) {
      currentExpression = currentExpression.slice(0, -1) + value;
    } else {
      currentExpression += value;
    }
  }
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    handleButtonClick("=");
  } else if (e.key === "Backspace") {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay(currentExpression || "0");
  } else if (/\d|\+|\-|\*|\//.test(e.key)) {
    handleButtonClick(e.key);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    handleButtonClick(e.target.innerText.trim());
  });
});

document.addEventListener("keydown", handleKeyPress);


