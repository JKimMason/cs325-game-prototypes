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
    this.bouncy = null;;
    //this.map = null;
};

var map;
var layer;

BasicGame.Game.prototype = {
    create: function () {
        //Change the background colour
       this.game.stage.backgroundColor = "#a9f0ff";
       // Add chicken trump
       this.cTrump = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'chickenTrump' );

        // Turn on the arcade physics engine for this sprite.
        this.game.physics.enable( this.cTrump, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        this.cTrump.body.collideWorldBounds = true;
        // map = this.add.tilemap('tmap', 100, 100);
        // map.addTilesetImage('tile');
        // layer = map.createLayer(0);
        // layer.resizeWorld();
        // Add tilemap and tileset image
        //this.map = this.game.add.tilemap('tmap');
        //this.map.addTilesetImage('tils', 'tiles');
        //his.load.tilemap(''tmap', 'asssets/tiles/trumpMap.json', null, Phaser.Tilemap.TILED_JSON');
        //this.load.image('tiles', 'assets/tiles/grass_main_128x128_0.png');
        //this.game.load.tilemap('tmap', 'asssets/tiles/trumpMap.json', null, Phaser.Tilemap.TILED_JSON);
        	//    this.game.load.image('tiles', 'assets/tiles/grass_main_128x128_0.png');

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#666666", align: "center" };
        var text = this.game.add.text( this.game.world.centerX, 15, "RUN!", style );

        text.anchor.setTo( 0.5, 0.0 );

        this.game.camera.follow(this.cTrump);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        //cursors = game.input.keyboard.createCursorKeys();

        // Flower player
        //game.camera.follow(this.mysprite);

        // // When you click on the sprite, you go back to the MainMenu.
        //this.bouncy.inputEnabled = true;
        //this.bouncy.events.onInputDown.add( function() { this.quitGame(); }, this );



        // Add tilemap and tileset image
        //this.map = this.game.add.tilemap('tilemap');
        //this.map.addTilesetImage('tiles128', 'tiles');
        //
        // //Change the background colour
        // this.game.stage.backgroundColor = "#a9f0ff";
        // // Add goundLayer
        // this.groundLayer = this.map.createLayer('GroundLayer');
        // // Set tiles can collide
        // //this.map.setCollisonBetween(1,100,true, 'GroundLayer');
        //
        // // Change world size to match size of this groundLayer
        // this.groundLayer.resizeWorld();
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //this.bouncy.rotation = this.game.physics.arcade.accelerateToPointer( this.bouncy, this.game.input.activePointer, 400, 400, 400 );
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('Menu');

    }

};
