var dog,sadDog,happyDog,database;
var foodS,foodStock;
var addFood;
var foodObject;
var bgImg, bg;

//create feed and lastFed variable here
var feed, lastFed

function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
bgImg=loadImage("Images/lol.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  

  bg=createSprite(855,200,1000,400);
  bg.addImage(bgImg);

  

  foodObject = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(855,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)



}

function draw() {
  background(46,139,87);
  foodObject.display();

  //write code to read fedtime value from the database 
 
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
lastFed=data.val()
  })
  
 
  //write code to display text lastFed time here

  fill(255,255,255)

  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12+"PM",350,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  }else{
    text("Last Feed: "+ lastFed+"AM",350,30)
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObject.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObject.getFoodStock();
  if(food_stock_val <= 0){
    foodObject.updateFoodStock(food_stock_val * 0);
  }else{
    foodObject.updateFoodStock(food_stock_val -1);
  }

  database.ref('/').update({
    Food:foodObject.getFoodStock(),
      FeedTime:hour()
    
  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}