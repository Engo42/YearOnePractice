var database = firebase.database();

function writeData(folder, data) {
    firebase.database().ref('data/' + folder).set({
        data: data,
    });
}

writeData('test1', 'data1');