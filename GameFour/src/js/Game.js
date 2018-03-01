"use strict";

BasicGame.Game = function (game) {
  var attack = null;
  var createHP=null;
  var createKFC=null;
  var createMCD=null;
  var createMonster=null;
  var diamonds= null;
  var gamePageBackground = null;
  var hp=null;
  var jumpTimer = 0;
  var kfc=null;
  var layer = null;
  var map=null;
  var mcdonald=null;
  var monster=null;
  var monsterTwo=null;
  var monsterGroup=null;
  var music=null;
  var numOfKFC=null;
  var numOfMCD = null;
  var numOfKFCText=null;
  var numOfMCDText = null;
  var numOfPlayerHPText = null;
  var numOfZombieHPText = null; 
  var prevPosY = null;
  var prevPosX = null;
  var playerAlive=null;
  var pHP=10;
  var playerTutorial=null;
  var platforms = null;
  var player=null;
  var randomSpawnPicker=null;
  var throwButton=null;
  var tutorialTextStyle=null;
  var tutorialMovement = null;
  var tutorialZombie=null;
  var tutorialKFC=null;
  var tutorialHP=null;
  var tutorialMCD=null;
  var tutorialGoal=null;
  var tutorialPickHP=null;
  var scoreTextStyle= null;
  var stars = null;
  var x=null;
  var y=null;
  var zombieHP=10;

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

  function collectKFC(player, kfc){
    numOfKFC += 1;
    numOfKFCText.text = 'KFC: ' + numOfKFC;
    kfc.kill();
  }

  function collectMCD(player, mcd){
    numOfMCD +=1;
    numOfMCDText.text = 'MCD: ' + numOfMCD;
    mcd.kill();
  }

  function healPlayer(player, hp){
    pHP +=5;
    numOfPlayerHPText.text = 'Player HP: ' + pHP;
    hp.kill();
  }

  function updatePlayerHP(){
    pHP -= 5;
    numOfPlayerHPText.text = 'Player HP: ' + pHP;
  }

  function updateZombieHP(){
    zombieHP-=5;
    numOfZombieHPText.text = 'Zombie HP: ' + zombieHP;
  }

  function youArePlayerTutorial(){
    playerTutorial = game.add.text(280, 300, "You are the player", tutorialTextStyle)
  }

  function initKFCCount(){
    numOfKFCText = game.add.text(player.position.x-390, player.position.y-405, 'KFC:  0' , scoreTextStyle );
    numOfKFCText.fixedToCamera = true;  
  }

  function initMCDCount(){
    numOfMCDText = game.add.text(player.position.x-390, player.position.y-380, 'MCD: 0' , scoreTextStyle );
    numOfMCDText.fixedToCamera = true;
  }

  function initPlayerHP(){
    numOfPlayerHPText = game.add.text(player.position.x+217, player.position.y-405, 'Player HP:  10' , scoreTextStyle );
    numOfPlayerHPText.fixedToCamera = true;
  }

  function initZombieHP(){
    numOfZombieHPText = game.add.text(player.position.x+209, player.position.y-380, 'Zombie HP: 10' , scoreTextStyle );
    numOfZombieHPText.fixedToCamera = true;
  }

  // TUTORIALS
  function showMovementTutorial(){
    tutorialMovement = game.add.text(280, 500, "Use the arrow keys!", tutorialTextStyle );
    tutorialMovement.fixedToCamera = true;
  }

  function showZombieTutorial(){
    tutorialZombie = game.add.text(280,100, "Avoid space zombie!", tutorialTextStyle);
    tutorialZombie.fixedToCamera = true;
  }

  function showZombieDamageTutorial(){
    tutorialDamageZombie = game.add.text(280,100, "He hits with 5HP!!", tutorialTextStyle);
    tutorialDamageZombie.fixedToCamera = true;
  }

  function showKFCTutorial(){
    tutorialKFC = game.add.text(250,100, "Run the zombie into the KFC!", tutorialTextStyle);
    tutorialKFC.fixedToCamera = true;
  }

  function showHPTutorial(){
    tutorialHP = game.add.text(280,100, "You start with 10HP", tutorialTextStyle);
    tutorialHP.fixedToCamera = true;
  }

  function showMCDTutorial(){
    tutorialMCD = game.add.text(250,100, "Collect MCD to gain points", tutorialTextStyle);
    tutorialMCD.fixedToCamera = true;
  }

  function showHPPickupTutorial(){
    tutorialPickHP = game.add.text(250,100, "Collect Health to re-gain HP", tutorialTextStyle);
    tutorialPickHP.fixedToCamera = true;
  }

  function showGoal(){
    tutorialGoal = game.add.text(150,100, "Collect 10 MCD, or kill the zombie to win!", tutorialTextStyle);
    tutorialGoal.fixedToCamera = true;
  }

  function tutorialPlayerDestroyText(){
    playerTutorial.destroy();
  }

  function tutorialMovementDestroyText(){
    tutorialMovement.destroy();
  }

  function tutorialZombieDestroyText(){
    tutorialZombie.destroy();
  }

  function tutorialZombieDamageDestroyText(){
    tutorialDamageZombie.destroy();
  }
  
  function tutorialKFCDestroyText(){
    tutorialKFC.destroy();
  }

  function tutorialHPPickupTutorial(){
    tutorialPickHP.destroy();
  }

  function tutorialHPDestroyText(){
    tutorialHP.destroy();
  }

  function tutorialMCDDestroyText(){
    tutorialMCD.destroy();
  }

  function tutorialGoalDestroyText(){
    tutorialGoal.destroy();
  }

  function killZombie(){
    monster.animations.play('death');
    monster.kill();
  }

  function freezePlayer(){
    player.animations.stop();
  }

  function zombieAttack(player, monster){
    if(pHP>5)
    {
      updatePlayerHP();
    }
    else if(pHP<=5)
    {
      updatePlayerHP();
      eatPlayer();
    }
  }


  function eatPlayer(){
    player.animations.stop();

    if(player.position.x-monster.position.x>0){
      monster.animations.play('rightattack');
    }
    else if(player.position.x-monster.position.x<0)
      monster.animations.play('leftattack');
    
    if(pHP<=0){
      playerAlive=0;
      player.kill();
      music.stop();
      monster.animations.stop(); 

      game.state.start('GameOver');
    }
  }

  function zombieHPDead(){
    if(zombieHP<=0){
      monster.animations.stop();
      monster.animations.play("death");
      monster.kill();
      game.state.start("Win");
    }
  }

  function isPlayerAlive(){
    if(playerAlive==1){
      zombieMove();
    }
    else
    {
      monster.animations.stop();
      killZombie();
      game.state.start('GameOver');
    }
  }

  function foodSpawn(){
    randomSpawnPicker = game.rnd.integerInRange(0, 100);
    x = game.rnd.integerInRange(50,750);
    y = game.rnd.integerInRange(50,750);
    if(randomSpawnPicker>=0 && randomSpawnPicker<50)
      createKFC = kfc.create(x,y, 'kfc');
    else
      createMCD = mcdonald.create(x,y, 'mcdonald');
  }

  function HPSpawn(){
    x = game.rnd.integerInRange(50,750);
    y = game.rnd.integerInRange(50,750);
    createHP = hp.create(x,y, 'hp');
  }

  function throwKFC(){
    if(numOfKFC>0)
    {
      //kfc.fire();
      //kfc.create(player.position.x, player.position.y, 'kfc');
      //kfc.body.velocity.x=+200;
      var kfcWeapon = kfc.create(x,y,'kfc');
      kfcWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      kfcWeapon.bulletSpeed=200;
      kfcWeapon.fireRate=80;
      kfcWeapon.fire();
      numOfKFC-=1;
    }
  }

  function zombieMove(){
    game.physics.arcade.moveToObject(monster, player, 1, 5000);

    if((player.position.y-monster.position.y)<0 &&
      (player.position.y-monster.position.y)<-60 &&
      player.position.x-monster.position.x<60)
    {
      monster.animations.play('up');
    }
    else if((player.position.y-monster.position.y)>0 &&
      (player.position.y-monster.position.y)>100 &&
      player.position.x-monster.position.x<60)
    {
      monster.animations.play('down');
    }
    else if((player.position.y-monster.position.y)<60 &&
      player.position.x-monster.position.x>0)
    {
      monster.animations.play('right');
    }
    else if((player.position.y-monster.position.y)<60 &&
      player.position.x-monster.position.x<0)
    {
      monster.animations.play('left');
    }
  }

  function enemyHit(monster, kfc){
    updateZombieHP();
    kfc.kill();
    if(zombieHP<=0)
      zombieHPDead();
  }

  return {
    create: function(){
      // Start timer
      game.time.events.loop(Phaser.Timer.SECOND / (1/5), foodSpawn, this);
      game.time.events.loop(Phaser.Timer.SECOND / (1/8), HPSpawn, this);
      // Set world
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.world.setBounds(0, 0, 800, 800);
      // FPS
      game.time.desiredFps = 60;
      // Map
      gamePageBackground = game.add.sprite(0, 0, 'gameBG');

      // Music
      music = game.add.audio('gameMusic');
      music.play();
      // Player
      player = game.add.sprite( game.world.centerX, game.world.centerY, 'playerAdd');
      game.physics.enable(player, Phaser.Physics.ARCADE);
      playerAlive=1;
        // Animation movements
      player.animations.add('right', [6,7,8,9,10,11],15, true);
      player.animations.add('left', [18,19,20,21,22,23],15, true);
      player.animations.add('down', [0,1,2,3,4,5], 15, true);
      player.animations.add('up', [12,13,14,15,16,17], 15, true);
        // Re-sizing player's hitbox
      player.body.setSize(50,70,22,12);

      // Throw action
      //throwButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      // Monster
        // Add
      monster = game.add.sprite(100, 400, 'monsterAdd');
        // Enable physics
      game.physics.enable(monster, Phaser.Physics.ARCADE);
        // Re-size hitbox
      monster.body.setSize(28,55,22,3);
        // Animations
      monster.animations.add('down', [0,1,2,3,4,4,3,2,1,0],10, true);
      monster.animations.add('up', [21,22,23,24,25,26],10,true);
      monster.animations.add('right', [7,8,9,10,11,12,13],10,true);
      monster.animations.add('left', [14,15,16,17,18,19,20], 10, true);
      monster.animations.add('rightattack', [32,33,34,35], 10,true);
      monster.animations.add('leftattack', [36,37,38,39], 10, true);
      monster.animations.add('death', [43,44,45,46,47,48,49,50,51,52,53,54,55],10,true);

      // KFC
      kfc= game.add.group();
      kfc.enableBody = true;
      x = game.rnd.integerInRange(50, 750);
      y = game.rnd.integerInRange(50, 750);
      createKFC = kfc.create(x,y, 'kfc');

      // MCD
      mcdonald = game.add.group();
      mcdonald.enableBody = true;
      x = game.rnd.integerInRange(50, 750);
      y = game.rnd.integerInRange(50, 750);
      createMCD= mcdonald.create(x,y, 'mcdonald');

      hp = game.add.group();
      hp.enableBody=true;

      // Text
      scoreTextStyle = {font: "25px Verdana", fill: "#F5FF33", align: "center"};
      tutorialTextStyle = {font: "25px Verdana", fill: "#666666", align: "center"};
        // Initialize texts
      initPlayerHP();
      initZombieHP();
      initKFCCount();
      initMCDCount();
      //numOfPlayerHPText.fixedToCamera = true;
      //numOfZombieHPText.fixedToCamera = true;    
      game.time.events.add(Phaser.Timer.SECOND * 1, youArePlayerTutorial, this);
      game.time.events.add(Phaser.Timer.SECOND * 1, showMovementTutorial, this);
      game.time.events.add(Phaser.Timer.SECOND * 3, showZombieTutorial, this);
      game.time.events.add(Phaser.Timer.SECOND * 5, showKFCTutorial, this);
      game.time.events.add(Phaser.Timer.SECOND * 7, showHPTutorial, this);
      game.time.events.add(Phaser.Timer.SECOND * 9, showHPPickupTutorial, this);
      game.time.events.add(Phaser.Timer.SECOND * 11, showMCDTutorial, this);
      game.time.events.add(Phaser.Timer.SECOND * 13, showGoal, this);

      // Alter when to show tutorial

      // Make it bounce off of the world bounds.
      player.body.collideWorldBounds = true;
      monster.body.collideWorldBounds = true;

      // Enables camera to follow player.
      game.camera.follow(player);
    },

    // Debug
    render: function(){
      //game.debug.bodyInfo(monster, 32, 200);
      //game.debug.bodyInfo(player, 32,80);
      //game.debug.body(player);
      //game.debug.body(monster);
    },

    // Update
    update: function () {
      // Physics collision updates
      var KFCPlayer = game.physics.arcade.overlap(player, kfc, collectKFC, null, this);
      var MCDPlayer = game.physics.arcade.overlap(player, mcdonald, collectMCD, null, this);
      var monsterPlayer = game.physics.arcade.overlap(player, monster, zombieAttack, null, this);
      var HPItemPlayer = game.physics.arcade.overlap(player, hp, healPlayer, null, this);
      var monsterKFC = game.physics.arcade.overlap(kfc, monster, enemyHit, null, this);

      // Controls
      var cursors = game.input.keyboard.createCursorKeys();
      //var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      // Tutorial delete
      game.time.events.add(Phaser.Timer.SECOND * 3, tutorialPlayerDestroyText, this);
      game.time.events.add(Phaser.Timer.SECOND * 3, tutorialMovementDestroyText, this);
      game.time.events.add(Phaser.Timer.SECOND * 5, tutorialZombieDestroyText, this);
      game.time.events.add(Phaser.Timer.SECOND * 7, tutorialKFCDestroyText, this);
      game.time.events.add(Phaser.Timer.SECOND * 9, tutorialHPDestroyText, this);
      game.time.events.add(Phaser.Timer.SECOND * 9, tutorialHPPickupTutorial, this);
      game.time.events.add(Phaser.Timer.SECOND * 13, tutorialMCDDestroyText, this);
      game.time.events.add(Phaser.Timer.SECOND * 15, tutorialGoalDestroyText, this);

      // Player Control
      if(cursors.left.isDown){
        player.x -=3;
        player.animations.play('left');
      }
      else if (cursors.right.isDown){
        player.x +=3;
        player.animations.play('right');
      }
      else if(cursors.up.isDown){
        player.y -=3;
        player.animations.play('up');
      }
      else if(cursors.down.isDown){
        player.y +=3;
        player.animations.play('down');
      }
      else{
        player.animations.stop();
      }

      // // Player space key
      // if(spaceKey.isDown){
      //   throwKFC();
      // }else{
      // }

      isPlayerAlive();

      // Win
      if(numOfMCD>=10)
      {
        game.time.events.stop();
        winGame();
      }
    },
  }
};
