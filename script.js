const numberBtns = document.querySelectorAll('.number');
const operationBtns = document.querySelectorAll('.operator');
const deleteBtn = document.getElementById('delete_btn');
const refreshBtn = document.getElementById('refresh_btn');
const equalBtn = document.getElementById('operate_btn');
const switchSignBtn = document.getElementById('switch_sign_btn');
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



function addToActiveNumber(num) {
  if (currentTotal && activeNumber == '' && currentOperator == '') {
    refreshCalc();
    console.log("enter refresh block", activeNumber, currentTotal, currentOperator, canPerformOperation)
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
  currentTotal = parseInt(currentTotal, 10) + parseInt(activeNumber, 10) + '';
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
  currentTotal = parseInt(currentTotal, 10) - parseInt(activeNumber, 10) + '';
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
  currentTotal = parseInt(currentTotal, 10) * parseInt(activeNumber, 10) + '';
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
    currentTotal = parseInt(currentTotal, 10) / parseInt(activeNumber, 10) + '';
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

