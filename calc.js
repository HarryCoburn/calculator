function add(x,y) {
    return x + y;
}

function subtract(x,y) {
    return x - y;
}

function multiply(x,y) {
    return x * y
}

function divide(x,y) {
    if (y === 0) {
        return "ERROR"
    }
    return x / y;
}

function operate(op, x, y) {
    switch (op) {
        case "+":
            return add(x,y);
            break;
        case "-":
            return subtract(x,y);
            break;
        case "*":
            return multiply(x,y);
            break;
        case "/":
            return divide(x,y);
            break;
        default:
            return "Bad operator sent to operate()!"
    }   
}

function startCalc() {
    addDigitButtons();
    addOperatorButtons();
}

function addDigitButtons() {
    for (let i = 0; i < 10; i++) {
        let btn = document.getElementById(String(i));
        btn.addEventListener("click", function() {displayNum(i)});
    }
}

function addOperatorButtons() {
    let operators = ["+", "-", "*", "/","=","AC"];
    for (op in operators) {
        let btn = document.getElementById(op);
        if (op !== "=" && op !== "AC") {
            btn.addEventListener("click", function() {setOperator(btn.id)});
        }
        if (op === "=") {
            btn.addEventListener("click", completeCalc);
        }
        if (op === "AC") {
            btn.addEventListener("click", clearCalc);
        }
    }       
}

    

function displayNum(num) {
    let display = document.querySelector("div .display");
    // Clear display if an operator has been set
    if (calcObject.operator === true) {
        display.textContent = "";
        calcObject.displayVal = "";
        calcObject.operator = "";
    }
    if (calcObject.displayVal.length < 10) {        
        calcObject.displayVal = calcObject.displayVal + String(num);
        display.textContent = calcObject.displayVal
    }  
}

function setOperator(op) {    
    let display = document.querySelector("div .display");
    if (calcObject.firstNum === null) {
        if (display.textContent === true) {
            // Set first number and operator
            calcObject.firstNum = Number(display.textContent)
            calcObject.operator = op;
        } else {
            return // do nothing with operators if there's no numbers yet.
        }
    } else {
        calcObject.secondNum = Number(display.textContent);
        let answer;
        switch (op) {
            case "+":
                answer = add(calcObject.firstNum, calcObject.secondNum)
                break;
            default:
                break;
        }
        display.textContent = String(answer);
        calcObject.firstNum = answer;
        calcObject.secondNum = null;
        calcObject.operator = op;
    }
    console.log(calcObject);
}

calcObject = {
    displayVal: "",
    firstNum: null,
    secondNum: null,
    operator: ""
}

startCalc();
