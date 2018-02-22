BasicGame.Quit = function (game) {
	var quitPageBackground;

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
	    	var topText = this.game.add.text( this.game.world.centerX, 15, "QUIT, CREDIT", topTextStyle );
	    	topText.anchor.setTo( 0.5, 0.0 );

			
		}
	}
};
