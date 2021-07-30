var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

const leftBoard = 20; //константы для отрисовки списка игроков
const highBoardOfHighest = 10;
const heightOfBig = 100;
const widthOfBig = 340;
const heightOfSmall = 10;
const widthOfSmall = 10;

const playerColors = ['#FF0000', '#FFFF00', '#00FF00', '#0099FF'];
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
var botNames = ['???', 'Тимофей', 'Александр', 'Владимир']

var buttonArray = new Array;
var field;
var UI;
var players;
var currentPlayer = 0;
var gameState = 0;
var winner = -1;
var maxKnights = -1;
var maxKnightsPlayer = -1;
var maxRoads = -1;
var maxRoadsPlayer = -1;

var sessionData = {
    currentPlayer: 0,
    gameState: 0,
    playerCount: 1,
    winner: -1,
    maxKnights: -1,
    maxKnightsPlayer: -1,
    maxRoads: -1,
    maxRoadsPlayer: -1,
};
var sessionCode = '--';
var thisPlayer = 0;
var playerCount = 1;
var fieldChanges = new Array;
var playerChanges = new Array(4);

function frameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].onFrame();
    }

    UI.draw();
}

function gameOpen() {
    fieldTypeDeck = shuffle(fieldTypeDeck);
    fieldLevelDeck = shuffle(fieldLevelDeck);
    
    players = new Array(4);
    for (var i = 0; i < 4; i++) {
        players[i] = new Player(botNames[i], playerColors[i], i);
    }

    UI = new StartUI;

    setInterval(frameLoop, 100 / 6);
}

gameOpen();