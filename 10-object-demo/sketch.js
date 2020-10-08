// ball object demo

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // spawn balls into array
  for (let i = 0; i < 50; i++) {
    ballArray.push(new Ball(random(100, width-100), random(100, height-100)));
  }
}

function draw() {
  background(220);

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].move();
    for (let j = 0; j < ballArray.length; j++) {
      if (i !== j) {
        ballArray[i].collisionCheck(ballArray[j]);
      }
    }
    ballArray[i].display();
  }
}

class Ball {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = random(10, 20);
    this.colour = (random(255), random(255), random(255));
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    //bounce
    if (this.x <= 0 + this.radius || this.x >= width - this.radius) {
      this.dx *= -1;
    }
    if (this.y <= 0 + this.radius || this.y >= height - this.radius) {
      this.dy *= -1;
    }

  }
  display() {
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.radius * 2);
  }

  collisionCheck(otherBall) {
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    let sumOfRadii = this.radius + otherBall.radius;
    if (distanceApart <= sumOfRadii) {

      otherBall.r = this.r;
      otherBall.g = this.g;
      otherBall.b = this.b;

      let tempDx = this.dx;
      let tempDy = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;

      otherBall.dx = tempDx;
      otherBall.dy = tempDy;
    }
  }
}