// 2d array demo

// not working

let grid;
let squareHeight;
let squareWidth;
let autoPlay = false;
const GRIDSIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateEmptyGrid(GRIDSIZE);
  squareHeight = height / grid[0].length;
  squareWidth = width / grid[0].length;
}

function draw() {
  clear();
  background(220);
  if (autoPlay) {
    takeNextTurn();
  }
  displayGrid(grid);
  // grid = generateGrid(GRIDSIZE);
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
}

function keyPressed() {
  if(key === "r") {
    grid = generateRandomGrid(GRIDSIZE);
  }
  if(key === " ") {
    takeNextTurn();
  }
  if(key === "c") {
    generateEmptyGrid(GRIDSIZE);
  }
  if (key === "a") {
    autoPlay = !autoPlay;
  }
}

function takeNextTurn() {
  let nextTurn = generateEmptyGrid(GRIDSIZE);

  for (let y = 0; y < GRIDSIZE; y++) {
    for (let x = 0; x < GRIDSIZE; x++) {
      //count neighbors
      let neighbors = 0;
      for(let i=-1; i<=1; i++) {
        for(let j=-1; j<=1; j++) {
          if(y+i >= 0 && y+i < GRIDSIZE && x+j >= 0 && x+j < GRIDSIZE){
            neighbors += grid[y+i][x+j];
          }
        }
      }
      // subtract self
      neighbors -= grid[y][x];

      // apply rules

      // if dead
      if (grid[y][x] === 0 ) {
        if (neighbors === 3) {
          nextTurn[y][x] = 1;
        }
      }
      // if alive
      if (grid[y][x] === 1) {
        if(neighbors === 2 || neighbors === 3) {
          nextTurn[y][x] = 1; // dont need to set to dead as it already is when created in next turn array
        }
      }
    }    
  }

  grid = nextTurn;
}

function generateEmptyGrid(GRIDSIZE) {
  let grid = [];
  
  for(let i = 0; i < GRIDSIZE; i++) {
    grid.push([]);
    for (let j = 0; j < GRIDSIZE; j++) {
      grid[i].push(0);
    }
  }
  return grid;
}

function generateRandomGrid(GRIDSIZE) {
  let grid = [];

  for(let i = 0; i < GRIDSIZE; i++) {
    grid.push([]);
    for (let j = 0; j < GRIDSIZE; j++) {
      grid[i].push(Math.round(random(0, 1))*255);
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