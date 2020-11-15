'use strict';

(function() {

    // Summarize two numbers
    let sumNumbersBtn = document.querySelector('.sum-numbers');
    sumNumbersBtn.onclick = sumTwoNumbers;

    // Roll the dices
    let dicesBtn = document.getElementsByClassName('roll-dices')[0];
    dicesBtn.onclick = rollDices;

    // Heads OR Tails Game
    let coinBtn = document.querySelector('.flip-coin');
    coinBtn.onclick = flipCoin;

    // Test
    let testBtn = document.querySelectorAll('.test')[0];
    testBtn.onclick = testFn;

    // Capitalize first letter
    let letterBtn = document.querySelector('.capitalize');
    letterBtn.onclick = capitalizeFn;

    // Calculate MIN value
    let minValueBtn = document.querySelector('.min-value');
    minValueBtn.onclick = minValueFn;
})();

// Summarize two numbers function
function sumTwoNumbers() {
    let firstNum = parseInt(prompt('Number ONE')),
        secondNum = parseInt(prompt('Number TWO')),
        result = firstNum + secondNum;

    if (isNaN(result)) {
        alert('Please give me right numbers!');
        return;
    }

    numbers.innerHTML = `Your final result: ${firstNum} + ${secondNum} = ${result}`;
}

// Roll the dices function
function rollDices() {
    let wrapper = document.getElementsByTagName('code')[0];

    wrapper.innerHTML = generateRandomDice('First dice');
    wrapper.innerHTML += generateRandomDice('Second dice');
}

function random(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

function generateRandomDice(name) {
    return `<div class="wrapper">
                <p>${name}:</p>
                <div class="dice-${random(1, 6)}"></div>
            </div>`;
}

// Heads OR Tails Game function
function flipCoin() {
    let wrapper = document.querySelector('.flip-container'),
        result = Math.floor(Math.random()*2);

    if (result === 0) {
        wrapper.innerHTML = '<p>HEADS!</p>';
        wrapper.innerHTML += '<div class="heads"></div>';
    } else {
        wrapper.innerHTML = '<p>TAILS!</p>';
        wrapper.innerHTML += '<div class="tails"></div>';
    }
}

// Test
function testFn() {
    let answer = prompt('Who killed Kenny?').toLowerCase();

    switch (answer) {
        case 'creator':
            alert('Nice try!');
            break;
        case 'you':
        case 'me':
            alert('Yeap! You are right!');
            break;
        default:
            alert('Try again!');
            break;
    }
}

// Capitalize
function capitalizeFn() {
    let ourString = prompt('Give me a lowercase string!'),
        elem = document.createElement('p');

    if (!ourString) {
        let emptyString = confirm('This string is empty. Do you wanna try again?');

        if (emptyString) capitalizeFn();

        return;
    }

    let existingString = document.querySelector('.result-string');
    if (existingString) {
        existingString.remove();
    }

    elem.className = 'result-string';
    elem.innerHTML = `Your converted string: ${ourString[0].toUpperCase() + ourString.slice(1)}`;
    
    letter.appendChild(elem);
}

// Min Value Calculation
function minValueFn() {
    let form = document.forms['min-value'],
        numFirst = form.firstNum,
        numSecond = form.secondNum,
        $wrap = document.querySelector('.show-min');
        
    numFirst.classList.remove('invalid');
    numSecond.classList.remove('invalid');

    if (numFirst.value === '' || numSecond.value === '') {
        alert('Please, enter your numbers');

        if (numFirst.value === '') numFirst.className = 'invalid';
        if (numSecond.value === '') numSecond.className = 'invalid';

        return;
    }
    
    $wrap.innerHTML = `Minimum number is ${parseInt(numFirst.value) < +numSecond.value ? numFirst.value : numSecond.value}`;
}