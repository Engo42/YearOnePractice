var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

var buttonArray = new Array;
var field;
var fieldUI;
var gameUI;

function shuffle(a) {
	var i = a.length;
    var	j;
	while (0 !== i) {
		j = Math.floor(Math.random()*i);
		i--;
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function frameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < buttonArray.length; i++) {
		buttonArray[i].onFrame();
	}
	
	gameUI.draw();
	
	ctx.fillStyle = '#FF8800';
	ctx.fillRect(mouseX - 5, mouseY - 5, 10, 10);
}
function gameOpen(){ 
	field = new Field;
	gameUI = new GameUI(field);
}

gameOpen();
setInterval(frameLoop, 100/6);