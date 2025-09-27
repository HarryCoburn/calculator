// Constants
const calcObject = {
    displayVal: "0",
    firstNum: null,
    secondNum: null,
    currOp: "",
}

const display = document.querySelector("div .display");
const buttons = ["AC", "BS", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "=", "%", "0", "."]
const operators = ["+", "-", "*", "/", "%", "equals", "AC", "BS"];



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
        case "%":
            return percent(x, y)
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

function percent(x, y) {
    return "TODO"
}

function getAnswer() {
    // calcObject.secondNum = Number(display.textContent);
    let answer;
    switch (calcObject.currOp) {
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
    return answer;
}


// Display logic

function clearError() {
    display.textContent = "0";
    calcObject.displayVal = "0";
}


function clearForOperand() {
    if (calcObject.currOp !== "" && calcObject.secondNum === null) {
        display.textContent = "0";
        calcObject.displayVal = "0";
    }
}

function displayNum(num) {
    
    clearForOperand();

    // Prevent double decimal
    if (calcObject.displayVal.includes(".") && num === ".") {
        return;
    }     

    if (calcObject.displayVal.length < 9) {
        if (calcObject.displayVal === "0") {
            if (num === ".") {
                calcObject.displayVal = "0."
            } else {
                calcObject.displayVal = String(num);                
            }

        } else {            
            // Tack on number
            calcObject.displayVal = calcObject.displayVal + String(num);
        }
        // Update display
        display.textContent = calcObject.displayVal;
    }
}


// Button logic

function setOperand(num) {
    
    if (calcObject.displayVal === "ERROR") {
        clearError()
    }

    
    // First update the display, then place the displayed number into the correct operand
    displayNum(num)

    if (calcObject.currOp === "") {
        calcObject.firstNum = Number(calcObject.displayVal);
    } else if (calcObject.currOp === "=") {
        calcObject.currOp = ""
        calcObject.firstNum = Number(calcObject.displayVal);
    }
    else {
        calcObject.secondNum = Number(calcObject.displayVal);
    }

    //Debugging
    console.log(calcObject);

}


function setOperator(op) {
    if (calcObject.displayVal === "ERROR") {
        clearError()
    }


    if (calcObject.firstNum !== null && calcObject.secondNum === null) {
        calcObject.currOp = op;
    }

    else if (calcObject.firstNum !== null && calcObject.secondNum !== null) {

        answer = getAnswer();
        // Number boundaries
        if (answer > 999999999) {
            answer = 999999999
        } else if (answer < 0.0000001) {
            answer = 0.0000001
        }

        display.textContent = String(answer);
        calcObject.displayVal = String(answer);
        calcObject.firstNum = answer;
        calcObject.secondNum = null;
        calcObject.currOp = op;
    }

    // Debugging
    console.log(calcObject);
}

function computePercent() {
    if (calcObject.firstNum !== null && calcObject.secondNum === null) {        
        let percentage = (calcObject.firstNum / 100);        
        if (percentage > 999999999) {
            percentage = 999999999
        } else if (percentage < 0.0000001) {
            percentage = 0.0000001
        }        
        if (percentage === 1e-7) {                  
            percentage = 0;
        }

        calcObject.firstNum = percentage;
        calcObject.displayVal = String(percentage).substring(0,8);
        display.textContent = calcObject.displayVal;
        console.log(calcObject)
    } else if (calcObject.firstNum !== null && calcObject.secondNum !== null) {
        let percentage = (calcObject.secondNum / 100);
        if (percentage > 999999999) {
            percentage = 999999999
        } else if (percentage < 0.0000001) {
            percentage = 0.0000001
        }
        if (percentage === 1e-7) {                  
            percentage = 0;
        }
        
        calcObject.secondNum = percentage;
        calcObject.displayVal = String(percentage).substring(0,10);
        display.textContent = calcObject.displayVal;
        console.log(calcObject)
    }
}


function completeCalc() {
    if (calcObject.displayVal === "ERROR") {
        clearError()
    }

    // Handles the equals button
    if (calcObject.firstNum !== null && calcObject.secondNum !== null && calcObject.currOp !== "") {
        let answer = getAnswer();
        if (answer > 999999999) {
            answer = 999999999
        } else if (answer < 0.000001) {
            answer = 0.000001
        }
        display.textContent = String(answer).substring(0, 7);
        calcObject.displayVal = String(answer).substring(0, 7);
        if (answer !== "ERROR") {
            calcObject.firstNum = answer;
        } else {
            calcObject.firstNum = null;
        }

        calcObject.secondNum = null;
        calcObject.currOp = "=";
        console.log(calcObject);
    }
}

function clearCalc() {
    calcObject.displayVal = "0";
    calcObject.firstNum = null;
    calcObject.secondNum = null;
    calcObject.currOp = "";
    display.textContent = calcObject.displayVal;
}

function startCalc() {
    let buttonDiv = document.querySelector(".buttons")
    buttons.forEach(function (element) {
        let newBtn = document.createElement("button")
        if (element === "=") {
            newBtn.setAttribute("id", "equals")
        } else {
            newBtn.setAttribute("id", element)
        }
        newBtn.innerText = element
        buttonDiv.appendChild(newBtn)

    })
    display.textContent = calcObject.displayVal;
    addDigitButtonEvents();
    addOperatorButtonEvents();
}

function backSpaceCalc() {
    let shortenedDisplay = calcObject.displayVal.slice(0, -1);
    if (shortenedDisplay === "") {
        shortenedDisplay = "0"
    }
    display.textContent = shortenedDisplay;
    calcObject.displayVal = shortenedDisplay;
    if (calcObject.secondNum !== null) {
        calcObject.secondNum = Number(shortenedDisplay)
    } else {
        calcObject.firstNum = Number(shortenedDisplay)
    }
    //Debugging
    console.log(calcObject)
}

// Event handlers

function addDigitButtonEvents() {
    for (let i = 0; i < 10; i++) {
        let btn = document.getElementById(String(i));
        btn.addEventListener("click", function () { setOperand(i) });
    }
    let btn = document.getElementById(".")
    btn.addEventListener("click", function () { setOperand(".") });
}

function addOperatorButtonEvents() {
    operators.forEach(op => {
        let btn = document.getElementById(op);
        if (op === "equals") {
            btn.addEventListener("click", completeCalc);
        }
        else if (op === "AC") {
            btn.addEventListener("click", clearCalc);
        }
        else if (op === "BS") {
            btn.addEventListener("click", backSpaceCalc);
        }
        else if (op === "%") {
            btn.addEventListener("click", computePercent);
        }
        else {
            btn.addEventListener("click", function () { setOperator(btn.id) });
        }
    })
}

startCalc();
