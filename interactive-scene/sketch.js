// Player managment
let hitboxScale = 9;
let spriteScale = 9;
let knightLeft1, knightRight1, knightLeft2, knightRight2, knightStill;
let spriteX;
let spriteY;
let playHealth = 100;
let monsterKills = 0;

// Enemy managment


// Background managment.
let background1, background2, background3, background4, background5, background6, background7, background8;
let backgrounds = [];
let backgroundSelection = [];
let backgroundColour;

// Movement
let isMovingLeft, isMovingRight, isJumping;
let isGrounded = false;
let initialY;
let jumpHeight = 70;
let jumpSpeed = 8;
let gravity = 5;
let movementSpeed = 7;

// Counters used to change between sprites, screens/gamestates, and locations
let spriteTimer = 0;
let state = "start";
let areaCounter = 0; // Does nothing in this version

// Loads all Images
function preload() {
  knightLeft1 = loadImage("assets/knightLeft1.png");
  knightLeft2 = loadImage("assets/knightLeft2.png");
  knightRight1 = loadImage("assets/knightRight1.png");
  knightRight2 = loadImage("assets/knightRight2.png");
  knightStill = loadImage("assets/knightStill.png");
  background1 = loadImage("assets/background1.png");
  background2 = loadImage("assets/background2.png");
  background3 = loadImage("assets/background3.png");
  background4 = loadImage("assets/background4.png");
  background5 = loadImage("assets/background5.png");
  background6 = loadImage("assets/background6.png");
  background7 = loadImage("assets/background7.png");
  background8 = loadImage("assets/background8.png");
}

// Setup function runs once at the start of the program
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  rectMode(CORNER);
  frameRate(30);
  spriteX = width / 2;
  spriteY = height / 2;
  isMovingLeft = false;
  isMovingRight = false;
  isJumping = false;
  backgrounds = [background1, background2, background3, background4, background5, background6, background7, background8];
  selectBackgrounds();
  backgroundColour = 0;
}

// Set to run 30 times a second
function draw() {
  if (state === "start") {
    startScreen();
  } 
  else if (state === "play") {
    clear();
    
    displayBackground();
    
    // Uncomment next 2 lines to show character and ground hitbox.
    // rect(spriteX, spriteY, height/hitboxScale, height/hitboxScale);
    // line(0 - 10, height * 0.63, width + 10, height * 0.63);
    
    // Draws and moves sprite.
    displaySprite();
    handleMovement();
    applyGravity();
    nextScreen();
  }
  else if (state === "dead") {
    deathScreen();
  }
}

// Makes a start screen
function startScreen() {
  push();
  background(backgroundColour);
  fill(255);
  textSize(35);
  text("click to start", width / 2, height / 2, 200, 100);
  if (mouseIsPressed && state === "start") {
    state = "play";
  }
  pop();
}

// Makes a death screen. This should never show as I have not added a way to die.
function deathScreen() {
  clear();
  background(0);
  fill(255);
  textSize(35);
  text("How did you manage this? I havent even added this", width / 2, height / 2, width/4, height/2);
}

// Selects which backgounds will be shown
function selectBackgrounds() {
  backgroundSelection = [];
  // This loops however many times the height fits into the width rounded up. It then adds random numbers used to specify which backgrounds will be displayed and in what order. 
  for (let i = 0; i < Math.ceil(width / height); i++) {
    backgroundSelection.push(Math.floor(Math.random() * backgrounds.length)); 
  }
}

// Displays the bacground image
function displayBackground() {
  
  for (let i = 0; i < Math.ceil(width / height); i++) {
    image(backgrounds[backgroundSelection[i]], height / 2 + height * i, height/2, height, height);
  }
}

// Draws Sprite depending on which way you are moving or if you are standing still.
// I know this is not the best way of changing between sprites however I did not have time to change it
function displaySprite() {
  push();
  imageMode(CORNER);
  if (isMovingLeft) {
    if (spriteTimer <= 15) {
      image(knightLeft1, spriteX, spriteY, height/spriteScale, height/spriteScale);
      spriteTimer++;
    }
    else {
      image(knightLeft2, spriteX, spriteY, height/spriteScale, height/spriteScale);
      spriteTimer++;
      if (spriteTimer === 30) {
        spriteTimer = 0;
      }
    }
  }
  else if (isMovingRight) {
    if (spriteTimer <= 15) {
      image(knightRight1, spriteX, spriteY, height/spriteScale, height/spriteScale);
      spriteTimer++;
    }
    else {
      image(knightRight2, spriteX, spriteY, height/spriteScale, height/spriteScale);
      spriteTimer++;
      if (spriteTimer === 30) {
        spriteTimer = 0;
      }
    }
  }
  else {
    image(knightStill, spriteX, spriteY, height/spriteScale, height/spriteScale);
  }
  pop();
}

// Checks if sprite should be moving and then moves the sprite
function handleMovement() {

  if (isMovingLeft) {
    spriteX -= movementSpeed;
  }
  if (isMovingRight) {
    spriteX += movementSpeed;
  }
  if (isJumping) {
    if (spriteY >= initialY - jumpHeight) {
      spriteY -= jumpSpeed;
    }
    else {
      isJumping = false;
    }
  }
}

// Sets movement variables to true based on key presses. The handleMovement function then uses these vairables for movement
function keyPressed() {
  if (key === "a") {
    isMovingLeft = true;
  }
  if (key === "d") {
    isMovingRight = true;
  }
  if (keyCode === 32 && isGrounded) {
    initialY = spriteY;
    isJumping = true;
  }
}

// Sets movement variables to false based on key release. The handleMovement function then uses these vairables for movement
function keyReleased() {
  if (key === "a") {
    isMovingLeft = false;
  }
  if (key === "d") {
    isMovingRight = false;
  }
  if (keyCode === 32) {
    isJumping = false;
  }
}

// Applies gravity and checks if you are on the ground
function applyGravity() {
  // Ground Detection
  isGrounded = collideLineRect(0 - 30, height * 0.63, width + 30, height * 0.63, spriteX, spriteY, height/hitboxScale, height/hitboxScale);
  
  if (!isGrounded && !isJumping) {
    spriteY += gravity;
  }

}

// Changes background and resets location when you run off of the screen
function nextScreen() {
  if (spriteX > width + 10) {
    spriteX = 0;
    selectBackgrounds();
    areaCounter++;
  } 
  else if (spriteX < 0 - 25) {
    spriteX = width;
    selectBackgrounds();  
    areaCounter++;
  }
}


// Added this for the fun of it and to test out mouse wheel imput
function mouseWheel() {
  if (state === "start" || state === "dead") {
    backgroundColour = random(250);
  }
}