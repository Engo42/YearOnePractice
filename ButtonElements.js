class Button {
    constructor(x, y, width, height, id, parentUI, onClick){
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
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            this.hover = true;
        }
        else {
            if (this.pressed) {
                this.pressed = false;
            }
            this.hover = false;
        }
    }
    checkRelease() {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            if (this.pressed == true) {
                this.pressed = false;
                this.onClick(this.id, this.parentUI);
            }
        }
    }
    checkPress() {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
            this.pressed = true;
        }
    }
}