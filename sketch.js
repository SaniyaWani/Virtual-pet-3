//Create variables here
var dog, happyDog, database, foodS,food,stock,time,lastFed;
var dogImage, dogImage1,feed,addFood,foodStock;


function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  dogImage1 = loadImage("dogImg1.png");
}

function setup()  
{

  createCanvas(500, 500);
  
  database = firebase.database();

  foodStock=database.ref('Food'); //on listening
  foodStock.on("value",readStock);

     food = new Food();
//   food.getFoodStock();
//  food.updateFoodCount(stock);
  dog = createSprite(250,300,20,20);
  dog.addImage(dogImage); 
  dog.scale=0.2

  feed = createButton("feed",100,100);
  feed.position(600,60);
  feed.mousePressed(feedDog);


  addFood = createButton("Add_food");
  addFood.position(500,60);
  addFood.mousePressed(addFoods)
    //Stroke(5);
       
  
}


function draw() 
{  

  background(46, 139,87);

  if(keyWentDown(UP_ARROW))
 {
 food.foodCount();
   dog.addImage(dogImage1);
 }

 var gameStateRef  = database.ref('gameState');
 gameStateRef.on("value",function(data){
    gameState = data.val();
 })

 time=database.ref('feedTime',);
 time.on('value',function(data){
  lastFed=data.val();
});

currentTime=hour();
if(currentTime==lastFed+1){
 
  buttonHide();
  update("playing");
  food.playing();
}else if(currentTime==lastFed+2){
  
  buttonHide();
  update("sleeping");
  food.sleeping();
}else if(currentTime>lastFed+2 && currentTime<=lastFed+3){
 
  buttonHide();
  update("bathing");
  food.bathing();
}else{
  update("Hungry");
  food.display();
  drawSprites();
}

if(gameState!="Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}else{
  feed.show();
addFood.show();
dog.addImage(dogImage);
}

  
 
  //add styles here
  fill("white");
  textSize(26);
  text("Last feed:"+lastFed,300,30);
}

function readStock(data)
{
  foodS = data.val(); //1
  food.updateFoodCount(foodS);
}

function update(state){
  database.ref('/').update({
    gameState: state
  });
}

function addFoods(){
foodS++; //1 +1
database.ref('/').update({
  Food :foodS  
});
}

  function feedDog(){
     
    food.updateFoodCount(food.getFoodStock()-1);
    database.ref('/').update({
      Food :food.getFoodStock(),
      feedTime: hour()
    });


//food.updateFoodCount(food.getFoodStock()-1);
//database.ref('/').update({
 // Food :food.getFoodStock()
//});
}
