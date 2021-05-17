// theme switcher
const themeSwitch = document.querySelector('.switch-3');

themeSwitch.addEventListener('change', () => {
    const cb1 = document.getElementById('1');
    const cb2 = document.getElementById('2');
    const cb3 = document.getElementById('3');

    if (cb1.checked) {
        document.body.classList.remove('theme2');
        document.body.classList.remove('theme3');
    } else if (cb2.checked) {
        document.body.classList.add('theme2');
        document.body.classList.remove('theme3');
    } else if (cb3.checked) {
        document.body.classList.add('theme3');
        document.body.classList.remove('theme2');
    }
});

// calculator logic
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
    const currentActiveOperator = calculator.querySelector('[data-state="selected"]');

    if (type === 'number') {
        if (displayValue == 0 || previousKeyType === 'operator') {
            display.textContent = keyValue;
        } else {
            display.textContent = displayValue + keyValue;
        }
    }

    if (type === 'operator') {
        if (currentActiveOperator) {
            currentActiveOperator.dataset.state = '';
        }
        key.dataset.state = 'selected';

        calculator.dataset.firstNumber = displayValue;
        calculator.dataset.operator = key.dataset.key;
    }

    if (type === 'reset') {
        display.textContent = '0';
    }

    if (type === 'delete') {
        display.textContent = Math.floor(displayValue / 10);
        
    }

    if (type === 'equal') {
        const firstNumber = calculator.dataset.firstNumber;
        const operator = calculator.dataset.operator;
        const secondNumber = displayValue;
        display.textContent = calculate(firstNumber, operator, secondNumber);
    
        currentActiveOperator.dataset.state = '';
    }

    calculator.dataset.previousKeyType = type;
}

function calculate(firstNumber, operator, secondNumber) {
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    let result = '';
    if (operator === 'sum') return firstNumber + secondNumber;
    if (operator === 'subtract') return firstNumber - secondNumber;
    if (operator === 'multiply') return firstNumber * secondNumber;
    if (operator === 'divide') return firstNumber / secondNumber;
}