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
        let text = [" Road", "   Colony", "City"]
        let img_corn = new Image();
        let img_wood = new Image();
        let img_clay = new Image();
        let img_iron = new Image();
        let img_wool = new Image();
        img_clay.src = "Sprites/Resources/clay.png";
        img_corn.src = "Sprites/Resources/corn.png";
        img_iron.src = "Sprites/Resources/iron.png";
        img_wood.src = "Sprites/Resources/wood.png";
        img_wool.src = "Sprites/Resources/wool.png";


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
            ctx.fillStyle = 'white';
            ctx.font = "22px Verdana";
            ctx.fillText(text[i], 70, 590 + i * 58, 120)
            if (i === 0) {
                ctx.drawImage(img_clay, 210, 565 + i * 60, 40, 40);
                ctx.drawImage(img_wood, 260, 565 + i * 60, 40, 40);
            } else if (i === 1) {
                ctx.drawImage(img_clay, 130, 565 + i * 60, 40, 40);
                ctx.drawImage(img_wood, 175, 565 + i * 60, 40, 40);
                ctx.drawImage(img_wool, 225, 565 + i * 60, 40, 40);
                ctx.drawImage(img_corn, 270, 565 + i * 60, 40, 40);
            } else {
                ctx.drawImage(img_iron, 145, 565 + i * 60, 40, 40);
                ctx.drawImage(img_iron, 165, 565 + i * 60, 40, 40);
                ctx.drawImage(img_iron, 185, 565 + i * 60, 40, 40);
                ctx.drawImage(img_corn, 270, 565 + i * 60, 40, 40);
                ctx.drawImage(img_corn, 235, 565 + i * 60, 40, 40);
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
    constructor() {}

    frameAction() {}

    draw() {}

    deleteSelf() {
        this.delete;
    }
}

class RoadBuilderUI {
    constructor() {
        this.ParentUI = gameUI.modeMenuUI.childUI;
        this.roads = field.edgeMap;
        this.target = -1;
        this.buttons = new Array;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                for (var k = 0; k < 3; k++) {
                    if (this.roads[i][j][k] != null && this.roads[i][j][k].player == -1) {
                        var available = false;
                        for (var q = 0; q < 4; q++) {
                            if (this.roads[i][j][k].edges[q] != null && this.roads[i][j][k].edges[q].player == currentPlayer &&
                                (this.roads[i][j][k].vertexes[Math.floor(q / 2)].player == -1 ||
                                    this.roads[i][j][k].vertexes[Math.floor(q / 2)].player == currentPlayer))
                                available = true;
                        }
                        for (var q = 0; q < 2; q++) {
                            if (this.roads[i][j][k].vertexes[q].player == currentPlayer)
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
            //players[currentPlayer].buyRoad
            players[currentPlayer].buildRoad(this.target[0], this.target[1], this.target[2]);
            this.ParentUI.changeState(-1);
        }
    }

    draw() {}

    deleteSelf() {
        gameUI.fieldUI.highlightEdges = [];
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].deleteSelf();
        }
        this.delete;
    }
}

class SettlementBuilderUI {
    constructor() {
        this.ParentUI = gameUI.modeMenuUI.childUI;
        this.vertexes = field.vertexMap;
        this.target = -1;
        this.buttons = new Array;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                for (var k = 0; k < 3; k++) {
                    if (this.vertexes[i][j][k] != null && this.vertexes[i][j][k].player == -1) {
                        var available = false;
                        for (var q = 0; q < 3; q++) {
                            if (this.vertexes[i][j][k].edges[q] != null && this.vertexes[i][j][k].edges[q].player == currentPlayer)
                                available = true;
                        }
                        for (var q = 0; q < 3; q++) {
                            if (this.vertexes[i][j][k].vertexes[q] != null && this.vertexes[i][j][k].vertexes[q].level > 0)
                                available = false;
                        }
                        if (available) {
                            this.buttons.push(new SpriteButton(j, i, 2, this.vertexes[i][j][k].direction, this));
                            gameUI.fieldUI.highlightVertexes.push(this.vertexes[i][j][k]);
                        }
                    }
                }
            }
        }
    }

    frameAction() {
        if (this.target != -1) {
            players[currentPlayer].buildSettlement(this.target[0], this.target[1], this.target[2]);
            this.ParentUI.changeState(-1);
        }
    }

    draw() {}

    deleteSelf() {
        gameUI.fieldUI.highlightVertexes = [];
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].deleteSelf();
        }
        this.delete;
    }
}

class CityBuilderUI {
    constructor() {
        this.ParentUI = gameUI.modeMenuUI.childUI;
        this.vertexes = field.vertexMap;
        this.target = -1;
        this.buttons = new Array;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                for (var k = 0; k < 3; k++) {
                    if (this.vertexes[i][j][k] != null &&
                        this.vertexes[i][j][k].player === currentPlayer && this.vertexes[i][j][k].level === 1) {
                        this.buttons.push(new SpriteButton(j, i, 2, this.vertexes[i][j][k].direction, this));
                        gameUI.fieldUI.highlightVertexes.push(this.vertexes[i][j][k]);
                    }
                }
            }
        }
    }

    frameAction() {
        if (this.target != -1) {
            players[currentPlayer].buildCity(this.target[0], this.target[1], this.target[2]);
            this.ParentUI.changeState(-1);
        }
    }

    draw() {}

    deleteSelf() {
        gameUI.fieldUI.highlightVertexes = [];
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].deleteSelf();
        }
        this.delete;
    }
}