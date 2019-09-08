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