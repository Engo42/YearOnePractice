class Hex {
	constructor(x, y, type, level){
		hexArray.push(this);
		this.x = x;
		this.y = y;
		this.type = type;
		this.level = level;
		this.bandit = (type == 0)?1:0;
		this.neighbors = new Array(6);
		this.edges = new Array(6);
		this.vertexes = new Array(6);
		
		if (field[y][x-1] != null) {
			this.neighbors[4] = field[y][x-1];
			this.neighbors[4].neighbors[1] = this;
			this.edges[4] = this.neighbors[4].edges[1];
			this.vertexes[4] = this.neighbors[4].vertexes[1];
			this.vertexes[5] = this.neighbors[4].vertexes[2];
		}
		if (field[y-1][x] != null) {
			this.neighbors[5] = field[y-1][x];
			this.neighbors[5].neighbors[2] = this;
			this.edges[5] = this.neighbors[5].edges[2];
			this.vertexes[5] = this.neighbors[5].vertexes[2];
			this.vertexes[0] = this.neighbors[5].vertexes[3];
		}
		if (field[y-1][x+1] != null) {
			this.neighbors[0] = field[y-1][x+1];
			this.neighbors[0].neighbors[3] = this;
			this.edges[0] = this.neighbors[0].edges[3];
			this.vertexes[0] = this.neighbors[0].vertexes[3];
			this.vertexes[1] = this.neighbors[0].vertexes[4];
		}
		
		if (this.edges[4] == null)
			this.edges[4] = new Edge(x - 1, y, 0);
		if (this.edges[5] == null)
			this.edges[5] = new Edge(x, y - 1, 1);
		if (this.edges[0] == null)
			this.edges[0] = new Edge(x + 1, y - 1, 2);
		
		if (this.vertexes[4] == null)
			this.vertexes[4] = new Vertex(x - 1, y, 0);
		if (this.vertexes[5] == null)
			this.vertexes[5] = new Vertex(x, y - 1, 1);
		if (this.vertexes[0] == null)
			this.vertexes[0] = new Vertex(x, y - 1, 0);
		if (this.vertexes[1] == null)
			this.vertexes[1] = new Vertex(x + 1, y - 1, 1);
		
		for (var i = 1; i <= 3; i++){
			this.edges[i] = new Edge(x, y, i - 1);
		}
		for (var i = 2; i <= 3; i++){
			this.vertexes[i] = new Vertex(x, y, i - 2);
		}
	}
	Draw() {
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
class Edge {
	constructor(x, y, direction){
		edgeArray.push(this);
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.state = 0;
		this.player = -1;
	}
	Draw() {
		ctx.fillStyle = 'black';
		ctx.lineWidth = 3;
		ctx.beginPath();
		if (this.direction == 0){
			ctx.moveTo(10 + this.x * 100 + 100 + this.y * 50, 10 + this.y * 100);
			ctx.lineTo(10 + this.x * 100 + 100 + this.y * 50, 10 + this.y * 100 + 100);
		}
		if (this.direction == 1){
			ctx.lineTo(10 + this.x * 100 + 100 + this.y * 50, 10 + this.y * 100 + 100);
			ctx.lineTo(10 + this.x * 100 + 50 + this.y * 50, 10 + this.y * 100 + 100);
		}
		if (this.direction == 2){
			ctx.lineTo(10 + this.x * 100 + 50 + this.y * 50, 10 + this.y * 100 + 100);
			ctx.lineTo(10 + this.x * 100 + this.y * 50, 10 + this.y * 100 + 100);
		}
		ctx.stroke();
	}
}
class Vertex {
	constructor(x, y, direction){
		vertexArray.push(this);
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.state = 0;
		this.player = -1;
	}
	Draw() {
		ctx.fillStyle = 'blue';
		if (this.direction == 0){
			ctx.fillRect(10 + this.x * 100 + 95 + this.y * 50, 10 + this.y * 100 + 95, 10, 10);
		}
		if (this.direction == 1){
			ctx.fillRect(10 + this.x * 100 + 45 + this.y * 50, 10 + this.y * 100 + 95, 10, 10);
		}
	}
}