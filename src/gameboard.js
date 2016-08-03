//THIS IS THE SERVERSIDE CODE
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

//MODIFIERS/POWERUPS
var movementModifier = 5	;
var sightRangeModifier = 1;
var visible = 1;




var radius = 20;
var players = [];
players[0] = new victim(1234);

//now the gameboard is officially 8000 pixels by 8000 pixels 
var WIDTH = 8000;
var HEIGHT = 8000;
var UNIT = 40;
var fovwidth = 1000;
var fovheight = 600;


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//ctx.fillStyle="#736AFF";
//ctx.fillRect(0,0,600,600);



var mapArray = new Array(WIDTH);
for(var z = 0; z < WIDTH; z++) {
	mapArray[z] = new Array(HEIGHT);
}
for(var q = 0; q < WIDTH; q++) {
	for(var r = 0; r < HEIGHT; r++) {
		mapArray[q][r] = 0;
	}
}

for(var z = 0; z < WIDTH; z++) {
	for(var y = 0; y < UNIT; y++) {
		mapArray[z][y] = 1;
	}
}
/*
for(var z = 0; z < WIDTH; z++) 	{
	for(var y = UNIT - 1; y > ; y++) {
		mapArray[z][y] = 1;
	}
}
for(var z = 0; z < WIDTH; z++) {
	for(var y = 0; y < UNIT; y++) {
		mapArray[z][y] = 1;
	}
}
for(var z = 0; z < WIDTH; z++) {
	for(var y = 0; y < UNIT; y++) {
		mapArray[z][y] = 1;
	}
}

*/



/*
// draws top border
for(var z = 0; z < 50; z++) {
	mapArray[z][0] = 1;
}
// draws right border
for(var z = 0; z < 50; z++) {
	mapArray[49][z] = 1;
}
// draws bottom border
for(var z = 0; z < 50; z++) {
	mapArray[z][49] = 1;
}
// draws left border
for(var z = 0; z < 50; z++) {
	mapArray[0][z] = 1;
}

// random line
for(var m = 1; m < 10; m++) {
	mapArray[m][7] = 1;
}
for(var m = 1; m < 8; m++) {
	mapArray[10][m] = 1;
}
*/

//now its 0 by 600


function victim(ID){
	this.ID = ID;
	this.health = 100;
	this.speed = 100;
	this.direction = 0;
// this.x = Math.floor(Math.random() * 500);
	// this.y = Math.floor(Math.random() * 500);
	this.x = 1000;
	this.y = 400;
	this.radius = 20;
}


// deals with keyboard inputs
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
		// iterates through players and finds their x and y. Paints a circle.
		// also needs to remove old player locations
	}
}

// obtain keycodes
// 0 is up, 1 is right, 2 is down, 3 is left
// finish coding.
	
function updatePositions() {
	console.log(players[0].x + "    " + players[0].y);
//	console.log(checkCollisions(players[0].x + 2, players[0].y));
//	console.log(checkCollisions(players[0].x - 2, players[0].y));
//	console.log(checkCollisions(players[0].x, players[0].y  + 2));
//	console.log(checkCollisions(players[0].x, players[0].y - 2));
	for(var i = 0; i < players.length; i++) {
	    if(rightPressed == true && checkCollisions(players[0].x + 2, players[0].y) == false) {
	        players[0].x += 2 * movementModifier;
	    }
	    else if(leftPressed == true && checkCollisions(players[0].x - 2, players[0].y) == false) {
	        players[0].x -= 2 * movementModifier;
	    }
	    else if(upPressed == true && checkCollisions(players[0].x, players[0].y - 2) == false) {
	        players[0].y -= 2 * movementModifier;
	    }
	    else if(downPressed == true && checkCollisions(players[0].x, players[0].y + 2) == false) {
	        players[0].y += 2 * movementModifier;
	    }
	} 
}
// draws the player sprite
function draw() {
	updatePositions();
	// repaints light bleu over everything to redraw
	ctx.fillStyle = "#6960F5";
	ctx.fillRect(0,0,1000,600);
	drawSelf();
	drawArena(players[0].x, players[0].y);
	// repaints player locations
}
// draws the arena based on player's locations
//functionally only for one player though
//perhaps this should draw on client side. 
function drawArena(x,y) {
	var topx = x - fovwidth/2;
	var topy = y - fovheight/2;
	for(var m = topx; m < fovwidth + topx; m++) {
		for(var n = topy; n < fovheight + topy; n++) {
			if(mapArray[m][n] === 1) {
				ctx.fillStyle = "#CCCCCC";
				ctx.fillRect(m - x + fovwidth/2, n - y + fovheight/2, 1, 1); 
			}
		}
	}
}

