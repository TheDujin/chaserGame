var ID;
var speed;
var health;
var direction;
var x;
var y;
var score;
var radius;

function victim(ID){
	this.radius = 4;
	this.score = 0;
	this.ID = ID;
	this.health = 1;
	this.speed = 100;
	this.direction = 0;
	this.x = Math.floor(Math.random() * 50);
	this.y = Math.floor(Math.random() * 50);
}