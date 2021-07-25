class Field {
    constructor() {
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
        this.hexMap = new Array(7);
        this.edgeMap = new Array(7);
        this.vertexMap = new Array(7);
        for (var i = 0; i < 7; i++) {
            this.hexMap[i] = new Array(7);
            this.edgeMap[i] = new Array(7);
            this.vertexMap[i] = new Array(7);
            for (var j = 0; j < 7; j++) {
                this.edgeMap[i][j] = new Array(3);
                this.vertexMap[i][j] = new Array(2);
                if (typeMap[i][j] === 0)
                    this.hexMap[i][j] = null;
                if (typeMap[i][j] === 1)
                    this.hexMap[i][j] = new Hex(j, i, typeDeck.pop(), levelDeck.pop(), this);
                if (typeMap[i][j] === 2)
                    this.hexMap[i][j] = new Hex(j, i, 0, 0, this);
            }
        }
    }
}

class Hex {
    constructor(x, y, type, level, field) {
        let i;
        field.hexArray.push(this);
        this.x = x;
        this.y = y;
        this.type = type;
        this.level = level;
        this.bandit = (type === 0) ? 1 : 0;
        this.neighbors = new Array(6);
        this.edges = new Array(6);
        this.vertexes = new Array(6);
        this.img = new Image();
        this.img.src = 'Sprites/Hexes/t' + this.type + '.png';

        if (field.edgeMap[y][x - 1][0] == null)
            field.edgeMap[y][x - 1][0] = new Edge(x - 1, y, 0, field);
        if (field.edgeMap[y - 1][x][1] == null)
            field.edgeMap[y - 1][x][1] = new Edge(x, y - 1, 1, field);
        if (field.edgeMap[y - 1][x + 1][2] == null)
            field.edgeMap[y - 1][x + 1][2] = new Edge(x + 1, y - 1, 2, field);

        if (field.vertexMap[y][x - 1][0] == null)
            field.vertexMap[y][x - 1][0] = new Vertex(x - 1, y, 0, field);
        if (field.vertexMap[y - 1][x][1] == null)
            field.vertexMap[y - 1][x][1] = new Vertex(x, y - 1, 1, field);
        if (field.vertexMap[y - 1][x][0] == null)
            field.vertexMap[y - 1][x][0] = new Vertex(x, y - 1, 0, field);
        if (field.vertexMap[y - 1][x + 1][1] == null)
            field.vertexMap[y - 1][x + 1][1] = new Vertex(x + 1, y - 1, 1, field);

        for (i = 0; i < 3; i++) {
            field.edgeMap[y][x][i] = new Edge(x, y, i, field);
        }
        for (i = 0; i < 2; i++) {
            field.vertexMap[y][x][i] = new Vertex(x, y, i, field);
        }
    }

    connect() {
        this.neighbors[0] = field.hexMap[y - 1][x + 1];
        this.neighbors[1] = field.hexMap[y][x + 1];
        this.neighbors[2] = field.hexMap[y + 1][x];
        this.neighbors[3] = field.hexMap[y + 1][x - 1];
        this.neighbors[4] = field.hexMap[y][x - 1];
        this.neighbors[5] = field.hexMap[y - 1][x];

        this.edges[0] = field.edgeMap[y - 1][x + 1][2];
        this.edges[1] = field.edgeMap[y][x][0];
        this.edges[2] = field.edgeMap[y][x][1];
        this.edges[3] = field.edgeMap[y][x][2];
        this.edges[4] = field.edgeMap[y][x - 1][0];
        this.edges[5] = field.edgeMap[y - 1][x][1];

        this.vertexes[0] = field.edgeMap[y - 1][x][0];
        this.vertexes[1] = field.edgeMap[y - 1][x - 1][1];
        this.vertexes[2] = field.edgeMap[y][x][0];
        this.vertexes[3] = field.edgeMap[y][x][1];
        this.vertexes[4] = field.edgeMap[y][x - 1][0];
        this.vertexes[5] = field.edgeMap[y - 1][x][1];
    }
}

class Edge {
    constructor(x, y, direction, field) {
        field.edgeArray.push(this);
        field.edgeMap[y][x][direction] = this;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.state = 0;
        this.player = -1;
        this.edges = new Array(4);
        this.vertexes = new Array(2);
        this.img = new Image();
        this.img.src = 'Sprites/Edges/d' + this.direction + '.png';
    }

    connect() {
        if (this.direction === 0) {
            this.edges[0] = field.edgeMap[y - 1][x + 1][2];
            this.edges[1] = field.edgeMap[y - 1][x + 1][1];
            this.edges[2] = field.edgeMap[y][x + 1][2];
            this.edges[3] = field.edgeMap[y][x][1];
            this.vertexes[0] = field.edgeMap[y - 1][x + 1][1];
            this.vertexes[1] = field.edgeMap[y][x][0];
        }
        if (this.direction === 1) {
            this.edges[0] = field.edgeMap[y][x][0];
            this.edges[1] = field.edgeMap[y][x + 1][2];
            this.edges[2] = field.edgeMap[y + 1][x - 1][0];
            this.edges[3] = field.edgeMap[y][x][2];
            this.vertexes[0] = field.edgeMap[y][x][0];
            this.vertexes[1] = field.edgeMap[y][x][1];
        }
        if (this.direction === 3) {
            this.edges[0] = field.edgeMap[y][x][1];
            this.edges[1] = field.edgeMap[y + 1][x - 1][0];
            this.edges[2] = field.edgeMap[y][x - 1][1];
            this.edges[3] = field.edgeMap[y][x - 1][0];
            this.vertexes[0] = field.edgeMap[y][x][1];
            this.vertexes[1] = field.edgeMap[y][x - 1][0];
        }
    }
}

class Vertex {
    constructor(x, y, direction, field) {
        field.vertexArray.push(this);
        field.vertexMap[y][x][direction] = this;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.level = 0;
        this.player = -1;
        this.edges = new Array(3);
        this.vertexes = new Array(3);
        this.img = new Image();
        this.img.src = 'Sprites/Vertexes/d' + this.direction + 'l' + this.level + '.png';
    }

    connect() {
        if (this.direction === 0) {
            this.edges[0] = field.edgeMap[y][x][0];
            this.edges[1] = field.edgeMap[y][x + 1][2];
            this.edges[2] = field.edgeMap[y][x][1];
            this.vertexes[0] = field.edgeMap[y - 1][x + 1][1];
            this.vertexes[1] = field.edgeMap[y][x + 1][1];
            this.vertexes[2] = field.edgeMap[y][x][1];
        }
        if (this.direction === 1) {
            this.edges[0] = field.edgeMap[y][x][1];
            this.edges[1] = field.edgeMap[y + 1][x - 1][0];
            this.edges[2] = field.edgeMap[y][x][2];
            this.vertexes[0] = field.edgeMap[y][x][0];
            this.vertexes[1] = field.edgeMap[y + 1][x - 1][0];
            this.vertexes[2] = field.edgeMap[y][x - 1][0];
        }
    }
}