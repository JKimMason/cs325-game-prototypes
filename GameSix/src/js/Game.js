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
  var music=null;
  var x=null;
  var y=null;
  var weapon = null;
  var enemies=[];
  var explosions;
  var deathPool;
  var enemyBullets=null;

  // Stats:
  var armorLevel = 0;
  var armorTotal=100;
  var healthLevel = 0;
  var healthTotal=100;
  var enemiesTotal = 0;
  var enemiesAlive = 0;

  // Weapon stat:
  let pistol=800;
  let machineGun=500;
  let sniper=1000;

  // Collision
  var healthPackPlayer=null;
  var armorPackPlayer=null;
  var enemyBulletPlayer=null;

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

  function killPlayer(){
    player.kill();
    music.stop();
    game.state.start('GameOver');
  }

  function upgradeGunToMachineGun(){
    weapon.fireRate = machineGun;
  }

  function spawnHealth(){
    healthPackSpawn = healthPack.create(50,50,'healthPack');
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
    armorPackSpawn = armorPack.create(80,80,'armorPack');
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

  function weaponUpgrade(){

  }


  return {
    create: function () {
      // Set world
      game.physics.startSystem(Phaser.Physics.ARCADE);
      game.world.setBounds(-1000, -1000, 2000, 2000);
      // FPS
      game.time.desiredFps = 60;
      // Map
      gamePageBackground = game.add.sprite(0, 0, 'gameBG');
      land = game.add.tileSprite(0, 0, 800, 600, 'earth');
      land.fixedToCamera = true;

      // Music
      music = game.add.audio('gameMusic');

      //music.play();
      music.volume = 0.5;

      // Player
      player = game.add.sprite(0, 0, 'player');
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
      // Enemies
      for (var i = 0; i < enemiesTotal; i++)
      {
        enemies.push(new EnemyTank(i, game, tank, enemyBullets));
      }
      deathPool = game.add.group();
      // Death enemies
      for(var i=0; i<10;i++)
      {
        var explosionAnimation = deathPool.create(0, 0, 'dead', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('dead');
      }
      // Enemies bullet
      enemyBullets = game.add.group();
      enemyBullets.enableBody = true;
      enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
      enemyBullets.createMultiple(100, 'bullet');
      enemyBullets.setAll('anchor.x', 0.5);
      enemyBullets.setAll('anchor.y', 0.5);
      enemyBullets.setAll('outOfBoundsKill', true);
      enemyBullets.setAll('checkWorldBounds', true);

      //STAT:
        // Enemies
      enemiesTotal = 50;
      enemiesAlive = 50;
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
      //game.debug.bodyInfo(player, 32,80);
      //game.debug.body(player);
      game.debug.text('Health: ' + healthLevel + '/' + healthTotal, 30, 30);
      game.debug.text('Armor:  ' + armorLevel + '/' + armorTotal, 30, 50);
      game.debug.text('Enemies: ' + enemiesAlive + '/' + enemiesTotal, 30, 70);
    },

    update: function () {
      // Interaction:
      healthPackPlayer = game.physics.arcade.collide(healthPack, player, collectHealth, null, this);
      armorPackPlayer = game.physics.arcade.collide(armorPack, player, collectArmor, null, this);
 

      //  Reset the players velocity (movement)
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
      if(spaceKey.isDown){
          weapon.fire();
      }

      // if (this.game.physics.arcade.distanceBetween(this.enemies, this.player) < 300)
      // {
      //     if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
      //     {
      //         this.nextFire = this.game.time.now + this.fireRate;

      //         var bullet = this.bullets.getFirstDead();

      //         bullet.reset(this.enemies.x, this.enemies.y);

      //         bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
      //     }
      // }

      // Winner
      // if(score>=1000)
      // {
      //   winGame();
      // }
    },
  }
};
