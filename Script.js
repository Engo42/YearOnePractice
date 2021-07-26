var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

const leftBoard = 20; //константы для отрисовки списка игроков
const highBoardOfHighest = 10;
const heightOfBig = 100;
const widthOfBig = 200;
const heightOfSmall = 10;
const widthOfSmall = 10;

const playerColors = ['#FF0000', '#FFFF00', '#00FF00', '#0000FF'];

var buttonArray = new Array;
var field;
var gameUI;

var players;
var currentPlayer = 0;

function frameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].onFrame();
    }

    gameUI.draw();

    ctx.fillStyle = '#FF8800';
    ctx.fillRect(mouseX - 5, mouseY - 5, 10, 10);
}

function gameOpen() {
    let i;
    players = new Array(4);
    for (i = 0; i < 4; i++) {
        players[i] = new Player("Player_" + (i + 1), playerColors[i], i);
    }
    players[currentPlayer].developmentCards.push(new DevelopmentCard(0));
    players[currentPlayer].developmentCards.push(new DevelopmentCard(0));
    players[currentPlayer].developmentCards.push(new DevelopmentCard(1));
    players[currentPlayer].developmentCards.push(new DevelopmentCard(0));
    for (i = 0; i < 4; i++) {
        players[currentPlayer].developmentCards[i].active = true;
    }


    field = new Field;
    field.vertexArray[0].level = 1;
    field.vertexArray[0].player = currentPlayer;

    gameUI = new GameUI(field);

}

gameOpen();
setInterval(frameLoop, 100 / 6);