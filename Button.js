class Button {
    constructor(x, y, width, height, id, parentUI, onClick) {
        buttonArray.push(this);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
        this.parentUI = parentUI;

        this.onClick = onClick;

        this.hover = false;
        this.pressed = false;
        this.active = true;
    }

    onFrame() {
        if (this.active && mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            this.hover = true;
        }
        else {
            this.pressed = false;
            this.hover = false;
        }
    }
    checkRelease() {
        if (this.pressed == true) {
            this.pressed = false;
            this.onClick(this.id, this.parentUI);
        }
    }
    checkPress() {
        if (this.hover) {
            this.pressed = true;
        }
    }
    deleteSelf() {
        buttonArray.splice(buttonArray.indexOf(this), 1);
        this.delete;
    }
}

class SpriteButton {
    constructor(x, y, type, direction, parentUI){
        buttonArray.push(this);
        this.x = 180 + x * 160 + y * 80;
        this.y = -130 + y * 140;
        this.width = 210;
        this.height = 210;
        this.type = type;
        this.direction = direction;
        this.parentUI = parentUI;
        this.id = [x, y, direction];
        
        this.ghostCanvas = document.createElement('canvas');
        this.ghostCanvas.width = 210;
        this.ghostCanvas.height = 210;
        this.gctx = this.ghostCanvas.getContext("2d");
        this.img = new Image();
        this.img.src = './Sprites/Buttons/t' + type + 'd' + direction + '.png';
        
        this.hover = false;
        this.pressed = false;
        this.active = false;
    }
    onClick() {
        this.parentUI.target = this.id;
    }
    onFrame() {
        if (this.active == false && this.img.complete) {
            this.gctx.drawImage(this.img, 0, 0);
            this.active = true;
        }
        if (this.active && mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height
            && this.gctx.getImageData(mouseX - this.x, mouseY - this.y, 1, 1).data[3] > 0) {
            this.hover = true;
        }
        else {
            this.pressed = false;
            this.hover = false;
        }
    }
    checkRelease() {
        if (this.hover && this.pressed == true) {
            this.pressed = false;
            this.onClick();
        }
    }

    checkPress() {
        if (this.hover) {
            this.pressed = true;
        }
    }
    deleteSelf() {
        buttonArray.splice(buttonArray.indexOf(this), 1);
        this.delete;
    }
}