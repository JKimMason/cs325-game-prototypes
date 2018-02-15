"use strict";

BasicGame.MainMenu = function (game) {
	this.music = null;
	this.playButton = null;
};

BasicGame.MainMenu.prototype = {
	create: function () {
		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.add.sprite(0, 0, 'titlePage');
		this.playButton = this.add.button(255, 340, 'playButton', this.startGame, this, 'Down');

		this.sound = this.add.audio('chickenScream');
		this.sound.play();
	},

	update: function () {
		//	Do some nice funky main menu effect here
	},

	startGame: function (pointer) {
		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');
	}
};
