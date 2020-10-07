// Timer Demo

let blinkTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  blinkTime = new Timer(1000);
}

function draw() {
  background(220);
  if (blinkTime.isDone()){
    background(0);
    blinkTime.setWaitTime(2000);
    blinkTime.reset();
  }
  else {
    background(255);
  }
}

class Timer {
  constructor(howLongToWait) {
    this.howLongToWait = howLongToWait;
    this.beginTime = millis();
    this.endTime = this.beginTime + this.howLongToWait; 
  }

  isDone() {
    return millis() >= this.endTime;
  }

  reset() {
    this.beginTime = millis();
    this.endTime = this.beginTime + this.howLongToWait;
  }

  setWaitTime(howLongToWait) {
    this.howLongToWait = howLongToWait;
  }

}