// Array Demo

let numberOfRects;
let rectWidth;
let rectHeight = [];
let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  numberOfRects = width;
  rectWidth = width / numberOfRects;
  setTheHeights();
}

function draw() {
  background(220);
  displayRects();
}

function setTheHeights() {
  for (let i = 0; i < numberOfRects; i++) {
    rectHeight.push(noise(millis()) * height);
  }
}

function displayRects() {
  for(let i = 0; i < numberOfRects; i++) {
    fill("black");
    rect(i*rectWidth, height - rectHeight[i], rectWidth, rectHeight[i]);
  }
}