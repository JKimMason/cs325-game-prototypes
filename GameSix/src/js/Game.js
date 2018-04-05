"use strict";

BasicGame.Game = function (game) {
  var bullets=null;
  var bullet=null;
  var nextFire=0;
  var fireRate = 1000;
  var land=null;
  var gun=null;
  var player=null;
  var gamePageBackground = null;
  var fire=false;
  var map=null;
  var x=null;
  var y=null;
  var weapon = null;
  var explosions=null;
  var deathPool=null;
  var enemyBullets=null; 
  var target=null;
  var targets=null;
  var targetPoint=null;
  var targetPointTotal=null;
  // Music
  var music=null;
  var bulletSound=null;
  var bulletHitSound=null;

  // Stats:
  var armorLevel = 0;
  var armorTotal=100;
  var healthLevel = 0;
  var healthTotal=100;
  var timeLevel=null;

  // Weapon stat:
  let pistol=1500;

  // Collision
  var healthPackPlayer=null;
  var armorPackPlayer=null;
  var enemyBulletPlayer=null;
  var targetPlayer=null;

  // Spawn
  var healthPackSpawn=null;
  var healthPack=null;
  var armorPackSpawn=null;
  var armorPack=null;

  function quitGame(){
    music.stop();
    game.state.start('Menu');
  }

  function winGame(){
    music.stop();
    game.state.start('Win');
  }

  function spawnHealth(){
    healthPackSpawn = healthPack.create(350,400,'healthPack');
    //healthPack.create(Math.random()*800, Math.random()*800, 'healthPack');
  }

  function collectHealth(player, healthPack){
    healthPack.kill();
    if(healthLevel<healthTotal)
      healthLevel+=25;
    else if(healthLevel==healthTotal)
      healthLevel+=5;
  }

  function spawnArmor(){
    armorPackSpawn = armorPack.create(450,400,'armorPack');
  }

  function collectArmor(player, armorPack){
    armorPack.kill();
    if(armorLevel==armorTotal)
      armorLevel+=0;
    else if(armorLevel>=50 && armorLevel<100)
      armorLevel=100;
    else if(armorLevel<50)
      armorLevel+=50;
  }

  function shootTarget(player){
    bulletHitSound.play();
    target.kill();
    targetPoint+=1;
    targetSpawn();
  }

  function targetSpawn(){
    target = game.add.sprite(Math.random()*800, 100, 'target');
    target.enableBody=true;
    game.physics.enable(target, Phaser.Physics.ARCADE);
  }

  return {
    create: function () {
      // Set world
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.world.setBounds(0,0,800,600);
      // FPS
      game.time.desiredFps = 60;
      // Map
      land = game.add.tileSprite(0, 0, 800, 600, 'earth');
      land.fixedToCamera = true;

      // Music
      music = game.add.audio('gameMusic');
      music.play();
      music.volume = 0.5;
      // Sound
      bulletSound = game.add.audio('bulletFired');
      bulletSound.volume = 0.2;
      bulletHitSound = game.add.audio('bulletHit');
      bulletSound.volume = 0.4;

      // Player
      player = game.add.sprite(400, 300, 'player');
      game.physics.enable(player, Phaser.Physics.ARCADE);
        // Re-sizing player's hitbox
      player.body.setSize(29,52,4,-3);
        // Make it bounce off of the world bounds.
      player.body.collideWorldBounds = true;
        // Enables camera to follow player.
      game.camera.follow(player);
        // Animation movements
      player.animations.add('right', [8,9,10,11], 15, true);
      player.animations.add('left', [4,5,6,7], 15, true);
      player.animations.add('up', [12,13,14,15], 15, true);
      player.animations.add('down', [0,1,2,3], 15, true);
      // Weapon
      weapon = game.add.weapon(30, 'bullet');
      weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      weapon.bulletSpeed = 1000;
      weapon.fireRate = pistol;
      weapon.bulletAngleVariance=2;
      weapon.trackSprite(player, 20, 20);

      target = game.add.sprite(200, 20, 'target');
      //targets = game.add.group();
      target.enableBody=true;
      game.physics.enable(target, Phaser.Physics.ARCADE);
      targetPoint=0;
      targetPointTotal=20;

      //STAT:
        // Health
      healthLevel = 100;
      healthTotal = 100;
      armorLevel = 0;
      armorTotal = 100;
      
      healthPack = game.add.group();
      healthPack.enableBody = true;
      armorPack = game.add.group();
      armorPack.enableBody = true;

      spawnHealth();
      spawnArmor();
    },

    // Debug
    render: function(){
      game.debug.text('Health: ' + healthLevel + '/' + healthTotal, 30, 30);
      game.debug.text('Armor:  ' + armorLevel + '/' + armorTotal, 30, 50);
      game.debug.text('Target: ' + targetPoint + '/' + targetPointTotal, 30, 70);
      game.debug.text('Shoot out the targets!', 330, 20);
      game.debug.text('Arrow keys to move', 335, 480);
      game.debug.text('Space to shoot', 350, 500);
      game.debug.text('Time: ' + timeLevel, 694, 20);
    },

    update: function () {
      // Interaction:
      healthPackPlayer = game.physics.arcade.collide(healthPack, player, collectHealth, null, this);
      armorPackPlayer = game.physics.arcade.collide(armorPack, player, collectArmor, null, this);
      targetPlayer = game.physics.arcade.overlap(weapon.bullets, target, shootTarget, null, this);
       //Stat:
      timeLevel = this.game.time.totalElapsedSeconds();
      //  Reset the player's velocity/movement
      player.body.velocity.x = 0;
      player.body.velocity.y=0;

      // KEY Control
      var cursors = game.input.keyboard.createCursorKeys();
      var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      // Control
      if(cursors.left.isDown){
        player.body.velocity.x = -200;
        weapon.fireAngle = Phaser.ANGLE_LEFT;
        player.animations.play('left');
      }
      else if (cursors.right.isDown){
        player.body.velocity.x = 200;
        weapon.fireAngle = Phaser.ANGLE_RIGHT;
        player.animations.play('right');
      }
      else if(cursors.down.isDown){
        player.body.velocity.y = 200;
        weapon.fireAngle = Phaser.ANGLE_DOWN;
        player.animations.play('down');
      }
      else if(cursors.up.isDown){
        player.body.velocity.y = -200;
        weapon.fireAngle = Phaser.ANGLE_UP;
        player.animations.play('up');
      }
      else{
        player.animations.stop();
      }

      // Space key
      if(spaceKey.isDown&&!bulletSound.isPlaying){
          weapon.fire();
          bulletSound.play();
      }

      //Winner
      if(targetPoint==1)
      {
        winGame();
      }
    },
  }
};
