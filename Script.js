var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

const leftBoard = 20; //константы для отрисовки списка игроков
const highBoardOfHighest = 10;
const heightOfBig = 100;
const widthOfBig = 300;
const heightOfSmall = 10;
const widthOfSmall = 10;

const playerColors = ['#FF0000', '#FFFF00', '#00FF00', '#0000FF'];
const typeMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 2, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]
var fieldTypeDeck = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5];
var fieldLevelDeck = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

var buttonArray = new Array;
var field;
var UI;
var players;
var currentPlayer = 0;
var gameState = 0;

var sessionData = {
    currentPlayer: 0,
    gameState: 0,
    playerCount: 1,
};
var sessionCode = -1;
var thisPlayer = 0;
var playerCount = 1;
var fieldChanges = new Array;
var playerChanges = new Array(4);

function frameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].onFrame();
    }

    if (players[currentPlayer].isLocalBot) {
        makeBotMove(players[currentPlayer]);
    }

    UI.draw();
}

function gameOpen() {

    if (thisPlayer === 0) {
        fieldTypeDeck = shuffle(fieldTypeDeck);
        fieldLevelDeck = shuffle(fieldLevelDeck);
    }
    field = new Field(fieldTypeDeck, fieldLevelDeck);
    players = new Array(4);
    for (var i = 0; i < 4; i++) {
        players[i] = new Player("Player_" + (i + 1), playerColors[i], i);
    }
    
    UI = new StartUI;
    
    players[currentPlayer].developmentCards.push(new DevelopmentCard(0));
    players[currentPlayer].developmentCards.push(new DevelopmentCard(0));
    players[currentPlayer].developmentCards.push(new DevelopmentCard(1));
    players[currentPlayer].developmentCards.push(new DevelopmentCard(0));
    for (i = 0; i < 4; i++) {
        players[currentPlayer].developmentCards[i].active = true;
    }

    field.vertexArray[10].level = 1;
    field.vertexArray[10].player = 0;
    field.vertexArray[30].level = 1;
    field.vertexArray[30].player = 1;
    field.vertexArray[0].level = 1;
    field.vertexArray[0].player = 2;
    field.vertexArray[20].level = 1;
    field.vertexArray[20].player = 3;
    
    setInterval(frameLoop, 100 / 6);
}

gameOpen();