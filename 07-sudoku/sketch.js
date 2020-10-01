// Project Title

const sudokuSize = 9;
let cellSize;
let centerX, centerY;

let sudoku = [[0,0,9,0,0,2,0,0,5],
              [5,3,8,0,6,4,0,0,9],
              [1,6,2,0,0,0,0,3,0],
              [0,0,3,0,2,7,0,0,0],
              [0,5,4,6,0,0,1,0,0],
              [0,0,7,0,1,5,3,4,0],
              [3,0,0,8,0,1,9,0,6],
              [7,0,0,3,0,0,8,5,0],
              [0,9,1,0,0,0,4,7,0]];

let initialState = [[0,0,9,0,0,2,0,0,5],
                    [5,3,8,0,6,4,0,0,9],
                    [1,6,2,0,0,0,0,3,0],
                    [0,0,3,0,2,7,0,0,0],
                    [0,5,4,6,0,0,1,0,0],
                    [0,0,7,0,1,5,3,4,0],
                    [3,0,0,8,0,1,9,0,6],
                    [7,0,0,3,0,0,8,5,0],
                    [0,9,1,0,0,0,4,7,0]];


function setup() {
  createCanvas(windowWidth, windowHeight);
  if (height < width) {
    cellSize = height/sudokuSize;
    centerX = (width - cellSize*sudokuSize) / 2;
    centerY = 0;
  }
  else {
    cellSize = width/sudokuSize; 
    centerY = (height - cellSize*sudokuSize) / 2;
    centerX = 0;
  }
}

function draw() {
  background(220);
  dissplaySudoku();
}

function dissplaySudoku() {
  for (let y = 0; y < sudokuSize; y++) {
    for (let x = 0; x < sudokuSize; x++) {
      fill("white");
      rect(x* cellSize + centerX, y*cellSize + centerY, cellSize, cellSize);

      if (sudoku[y][x] !== 0) {
        //show number

        if (sudoku[y][x] === initialState[y][x]) {
          //one of the given numbers
          fill("gray");
        }
        else {
          fill("black");
        }

        textSize(cellSize * 0.7);
        textAlign(CENTER, CENTER);

        text(sudoku[y][x], x*cellSize + centerX + cellSize/2, y*cellSize + centerY + cellSize/2);
       
      }
    }
  }

  push();
  strokeWeight(5);
  // thick lines deviding in 9ths
  line(cellSize*3 + centerX, 0 + centerY, cellSize*3 + centerX, cellSize*sudokuSize  + centerY);
  line(cellSize*6 + centerX, 0 + centerY, cellSize*6 + centerX, cellSize*sudokuSize + centerY);
  line(0 + centerX, cellSize*3 + centerY, cellSize*sudokuSize + centerX, cellSize*3 + centerY);
  line(0 + centerX, cellSize*6 + centerY, cellSize*sudokuSize + centerX, cellSize*6 + centerY);
  
  // outline
  line(0 + centerX, 0 + centerY, sudokuSize*cellSize + centerX, 0 + centerY); // top
  line(0 + centerX , 0 + sudokuSize*cellSize + centerY, sudokuSize*cellSize + centerX, 0 + sudokuSize*cellSize + centerY); // bottom
  line(0 + centerX, 0 + centerY, 0 + centerX, sudokuSize*cellSize + centerY); // left
  line(0 + sudokuSize*cellSize + centerX, 0 + centerY, 0 + sudokuSize*cellSize + centerX, 0 + sudokuSize*cellSize + centerY); // right
  pop();
}

function changecell(cellX, cellY){
  if (sudoku[cellY][cellX] !== initialState[cellY][cellX] || sudoku[cellY][cellX] === 0) {
    sudoku[cellY][cellX] = key;
  }
}

function mousePressed() {
  let cellX = floor(mouseX / cellSize);
  let cellY = floor(mouseY / cellSize);

  changecell(cellX, cellY); 
}