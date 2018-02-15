"use strict";

BasicGame.Game = function (game) {
    this.cTrump = null;
    this.kfc = null;
    this.mcdonald = null;
    this.gameMusic = null;
    this.chickenDane = null;
};

BasicGame.Game.prototype = {
    create: function () {
        // Music
        this.gameMusic = this.add.audio('gameMusic');
        this.gameMusic.play();
        // Set FPS
        this.game.time.desiredFps = 60;
        // Background picture:
        this.game.add.tileSprite(0, 0, 1000, 600, 'background');
        //Change the background colour
       this.game.stage.backgroundColor = "#a9f0ff";
       // Add chicken trump
       this.cTrump = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'chickenTrump' );
       // Add trump animaiton movements
       this.cTrump.animations.add('down', [0,1,2,3,4,5], 15, true);
       this.cTrump.animations.add('right', [6,7,8,9,10,11],15, true);
       this.cTrump.animations.add('up', [12,13,14,15,16,17], 15, true);
       this.cTrump.animations.add('left', [18,19,20,21,22,23],15, true);

        // Turn on the arcade physics engine for this sprite.
        this.game.physics.enable( this.cTrump, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //this.cTrump.body.collideWorldBounds = true;

        // Video:
        //this.chickenDance = this.add.video('chickenDance');
        //this.chickenDance.onPlay.addOnce(start, this);
        //this.addVid = this.chickenDance.addToWorld(400, 300, 0.5, 0,5);

        // Create new group
        this.kfc= this.game.add.group();
        this.mcdonald = this.game.add.group();
        this.kfc.enableBody = true;
        this.mcdonald.enableBody = true;

        // Text at top
       var topTextStyle = { font: "25px Verdana", fill: "#666666", align: "center" };
       var topText = this.game.add.text( this.game.world.centerX, 15, "Collect your prize!", topTextStyle );
       topText.anchor.setTo( 0.5, 0.0 );
       // Tutorial text at bottom
       var tutorialTextStyle = { font: "25px Verdana", fill: "#666666", align: "center" };
       var tutorial = this.game.add.text(280, 500, "Use the arrow keys!", tutorialTextStyle );
       // Score
       var score = 0;
       var scoreTextStyle = { font: "25px Verdana", fill: "#000000", align: "center" };
       var scoreText = this.game.add.text(25, 25, 'Score: 0' , scoreTextStyle );

       var roller = this.game.rnd.integerInRange(0, 10);
       var x = this.game.rnd.integerInRange(0, 800);
       var y = this.game.rnd.integerInRange(0, 600);
    },

    createKFC: function(x, y){
        this.x;
        this.y;
        var createKFC = this.kfc.sprite(x,y, 'kfc');
        //var createKFC = this.kfc.create(x,y, 'kfc');
    },

    createMCD: function(x, y){
        this.x;
        this.y;
        var createKFC = this.kfc.sprite(x,y, 'kfc');
        //var createKFC = this.kfc.create(x,y, 'kfc');
    },

    update: function () {
        // Randomizer
        var roller = this.game.rnd.integerInRange(0, 10);
        // var x = this.game.rnd.integerInRange(0, 800);
        // var y = this.game.rnd.integerInRange(0, 600);

        // Control
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
                this.cTrump.animations.play('left');
                this.cTrump.x -= 4;
                this.cTrump.animations.play('left');
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.cTrump.animations.play('right');
            this.cTrump.x += 4;
            this.cTrump.animations.play('right');
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            this.cTrump.animations.play('up');
            this.cTrump.y -= 4;
            this.cTrump.animations.play('up');
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
                this.cTrump.animations.play('down');
                this.cTrump.y += 4;
                this.cTrump.animations.play('down');
        }
        // Stop animation
        else if ((!this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) &&
                    (!this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) &&
                    (!this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) &&
                    (!this.game.input.keyboard.isDown(Phaser.Keyboard.UP)))
        {
            this.cTrump.animations.stop();
        }

        if(roller>0 && roller<6)
        {
            this.createKFC();
        }
        else if(roller>5 && roller<10)
        {
            this.createMCD();
        }

        if(point>200)
        {
            this.quitGame();
        }

        // Collision
        this.game.physics.arcade.overlap(this.cTrump, this.kfc, this.collectKFC, null, this);
        this.game.physics.arcade.overlap(this.cTrump, this.mcdonald, this.collectMCD, null, this);

    },

    //Collect kfc meal
    collectKFC: function(x, y){
        kfc.kill();
        score += 10;
        scoreText.text = 'Score: ' + score;
    },

    // Collect mcdonald meal
    collectMCD: function(x, y){
        mcdonald.kill();
        score += 5;
        scoreText.text = 'Score: ' + score;
    },

    quitGame: function () {
        //  Then let's go back to the main menu.
        this.state.start('Menu');
        this.gameMusic.stop();
    }
};
