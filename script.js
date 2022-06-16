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

function checkResultLength(resultNum) {
  if (Number.isInteger(resultNum)) {
    if (resultNum.toString().length > 16) {
      return false;
    } else {
      return resultNum.toString();
    }
  } else {
    if (resultNum.toString().length > 17) {
      return resultNum.toString().slice(0, 17);
    } else {
      return resultNum.toString();
    }
  }
}

function removeFromActiveNumber() {
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

function displayCalculation(newCurrentTotal) {
  displayNumber = newCurrentTotal;
  activeNumber = '';
  calcDisplayEl.innerText = displayNumber;
  canPerformOperation = false;
  currentOperator = '';
}

function prepForOperation(operationType) {
  if (!currentTotal) {
    currentTotal = activeNumber;
    activeNumber = ''
    displayNumber = '';
  }

  canPerformOperation = false;
  currentOperator = operationType;
}

// Evalution function
function performOperation() {
  if (activeNumber === '') {
    return;
  }
  switch(currentOperator) {
    case 'add':
      currentTotal = checkResultLength(parseFloat(currentTotal) + parseFloat(activeNumber));
      break;
    case 'subtract':
      currentTotal = checkResultLength(parseFloat(currentTotal) - parseFloat(activeNumber));
      break;
    case 'multiply':
      currentTotal = checkResultLength(parseFloat(currentTotal) * parseFloat(activeNumber));
      break;
    case 'divide':
      if (activeNumber === '0'){
        refreshCalc();
        calcDisplayEl.innerText = "BRUH!";
        return;
      }
      currentTotal = checkResultLength(parseFloat(currentTotal) / parseFloat(activeNumber));
      break;
    default:
      return;
      break;
  }

  if (currentTotal === false) {
    refreshCalc();
    calcDisplayEl.innerText = "2 big 4 calc bro";
    return;
  }

  displayCalculation(currentTotal);
}

// Control function based on event listeners
function operatorBtnEvent(event) {
  if (canPerformOperation) {
    if (activeNumber && currentTotal){
      performOperation();
      currentOperator = event.target.value;
    } else {
      prepForOperation(event.target.value); 
    } 
  }
}

