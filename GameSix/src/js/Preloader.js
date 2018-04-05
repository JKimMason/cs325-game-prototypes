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
			game.load.audio('titleMusic', ['assets/sound/loadingShort.mp3']);
				// Buttons
			game.load.image('playButton', 'assets/image/mainmenu/play.png');
	        game.load.image('settingsButton', 'assets/image/mainmenu/settings.png');
	        game.load.image('optionsButton', 'assets/image/mainmenu/options.png');
	        game.load.image('quitButton', 'assets/image/mainmenu/quit.png');

	        // Game
	        game.load.audio('gameMusic', ['assets/sound/BagRaider-ShootingStars.mp3']);
	        game.load.spritesheet('player', 'assets/image/player.png', 39, 49);
	        game.load.spritesheet('monsterAdd', 'assets/image/spritesheet/monster.png',64, 64);
	        game.load.spritesheet('gun', 'assets/image/guns.png', 64, 64);
	        game.load.spritesheet('dead', 'assets/image/explosion.png', 64, 64, 23);

	        // Map
	        game.load.image('ground', 'assets/image/game/grass.png');
	        game.load.image('earth', 'assets/image/light_grass.png');

	        // Items:
	        game.load.image('bullet', 'assets/image/bullet.png');
	        game.load.image('healthPack', 'assets/image/health.png');
	        game.load.image('armorPack', 'assets/image/armor.png');

	        // Sound:
	        game.load.audio('starSound', ['assets/sound/swish.mp3']);
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

