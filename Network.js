var database = firebase.database();

function sendMove() {
    firebase.database().ref(sessionCode + '/' + currentPlayer).set({
        fieldChanges: fieldChanges,
        playerChanges: playerChanges
    });
    firebase.database().ref(sessionCode + '/currentPlayer').set(currentPlayer);
}