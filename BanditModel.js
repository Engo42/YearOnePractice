class Bandit {
    constructor() {///какие координаты у середины?
        this.location = -1;
        this.x;
        this.y;

    }

    change(loc, i, j) {
        this.location = loc;
        this.x = i;
        this.y = j;

    }

    goHome() {
        this.location = -1;
        this.x;////координаты середины
        this.y;

    }

}