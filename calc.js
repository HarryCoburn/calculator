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
    for (let i = 0; i < 10; i++) {
        let btn = document.getElementById(String(i));
        btn.addEventListener("click", function() {displayNum(i)});
    }
}

function displayNum(num) {
    let display = document.querySelector("div .display");
    if (display.textContent.length < 10) {
        display.textContent = display.textContent + String(num);
    }
}

startCalc()