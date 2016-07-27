//set up the instance of the engine on the page
//var Q = Quintus()
//	.include("Sprites, Scenes, Input") //what quintus is using
//	.setup({width: 800, height: 600, ScaleToFit: true}); //the dimensions of the page are 800 pixels wide, 600 pixels high, and they fit the users device

//some method that deals with a new player entering the game
//calls var newPlayer 1 = new victim('some ID');

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
	this.x = Math.floor(Math.random() * 9999);
	this.y = Math.floor(Math.random() * 9999);
}






var players = new Array();
players[0] = new victim(1234);
console.log(players[0].ID);


function paintPlayers() {
	for(var i = 0; i < players.length; i++) {
		//iterates through players and finds their x and y. Paints a circle.
		//also needs to remove old player locations
	}

}

var run = function() {
	
	var victim1 = new victim();
	var height = 10000;
	var width = 10000;
	
	var objectArray = [];
	objectArray.push(victim);
	
}


//0 is up, 1 is right, 2 is down, 3 is left 
//test
var updatePositions = function() {
	for(var i = 0; i < objectArray.size(); i++) {
		var direction = objectArray[i].direction;
		switch(direction) {
			
		}
	}
}




