//adding variables for my ground and trex
var trex,ground;
//adding a variable which stores the animation/image
var trex_running,trex_collided,groundImg,invisibleGround;
//adding a variable for my cloud
var cloud;
//adding a variable which stores the image
var cloudImg;
//adding a variable for the cloud group
var cloudGroup;
//adding a variable for the obstacle group
var obstacleGroup;
//adding a variable for my obstacles
var obstacles;
//adding a variable that stores my obstacles
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5,obstacle6;
//adding a variable for deathcount
var score=0;
//adding a variable for PLAY and END
var PLAY=1;
var END=0;
//adding gamestate variable and making it equal to PLAY
var gameState=PLAY;
//adding a variable for my restart, gameover, and gameoverimg
var restart, gameover, gameoverImg;
//adding and image which stores the images for my restart, gameover
var restartImg, gameoverImg;

function preload(){
 //loading my animations/image  
  trex_running=loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided=loadAnimation("trex_collided.png");
  groundImg=loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  restartImg=loadImage("restart.png");
  gameoverImg=loadImage("gameover.jpg");
}

function setup() {
  //creating a canvas
  createCanvas(windowWidth, windowHeight);
  //creating my trex sprite, adding the animations to it, and scaling it down
  trex=createSprite(1*width/15,3*height/10+10,20,20);
  trex.addAnimation("trex_run",trex_running);
  trex.addAnimation("trex_collide",trex_collided);
  trex.scale=0.5;
 
 //creating my ground sprite and adding the image to it 
  ground=createSprite(width/2,3*height/10+50,600,20);
  ground.addImage("ground",groundImg);
  ground.velocityX=-8;
  
  //creating an invisble ground sprite
  invisibleGround=createSprite(width/2,3*height/10+60,width,10);
  invisibleGround.visible=false;
  
  //creating the groups
  cloudGroup=new Group();
  obstacleGroup=new Group();
  
  //creating my restart sprite and adding the image to it 
  restart=createSprite(width/2,height/4);
  restart.addImage("restartImg",restartImg);
  restart.scale=0.5;
  
  //creating my gameover sprite and adding the image to it 
  gameover=createSprite(width/2,height/4-30);
  gameover.addImage("gameoverImg",gameoverImg);
  gameover.scale=0.15;
  
  gameover.depth=restart.depth;
  restart.depth=gameover.depth+1;
  
   //setting a collider of a circle with a radiuos of 40 
  //showing the collider
  trex.setCollider("circle",0,0,40);
  trex.debug=false;
  
}


function draw() {
background ("lightpink");
  if (gameState===PLAY){
    //changing the animation to the running trex
     trex.changeAnimation("trex_run",trex_running);
    //creating an infinite illusion
  if(ground.x<0){
    ground.x=ground.width/2
    }
    score=score+Math.round(getFrameRate()/60);
    text("score:"+score,20,20)
      //once the key "up" is pressed it will jump
  if(keyDown("up")||touches.length>0 &&trex.y>=250){
    trex.velocityY=-10;
    touches=[];
  }
     //once the trex jumps it will come back with gravity
  trex.velocityY=trex.velocityY+0.5;
    
   gameover.visible=false;
   restart.visible=false; 
    
    //calling my spawn clouds function
  spawnClouds();
  spawnObstacles(); 
   //once the trex touches the obstacle group the gamestate will change to end  
  if (trex.isTouching(obstacleGroup)){
     gameState=END;
  }
  }

if (gameState===END){
  //increasing deathcount by 1
    score++;
  //changing the animation to the still picture
    trex.changeAnimation("trex_collide",trex_collided);
  //giving the velocity to all objects as 0
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.velocityY=0;
  //making the gameover button and restart button visible in the end state
    gameover.visible=true;
    restart.visible=true;
  //setting a negative lifetime for my cloud and obstacle group so it will not stop displaying
    cloudGroup.setLifetimeEach(-100);
    obstacleGroup.setLifetimeEach(-100);
  
  if (mousePressedOver(restart)){
    gameState=PLAY;
    score=0;
    gameover.visible=false;
    restart.visible=false;
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
  }
}
  //console.log(gameState);
   //making the trex collide with the invisible ground
  trex.collide(invisibleGround);
  drawSprites();
}
function spawnClouds(){ 
   //creating my cloud sprite and adding the image to it
   //adding a random count to my clouds and the height of it
  var rand=Math.round(random(50,180));
  //console.log(rand);
  if(frameCount%130===0){
    //creating a cloud sprite
  cloud=createSprite(width,height/4,50,15);
    //adding the image
  cloud.addImage("cloud",cloudImg);
    //giving the x velocity
  cloud.velocityX=-5;
    //scaling the cloud sprite down
  cloud.scale=0.5;
    //spawing the clouds at random y points
  cloud.y=rand;  
    //creating a group for the clouds
  cloudGroup.add(cloud);  
  cloud.lifetime=90;
  }

}

  function spawnObstacles(){
    //randomly choosing the obstacles image so it spawns 
    var rand=Math.round(random(1,6));
    if(frameCount%120===0){
      //creating the obstacle sprite
      obstacle = createSprite(width,3*height/10+35,15,15);
      //scaling the obstacle sprite down
      obstacle.scale=0.5;
      //giving the obstacle sprite an x velocity
      obstacle.velocityX=-8;
      //creating a group for the obstacles
      obstacleGroup.add(obstacle)
      //using a switch so the obstacles could be spawned randomly
      switch(rand){
          case 1:obstacle.addImage("ob1",obstacle1); 
          break;
          case 2:obstacle.addImage("ob2",obstacle2); 
          break;
          case 3:obstacle.addImage("ob3",obstacle3); 
          break;
          case 4:obstacle.addImage("ob4",obstacle4); 
          break;
          case 5:obstacle.addImage("ob5",obstacle5); 
          break;
          case 6:obstacle.addImage("ob6",obstacle6); 
          break;
          default:
          break;
      }
      obstacle.debug=false;
      obstacle.lifetime=190;
  }
  }