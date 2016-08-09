var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
ctx.fillStyle="#736AFF";
ctx.fillRect(0,0,fovwidth+2000,fovheight+2000);

//draws the player sprite
function draw() {
    //console.log("mouseX" + mouseX + " " + "mouseY " + mouseY);
	updatePositions();
	// repaints light bleu over everything to redraw
	ctx.fillStyle = "#6960F5";
	ctx.fillRect(0,0,1200,600);
	drawArena(players[0].x,players[0].y);
    drawTargeter();
	// repaints player locations
	drawSelf();
}

//draws the arena

function drawArena(x,y) {
	var topunitx = Math.floor((x - fovwidth/2)/UNIT);
	var topunity = Math.floor((y - fovheight/2)/UNIT);
	//console.log("x: " + x + " " + topunitx + "y: " + y + " " + topunity)
//	console.log("UNITX" + topunitx);
//	console.log("UNITY" + topunity);

	for(var m = topunitx; m < fovwidth/UNIT + topunitx; m++) {
    	for(var n = topunity; n < fovheight/UNIT + topunity; n++) {
            if(mapArray[m][n] === 1) {
				ctx.fillStyle = "#CCCCCC";
				ctx.fillRect((Math.ceil(x/UNIT)*UNIT - x) + (m - topunitx - 1)*UNIT, (Math.ceil(y/UNIT)*UNIT - y) + (n - topunity - 1)*UNIT, UNIT, UNIT); 
			}
			if(mapArray[m][n] === 2) {
				ctx.fillStyle = "#FFFF00";
			}
            if(mapArray[m][n] === 2) {
				ctx.fillStyle = "#FFFF00";
				ctx.fillRect((Math.ceil(x/UNIT)*UNIT - x) + (m - topunitx - 1)*UNIT, (Math.ceil(y/UNIT)*UNIT - y) + (n - topunity - 1)*UNIT, UNIT, UNIT); 
			}
            if(mapArray[m][n] === 3) {
				ctx.fillStyle = "#008000";
				ctx.fillRect((Math.ceil(x/UNIT)*UNIT - x) + (m - topunitx - 1)*UNIT, (Math.ceil(y/UNIT)*UNIT - y) + (n - topunity - 1)*UNIT, UNIT, UNIT); 
			}
            if(mapArray[m][n] === 4) {
				ctx.fillStyle = "#800080";
				ctx.fillRect((Math.ceil(x/UNIT)*UNIT - x) + (m - topunitx - 1)*UNIT, (Math.ceil(y/UNIT)*UNIT - y) + (n - topunity - 1)*UNIT, UNIT, UNIT); 
			}
		}
	}
}

function drawSelf() {
	ctx.beginPath();
	ctx.arc(fovwidth/2, fovheight/2, radius, 0, 2*Math.PI);
	ctx.fillStyle = players[0].color;
	ctx.fill();	
	ctx.closePath();
	players[0].score += 5;
	//console.log(players[0].score);
	document.getElementById("score").innerHTML = players[0].score;
	document.getElementById("ammo").innerHTML = players[0].ammo;
}


function drawPlayers() {
	for(var j = 0; j < players.length; j++) {
		ctx.beginPath();
		// document.getElementById("myDiv").style.top = players[j].y + "px";
		// document.getElementById("myDiv").style.left = players[j].x + "px";
		// temporary implementation. Delete everything then repaint walls
		ctx.arc(players[j].x+1, players[j].y+1, 4, 0, 2*Math.PI);
		ctx.fillStyle = players[j].color;
		ctx.fill();	
		ctx.closePath();
		players[j].score += 5;
		//console.log(players[j].score);
		//document.getElementById("score").innerHTML = players[j].score;
	}
}

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
    
    //console.log("Angle" + angle);
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


setInterval(draw, 10);













