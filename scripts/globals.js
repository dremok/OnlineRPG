// Constants
var DOWN_KEY = 83;
var UP_KEY = 87;
var LEFT_KEY = 65;
var RIGHT_KEY = 68;

var DOWN_STATE = 0;
var UP_STATE = 1;
var LEFT_STATE = 2;
var RIGHT_STATE = 3;

// Global functions
function rectanglesOverlapping(rectA, rectB) {
	function valueInRange(value, min, max) {
		return (value <= max) && (value >= min);
	}
	var xOverlap = valueInRange(rectA.x, rectB.x, rectB.x + rectB.width) ||
					valueInRange(rectB.x, rectA.x, rectA.x + rectA.width);
	var yOverlap = valueInRange(rectA.y, rectB.y, rectB.y + rectB.height) ||
					valueInRange(rectB.y, rectA.y, rectA.y + rectA.height);
	return xOverlap && yOverlap;
}