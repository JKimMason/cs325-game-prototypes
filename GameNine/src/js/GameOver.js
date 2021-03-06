BasicGame.GameOver = function (game) {

    function gotoMainMenu(){
        //music.stop();
        game.state.start('MainMenu');
    }

    function addQuake() {
      // define the camera offset for the quake
      var rumbleOffset = 10;
      // we need to move according to the camera's current position
      var properties = {
        x: game.camera.x - rumbleOffset
      };
      // we make it a relly fast movement
      var duration = 100;
      // because it will repeat
      var repeat = 4;
      // we use bounce in-out to soften it a little bit
      var ease = Phaser.Easing.Bounce.InOut;
      var autoStart = false;
      // a little delay because we will run it indefinitely
      var delay = 1000;
      // we want to go back to the original position
      var yoyo = true;
      var quake = game.add.tween(game.camera)
        .to(properties, duration, ease, autoStart, delay, 4, yoyo);
      // we're using this line for the example to run indefinitely
      quake.onComplete.addOnce(addQuake);
      // let the earthquake begins
      quake.start();
    }
	return {
		preload: function () {
			game.load.image('gameOverPageBG', 'assets/image/background/gameOver-bg.jpg');
			game.load.audio('gameOverMusic', ['assets/sound/darksoulDead.mp3']);
	  	},

	    addCredit: function(task, author) {
		},

		addMenuOption: function(text, callback) {
		},

		create: function () {
			// deathMusic = game.add.audio('gameOverMusic');
            //deathMusic.play();
			var margin = 50;
			 var x = -margin;
  			var y = -margin;
  			var w = game.world.width + margin * 2;
  			var h = game.world.height + margin * 2;
  			game.world.setBounds(x, y, w, h);
  			game.world.camera.position.set(0);
			gameOverPageBackground = game.add.sprite(-10, 80, 'gameOverPageBG');
			addQuake();
			var topTextStyle = { font: "30px Verdana", fill: "#666666", align: "center" };
    	    var topText = game.add.text(game.world.centerX, 15, "You are dead!~", topTextStyle );
            var deadTextStyle = { font: "25px Verdana", fill: "#666666", align: "center" };
            var deadTutorial = game.add.text(300, 430, "Avoid the beams!~", deadTextStyle );

            topText.fixedToCamera = true;
    	    topText.anchor.setTo( 0.5, 0.0 );
            playButton = game.add.button(255, 480, 'playButton', gotoMainMenu, 'MainMenu', this.gotoMainMenu, this);

        }
	}
};
