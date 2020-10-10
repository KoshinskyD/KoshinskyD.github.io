
// Background managment.
let background1, background2, background3, background4, background5, background6, background7, background8;
let backgrounds = [];
let backgroundSelection = [];
let backgroundColour;

// Counters used to change between sprites, screens/gamestates, and locations
let state = "play";
let areaCounter = 1;

// Inventory
// ITMES
// Weapons
let weapons = new Map();
weapons.set("Stick", [50, "brown"]);
weapons.set("Wooden Sword", [150, "red"]);
weapons.set("Sharp Blade", [180, "silver"]);
weapons.set("Crystal Sword", [300, "blue"]);
weapons.set("Ancient Stone Sword", [1200, "grey"]);
let weaponsKey = ["Stick", "Wooden Sword", "Sharp Blade", "Crystal Sword", "Ancient Stone Sword"];
let weaponLevel = 0;
// Potions
let healthPotionSprite;
let healthPotion = {
  hp: 50,
 
};

class Items {
  constructor() {
    sprite;
    isBeingDragged = false;
  }
}

// inventory[0] is what is equiped inventory[1] and inventory[2] are your inventory
// inventory[0][0] is weapon, inventory[0][1] is armour, inventory[0][2] is ring 
let inventory = [[weaponsKey[0], "armour", "ring"], [healthPotion, healthPotion, healthPotion], [healthPotion, healthPotion, healthPotion]];
let sideBar; 
class PlayerMenu {
  constructor(sprites) {
    this.sideBarScaler = height/789;
    this.sideBarWidth = width/ (5+1/3);
    this.sprite = sprites[0];
    this.spriteY = height/6;
    this.inventoryCellSize = 50 * this.sideBarScaler;
    this.cellLocation = [];
    this.cellX;
    this.cellY;
  }

  // Grey sidebar, sprite, text
  display() {
    push();
    // Grey Sidebar
    fill("grey");
    rect(width-this.sideBarWidth, 0, this.sideBarWidth, height);

    // Displaying all text. Area counter, Kill counter
    fill("black");
    textAlign(CENTER);
    textSize(25 * this.sideBarScaler);
    text("Area: " + areaCounter, width - this.sideBarWidth /2, 50 * this.sideBarScaler);
    text("Kills:" + character.enemyKills, width - this.sideBarWidth / 2, 230 * this.sideBarScaler);
  
    // Character display.
    rectMode(CENTER);
    fill(180);
    rect(width - this.sideBarWidth/2, this.spriteY, 135* this.sideBarScaler, 135* this.sideBarScaler, 10);
    image(this.sprite, width - this.sideBarWidth/2, this.spriteY, 100 * this.sideBarScaler, 100 * this.sideBarScaler);
    pop();

  }

  // health bar
  healthBar() {
    // Health
    rectMode(CORNER);
    fill(180);
    //outline
    rect(width - this.sideBarWidth + 50 * this.sideBarScaler, 265 * this.sideBarScaler, 200 * this.sideBarScaler, 20 * this.sideBarScaler);
    if(character.health > 66) {
      fill("green");
    }
    else if (character.health > 33) {
      fill("orange");
    }
    else {
      fill("red");
    }

    if (character.health < 0 && state === "play") {
      state = "dead";
    }
    // Health amount
    // eslint-disable-next-line no-extra-parens
    rect(width - this.sideBarWidth + 50 * this.sideBarScaler, 265 * this.sideBarScaler, (character.health * (200 * this.sideBarScaler) ) /100, 20 * this.sideBarScaler);
  }

  // Inventory
  displayInventory() {
    push();
    fill("black");
    rect(width - 240 * this.sideBarScaler, 290 * this.sideBarScaler, 190* this.sideBarScaler, 70 * this.sideBarScaler, 15);

    // hotbar/equiped items
    fill("white");
    for(let x = 1; x < inventory[0].length+1; x++) {
      let equipedCellX = width - 290*this.sideBarScaler + (this.inventoryCellSize + this.inventoryCellSize/5) * x;
      let equipedCellY = 300 * this.sideBarScaler;
      rect(equipedCellX, equipedCellY, this.inventoryCellSize, this.inventoryCellSize, 15);
    }
    
    // box surrounding inventory
    fill("black");
    rect(width - 240 * this.sideBarScaler, 375 * this.sideBarScaler, 190 * this.sideBarScaler, 130 * this.sideBarScaler, 15);

    // boxes for inventoy slots
    rectMode(CORNER);
    fill("white");
    for(let y = 1; y < inventory.length; y++) {
      for(let x = 1; x < inventory[y].length+1; x++) {

        let cellX = width - 290*this.sideBarScaler + (this.inventoryCellSize + this.inventoryCellSize/5) * x;
        let cellY = 325 *this.sideBarScaler + (this.inventoryCellSize + this.inventoryCellSize/5) * y;
        rect(cellX, cellY, this.inventoryCellSize, this.inventoryCellSize, 15);

        if (this.cellLocation.length < 6) {
          this.cellLocation.push([cellX, cellY]);
        }
      }

    }
    pop();
    // console.log(this.cellLocation);
  }

