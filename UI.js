class GameUI {
	constructor(fieldUI){
		this.fieldUI = fieldUI;
	}
	draw() {
		this.fieldUI.draw();
	}
}

class FieldUI {
	constructor(field){
		this.field = field;
	}
	draw() {
		for (var i = 0; i < this.field.hexArray.length; i++) {
			let hex = this.field.hexArray[i];
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
			let edge = this.field.edgeArray[i];
			ctx.drawImage(edge.img, 420 + edge.x * 160 + edge.y * 80, 10 + edge.y * 140);
		}
		for (var i = 0; i < this.field.vertexArray.length; i++) {
			let vertex = this.field.vertexArray[i];
			ctx.drawImage(vertex.img, 420 + vertex.x * 160 + vertex.y * 80, 10 + vertex.y * 140);
		}
	}
}