// Bouncing Ball Demo

let theBalls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  moveBalls();
  displayBall();
  checkForDeath();
}

function checkForDeath(){
  for (let i = theBalls.length-1; i >= 0; i--) {
    if (theBalls[i].bounceCounter >= 10) {
      theBalls.splice(i, 1);
    }
  }
}

function mousePressed() {
  spawnBall();
}

function moveBalls() {
  for (let i = 0; i < theBalls.length; i++) {
    theBalls[i].x += theBalls[i].dx;
    theBalls[i].y += theBalls[i].dy;
  
    if (theBalls[i].x - theBalls[i].radius < 0 || theBalls[i].x + theBalls[i].radius > width) {
      theBalls[i].dx *= -1;
      theBalls[i].bounceCounter++;
    }
    if (theBalls[i].y - theBalls[i].radius < 0 || theBalls[i].y + theBalls[i].radius > height) {
      theBalls[i].dy *= -1;
      theBalls[i].bounceCounter++;
    }
  }
}

function displayBall() {
  for(let ball of theBalls) {
    fill(ball.theColour);
    noStroke();
    circle(ball.x, ball.y, ball.radius*2);
  }
}

function spawnBall() {
  let ball = {
    x: mouseX,
    y: mouseY,
    dx: random(-5, 5),
    dy: random(-5, 5),
    theColour: color(random(255), random(255), random(255), random(255)),
    bounceCounter: 0,
  };
  theBalls.push(ball);
}