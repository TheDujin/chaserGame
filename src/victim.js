function victim(ID) {
	this.ID = ID;
	this.health = 100;
	this.direction = 0;
// this.x = Math.floor(Math.random() * 500);
	// this.y = Math.floor(Math.random() * 500);
	this.x = 2550;
	this.y = 2130;
	this.score = 0;
    this.radius = 15
    this.speedModifer = 2;
    this.ammo = 0;
    this.color = "#00FF00"
}