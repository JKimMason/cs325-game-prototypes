"use strict";

BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    */

    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
    //this.map = null;
    this.cTrump = null;
};

BasicGame.Game.prototype = {
    create: function () {
        // Set FPS
        this.game.time.desiredFps = 60;
        // Background picture:
        this.game.add.tileSprite(0, 0, 1000, 600, 'background');
        //this.game.load.image('background');
        //Change the background colour
       this.game.stage.backgroundColor = "#a9f0ff";
       // Add chicken trump
       this.cTrump = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'chickenTrump' );
       //this.cTrump.frame =0;
       this.cTrump.animations.add('down', [0,1,2,3,4,5], 15, true);
       this.cTrump.animations.add('right', [6,7,8,9,10,11],15, true);
       this.cTrump.animations.add('up', [12,13,14,15,16,17], 15, true);
       this.cTrump.animations.add('left', [18,19,20,21,22,23],15, true);

        // Turn on the arcade physics engine for this sprite.
        this.game.physics.enable( this.cTrump, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        this.cTrump.body.collideWorldBounds = true;

        // Follow
        this.game.camera.follow(this.cTrump);

        // CSS style to text
        var style = { font: "25px Verdana", fill: "#666666", align: "center" };
        var text = this.game.add.text( this.game.world.centerX, 15, "RUN!", style );
        text.anchor.setTo( 0.5, 0.0 );
    },

    update: function () {
        // Control
        //this.cTrump.animations.stop();
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
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
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
        else if ((!this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) &&
                    (!this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) &&
                    (!this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) &&
                    (!this.game.input.keyboard.isDown(Phaser.Keyboard.UP)))
        {
            this.cTrump.animations.stop();
        }
    },

    quitGame: function () {
        //  Then let's go back to the main menu.
        this.state.start('Menu');

    }

};
