// Entity initialization
var entityHandler = (function() {
	var Entity = function(type, x, y, width, height, nbrAnimStates) {
		this.type = type;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.nbrAnimStates = nbrAnimStates;
		this.animationSpeed = 10;
		this.animState = 0;
		this.animTimer = Date.now();
		this.state = 0;
		this.speed = 150;
		this.image = new Image();
		this.image.src = 'img/' + type + ".png";

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
			console.log(this.x);
			if (this.state == 0) {
				this.y += this.speed * mod;
			} else if (this.state == 1) {
				this.y -= this.speed * mod;
			} else if (this.state == 2) {
				this.x -= this.speed * mod;
			} else if (this.state == 3) {
				this.x += this.speed * mod;
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