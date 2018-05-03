"use strict";

BasicGame.Game = function (game) {
	//Map
	var land=null;
  	var land2=null;
  	var land3=null;
  	var land4=null;
  	var land5=null;
  	var land6=null;
  	var land7=null;
  	var land8=null;  	
  	var land9=null;
  	var land10=null;
  	var Sumland1=null; 
  	var Sumland2=null;
  	var Sumland3=null;  
  	var Sumland4=null; 
  	var Sumland5=null;
  	var Sumland6=null; 
  	var Sumland7=null; 
  	var Sumland8=null;
  	var Sumland9=null; 
	var Sumland10=null;

	var player=null;
	var targetPoint=null;
	var item=null;
	var items=null;

	var healthLevel=null;
	var healthTotal=100;
	var healthItems=null;
	var enemiesTreasure=0;
	var yourTreasure=0;
	var potion=null;
	var potion2=null;
	var upgradeLevel=null;
	var timeLevel=null;
	var diamond=null;
	var lightning=null;

	// Enemies:
	var bat=null;
	var horse=null;

	// Interaction
	var healthPackPlayer=null;
	var potionPackPlayer=null;
	var diamondPackPlayer=null;

	// Music
	var music=null;
	var woosh=null;
	var eat=null;
	var gulp=null;
	var upgrade=null;
	var shine=null;

	// Settings
	var blurX=null;
	var blurY=null; 
	var playerLeftVelocity=-400;
	var playerRightVelocity=400;


	function quitGame(){
		music.stop();
	    game.state.start('Menu');
	}

	function winGame(){
	    music.stop();
	   	player.animations.add('right', [0,1,2,3,4,5,6,7], 20, true);
	    player.animations.add('left', [15,14,13,12,11,10,9,8], 20, true);
	   	blurX.blur = 0;
    	blurY.blur = 0;
    	playerLeftVelocity=-400;
		playerRightVelocity=400;
		yourTreasure=0;
		upgradeLevel=0;
		healthLevel=50;
	    game.state.start('Win');
	}

	function woosh(){
		woosh.play();
	}

	function bottleEat(player, potion){
		gulp.play();
		potion.kill();
	}

	function collectDiamond(player, diamond){
		shine.play();
		yourTreasure+=1;
		diamond.kill();
		targetPoint+=25;
		// Refresh-mechanisms until iteration
		playerLeftVelocity=-400;
		playerRightVelocity=400;
		yourTreasure=0;
		upgradeLevel=0;
		healthLevel=50;
	}

	function collectHP(player, item){
		if(item.frame==0){
			eat.play();
			item.kill();
		}
		if(healthLevel<healthTotal)
      		healthLevel+=5;
    	else if(healthLevel==healthTotal)
      		healthLevel+=5;
    	else if(healthLevel>healthTotal)
      		healthLevel+=0;
	}

	function firstUpgradeSpeed(){
		player.animations.add('right', [0,1,2,3,4,5,6,7], 120, true);
	    player.animations.add('left', [15,14,13,12,11,10,9,8], 120, true);
	    playerLeftVelocity=-2000;
		playerRightVelocity=2000;
		blurX.blur = 20;
    	blurY.blur = 5;
	}

	function dropSpeedBoost(player, item){
		item.frame=192;
	}

	function dropRandItems(player, item){
		var rand = Math.random()*20;
		items.frame=rand;
		items.create(Math.random()*22000, 480, 'item');
	}

	function unpauseGame(){
		game.paused=false;
	}

	function randSpawnItem(){
    	items.create(Math.random()*400, 480, 'item');
  	}

	// function enemiesSpawn(){
	//     var x = Math.random()*10;
	//     if(x>=5)
	//     {
	//       bat = game.add.sprite(Math.random()*22000, 200, 'bat');
	//     }
	//     else if(x<5)
	//     {
	//       bat = game.add.sprite(Math.random()*11000, 200, 'bat');
	//     }
	    
	//     at.enableBody=true;
	//     game.physics.enable(enemies, Phaser.Physics.ARCADE);
	//     bat = game.add.sprite(500, 200, 'bat');
	//     game.physics.enable(bat, Phaser.Physics.ARCADE);
	//     bat.animations.add('fly', [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2], 20, true);
	// }

  	return {
    	create: function () {
      	// Set world
	    game.physics.startSystem(Phaser.Physics.ARCADE);
	    game.world.setBounds(0,0, 24000, 600);
	    // FPS
	    game.time.desiredFps = 60;
	    // Map
	    land = game.add.tileSprite(0, 0, 1200, 600, 'earth');
	    land2 = game.add.tileSprite(1200, 0, 1200, 600, 'earth');
	    land3 = game.add.tileSprite(2400, 0, 1200, 600, 'earth');
	    land4 = game.add.tileSprite(3600, 0, 1200, 600, 'earth');
	    land5 = game.add.tileSprite(4800, 0, 1200, 600, 'earth');
	    land6 = game.add.tileSprite(6000, 0, 1200, 600, 'earth');
	   	land7 = game.add.tileSprite(7200, 0, 1200, 600, 'earth');
	    land8 = game.add.tileSprite(8400, 0, 1200, 600, 'earth');
	    land9 = game.add.tileSprite(9600, 0, 1200, 600, 'earth');
	    land10 = game.add.tileSprite(10800, 0, 1200, 600, 'earth');
	   	Sumland1 = game.add.tileSprite(12000, 0, 1200, 600, 'summer');
	   	Sumland2 = game.add.tileSprite(13200, 0, 1200, 600, 'summer');
	   	Sumland3 = game.add.tileSprite(14400, 0, 1200, 600, 'summer');
	   	Sumland4 = game.add.tileSprite(15600, 0, 1200, 600, 'summer');
	   	Sumland5 = game.add.tileSprite(16800, 0, 1200, 600, 'summer');
	   	Sumland6 = game.add.tileSprite(18000, 0, 1200, 600, 'summer');
	   	Sumland7 = game.add.tileSprite(19200, 0, 1200, 600, 'summer');
	   	Sumland8 = game.add.tileSprite(20400, 0, 1200, 600, 'summer');
	   	Sumland9 = game.add.tileSprite(21600, 0, 1200, 600, 'summer');
	   	Sumland10 = game.add.tileSprite(22800, 0, 1200, 600, 'summer');	    		   		   		   		   		   		   	

      	// Music
      	music = game.add.audio('gameMusic');
	    music.play();
        music.volume = 0.5;

  		// Sound
  		woosh = game.add.audio('woosh');
  		eat = game.add.audio('eat');
  		gulp = game.add.audio('gulp');
  		upgrade = game.add.audio('upgrade');
  		shine = game.add.audio('diamondSound');

	    // Player
	    player = game.add.sprite(50, 480, 'player');
	    game.physics.enable(player, Phaser.Physics.ARCADE);
	    player.body.acceleration.x=5;
	    // Re-sizing player's hitbox
	    					//X, Y, right, down
	    player.body.setSize(33,60,15,10);
	    // Make it bounce off of the world bounds.
	    player.body.collideWorldBounds = true;
	    // Enables camera to follow player.
	    game.camera.follow(player);
	    healthLevel=50;
	    upgradeLevel=0;

	    // Enemy
	    horse = game.add.sprite(20,490,'horse');
	    game.physics.enable(horse, Phaser.Physics.ARCADE);
	    horse.body.setSize(25,25,7,3);
	    horse.animations.add('right', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49]);
	    horse.animations.add('left', [114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167]);

	    // Enemies' partners
	    bat = game.add.sprite(500, 200, 'bat');
	    game.physics.enable(bat, Phaser.Physics.ARCADE);
	    bat.animations.add('fly', [0,1,2,3,4,5,6,7,8,9,8,7,6,5,4,3,2], 20, true);

	    // Animation movements
	    	// Start
	    player.animations.add('right', [0,1,2,3,4,5,6,7], 20, true);
	    player.animations.add('left', [15,14,13,12,11,10,9,8], 20, true);

	    player.animations.play('right');
	    player.animations.stop();

      	blurX = game.add.filter('BlurX');
		blurY = game.add.filter('BlurY');

		// Food
		item = game.add.sprite(350, 480, 'item');
		game.physics.enable(item, Phaser.Physics.ARCADE);
		item.frame=0;
		
		// Potion
		potion = game.add.sprite(1500, 480, 'item');
		game.physics.enable(potion, Phaser.Physics.ARCADE);
		potion.frame=179;

		// Diamond
		diamond = game.add.sprite(Math.random()*22000, 480, 'item');
		game.physics.enable(diamond, Phaser.Physics.ARCADE);
		diamond.frame=233;


		// Lightning
		//lightning = game.add.sprite(500, 400, 'lightning');
		//game.physics.enable(lightning, Phaser.Physics.ARCADE);

		// Start
    	blurX.blur = 0;
    	blurY.blur = 0;

	    // Camera
	    game.camera.follow(player);
	    // initial points
	   	targetPoint=0;
   	},

    // Debug
    render: function(){
    	//game.debug.bodyInfo(player, 32, 400); 
    	//game.debug.bodyInfo(horse, 32, 410);
    	//game.debug.body(horse);
    	//game.debug.body(player);
    	game.debug.text('Health:  ' + healthLevel + '/' + healthTotal, 30, 30);
        game.debug.text('Upgrade: ' + upgradeLevel, 30, 50);
        game.debug.text('Enemies\' Treasures: ' + enemiesTreasure, 30, 90);
        game.debug.text('Your Treasures: ' + yourTreasure, 30, 70);
        game.debug.text('Potion increases speed!', 320, 30);
        game.debug.text('Apple raises HP', 350, 50);
        game.debug.text('Find the diamond', 345, 70);
        game.debug.text('Time: ' + timeLevel, 694, 20);
    },

    update: function () {
        // Interaction:
		healthPackPlayer = game.physics.arcade.collide(player, item, collectHP, null, this);
		potionPackPlayer = game.physics.arcade.collide(player, potion, bottleEat, null, this );
		diamondPackPlayer = game.physics.arcade.collide(player, diamond, collectDiamond, null, this );

		// Bat animation
		bat.animations.play('fly');

		// Sound enhancement
      	if(gulp.isPlaying){
			upgrade.play();
      	}
		if(upgrade.isPlaying){
			if(upgradeLevel==0){
				firstUpgradeSpeed();
				upgradeLevel=1;
			}
		}

      	//Stat:
        timeLevel = this.game.time.totalElapsedSeconds();

      	//  Reset the player's velocity/movement
    	player.body.velocity.x=0;
    	player.body.velocity.y=0;

    	//Enemies movement:

    	// KEY Control
    	var cursors = game.input.keyboard.createCursorKeys();
    	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    	// Control
    	if(cursors.left.isDown){
        	player.body.velocity.x = playerLeftVelocity;
        	player.filters = [blurX, blurY];
        	player.animations.play('left');
      	}
      	else if (cursors.right.isDown){
        	player.body.velocity.x = playerRightVelocity;
        	player.filters = [blurX, blurY];
        	player.animations.play('right');
      	}
      	else{
      		player.filters=null;
        	player.animations.stop();
        	//game.paused=false;
      	}

      	// Sound for running
      	if(player.body.velocity.x!=0 && upgradeLevel==1 && player.deltaX!=0 && !(player.deltaX>33 || player.deltaX<-33) ){
        	woosh.play();
        }

    	//Winner
    	if(targetPoint==25)
    	{
        	winGame();
      	}
    },
	}
};