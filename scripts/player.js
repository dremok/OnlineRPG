// Player initialization
var playerTiles = (function() {
    var image = new Image();
    var tileWidth = 36;
    var tileHeight = 48;
    
	image.src = 'img/player.png';
	return {
		image: image,
		tileWidth: tileWidth,
		tileHeight: tileHeight
	};
})();

var player = (function() {
	var x = 700;
	var y = 400;
	var width = 36;
	var height = 48;
	var feetHeight = 15;
	var speed = 200;
	var animationSpeed = 10;
	var state = 0;
	var walkState = 0;
	var walkTimer = Date.now();

	var canWalk = function(keysDown, collisionMap, entities, movement) {
		var nextX = Math.round(x);
		var nextY = Math.round(y);
		var padding = movement + 1;
		if (DOWN_KEY in keysDown) {
			nextY += padding;
		} else if (UP_KEY in keysDown) {
			nextY -= padding;
		} else if (LEFT_KEY in keysDown) {
			nextX -= padding;
		} else if (RIGHT_KEY in keysDown) {
			nextX += padding;
		}
		// For each collision object and each entity,
		// check the player's next position is not overlapping.
		var nonCollidingPart = height - feetHeight;
		for (var i = 0; i < collisionMap.length; i++) {
			if (rectanglesOverlapping({x:nextX, y:nextY + nonCollidingPart, width:width, height:feetHeight}, collisionMap[i])) {
				return false;
			}
		}
		for (var i = 0; i < entities.length; i++) {
			if (rectanglesOverlapping({x:nextX, y:nextY + nonCollidingPart, width:width, height:feetHeight}, entities[i])) {
				return false;
			}
		}
		return true;
	}
	var getPositionString = function() {
		return "PlayerX = " + x + ", PlayerY = " + y;
	}
	var getRectangle = function() {
		return {x:x, y:y, width:width, height:height};
	}
	var resetWalkState = function() {
		walkState = 0;
	}
	var checkForMapChange = function() {
		if (x + width > world.getMapWidth() - 1) {
			x = 0;
			world.changeMap('EAST');
		} else if (y + height > world.getMapHeight() - 1) {
			y = 0;
			world.changeMap('SOUTH');
		}
	}
	var update = function(mod, keysDown) {
		if (Object.keys(keysDown).length == 1) {
			// Change walk state
			if (Date.now() - walkTimer > (1000 / animationSpeed) && (65 in keysDown || 87 in keysDown || 68 in keysDown || 83 in keysDown)) {
				walkState = (walkState + 1) % 8;
				walkTimer = Date.now();
			}
			if (DOWN_KEY in keysDown) {
				state = 0; // down
			} else if (UP_KEY in keysDown) {
				state = 1; // up
			} else if (LEFT_KEY in keysDown) {
				state = 2; // left
			} else if (RIGHT_KEY in keysDown) {
				state = 3; // right
			}
			// Move player
			var collisionMap = world.getCollisionMap();
			var entities = world.getCurrentEntities();
			if (canWalk(keysDown, collisionMap, entities, speed * mod)) {
				if (DOWN_KEY in keysDown) {
					y += speed * mod;
				} else if (UP_KEY in keysDown) {
					y -= speed * mod;
				} else if (LEFT_KEY in keysDown) {
					x -= speed * mod;
				} else if (RIGHT_KEY in keysDown) {
					x += speed * mod;
				}
			}
			checkForMapChange();
		}
	}
	var render = function(ctx) {
	    ctx.drawImage(
	        playerTiles.image,
	        walkState * playerTiles.tileWidth,
	        state * playerTiles.tileHeight,
	        playerTiles.tileWidth,
	        playerTiles.tileHeight,
	        Math.round(x),
	        Math.round(y),
	        playerTiles.tileWidth,
	        playerTiles.tileHeight
	    );
	}
	return {
		getPositionString: getPositionString,
		getRectangle: getRectangle,
		resetWalkState: resetWalkState,
		update: update,
		render: render
	};
})();