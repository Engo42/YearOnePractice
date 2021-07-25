function shuffle(a) {
    var i = a.length;
    var j;
    while (0 !== i) {
        j = Math.floor(Math.random() * i);
        i--;
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function noop() {}

function drawColorSprite(img, x, y, color) {
    ghostCanvas = document.createElement('canvas');
    ghostCanvas.width = 210;
    ghostCanvas.height = 210;
    var gctx = this.ghostCanvas.getContext("2d");
    gctx.drawImage(img, 0, 0);
    ctx.fillStyle = color;
    var ghostData = gctx.getImageData(0, 0, 210, 210);
    var trueData = ctx.getImageData(x, y, 210, 210);
    for (var i = 0; i < 210; i++) {
        for (var j = 0; j < 210; j++) {
            if (ghostData.data[4 * 210 * i + j * 4 + 3] > 0){
                trueData.data[4 * 210 * i + j * 4 + 0] = 255;
                trueData.data[4 * 210 * i + j * 4 + 1] = 0;
                trueData.data[4 * 210 * i + j * 4 + 2] = 0;
                trueData.data[4 * 210 * i + j * 4 + 3] = ghostData.data[4 * 210 * i + j * 4 + 3];
            }
        }
    }
    ctx.putImageData(trueData, x, y);
}