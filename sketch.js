var dog, happyDog, database, foodS, foodStock, dogRegular;

var feedPet, addFood;

var fedTime, lastFed;
var foodObj

function preload()
{
  dogRegular = loadImage("image/dogImg1.png");
  happyDog = loadImage("image/dogImg.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();


  foodStock = database.ref('Food');
  foodStock.on("value", function(data){
    foodS = data.val();
  });
  
  dog = createSprite(200, 300);
  dog.addImage(dogRegular)
  dog.scale = 0.2;

  foodObj = new Food();

  feedPet = createButton("Feed the Dog");
  feedPet.position(600, 95);
  feedPet.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(700, 95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);


  textSize(22);
  fill("red");
  text(foodS, 50, 50);


  drawSprites();

  foodObj.display();

  feedTime = database.ref('FeedTime');
  feedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed: " + lastFed%12 + "PM", 350,  30 );
  } else if(lastFed == 0){
    text("Last Feed: 12 AM", 350,  30 );
  } else {
    text("Last Feed: " + lastFed + "AM", 350, 30);
  }
  

}

function writeStock(x){

  if(x<=0){
    x=0
  } else {
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    feedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}


