var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,bananaGroup;
var FoodGroup, obstacleGroup
var score
 var ground;
localStorage['HighestScore'] = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 200);
   
  
   monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running",monkey_running);
  
   
  

  monkey.scale = 0.09;
  
  ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,180,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

   score = 0;

 
  
}


function draw() {
  
background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  text ("highestScore"+localStorage['HighestScore'] ,400,50);
  
  if(gameState === PLAY){
    
  ground.velocityX = -(10 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >=145 ) {
        monkey.velocityY = -12;
        
    }
    
    console.log(monkey.y);
    
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
  
    //spawn the clouds
    spawnbanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
      monkey.velocityx = 0 ;
      
        gameState = END;
        
      
    }
  }
   else if (gameState === END) {
      
     
      
    
     
     
      ground.velocityX = 0;
      monkey.velocityx = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);    
   }
  
 
 
  monkey.collide(invisibleGround);
  
  


  drawSprites();
}

function reset(){
gameState=PLAY;
   //obstaclesGroup.destroyEach();
    bannanaGroup.setLifetimeEach(0);
  monkey.changeAnimation("running", monkey_running);
  if (monkey.isTouching(bananaGroup)){ 
    bananaGroup.destroyEach(); 
  }
  if(localStorage['HighestScore'] <score){
  
localStorage['HighestScore'] = score;
  }
  score=0;
  
}



function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,5,20);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    obstacle.addImage(obstacleImage)
              
      

   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,400,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    
 
    
    bananaGroup.add(banana);
  }

}
