
// World initialization
var mapTiles = (function() {
	var loaded = false;
	var image = new Image();
	var tileWidth = 64;
    var tileHeight = 64;

	image.onload = function() {
		mapTiles.loaded = true;
	}
	image.src = 'img/map.png';
	return {
		loaded: loaded,
		image: image,
		tileWidth: tileWidth,
		tileHeight: tileHeight
	};
})();

var world = (function() {
	var NBR_TILES_IN_X = 20;
	var NBR_TILES_IN_Y = 12;
	var x = 0;
	var y = 0;
	var currentMap = new Array();
	var collisionMap = new Array();
	var currentEntities = new Array();
	var entityIDs = {};

	var loadMap = function() {
		$.get('maps/map' + x + y + '.txt', function(data) {
			currentMap = data.split('\n');
			console.log(currentMap);
		});
		$.get('maps/map' + x + y + 'col.txt', function(data) {
			var tempMap = data.split('\n');
			for (var i = 0; i < tempMap.length; i++) {
				var tempCollision = tempMap[i].split(' ');
				collisionMap[i] = {
					x: parseInt(tempCollision[0]),
					y: parseInt(tempCollision[1]),
					width: parseInt(tempCollision[2]),
					height: parseInt(tempCollision[3])
				}
			}
			console.log("Collision map: ");
			console.log(collisionMap);
		});
	}

	var createUniqueId = function() {
		var id = 0;
		while (id in entityIDs) {
			id = Math.floor((Math.random() * 10000));
		}
		entityIDs[id]= true;
		return id;
	}

	var loadEntities = function() {
		$.get('data/entities' + x + y + '.txt', function(data) {
			var lineArray = data.split('\n');
			for (var i = 0; i < lineArray.length; i++) {
				if (lineArray[i].charAt(0) != '#') {
					var entity = lineArray[i].split(' ');
					var id = createUniqueId();
					console.log(id);
					currentEntities.push(new entityHandler.Entity(id, entity[0], parseInt(entity[1]), parseInt(entity[2]), 
										parseInt(entity[3]), parseInt(entity[4]), parseInt(entity[5])));
				}
			}
			console.log("EntityIDs: ");
			console.log(entityIDs);
			console.log("Entities: ");
			console.log(currentEntities);
		});
	}

	var updateEntities = function(mod) {
		for (var i = 0; i < currentEntities.length; i++) {
			var entity = currentEntities[i];
			entity.update(mod);
		}
	}

	var render = function(ctx) {
		// Draw the map
		if (mapTiles.loaded) {
			for (var row = 0; row < currentMap.length; row++) {
				for (var col = 0; col < NBR_TILES_IN_X; col++) {
					var tileNbr = parseInt(currentMap[row].charAt(col));
					var tileY = 0;
					if (tileNbr - 4 > 0)
						tileY = 1;
					ctx.drawImage(
						mapTiles.image,
						(tileNbr % 4) * mapTiles.tileWidth,
						tileY * mapTiles.tileHeight,
						mapTiles.tileWidth,
						mapTiles.tileHeight,
						col * mapTiles.tileWidth,
						row * mapTiles.tileHeight,
						mapTiles.tileWidth,
						mapTiles.tileHeight
					);
				}
			}
		}
		// Draw entities
		for (var i = 0; i < currentEntities.length; i++) {
			currentEntities[i].render(ctx);
		}
	}

	var getCollisionMap = function() {
    	return collisionMap;
	}

	var getCurrentEntities = function() {
		return currentEntities;
	}

	return {
		loadMap: loadMap,
		loadEntities: loadEntities,
		updateEntities: updateEntities,
		render: render,
		getCollisionMap: getCollisionMap,
		getCurrentEntities: getCurrentEntities
	}
})();