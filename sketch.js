var ghost, ghostImg;
var door, doorImg, doorsGroup;
var tower, towerImg;
var climber, climberImg, climbersGroup;
var invisibleBlock, invisibleBlockGroup;
var sound;
var gameState = "play";
var PLAY = 0;
var END = 1;

function preload() {

  towerImg = loadImage("tower.png");

  doorImg = loadImage("door.png");

  climberImg = loadImage("climber.png");

  ghostImg = loadImage("ghost-standing.png");
  
  sound = loadSound("spooky.wav");


  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function setup() {

  createCanvas(600, 600);
  
  sound.loop();

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 3;

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;

}

function draw() {

  background(0);

  if (gameState === "play") {

    if (tower.y > 400) {
      tower.y = 300;
    }

    if (keyDown("space")) {
      ghost.velocityY = -10;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if (keyDown("left")) {
      ghost.x = ghost.x - 3;
    }

    if (keyDown("right")) {
      ghost.x = ghost.x + 3;
    }
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }

    
    spawnDoors();
  }
  if (gameState === "end") {
    textSize(30)
    fill("skyblue")
    text("Game Over", 300, 300);
    }

  drawSprites()

}

function spawnDoors() {

  if (World.frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);


    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.x = Math.round(random(120, 400))

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    invisibleBlock.debug = true;

    climber.x = door.x
    invisibleBlock.x = door.x;
    invisibleBlock.width = climber.width;

    invisibleBlock.height = 2;

    ghost.depth = climber.depth;
    ghost.depth = climber.depth + 1;


    doorsGroup.add(door);
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

  }
}