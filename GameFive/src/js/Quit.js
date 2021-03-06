BasicGame.Quit = function (game) {
	var quitPageBackground;

	function gotoMainMenu(){
		//music.stop();
		game.state.start('MainMenu');
	}

	return {
		preload: function () {
	        game.load.image('quitPageBG', 'assets/image/background/quitpage-bg.jpg');
	  	},

	    addCredit: function(task, author) {
		},

		addMenuOption: function(text, callback) {
		},

		create: function (){
			quitPageBackground = game.add.sprite(0, 0, 'quitPageBG');
			var topTextStyle = { font: "25px Verdana", fill: "#666666", align: "center" };
	    	var topText = this.game.add.text( this.game.world.centerX, 15, "Don't quit!", topTextStyle );
	    	topText.anchor.setTo( 0.5, 0.0 );


			playButton = game.add.button(255, 280, 'playButton', gotoMainMenu, 'MainMenu', this.gotoMainMenu, this);




		}
	}
};