  // Items
  displayItems(){
    // weapon 
    push();
    if (inventory[0][0] !== " ") {
      let equipedCellX = width - 290*this.sideBarScaler + (this.inventoryCellSize + this.inventoryCellSize/5) * 1;
      let equipedCellY = 300 * this.sideBarScaler;
      fill(weapons.get(inventory[0][0])[1]);
      rect(equipedCellX, equipedCellY, this.inventoryCellSize, this.inventoryCellSize, 15);
    }

    // inventory slots 1-6
    let cellCounter = 0;
    for (let y = 1; y < inventory.length; y++) {
      for (let x = 0; x < inventory[y].length; x++) {
        if (inventory[y][x] === healthPotion && !healthPotion.isBeingDragged) {
          fill(255, 0, 0);
          image(healthPotion.healthPotionSprite, this.cellLocation[cellCounter][0] + this.inventoryCellSize/2, this.cellLocation[cellCounter][1] + this.inventoryCellSize/2, 30, 30)
        }
        if (inventory[y][x] === "Damage Potion" && !this.isBeingDragged) {
          fill(0, 255, 0);
          ellipse(this.cellLocation[cellCounter][0] + this.inventoryCellSize/2, this.cellLocation[cellCounter][1] + this.inventoryCellSize/2, 20);
        }
        cellCounter++;
      }
    }

    // Moving items
    pop();
  }

  // moveItems(startLocation, endLocation) {
  // }

  // Use Items
  useItem(inventorySlot) {
    let y;
    if (inventorySlot > 2) {
      y = 2;
    }
    else {
      y = 1;
    }
    if (inventory[y][inventorySlot % 3] === healthPotion) {
      if (character.maxHealth - character.health >= 50) {
        character.health += healthPotion.hp;
      }
      else{
        character.health = character.maxHealth;
      }
      inventory[y][inventorySlot % 3] = " ";
    }

    if (inventory[y][inventorySlot % 3] === "Damage Potion") {
      character.health -= 50;
      inventory[y][inventorySlot % 3] = " ";
    }
  }
  
}

// Player managment
let sprites = [];
let knightLeft1, knightRight1, knightLeft2, knightRight2, knightStill;
let character;
class Player {
  constructor(sprites, inventory) {
    this.health = 100;
    this.maxHealth = this.health;
    this.weapon = weapons.get(inventory[0][0]);
    this.playerDamage = 1 * this.weapon[0];
    this.enemyKills = 0;
    this.equipedWeapon = inventory[0];
    
    
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
    if (this.isMovingLeft && this.x > - height/this.spriteScale) {
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
    this.isGrounded = collideLineRect(0 - 50, height * 0.63, width + 30, height * 0.63, this.x, this.y, height/this.hitboxScale, height/this.hitboxScale);
    
    if (!this.isGrounded && !this.isJumping) {
      this.y += this.gravity;
    }
  }

  // Changes background and resets location when you run off of the screen
  nextScreen() {
    let direction;
    // right side of the screen
    if (this.x > width - sideBar.sideBarWidth + 20) { // 20 is a buffer so it isnt instant and player can run off screeen
      this.x = 0;
      selectBackgrounds();
      areaCounter++;
      direction = "left";
      spawnEnemies(direction);
    } 
    // left side of the screen
    else if (this.x < 0 - 25) {
      this.health --;

    }
  }

  attack() {
    ellipse(this.x + height/this.spriteScale / 2, this.y + height/this.spriteScale / 2, 2.5 * height/this.hitboxScale);

    for (let i = 0; i < enemies.length; i++) {

      if (collideRectCircle(enemies[i].x, enemies[i].y, enemies[i].spriteSize, enemies[i].spriteSize, // enemy location
                            this.x + height/this.spriteScale / 2, this.y + height/this.spriteScale / 2, 2.5 * height/this.hitboxScale)) { // attack hitbox

        enemies[i].health -= this.playerDamage;
      }
    }
  }
}

// Enemy managment
let enemies = [];
class Enemy {
  constructor(area, enemyType, x, direction) {
    // Health and Damage
    this.area = area;
    this.health = 100 * this.area;
    this.maxHealth = this.health;
    this.enemyDamage = 10 + areaCounter * 2;

    // Size
    this.scale = 15; // bigger number is a smaller enemy
    this.spriteSize = height/this.scale;
    
    // location
    this.y = height*0.63 - this.spriteSize; //Places the enemy on the ground
    this.x = x;

    // Enemy Movement
    this.direction = direction;
    this.speed = 2 * (this.area-2);

    this.colour = "blue";
  }
  // Displays enemy
  display() {

    // blue rectangles as enemy placeholders
    fill(this.colour);
    rect(this.x, this.y, this.spriteSize, this.spriteSize);

    // healthbar
    // outline
    // fill(180);
    noFill();
    rect(this.x, this.y - 15, this.spriteSize, 10);

    // Health amount
    if(this.health > 66 * this.area) {
      fill("green");
    }
    else if (this.health > 33 * this.area) {
      fill("orange");
    }
    else {
      fill("red");
    }
    rect(this.x, this.y - 15, this.health * this.spriteSize / this.maxHealth, 10);

  }
  // Moves enemy
  move() {
    if (this.x > 0 && this.direction === "left"){
      this.x -= this.speed;
    }
    else if (this.x <= 0 && this.direction === "left") {
      this.direction = "right";
    }
    
    if (this.x < width - sideBar.sideBarWidth - this.spriteSize && this.direction === "right"){
      this.x+= this.speed;
    } 
    
    else if (this.x >= width - sideBar.sideBarWidth - this.spriteSize && this.direction === "right") {
      this.direction = "left";
    }
    
  }

