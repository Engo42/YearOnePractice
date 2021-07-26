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