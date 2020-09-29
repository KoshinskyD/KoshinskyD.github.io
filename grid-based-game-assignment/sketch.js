// Grid-Based Game Assignment
// Darren Koshinsky
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let time = 10000;  
let state;
let gridSize = 10;
let grid;
function setup() {
  createCanvas(windowWidth, windowHeight);
  state = "start";
}

function draw() {
  background(125);
  if (state === "start") {
    startScreen();
  }
  if (state === "play") {
    displayGrid(grid);
  }
}

function startScreen() {
  push();
  rectMode(CENTER);
  background(0);
  fill(255);
  rect(width/2, height/2, 210, 50, 10, 10, 10, 10);
  fill(0);
  textSize(35);
  text("Click to Start", width / 2, height / 2, 210, 35);
  if (mouseIsPressed && mouseX >= width/2 -105 && mouseX <= width/2 +105 && mouseY >= height/2 - 25 && mouseY <= height/2 +25) {
    state = "play";
    grid = createGrid(gridSize);
  }
  pop();
}

function createGrid(gridSize) {
  let grid = [];
  for(let i = 0; i < gridSize; i++) {
    grid.push([]);
    for (let j = 0; j < gridSize; j++) {
      grid[i].push(Math.round(noise(time))* 255);
      time += 0.1;
    }
  }
  console.log(grid);
  console.log(time);
  return grid;
}

function displayGrid(grid) {
  let squareHeight = height / grid[0].length;
  let squareWidth = width / grid[0].length;
  for(let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      stroke("red");
      fill(grid[y][x]);
      rect(x*squareWidth, y*squareHeight, squareWidth, squareHeight);
    }
  }
}