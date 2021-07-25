class GameUI {
    constructor(field) {
        this.fieldUI = new FieldUI(field);
        this.modeMenuUI = new ModeMenuUI;
        this.PlayerInfoU = new PlayerInfoU(players[0]);
    }

    draw() {
        this.fieldUI.draw();
        this.modeMenuUI.draw();
        this.PlayerInfoU.draw();
    }
}

class FieldUI {
    constructor(field) {
        this.field = field;
    }

    draw() {
        for (var i = 0; i < this.field.hexArray.length; i++) {
            var hex = this.field.hexArray[i];
            ctx.drawImage(hex.img, 420 + hex.x * 160 + hex.y * 80, 10 + hex.y * 140);
            if (hex.level !== 0) {
                ctx.fillStyle = "white";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.font = "48px Arial";
                ctx.fillText(hex.level, 523 + hex.x * 160 + hex.y * 80, 115 + hex.y * 140);
            }
        }
        for (var i = 0; i < this.field.edgeArray.length; i++) {
            var edge = this.field.edgeArray[i];
            ctx.drawImage(edge.img, 420 + edge.x * 160 + edge.y * 80, 10 + edge.y * 140);
        }
        for (var i = 0; i < this.field.vertexArray.length; i++) {
            var vertex = this.field.vertexArray[i];
            ctx.drawImage(vertex.img, 420 + vertex.x * 160 + vertex.y * 80, 10 + vertex.y * 140);
        }
    }
}

class ModeMenuUI {
    constructor() {
        this.state = 0;
        this.buttons = new Array(3);
        this.childUI = new BuildModeUI;
        for (var i = 0; i < 3; i++) {
            this.buttons[i] = new Button(10 + 60 * i, 500, 50, 50, i, this,
                function (id, parentUI) {
                    parentUI.buttons[parentUI.state].active = true;
                    parentUI.changeState(id);
                    parentUI.buttons[id].active = false;
                }
            )
        }
        this.buttons[0].active = false;
    }

    changeState(newState) {
        this.childUI.delete;
        this.state = newState;
        if (newState === 0) {
            this.childUI = new BuildModeUI;
        }
        if (newState === 1) {
            this.childUI = new DevelopmentModeUI;
        }
        if (newState === 2) {
            this.childUI = new DevelopmentModeUI;
        }
    }

    draw() {
        for (var i = 0; i < 3; i++) {
            if (this.buttons[i].active === false)
                ctx.fillStyle = '#444444';
            else if (this.buttons[i].pressed)
                ctx.fillStyle = '#884400';
            else if (this.buttons[i].hover)
                ctx.fillStyle = '#FFAA22';
            else
                ctx.fillStyle = '#FF8800';
            ctx.fillRect(10 + 60 * i, 500, 50, 50);
        }
        this.childUI.frameAction();
        this.childUI.draw();
    }
}

class DevelopmentModeUI {
    constructor() {
        this.deckX = 40;
        this.deckLowY = 1020;
        this.deckHighY = 585;
        this.deckWidth = 580;
        var width;
        var step;
        this.cards = players[currentPlayer].developmentCards;
        this.cardsUI = new Array(this.cards.length);
        for (var i = 0; i < this.cardsUI.length; i++) {
            if (i === this.cardsUI.length - 1)
                width = 300;
            else
                width = (this.deckWidth - 300) / (this.cards.length - 1);
            if (this.cardsUI.length - 1 === 0)
                step = 0;
            else
                step = (this.deckWidth - 300) / (this.cards.length - 1);
            this.cardsUI[i] = new DevelopmentCardUI(this.deckX + i * step,
                this.deckLowY, this.deckHighY, width, this.cards[i]);
        }
        this.buyButton = new Button(640, 980, 200, 60, 0, this,
            function (id, parentUI) {
                parentUI.cardsUI.push(new DevelopmentCardUI(parentUI.deckX + parentUI.deckWidth,
                    parentUI.deckLowY, parentUI.deckHighY, 300, players[currentPlayer].buyCard()));
            }
        )
    }

    frameAction() {
        var width;
        var step;
        for (var i = 0; i < this.cardsUI.length; i++) {
            this.cardsUI[i].frameAction();

            if (i === this.cardsUI.length - 1)
                width = 300;
            else
                width = (this.deckWidth - 300) / (this.cards.length - 1);
            if (this.cardsUI.length - 1 === 0)
                step = 0;
            else
                step = (this.deckWidth - 300) / (this.cards.length - 1);
            this.cardsUI[i].targetX = this.deckX + i * step;
            this.cardsUI[i].width = width;

            if (this.cardsUI[i].used) {
                players[currentPlayer].useCard(i);
                this.cardsUI.splice(i, 1);
                for (var j = 0; j < this.cards.length; j++) {
                    //this.cards[j].active = false;
                }
                i--;
            }
        }
    }

    draw() {
        for (var i = 0; i < this.cardsUI.length; i++) {
            this.cardsUI[i].draw();
        }
        if (this.buyButton.active === false)
            ctx.fillStyle = '#444444';
        else if (this.buyButton.pressed)
            ctx.fillStyle = '#004400';
        else if (this.buyButton.hover)
            ctx.fillStyle = '#00FF00';
        else
            ctx.fillStyle = '#00AA00';
        ctx.fillRect(this.buyButton.x, this.buyButton.y, this.buyButton.width, this.buyButton.height);
    }
}

