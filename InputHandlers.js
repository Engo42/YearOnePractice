var mousePressed = false;
var mouseX = 0;
var mouseY = 0

function mouseDownHandler(e) {
    mousePressed = true;
}
function mousUpHandler(e) {
    mousePressed = false;
	
}
function mouseMoveHandler(e) {
	var rect = canvas.getBoundingClientRect();
	var scaleX = canvas.width / rect.width;
	var scaleY = canvas.height / rect.height;
	mouseX = e.offsetX*scaleX;
    mouseY = e.offsetY*scaleY;
}
document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mouseup", mousUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);