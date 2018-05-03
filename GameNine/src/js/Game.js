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
	var diamondPack=null;
	var apple=null;
	var health=null;
	var sprint=null;

	// Enemies:
	var bat=null;
	var horse=null;
	var weapon=null;
	var direction=null;
	var ebat = null;
	var eweapon=null;
	var distanceBat=null;
	var distanceeBat=null;
	var wBulletSpeed= 500;
	var wFireRate=1500;
	var weBulletSpeed=500;
	var weFireRate=1500;

	var wLvl0FR=1500
	var wLvl1FR=1000
	var wLvl2FR=750
	var wLvl3FR=500

	var wLvl0BS=500;
	var wLvl1BS=750;
	var wLvl2BS=1000;
	var wLvl3BS=1250;

	var ebSpeed=100;
	var bSpeed=100;

	// Interaction
	var healthPackPlayer=null;
	var potionPackPlayer=null;
	var diamondPackPlayer=null;
	var diamondPackEnemy=null; 
	var applePackPlayer=null;
	var batPlayer=null;
	var ebatPlayer=null;

	// Music
	var music=null;
	var woosh=null;
	var eat=null;
	var gulp=null;
	var upgrade=null;
	var shine=null;
	var laser=null;
	var horseSound=null;
	var normalRun = null;
  	var fastRun = null;
  	var runningSound=null;
  	var blaster=null;
  	var hit=null;

	// Settings
	var blurX=null;
	var blurY=null; 
	var playerLeftVelocity=-400;
	var playerRightVelocity=400;
	var x=null;
	var y=null;

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
		runningSound.stop();
		horseSound.stop();
		laser.stop();
	    game.state.start('Win');
	}

	function woosh(){
		woosh.play();
	}

	function collectDiamond(player, diamond){
		shine.play();
		yourTreasure+=1;
		diamond.kill();
		targetPoint+=25;
	}

	function noUpgradeSpeed(){
		player.animations.add('right', [0,1,2,3,4,5,6,7], 20, true);
	    player.animations.add('left', [15,14,13,12,11,10,9,8], 20, true);
	    playerLeftVelocity=-400;
		playerRightVelocity=400;
		blurX.blur = 0;
    	blurY.blur = 0;
    	runningSound.stop();
    	runningSound=normalRun;
    	distanceeBat=100;
    	distanceBat=100;
    	wFireRate=wLvl0FR;
    	wBulletSpeed=wLvl0BS;
    	weFireRate=wLvl0FR;
    	weBulletSpeed=wLvl0BS;
    	bSpeed=900;
    	ebSpeed=300;
	}

	function firstUpgradeSpeed(){
		player.animations.add('right', [0,1,2,3,4,5,6,7], 60, true);
	    player.animations.add('left', [15,14,13,12,11,10,9,8], 60, true);
	    playerLeftVelocity=-1000;
		playerRightVelocity=1000;
		blurX.blur = 1;
    	blurY.blur = 0;
    	runningSound.stop();
    	runningSound=sprint;
    	distanceeBat=200;
    	distanceBat=200;
    	wFireRate=wLvl1FR;
    	wBulletSpeed=wLvl1BS;
    	weFireRate=wLvl1FR;
    	weBulletSpeed=wLvl1BS;
    	bSpeed=1250;
    	ebSpeed=800;
	}

	function secondUpgradeSpeed(){
		player.animations.add('right', [0,1,2,3,4,5,6,7], 120, true);
	    player.animations.add('left', [15,14,13,12,11,10,9,8], 120, true);
	    playerLeftVelocity=-1500;
		playerRightVelocity=1500;
		blurX.blur = 15;
    	blurY.blur = 5;
    	runningSound.stop();
    	runningSound=fastRun;
    	distanceeBat=300;
    	distanceBat=300;
    	wFireRate=wLvl2FR;
    	wBulletSpeed=wLvl2BS;
    	weFireRate=wLvl2FR;
    	weBulletSpeed=wLvl2BS;
    	bSpeed=1750;
    	ebSpeed=1300;
	}

	function thirdUpgradeSpeed(){
		player.animations.add('right', [0,1,2,3,4,5,6,7], 180, true);
	    player.animations.add('left', [15,14,13,12,11,10,9,8], 180, true);
	    playerLeftVelocity=-2500;
		playerRightVelocity=2500;
		blurX.blur = 20;
    	blurY.blur = 6;
    	runningSound.stop();
    	runningSound=fastRun;
    	distanceeBat=400;
    	distanceBat=400;
    	wFireRate=wLvl3FR;
    	wBulletSpeed=wLvl3BS;
    	weFireRate=wLvl3FR;
    	weBulletSpeed=wLvl3BS;
    	bSpeed=3000;
    	ebSpeed=2000;
	}

	function unpauseGame(){
		game.paused=false;
	}

	function randSpawnItem(){
    	items.create(Math.random()*400, 480, 'item');
  	}

  	function moveRight(){
  		horse.body.velocity.x=1200;
  		horse.animations.play('right');
  		if(!horseSound.isPlaying){
  			if(Math.abs(horse.position.x-player.position.x)<500){
  				horseSound.play();
  			}else{
  				horseSound.stop();
  			}
  		}
  	}

  	function moveLeft(){
  		horse.body.velocity.x=-1200;
  		horse.animations.play('left');
  		if(!horseSound.isPlaying){
  			if(Math.abs(horse.position.x-player.position.x)<500){
  				horseSound.play();
  			}else{
  				horseSound.stop();
  			}
  		}
  	}

  	function spawnHP(){
  		y = game.rnd.integerInRange(1, 3);
  		if(y==1){
  			x = game.rnd.integerInRange(0, 14);
  		}else if(y==2){
  			x = game.rnd.integerInRange(15, 31);
  		}else if(y==3){
  		  	x = game.rnd.integerInRange(32, 47);
  		}

  		item = game.add.sprite(Math.random()*22000, 480, 'item');
  		item.frame=x;
		game.physics.enable(item, Phaser.Physics.ARCADE);
  	}

  	function collectHP(player, item){
  		// Tier 1 Junk food food: 5HP+
  		// Tier 2 Carb food food: 10HP+
  		// Tier 3 Healthy food: 20HP+
  		// Can boost to past 20HP with proper food
  		if(item.frame>=0 && item.frame<=12){
  			if(healthLevel<healthTotal)
      			healthLevel+=5;
    		else if(healthLevel==healthTotal)
      			healthLevel+=5;
    		else if(healthLevel>healthTotal)
      			healthLevel+=0;
  		}else if(item.frame>=15 && item.frame<=31){
  			if(healthLevel<healthTotal)
      			healthLevel+=10;
    		else if(healthLevel==healthTotal)
      			healthLevel+=10;
    		else if(healthLevel>healthTotal)
      			healthLevel+=0;
  		}else if(item.frame>=32 && item.frame<=47){
  			if(healthLevel<healthTotal)
      			healthLevel+=20;
    		else if(healthLevel==healthTotal)
      			healthLevel+=20;
    		else if(healthLevel>healthTotal)
      			healthLevel+=0;
  		}
		eat.play();
		item.kill();
      	spawnHP();
  	}

  	function bottleEat(player, potion){
  		gulp.play();
		potion.kill();
  		if(upgradeLevel==0){
  			firstUpgradeSpeed();
  			upgradeLevel++;
  		}else if(upgradeLevel==1){
  			secondUpgradeSpeed();
  			upgradeLevel++;
  		}else if(upgradeLevel==2){
  			thirdUpgradeSpeed();
  			upgradeLevel=3;
  		}else{

  		}
		spawnPotion();
	}


  	function spawnPotion(){
  		y = game.rnd.integerInRange(1,3);
  		if(y==1){
  			x = 176;
  		}else if(y==2){
  			x = 178;
  		}else if(y==3){
  			x = 180;
  		}
  		potion = game.add.sprite(Math.random()*22000, 480, 'item');
		game.physics.enable(potion, Phaser.Physics.ARCADE);
		potion.frame=x;
  	}


  	function spawnDiamond(){
  		y = game.rnd.integerInRange(1, 5);
  		if(y==1){
  			x = game.rnd.integerInRange(192, 195);
  		}else if(y==2){
  		  	x = game.rnd.integerInRange(196, 204);
  		}else if(y==3){
  			x = game.rnd.integerInRange(217, 227);
  		}else if(y==4){
  			x = game.rnd.integerInRange(228, 243);
  		}else if(y==5){
  			x = game.rnd.integerInRange(244);
  		}

  		diamond = game.add.sprite(Math.random()*22000, 510, 'item');
  		diamond.frame=x;
		game.physics.enable(diamond, Phaser.Physics.ARCADE);
  	}

  	function collectDiamond(player, diamond){
  		if(diamond.frame==192 || diamond.frame==193 || diamond.frame==194 || diamond.frame==195){
  			yourTreasure+=5;
  		}else if(diamond.frame==196 || diamond.frame==197 || diamond.frame==198 || diamond.frame==199 || diamond.frame==200
  			|| diamond.frame==201 || diamond.frame==202 || diamond.frame==203 || diamond.frame==204){
  			yourTreasure+=10;
  		}else if(diamond.frame==217 || diamond.frame==218 || diamond.frame==227){
  			yourTreasure+=15;
  		}else if(diamond.frame>=228  && diamond.frame<=243){
  			yourTreasure+=20;
  		}else if(diamond.frame==244){
  			yourTreasure+=30;
  		}
  		shine.play();
  		diamond.kill();
  		spawnDiamond();
  	}


  	function eCollectDiamond(horse, diamond){
  		if(diamond.frame==192 || diamond.frame==193 || diamond.frame==194 || diamond.frame==195){
  			enemiesTreasure+=5;
  		}else if(diamond.frame==196 || diamond.frame==197 || diamond.frame==198 || diamond.frame==199 || diamond.frame==200
  			|| diamond.frame==201 || diamond.frame==202 || diamond.frame==203 || diamond.frame==204){
  			enemiesTreasure+=10;
  		}else if(diamond.frame==217 || diamond.frame==218 || diamond.frame==227){
  			enemiesTreasure+=15;
  		}else if(diamond.frame==228 || diamond.frame==243){
  			enemiesTreasure+=20;
  		}else if(diamond.frame==244){
  			enemiesTreasure+=30;
  		}
  		diamond.kill();
  		spawnDiamond();
  	}


  	function loseHP(player){
  		if(healthLevel>10){
  			healthLevel-=5;
  		}else if(healthLevel<=10){
  			healthLevel=0;
 			music.stop();
      		game.state.start('GameOver');
  		}else{

  		}
  	}

  	function loseSpeed(player){
  		if(upgradeLevel==3){
  			upgradeLevel=2;
  			secondUpgradeSpeed();
  		}else if(upgradeLevel==2){
  			upgradeLevel=1;
  			firstUpgradeSpeed();
  		}else if(upgradeLevel==1){
  			noUpgradeSpeed();
  			upgradeLevel=0;
  		}else{
  		}
  	}

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
  		shine.volume = 0.2;
  		laser = game.add.audio('laser');
  		laser.volume = 0.1;
  		blaster = game.add.audio('blaster');
  		blaster.volume = 0.1;
  		horseSound = game.add.audio('horse');
  		horseSound.volume = 0.3;
  		normalRun = game.add.audio('normalRun');
  		normalRun.volume = 0.6;
  		fastRun = game.add.audio('fastRun');
  		fastRun.volume = 0.6;
  		runningSound = normalRun;
  		sprint = game.add.audio('sprint');
  		sprint.volume = 0.6;
  		hit = game.add.audio('hit');

	    // Player
	    player = game.add.sprite(50, 480, 'player');
	    game.physics.enable(player, Phaser.Physics.ARCADE);
	    player.body.acceleration.x=5;
	    // Re-sizing player's hitbox
	    					//X, Y, right, down
	    player.body.setSize(33,60,15,10);
	    // Make it bounce off of the world bounds.
	    player.body.collideWorldBounds = true;
	    	    // Animation movements
	    	// Start
	    player.animations.add('right', [0,1,2,3,4,5,6,7], 20, true);
	    player.animations.add('left', [15,14,13,12,11,10,9,8], 20, true);

	    player.animations.play('right');
	    player.animations.stop();

      	blurX = game.add.filter('BlurX');
		blurY = game.add.filter('BlurY');


	    healthLevel=100;
	    upgradeLevel=0;

	    // Enemy
	    horse = game.add.sprite(20,510,'horse');
	    game.physics.enable(horse, Phaser.Physics.ARCADE);
	    horse.body.setSize(25,25,7,3);
	    horse.animations.add('right', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49], 180, true);
	    horse.animations.add('left', [114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167], 180, true);

	    // Enemies' partners
	    	// HP damager bat
	    bat = game.add.sprite(1000, 200, 'butterfly', 0);
	    game.physics.enable(bat, Phaser.Physics.ARCADE);
	    bat.animations.add('fly', [0,1,2], 20, true);
	    weapon = game.add.weapon(30, 'ammo');
	    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      	weapon.bulletSpeed = wBulletSpeed;
      	weapon.fireRate = wFireRate;
     	weapon.bulletAngleVariance=3;
      	weapon.trackSprite(bat, 20, 20);
      	weapon.fireAngle = 90;
      		// Speed damager bat
      	ebat = game.add.sprite(1500, 200, 'butterfly', 10);
	    game.physics.enable(ebat, Phaser.Physics.ARCADE);
	    ebat.animations.add('fly', [0,1,2,3,4,5,6,7,8,9,10,11], 30, true);
	   	eweapon = game.add.weapon(30, 'ammo2');
	    eweapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      	eweapon.bulletSpeed = weBulletSpeed;
      	eweapon.fireRate = weFireRate;
     	eweapon.bulletAngleVariance=3;
      	eweapon.trackSprite(ebat, 20, 20);
      	eweapon.fireAngle = 90;

      	// Starting treasure
      	yourTreasure=0;
      	enemiesTreasure=0;

		// Food
		item = game.add.sprite(350, 480, 'item');
		game.physics.enable(item, Phaser.Physics.ARCADE);
		item.frame=0;
		
		// Potion
		potion = game.add.sprite(1500, 480, 'item');
		game.physics.enable(potion, Phaser.Physics.ARCADE);
		potion.frame=176;

		// Diamond
		diamond = game.add.sprite(Math.random()*200, 510, 'item');
		game.physics.enable(diamond, Phaser.Physics.ARCADE);
		diamond.frame=233;

		noUpgradeSpeed();

		// Start
    	blurX.blur = 0;
    	blurY.blur = 0;

	    // Camera
	    game.camera.follow(player);

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
        game.debug.text('Food raises HP', 350, 50);
        game.debug.text('Find the Jewels', 345, 70);
        game.debug.text('Time: ' + timeLevel, 694, 20);
    },

    update: function () {
        // Interaction:
		healthPackPlayer = game.physics.arcade.collide(player, item, collectHP, null, this);
		potionPackPlayer = game.physics.arcade.collide(player, potion, bottleEat, null, this );
		diamondPackPlayer = game.physics.arcade.collide(player, diamond, collectDiamond, null, this );
		diamondPackEnemy = game.physics.arcade.collide(horse, diamond, eCollectDiamond, null, this);
		batPlayer = game.physics.arcade.overlap(weapon.bullets, player, loseHP, null, this);
		ebatPlayer = game.physics.arcade.overlap(eweapon.bullets, player, loseSpeed, null, this);

		// Sound enhancement
      	if(gulp.isPlaying){
			upgrade.play();
      	}

      	// Bat attack distance will increase as you level up
		// Bat
			// Bat animation
		bat.animations.play('fly');
		if(!laser.isPlaying){
			if(Math.abs(player.position.x-bat.position.x)<distanceBat){
				if(weapon.fire())
					laser.play();
			}
		}
		
		// EBat
		ebat.animations.play('fly');
		if(!blaster.isPlaying){
			if(Math.abs(player.position.x-ebat.position.x)<distanceeBat){
				if(eweapon.fire())
					blaster.play();
			}
		}

      	weapon.bulletSpeed = wBulletSpeed;
      	weapon.fireRate = wFireRate;
      	eweapon.bulletSpeed = weBulletSpeed;
      	eweapon.fireRate = weFireRate;

		bat.position.y = 200;
		ebat.position.y=250;
		
		game.physics.arcade.moveToObject(bat, player, bSpeed, 0)
		game.physics.arcade.moveToObject(ebat, player, ebSpeed, 0)


		// Horse
		if(horse.body.position.x == 27 && horse.body.position.x<22000){
			// Go to east edge
			direction=1;
		}
	 	else if(horse.body.position.x>22000){
			// Go to west edge
			direction=2;
		}else if(horse.body.position.x<27){
			direction=0;
		}

		switch(direction){
			case 0:
				horse.body.velocity.x=0;
				horse.animations.play('right');
				horse.animations.stop();
				horseSound.stop();
			case 1:
				moveRight();
				break;
			case 2:
				moveLeft();
				break;
		}


      	//Stat:
        timeLevel = this.game.time.totalElapsedSeconds();

      	//  Reset the player's velocity/movement
    	player.body.velocity.x=0;
    	player.body.velocity.y=0;


    	// KEY Control
    	var cursors = game.input.keyboard.createCursorKeys();
    	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    	// Control
    	if(cursors.left.isDown){
        	player.body.velocity.x = playerLeftVelocity;
        	player.filters = [blurX, blurY];
        	player.animations.play('left');
        	if(player.deltaX!=0 && !runningSound.isPlaying){
				runningSound.play();
        	}
      	}else if (cursors.right.isDown){
        	player.body.velocity.x = playerRightVelocity;
        	player.filters = [blurX, blurY];
        	player.animations.play('right');
    		if(player.deltaX!=0 && !runningSound.isPlaying){
				runningSound.play();
     		}
      	}else{
      		player.filters=null;
        	player.animations.stop();
        	runningSound.stop();
        	//game.paused=false;
      	}

      	// WOOSH sound for starting running
      	if(player.body.velocity.x!=0 &&  upgradeLevel==3 && player.deltaX!=0 && !(player.deltaX>33 || player.deltaX<-33) ){
        	woosh.play();
        }

    	//Winner
    	if(yourTreasure>=100)
    	{
        	winGame();
      	}
      	if(enemiesTreasure>=100)
      	{
      		music.stop();
      		game.state.start('GameOver');
      	}
    },
	}
};