  // Checks if you are coliding with the player
  checkCollision(character) {
    if (this.x <= character.x + 5 && this.x >= character.x - 5 && this.y <= character.y + height/character.hitboxScale) {
      character.health -= this.enemyDamage;
    }
  }

  // Returns true and ups the kill counter if you kill an enemy
  isDead() {
    if (this.health <= 0) {
      character.enemyKills++;
      if (character.health < character.maxHealth){
        character.health += 5;
      }

      if (character.enemyKills % 5 === 1 && weaponLevel < weaponsKey.length-1) {
        weaponLevel++;
        inventory[0].splice(0, 1, weaponsKey[weaponLevel]);
      }

      return true;
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
  healthPotion.healthPotionSprite = loadImage("assets/healthPotion.png")
}

// Setup function runs once at the start of the program
function setup() {
  if (windowHeight*2 > windowWidth) {
    createCanvas(windowWidth, windowWidth/2);
  }
  else{
    createCanvas(windowHeight*2 , windowHeight);
  }
  imageMode(CENTER);
  rectMode(CORNER);
  frameRate(30);
  
  backgrounds = [background1, background2, background3, background4, background5, background6, background7, background8];
  selectBackgrounds();
  backgroundColour = 0;
  sprites = [knightStill, knightLeft1, knightLeft2, knightRight1, knightRight2];
  character = new Player(sprites, inventory);
  sideBar = new PlayerMenu(sprites);
  character.x = width / 2;
  character.y = height / 2;
  console.log(character.weapon);
  console.log(character.playerDamage);
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
    

    handleEnemies();

    handleSidebar();

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
  for(let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].display();
    enemies[i].checkCollision(character);
    enemies[i].move();
    if(enemies[i].isDead()) {
      enemies.splice(i, 1);
    }    

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

// Attacks when mouse is pressed
function mousePressed() {
  if (state === "play" && mouseX < width - sideBar.sideBarWidth){
    character.attack();
  }
}

function doubleClicked() {
  for (let i = 0; i < sideBar.cellLocation.length; i++) {
    if (mouseX > sideBar.cellLocation[i][0] && mouseX < sideBar.cellLocation[i][0] + sideBar.inventoryCellSize &&
      mouseY > sideBar.cellLocation[i][1] && mouseY < sideBar.cellLocation[i][1] + sideBar.inventoryCellSize) {
      console.log(i);
      console.log(inventory);
      sideBar.useItem(i);
    }
  }
}

// spawns enemies
function spawnEnemies(direction) {
  enemies = [];
  for (let i = 0; i < areaCounter; i++) {
    enemies.push(new Enemy(areaCounter, 1, random(width * 0.33, width * 0.66), direction));
  }
}

// displays sidbar and info on it
function handleSidebar(){
  sideBar.display();
  sideBar.healthBar();
  sideBar.displayInventory();
  sideBar.displayItems();
}