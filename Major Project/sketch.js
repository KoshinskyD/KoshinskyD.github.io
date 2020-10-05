// spritess
let sprites;
let knightLeft1, knightRight1, knightLeft2, knightRight2, knightStill;

// Background managment.
let background1, background2, background3, background4, background5, background6, background7, background8;
let backgrounds = [];
let backgroundSelection = [];
let backgroundColour;

// Counters used to change between sprites, screens/gamestates, and locations
let state = "play";
let areaCounter = 1;

// Inventory
let sideBarScale = 5+1/3;
// first is equiped second and third are your inventory
let inventory = [[1, 3, 4], [1, 3, 4], [1, 3, 4]];

// Player managment
let character;
class Player {
  constructor(sprites) {
    this.health = 100;
    this.playerDamage = 100;
    this.monsterKills = 0;
    
    
    //sprite managment
    this.playerSprite = sprites;
    this.spriteSelector = 0;
    this.hitboxScale = 9;
    this.spriteScale = 9;
    
    // Movement
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isGrounded = false;
    this.isJumping = false;
    this.movementSpeed = 10;
    this.jumpHeight = 100;
    this.jumpSpeed = 12;
    this.gravity = 5;
    this.initialY;
    this.x;
    this.y;


  }
  // Draws Sprite depending on which way you are moving or if you are standing still.
  displaySprite() {
    push();
    imageMode(CORNER);
    if (this.isMovingLeft) {
      if (frameCount % 30 >= 15 && this.spriteSelector !== 1) {
        this.spriteSelector = 1;
      }
      else if (frameCount % 30 < 15){
        this.spriteSelector = 2;
      }
    }
    else if (this.isMovingRight) {
      if (frameCount % 30 >= 15 && this.spriteSelector !== 3) {
        this.spriteSelector = 3;
      }
      else if (frameCount % 30 < 15){
        this.spriteSelector = 4;
      }
    }
    else {
      this.spriteSelector = 0;
    }
    image(this.playerSprite[this.spriteSelector], this.x, this.y, height/this.spriteScale, height/this.spriteScale);
    pop();
  }

  // Checks if sprite should be moving and then moves the sprite
  handleMovement() {
    if (this.isMovingLeft) {
      this.x -= this.movementSpeed;
    }
    if (this.isMovingRight) {
      this.x += this.movementSpeed;
    }
    if (this.isJumping) {
      if (this.y >= this.initialY - this.jumpHeight) {
        this.y -= this.jumpSpeed;
      }
      else {
        this.isJumping = false;
      }
    }
  }

  // Applies gravity and checks if you are on the ground
  applyGravity() {
    // Ground Detection
    this.isGrounded = collideLineRect(0 - 30, height * 0.63, width + 30, height * 0.63, this.x, this.y, height/this.hitboxScale, height/this.hitboxScale);
    
    if (!this.isGrounded && !this.isJumping) {
      this.y += this.gravity;
    }
  }

  // Changes background and resets location when you run off of the screen
  nextScreen() {
    let direction;
    // right side of the screen
    if (this.x > width-width/sideBarScale + 20) { // 20 is a buffer so it isnt instant and player can run off screeen
      this.x = 0;
      selectBackgrounds();
      areaCounter++;
      direction = "left";
      spawnEnemies(direction);
    } 
    // left side of the screen
    else if (this.x < 0 - 25) {
      this.x = width-width/sideBarScale;
      selectBackgrounds();  
      areaCounter++;
      direction = "right";
      spawnEnemies(direction);
    }
  }
}

