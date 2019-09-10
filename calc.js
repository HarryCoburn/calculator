// Calculator state object

calcObject = {
    displayVal: "0",
    firstNum: null,
    secondNum: null,    
    lastButton: "",
}

// Event handlers

function addDigitButtons() {
    for (let i = 0; i < 10; i++) {
        let btn = document.getElementById(String(i));
        btn.addEventListener("click", function () { displayNum(i) });
    }
}

function addOperatorButtons() {
    let operators = ["+", "-", "*", "/", "=", "AC"];
    operators.forEach(op => {
        let btn = document.getElementById(op);
        if (op !== "=" && op !== "AC") {
            btn.addEventListener("click", function () { setOperator(btn.id) });
        }
        if (op === "=") {
            btn.addEventListener("click", completeCalc);
        }
        if (op === "AC") {
            btn.addEventListener("click", clearCalc);
        }
    })
}

// Calculation functions

function operate(op, x, y) {
    switch (op) {
        case "+":
            return add(x, y);
            break;
        case "-":
            return subtract(x, y);
            break;
        case "*":
            return multiply(x, y);
            break;
        case "/":
            return divide(x, y);
            break;
        default:
            return "Bad operator sent to operate()!"
    }
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y
}

function divide(x, y) {
    if (y === 0) {
        return "ERROR"
    }
    return x / y;
}

// Display logic

function displayNum(num) {
    let display = document.querySelector("div .display");
    let operators = ["+", "-", "*", "/", "=", "AC"];
    // Clear display if an operator has been set    
    if (operators.includes(calcObject.lastButton)) {
        console.log("Got here")
        display.textContent = "";
        calcObject.displayVal = "";
    }
    if (calcObject.displayVal.length < 10) {
        if (calcObject.displayVal === "0") {
            calcObject.displayVal = String(num);
        } else {
            calcObject.displayVal = calcObject.displayVal + String(num);
        }
        display.textContent = calcObject.displayVal;
        calcObject.lastButton = String(num);
    }
    console.log(calcObject);
}

// Button logic

function setOperator(op) {
    let display = document.querySelector("div .display");
    let operators = ["+", "-", "*", "/", "=", "AC"];
    if (calcObject.firstNum === null) {
        calcObject.firstNum = Number(display.textContent)
        calcObject.lastButton = op;
    }
    else if (operators.includes(calcObject.lastButton) && operators.includes(op)) {
       calcObject.lastButton = op;
    }
    else {
        //calcObject.secondNum = Number(display.textContent);
        let answer;
        switch (op) {
            case "+":
                answer = add(calcObject.firstNum, calcObject.secondNum)
                break;
            case "-":
                answer = subtract(calcObject.firstNum, calcObject.secondNum)
                break;
            case "*":
                answer = multiply(calcObject.firstNum, calcObject.secondNum)
                break;
            case "/":
                answer = divide(calcObject.firstNum, calcObject.secondNum)
                break;
            default:
                break;
        }
        display.textContent = String(answer);
        calcObject.displayVal = String(answer);
        calcObject.firstNum = answer;        
        calcObject.lastButton = op;
    }

    console.log(calcObject);
}


function completeCalc() {
    console.log("Hit equals");
}

function clearCalc() {
    console.log("Hit AC")
}

function startCalc() {
    // Display the 0
    let display = document.querySelector("div .display");
    display.textContent = calcObject.displayVal

    addDigitButtons();
    addOperatorButtons();
}

startCalc();
