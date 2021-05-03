
var playerIMG;

var enemy;
var enemyIMG;
var enemyGRP;

var spike;
var spikeIMG;
var spikeGRP;

var heart;
var heartIMG;
var heartGRP;

//var backround;
//var backroundIMG;
//cant find a backround lmao

var ground;
var groundIMG;

var score;
var health=3;

var PLAY=1
var END=0

var gameState=PLAY

function preload(){
  enemyIMG=loadImage("Bat.png");

  spikeIMG=loadImage("Spike.png");
  
  heartIMG=loadImage("Heart.png");
  
  groundIMG=loadImage("DIIIIIIIIIIRRRRRRRRRRRRTTTTTTTTT.PNG");

  playerIMG=loadImage("player.png");
}

function setup() {
  createCanvas(400,200);
  
  player=createSprite(50,160,20,50);
  player.addImage(playerIMG)
  player.scale = 0.3;
  
  ground=createSprite(200,180,400,20)
  ground.addImage(groundIMG);
  ground.x=ground.width/2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  enemyGRP=createGroup();
  spikeGRP=createGroup();
  heartGRP=createGroup();
  
  health=3;
  score=0;
}

function draw() {
 background("brown");
  
  player.depth=ground.depth
  player.depth=player.depth+1;
  
  text("Health:"+ health,5,15);
  
  if(gameState === PLAY){

    camera.position.x=player.x;

    //gameOver.visible = false;
    //restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& player.y >= 100) {
        player.velocityY = -8;
    }
    
    //add gravity
    player.velocityY = player.velocityY + 0.8
  
    //spawn the clouds
    spawnEnemys();
  
    //spawn obstacles on the ground
    spawnSpikes();
    
    //spawn the hearts
    spawnHearts();
    
    if(spikeGRP.isTouching(player)){
       health=health-1; 
       spikeGRP.destroyEach();
    }
    if(enemyGRP.isTouching(player)){
      health=health-1;
      enemyGRP.destroyEach();
    }
    if(heartGRP.isTouching(player)){
      health=health+1;
      heartGRP.destroyEach();
    }
    
    if(health===0){
      gameState=END;
    }
  }
   else if (gameState === END) {
      //gameOver.visible = true;
      //restart.visible = true;
     
     //change the trex animation
      //trex.changeAnimation("collided", trex_collided);
    
     
     
      ground.velocityX = 0;
      player.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    spikeGRP.setLifetimeEach(-1);
    enemyGRP.setLifetimeEach(-1);
    heartGRP.setLifetimeEach(-1);
     
     spikeGRP.setVelocityXEach(0);
     enemyGRP.setVelocityXEach(0);
     heartGRP.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down
  player.collide(invisibleGround);
  
  //if(mousePressedOver(restart)) {
      //reset();
    //}


  
  drawSprites();
}

function spawnSpikes(){
 if (frameCount % 60 === 0){
   var spike = createSprite(600,180,10,40);
   spike.velocityX = -(6 + score/100);
   spike.addImage(spikeIMG)
   
    //assign scale and lifetime to the obstacle           
    spike.scale = 0.5;
    spike.lifetime = 300;
   
   //add each obstacle to the group
    spikeGRP.add(spike);
 }
}

function spawnEnemys() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var enemy = createSprite(600,120,40,10);
    enemy.y = Math.round(random(30,100));
    enemy.addImage(enemyIMG);
    enemy.scale = 0.5;
    enemy.velocityX = -3;
    
     //assign lifetime to the variable
    enemy.lifetime = 200;
    
    //adjust the depth
    enemy.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    enemyGRP.add(enemy);
  }
}

function spawnHearts() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var heart = createSprite(600,120,40,10);
    heart.y = Math.round(random(30,150));
    heart.addImage(heartIMG);
    heart.scale = 0.3;
    heart.velocityX = -3;
    
     //assign lifetime to the variable
    heart.lifetime = 200;
    
    //adjust the depth
    heart.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    heartGRP.add(heart);
  }
}






