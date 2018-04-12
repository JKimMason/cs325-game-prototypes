"use strict";

BasicGame.Preloader = function (game) {
	//var loadingBar = null;
	var background = null;
	var preloadBar = null;
	var logo = null;
	var ready = false;

	return {
		preload: function () {
			
			// Preloads
			background = game.add.sprite(0, 0, 'preloaderBackground');
			preloadBar = game.add.sprite(200, 400, 'preloaderBar');
			logo = game.add.sprite(230, 100, 'logo');
			game.load.setPreloadSprite(preloadBar);

			// Main menu:
			game.load.audio('titleMusic', ['assets/sound/menuMusic.mp3']);
				// Buttons
			game.load.image('playButton', 'assets/image/mainmenu/play.png');
	        game.load.image('settingsButton', 'assets/image/mainmenu/settings.png');
	        game.load.image('optionsButton', 'assets/image/mainmenu/options.png');
	        game.load.image('quitButton', 'assets/image/mainmenu/quit.png');

	        // Game
	        game.load.audio('gameMusic', ['assets/sound/gameMusic.mp3']);
	        game.load.spritesheet('player', 'assets/image/spritesheet/player.png', 39, 49);
	        game.load.spritesheet('enemies', 'assets/image/spritesheet/robots.png', 55, 65);
	        game.load.spritesheet('explosion', 'assets/image/spritesheet/explosion.png', 64, 64);

	        // Map
	        game.load.image('earth', 'assets/image/background/light_grass.png');
	        //game.load.image('mapTiles', 'assets/map/beach_tileset.png');
	        //game.load.tilemap('island', 'assets/map/island.tmx', null, Phaser.Tilemap.TILED_TMX);

     		//game.load.tilemap('level1', 'assets/map/level1.json', null, Phaser.Tilemap.TILED_JSON);

	        // Items:
	        game.load.image('bullet', 'assets/image/game/bullet.png');
	        game.load.image('healthPack', 'assets/image/game/health.png');
	        game.load.image('armorPack', 'assets/image/game/armor.png');
	        game.load.image('target', 'assets/image/game/target.png');
	        game.load.image('upgradePack', 'assets/image/game/upgrade.png');

	        // Sound:
	        game.load.audio('bulletFired', ['assets/sound/bulletFired.mp3']);
	        game.load.audio('bulletHit', ['assets/sound/bulletHit.mp3']); 
	        game.load.audio('bulletHitTwo', ['assets/sound/bulletHitTwo.mp3']);
	        game.load.audio('wearHealth', ['assets/sound/wearHealth.mp3']);
	        game.load.audio('wearArmor', ['assets/sound/wearArmor.mp3']);
	        game.load.audio('stab', ['assets/sound/stab.mp3']);
	        game.load.audio('fastBullet', ['assets/sound/fastBullet.mp3']);
	        game.load.audio('upgradeSound', ['assets/sound/upgradeSound.mp3']);
	        game.load.audio('boom', ['assets/sound/boom.mp3']);
	        game.load.audio('robotBullet', ['assets/sound/robotBulletSound.mp3']);
	        game.load.audio('bulletToPlayer', ['assets/sound/bulletHitPlayer.mp3']);

		},

		create: function () {
			preloadBar.cropEnabled = false;
		},

		update: function () {
			if (game.cache.isSoundDecoded('titleMusic') && ready == false)
			{
				ready = true;
				game.state.start('MainMenu');
			}
		}
	};
};

