// Traffic Light
// Darren Koshinsky
// 23/9/2020

let state;
let yellowTime = 1000;
let redTime = 2000;
let greenTime = 2000;
let lastColourTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  state = "yellow";
}

function draw() {
  background(220);
  drawOutlineOfLights();
  switchColours();
}

function drawOutlineOfLights() {
  // box
  rectMode(CENTER);
  fill("black");
  rect(width/2, height/2, 75, 200, 20);
  // lights
  if (state === "red") { // top colour
    fill("red");
  }
  else {
    fill("white");
  }
  circle(width/2, height/2 - 65, 50); // top
  
  if (state === "yellow") { // middle colour
    fill("yellow");
  }
  else {
    fill("white");
  } 
  circle(width/2, height/2, 50); // middle
  
  if (state === "green") { //bottom colour
    fill("green");
  }
  else {
    fill("white");
  }
  circle(width/2, height/2 + 65, 50); // bottom

}

function switchColours() {
  if (millis() >  lastColourTime + yellowTime && state === "yellow") {
    lastColourTime = millis();
    state = "red";
  }
  else if( millis() >  lastColourTime + redTime && state === "red") {
    lastColourTime = millis();
    state = "green";
  }
  else if (millis() >  lastColourTime + greenTime && state === "green") {
    lastColourTime = millis();
    state = "yellow";
  }
}