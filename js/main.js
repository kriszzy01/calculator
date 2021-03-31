const input = document.querySelector("input");
const numberKeys = document.querySelectorAll(".num__key");
const operationKeys = document.querySelectorAll(".op__key");

let history = [];

function handleEvaluate(operationName, currentValue) {
  if (!history.length && operationName !== "evaluate") {
    history.push(currentValue);
    history.push(operationName);
    input.value = "";
  } else {
    history.push(currentValue);

    const result = () => {
      const secondOperand = history.pop();
      const operation = history.pop();
      const firstOperand = history.pop();

      switch (operation) {
        case "add":
          return firstOperand + secondOperand;
        case "subtract":
          return firstOperand - secondOperand;
        case "multiply":
          return firstOperand * secondOperand;
        case "divide":
          return firstOperand / secondOperand;
        default:
          break;
      }
    };

    if (operationName === "evaluate") {
      input.value = result();
      return;
    }

    history.push(result());
    history.push(operationName);
    input.value = "";
  }
}

function handleNumberKeys() {
  numberKeys.forEach(
    (key) =>
      (key.onclick = ({ target }) => {
        input.value =
          input.value !== "0"
            ? (input.value = input.value + target.innerText)
            : target.innerText;
      })
  );
}

function handleOperationKeys() {
  operationKeys.forEach(
    (key) =>
      (key.onclick = ({ target }) => {
        let currentValue = parseFloat(input.value);
        let operation = target.dataset.op;

        if (operation === "clear") {
          input.value = 0;
          history.length = 0;
        } else if (operation === "percent") {
          currentValue *= 0.01;
          input.value = currentValue;
        } else if (operation === "negate") {
          input.value = -currentValue;
        } else {
          handleEvaluate(operation, currentValue);
        }
      })
  );
}

handleNumberKeys();
handleOperationKeys();
