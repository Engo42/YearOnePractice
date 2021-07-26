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
                this.cardsUI[i].deleteSelf();
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
    deleteSelf() {
        for (var i = 0; i < this.cardsUI.length; i++) {
            this.cardsUI[i].deleteSelf();
        }
        this.buyButton.deleteSelf();
        this.delete;
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
    deleteSelf() {
        this.lowTrigger.deleteSelf();
        this.highTrigger.deleteSelf();
        this.useButton.deleteSelf();
        this.delete;
    }
}