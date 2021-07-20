var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

var field = new Array(7);
var hexArray = new Array;
var edgeArray = new Array;
var vertexArray = new Array;

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
	for (var i = 0; i < hexArray.length; i++) {
		hexArray[i].Draw();
	}
	for (var i = 0; i < edgeArray.length; i++) {
		edgeArray[i].Draw();
	}
	for (var i = 0; i < vertexArray.length; i++) {
		vertexArray[i].Draw();
	}
}
function gameOpen(){
	var typeMap = [
		[0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 1, 1, 0],
		[0, 0, 1, 1, 1, 1, 0],
		[0, 1, 1, 2, 1, 1, 0],
		[0, 1, 1, 1, 1, 0, 0],
		[0, 1, 1, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0]
	]
	var typeDeck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5];
	typeDeck = shuffle(typeDeck);
	var levelDeck = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
	typeDeck = shuffle(typeDeck);	
	
	for (var i = 0; i < 7; i++) {
		field[i] = new Array(7);
		for (var j = 0; j < 7; j++) {
			if (typeMap[i][j] == 0)
				field[i][j] = null;
			if (typeMap[i][j] == 1)
				field[i][j] = new Hex(j, i, typeDeck.pop(), levelDeck.pop());
			if (typeMap[i][j] == 2)
				field[i][j] = new Hex(j, i, 0, 0);
		}
	}
}
gameOpen();
setInterval(frameLoop, 100/6);