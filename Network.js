var database = firebase.database();

function sendMove() {
    firebase.database().ref('session/' + sessionCode + '/p' + currentPlayer).set({
        fieldChanges: fieldChanges,
        playerChanges: playerChanges
    });
    firebase.database().ref('session/' + sessionCode + '/currentPlayer').set((currentPlayer + 1) % 4);
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
        for (var i = 0; i < 4; i++) {
            firebase.database().ref('session/' + sessionCode + '/p' + i).set({
                fieldChanges: null,
                playerChanges: null
            });
        }
        firebase.database().ref('session/' + sessionCode + '/currentPlayer').set(thisPlayer);
        firebase.database().ref('session/' + sessionCode + '/playerCount').set(1);
        firebase.database().ref('session/' + sessionCode + '/gameState').set(gameState);
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
        if (currentPlayer != prevPlayer && (players[currentPlayer].isLocalBot || currentPlayer === thisPlayer)) {
            let changes = [sessionData.p0, sessionData.p1, sessionData.p2, sessionData.p3]
            for (var i = (currentPlayer + 1) % 4; i != currentPlayer; i = (i + 1) % 4) {
                if (changes[i] != null) {
                    if (changes[i].playerChanges != null) {
                        for (var j = 0; j < 5; j++) {
                            players[i].resources[j] = changes[i].playerChanges.resources[j];
                        }
                        players[i].developmentCards.length = changes[i].playerChanges.developmentCards;
                        players[i].roads = changes[i].playerChanges.roads;
                        players[i].knights = changes[i].playerChanges.knights;
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
        }
    });
}