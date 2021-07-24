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
        this.resources = [0, 0, 0, 0, 0]; //wood,wool,seed,clay,ore
        this.totalResources = 0;
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