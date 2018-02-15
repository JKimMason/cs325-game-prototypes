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
		this.load.image("background", 'assets/image/background/background-pic.jpg', 1000, 200);
		this.load.image('titlePage', 'assets/image/loader/donChicken.png');
		this.load.spritesheet('playButton', 'assets/image/loader/start.png', 100, 200);
		this.load.audio('titleMusic', ['assets/sound/BagRaider-ShootingStars.mp3']);
		this.load.audio('gameMusic', ['assets/sound/DT-NeverComeDown.mp3']);
		this.load.audio('chickenScream', ['assets/sound/chickenScream.mp3']);
	    this.load.spritesheet('chickenTrump', 'assets/spritesheet/chickenTrump.png', 100, 100);
		this.load.image('kfc', 'assets/image/food/kfc.png', 10,10);
		this.load.image('mcdonald', 'assets/image/food/mcdonald.png', 50,50);
		this.load.video('chickenDance', 'assets/video/chickenDance.mp4');
	},

	create: function () {
	},

	update: function () {
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}
	}
};
