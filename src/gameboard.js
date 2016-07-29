//THIS IS THE SERVERSIDE CODE
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var ID;
var speed;
var radius;
var health;
var direction;
var x;
var y;

var canvas = document.getElementById("myCanvas");


function victim(ID){
	this.ID = ID;
	this.health = 100;
	this.speed = 100;
	this.direction = 0;
//	this.x = Math.floor(Math.random() * 500);
	//this.y = Math.floor(Math.random() * 500);
	this.x = 200;
	this.y = 200;
}

//deals with keybaord inputs
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 38) {
    	upPressed = true;
    }
    else if(e.keyCode == 4) {
    	downPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 38) {
    	upPressed = false;
    }
    else if(e.keyCode == 4) {
    	downPressed = false;
    }
}

var players = []
players[0] = new victim(1234);



function paintPlayers() {
	for(var i = 0; i < players.length; i++) {
		//iterates through players and finds their x and y. Paints a circle.
		//also needs to remove old player locations
	}
}

//obtain keycodes
//0 is up, 1 is right, 2 is down, 3 is left 
//finish coding. s
function updatePositions() {
	for(var i = 0; i < players.length; i++) {
	    if(rightPressed && players[0].x < canvas.width ) {
	        players[0].x += 5;
	    }
	    else if(leftPressed && players[0].x > 0) {
	        players[0].x -= 5;
	    }
	    else if(upPressed && players[0].y < canvas.height) {
	        players[0].y += 5;
	    }
	    else if(downPressed && players[0].y > 0) {
	        players[0].y -= 5;
	    }
	} 
}

function draw() {
	updatePositions();
	
}

function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
	}

var counter = 0;

setInterval(updatePositions(), 100);

/*

while(counter < 100) {
	console.log("this is being called");
	console.log(document.getElementById('xcood'))
	document.getElementById('xcood').innerHTML = counter;
//	updatePositions();
	// 1. move characters
	// 2. check for collisions between players
	// 3. death events
	counter++;
	
}

*/


