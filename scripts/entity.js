// Entity initialization
var entityHandler = (function() {
	var Entity = function(id, type, x, y, width, height, nbrAnimStates) {
		this.id = id;
		this.type = type;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.nbrAnimStates = nbrAnimStates;
		this.animationSpeed = 10;
		this.animState = 0;
		this.animTimer = Date.now();
		this.state = LEFT_STATE;
		this.speed = 150;
		this.image = new Image();
		this.image.src = 'img/' + type + ".png";
		this.getId = function() {
			return this.id;
		}
		this.getRectangle = function() {
			return {x:this.x, y:this.y, width:this.width, height: this.height};
		}
		this.canWalk = function(collisionMap, entities, movement) {
			var nextX = Math.round(this.x);
			var nextY = Math.round(this.y);
			if (this.state == DOWN_STATE) {
				nextY += movement;
			} else if (this.state == UP_STATE) {
				nextY -= movement;
			} else if (this.state == LEFT_STATE) {
				nextX -= movement;
			} else if (this.state == RIGHT_STATE) {
				nextX += movement;
			}
			// For each collision object and each entity,
			// check that the entity's next position is not overlapping.
			var collisionRect = {x:nextX, y:nextY, width:this.width, height:this.height};
			for (var i = 0; i < collisionMap.length; i++) {
				if (rectanglesOverlapping(collisionRect, collisionMap[i])) {
					return false;
				}
			}
			for (var i = 0; i < entities.length; i++) {
				if (entities[i].id != this.id) {
					if (rectanglesOverlapping(collisionRect, entities[i].getRectangle())) {
						return false;
					}
				}
			}
			// Check that the entity's next position is not overlapping the player.
			if (rectanglesOverlapping(collisionRect, player.getRectangle())) {
				return false;
			}
			return true;
		}
		this.update = function(mod) {
			// Change animation state
			if (Date.now() - this.animTimer > (1000 / this.animationSpeed)) {
				this.animState = (this.animState + 1) % this.nbrAnimStates;
				this.animTimer = Date.now();
			}
			// Move entity
			var rand = Math.random();
			if (rand >= 0.98) {
				this.state = Math.floor((Math.random() * 4));
			}
			var collisionMap = world.getCollisionMap();
			var entities = world.getCurrentEntities();
			if (this.canWalk(collisionMap, entities, this.speed * mod)) {
				if (this.state == DOWN_STATE) {
					this.y += this.speed * mod;
				} else if (this.state == UP_STATE) {
					this.y -= this.speed * mod;
				} else if (this.state == LEFT_STATE) {
					this.x -= this.speed * mod;
				} else if (this.state == RIGHT_STATE) {
					this.x += this.speed * mod;
				}
			}
		}
		this.render = function(ctx) {
			ctx.drawImage(
				this.image,
				this.animState * this.width,
				0,
				this.width,
				this.height,
				this.x,
				this.y,
				this.width,
				this.height
			);
		}
	}
	return {
		Entity: Entity
	};
})();