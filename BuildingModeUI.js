class BuildModeUI {
    constructor() {
        this.state = -1;
        this.buttons = new Array(3);
        this.childUI = new EmptyUI;
        this.img_corn = new Image();
        this.img_wood = new Image();
        this.img_clay = new Image();
        this.img_iron = new Image();
        this.img_wool = new Image();
        this.img_clay.src = "Sprites/Resources/clay.png";
        this.img_corn.src = "Sprites/Resources/corn.png";
        this.img_iron.src = "Sprites/Resources/iron.png";
        this.img_wood.src = "Sprites/Resources/wood.png";
        this.img_wool.src = "Sprites/Resources/wool.png";

        for (let i = 0; i < 3; i++) {
            this.buttons[i] = new Button(10, 560 + i * 60, 300, 50, i, this,
                function (id, parentUI) {

                    parentUI.changeState(id);
                }
            )


        }

    }

    changeState(newState) {

        if (this.state !== -1)
            this.buttons[this.state].active = true;
        if (newState !== -1)
            this.buttons[newState].active = false;

        this.childUI.deleteSelf();
        this.state = newState;
        if (newState === -1)
            this.childUI = new EmptyUI;
        if (newState === 0)
            this.childUI = new RoadBuilderUI;
        if (newState === 1)
            this.childUI = new SettlementBuilderUI;
        if (newState === 2)
            this.childUI = new CityBuilderUI;
    }


    frameAction() {
        this.childUI.frameAction();
    }

    draw() {
        let text = ["Дорога", "Поселение", "Город"]

        this.buttons[0].active = players[currentPlayer].check_Resources("Road") || players[currentPlayer].ingRoad;
        this.buttons[1].active = players[currentPlayer].check_Resources("Settlement") || players[currentPlayer].ingSettlementExists;
        this.buttons[2].active = players[currentPlayer].check_Resources("City");
        for (var i = 0; i < 3; i++) {
            if (this.buttons[i].active === false)
                ctx.fillStyle = '#444444';
            else if (this.buttons[i].pressed)
                ctx.fillStyle = '#000088';
            else if (this.buttons[i].hover)
                ctx.fillStyle = '#4444FF';
            else
                ctx.fillStyle = '#0000FF';
            ctx.fillRect(10, 560 + i * 60, 340, 50);
            ctx.textBaseline = "middle";
            ctx.textAlign = "left";
            ctx.fillStyle = 'white';
            ctx.font = "24px Arial";
            ctx.fillText(text[i], 20, 585 + i * 60)
            if (i === 0) {
                ctx.drawImage(this.img_clay, 260, 565 + i * 60, 40, 40);
                ctx.drawImage(this.img_wood, 300, 565 + i * 60, 40, 40);
            } else if (i === 1) {
                ctx.drawImage(this.img_clay, 180, 565 + i * 60, 40, 40);
                ctx.drawImage(this.img_wood, 220, 565 + i * 60, 40, 40);
                ctx.drawImage(this.img_wool, 260, 565 + i * 60, 40, 40);
                ctx.drawImage(this.img_corn, 300, 565 + i * 60, 40, 40);
            } else {
                ctx.drawImage(this.img_iron, 180, 565 + i * 60, 40, 40);
                ctx.drawImage(this.img_iron, 210, 565 + i * 60, 40, 40);
                ctx.drawImage(this.img_iron, 240, 565 + i * 60, 40, 40);
                ctx.drawImage(this.img_corn, 270, 565 + i * 60, 40, 40);
                ctx.drawImage(this.img_corn, 300, 565 + i * 60, 40, 40);
            }
        }
        this.childUI.draw();

    }

    deleteSelf() {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].deleteSelf();
        }
        this.childUI.deleteSelf();
        this.delete;
    }
}

class EmptyUI {
    constructor() {
    }

    frameAction() {
    }

    draw() {
    }

    deleteSelf() {
        this.delete;
    }
}

