const chronometer = new Chronometer();

// get the buttons:
const btnLeftElement = document.getElementById('btnLeft');
const btnRightElement = document.getElementById('btnRight');

// get the DOM elements that will serve us to display the time:
const minDecElement = document.getElementById('minDec');
const minUniElement = document.getElementById('minUni');
const secDecElement = document.getElementById('secDec');
const secUniElement = document.getElementById('secUni');
const milDecElement = document.getElementById('milDec');
const milUniElement = document.getElementById('milUni');
const splitsElement = document.getElementById('splits');

function printTime() {
  // ... your code goes here
  printSeconds();
  printMinutes();
}

function printMinutes() {
  let mins = chronometer.computeTwoDigitNumber(chronometer.getMinutes());
  minDecElement.innerText = mins[0];
  minUniElement.innerText = mins[1];
}
// ... your code goes here

function printSeconds() {
  // ... your code goes here
  let secs = chronometer.computeTwoDigitNumber(chronometer.getSeconds());
  secDecElement.innerText = secs[0];
  secUniElement.innerText = secs[1];
}

// ==> BONUS
function printMilliseconds() {
  // ... your code goes here
  let milPrint = chronometer.computeTwoDigitNumber(chronometer.currentMil);
  milDecElement.innerText = milPrint[0];
  milUniElement.innerText = milPrint[1];
}

function printSplit() {
  // ... your code goes here
  let myLi = document.createElement('li');

  myLi.innerHTML = chronometer.split();

  splitsElement.appendChild(myLi);
  console.log(myLi);
  console.log(splitsElement);
}

function clearSplits() {
  // ... your code goes here
  let mySplit = document.querySelector('ol');
  mySplit.innerHTML = '';
}

function setStopBtn() {
  // ... your code goes here
}

function setSplitBtn() {
  // ... your code goes here
}

function setStartBtn() {
  // ... your code goes here
}

function setResetBtn() {
  // ... your code goes here
  minDecElement.innerText = '0';
  minUniElement.innerText = '0';
  secDecElement.innerText = '0';
  secUniElement.innerText = '0';
  milDecElement.innerText = '0';
  milUniElement.innerText = '0';
}

// Start/Stop Button
btnLeftElement.addEventListener('click', () => {
  // ... your code goes here

  if (btnLeftElement.innerText === 'START') {
    chronometer.start(printTime, printMilliseconds);
    btnLeftElement.innerText = 'STOP';
    btnLeftElement.setAttribute('class', 'btn stop');
    btnRightElement.innerText = 'SPLIT';
    btnRightElement.setAttribute('class', 'btn split');
  } else {
    chronometer.stop();
    btnLeftElement.innerText = 'START';
    btnLeftElement.setAttribute('class', 'btn start');
    btnRightElement.innerText = 'RESET';
    btnRightElement.setAttribute('class', 'btn reset');
  }
});

// Reset/Split Button
btnRightElement.addEventListener('click', () => {
  // ... your code goes here

  if (btnLeftElement.innerText === 'START') {
    setResetBtn();
    clearSplits();
  } else {
    printSplit();
  }
});