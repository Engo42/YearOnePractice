class GameUI {
    constructor(field) {
        this.fieldUI = new FieldUI(field);
        this.modeMenuUI = new ModeMenuUI;
        this.PlayerInfoU = new PlayerInfoU;
    }
    draw() {
        this.fieldUI.draw();
        this.modeMenuUI.draw();
        this.PlayerInfoU.draw();
    }
}
class EmptyUI {
    constructor() {}
    frameAction() {}
    draw() {}
    deleteSelf() {
        this.delete;
    }
}

class FieldUI {
    constructor(field) {
        this.field = field;
        this.edgeImg = new Array(3);
        for (var i = 0; i < 3; i++) {
            this.edgeImg[i] = new Array(5);
            this.edgeImg[i][4] = new Image;
            this.edgeImg[i][4].src = './Sprites/Edges/d' + i + '.png';
            for (var j = 0; j < 4; j++) {
                this.edgeImg[i][j] = new Image;
                this.edgeImg[i][j].src = './Sprites/Edges/d' + i + 'p' + j + '.png';
            }
        }
        this.buildMode = 0;
        this.highlightEdges = new Array;
    }
    draw() {
        for (var i = 0; i < this.field.hexArray.length; i++) {
            var hex = this.field.hexArray[i];
            ctx.drawImage(hex.img, 180 + hex.x * 160 + hex.y * 80, -130 + hex.y * 140);
            if (hex.level != 0) {
                ctx.fillStyle = "white";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.font = "48px Arial";
                ctx.fillText(hex.level, 283 + hex.x * 160 + hex.y * 80, -25 + hex.y * 140);
            }
        }
        for (var i = 0; i < this.field.edgeArray.length; i++) {
            var edge = this.field.edgeArray[i];
            if (edge.player === -1)
                var img = this.edgeImg[edge.direction][4];
            else
                var img = this.edgeImg[edge.direction][edge.player];
            ctx.drawImage(img, 180 + edge.x * 160 + edge.y * 80, -130 + edge.y * 140);
        }
        ctx.globalAlpha = 0.5;
        for (var i = 0; i < this.highlightEdges.length; i++) {
            var edge = this.highlightEdges[i];
            var img = this.edgeImg[edge.direction][currentPlayer];
            ctx.drawImage(img, 180 + edge.x * 160 + edge.y * 80, -130 + edge.y * 140);
        }
        ctx.globalAlpha = 1;
        for (var i = 0; i < this.field.vertexArray.length; i++) {
            var vertex = this.field.vertexArray[i];
            ctx.drawImage(vertex.img, 180 + vertex.x * 160 + vertex.y * 80, -130 + vertex.y * 140);
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
                function(id, parentUI) {
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
        if (newState == 0) {
            this.childUI = new BuildModeUI;
        }
        if (newState == 1) {
            this.childUI = new DevelopmentModeUI;
        }
        if (newState == 2) {
            this.childUI = new DevelopmentModeUI;
        }
    }
    draw() {
        for (var i = 0; i < 3; i++) {
            if (this.buttons[i].active == false)
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

        this.cards = players[currentPlayer].developmentCards;
        this.cardsUI = new Array(this.cards.length);
        for (var i = 0; i < this.cardsUI.length; i++) {
            if (i == this.cardsUI.length - 1)
                var width = 300;
            else
                var width = (this.deckWidth - 300) / (this.cards.length - 1);
            if (this.cardsUI.length - 1 == 0)
                var step = 0;
            else
                var step = (this.deckWidth - 300) / (this.cards.length - 1);
            this.cardsUI[i] = new DevelopmentCardUI(this.deckX + i * step,
                this.deckLowY, this.deckHighY, width, this.cards[i]);
        }
        this.buyButton = new Button(640, 980, 200, 60, 0, this,
            function(id, parentUI) {
                parentUI.cardsUI.push(new DevelopmentCardUI(parentUI.deckX + parentUI.deckWidth,
                    parentUI.deckLowY, parentUI.deckHighY, 300, players[currentPlayer].buyCard()));
            }
        )
    }
    frameAction() {
        for (var i = 0; i < this.cardsUI.length; i++) {
            this.cardsUI[i].frameAction();

            if (i == this.cardsUI.length - 1)
                var width = 300;
            else
                var width = (this.deckWidth - 300) / (this.cards.length - 1);
            if (this.cardsUI.length - 1 == 0)
                var step = 0;
            else
                var step = (this.deckWidth - 300) / (this.cards.length - 1);
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
        if (this.buyButton.active == false)
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
            function(id, parentUI) {
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
        if (this.useButton.active == false)
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
        this.state = -1;
        this.buttons = new Array(3);
        this.childUI = new EmptyUI;
        for (var i = 0; i < 3; i++) {
            this.buttons[i] = new Button(10, 560 + i * 60, 300, 50, i, this,
                function(id, parentUI) {
                    parentUI.changeState(id);
                }
            )
        }
    }
    changeState(newState) {
        if (this.state != -1)
            this.buttons[this.state].active = true;
        if (newState != -1)
            this.buttons[newState].active = false;
        
        this.childUI.deleteSelf();
        this.state = newState;
        if (newState == -1)
            this.childUI = new EmptyUI;
        if (newState == 0)
            this.childUI = new RoadBuilderUI;
        if (newState == 1)
            this.childUI = new RoadBuilderUI;
        if (newState == 2)
            this.childUI = new RoadBuilderUI;
    }
    frameAction() {
        this.childUI.frameAction();
    }
    draw() {
        for (var i = 0; i < 3; i++) {
            if (this.buttons[i].active == false)
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
        gameUI.fieldUI.buildMode = 1;
        this.ParentUI = gameUI.modeMenuUI.childUI;
        this.roads = field.edgeMap;
        this.target = -1;
        this.buttons = new Array;
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 7; j++) {
                for (var k = 0; k < 3; k++) {
                    if (this.roads[i][j][k] != null && this.roads[i][j][k].player == -1) {
                        var available = false;
                        for (var q = 0; q < 4; q++) {
                            if (this.roads[i][j][k].edges[q] != null && this.roads[i][j][k].edges[q].player == currentPlayer)
                                available = true;
                        }
                        for (var q = 0; q < 2; q++) {
                            if (this.roads[i][j][k].vertexes[q] != null && this.roads[i][j][k].vertexes[q].player == currentPlayer)
                                available = true;
                        }
                        if (available) {
                            this.buttons.push(new SpriteButton(j, i, 1, this.roads[i][j][k].direction, this));
                            gameUI.fieldUI.highlightEdges.push(this.roads[i][j][k]);
                        }
                    }
                }
            }
        }
    }
    frameAction() {
        if (this.target != -1) {
            players[currentPlayer].buildRoad(this.target[0], this.target[1], this.target[2]);
            this.ParentUI.changeState(-1);
        }
    }
    draw() {
    }
    deleteSelf() {
        gameUI.fieldUI.buildMode = 1;
        gameUI.fieldUI.highlightEdges.length = 0;
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].delete;
        }
        this.delete;
    }
}


class PlayerInfoU {
    constructor(Player) {
        this.Player = Player;
    }
    draw() {
        ctx.fillStyle = this.color;
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