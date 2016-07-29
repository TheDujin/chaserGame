var ID;
var speed;
var health;
var direction;
var x;
var y;


function chaser(ID){
	this.ID = ID;
	this.health = 1;
	this.speed = 120;
	this.direction = 0;
	this.x = Math.floor(Math.random() * 50);
	this.y = Math.floor(Math.random() * 50);
}
