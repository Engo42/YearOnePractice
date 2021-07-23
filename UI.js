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
        this.childUI = new DevelopmentModeUI;
        for(var i = 0; i < 3; i++) {
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
    changeState(newState){
        this.childUI.delete;
        this.state = newState;
        if (newState == 0) {
            this.childUI = new DevelopmentModeUI;
        }
        if (newState == 1) {
            this.childUI = new DevelopmentModeUI;
        }
        if (newState == 2) {
            this.childUI = new DevelopmentModeUI;
        }
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
        this.childUI.frameAction();
        this.childUI.draw();
    }
}

class DevelopmentModeUI {
    constructor(){
        this.deckX = 40;
        this.deckLowY = 1020;
        this.deckHighY = 585;
        this.deckWidth = 600;
        
        this.state = 0;
        this.cards = players[currentPlayer].developmentCards;
        this.cardsUI = new Array(this.cards.length);
        for (var i = 0; i < this.cardsUI.length; i++) {
            if (i == this.cardsUI.length - 1)
                var width = 300;
            else
                var width = (this.deckWidth - 300)/(this.cards.length - 1)
            this.cardsUI[i] = new DevelopmentCardUI(this.deckX + i*(this.deckWidth - 300)/(this.cards.length - 1),
                                                    this.deckLowY, this.deckHighY, width, this.cards[i]);
        }
    }
    frameAction() {
        for (var i = 0; i < this.cardsUI.length; i++) {
            this.cardsUI[i].frameAction();
            if (this.cardsUI[i].used) {
                this.cards[i].use();
                this.cardsUI.splice(i, 1);
            }
            this.cardsUI[i].targetX = this.deckX + i*(this.deckWidth - 300)/(this.cards.length - 1);
            if (i == this.cardsUI.length - 1) {
                this.cardsUI[this.cardsUI.length - 1].width = 300;
                this.cardsUI[this.cardsUI.length - 1].lowTrigger.width = 300;                
            }
        }
    }
    draw() {
        for (var i = 0; i < this.cardsUI.length; i++) {
            this.cardsUI[i].draw();
        }
    }
}
class DevelopmentCardUI {
    constructor(x, lowY, highY, width, card){
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
        if (this.lowTrigger.hover || this.highTrigger.hover) {
            this.targetY = this.deckHighY;
            this.highTrigger.active = true;
        }
        else {
            this.targetY = this.deckLowY;
            this.highTrigger.active = false;
        }
        this.highTrigger.y = this.y;
        
        if (this.targetX - this.x > 5)
            this.x += 5;
        if (this.targetX - this.x < -5)
            this.x -= 5;
        if (Math.abs(this.targetX - this.x) <= 5)
            this.x = this.targetX;
        if (this.targetY - this.y > 20)
            this.y += 20;
        if (this.targetY - this.y < -20)
            this.y -= 20;
        if (Math.abs(this.targetY - this.y) <= 20)
            this.y = this.targetY;
    }
    draw() {
        ctx.drawImage(this.card.img, this.x, this.y);
    }
}