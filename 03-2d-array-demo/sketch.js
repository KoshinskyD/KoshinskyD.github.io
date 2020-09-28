// 2d array demo
let tempName;
let gridSize = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tempName = createGrid(gridSize);
}

function draw() {
  clear();
  background(220);
  displayGrid(tempName);
  tempName = createGrid(gridSize);
}

function keyPressed() {
  if(keyCode === 32) {
    tempName = createGrid(gridSize);
  }
}

function createGrid(gridSize) {
  let grid = [];

  for(let i = 0; i < gridSize; i++) {
    grid.push([]);
    for (let j = 0; j < gridSize; j++) {
      let randomizer = random(1, 8);
      if(randomizer <= 1){
        grid[i].push("red");
      }
      else if (randomizer <= 2) {
        grid[i].push("purple");
      }
      else if (randomizer <= 3) {
        grid[i].push("magenta");
      }
      else if (randomizer <= 4) {
        grid[i].push("black");
      }
      else if (randomizer <= 5) {
        grid[i].push("purple");
      }
      else if (randomizer <= 6) {
        grid[i].push("orange");
      }
      else if (randomizer <= 7) {
        grid[i].push("orange");
      }
      else{
        grid[i].push("blue");
      }
    }
  }
  console.log(grid);
  return grid;
}

function displayGrid(grid) {
  let squareHeight = height / grid[0].length;
  let squareWidth = width / grid[0].length;

  for(let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      fill(grid[y][x]);
      rect(x*squareWidth, y*squareHeight, squareWidth, squareHeight);
    }
  }
}