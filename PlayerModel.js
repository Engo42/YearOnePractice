class Player {
    constructor(name) {
        this.name = name;
        this.wood = 0;
        this.wool = 0;
        this.seed = 0;
        this.clay = 0;
        this.ore = 0;
        this.settlements = 0;
        this.roads = 0; //самая длинная сеть дорог у данного игрока
        this.cities = 0;
        this.developmentCards = new Array;
        this.knights = 0;
        this.pointOfWin = 0;
    }
    useCard(id) {
        this.developmentCards[id].use();
        this.developmentCards.splice(id, 1);
    }
}

class DevelopmentCard {
    constructor(type){
        this.type = type;
        this.active = false;
        this.img = new Image();
        this.img.src = 'Sprites/Cards/Card' + this.type + '.png';
    }
    use() {
        
    }
}