const diceChances = [0, 0, 2.8, 5.6, 8.3, 11.1, 13.9, 16.7, 13.9, 11.1, 8.3, 5.6, 2.8];

function makeBotMove(player) {
    while (player.ingSettlementExists) {
        var arr = findSettlementPlaces();
        shuffle(arr);
        player.buySettlement();
        player.buildSettlement(arr[0].x, arr[0].y, arr[0].direction);
    }
    
    
    
    while (player.ingRoad) {
        var arr = findRoadPlaces();
        shuffle(arr);
        player.buyRoad();
        player.buildRoad(arr[0].x, arr[0].y, arr[0].direction);
    }
    player.endMove();
}

function findRoadPlaces() {
    var ans = new Array;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            for (var k = 0; k < 3; k++) {
                if (field.edgeMap[i][j][k] != null && field.edgeMap[i][j][k].player === -1) {
                    var available = false;
                    for (var q = 0; q < 4; q++) {
                        if (field.edgeMap[i][j][k].edges[q] != null && field.edgeMap[i][j][k].edges[q].player === currentPlayer &&
                            (field.edgeMap[i][j][k].vertexes[Math.floor(q / 2)].player === -1 ||
                                field.edgeMap[i][j][k].vertexes[Math.floor(q / 2)].player === currentPlayer))
                            available = true;
                    }
                    for (var q = 0; q < 2; q++) {
                        if (field.edgeMap[i][j][k].vertexes[q].player === currentPlayer)
                            available = true;
                    }
                    if (available) {
                        ans.push(field.edgeMap[i][j][k]);
                    }
                }
            }
        }
    }
    return ans;
}

function findSettlementPlaces() {
    var ans = new Array;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            for (var k = 0; k < 3; k++) {
                if (field.vertexMap[i][j][k] != null && field.vertexMap[i][j][k].player === -1) {
                    var available = false;
                    for (var q = 0; q < 3; q++) {
                        if (field.vertexMap[i][j][k].edges[q] != null && field.vertexMap[i][j][k].edges[q].player === currentPlayer)
                            available = true;
                    }
                    if (players[currentPlayer].ingSettlementExists !== 0) {
                        available = true;
                    }
                    for (var q = 0; q < 3; q++) {
                        if (field.vertexMap[i][j][k].vertexes[q] != null && field.vertexMap[i][j][k].vertexes[q].level > 0)
                            available = false;
                    }
                    if (available) {
                        ans.push(field.vertexMap[i][j][k]);
                    }
                }
            }
        }
    }
    return ans;
}