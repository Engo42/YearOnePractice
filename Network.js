var database = firebase.database();

function sendMove() {
    firebase.database().ref('session/' + sessionCode + '/' + currentPlayer).set({
        fieldChanges: fieldChanges,
        playerChanges: playerChanges
    });
    firebase.database().ref('session/' + sessionCode + '/currentPlayer').set((currentPlayer + 1) % 4);
}

function newSession() {
    sessionCode 
    const dbRef = firebase.database().ref('nextSessionCode').get().then((snapshot) => {
        if (snapshot.exists()){
            sessionCode = snapshot.val();
        }
        else {
            sessionCode = 0;
        }
        for (var i = 0; i < 4; i++) {
            firebase.database().ref('session/' + sessionCode + '/' + i).set({
                fieldChanges: null,
                playerChanges: null
            });
        }
        firebase.database().ref('session/' + sessionCode + '/currentPlayer').set(thisPlayer);
        firebase.database().ref('nextSessionCode').set((sessionCode + 1) % 1000);
    }).catch((error) => {
        console.error(error);
    });
}