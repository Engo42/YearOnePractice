class Hex {
	constructor(x, y, type, level){
		this.x = x;
		this.y = y;
		this.type = type;
		this.level = level;
		this.bandit = (type == 0)?1:0;
		this.neighbors = new Array(6);
		this.edges = new Array(6);
		this.vertexes = new Array(6);
	}
	Draw() {
		ctx.fillStyle = 'rgb(' + ((this.type + 1) * 40) + ',' + ((this.type + 1) * 40) + ', 50)';
		ctx.fillRect(10 + this.x * 100 + this.y * 50, 10 + this.y * 100, 100, 100);
	}
}
class Edge {
	constructor(){
		this.state = 0;
		this.player = -1;
	}
}
class Vertex {
	constructor(type, level, neighbors){
		this.state = 0;
		this.player = -1;
	}
}