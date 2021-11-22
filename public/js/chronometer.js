class Chronometer {
    constructor() {
      // ... your code goes here
      this.currentTime = 0;
      this.intervalId = null;
      this.currentMil = 0;
      this.milInterval = null;
    }
  
    start(callback, milCallback) {
      // ... your code goes here
      this.intervalId = setInterval(() => {
        this.currentTime++;
        console.log(this.currentTime);
        this.currentMil = 0;
  
        if (callback) {
          console.log('CALLBACK');
          callback();
        }
      }, 1000);
  
      this.milInterval = setInterval(() => {
        this.currentMil++;
        if (milCallback) {
          milCallback();
        }
      }, 10);
    }
  
    getMinutes() {
      // ... your code goes here
      let minutes = Math.floor(this.currentTime / 60);
      return minutes;
    }
  
    getSeconds() {
      // ... your code goes here
      let seconds = this.currentTime % 60;
      return seconds;
    }
  
    computeTwoDigitNumber(value) {
      // ... your code goes here
      if (value < 10) {
        return '0' + value;
      } else {
        return value.toString().slice(-2);
      }
    }
  
    stop() {
      // ... your code goes here
      clearInterval(this.intervalId);
      clearInterval(this.milInterval);
    }
  
    reset() {
      this.currentTime = 0;
      this.currentMil = 0;
      // ... your code goes here
    }
  
    split() {
      // ... your code goes here
      return `${this.computeTwoDigitNumber(
        this.getMinutes()
      )}:${this.computeTwoDigitNumber(
        this.getSeconds()
      )}:${this.computeTwoDigitNumber(this.currentMil)}`;
    }
  }
  
  // The following is required to make unit tests work.
  /* Environment setup. Do not modify the below code. */
  if (typeof module !== 'undefined') {
    module.exports = Chronometer;
  }
  