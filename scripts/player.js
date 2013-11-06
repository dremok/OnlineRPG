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
	var x = 500;
	var y = 500;
	var width = 36;
	var height = 48;
	var feetHeight = 15;
	var speed = 200;
	var animationSpeed = 10;
	var state = 0;
	var walkState = 0;
	var walkTimer = Date.now();

	canWalk = function(keysDown, collisionMap, entities, movement) {
		var nextX = Math.round(x);
		var nextY = Math.round(y);
		if (DOWN in keysDown) {
			nextY += movement;
		} else if (UP in keysDown) {
			nextY -= movement;
		} else if (LEFT in keysDown) {
			nextX -= movement;
		} else if (RIGHT in keysDown) {
			nextX += movement;
		}
		// For each collision object and each entity,
		// check the player's next position is not overlapping.
		for (var i = 0; i < collisionMap.length; i++) {
			var nonCollidingPart = height - feetHeight;
			if (rectanglesOverlapping({x:nextX, y:nextY + nonCollidingPart, width:width, height:feetHeight}, collisionMap[i])) {
				return false;
			}
		}
		for (var i = 0; i < entities.length; i++) {
			var nonCollidingPart = height - feetHeight;
			if (rectanglesOverlapping({x:nextX, y:nextY + nonCollidingPart, width:width, height:feetHeight}, entities[i])) {
				return false;
			}
		}
		return true;
	}
	getPositionString = function() {
		return "PlayerX = " + x + ", PlayerY = " + y;
	}
	resetWalkState = function() {
		walkState = 0;
	}
	update = function(mod, keysDown) {
		if (Object.keys(keysDown).length == 1) {
			// Change walk state
			if (Date.now() - walkTimer > (1000 / animationSpeed) && (65 in keysDown || 87 in keysDown || 68 in keysDown || 83 in keysDown)) {
				walkState = (walkState + 1) % 8;
				walkTimer = Date.now();
			}
			if (DOWN in keysDown) {
				state = 0; // down
			} else if (UP in keysDown) {
				state = 1; // up
			} else if (LEFT in keysDown) {
				state = 2; // left
			} else if (RIGHT in keysDown) {
				state = 3; // right
			}
			// Move player
			var collisionMap = world.getCollisionMap();
			var entities = world.getCurrentEntities();
			if (canWalk(keysDown, collisionMap, entities, speed * mod)) {
				if (DOWN in keysDown) {
					y += speed * mod;
				} else if (UP in keysDown) {
					y -= speed * mod;
				} else if (LEFT in keysDown) {
					x -= speed * mod;
				} else if (RIGHT in keysDown) {
					x += speed * mod;
				}
			}
		}
	}
	render = function(ctx) {
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
		resetWalkState: resetWalkState,
		update: update,
		render: render
	};
})();