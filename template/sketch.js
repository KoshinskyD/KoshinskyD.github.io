// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shouldIShowTheEllipse = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  
  let something = ture;

  if(shouldIShowTheEllipse) {
    fill('red')
    ellipse(mouseX, mouseY, 100, 100);
  }
}

function mousePressed() {
  shouldIShowTheEllipse = !shouldIShowTheEllipse;
}
