class GameUI {
    constructor(field){
        this.fieldUI = new FieldUI(field);
        this.modeMenuUI = new ModeMenuUI;
    }
    draw() {
        this.fieldUI.draw();
        this.modeMenuUI.draw();
    }
}

class FieldUI {
    constructor(field){
        this.field = field;
    }
    draw() {
        for (var i = 0; i < this.field.hexArray.length; i++) {
            var hex = this.field.hexArray[i];
            ctx.drawImage(hex.img, 420 + hex.x * 160 + hex.y * 80, 10 + hex.y * 140);
            if (hex.level != 0) {
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
    constructor(){
        this.state = 0;
        this.buttons = new Array(3);
        for(var i = 0; i < 3; i++) {
            this.buttons[i] = new Button(10 + 60 * i, 500, 50, 50, i, this,
                function(id, parentUI) {
                    parentUI.buttons[parentUI.state].active = true;
                    parentUI.state = id;
                    parentUI.buttons[id].active = false;
                }
            )
        }
        this.buttons[0].active = false;
    }
    draw() {
        for(var i = 0; i < 3; i++) {
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
    }
}

class DevelopmentModeUI {
    constructor(){
        this.state = 0;
        this.cards = players[currentPlayer].developmentCards;
        this.cardsUI = new Array(this.cards.length);
        for (var i = 0; i <= this.cardsUI.length; i++) {
            this.cardsUI[i] = new DevelopmentCardUI(this.cards[i]);
        }
    }
    draw() {
        
    }
}
class DevelopmentCardUI {
    constructor(card){
        this.card = card;
        this.parentUI = gameUI.developmentModeUI;
    }
    draw() {
        
    }
}

class DevelopmentCard {
    constructor(type){
        this.type = type;
        this.img = new Image();
        this.img.src = 'Sprites/Cards/Card' + this.type + '.png';
    }
    use() {
        
    }
}