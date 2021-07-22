class Field {
	constructor(){
		var typeMap = [
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 1, 1, 0],
			[0, 0, 1, 1, 1, 1, 0],
			[0, 1, 1, 2, 1, 1, 0],
			[0, 1, 1, 1, 1, 0, 0],
			[0, 1, 1, 1, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0]
		]
		var typeDeck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5];
		typeDeck = shuffle(typeDeck);
		var levelDeck = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
		levelDeck = shuffle(levelDeck);	
		
		this.hexArray = new Array;
		this.edgeArray = new Array;
		this.vertexArray = new Array;
		this.fieldMap = new Array(7);
		for (var i = 0; i < 7; i++) {
			this.fieldMap[i] = new Array(7);
			for (var j = 0; j < 7; j++) {
				if (typeMap[i][j] == 0)
					this.fieldMap[i][j] = null;
				if (typeMap[i][j] == 1)
					this.fieldMap[i][j] = new Hex(j, i, typeDeck.pop(), levelDeck.pop(), this);
				if (typeMap[i][j] == 2)
					this.fieldMap[i][j] = new Hex(j, i, 0, 0, this);
			}
		}
	}
}
class Hex {
	constructor(x, y, type, level, field){
		field.hexArray.push(this);
		this.x = x;
		this.y = y;
		this.type = type;
		this.level = level;
		this.bandit = (type == 0)?1:0;
		this.neighbors = new Array(6);
		this.edges = new Array(6);
		this.vertexes = new Array(6);
		this.img = new Image();
		this.img.src = 'Sprites/Hexes/t' + this.type + '.png';
		
		if (field.fieldMap[y][x-1] != null) {
			this.neighbors[4] = field.fieldMap[y][x-1];
			this.neighbors[4].neighbors[1] = this;
			this.edges[4] = this.neighbors[4].edges[1];
			this.vertexes[4] = this.neighbors[4].vertexes[1];
			this.vertexes[5] = this.neighbors[4].vertexes[2];
		}
		if (field.fieldMap[y-1][x] != null) {
			this.neighbors[5] = field.fieldMap[y-1][x];
			this.neighbors[5].neighbors[2] = this;
			this.edges[5] = this.neighbors[5].edges[2];
			this.vertexes[5] = this.neighbors[5].vertexes[2];
			this.vertexes[0] = this.neighbors[5].vertexes[3];
		}
		if (field.fieldMap[y-1][x+1] != null) {
			this.neighbors[0] = field.fieldMap[y-1][x+1];
			this.neighbors[0].neighbors[3] = this;
			this.edges[0] = this.neighbors[0].edges[3];
			this.vertexes[0] = this.neighbors[0].vertexes[3];
			this.vertexes[1] = this.neighbors[0].vertexes[4];
		}
		
		if (this.edges[4] == null)
			this.edges[4] = new Edge(x - 1, y, 0, field);
		if (this.edges[5] == null)
			this.edges[5] = new Edge(x, y - 1, 1, field);
		if (this.edges[0] == null)
			this.edges[0] = new Edge(x + 1, y - 1, 2, field);
		
		if (this.vertexes[4] == null)
			this.vertexes[4] = new Vertex(x - 1, y, 0, field);
		if (this.vertexes[5] == null)
			this.vertexes[5] = new Vertex(x, y - 1, 1, field);
		if (this.vertexes[0] == null)
			this.vertexes[0] = new Vertex(x, y - 1, 0, field);
		if (this.vertexes[1] == null)
			this.vertexes[1] = new Vertex(x + 1, y - 1, 1, field);
		
		for (var i = 1; i <= 3; i++){
			this.edges[i] = new Edge(x, y, i - 1, field);
		}
		for (var i = 2; i <= 3; i++){
			this.vertexes[i] = new Vertex(x, y, i - 2, field);
		}
	}
}
class Edge {
	constructor(x, y, direction, field){
		field.edgeArray.push(this);
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.state = 0;
		this.player = -1;
		this.img = new Image();
		this.img.src = 'Sprites/Edges/d' + this.direction + '.png';
	}
	draw() {
	}
}
class Vertex {
	constructor(x, y, direction, field){
		field.vertexArray.push(this);
		this.x = x;
		this.y = y;
		this.direction = direction;
		this.level = 0;
		this.player = -1;
		this.img = new Image();
		this.img.src = 'Sprites/Vertexes/d' + this.direction + 'l' + this.level + '.png';
	}
	draw() {
		ctx.drawImage(this.img, 420 + this.x * 160 + this.y * 80, 10 + this.y * 140);
	}
}