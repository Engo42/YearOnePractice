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
        this.victoryPoints = 0;
        this.isLocalBot = false;
    }
    
    startMove() {
        UI.dices.throwDices();
    }
    
    harvest(level) {
        for (var i = 0; i < field.hexArray.length; i++) {
            if (field.hexArray[i].level === level) {
                for (var j = 0; j < 6; j++) {
                    if (field.hexArray[i].vertexes[j].player != -1)
                        players[field.hexArray[i].vertexes[j].player].resources[field.hexArray[i].type - 1] += field.hexArray[i].vertexes[j].level;
                }
            }
        }
    }
    
    moveBandit() {
        var arr = new Array;
        var banditLocation;
        for (var i = 0; i < field.hexArray.length; i++){
            if (field.hexArray[i].bandit !== 0)
                field.hexArray[i].bandit = 0;
            else
                arr.push(i);
        }
        field.hexArray[arr[Math.floor(Math.random() * arr.length)]].bandit = 1;
        for (var i = 0; i < 4; i++){
            let res = players[i].resources;
            if (res[0] + res[1] + res[2] + res[3] + res[4] > 7) {
                var a = new Array;
                for (var j = 0; j < 5; j++){
                    for (var k = 0; k < res[j]; k++){
                        a.push(j);
                    }
                }
                shuffle(a);
                for (var j = 0; j < a.length / 2; j++){
                    res[a[j]]--;
                }
            }
        }
    }

    buyCard(id) {
        this.resources[0]--;
        this.resources[2]--;
        this.resources[4]--;
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
        fieldChanges.push({
            type: 'Road',
            x: x,
            y: y,
            direction: direction
        })
        this.roads++;
    }

    buildSettlement(x, y, direction) {
        field.vertexMap[y][x][direction].player = this.number;
        field.vertexMap[y][x][direction].level = 1;
        fieldChanges.push({
            type: 'Settlement',
            x: x,
            y: y,
            direction: direction
        })
        this.victoryPoints++;
    }

    buildCity(x, y, direction) {
        field.vertexMap[y][x][direction].level = 2;
        fieldChanges.push({
            type: 'City',
            x: x,
            y: y,
            direction: direction
        })
        this.victoryPoints++;
    }

    endMove() {
        sendMove();
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