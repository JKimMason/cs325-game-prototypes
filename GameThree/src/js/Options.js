BasicGame.Options = function (game) {

	return {
		preload: function () {
			game.load.image('optionPageBG', 'assets/image/background/option-bg.jpg');
	  	},

	    addCredit: function(task, author) {
		},

		addMenuOption: function(text, callback) {
		},

		create: function () {
			optionPageBackground = game.add.sprite(0, 0, 'optionPageBG'); 

			
			var topTextStyle = { font: "25px Verdana", fill: "#666666", align: "center" };
	    	var topText = this.game.add.text( this.game.world.centerX, 15, "Options", topTextStyle );
	    	topText.anchor.setTo( 0.5, 0.0 );


		}
	}
};
