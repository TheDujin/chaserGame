function bullet(ID, dx, dy, x, y) {
	this.ID = ID;
	var angle = 0;
    if(mouseX < 600) {
        angle = -Math.atan2((300 - mouseY), (mouseX - 600));
    }
    else {
    angle = -Math.atan((300 - mouseY)/(mouseX - 600));
    }
    this.dx = 2 * bullets[0].speedModifer * Math.cos(angle)
    this.dy = 2 * bullets[0].speedModifer * Math.sin(angle)
	this.x = players[0].x;
	this.y = players[0].y;
    this.radius = 3
    this.speedModifer = 6;
    this.color = "#FF0000"
}