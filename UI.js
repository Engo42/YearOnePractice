class Hex {
	constructor(x, y, type, level){
		hexArray.push(this);
		this.x = x;
		this.y = y;
		this.type = type;
		this.level = level;
	}
	draw() {
		if (this.type == 0)
			ctx.fillStyle = '#FFFF00';
		if (this.type == 1)
			ctx.fillStyle = '#008800';
		if (this.type == 2)
			ctx.fillStyle = '#00FF00';
		if (this.type == 3)
			ctx.fillStyle = '#BB8800';
		if (this.type == 4)
			ctx.fillStyle = '#FF8800';
		if (this.type == 5)
			ctx.fillStyle = '#888888';
		ctx.fillRect(10 + this.x * 100 + this.y * 50, 10 + this.y * 100, 100, 100);
	}
}