"use strict";

BasicGame.Game = function (game) {
  var gamePageBackground = null;
  var player=null;
  var fireKey=null;
  var fire=false;
  var attack = null;
  var boltFireSound = null;
  var jumpButton = null;
  var map=null;
  var layer = null;
  var jumpTimer = 0;
  var platforms = null;
  var stars = null;
  var diamonds= null;
  var score=null;
  var scoreText=null;
  var scoreTextStyle= null;
  var tutorialTextStyle=null;
  var tutorial = null;
  var tutorialTwo= null;
  var tutorialThree = null;
  var monster=null;
  var monsterTwo=null;
  var music=null;
  var x=null;
  var y=null;
  var bullet=null;
  var weaponStar=null;
  var starSound=null;
  var spaceKey=null;
  var mHP=null;
  var mTwoHP=null;
  var mHPText=null;
  var mHPTextStyle=null;
  var mTwoHPText = null;
  var bothMonsterDead=null;

  function quitGame(){
    //  Then let's go back to the main menu.
    music.stop();
    game.state.start('Menu');
  }

  function winGame(){
    //  Then let's go back to the main menu.
    music.stop();
    game.state.start('Win');
  }

  function collectStar(player, star){
    star.kill();
      //  Add and update the score
    score += 1;
    //scoreText.text = 'Stars: ' + score;
    //tutorialTwo.destroy();
  }

  function collectDiamond(player, diamond){
    diamond.kill();
      //  Add and update the score
    score += 1000;
    //scoreText.text = 'You win!';
  }

  function tutorialDestroyText(){
    tutorial.destroy();
  }

  function tutorialTwoDestroyText(){
    tutorialTwo.destroy();
  }

  function tutorialThreeDestroyText(){
    tutorialThree.destroy();
  }

  function killZombie(){
    monster.animations.play('death');
    monster.kill();
  }

  function killPlayer(){
    player.kill();
    music.stop();
    game.state.start('GameOver');
  }

  function updatePlayerGravity(player, star){
    player.body.gravity.y -= 10;
    star.kill();
  }

  // Spawns
  function starSpawn(){
    var star = stars.create(Math.random()*800,Math.random()*100,'star');
    star.body.gravity.y = Math.random()*50;
    star.body.bounce.y = Math.random()*0.2;
  }

  function createZombie()
  {
    monster.visible = true;
    monster.animations.play('create');
  }

  function createZombieTwo()
  {
    monsterTwo.visible = true;
    monsterTwo.animations.play('create');
  }


  function moveRight()
  {
    monster.animations.play('right');
    //monster.animations.play('death');
   monster.body.velocity.x = 10;
  }

  function moveLeft()
  {
    monsterTwo.animations.play('left');
    monsterTwo.body.velocity.x = -10;
  }

  function hitMonster(monster, weaponStar)
  {
  	weaponStar.kill();
    mHP -= 1;
    mHP.text = 'Monster HP: ' + mHP + ' HP!';
    if(mHP<=0)
    	monster.kill();
  }

  function hitMonsterTwo(monsterTwo, weaponStar)
  {
    weaponStar.kill();
    mTwoHP -= 1;
    mTwoHP.text = 'Monster HP: ' + mTwoHP + ' HP!';
    if(mTwoHP<=0)
      monsterTwo.kill();
  }


  function loseOneStar(star)
  {
    score-=1;
    scoreText.text = 'Stars: ' + score;
  }

  function fireStar()
  {

    if(player.body.facing==Phaser.LEFT)
    { 
      //weaponStar.fireAngle = Phaser.ANGLE_LEFT;
      weaponStar.fireAtXY(0,player.position.y+40);
      starSound.play();
      weaponStar.fire();
      //game.time.events.add(Phaser.Timer.SECOND * 1, loseOneStar, this);
      //weaponStar.fire();
    }
    else if(player.body.facing==Phaser.RIGHT)
    {
      starSound.play();
      weaponStar.fire();
      //game.time.events.add(Phaser.Timer.SECOND * 1, loseOneStar, this);
    }
  }

  function showDiamond()
  {
    var diamond = diamonds.create(Math.random()*700,100,'diamond');
    diamond.body.gravity.y = 200;
    diamond.body.bounce.y = Math.random()*0.2;
    diamond.visible=false;
    diamond.visible=true;
  }

  return {
    create: function () {
      game.time.events.loop(Phaser.Timer.SECOND / (1), starSpawn, this);
      game.time.events.loop(Phaser.Timer.SECOND / (1/2), moveRight, this);
      // Set world
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.world.setBounds(0, 0, 800, 800);
      // FPS
      game.time.desiredFps = 60;
      // Map
      gamePageBackground = game.add.sprite(0, 0, 'gameBG');
      platforms = game.add.group();
      platforms.enableBody = true;
        // Create the ground.
      var ground = platforms.create(0, 785, 'ground');
      ground.scale.setTo(2, 2);
      ground.body.immovable = true;

      //  Now let's create two ledges
      //var ledge = platforms.create(400, 400, 'ground');
      // ledge = platforms.create(-100, 700, 'ground');
      //ledge.body.immovable = true;
      // ledge = platforms.create(-120, 550, 'ground');
      // ledge.body.immovable = true;
      // ledge = platforms.create(350, 400, 'ground');
      // ledge.body.immovable = true;
      // ledge = platforms.create(-200, 500, 'ground');
      // ledge.body.immovable = true;
      // ledge = platforms.create(-200, 200, 'ground');
      // ledge.body.immovable = true;
      //ledge = platforms.create(500, 300, 'ground');
      //ledge.body.immovable = true;

      // Music
      music = game.add.audio('gameMusic');
      starSound = game.add.audio('starSound');
      //music.play();
      music.volume = 0.5;
      starSound.volume = 0.2;
      // Player
      player = game.add.sprite( game.world.centerX, game.world.centerY, 'playerAdd');
      game.physics.enable(player, Phaser.Physics.ARCADE);
        // Re-sizing player's hitbox
      player.body.setSize(50,70,22,12);
      player.body.gravity.y = 300;
        // Animation movements
      player.animations.add('right', [6,7,8,9,10,11],15, true);
      player.animations.add('left', [18,19,20,21,22,23],15, true);
      jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      // Monster
      monster = game.add.sprite(50, 600, 'monsterAdd');
      monster.visible = false;
      game.physics.enable(monster, Phaser.Physics.ARCADE);
        // Re-size hitbox
      monster.body.setSize(28,55,22,3);
      monster.body.gravity.y = 500;
      game.time.events.add(Phaser.Timer.SECOND * 1, createZombie, this);
        // Animation
      monster.animations.add('right', [7,8,9,10,11,12,13],15, true);
      monster.animations.add('left', [14,15,16,17,18,19,20],15, true);
      monster.animations.add('death', [44,45,46,47,48,49,50,51,52,53,54,55],15,true);
      monster.animations.add('create', [54,53,52,51,45,44],3,true);

      monsterTwo = game.add.sprite(700, 600, 'monsterAdd');
      game.physics.enable(monsterTwo, Phaser.Physics.ARCADE);
      monsterTwo.visible = false;
        // Re-size hitbox
      monsterTwo.body.setSize(28,55,22,3);
      monsterTwo.body.gravity.y = 500;
      game.time.events.add(Phaser.Timer.SECOND * 1, createZombieTwo, this);

        // Animation
      monsterTwo.animations.add('right', [7,8,9,10,11,12,13],15, true);
      monsterTwo.animations.add('left', [14,15,16,17,18,19,20],15, true);
      monsterTwo.animations.add('death', [44,45,46,47,48,49,50,51,52,53,54,55],15,true);
      monsterTwo.animations.add('create', [54,53,52,51,45,44],3,true);


      // Random star spawn
      stars = game.add.group();
      stars.enableBody = true;

      // Weapon: bullet star
      weaponStar = game.add.weapon(5, 'star');
      weaponStar.trackSprite(player, 30,35, true);
      weaponStar.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      weaponStar.bulletSpeed = 600;
      weaponStar.fireRate = 100;

      // Diamond
      diamonds = game.add.group();
      diamonds.enableBody = true;

      // Zombie HP
      mHPTextStyle = { font: "25px Verdana", fill: "#F5FF33", align: "center" };
      mHPText = game.add.text(player.position.x-400, player.position.y-400, 'Monster HP: 100' , mHPTextStyle );
      mHPText.fixedToCamera = true;
      mTwoHPText = game.add.text(player.position.x+180, player.position.y-400, 'Monster HP: 100' , mHPTextStyle );
      mTwoHPText.fixedToCamera = true;
      score = 0;

      bothMonsterDead=false;
      // Make it bounce off of the world bounds.
      player.body.collideWorldBounds = true;
      // Enables camera to follow player.
      game.camera.follow(player);
    },

    // Debug
    render: function(){
      //game.debug.bodyInfo(monster, 32, 200);
      //game.debug.bodyInfo(player, 32,80);
      //game.debug.body(player);
      //game.debug.body(monster);
      //weaponStar.debug();
    },

    update: function () {
      var starPhysics = game.physics.arcade.collide(stars, platforms);
      var starPlayer = game.physics.arcade.overlap(player, stars, collectStar, null, this);
      var diamondPhysics = game.physics.arcade.collide(diamonds, platforms);
      var diamondPlayer = game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);
      var monsterPlayer = game.physics.arcade.overlap(player, monster, killPlayer, null, this);
      var monsterTwoPlayer = game.physics.arcade.overlap(player, monsterTwo, killPlayer, null, this);
      var hitPlatform = game.physics.arcade.collide(player, platforms);
      var monsterPlatform = game.physics.arcade.collide(monster, platforms);
      var monsterTwoPlatform = game.physics.arcade.collide(monsterTwo, platforms);


      var monsterStar = game.physics.arcade.overlap(monster, weaponStar, hitMonster, null, this);
      var monsterTwoStar = game.physics.arcade.overlap(monsterTwo, weaponStar, hitMonsterTwo, null, this);


      //  Reset the players velocity (movement)
      player.body.velocity.x = 0;
      game.time.events.add(Phaser.Timer.SECOND * 3, moveRight, this);
      game.time.events.add(Phaser.Timer.SECOND * 3, moveLeft, this);

      // KEY Control
      var cursors = game.input.keyboard.createCursorKeys();
      spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      // Control
      if(cursors.left.isDown){
        player.body.velocity.x = -200;
        player.animations.play('left');
        //weaponStar.angle = 180;
      }
      else if (cursors.right.isDown){
        player.body.velocity.x = 200;
        player.animations.play('right');
        //weaponStar.angle = 0;
      }
      else{
        player.animations.stop();
        //player.frame = 2;
      }
      // Jump
      if (cursors.up.isDown && player.body.touching.down && hitPlatform)
      {
          //tutorialThree.destroy();
          player.body.velocity.y = -200;
      }

      // Player space key
      if(spaceKey.isDown){
        if(score>0)
        	//game.time.events.add(Phaser.Timer.SECOND * 3, fireStar, this);
          fireStar();
      }

      if(bothMonsterDead)
      {
        showDiamond();
      }

      if(score>=1000)
      {
        winGame();
      }
    },
  }
};
