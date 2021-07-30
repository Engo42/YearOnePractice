class Player {
    constructor(name, color, number) {
        this.name = name;
        this.color = color;
        this.number = number;
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
        this.ingSettlementExists = 2;
        this.ingRoad = 2;
    }

    startMove() {
        UI.dices.throwDices();
        if (this.isLocalBot)
            makeBotMove(this);
        for (var i = 0; i < this.developmentCards.length; i++) {
            this.developmentCards[i].active = true;
        }        
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
        for (var i = 0; i < field.hexArray.length; i++) {
            if (field.hexArray[i].bandit !== 0)
                field.hexArray[i].bandit = 0;
            else
                arr.push(i);
        }
        field.hexArray[arr[Math.floor(Math.random() * arr.length)]].bandit = 1;
    }

    buyCard(id) {
        let rand = Math.random();
        //шансы в %: 20 50 12 9 9
        if (rand > 0.8)
            this.developmentCards.push(new DevelopmentCard(0));
        else if (rand > 0.30)
            this.developmentCards.push(new DevelopmentCard(1));
        else if (rand > 0.18)
            this.developmentCards.push(new DevelopmentCard(2));
        else if (rand > 0.09)
            this.developmentCards.push(new DevelopmentCard(3));
        else
            this.developmentCards.push(new DevelopmentCard(4));
            
        this.resources[0]--;
        this.resources[2]--;
        this.resources[4]--;
        return this.developmentCards[this.developmentCards.length - 1];
    }

    useCard(id) {
        this.developmentCards[id].use();
        this.developmentCards.splice(id, 1);
    }

    check_Resources(type_build) {
        if (type_build === "Road") {
            if (this.resources[0] * this.resources[3] > 0 || this.ingRoad>0)
                return true;
            return false
        } else if (type_build === "Settlement" ) {
            if (this.resources[0] *
                this.resources[1] *
                this.resources[2] *
                this.resources[3] > 0 || this.ingSettlementExists>0)
                return true;
            return false;
        } else if (this.resources[2] > 1 &&
            this.resources[4] > 2)
            return true;
        return false;

    }

    buyRoad() {
        if (this.ingRoad !== 0) {
            this.ingRoad--;
        } else {
            this.resources[0]--;
            this.resources[3]--;
        }
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
        let imax = 0;
        var maxRoadsVal = players[0].roads;
        for (var i = 1; i < 4; i++) {
            if (maxRoadsVal < players[i].roads) {
                maxRoadsVal = players[i].roads
                imax = i;
            }
        }
        if (maxRoads < maxRoadsVal && maxRoadsVal >= 3) {
            if (maxRoads !== -1)
                players[maxRoadsPlayer].victoryPoints -= 2;
            players[imax].victoryPoints += 2;
            maxRoadsPlayer = imax;
            maxRoads = maxRoadsVal;
        }
    }

    buySettlement() {
        if (this.ingSettlementExists !== 0) {
            this.ingSettlementExists--;
        } else {

            this.resources[0]--;
            this.resources[1]--;
            this.resources[2]--;
            this.resources[3]--;
        }
    }

    buildSettlement(x, y, direction) {
        field.vertexMap[y][x][direction].player = this.number;
        field.vertexMap[y][x][direction].level = 1;
        fieldChanges.push({
            type: 'Settlement',
            x: x,
            y: y,
            direction: direction,
        })


        this.victoryPoints++;
    }

    buyCity() {

        this.resources[2] -= 2;
        this.resources[4] -= 3;


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
        if (this.type === 0)
            players[currentPlayer].victoryPoints++;
        else if (this.type === 1) {
            players[currentPlayer].knights++;
            players[currentPlayer].moveBandit();
            let imax = 0;
            var maxKnightsVal = players[0].knights;
            for (var i = 1; i < 4; i++) {
                if (maxKnightsVal < players[i].knights) {
                    maxKnightsVal = players[i].knights
                    imax = i;
                }
            }
            if (maxKnights < maxKnightsVal && maxKnightsVal >= 2) {
                if (maxKnights !== -1)
                    players[maxKnightsPlayer].victoryPoints -= 2;
                players[imax].victoryPoints += 2;
                maxKnightsPlayer = imax;
                maxKnights = maxKnightsVal;
            }
        } else if (this.type === 2) {
            players[currentPlayer].ingRoad += 2;
        } else if (this.type === 3) {
            for (var i = 0; i < 4; i++) {
                players[currentPlayer].resources[Math.floor(Math.random() * 5)]++;
            }
        } else if (this.type === 4) {
            let type = Math.floor(Math.random() * 5);
            for (var i = 0; i < 4; i++) {
                if (i !== currentPlayer) {
                    players[currentPlayer].resources[type] += players[i].resources[type];
                    players[i].resources[type] = 0;
                }
            }
        }
        this.delete;
    }
}