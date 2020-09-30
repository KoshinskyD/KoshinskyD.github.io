// 2d array demo
let grid;
let squareHeight;
let squareWidth;
const GRIDSIZE = 16;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmptyGrid(GRIDSIZE);
  squareHeight = height / grid[0].length;
  squareWidth = width / grid[0].length;
}

function draw() {
  clear();
  background(220);
  displayGrid(grid);
  // grid = createGrid(GRIDSIZE);
}

function keyPressed() {
  if(keyCode === 32) {
    grid = createGrid(GRIDSIZE);
  }
}

function createGrid(GRIDSIZE) {
  let grid = [];

  for(let i = 0; i < GRIDSIZE; i++) {
    grid.push([]);
    for (let j = 0; j < GRIDSIZE; j++) {
      grid[i].push(Math.round(random(0, 1))*255);
    }
  }
  return grid;
}

function displayGrid(grid) {
  for(let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] ===0 ) {
        fill("white");
      }
      else {
        fill("black");
      }
      rect(x*squareWidth, y*squareHeight, squareWidth, squareHeight);
    }
  }
}

function mousePressed() {
  let squareX = Math.floor(mouseX / squareWidth);
  let squareY = Math.floor(mouseY / squareHeight);

  toggleSquare(squareX, squareY); //self
  toggleSquare(squareX, squareY - 1); // north
  toggleSquare(squareX, squareY + 1); // south
  toggleSquare(squareX + 1, squareY); // east
  toggleSquare(squareX - 1, squareY); // west
}

function createEmptyGrid() {
  let grid = [];

  for(let i = 0; i < GRIDSIZE; i++) {
    grid.push([]);
    for (let j = 0; j < GRIDSIZE; j++) {
      grid[i].push(0);
    }
  }
  return grid;
}

function toggleSquare(squareX, squareY) {
  if (squareX >= 0 && squareX < GRIDSIZE &&
      squareY >= 0 && squareY < GRIDSIZE) { 

    if (grid[squareY][squareX] === 0) {
      grid[squareY][squareX] = 255;
    }
    else{
      if (grid[squareY][squareX] === 255) {
        grid[squareY][squareX] = 0;
      }
    }
  }
}