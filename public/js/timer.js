const chronometer = new Chronometer();

// get the buttons:
const btnLeftElement = document.getElementById("btnLeft");
const btnRightElement = document.getElementById("btnRight");

// get the DOM elements that will serve us to display the time:
const minDecElement = document.getElementById("minDec");
const minUniElement = document.getElementById("minUni");
const secDecElement = document.getElementById("secDec");
const secUniElement = document.getElementById("secUni");
const milDecElement = document.getElementById("milDec");
const milUniElement = document.getElementById("milUni");
const splitsElement = document.getElementById("splits");
const rapMusic = document.getElementById("rap");
const jazzMusic = document.getElementById("jazz");
const hardMusic = document.getElementById("hard");
const technoMusic = document.getElementById("techno");

let rapAudio = new Audio();
rapAudio.src = "/music/rap.mp3";
let jazzAudio = new Audio();
jazzAudio.src = "/music/jazz.mp3";
let hardAudio = new Audio();
hardAudio.src = "/music/hard.mp3";
let technoAudio = new Audio();
technoAudio.src = "/music/techno.mp3";

function printTime() {
  printSeconds();
  printMinutes();
}

function printMinutes() {
  let mins = chronometer.computeTwoDigitNumber(chronometer.getMinutes());
  minDecElement.innerText = mins[0];
  minUniElement.innerText = mins[1];
}

function printSeconds() {
  let secs = chronometer.computeTwoDigitNumber(chronometer.getSeconds());
  secDecElement.innerText = secs[0];
  secUniElement.innerText = secs[1];
}

function printMilliseconds() {
  let milPrint = chronometer.computeTwoDigitNumber(chronometer.currentMil);
  milDecElement.innerText = milPrint[0];
  milUniElement.innerText = milPrint[1];
}

function printSplit() {
  let myLi = document.createElement("li");
  myLi.innerHTML = chronometer.split();
  splitsElement.appendChild(myLi);
}

function clearSplits() {
  let mySplit = document.querySelector("ol");
  mySplit.innerHTML = "";
}

function setResetBtn() {
  minDecElement.innerText = "0";
  minUniElement.innerText = "0";
  secDecElement.innerText = "0";
  secUniElement.innerText = "0";
  milDecElement.innerText = "0";
  milUniElement.innerText = "0";
}

// Start/Stop Button
btnLeftElement.addEventListener("click", () => {
  if (btnLeftElement.innerText === "START") {
    chronometer.start(printTime, printMilliseconds);
    btnLeftElement.innerText = "STOP";
    btnLeftElement.setAttribute("class", "timer-btn stop");
    btnRightElement.innerText = "SPLIT";
    btnRightElement.setAttribute("class", "timer-btn split");
  } else {
    chronometer.stop();
    btnLeftElement.innerText = "START";
    btnLeftElement.setAttribute("class", "timer-btn start");
    btnRightElement.innerText = "RESET";
    btnRightElement.setAttribute("class", "timer-btn reset");
  }
});

// Reset/Split Button
btnRightElement.addEventListener("click", () => {
  if (btnLeftElement.innerText === "START") {
    setResetBtn();
    clearSplits();
  } else {
    printSplit();
  }
});

rapMusic.addEventListener("click", () => {
  if (rapAudio.paused) {
    jazzAudio.pause();
    jazzAudio.currentTime = 0;
    hardAudio.pause();
    hardAudio.currentTime = 0;
    technoAudio.pause();
    technoAudio.currentTime = 0;
    rapAudio.volume = 0.3;
    rapAudio.play();
  } else {
    rapAudio.pause();
  }
});

jazzMusic.addEventListener("click", () => {
  if (jazzAudio.paused) {
    rapAudio.pause();
    rapAudio.currentTime = 0;
    hardAudio.pause();
    hardAudio.currentTime = 0;
    technoAudio.pause();
    technoAudio.currentTime = 0;
    jazzAudio.volume = 0.3;
    jazzAudio.play();
  } else {
    jazzAudio.pause();
  }
});

hardMusic.addEventListener("click", () => {
  if (hardAudio.paused) {
    jazzAudio.pause();
    jazzAudio.currentTime = 0;
    rapAudio.pause();
    rapAudio.currentTime = 0;
    technoAudio.pause();
    technoAudio.currentTime = 0;
    hardAudio.volume = 0.3;
    hardAudio.play();
  } else {
    hardAudio.pause();
  }
});

technoMusic.addEventListener("click", () => {
  if (technoAudio.paused) {
    jazzAudio.pause();
    jazzAudio.currentTime = 0;
    hardAudio.pause();
    hardAudio.currentTime = 0;
    rapAudio.pause();
    rapAudio.currentTime = 0;
    technoAudio.volume = 0.3;
    technoAudio.play();
  } else {
    technoAudio.pause();
  }
});
