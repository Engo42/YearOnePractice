var database = firebase.database();

function writeData() {
    firebase.database().ref(sessionCode + '/' + currentPlayer).set({
        fieldChanges: fieldChanges,
        playerChanges: playerChanges,
    });
}