class DevelopmentCardUI {
    constructor(x, lowY, highY, width, card) {
        this.card = card;
        this.used = false;

        this.deckLowY = lowY;
        this.deckHighY = highY;
        this.x = x;
        this.y = lowY;
        this.width = width;
        this.targetX = x;
        this.targetY = lowY;

        this.lowTrigger = new Button(this.x, this.y, this.width, 60, 0, this, noop);
        this.highTrigger = new Button(this.x, this.y, 300, 435, 0, this, noop);
        this.highTrigger.active = false;
        this.useButton = new Button(this.x + 80, this.y + 380, 140, 40, card.active, this,
            function (id, parentUI) {
                parentUI.used = true;
            }
        );
    }

    frameAction() {
        this.useButton.active = this.card.active;

        if (this.lowTrigger.hover || this.highTrigger.hover) {
            this.targetY = this.deckHighY;
            this.highTrigger.active = true;
        } else {
            this.targetY = this.deckLowY;
            this.highTrigger.active = false;
        }
        this.lowTrigger.x = this.x;
        this.lowTrigger.width = this.width;
        this.highTrigger.x = this.x;
        this.highTrigger.y = this.y;
        this.highTrigger.height = this.deckLowY - this.y + 1;
        this.useButton.x = this.x + 80;
        this.useButton.y = this.y + 380;

        if (this.targetX - this.x > 15)
            this.x += 15;
        if (this.targetX - this.x < -15)
            this.x -= 15;
        if (Math.abs(this.targetX - this.x) <= 15)
            this.x = this.targetX;
        if (this.targetY - this.y > 25)
            this.y += 25;
        if (this.targetY - this.y < -25)
            this.y -= 25;
        if (Math.abs(this.targetY - this.y) <= 25)
            this.y = this.targetY;
    }

    draw() {
        ctx.drawImage(this.card.img, this.x, this.y);
        if (this.useButton.active === false)
            ctx.fillStyle = '#444444';
        else if (this.useButton.pressed)
            ctx.fillStyle = '#004400';
        else if (this.useButton.hover)
            ctx.fillStyle = '#00FF00';
        else
            ctx.fillStyle = '#00AA00';
        ctx.fillRect(this.useButton.x, this.useButton.y, this.useButton.width, this.useButton.height);
    }
}

class BuildModeUI {
    constructor() {
        this.state = 0;
        this.buttons = new Array(3);
        this.childUI = new RoadBuilderUI;
        for (var i = 0; i < 3; i++) {
            this.buttons[i] = new Button(10, 560 + i * 60, 300, 50, i, this,
                function (id, parentUI) {
                    parentUI.buttons[parentUI.state].active = true;
                    parentUI.changeState(id);
                    parentUI.buttons[id].active = false;
                }
            )
        }
        this.buttons[0].active = false;
    }

    changeState(newState) {
        this.childUI.delete;
        this.state = newState;
        if (newState === 0) {
            this.childUI = new RoadBuilderUI;
        }
        if (newState === 1) {
            this.childUI = new RoadBuilderUI;
        }
        if (newState === 2) {
            this.childUI = new RoadBuilderUI;
        }
    }

    frameAction() {
        this.childUI.frameAction();
    }

    draw() {
        for (var i = 0; i < 3; i++) {
            if (this.buttons[i].active === false)
                ctx.fillStyle = '#444444';
            else if (this.buttons[i].pressed)
                ctx.fillStyle = '#000088';
            else if (this.buttons[i].hover)
                ctx.fillStyle = '#4444FF';
            else
                ctx.fillStyle = '#0000FF';
            ctx.fillRect(10, 560 + i * 60, 300, 50);
        }
        this.childUI.draw();
    }
}

class RoadBuilderUI {
    constructor() {
        this.roads = field.edgeArray;
        this.buttons = new Array;
        for (var i = 0; i < this.roads.length; i++) {

        }
    }

    frameAction() {
    }

    draw() {
    }
}


class PlayerInfoU {
    constructor(Player) {
        this.Player = Player;
    }

    draw() {
        console.log(5);
        ctx.fillStyle = this.color;
        console.log(this.color);
        let highBoard = highBoardOfHighest + (heightOfBig + 10) * this.number;
        ctx.fillStyle = this.color;
        ctx.fillRect(leftBoard, highBoard, widthOfBig, heightOfBig);
        ctx.font = "20px serif";
        ctx.fillStyle = "white";
        ctx.fillText(this.name, leftBoard + 5, highBoard + 25);
        for (let j = 0; j < 5; j++) {
            ctx.fillStyle = "yellow";
            ctx.fillRect(leftBoard + j * (widthOfSmall + 5), highBoard + 40, widthOfSmall, heightOfSmall);
            ctx.fillText("0", leftBoard + j * (widthOfSmall + 5), highBoard + 40 + heightOfSmall + 2);
        }
    }
}