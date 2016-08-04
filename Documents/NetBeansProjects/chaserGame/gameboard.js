//THIS IS THE SERVERSIDE CODE
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var radius = 15;
var players = [];
var HEIGHT = 9000;
var WIDTH = 9000;
var XUNITS = 300;
var YUNITS = 300;


var UNIT = 30;
var fovwidth = 1200;
var fovheight = 600;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle="#736AFF";
ctx.fillRect(0,0,1200,600);



//game mechanics
var speedModifer = 2;
var gundirection = 0;


var mapArray = new Array(XUNITS);
for(var i = 0; i < XUNITS; i++) {
    mapArray[i] = new Array(YUNITS);
}

for(var a = 0; a < XUNITS; a++) {
    for(var b = 0; b < YUNITS; b++) {
        mapArray[a][b] = 0;
    }
}

for(var i = 0; i < XUNITS; i++) {
    mapArray[i][8] = 1;
}
for(var i = 0; i < YUNITS; i++) {
    mapArray[30][i] = 1;
}




function victim(ID){
	this.ID = ID;
	this.health = 100;
	this.speed = 100;
	this.direction = 0;
// this.x = Math.floor(Math.random() * 500);
	// this.y = Math.floor(Math.random() * 500);
	this.x = 1000;
	this.y = 700;
        this.radius = 15
}
var victim = new victim(1234);
players[0] = victim;


// deals with keybaord inputs
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

//mouse tracker
var IE = document.all?true:false
if (!IE) document.captureEvents(Event.MOUSEMOVE)

document.onmousemove = getMouseXY;

// Temporary variables to hold mouse x-y pos.s
var mouseX = 0;
var mouseY = 0;
// Main function to retrieve mouse x-y pos.
function getMouseXY(e) {
  if (IE) { // grab the x-y pos.s if browser is IE
    mouseX = event.clientX + document.body.scrollLeft;
    mouseY = event.clientY + document.body.scrollTop;
  } else {  // grab the x-y pos.s if browser is NS
    mouseX = e.pageX;
    mouseY = e.pageY;
  }  
  // catch possible negative values in NS4
  if (mouseX < 0){
      mouseX = 0
  }
  if (mouseY < 0){
      mouseY = 0
  }  
  // show the position values in the form named Show
  // in the text fields named MouseX and MouseY
  return true
}


function paintPlayers() {
	for(var i = 0; i < players.length; i++) {
		// iterates through players and finds their x and y. Paints a circle.
		// also needs to remove old player locations
	}
}

// obtain keycodes
// 0 is up, 1 is right, 2 is down, 3 is left
// finish coding. s
function updatePositions() {
//	console.log(checkCollisions(players[0].x + 50, players[0].y));
//	console.log(checkCollisions(players[0].x - 50, players[0].y));
//	console.log(checkCollisions(players[0].x, players[0].y  + 50));
//	console.log(checkCollisions(players[0].x, players[0].y  -50));
//	console.log(checkCollisions(players[0].x, players[0].y - 2));
//        console.log("player X: " + players[0].x + "Y: " + players[0].y);
	for(var i = 0; i < players.length; i++) {
	    if(rightPressed == true && checkCollisions(players[0].x + 2 * speedModifer, players[0].y) == false) {
	        players[0].x += 2 * speedModifer;
	    }
	    else if(leftPressed == true && checkCollisions(players[0].x - 2 * speedModifer, players[0].y) == false) {
	        players[0].x -= 2 * speedModifer;
	    }
	    else if(upPressed == true && checkCollisions(players[0].x, players[0].y - 2 * speedModifer) == false) {
	        players[0].y -= 2 * speedModifer;
	    }
	    else if(downPressed == true && checkCollisions(players[0].x, players[0].y + 2 * speedModifer) == false) {
	        players[0].y += 2 * speedModifer;
	    }
	} 
}

