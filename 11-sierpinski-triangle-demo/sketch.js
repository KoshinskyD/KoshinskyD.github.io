
let trianglePoints = [
  {x: 550, y: 50},
  {x: 100, y: 650},
  {x: 1000, y: 650}
];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  triangle(trianglePoints[0].x, trianglePoints[0].y, trianglePoints[1].x, trianglePoints[1].y, trianglePoints[2].x, trianglePoints[2].y);
}

function sierpinski() {
  
}