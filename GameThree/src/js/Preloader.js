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
	        game.load.image('gameBG', 'assets/image/background/game-bg.jpg');
	        game.load.audio('gameMusic', ['assets/sound/nyancat.mp3']);
	        game.load.spritesheet('playerAdd', 'assets/image/spritesheet/player.png', 100, 97);
	        game.load.spritesheet('monsterAdd', 'assets/image/spritesheet/monster.png', 50, 50);
	        game.load.image('boltFire', 'assets/image/game/bluebolt.jpg');
	        game.load.audio('boltFireSound', ['assets/sound/fireSound.mp3']);

	        // Map
	        game.load.image('ground', 'assets/image/grass.png');

	        // Items:
	        game.load.image('star', 'assets/image/star.png');
	        game.load.image('diamond', 'assets/image/diamond.png');
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

