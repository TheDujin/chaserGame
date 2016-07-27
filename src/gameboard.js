//set up the instance of the engine on the page
//var Q = Quintus()
//	.include("Sprites, Scenes, Input") //what quintus is using
//	.setup({width: 800, height: 600, ScaleToFit: true}); //the dimensions of the page are 800 pixels wide, 600 pixels high, and they fit the users device

//some method that deals with a new player entering the game
//calls var newPlayer 1 = new victim('some ID');

//this while loop runs the game!


while(1) {
	updatePositions();
	// 1. move characters
	// 2. check for collisions between players
	// 3. death events
	
	
}

	

document.onkeydown = function(event) {
	var key_press = String.fromCharCode(event.keyCode);
	var key_code = event.keyCode;
	document.getElementById('kp').innerHTML = key_press;
    document.getElementById('kc').innerHTML = key_code;
	var status = document.getElementById('status');
}
document.onkeyup = function(event){
    var key_press = String.fromCharCode(event.keyCode);
	var status = document.getElementById('status');
	status.innerHTML = "UP Event Fired For : "+key_press;
}


var ID;
var speed;
var radius;
var health;
var direction;
var x;
var y;

function victim(ID){
	this.ID = ID;
	this.health = 100;
	this.speed = 100;
	this.direction = 0;
	this.x = Math.floor(Math.random() * 500);
	this.y = Math.floor(Math.random() * 500);
}

var players = new Array();
players[0] = new victim(1234);

function paintPlayers() {
	for(var i = 0; i < players.length; i++) {
		//iterates through players and finds their x and y. Paints a circle.
		//also needs to remove old player locations
	}
}

//obtain keycodes
//0 is up, 1 is right, 2 is down, 3 is left 
//finish coding. 
var updatePositions = function() {
	for(var i = 0; i < players.size(); i++) {
		var direction = players[i].direction;
		switch(direction) {
			case 0:
				players[i].y += [i].speed;
			case 1:
				players[i].x += players[i].speed; 
			case 2:
				players[i].y -= players[i].speed; 
			case 3:
				players[i].x -= players[i].speed; 
		}
		document.getElementById('xcood').innerHTML = players[i].x;
		document.getElementById('ycood').innerHTML = players[i].y;
		
	}
}

var collisionCheck = function() {
	//for 
}




