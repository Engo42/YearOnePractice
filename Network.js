var database = firebase.database();

function sendMove() {
    for (var i = 0; i < 4; i++) {
        playerChanges[i] = {
            resources: players[i].resources,
            roads: players[i].roads,
            knights: players[i].knights,
            victoryPoints: players[i].victoryPoints
        };
    }
    let copyValues = [(currentPlayer + 1) % 4, winner, maxKnights, maxRoads]
    firebase.database().ref('session/' + sessionCode + '/p' + currentPlayer).set({
        fieldChanges: fieldChanges,
        playerChanges: playerChanges,
        maxKnights: maxKnights,
        maxRoads: maxRoads,
    });
    fieldChanges = [];
    firebase.database().ref('session/' + sessionCode + '/currentPlayer').set(copyValues[0]);
    firebase.database().ref('session/' + sessionCode + '/winner').set(copyValues[1]);
    firebase.database().ref('session/' + sessionCode + '/maxKnights').set(copyValues[2]);
    firebase.database().ref('session/' + sessionCode + '/maxRoads').set(copyValues[3]);
}

function newSession() {
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
        firebase.database().ref('session/' + sessionCode + '/maxKnights').set(-1);
        firebase.database().ref('session/' + sessionCode + '/maxRoads').set(-1);
        firebase.database().ref('nextSessionCode').set((sessionCode + 1) % 1000);
        listenToSession();
    }).catch((error) => {
        console.error(error);
    });
}

function startSession() {
    gameState = 2;
    firebase.database().ref('session/' + sessionCode + '/gameState').set(gameState);
    if (thisPlayer === 0) {
        for (var i = playerCount; i < 4; i++) {
            players[i].isLocalBot = true;
        }
    }
}

function joinSession() {
    firebase.database().ref('session/' + sessionCode).get().then((snapshot) => {
        if (snapshot.exists() 
            && snapshot.val().gameState === 1 
        && snapshot.val().playerCount < 4){
            thisPlayer = snapshot.val().playerCount;
            firebase.database().ref('session/' + sessionCode + '/playerCount').set(snapshot.val().playerCount + 1);
            listenToSession();
            UI.newSessionButton.deleteSelf();
            UI.joinSessionButton.deleteSelf();
            UI.delete;
            UI = new LobbyUI;
            return true;
        }
        else {
            alert("Сессии не существует или она переполнена.");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function listenToSession() {
    firebase.database().ref('session/' + sessionCode).on('value', (snapshot) => {
        sessionData = snapshot.val();
        let prevPlayer = currentPlayer;
        currentPlayer = sessionData.currentPlayer;
        gameState = sessionData.gameState;
        playerCount = sessionData.playerCount;
        winner = sessionData.winner;
        maxKnights = sessionData.maxKnights;
        maxRoads = sessionData.maxRoads;
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
                }
            }
            if (winner === -1)
                players[currentPlayer].startMove();
        }
    });
}