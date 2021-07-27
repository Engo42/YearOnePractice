//const { Resources } = require("winjs"); не знаю, откуда это взялось

class GameUI {
    constructor(field) {
        this.fieldUI = new FieldUI(field);
        this.modeMenuUI = new ModeMenuUI;
        this.PlayerInfoU1 = new PlayerInfoU(players[0]);
        this.PlayerInfoU2 = new PlayerInfoU(players[1]);
        this.PlayerInfoU3 = new PlayerInfoU(players[2]);
        this.PlayerInfoU4 = new PlayerInfoU(players[3]);
    }

    draw() {
        this.fieldUI.draw();
        this.modeMenuUI.draw();
        this.PlayerInfoU1.draw();
        this.PlayerInfoU2.draw();
        this.PlayerInfoU3.draw();
        this.PlayerInfoU4.draw();
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
        this.vertexImg = new Array(2);
        for (var i = 0; i < 2; i++) {
            this.vertexImg[i] = new Array(3);
            this.vertexImg[i][0] = new Image;
            this.vertexImg[i][0].src = './Sprites/Vertexes/d' + i + 'l0.png';
            for (var j = 1; j < 3; j++) {
                this.vertexImg[i][j] = new Array(4);
                for (var k = 0; k < 4; k++) {
                    this.vertexImg[i][j][k] = new Image;
                    this.vertexImg[i][j][k].src = './Sprites/Vertexes/d' + i + 'l' + j + 'p' + k + '.png';
                }
            }
        }
        this.highlightEdges = new Array;
        this.highlightVertexes = new Array;
    }

    draw() {
        var img;
        for (var i = 0; i < this.field.hexArray.length; i++) {
            var hex = this.field.hexArray[i];
            ctx.drawImage(hex.img, 180 + hex.x * 160 + hex.y * 80, -130 + hex.y * 140);
            if (hex.level !== 0) {
                ctx.fillStyle = "white";
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.font = "48px Arial";
                ctx.fillText(hex.level, 283 + hex.x * 160 + hex.y * 80, -25 + hex.y * 140);
            } else if (hex.bandit === 1) { ///я же правильно понимаю,что у него там до этого проверка была, типа
                ///нужен он или нет?
                ctx.drawImage(hex.img_bandit, 243 + hex.x * 160 + hex.y * 80, -100 + hex.y * 140);
            }
        }

        for (var i = 0; i < this.field.edgeArray.length; i++) {
            var edge = this.field.edgeArray[i];
            if (edge.player === -1)
                img = this.edgeImg[edge.direction][4];
            else
                img = this.edgeImg[edge.direction][edge.player];
            ctx.drawImage(img, 180 + edge.x * 160 + edge.y * 80, -130 + edge.y * 140);
        }
        ctx.globalAlpha = 0.5;
        for (var i = 0; i < this.highlightEdges.length; i++) {
            var edge = this.highlightEdges[i];
            img = this.edgeImg[edge.direction][currentPlayer];
            ctx.drawImage(img, 180 + edge.x * 160 + edge.y * 80, -130 + edge.y * 140);
        }

        ctx.globalAlpha = 1;
        for (var i = 0; i < this.field.vertexArray.length; i++) {
            var vertex = this.field.vertexArray[i];
            if (vertex.player === -1)
                img = this.vertexImg[vertex.direction][0];
            else
                img = this.vertexImg[vertex.direction][vertex.level][vertex.player];
            ctx.drawImage(img, 180 + vertex.x * 160 + vertex.y * 80, -130 + vertex.y * 140);
        }
        ctx.globalAlpha = 0.5;
        for (var i = 0; i < this.highlightVertexes.length; i++) {
            var vertex = this.highlightVertexes[i];
            img = this.vertexImg[vertex.direction][vertex.level + 1][currentPlayer];
            ctx.drawImage(img, 180 + vertex.x * 160 + vertex.y * 80, -130 + vertex.y * 140);
        }
        ctx.globalAlpha = 1;
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
        this.childUI.deleteSelf();
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

class PlayerInfoU {
    constructor(player) {
        this.player = player;
        this.img_resource_0 = new Image();
        this.img_resource_0.src = 'Sprites/Resources/wood.png';
        this.img_resource_1 = new Image();
        this.img_resource_1.src = 'Sprites/Resources/wool.png';
        this.img_resource_2 = new Image();
        this.img_resource_2.src = 'Sprites/Resources/corn.png';
        this.img_resource_3 = new Image();
        this.img_resource_3.src = 'Sprites/Resources/clay26.png';
        this.img_resource_4 = new Image();
        this.img_resource_4.src = 'Sprites/Resources/iron.png';
        this.img_resources = [this.img_resource_0, this.img_resource_1, this.img_resource_2, this.img_resource_3, this.img_resource_4]; //*/
        //this.img_knight = new Image();
        //this.img_knight.src = 'Sprites/Indicators/knight30.png'
        //'Sprites/Hexes/t' + this.type + '.png';
    }
    draw() {

        ctx.fillStyle = this.player.color;
        let highBoard = highBoardOfHighest + (heightOfBig + 10) * this.player.number;
        ctx.fillStyle = this.player.color;
        ctx.fillRect(leftBoard - 10, highBoard, widthOfBig, heightOfBig);
        ctx.font = "20px serif";
        ctx.fillStyle = "black";
        ctx.fillText(this.player.name, leftBoard + 32, highBoard + 25);
        for (let j = 0; j < 5; j++) {
            ctx.drawImage(this.img_resources[j], leftBoard - 3 + j * (widthOfSmall + 32), highBoard + 47);
            ctx.fillText(this.player.resources[j], leftBoard + 9 + j * (widthOfSmall + 32), highBoard + 40 + heightOfSmall + 40);
        }
        //ctx.drawImage(this.img_knight, 200, 200);
    }
}