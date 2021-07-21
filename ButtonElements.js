class Button {
	constructor(x, y, width, height, onHover, onPress, onClick){
		buttonArray.push(this);
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.onHover = onHover;
		this.onPress = onPress;
		this.onClick = onClick;
	}
	
}