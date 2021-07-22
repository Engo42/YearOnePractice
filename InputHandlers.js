var mousePressed = false;
var mouseX = 0;
var mouseY = 0

function mouseDownHandler(e) {
    mousePressed = true;
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].checkPress();
    }
}
function mouseUpHandler(e) {
    mousePressed = false;
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].checkRelease();
    }
}
function mouseMoveHandler(e) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = canvas.width / rect.width;
    var scaleY = canvas.height / rect.height;
    mouseX = e.offsetX*scaleX;
    mouseY = e.offsetY*scaleY;
}
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);