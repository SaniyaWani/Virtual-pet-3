class Food{
constructor(){
  this.foodStock=0 ;//-1
  this.image=loadImage("Milk.png");
}
getFoodStock(){
 return this.foodStock;
}

updateFoodCount(stock){ 
this.foodStock=stock;
}

foodCount(){
  this.foodStock=this.foodStock-1
}
display(){
  var x=80,y=100;
  
  imageMode(CENTER);
  image(this.image,720,220,70,70);
  
  if(this.foodStock!=0){
    for(var i=0;i<this.foodStock;i++){
      if(i%10==0){
        x=80;
        y=y+50;
      }
      image(this.image,x,y,50,50);
      x=x+30;
    }
  }
}

playing()
{
  background(this.garden,500,500);
}

bathing()
{
    background(this.bathroom,500,500);
}

sleeping()
{
    background(this.bedroom,500,500);
}


} 