class RoadBuilderUI {
    constructor() {
        this.ParentUI = UI.modeMenuUI.childUI;
        this.roads = field.edgeMap;
        this.target = -1;
        this.buttons = new Array;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                for (var k = 0; k < 3; k++) {
                    if (this.roads[i][j][k] != null && this.roads[i][j][k].player === -1) {
                        var available = false;
                        for (var q = 0; q < 4; q++) {
                            if (this.roads[i][j][k].edges[q] != null && this.roads[i][j][k].edges[q].player === currentPlayer &&
                                (this.roads[i][j][k].vertexes[Math.floor(q / 2)].player === -1 ||
                                    this.roads[i][j][k].vertexes[Math.floor(q / 2)].player === currentPlayer))
                                available = true;
                        }
                        for (var q = 0; q < 2; q++) {
                            if (this.roads[i][j][k].vertexes[q].player === currentPlayer)
                                available = true;
                        }
                        if (available) {
                            this.buttons.push(new SpriteButton(j, i, 1, this.roads[i][j][k].direction, this));
                            UI.fieldUI.highlightEdges.push(this.roads[i][j][k]);
                        }
                    }
                }
            }
        }
    }

    frameAction() {
        if (this.target !== -1) {
            players[currentPlayer].buyRoad();
            players[currentPlayer].buildRoad(this.target[0], this.target[1], this.target[2]);
            this.ParentUI.changeState(-1);
        }
    }

    draw() {
    }

    deleteSelf() {
        UI.fieldUI.highlightEdges = [];
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].deleteSelf();
        }
        this.delete;
    }
}

class SettlementBuilderUI {
    constructor() {
        this.ParentUI = UI.modeMenuUI.childUI;
        this.vertexes = field.vertexMap;
        this.target = -1;
        this.buttons = new Array;

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                for (var k = 0; k < 3; k++) {
                    if (this.vertexes[i][j][k] != null && this.vertexes[i][j][k].player === -1) {

                        var available = false;
                        for (var q = 0; q < 3; q++) {
                            if (this.vertexes[i][j][k].edges[q] != null && this.vertexes[i][j][k].edges[q].player === currentPlayer)
                                available = true;
                        }
                        if (players[currentPlayer].ingSettlementExists !== 0) {
                            available = true;
                        }
                        for (var q = 0; q < 3; q++) {
                            if (this.vertexes[i][j][k].vertexes[q] != null && this.vertexes[i][j][k].vertexes[q].level > 0)
                                available = false;
                        }

                        if (available) {
                            this.buttons.push(new SpriteButton(j, i, 2, this.vertexes[i][j][k].direction, this));
                            UI.fieldUI.highlightVertexes.push(this.vertexes[i][j][k]);
                        }

                    }
                }
            }
        }
    }

    frameAction() {
        if (this.target !== -1) {
            players[currentPlayer].buySettlement();
            players[currentPlayer].buildSettlement(this.target[0], this.target[1], this.target[2]);
            this.ParentUI.changeState(-1);
        }
    }

    draw() {
    }

    deleteSelf() {
        UI.fieldUI.highlightVertexes = [];
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].deleteSelf();
        }
        this.delete;
    }
}

class CityBuilderUI {
    constructor() {
        this.ParentUI = UI.modeMenuUI.childUI;
        this.vertexes = field.vertexMap;
        this.target = -1;
        this.buttons = new Array;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                for (var k = 0; k < 3; k++) {
                    if (this.vertexes[i][j][k] != null &&
                        this.vertexes[i][j][k].player === currentPlayer && this.vertexes[i][j][k].level === 1) {
                        this.buttons.push(new SpriteButton(j, i, 2, this.vertexes[i][j][k].direction, this));
                        UI.fieldUI.highlightVertexes.push(this.vertexes[i][j][k]);
                    }
                }
            }
        }
    }

    frameAction() {
        if (this.target !== -1) {
            players[currentPlayer].buyCity();
            players[currentPlayer].buildCity(this.target[0], this.target[1], this.target[2]);
            this.ParentUI.changeState(-1);
        }
    }

    draw() {
    }

    deleteSelf() {
        UI.fieldUI.highlightVertexes = [];
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].deleteSelf();
        }
        this.delete;
    }
}