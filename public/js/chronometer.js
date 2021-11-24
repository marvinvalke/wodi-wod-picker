class Chronometer {
    constructor() {
      this.currentTime = 0;
      this.intervalId = null;
      this.currentMil = 0;
      this.milInterval = null;
    }
  
    start(callback, milCallback) {
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
      let minutes = Math.floor(this.currentTime / 60);
      return minutes;
    }
  
    getSeconds() {
      let seconds = this.currentTime % 60;
      return seconds;
    }
  
    computeTwoDigitNumber(value) {
      if (value < 10) {
        return '0' + value;
      } else {
        return value.toString().slice(-2);
      }
    }
  
    stop() {
      clearInterval(this.intervalId);
      clearInterval(this.milInterval);
    }
  
    reset() {
      this.currentTime = 0;
      this.currentMil = 0;
    }
  
    split() {
      return `${this.computeTwoDigitNumber(
        this.getMinutes()
      )}:${this.computeTwoDigitNumber(
        this.getSeconds()
      )}:${this.computeTwoDigitNumber(this.currentMil)}`;
    }
  }
  
  