function drawSelf() {
	ctx.beginPath();
	ctx.arc(fovwidth/2, fovheight/2, UNIT/2, 0, 2*Math.PI);
	ctx.fillStyle = "#00FF00";
	ctx.fill();	
	ctx.closePath();
}

function drawPlayers() {
	for(var j = 0; j < players.length; j++) {
		ctx.beginPath();
		// document.getElementById("myDiv").style.top = players[j].y + "px";
		// document.getElementById("myDiv").style.left = players[j].x + "px";
		// temporary implementation. Delete everything then repaint walls
		ctx.arc(players[j].x, players[j].y, 6, 0, 2*Math.PI);
		ctx.fillStyle = "#00FF00";
		ctx.fill();	
		ctx.closePath();
	
	}
}

// collision checker for both walls + players
// returns true if there are any collisions
function checkCollisions(x,y) {
/*	x = Math.floor(x);
	y = Math.floor(y);
	console.log("checking for collisions");
	for(var i = x - 50; i < x + 50; i+=5) {
		for(var j = y - 50; y < y + 50; y+=5) {
			console.log(i + " " + j);
			if(mapArray[i][j] === 1 && distance(i, x, j, y) < 20) {
				console.log("true");
				return true;
			}
		}
	}
	*/
	return false;	
}

/*exactx = x;
exacty = y;
x = Math.floor(x/12);
y = Math.floor(y/12);
// checks for top wall
// arena array is the array of 1's and 0's that the map is based on
if(mapArray[x][y-1] === 1 && (Math.floor(exacty/12) != Math.floor((exacty-6)/12))) {
	return true;
}
// checks for right wall
else if(mapArray[x+1][y] === 1 && (Math.floor(exactx/12) != Math.floor((exactx+6)/12))) {
	return true;
}
// checks for bottom wall
else if(mapArray[x][y+1] === 1 && (Math.floor(exacty/12) != Math.floor((exacty+6)/12))) {
	return true;
}
// checks for left wall
else if(mapArray[x-1][y] === 1 && (Math.floor((exactx-6)/12) != Math.floor(exactx/12))) {
	return true;
}

// otherwise, check for corner intersection (because this either means its
// not
// intersecting or their are only walls in the corners

// checks for top left corner
else if(mapArray[x-1][y-1] === 1 && distance(exactx, x*12, exacty, x*12) < 6) {
	return true;
}
// checks for the top right corner
else if(mapArray[x+1][y-1] === 1 && distance(exactx, (x+1)*12, exacty, (y)*12) < 6) {
	return true;
}
// checks for the bottom right corner
else if(mapArray[x+1][y+1] === 1 && distance(exactx, (x+1)*12, exacty, (y+1)*12) < 6) {
	return true;
}
// checks for the bottom left corner
else if(mapArray[x-1][y+1] === 1 && distance(exactx, (x)*12, exacty, (y+1)*12) < 6) {
	return true;
}
else {
	return false;
}
*/


function distance(x1, x2, y1, y2) {
	console.log(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}


// freezes for n milliseconds? Bad???
function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) { 
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }f
	  }
	}


// prevents scrolling
window.addEventListener("keydown", function(e) {
    // space, page up, page down and arrow keys:
    if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


//IP: 10.218.223.188
/*
 * 
 * while(counter < 100) { console.log("this is being called");
 * console.log(document.getElementById('xcood'))
 * document.getElementById('xcood').innerHTML = counter; // updatePositions(); //
 * 1. move characters // 2. check for collisions between players // 3. death
 * events counter++;
 *  }
 * 
 */
setInterval(draw, 10);