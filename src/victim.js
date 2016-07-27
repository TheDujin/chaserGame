var ID;
var speed = 100;
var health = 100;
var direction = 0;
var x = Math.randomInt();
var y;

function victim(ID){
	this.ID = ID;
	this.health = 100;
	this.speed = 100;
	this.direction = 0;
	this.x = Math.randomInt(9999);
	this.y = Math.randomInt(9999);
}

victim.method('setValue', function (value) {
	
});

