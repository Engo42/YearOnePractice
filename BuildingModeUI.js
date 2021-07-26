class BuildModeUI {
    constructor() {
        this.state = -1;
        this.buttons = new Array(3);
        this.childUI = new EmptyUI;
        for (var i = 0; i < 3; i++) {
            this.buttons[i] = new Button(10, 560 + i * 60, 300, 50, i, this,
                function (id, parentUI) {
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
    deleteSelf() {
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].deleteSelf();
        }
        this.childUI.deleteSelf();
        this.delete;
    }
}

class RoadBuilderUI {
    constructor() {
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
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 7; j++) {
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
    draw() {
    }
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
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 7; j++) {
                for (var k = 0; k < 3; k++) {
                    if (this.vertexes[i][j][k] != null 
                    && this.vertexes[i][j][k].player === currentPlayer && this.vertexes[i][j][k].level === 1) {
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
    draw() {
    }
    deleteSelf() {
        gameUI.fieldUI.highlightVertexes = [];
        for (var i = 0; i < this.buttons.length; i++) {
            this.buttons[i].deleteSelf();
        }
        this.delete;
    }
}