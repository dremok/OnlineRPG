// Constants
var DOWN = 83;
var UP = 87;
var LEFT = 65;
var RIGHT = 68;

// Global functions
function rectanglesOverlapping(rectA, rectB) {
	function valueInRange(value, min, max) {
		return (value < max) && (value > min);
	}
	var xOverlap = valueInRange(rectA.x, rectB.x, rectB.x + rectB.width) ||
					valueInRange(rectB.x, rectA.x, rectA.x + rectA.width);
	var yOverlap = valueInRange(rectA.y, rectB.y, rectB.y + rectB.height) ||
					valueInRange(rectB.y, rectA.y, rectA.y + rectA.height);
	return xOverlap && yOverlap;
}