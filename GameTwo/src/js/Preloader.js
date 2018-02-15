"use strict";

BasicGame.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;
	this.ready = false;
};

BasicGame.Preloader.prototype = {
	preload: function () {
		//	These are the assets we loaded in Boot.js
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(-50, 0, 'preloaderBar');
		this.playButton = this.add.sprite(-50, 117, 'playButton');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		//this.load.setPreloadSprite(this.preloadBar);
		this.load.image("background", 'assets/image/background/background-pic.jpg', 1000, 200);
		this.load.image('titlePage', 'assets/image/loader/donChicken.png');
		this.load.spritesheet('playButton', 'assets/image/loader/start.png', 100, 200);
		this.load.audio('titleMusic', ['assets/sound/BagRaider-ShootingStars.mp3']);
		this.load.audio('chickenScream', ['assets/sound/chickenScream.mp3']);
	    this.load.spritesheet('chickenTrump', 'assets/spritesheet/chickenTrump.png', 100, 100);

		//this.load.tilemap('tmap', 'asssets/tiles/newMap.json', null, Phaser.Tilemap.TILED_JSON);
		//this.load.image('tile', 'assets/tiles/grass_main_128x128_0.png');
		//this.load.image('background', 'assets/image/background/background-pic.jpg');
	},


	create: function () {
		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		//this.preloadBar.cropEnabled = false;
		// Character
		//this.game.load.spritesheet('player', 'assets/spritesheet/chickenTrump.png', 38, 48);
	},

	update: function () {
		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}
	}
};
