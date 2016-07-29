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


var players = [];
players[0] = new victim(1234);


var arrayw = 50;
var arrayh = 50;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle="#736AFF";
ctx.fillRect(0,0,600,600);

var arenaarray = new Array(50);
for(var z = 0; z < 50; z++) {
	arenaarray[z] = new Array(50);
}
for(var q = 0; q < 50; q++) {
	for(var r = 0; r < 50; r++) {
		arenaarray[q][r] = 0;
	}
}

//draws top border
for(var z = 0; z < 50; z++) {
	arenaarray[z][0] = 1;
}
//draws right border
for(var z = 0; z < 50; z++) {
	arenaarray[49][z] = 1;
}
//draws bottom border
for(var z = 0; z < 50; z++) {
	arenaarray[z][49] = 1;
}
//draws left border
for(var z = 0; z < 50; z++) {
	arenaarray[0][z] = 1;
}




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
document.addEventListener("keydown", keyDownHandler, false);document.addEventListener("keyup", keyUpHandler, false);

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
    else if(e.keyCode == 40) {
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
    else if(e.keyCode == 40) {
    	downPressed = false;
    }
}



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
	        players[0].x += 2;
	    }
	    else if(leftPressed && players[0].x > 0) {
	        players[0].x -= 2;
	    }
	    else if(upPressed && players[0].y < canvas.height) {
	        players[0].y -= 2;
	    }
	    else if(downPressed && players[0].y > 0) {
	        players[0].y += 2;
	    }
	} 
}

//draws the player sprite
function draw() {
	updatePositions();
	//repaints light bleu over everything to redraw
	ctx.fillStyle = "#6960F5";
	ctx.fillRect(0,0,600,600);
	
	drawArena();
	//repaints player locations
	drawPlayers();

	
}

//draws the arena
function drawArena() {
	for(var m = 0; m < arrayw; m++) {
		for(var n = 0; n < arrayh; n++) {
			if(arenaarray[m][n] === 1) {
				console.log("painting" + m + n);
				ctx.fillStyle = "#CCCCCC";
				ctx.fillRect(m*12, n*12, m*12+12, n*12+12); 
			}
		}
	}
}

function drawPlayers() {
	for(var j = 0; j < players.length; j++) {
		ctx.beginPath();
		//document.getElementById("myDiv").style.top = players[j].y + "px";
		//document.getElementById("myDiv").style.left = players[j].x + "px";
		//temporary implementation. Delete everything then repaint walls
		
		ctx.arc(players[j].x, players[j].y, 6, 0, 2*Math.PI);
		ctx.fillStyle = "#00FF00";
		ctx.fill();	
		ctx.closePath();
	
	}
}

//collision checker for both walls + players
function checkCollisions() {
	//checks for square aroudn players
	for(var i = 0; i < players.length; i++) {
		//[x1, x2]
		//[x4, x3]
		
	}
}

//freezes for n milliseconds? Bad???
function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) { 
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
	}
//prevents scrolling
window.addEventListener("keydown", function(e) {
    // space, page up, page down and arrow keys:
    if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

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
setInterval(draw, 10);