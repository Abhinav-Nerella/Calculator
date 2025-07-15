let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('.buttons button');
let historyList = document.getElementById("historyList");
let string = "";

// Add event listeners to all calculator buttons
buttons.forEach(function (button) {
  button.addEventListener('click', function (e) {
    let value = e.target.innerText;

    if (value === 'AC') {
      string = "";
      input.value = "";
      return;
    }

    if (value === 'DEL') {
      string = string.slice(0, -1);
      input.value = string || "0";
      return;
    }

    if (value === 'x') value = '*';

    if (value === '=') {
      if (string === "") {
        input.value = "0";
        return;
      }

      try {
        const expression = string;
        const result = Function(`return ${expression}`)();
        addToHistory(string, result);
        string = result.toString();
        input.value = string;
      } catch (error) {
        input.value = "Error";
        string = "";
      }
      return;
    }

    let lastChar = string.slice(-1);
    if (['+', '-', '*', '/', '%'].includes(value) &&
        ['+', '-', '*', '/', '%'].includes(lastChar)) {
      return; // prevent two operators in a row
    }

    if (value === '.' && lastChar === '.') return;

    if (input.value === "0" && !isNaN(value)) {
      string = value;
    } else {
      string += value;
    }

    input.value = string;
  });
});

// Add expression and result to history
function addToHistory(expression, result) {
  let item = document.createElement("li");
  item.textContent = expression + " = " + result;
  historyList.appendChild(item);
}

// Keyboard support
document.addEventListener("keydown", function (e) {
  const allowed = "0123456789+-*/.%";
  if (allowed.includes(e.key)) {
    string += e.key;
    input.value = string;
  } else if (e.key === "Enter") {
    try {
      const result = Function(`return ${string}`)();
      addToHistory(string, result);
      string = result.toString();
      input.value = string;
    } catch (error) {
      input.value = "Error";
      string = "";
    }
  } else if (e.key === "Backspace") {
    string = string.slice(0, -1);
    input.value = string || "0";
  }
});

// Copy result with fallback
document.getElementById("copyBtn").addEventListener("click", function () {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(input.value).then(function () {
      alert("Copied to clipboard!");
    }).catch(function () {
      fallbackCopy(input.value);
    });
  } else {
    fallbackCopy(input.value);
  }
});

function fallbackCopy(text) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Copied to clipboard!");
}

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", function () {
  document.body.classList.toggle("light-mode");
});