// Enemy managment
let enemies = [];
class Enemy {
  constructor(area, enemyType, x, direction) {
    this.enemyHealth = 100 * area;
    this.enemyDamage = 10;
    this.x = x;
    this.scale = 15; // bigger number is a smaller enemy
    this.spriteSize = height/this.scale;
    this.y = height*0.63 - this.spriteSize; // on the ground
    this.direction = direction;
    this.speed = 2 * area;
  }
  // Displays enemy
  display() {
    push();
    fill("blue");
    rect(this.x, this.y, this.spriteSize, this.spriteSize);
    pop();
  }
  // Moves enemy
  move() {
    if (this.x > 0 && this.direction === "left"){
      this.x -= this.speed;
    }
    else if (this.x <= 0 && this.direction === "left") {
      this.direction = "right";
    }
    
    if (this.x < width-width/sideBarScale - this.spriteSize && this.direction === "right"){
      this.x+= this.speed;
    }
    
    else if (this.x >= width-width/sideBarScale - this.spriteSize && this.direction === "right") {
      this.direction = "left";
    }
    
  }
  // Checks if you are coliding with the player
  checkCollision(character) {
    if (this.x <= character.x + 5 && this.x >= character.x - 5 && this.y <= character.y + height/character.hitboxScale) {
      character.health -= this.enemyDamage;
    }
  }
}

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
  
  backgrounds = [background1, background2, background3, background4, background5, background6, background7, background8];
  selectBackgrounds();
  backgroundColour = 0;
  sprites = [knightStill, knightLeft1, knightLeft2, knightRight1, knightRight2];
  character = new Player(sprites);
  character.x = width / 2;
  character.y = height / 2;
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
    // rect(character.x, character.y, height/hitboxScale, height/hitboxScale);
    // line(0 - 10, height * 0.63, width + 10, height * 0.63);
    
    // Draws and moves sprite.
    character.displaySprite();
    character.handleMovement();
    character.applyGravity();
    character.nextScreen();

    displaySideBar();

    handleEnemies();
    if (character.health < 0) {
      state = "dead";
    }
  }
  else if (state === "dead") {
    deathScreen();
  }
}

// Makes a start screen
function startScreen() {
  enemies = [];
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
  background(backgroundColour);
  fill(255);
  textSize(35);
  text("You Died", width / 2, height / 2, width/4, height/2);
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

// handles all enemy actions ex.(displaying, moving, attacking, etc.)
function handleEnemies() {
  for(let i = 0; i < enemies.length; i++) {
    enemies[i].display();
    enemies[i].move();
    enemies[i].checkCollision(character);    
  }
}

// Sets movement variables to true based on key presses. The handleMovement function then uses these vairables for movement
function keyPressed() {
  if (key === "a") {
    character.isMovingLeft = true;
  }
  if (key === "d") {
    character.isMovingRight = true;
  }
  if (keyCode === 32 && character.isGrounded) {
    character.initialY = character.y;
    character.isJumping = true;
  }
}

// Sets movement variables to false based on key release. The handleMovement function then uses these vairables for movement
function keyReleased() {
  if (key === "a") {
    character.isMovingLeft = false;
  }
  if (key === "d") {
    character.isMovingRight = false;
  }
  if (keyCode === 32) {
    character.isJumping = false;
  }
}

// spawns enemies
function spawnEnemies(direction) {
  enemies = [];
  for (let i = 0; i < areaCounter; i++) {
    enemies.push(new Enemy(areaCounter, 1, random(width * 0.33, width * 0.66), direction));
  }
}

// Draws the sidebar and fills it with data
function displaySideBar() {
  push();
  // Grey Sidebar
  fill("grey");
  rect(width-width/sideBarScale, 0, width/sideBarScale, height);
  // Area Counter
  fill("black");
  textAlign(CENTER);
  textSize(width/64);
  text("Area: " + areaCounter, width - width/sideBarScale /2, height/15.75);

  // Character display.
  rectMode(CENTER);
  fill(180);
  rect(width - width/sideBarScale /2, height/6.312, height/6.5, height/6.5, 10);
  image(knightStill, width - width/sideBarScale /2, height/6.312, height/10, height/10);

  // Health
  rectMode(CORNER);
  rect(width - width/sideBarScale + width/32, height/ 3, width/8, 20);
  if(character.health > 66) {
    fill("green");
  }
  else if (character.health > 33) {
    fill("orange");
  }
  else {
    fill("red");
  }
  // eslint-disable-next-line no-extra-parens
  rect(width - width/sideBarScale + width/32, height/ 3, (character.health * (width/8) ) /100, 20);
  
  // Inventory
  displayInventory();
  pop();
}

function displayInventory() {
  rectMode(CENTER);
  for(let y = 0; y < inventory.length; y++) {
    for(let x = 1; x < inventory[y].length+1; x++) {
      fill("black");
      rect(width-width/sideBarScale + 60 * x, height/2.8 + 60 * y, 50, 50, 15);
    }
  }
}