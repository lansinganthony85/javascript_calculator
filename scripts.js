const buttons = document.querySelectorAll(".sm-button");
const numbers = document.querySelectorAll(".number");
const output = document.querySelector("#calc-output");
const decimal = document.querySelector("#decimal");
const clear = document.querySelector("#clear");
const signed = document.querySelector("#signed");
const operations = document.querySelectorAll(".operation");
const equals = document.querySelector("#equals");
const backspace = document.querySelector("#backspace");

let firstNum = 0;
let secondNum = 0;
let operation = '';

let inputOn = false;
let isDecimal = false;
let error = false;

document.addEventListener("keydown", (event) => {
    const keyName = event.key;

    switch(keyName) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            input(keyName);
            break;
        case "+":
        case "%":
        case "-":
        case "/":
        case "*":
            setOperation(keyName);
            break;
        case "Enter":
            operate(operation, firstNum, parseFloat(output.textContent));
            break;
        case "Backspace":
            removeLastDigit();
            break;
        case "Delete":
            clearData();
            break;
        case ".":
            setDecimal();
            break;
        case "~":
            changeSign();
            break;
    }
});

// add that on click the button will flash indicating that it was pressed
buttons.forEach(element => {
    let backgroundColor = element.style.backgroundColor;
    element.addEventListener("mousedown", () => {
        element.style.backgroundColor = "red";
    });
    element.addEventListener("mouseup", () => {
        element.style.backgroundColor = backgroundColor;
    });
});

// when a number is pressed it is added to the display
numbers.forEach(element => {
    element.addEventListener("click", () => {
        input(element.textContent);
    });
});

// make the number in the display decimal
decimal.addEventListener("click", () => {
    setDecimal();
});

// Clear all data when AC is pressed
clear.addEventListener("click", () => {
    clearData();
});

// change the sign of the display value when +/- is pressed
signed.addEventListener("click", () => changeSign());

// set the operation to be performed when an operation button is pressed
operations.forEach(element => {
    element.addEventListener("click", () => {
        setOperation(element.textContent);
    });
});

// perform an operation when the = button is pressed
equals.addEventListener("click", () => operate(operation, firstNum, parseFloat(output.textContent)));

// remove the last digit on the display when the del button is pressed
backspace.addEventListener("click", () => {
    removeLastDigit();
});

function operate(op, first, second) {
    if(op != '' && inputOn && !error) {
        switch (op) {
            case '%':
                firstNum = mod(first, second);
                break;
            case '/':
                firstNum = divide(first, second);
                break;
            case '*':
                firstNum = multiply(first, second);
                break;
            case '-':
                firstNum = subtract(first, second);
                break;
            case '+':
                firstNum = add(first, second);
                break;
        }

        if(firstNum == 'Infinity') {
            firstNum = "Don't even";
            error = true;
        }
        else if(firstNum.toString().length > 11) {
            if(Math.abs(firstNum) > 1000 || Math.abs(firstNum) < .0001)
                firstNum = firstNum.toExponential(2);
            else
                firstNum = parseFloat(firstNum.toFixed(11 - parseInt(firstNum).toString().length));
        }

        output.textContent = firstNum;
        operation = '';
        inputOn = false;
        isDecimal = false;
    }
    else
    output.textContent = "Press AC";
}

function mod(first, second) {
    return first % second;
}

function divide(first, second) {
    return first / second;
}

function multiply(first, second) {
    return first * second;
}

function subtract(first, second) {
    return first - second;
}

function add(first, second) {
    return first + second;
}

function input(num) {
    if(inputOn) {
        if(output.textContent.length < 11) {
            output.textContent = parseFloat(output.textContent + num, 10);
        }
    }
    else {
        output.textContent = parseFloat(num);
        inputOn = true;
    }
}

function setOperation(op) {
    if (operation != '') {
        if(inputOn)
            operate(operation, firstNum, parseFloat(output.textContent));
        operation = op;
    }       
    else {
        operation = op;
        firstNum = parseFloat(output.textContent);
        inputOn = false;
        isDecimal = false;
    }
}

function setDecimal() {
    if(!isDecimal && !error) {
        output.textContent += decimal.textContent;
        inputOn = true;
        isDecimal = true;
    }
}

function clearData() {
    inputOn = false;
    isDecimal = false;
    operation = '';
    firstNum, secondNum = 0;
    output.textContent = 0;
    error = false;
}

function changeSign() {
    output.textContent = parseFloat(output.textContent) * -1;
}

function removeLastDigit() {
    let charToDel = output.textContent.charAt(output.textContent.length - 1);
    output.textContent = output.textContent.substring(0, output.textContent.length - 1);

    if(charToDel === '.')
        isDecimal = false;
    else if(output.textContent === '') {
        output.textContent = 0;
        inputOn = false;
    }
}


// set the initial value on the display to 0
output.textContent = 0;