// 2d array demo
let grid;
let gridSize = 10;
let squareHeight;
let squareWidth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createGrid(gridSize);
  squareHeight = height / grid[0].length;
  squareWidth = width / grid[0].length;
}

function draw() {
  clear();
  background(220);
  displayGrid(grid);
  // grid = createGrid(gridSize);
}

function keyPressed() {
  if(keyCode === 32) {
    grid = createGrid(gridSize);
  }
}

function createGrid(gridSize) {
  let grid = [];

  for(let i = 0; i < gridSize; i++) {
    grid.push([]);
    for (let j = 0; j < gridSize; j++) {
      grid[i].push(255);
    }
  }
  return grid;
}

function displayGrid(grid) {
  for(let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      fill(grid[y][x]);
      rect(x*squareWidth, y*squareHeight, squareWidth, squareHeight);
    }
  }
}

function mousePressed() {
  let squareX = Math.floor(mouseX / squareWidth);
  let squareY = Math.floor(mouseY / squareHeight);

  if (grid[squareY][squareX] === 0) {
    grid[squareY][squareX] = 255;
  }
  else{
    if (grid[squareY][squareX] === 255) {
      grid[squareY][squareX] = 0;
    }
  }
}