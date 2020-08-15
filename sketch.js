var trex, trexRunning, ground, groundImage, count, invisibleGround, ob1, ob2, ob3, ob4, ob5, ob6, cloudsGroup, obstaclesGroup, PLAY, END, gameState, trexCollided, gameOverImg, gameOver, restart, restartImg, trexDuck, ptImg, jump, die, check

function preload(){
  trexRunning=loadAnimation('trex1.png','trex3.png','trex4.png');
  cloudImage=loadImage('cloud.png');
  ob1=loadImage('obstacle1.png');
  ob2=loadImage('obstacle2.png');
  ob3=loadImage('obstacle3.png');
  ob4=loadImage('obstacle4.png');
  ob5=loadImage('obstacle5.png');
  ob6=loadImage('obstacle6.png');
  
  groundImage=loadImage('ground2.png');
  
  trexCollided=loadImage('trex_collided.png')
  
  gameOverImg=loadImage('gameOver.png');
  restartImg=loadImage('restart.png');
  
  trexDuck=loadAnimation('trexDuck1.png','trexDuck2.png');
  
  trexPtImg=loadAnimation('trexPt1.png','trexPt2.png');
  
  jump=loadSound('jump.mp3');
  die=loadSound('die.mp3');
  check=loadSound('checkPoint.mp3');
  
}



function setup() {
  createCanvas(600, 200);
  trex=createSprite(100,180,10,40);
  trex.addAnimation("trex1",trexRunning);
  trex.scale=0.5;
  
  trex.addAnimation("trex2", trexCollided);
  
 ground = createSprite(300,180,600,20);
ground.addImage(groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(300,185,600,5);
invisibleGround.visible = false;
  
  count=0;
  
  cloudsGroup=createGroup();
  obstaclesGroup=createGroup();
  
  PLAY=1;
  END=0;
  gameState=PLAY;
  
  gameOver=createSprite(300, 100, 10, 10);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  
  
  restart=createSprite(300, 140, 10, 10);
  restart.addImage(restartImg);
  restart.scale=0.5
  restart.visible=false;
  
  
  trex.addAnimation("trex3", trexDuck);
  
  
  
  
}

function draw() {
  background(255);
  drawSprites();
  
  textFont("impact");
  textSize(20);
  text("score :"+count,480, 50);
  
  
  if(gameState===PLAY){
    
     if(count>0 && count% 0===100){
        check.play();
        }
    count=count+Math.round(getFrameRate()/60);
    
    //if (count% 200===0){
     //spawnObstacles2(); 
    //}
    
    //else{
      spawnObstacles();
    //}
  
  
    if((keyDown("space")||keyDown(UP_ARROW)) && trex.y>=159 ){
        trex.velocityY = -12 ;
      jump.play();
  }
  
    trex.velocityY = trex.velocityY + 0.8;
  
     ground.velocityX = -(6+Math.round(count/100));
  
    if (ground.x < 0){
        ground.x = ground.width/2;
    }
    
     spawnClouds();
    
    
    
    
    if (keyWentDown(DOWN_ARROW)){
     trex.changeAnimation("trex3"); 
      trex.scale=0.2;
    }
    
    if (keyWentUp(DOWN_ARROW)){
     trex.changeAnimation("trex1"); 
      trex.scale=0.5;
    }
    
     if (obstaclesGroup.isTouching(trex)){
    gameState = END;
         
    die.play();
    
  }
    
}
  
 
  
  else if(gameState === END) {
    ground.velocityX = 0;
    trex.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach (0);
    trex.changeAnimation("trex2");
    trex.scale=0.5;
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
     gameOver.visible=true;
      restart.visible=true;
    if (mousePressedOver(restart)){
      reset();
    }
    
  }
  
  trex.collide(invisibleGround);
  
  
  
  
    
  }

function reset(){
   gameOver.visible=false;
   restart.visible=false;
   gameState=PLAY;
   obstaclesGroup.destroyEach();
   cloudsGroup.destroyEach();
   trex.changeAnimation("trex1");
  trex.scale=0.5;
   count=0;
 }


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,80,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,162,10,40);
    obstacle.velocityX = -(6+Math.round(count/100));
    
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(ob1); break;
      case 2: obstacle.addImage(ob2); break;
      case 3: obstacle.addImage(ob3); break;
      case 4: obstacle.addImage(ob4); break;
      case 5: obstacle.addImage(ob5); break;
      case 6: obstacle.addImage(ob6); break;
      default: break;
            }
        
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
       
  }
 }

function spawnObstacles2(){
  if (frameCount% 30 ===0){
    var Pt=createSprite (600,Math.round(random(100,140)),40,10);
    Pt.velocityX= -(8+Math.round(count/100));
    Pt.addAnimation("trexPt",trexPtImg);
    Pt.scale=0.2;
    obstaclesGroup.add(Pt);
  }
  
}
  
  
  
  
  
  
  
  
  
  