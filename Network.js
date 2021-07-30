var database = firebase.database();

function sendMove() {
    firebase.database().ref('session/' + sessionCode + '/winner').set(winner);
    for (var i = 0; i < 4; i++) {
        playerChanges[i] = {
            resources: players[i].resources,
            roads: players[i].roads,
            knights: players[i].knights,
            victoryPoints: players[i].victoryPoints
        };
    }
    firebase.database().ref('session/' + sessionCode + '/p' + currentPlayer).set({
        fieldChanges: fieldChanges,
        playerChanges: playerChanges,
        maxKnightsPlayer: maxKnightsPlayer,
        maxRoadsPlayer: maxRoadsPlayer
    });
    fieldChanges = [];
    firebase.database().ref('session/' + sessionCode + '/currentPlayer').set((currentPlayer + 1) % 4);
}

function newSession() {
    if (players[0].name.length < 3) {
        alert("Имя должно быть длиной минимум 3 символов.");
        return false;
    }
    else if (players[0].name.length > 18) {
        alert("Имя должно быть длиной максимум 18 символов.");
        return false;
    }
    else {
        firebase.database().ref('nextSessionCode').get().then((snapshot) => {
            if (snapshot.exists()){
                sessionCode = snapshot.val();
            }
            else {
                sessionCode = 0;
            }
            gameState = 1;
            firebase.database().ref('session/' + sessionCode + '/currentPlayer').set(thisPlayer);
            firebase.database().ref('session/' + sessionCode + '/playerCount').set(1);
            firebase.database().ref('session/' + sessionCode + '/gameState').set(gameState);
            firebase.database().ref('session/' + sessionCode + '/winner').set(-1);
            firebase.database().ref('session/' + sessionCode + '/fieldTypeDeck').set(fieldTypeDeck);
            firebase.database().ref('session/' + sessionCode + '/fieldLevelDeck').set(fieldLevelDeck);
            for (var i = 0; i < 4; i++) {
                firebase.database().ref('session/' + sessionCode + '/names/p' + i).set(players[i].name);
            }
            firebase.database().ref('nextSessionCode').set((sessionCode + 1) % 1000);
            listenToSession();
            UI.newSessionButton.deleteSelf();
            UI.joinSessionButton.deleteSelf();
            UI.delete;
            UI = new LobbyUI;
        }).catch((error) => {
            console.error(error);
        });
        return true;
    }
}

function startSession() {
    gameState = 2;
    firebase.database().ref('session/' + sessionCode + '/names').get().then((snapshot) => {
        if (snapshot.exists()){
            players[0].name = snapshot.val().p0;
            players[1].name = snapshot.val().p1;
            players[2].name = snapshot.val().p2;
            players[3].name = snapshot.val().p3;
        }
    }).catch((error) => {
        console.error(error);
    });
    firebase.database().ref('session/' + sessionCode + '/gameState').set(gameState);
    if (thisPlayer === 0) {
        for (var i = playerCount; i < 4; i++) {
            players[i].isLocalBot = true;
        }
    }
    for (var i = playerCount; i < 4; i++) {
    }
}

function joinSession() {
    if (players[0].name.length < 3) {
        alert("Имя должно быть длиной минимум 3 символов.");
        return false;
    }
    else if (players[0].name.length > 18) {
        alert("Имя должно быть длиной максимум 18 символов.");
        return false;
    }
    else {
        firebase.database().ref('session/' + sessionCode).get().then((snapshot) => {
            if (snapshot.exists() 
                && snapshot.val().gameState === 1 
            && snapshot.val().playerCount < 4){
                thisPlayer = snapshot.val().playerCount;
                players[thisPlayer].name = players[0].name;
                firebase.database().ref('session/' + sessionCode + '/playerCount').set(snapshot.val().playerCount + 1);
                firebase.database().ref('session/' + sessionCode + '/names/p' + thisPlayer).set(players[thisPlayer].name);
                listenToSession();
                UI.newSessionButton.deleteSelf();
                UI.joinSessionButton.deleteSelf();
                UI.delete;
                UI = new LobbyUI;
            }
            else {
                alert("Сессии не существует или она переполнена.");
            }
        }).catch((error) => {
            console.error(error);
        });
        firebase.database().ref('session/' + sessionCode + '/fieldTypeDeck').get().then((snapshot) => {
            if (snapshot.exists())
                fieldTypeDeck = snapshot.val();
            else
                alert("Не удалось найти расклад поля.");
        }).catch((error) => {
            console.error(error);
        });
        firebase.database().ref('session/' + sessionCode + '/fieldLevelDeck').get().then((snapshot) => {
            if (snapshot.exists())
                fieldLevelDeck = snapshot.val();
            else
                alert("Не удалось найти расклад поля.");
        }).catch((error) => {
            console.error(error);
        });
    }
}

function listenToSession() {
    firebase.database().ref('session/' + sessionCode).on('value', (snapshot) => {
        sessionData = snapshot.val();
        let prevPlayer = currentPlayer;
        currentPlayer = sessionData.currentPlayer;
        gameState = sessionData.gameState;
        playerCount = sessionData.playerCount;
        winner = sessionData.winner;
        if (currentPlayer != prevPlayer && (players[currentPlayer].isLocalBot || currentPlayer === thisPlayer)) {
            let changes = [sessionData.p0, sessionData.p1, sessionData.p2, sessionData.p3]
            for (var i = (currentPlayer + 1) % 4; i != currentPlayer; i = (i + 1) % 4) {
                if (changes[i] != null) {
                    for (var j = 0; j < 4; j++) {
                        for (var k = 0; k < 5; k++) {
                            players[j].resources[k] = changes[i].playerChanges[j].resources[k];
                        }
                        players[j].roads = changes[i].playerChanges[j].roads;
                        players[j].knights = changes[i].playerChanges[j].knights;
                        players[j].victoryPoints = changes[i].playerChanges[j].victoryPoints;
                    }
                    if (changes[i].fieldChanges != null) {
                        for (var j = 0; j < changes[i].fieldChanges.length; j++) {
                            let fieldChange = changes[i].fieldChanges[j];
                            if (fieldChange.type == 'Road') {
                                field.edgeMap[fieldChange.y][fieldChange.x][fieldChange.direction].level = 1;
                                field.edgeMap[fieldChange.y][fieldChange.x][fieldChange.direction].player = i;
                            }
                            if (fieldChange.type == 'Settlement') {
                                field.vertexMap[fieldChange.y][fieldChange.x][fieldChange.direction].level = 1;
                                field.vertexMap[fieldChange.y][fieldChange.x][fieldChange.direction].player = i;
                            }
                            if (fieldChange.type == 'City') {
                                field.vertexMap[fieldChange.y][fieldChange.x][fieldChange.direction].level = 2;
                                field.vertexMap[fieldChange.y][fieldChange.x][fieldChange.direction].player = i;
                            }
                        }
                    }
                    maxKnightsPlayer = changes[i].maxKnightsPlayer;
                    maxRoadsPlayer = changes[i].maxRoadsPlayer;
                }
            }
            if (winner === -1)
                players[currentPlayer].startMove();
        }
    });
}