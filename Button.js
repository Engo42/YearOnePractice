class Button {
	constructor(x, y, width, height, onIdle, onHover, onPress, onClick){
		buttonArray.push(this);
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		
		//тут callback функции при разных состояниях кнопки
		this.onIdle = onIdle;
		this.onHover = onHover;
		this.onPress = onPress;
		this.onClick = onClick;
		
		this.pressed = false;
		this.color = 'grey';
	}
	onFrame() {
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
			if (this.pressed) {
				this.onPress();
			}
			else {
				this.onHover();
			}
		}
		else {
			if (this.pressed) {
				this.pressed = false;
			}
			this.onIdle();
		}
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	checkRelease() {
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
			if (this.pressed == true) {
				this.pressed = false;
				this.onClick();
			}
		}
	}
	checkPress() {
		if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
			this.pressed = true;
		}
	}
}