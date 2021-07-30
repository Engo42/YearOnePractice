class Dices {
    constructor() {
        this.digit = [Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1)];
        this.x_1 = 1720;
        this.x_2 = 1820;
    }

    throwDices() {
        let f = 0
        this.digit = [Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1)];
        if (this.digit[0] + this.digit[1] !== 7)
            players[currentPlayer].harvest(this.digit[0] + this.digit[1]);
        else {
            for (let i = 0; i < players.length; i++) {
                if (players[i].ingSettlementExists > 0 && players[i].ingRoad>0) { ///currentPlayer для тестов
                    f = 1;
                    break;
                }
            }
            if (f !== 1) players[currentPlayer].moveBandit();
            for (var i = 0; i < 4; i++) {
                let res = players[i].resources;
                if (arrSum(res) > 7) {
                    var a = new Array;
                    for (var j = 0; j < 5; j++) {
                        for (var k = 0; k < res[j]; k++) {
                            a.push(j);
                        }
                    }
                    shuffle(a);
                    for (var j = 0; j < a.length / 2; j++) {
                        res[a[j]]--;
                    }
                }
            }
        }
    }

    draw_point(x, d) {

        ctx.fillStyle = '#fff';
        switch (d) {
            case 1:
                ctx.beginPath();
                ctx.arc(x + (90) / 2, 95, 5, 0, 2 * Math.PI);
                ctx.fill();
                break;
            case 2:
                ctx.beginPath();
                ctx.arc(x + (90) / 2 - 25, 95, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 + 25, 95, 5, 0, 2 * Math.PI);
                ctx.fill();
                break;
            case 3:
                ctx.beginPath();
                ctx.arc(x + (90) / 2 - 25, 75, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2, 95, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 + 25, 115, 5, 0, 2 * Math.PI);
                ctx.fill();
                break;
            case 4:
                ctx.beginPath();
                ctx.arc(x + (90) / 2 - 25, 75, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 + 25, 75, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 - 25, 115, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 + 25, 115, 5, 0, 2 * Math.PI);
                ctx.fill();
                break;
            case 5:
                ctx.beginPath();
                ctx.arc(x + (90) / 2 - 25, 75, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 + 25, 75, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2, 95, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 - 25, 115, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 + 25, 115, 5, 0, 2 * Math.PI);
                ctx.fill();
                break;
            case 6:
                ctx.arc(x + (90) / 2 - 25, 75, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 + 25, 75, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 - 25, 95, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 + 25, 95, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 - 25, 115, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + (90) / 2 + 25, 115, 5, 0, 2 * Math.PI);
                ctx.fill();
                break;


        }


    }


    draw() {
        ctx.fillStyle = '#16b700';
        ctx.fillRect(this.x_1, 50, 90, 90);
        ctx.fillRect(this.x_2, 50, 90, 90);

        this.draw_point(this.x_1, this.digit[0]);
        this.draw_point(this.x_2, this.digit[1]);
        ctx.fillStyle = '#fff';
        let sum = +this.digit[0] + +this.digit[1];
        ctx.fillText("Вам выпало:" + sum, this.x_1, 160, 120);
        return sum;

    }

}

