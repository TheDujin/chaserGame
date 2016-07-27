var ID;
var speed;
var health;
var direction;
var x;
var y;

function victim(ID){
	this.ID = ID;
	this.health = 100;
	this.speed = 100;
	this.direction = 0;
	this.x = Math.floor(Math.random() * 9999);
	this.y = Math.floor(Math.random() * 9999);
}