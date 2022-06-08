const numberBtns = document.querySelectorAll('.number');
const operationBtns = document.querySelectorAll('.operator');
const deleteBtn = document.getElementById('delete_btn');
const refreshBtn = document.getElementById('refresh_btn');
const equalBtn = document.getElementById('operate_btn');
const switchSignBtn = document.getElementById('switch_sign_btn');
const addFloatBtn = document.getElementById('add_float');
const calcDisplayEl = document.getElementById('calc_display');

// gloabl variables to maintain for calc
let displayNumber = '0';
let currentTotal = '';
let activeNumber = '';
let currentOperator = '';
let canPerformOperation = false;



numberBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    addToActiveNumber(event.target.value);
  })
})

operationBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    operatorBtnEvent(event);
  })
})

deleteBtn.addEventListener('click', () => {
  removeFromActiveNumber();
})

refreshBtn.addEventListener('click', () => {
  refreshCalc();
})

equalBtn.addEventListener('click', () => {
  performOperation();
  canPerformOperation = true;
  currentOperator = '';
})

switchSignBtn.addEventListener('click', () => {
  changeSignOfDisplayNum();
})

addFloatBtn.addEventListener('click', () => {
  addFloat();
})



function addToActiveNumber(num) {
  if (currentTotal && activeNumber == '' && currentOperator == '') {
    refreshCalc();
  }
  if (activeNumber.length <= 16) {
    activeNumber += num;
    displayNumber = activeNumber
    calcDisplayEl.innerText = displayNumber;
  }
  canPerformOperation = true;
}

function removeFromActiveNumber() {
  console.log(activeNumber.length);
  if (activeNumber.length > 1) {
    console.log(activeNumber);
    activeNumber = activeNumber.slice(0,-1);
    displayNumber = activeNumber;
    console.log(activeNumber);
    calcDisplayEl.innerText = displayNumber;
  } else if (activeNumber.length === 1) {
    activeNumber = '';
    displayNumber = '0';
    calcDisplayEl.innerText = displayNumber;
  }
  if (activeNumber === '') {
    canPerformOperation = false;
  }
}

function changeSignOfDisplayNum() {
  if (displayNumber === '0') {
    return
  } else if (displayNumber === activeNumber) {
    if (activeNumber.charAt(0) == '-') {
      activeNumber = activeNumber.substring(1);
      displayNumber = activeNumber;
      calcDisplayEl.innerText = displayNumber;
    } else {
      activeNumber = '-' + activeNumber;
      displayNumber = activeNumber;
      calcDisplayEl.innerText = displayNumber;
    }
  } else if (displayNumber === currentTotal) {
    if (currentTotal.charAt(0) == '-') {
      currentTotal = currentTotal.substring(1);
      displayNumber = currentTotal;
      calcDisplayEl.innerText = displayNumber;
    } else {
      currentTotal = '-' + currentTotal;
      displayNumber = currentTotal;
      calcDisplayEl.innerText = displayNumber;
    }
  }
}

// case 1 --> There is no currentTotal (first number case)

// case 2 --> There is a currentTotal which is the current displayNum (after equals case)

// case 3 --> there is a currentTotal but it is not display num; (in middle of operation case)

function addFloat() {
  const containsFloatAlready = activeNumber.includes('.');
  if (containsFloatAlready) {
    return;
  }
  if ((currentTotal === displayNumber) && (currentOperator === '')) {
    refreshCalc();
    activeNumber = '0.';
    displayNumber = activeNumber
    calcDisplayEl.innerText = displayNumber;
  } else {
    if (activeNumber === '') {
      activeNumber = '0.'
    } else {
      activeNumber = activeNumber + '.';
    }
    displayNumber = activeNumber;
    calcDisplayEl.innerText = displayNumber;
  }
}

function refreshCalc() {
  displayNumber = '0';
  activeNumber = '';
  currentTotal = '';
  currentOperator = '';
  calcDisplayEl.innerText = displayNumber;
  canPerformOperation = false;
}


// Addition functions
function addTwoNumbers() {
  currentTotal = parseFloat(currentTotal) + parseFloat(activeNumber) + '';
  displayNumber = currentTotal;
  activeNumber = '';
  calcDisplayEl.innerText = displayNumber;
  canPerformOperation = false;
  currentOperator = '';
}

function prepForAddition() {
    if (!currentTotal) {
      currentTotal = activeNumber;
      activeNumber = '';
      displayNumber = '';
    }
    canPerformOperation = false;
    currentOperator = 'add';
}

// Subtraction functions
function subtractTwoNumbers() {
  currentTotal = parseFloat(currentTotal) - parseFloat(activeNumber) + '';
  displayNumber = currentTotal;
  activeNumber = '';
  calcDisplayEl.innerText = displayNumber;
  canPerformOperation = false;
  currentOperator = ''
}

function prepForSubtraction() {
  if (!currentTotal) {
    currentTotal = activeNumber;
    activeNumber = '';
    displayNumber = '';
  }

  canPerformOperation = false;
  currentOperator = 'subtract';
}

// Multiplication functions
function multiplyTwoNumbers() {
  currentTotal = parseFloat(currentTotal) * parseFloat(activeNumber) + '';
  displayNumber = currentTotal;
  activeNumber = '';
  calcDisplayEl.innerText = displayNumber;
  canPerformOperation = false;
  currentOperator = '';
}

function prepForMultiplication() {
  if (!currentTotal) {
    currentTotal = activeNumber;
    activeNumber = ''
    displayNumber = '';
  }

  canPerformOperation = false;
  currentOperator = 'multiply';
}

// division functions
function divideTwoNumbers() {
  if (activeNumber === '0') {
    displayNumber = 'BRUH!';
    calcDisplayEl.innerText = displayNumber;
    activeNumber = '';
    displayNumber = '0';
    canPerformOperation = false;
    currentOperator = '';
  } else {
    currentTotal = parseFloat(currentTotal) / parseFloat(activeNumber) + '';
    displayNumber = currentTotal;
    activeNumber = '';
    calcDisplayEl.innerText = displayNumber;
    canPerformOperation = false;
    currentOperator = '';
  }

}

function prepForDivision() {
  if (!currentTotal) {
    currentTotal = activeNumber;
    activeNumber = ''
    displayNumber = '';
  }

  canPerformOperation = false;
  currentOperator = 'divide';
}





// Evalution function
function performOperation() {
  if (currentOperator == 'add') {
    addTwoNumbers()
  } else if (currentOperator == 'subtract') {
    subtractTwoNumbers();
  } else if (currentOperator == 'multiply') {
    multiplyTwoNumbers();
  } else if (currentOperator == 'divide') {
    divideTwoNumbers();
  }
}


// Control function based on event listeners
function operatorBtnEvent(event) {
  if (canPerformOperation) {
    if (activeNumber && currentTotal){
      performOperation();
      currentOperator = event.target.value;
    } else {
      switch(event.target.value) {
        case 'add':
          prepForAddition();
          break;
        case 'subtract':
          prepForSubtraction();
          break;
        case 'multiply':
          prepForMultiplication();
          break;
        case 'divide':
          prepForDivision();
          break;
        default:
          break;
      }
    } 
  }
}

