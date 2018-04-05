"use strict";

BasicGame.MainMenu = function (game) {
	var music = null;
	var playButton = null;
	var settingsButton = null;
	var optionsButton = null;
	var quitButton = null;
	var background = null;
	var menuSelect = null;
	var titleText = null;

	// Start game
	function startGame(pointer){
		//menuSelect.play();
		music.stop();
		game.state.start('Game');
	}
	// Options
	function optionsGame(pointer){
		music.stop();
		game.state.start('Options');
	}
	// Credits
	function quitGame(pointer){
		music.stop();
		game.state.start('Quit');
	}

	// Functions
	return {
		// init: function(){
		// 	titleText = game.make.text(50, 10, "Title");
		// },
		 init: function () {
    		titleText = game.make.text(game.world.centerX, 105, "Shooter", {
     			font: 'bold 65pt Impact',
     			fill: '#FDFFB5',
      			align: 'center'
    		});
    		titleText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    		titleText.anchor.set(0.5);
  		},

		create: function () {
			//deathMusic.stop();
		 	// Background:
			background = game.add.sprite(0, 0, 'titlePage');
			// Title page:
    		game.add.existing(titleText);

			// Music:
			music = game.add.audio('titleMusic');
            music.loop = true;
            music.play();

			// Buttons:
			playButton = game.add.button(255, 280, 'playButton', startGame, 'Game', this.startGame, this);
			optionsButton = game.add.button(255, 380, 'optionsButton', optionsGame, 'Options', this.optionsGame, this);
			quitButton = game.add.button(255, 480, 'quitButton', quitGame, 'Quit', this.quitGame, this);

		    // this.addMenuOption('Start', function () {
		    //   game.state.start("Game");
		    // });
            //let mainMenuMusic = game.add.audio('loadingMusic');
            //mainMenuMusic.play();
			//sound.play();
		},

		update: function () {
			//	Do some nice funky main menu effect here
		}

	};
};
