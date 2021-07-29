class TradingModeUI {
    constructor() {
        this.buttonsSellInc = new Array;
        this.buttonsSellDec = new Array;
        this.buttonsBuyInc = new Array;
        this.buttonsBuyDec = new Array;
        this.resourceSell = new Array(5);
        this.resourceBuy = new Array(5);
        for (var i = 0; i < 5; i++) {
            this.resourceSell[i] = 0;
            this.resourceBuy[i] = 0;
            this.buttonsSellInc[i] = new Button(60 + i * 70, 600, 20, 20, i, this,
                function(id, parentUI) {
                    parentUI.resourceSell[id]++;
                }
            );
            this.buttonsSellDec[i] = new Button(60 + i * 70, 645, 20, 20, i, this,
                function(id, parentUI) {
                    if (parentUI.resourceSell[id] > 0)
                        parentUI.resourceSell[id]--;
                }
            );
            this.buttonsBuyInc[i] = new Button(60 + i * 70, 700, 20, 20, i, this,
                function(id, parentUI) {
                    parentUI.resourceBuy[id]++;
                }
            );
            this.buttonsBuyDec[i] = new Button(60 + i * 70, 745, 20, 20, i, this,
                function(id, parentUI) {
                    parentUI.resourceBuy[id]--;
                }
            );
        }
    }

    frameAction() {
        for (var i = 0; i < 5; i++) {
            if (this.resourceSell[i] === players[currentPlayer].resources[i])
                this.buttonsSellInc[i].active = false;
            else
                this.buttonsSellInc[i].active = true;
            if (this.resourceSell[i] === 0)
                this.buttonsSellDec[i].active = false;
            else
                this.buttonsSellDec[i].active = true;
            
            if (arrSum(this.resourceBuy) * 2 + 2 > arrSum(this.resourceSell))
                this.buttonsBuyInc[i].active = false;
            else
                this.buttonsBuyInc[i].active = true;
            if (this.resourceBuy[i] === 0)
                this.buttonsBuyDec[i].active = false;
            else
                this.buttonsBuyDec[i].active = true;
        }
    }

    draw() {
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.fillStyle = 'white';
        ctx.font = "24px Arial";
        ctx.fillText('Продать', 10, 570);
        ctx.fillText('Купить', 10, 670);
        for (var i = 0; i < 5; i++) {
            drawColorBox(this.buttonsSellInc[i], '#444444', '#000088', '#4444FF', '#0000FF');
            drawColorBox(this.buttonsSellDec[i], '#444444', '#000088', '#4444FF', '#0000FF');
            drawColorBox(this.buttonsBuyInc[i], '#444444', '#000088', '#4444FF', '#0000FF');
            drawColorBox(this.buttonsBuyDec[i], '#444444', '#000088', '#4444FF', '#0000FF');
            ctx.fillStyle = 'white';
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText(this.resourceSell[i], 70 + i * 70, 620 + 14);
            ctx.fillText(this.resourceBuy[i], 70 + i * 70, 720 + 14);
        }
    }

    deleteSelf() {
    }
}