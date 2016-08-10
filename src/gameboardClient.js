var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
ctx.fillStyle="#736AFF";
ctx.fillRect(0,0,fovwidth,fovheight);
var mouseX = 0;
var mouseY = 0;
var bullets = [];
var selfx = players[0].x
var selfy = players[0].y

//deals with keyboard inputs
document.addEventListener("keydown", keyDownHandler, false);document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    if(e.keyCode == 37) {
        leftPressed = true;
    }
    if(e.keyCode == 38) {
    	upPressed = true;
    }
    if(e.keyCode == 40) {
    	downPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    if(e.keyCode == 37) {
        leftPressed = false;
    }
    if(e.keyCode == 38) {
    	upPressed = false;
    }
    if(e.keyCode == 40) {
    	downPressed = false;
    }
}

//prevents scrolling
window.addEventListener("keydown", function(e) {
    // space, page up, page down and arrow keys:
    if([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

var IE = document.all?true:false
if (!IE) document.captureEvents(Event.MOUSEMOVE)
	document.onmousemove = getMouseXY;
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

//on mouse down
document.onmousedown = function(){
	if (players[0].ammo > 0) {
		players[0].ammo--
		var newbullet = new bullet(players[0].ID);
		bullets.push(newbullet)
	}
}

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
	drawBullets(players[0].x, players[0].y);
	selfx = players[0].x
	selfy = players[0].y
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
      var value = mapArray[m][n];
      if(value !== 0) {
        switch(value) {
          case 1:
            ctx.fillStyle = "#CCCCCC";
            break;
          case 2:
            ctx.fillStyle = "#FFFF00";
            break;
          case 3:
            ctx.fillStyle = "#008000";
            break;
          case 4:
            ctx.fillStyle = "#800080";
            break;
          default:
            break;
          }
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

function drawBullets(x, y) {
	for (var i = 0; i < bullets.length; i++) {
		ctx.beginPath()
		ctx.arc(bullets[i].x - selfx + fovwidth/2, bullets[i].y - selfy + fovheight/2, 4, 0, 2 * Math.PI)
		ctx.fillStyle = bullets[i].color
		ctx.fill()
		ctx.closePath()
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
setInterval(draw, 5);