// draws the player sprite
function draw() {
        console.log("mouseX" + mouseX + " " + "mouseY " + mouseY);
	updatePositions();
	// repaints light bleu over everything to redraw
	ctx.fillStyle = "#6960F5";
	ctx.fillRect(0,0,1200,600);
	drawArena(players[0].x,players[0].y);
        drawTargeter();
	// repaints player locations
	drawSelf();
}
// draws the arena

function drawArena(x,y) {
	var topunitx = Math.floor((x - fovwidth/2)/UNIT);
	var topunity = Math.floor((y - fovheight/2)/UNIT);
//        console.log("UNITX" + topunitx);
//        console.log("UNITY" + topunity);
        
	for(var m = topunitx; m < fovwidth/UNIT + topunitx; m++) {
                    for(var n = topunity; n < fovheight/UNIT + topunity; n++) {
                            if(mapArray[m][n] === 1) {
				ctx.fillStyle = "#CCCCCC";
				ctx.fillRect((Math.ceil(x/UNIT)*UNIT - x) + (m - topunitx - 1)*UNIT, (Math.ceil(y/UNIT)*UNIT - y) + (n - topunity - 1)*UNIT, UNIT, UNIT); 
			}
		}
	}
}
function drawSelf() {
	ctx.beginPath();
	ctx.arc(fovwidth/2, fovheight/2, radius, 0, 2*Math.PI);
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
		ctx.arc(players[j].x+1, players[j].y+1, 4, 0, 2*Math.PI);
		ctx.fillStyle = "#00FF00";
		ctx.fill();	
		ctx.closePath();
	}
}

// collision checker for both walls + players
// returns true if there are any collisions
function checkCollisions(x,y) {
	exactx = x;
	exacty = y;
	x = Math.floor(x/UNIT);
	y = Math.floor(y/UNIT);
	// checks for top wall
	// arena array is the array of 1's and 0's that the map is based on
	if(mapArray[x][y-1] === 1 && (Math.floor(exacty/UNIT) != Math.floor((exacty - radius)/UNIT))) {
		return true;
	}
	// checks for right wall
	else if(mapArray[x+1][y] === 1 && (Math.floor(exactx/UNIT) != Math.floor((exactx+4)/UNIT))) {
		return true;
	}
	// checks for bottom wall
	else if(mapArray[x][y+1] === 1 && (Math.floor(exacty/UNIT) != Math.floor((exacty+radius)/UNIT))) {
		return true;
	}
	// checks for left wall
	else if(mapArray[x-1][y] === 1 && (Math.floor((exactx-radius)/UNIT) != Math.floor(exactx/UNIT))) {
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
}
	
//basic distance formula
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

function drawTargeter() {
        //angle in radians
        var cursorDistance = 50;
        var angle = 0;
        if(mouseX < 600) {
            angle = -Math.atan2((300 - mouseY), (mouseX - 600));
        }
        else {
        angle = -Math.atan((300 - mouseY)/(mouseX - 600));
    }
        
        console.log("Angle" + angle);
        var cursorX = cursorDistance * Math.cos(angle) + 600;
        var cursorY = cursorDistance * Math.sin(angle) + 300;
        var cursorX2 = 0.70 * cursorDistance * Math.cos(angle) + 600;
        var cursorY2 = 0.70 * cursorDistance * Math.sin(angle) + 300;
        var cursorX3 = 0.45 * cursorDistance * Math.cos(angle) + 600;
        var cursorY3 = 0.45 * cursorDistance * Math.sin(angle) + 300;
        ctx.beginPath();
        ctx.fillStyle = "#FF0000";
        ctx.arc(cursorX, cursorY, 5, 0, Math.PI * 2);
        ctx.arc(cursorX2, cursorY2, 4, 0, Math.PI * 2);
        ctx.arc(cursorX3, cursorY3, 3, 0, Math.PI * 2);
        
        ctx.fill();
        ctx.closePath();
        
        
    }

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
