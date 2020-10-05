// Objects Intro
let richard;

function setup() {
  createCanvas(windowWidth, windowHeight);
  richard = new Walker();
}

function draw() {
  background(220);
  richard.move();
  richard.display();
}

class Walker {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.colour = "red";
  }
  
  move() {
    let choice = random(100);
    if (choice < 25) {
      this.x -=1;
    }
    else if (choice < 50) {
      this.x +=1;
    }
    else if (choice < 75) {
      this.y +=1;
    }
    else {
      this.y -=1;
    }
  }

  display(){
    fill(this.colour);
    circle(this.x, this.y, 50);
  }

}