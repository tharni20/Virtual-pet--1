var database;
var dog;
var foodS;

function preload(){
    dogimg=loadImage("aDog.png");
    happydogimg=loadImage("happydog.png");

}

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    dog = createSprite (300,300,30,40);
    dog.addImage(dogimg);
    dog.scale = 0.2

    foodStock=database.ref('Food');
    foodStock.on("value",readStock);

}

function draw(){
    background("white");
    text ("food:"+foodS,200,50);

    if(keyWentDown(UP_ARROW)){
        dog.addImage(happydogimg);
        writeStock(foodS);
    }
    
    drawSprites();
}

function readStock(data){
    foodS=data.val();
}

function writeStock(x){

    if(x<=0){
        x=0;
    }else{
        x=x-1
    }

database.ref('/').update({
    Food:x
})
}