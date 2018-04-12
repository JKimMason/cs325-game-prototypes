"use strict";

BasicGame.Game = function (game) {
  var bullets=null;
  var bullet=null;
  var nextFire=0;
  var fireRate = 600;
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
  var armorSound=null;
  var healthSound=null;
  var stabSound=null;
  var newBulletSound=null;
  var upgradeSound=null;
  var boomSound=null;
  var bulletHitSoundTwo=null;
  var robotBulletSound=null;
  var robotShotPlayerSound=null;

  // Stats:
  var armorLevel = 0;
  var armorTotal=100;
  var healthLevel = 0;
  var healthTotal=100;
  var timeLevel=null;

  // Weapon stat:
  let pistol=1500;
  let machineGun=10;
  // Collision
  var healthPackPlayer=null;
  var armorPackPlayer=null;
  var upgradePackPlayer=null;
  var enemyBulletPlayer=null;
  var targetPlayer=null;
  var enemiesPlayer=null;
  var enemiesBulletPlayer=null;

  // Spawn
  var healthPackSpawn=null;
  var healthPack=null;
  var armorPackSpawn=null;
  var armorPack=null;
  var upgradePack=null;
  var upgradePackSpawn=null;

  // Map
  var map=null;
  var layer=null;
  var Over = null;
  var Fringe = null;
  var Ground= null;
  var width =100;

  // enemies
  var enemies=null;
  var eWeapon=null;
  var enemy = null
  var enemyTotal = null;
  var enemyAlive = null;
  var enemiesHP = null;
  var explosion=null;

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
  }

  function randSpawnHealth(){
    healthPack.create(Math.random()*600, Math.random()*500, 'healthPack');
  }

  function collectHealth(player, healthPack){
    game.time.events.add(Phaser.Timer.SECOND *3, randSpawnHealth, this);
    healthSound.play();
    healthPack.kill();
    if(healthLevel<healthTotal)
      healthLevel+=25;
    else if(healthLevel==healthTotal)
      healthLevel+=5;
  }

  function spawnArmor(){
    armorPackSpawn = armorPack.create(450,400,'armorPack');
  }

  function randSpawnArmor(){
    armorPack.create(Math.random()*600, Math.random()*500, 'armorPack');
  }

  function spawnUpgrade(){
    upgradePack = upgradePack.create(500,400,'upgradePack');
  }

  function collectUpgrade(upgradePack, player){
    upgradeSound.play();
    upgradePack.kill();
    bulletSound = newBulletSound;
    weapon.bulletSpeed = 2000;
    weapon.fireRate = machineGun;
    bulletHitSound = bulletHitSoundTwo;
  }

  function collectArmor(player, armorPack){
    game.time.events.add(Phaser.Timer.SECOND *3, randSpawnArmor, this);
    armorSound.play();
    armorPack.kill();
    if(armorLevel==armorTotal)
      armorLevel+=0;
    else if(armorLevel>=50 && armorLevel<100)
      armorLevel=100;

    else if(armorLevel<50)
      armorLevel+=50;
  }

  function shootEnemies(enemies){
    if(enemiesHP==100){
      enemiesHP-=25;
      bulletHitSound.play();
    }
    else if(enemiesHP!=25 && enemiesHP%25==0){
      enemiesHP-=25;
      bulletHitSound.play();
    }
    else if(enemiesHP==25){
      enemiesHP-=25;
      bulletHitSound.play();

      enemies.kill();  
      explosion = game.add.sprite(enemies.body.x, enemies.body.y, 'explosion');
      explosion.animations.add('death', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 30, false);
      
      boomSound.play();
      if(explosion.animations.play('death').isFinished){
        explosion.isPlaying=false;
        explosion.kill();
      }
      targetPoint+=1;
      enemiesSpawn();
    }
  }

  function instantDeath(player, enemies){
      player.kill();
      stabSound.play();
      music.stop();
      game.state.start('GameOver');
  }


  function loseHP(player, enemies){
    var diff=0;
    if(armorLevel>=30)
    {
      armorLevel-=30;
    }
    else if(armorLevel==30)
    {
      armorLevel=0;
    }
    else if(armorLevel<30)
    {
      diff=30-armorLevel;
      armorLevel=0;
      if(healthLevel>30){
        healthLevel-=30;
      }
      else if(healthLevel<=30){
        healthLevel==0;
      }
    }

    if(healthLevel<=30)
    {
      player.kill();
      stabSound.play();
      music.stop();
      game.state.start('GameOver');
    }
  }

  function enemiesSpawn(){
    enemies = game.add.sprite(-20, Math.random()*500, 'enemies');
    enemies.enableBody=true;
    game.physics.enable(enemies, Phaser.Physics.ARCADE);
    enemies.body.setSize(38,65,10,-3);
    enemiesHP=100;
    enemies.animations.add('right', [35,34,33,32,31,30,29,28,27], 15, true);
    enemies.animations.add('left', [44,43,42,41,40,39,38,37], 15, true);
    enemies.animations.add('up', [9,10,11,12,13,14,15,16,17], 15, true);
    enemies.animations.add('down', [55,56,57,58,59,60,61,62,63], 15, true);
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
      //land.fixedToCamera = true;

      // Music
      music = game.add.audio('gameMusic');
      music.play();
      music.volume = 0.5;
      // Sound
      bulletSound = game.add.audio('bulletFired');
      bulletSound.volume = 0.2;
      newBulletSound = game.add.audio('fastBullet');
      bulletSound.volumn = 0.3;
      bulletHitSound = game.add.audio('bulletHitTwo');
      bulletHitSound.volume = 0.4;
      bulletHitSoundTwo = game.add.audio('bulletHit');
      bulletHitSoundTwo.volume = 0.3;
      armorSound = game.add.audio('wearArmor');
      armorSound.volume = 0.3;
      healthSound = game.add.audio('wearHealth');
      healthSound.volume = 0.6;
      stabSound = game.add.audio('stab');
      stabSound.volumn = 0.4;
      upgradeSound = game.add.audio('upgradeSound');
      upgradeSound.volume=0.4;
      boomSound = game.add.audio('boom');
      boomSound.volume=0.5;
      robotBulletSound = game.add.audio('robotBullet');
      robotBulletSound.volume=0.3;
      robotShotPlayerSound = game.add.audio('bulletToPlayer');
      robotShotPlayerSound.volume=0.4;

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

      // Enemies
      enemies = game.add.sprite(0, Math.random()*500, 'enemies');
      game.physics.enable(enemies, Phaser.Physics.ARCADE);
      // enemies.body.drag.set(0.2);
      // enemies.body.maxVelocity.setTo(200,200);
      // enemies.body.collideWorldBounds = true;
      enemies.body.setSize(38,65,10,-3);
      enemiesHP=100;
      enemies.animations.add('right', [35,34,33,32,31,30,29,28,27], 15, true);
      enemies.animations.add('left', [44,43,42,41,40,39,38,37], 15, true);
      enemies.animations.add('up', [9,10,11,12,13,14,15,16,17], 15, true);
      enemies.animations.add('down', [55,56,57,58,59,60,61,62,63], 15, true);

      // Enemies bullet:
      eWeapon = game.add.weapon(30, 'bullet');
      eWeapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      eWeapon.bulletSpeed = 1000;
      eWeapon.fireRate = 100;
      eWeapon.bulletAngleVariance=4;
      eWeapon.trackSprite(enemies, 20, 20);

      // Weapon
      weapon = game.add.weapon(30, 'bullet');
      weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      weapon.bulletSpeed = 1200;
      weapon.fireRate = pistol;
      weapon.bulletAngleVariance=2;
      weapon.trackSprite(player, 20, 20);

      targetPoint=0;
      targetPointTotal=50;

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
      upgradePack = game.add.group();
      upgradePack.enableBody= true;

      spawnHealth();
      spawnArmor();
      spawnUpgrade();
    
      // Camera
      game.camera.follow(player);
    },

    // Debug
    render: function(){
      //game.debug.bodyInfo(player, 32, 400); 
      //game.debug.body(target);
      //game.debug.body(player);
      //game.debug.bodyInfo(enemies, 32, 200);
      game.debug.text('Health: ' + healthLevel + '/' + healthTotal, 30, 30);
      game.debug.text('Armor:  ' + armorLevel + '/' + armorTotal, 30, 50);
      game.debug.text('Enemies: ' + targetPoint + '/' + targetPointTotal, 30, 70);
      game.debug.text('Shoot the enemies!', 330, 20);
      game.debug.text('Arrow keys to move', 335, 480);
      game.debug.text('Space to shoot', 350, 500);
      game.debug.text('Time: ' + timeLevel, 694, 20);
    },

    update: function () {
      // Interaction:
      healthPackPlayer = game.physics.arcade.collide(healthPack, player, collectHealth, null, this);
      armorPackPlayer = game.physics.arcade.collide(armorPack, player, collectArmor, null, this);
      upgradePackPlayer = game.physics.arcade.collide(upgradePack, player, collectUpgrade, null, this);
      enemiesPlayer = game.physics.arcade.collide(enemies, player, instantDeath, null, this);
      enemiesBulletPlayer = game.physics.arcade.collide(enemies, player, loseHP, null, this);
      targetPlayer = game.physics.arcade.overlap(weapon.bullets, enemies, shootEnemies, null, this);

       //Stat:
      timeLevel = this.game.time.totalElapsedSeconds();

      //  Reset the player's velocity/movement
      player.body.velocity.x=0;
      player.body.velocity.y=0;

      // ENemies movement:
      var angle = game.physics.arcade.moveToObject(enemies, player, 1000, 5000);
      var playerAngle = player.body.angle;

      if(player.body.x>enemies.body.x){
        enemies.animations.play('right');
      }
      else if(player.body.x<enemies.body.x){
        enemies.animations.play('left');
      }


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

      if(enemies.body.y==player.body.y){
        eWeapon.fire();
      }

      // Space key
      if(spaceKey.isDown&&!bulletSound.isPlaying){
          weapon.fire();
          bulletSound.play();
      }

      // Enemies fire
      if((Math.abs(player.body.y-enemies.body.y)<50)){
        eWeapon.trackSprite(enemies, 20, 20);
        if(!robotBulletSound.isPlaying){
          eWeapon.fireAngle = Phaser.ANGLE_RIGHT;
          eWeapon.fire();
          robotBulletSound.play();
        }
      }


      //Winner
      if(targetPoint==50)
      {
        winGame();
      }
    },
  }
};