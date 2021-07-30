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

function noop() {
}

function arrSum(arr) {
    var ans = 0;
    for (var i = 0; i < arr.length; i++) {
        ans += arr[i];
    }
    return ans;
}

function arrMax(arr) {
    var max = -1;
    var ans = -1;
    for (var i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
            ans = i;
        }
    }
    return ans;
}

function drawColorBox(buttonObj, c0, c1, c2, c3) {
    if (buttonObj.active === false)
        ctx.fillStyle = c0;
    else if (buttonObj.pressed)
        ctx.fillStyle = c1;
    else if (buttonObj.hover)
        ctx.fillStyle = c2;
    else
        ctx.fillStyle = c3;
    ctx.fillRect(buttonObj.x, buttonObj.y, buttonObj.width, buttonObj.height);
}