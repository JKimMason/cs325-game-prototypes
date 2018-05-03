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
			game.load.audio('titleMusic', ['assets/sound/theme.mp3']);
				// Buttons
			game.load.image('playButton', 'assets/image/mainmenu/play.png');
	        game.load.image('settingsButton', 'assets/image/mainmenu/settings.png');
	        game.load.image('optionsButton', 'assets/image/mainmenu/options.png');
	        game.load.image('quitButton', 'assets/image/mainmenu/quit.png');

	        // Game
	        game.load.spritesheet('player', 'assets/image/spritesheet/runner.png', 54, 70);
	        game.load.spritesheet('lightning', 'assets/image/spritesheet/lightning.png', 54.5 ,130)
	        game.load.spritesheet('bat', 'assets/image/spritesheet/bat.png', 33, 31);
	        game.load.spritesheet('horse', 'assets/image/spritesheet/horse.png', 34.5, 34)
	        game.load.spritesheet('butterfly', 'assets/image/spritesheet/butterfly.png', 32, 32);
	        // Map
	        game.load.image('earth', 'assets/image/background/2wideWorld.png');
	        game.load.image('summer', 'assets/image/background/Summer.png');
	        game.load.image('winter', 'assets/image/background/Winter.png');
	        game.load.image('water', 'assets/image/background/Water.png');
	        game.load.image('spring', 'assets/image/background/Spring.png');

	        // Items:
			game.load.spritesheet('item', 'assets/image/spritesheet/items.png', 48, 48, 250);
			//game.load.spritesheet('item', 'assets/image/spritesheet/items.png', 48, 48, 18);
			game.load.spritesheet('ammo', 'assets/image/spritesheet/ammo.png', 20, 20, 1);
			game.load.image('ammo2', 'assets/image/game/bullet.png');

	        game.load.image('target', 'assets/image/game/target.png');
	        game.load.image('upgradePack', 'assets/image/game/upgrade.png');
	        game.load.image('diamond', 'assets/image/game/diamond.png');
	        game.load.image('apple', 'assets/image/game/apple.png');
	        game.load.image('health2', 'assets/image/game/health2.png');


	        // Sound:
	        game.load.audio('gameMusic', ['assets/sound/pinkF.mp3']);
	        game.load.audio('woosh', ['assets/sound/woosh.mp3']);
	        game.load.audio('eat', ['assets/sound/eat.mp3']);
	        game.load.audio('gulp', ['assets/sound/gulp.mp3']);
	        game.load.audio('upgrade', ['assets/sound/upgrade.mp3']);
	        game.load.audio('passBullet', ['assets/sound/passBullet.mp3']);
	        game.load.audio('diamondSound', ['assets/sound/diamondSound.mp3']);
			game.load.audio('laser', ['assets/sound/laser.mp3']);
			game.load.audio('blaster', ['assets/sound/blaster.mp3']);
			game.load.audio('horse', ['assets/sound/horse.mp3']);
			game.load.audio('normalRun', ['assets/sound/normalRun.mp3']);
			game.load.audio('sprint', ['assets/sound/sprint.mp3']);
			game.load.audio('fastRun', ['assets/sound/fastRun.mp3']);
			game.load.audio('hit', ['assets/sound/swish.mp3']);

	        game.load.script('BlurX', 'https://cdn.rawgit.com/photonstorm/phaser-ce/master/filters/BlurX.js');
    		game.load.script('BlurY', 'https://cdn.rawgit.com/photonstorm/phaser-ce/master/filters/BlurY.js');

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

