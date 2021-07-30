const diceChances = [0, 0, 2.8, 5.6, 8.3, 11.1, 13.9, 16.7, 13.9, 11.1, 8.3, 5.6, 2.8];

function makeBotMove(player) {
    while (player.ingSettlementExists) {
        var arr = findSettlementPlaces();
        shuffle(arr);
        player.buySettlement();
        player.buildSettlement(arr[0].x, arr[0].y, arr[0].direction);
    }
    
    if (player.developmentCards.length > 0) {
        player.useCard(Math.floor(Math.random() * player.developmentCards.length));
    }
    
    var developmentCardBought = false;
    var optionsExist = true;
    while (optionsExist) {
        var rArr = findRoadPlaces();
        var sArr = findSettlementPlaces();
        var cArr = findCityPlaces();
        var optionsArr = new Array;
        if (rArr.length > 0 && enoughResources([1, 0, 0, 1, 0]))
            optionsArr.push(0);
        if (sArr.length > 0 && enoughResources([1, 1, 1, 1, 0]))
            optionsArr.push(1);
        if (cArr.length > 0 && enoughResources([0, 0, 2, 0, 3]))
            optionsArr.push(2);
        if (developmentCardBought === false && enoughResources([1, 0, 1, 0, 1]))
            optionsArr.push(3);
        
        if (optionsArr.length > 0) {
            let decision = optionsArr[Math.floor(Math.random() * optionsArr.length)];
            if (decision === 0) {
                shuffle(rArr);
                tradeToAfford([1, 0, 0, 1, 0]);
                player.buyRoad();
                player.buildRoad(rArr[0].x, rArr[0].y, rArr[0].direction);
            }
            if (decision === 1) {
                shuffle(sArr);
                tradeToAfford([1, 1, 1, 1, 0]);
                player.buySettlement();
                player.buildSettlement(sArr[0].x, sArr[0].y, sArr[0].direction);
            }
            if (decision === 2) {
                shuffle(cArr);
                tradeToAfford([0, 0, 2, 0, 3]);
                player.buyCity();
                player.buildCity(cArr[0].x, cArr[0].y, cArr[0].direction);
            }
            if (decision === 3) {
                developmentCardBought = true;
                tradeToAfford([1, 0, 1, 0, 1]);
                player.buyCard();
            }
        }
        else
            optionsExist = false;
    }
    
    var roadPlaceExists = true;
    while (player.ingRoad && roadPlaceExists) {
        var arr = findRoadPlaces();
        if (arr.length > 0) {
            shuffle(arr);
            player.buyRoad();
            player.buildRoad(arr[0].x, arr[0].y, arr[0].direction);
        }
        else
            roadPlaceExists = false;
    }
    player.endMove();
}

function enoughResources(req) {
    var res = players[currentPlayer].resources;
    var reserveResources = 0;
    var notEnough = 0;
    for (var i = 0; i < 5; i++) {
        if (res[i] >= req[i])
            reserveResources += res[i] - req[i];
        if (req[i] > res[i])
            notEnough += req[i] - res[i];
    }
    return (reserveResources / 2 >= notEnough)
}

function tradeToAfford(req) {
    var res = players[currentPlayer].resources;
    var reserveResources = 0;
    var notEnough = 0;
    for (var i = 0; i < 5; i++) {
        if (res[i] >= req[i])
            res[i] -= req[i];
        if (req[i] > res[i])
            notEnough += (req[i] - res[i]) * 2;
    }
    for (var i = 4; i >= 0; i--) {
        while (notEnough > 0 && res[i] > 0) {
            res[i]--;
            notEnough--;
        }
    }
    for (var i = 4; i >= 0; i--) {
        res[i] += req[i];
    }
    return (reserveResources / 2 >= notEnough)
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

function findCityPlaces() {
    var ans = new Array;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            for (var k = 0; k < 3; k++) {
                if (field.vertexMap[i][j][k] != null
                && field.vertexMap[i][j][k].player === currentPlayer && field.vertexMap[i][j][k].level === 1) {
                    ans.push(field.vertexMap[i][j][k]);
                }
            }
        }
    }
    return ans;
}