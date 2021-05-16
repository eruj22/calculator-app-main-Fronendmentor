const calculator = document.querySelector('.keyboard');
const buttons = document.querySelectorAll('button');
const display = document.querySelector('.screen');

buttons.forEach(button => {
    button.addEventListener('click', calculation);
});

function calculation(e) {
    // const clickedButtonValue = e.target.value;
    const key = e.target;
    const keyValue = key.value;
    const displayValue = display.textContent;
    const type = key.dataset.type;
    const { previousKeyType } = calculator.dataset

    if (type === 'number') {
        // clear first number 0
        if (displayValue == 0 || previousKeyType === 'operator') {
            display.textContent = keyValue;
        } else {
            display.textContent = displayValue + keyValue;
        }
    }

    if (type === 'operator') {
        const currentActiveOperator = calculator.querySelector('[data-state="selected"]');
        if (currentActiveOperator) {
            currentActiveOperator.dataset.state = '';
        }
        key.dataset.state = 'selected';

        calculator.dataset.firstNumber = displayValue;
        calculator.dataset.operator = key.dataset.key;
    }

    if (type === 'equal') {
        const firstNumber = calculator.dataset.firstNumber;
        const operator = calculator.dataset.operator;
        const secondNumber = displayValue;
        display.textContent = calculate(firstNumber, operator, secondNumber);
    }

    calculator.dataset.previousKeyType = type;
}

function calculate(firstNumber, operator, secondNumber) {
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);
    let result = '';
    if (operator === 'sum') return firstNumber + secondNumber;
    if (operator === 'subtract') return firstNumber - secondNumber;
    if (operator === 'multiply') return firstNumber * secondNumber;
    if (operator === 'divide') return firstNumber / secondNumber; 
}