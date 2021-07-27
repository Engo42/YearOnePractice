class Player {
    constructor(name, color, number) {
        this.name = name;
        this.color = color;
        this.number = number;
        this.wood = 0;
        this.wool = 0;
        this.seed = 0;
        this.clay = 0;
        this.ore = 0;
        this.resources = [0, 0, 0, 0, 0]; //wood,wool,seed(corn),clay,ore(iron)
        this.totalResources = 0;
        this.indicators = [0, 0, 0, 0, 0, 0]; //setlements, roads - самая длинная сеть дорог у данного игрока, cities, количество карт развития, knights, pointsOfWin
        this.settlements = 0;
        this.roads = 0; //самая длинная сеть дорог у данного игрока
        this.cities = 0;
        this.developmentCards = new Array;
        this.knights = 0;
        this.pointOfWin = 0;
    }

    buyCard(id) {
        this.wood--;
        this.seed--;
        this.ore--;
        this.developmentCards.push(new DevelopmentCard(1));
        return this.developmentCards[this.developmentCards.length - 1];
    }

    useCard(id) {
        this.developmentCards[id].use();
        this.developmentCards.splice(id, 1);
    }
    buildRoad(x, y, direction) {
        field.edgeMap[y][x][direction].player = this.number;
        field.edgeMap[y][x][direction].level = 1;
    }
    buildSettlement(x, y, direction) {
        field.vertexMap[y][x][direction].player = this.number;
        field.vertexMap[y][x][direction].level = 1;
    }
    buildCity(x, y, direction) {
        field.vertexMap[y][x][direction].level = 2;
    }
}

class DevelopmentCard {
    constructor(type) {
        this.type = type;
        this.active = false;
        this.img = new Image();
        this.img.src = 'Sprites/Cards/Card' + this.type + '.png';
    }

    use() {

    }
}