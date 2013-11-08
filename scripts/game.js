var game = (function() {
	// Canvas initialization
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	canvas.width = 1280;	// 20 tiles * 64px
	canvas.height = 768;	// 11 tiles * 64px + console

	ctx.font = "bold 16px Arial";

	// Keyboard & Mouse initialization
	var keysDown = {};
	window.addEventListener('keydown', function(e) {
		keysDown[e.keyCode] = true;
	});
	window.addEventListener('keyup', function(e) {
		delete keysDown[e.keyCode];
		if (Object.keys(keysDown).length != 1) {
			player.resetWalkState();
		}
	});

	// Timer
	var time = Date.now();

	// UPDATE
	// ********************
	var update = function(mod) {
		world.updateEntities(mod);
		player.update(mod, keysDown);
	};

	// RENDER
	// ********************
	var render = function() {
		// Draw background
		world.render(ctx);
		// Draw text
	  	ctx.fillText(player.getPositionString(), 900, 50);
		// Draw player
		player.render(ctx);
	};

	// GAME LOOP
	// ********************
	var run = function() {
		update((Date.now() - time) / 1000);
		render();
		time = Date.now();
	};

	return {
		// GAME START
		// ********************
		init: function() {
			world.loadMap();
			// Run the game...
			setInterval(run, 10);
		}
	};

})();

game.init();