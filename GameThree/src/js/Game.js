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
  var music=null;

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
    scoreText.text = 'Stars: ' + score;
    tutorialTwo.destroy();
  }

  function collectDiamond(player, diamond){
    diamond.kill();
      //  Add and update the score
    score += 10;
    scoreText.text = 'Diamond: ' + score + ' points!';
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

  return {
    create: function () {
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
      var ground = platforms.create(0, 605, 'ground');
      ground.scale.setTo(2, 2);
      ground.body.immovable = true;

      //  Now let's create two ledges
      var ledge = platforms.create(400, 400, 'ground');
      ledge.body.immovable = true;
      ledge = platforms.create(-100, 580, 'ground');
      ledge.body.immovable = true;
      ledge = platforms.create(-120, 550, 'ground');
      ledge.body.immovable = true;
      ledge = platforms.create(350, 400, 'ground');
      ledge.body.immovable = true;
      ledge = platforms.create(-200, 500, 'ground');
      ledge.body.immovable = true;

      // Music
      music = game.add.audio('gameMusic');
      music.play();
      // Player
      player = game.add.sprite( game.world.centerX, game.world.centerY, 'playerAdd');
      game.physics.enable(player, Phaser.Physics.ARCADE);
      player.body.gravity.y = 300;
        // Animation movements
      player.animations.add('right', [6,7,8,9,10,11],15, true);
      player.animations.add('left', [18,19,20,21,22,23],15, true);
      jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      // Monster
      monster = game.add.sprite(100, 300, 'monsterAdd');
      game.physics.enable(monster, Phaser.Physics.ARCADE);
      monster.body.gravity.y = 400;
      monster.animations.add('right', [7,8,9,10,11,12,13],15, true);
      monster.animations.add('left', [14,15,16,17,18,19,20],15, true);
      monster.animations.add('death', [44,45,46,47,48,49,50,51,52,53,54,55],15,true);

      // Random star spawn
      stars = game.add.group();
      stars.enableBody = true;
      for(var i=0; i<10; i++){
        var star = stars.create(Math.random()*700,100,'star');
        star.body.gravity.y = 200;
        star.body.bounce.y = Math.random()*0.2;
      }

      // Diamond
      diamonds = game.add.group();
      diamonds.enableBody = true;
      var diamond = diamonds.create(Math.random()*700,100,'diamond');
      diamond.body.gravity.y = 200;
      diamond.body.bounce.y = Math.random()*0.2;

      // Text
      score = 0;
      scoreTextStyle = { font: "25px Verdana", fill: "#F5FF33", align: "center" };
      scoreText = game.add.text(player.position.x-400, player.position.y-400, 'Stars: 0' , scoreTextStyle );
      scoreText.fixedToCamera = true;
      tutorialTextStyle = { font: "25px Verdana", fill: "#666666", align: "center" };
      tutorial = game.add.text(280, 500, "Use the arrow keys!", tutorialTextStyle );
      tutorialTwo = game.add.text(280,200, "Collect the stars!", tutorialTextStyle);
      tutorialThree = game.add.text(270,100, "Avoid space zombies!", tutorialTextStyle);
      tutorial.fixedToCamera = true;
      tutorialTwo.fixedToCamera = true;
      tutorialThree.fixedToCamera = true;
      game.input.onDown.addOnce(tutorialDestroyText, this);
      game.input.onDown.addOnce(tutorialTwoDestroyText, this);
      game.input.onDown.addOnce(tutorialThreeDestroyText, this);

      // Make it bounce off of the world bounds.
      player.body.collideWorldBounds = true;
      // Enables camera to follow player.
      game.camera.follow(player);
    },

    update: function () {
      //event.preventDefault();
      // window.addEventListener("keydown", function(e) {
      //   // space and arrow keys
      //   if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      //     e.preventDefault();
      //   }
      // }, false);
      var starPhysics = game.physics.arcade.collide(stars, platforms);
      var starPlayer = game.physics.arcade.overlap(player, stars, collectStar, null, this);
      var diamondPhysics = game.physics.arcade.collide(diamonds, platforms);
      var diamondPlayer = game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);
      var monsterPlayer = game.physics.arcade.overlap(player, monster, killPlayer, null, this);
      var hitPlatform = game.physics.arcade.collide(player, platforms);
      var monsterPlatform = game.physics.arcade.collide(monster, platforms);
      var cursors = game.input.keyboard.createCursorKeys();
      //  Reset the players velocity (movement)
      player.body.velocity.x = 0;
      // Control
      if(cursors.left.isDown){
        player.body.velocity.x = -200;
        player.animations.play('left');
        tutorial.destroy();
      }
      else if (cursors.right.isDown){
        player.body.velocity.x = 200;
        player.animations.play('right');
      }
      else{
        player.animations.stop();
        player.frame = 2;
      }
      // Jump 
      if (cursors.up.isDown && player.body.touching.down && hitPlatform)
      {
          tutorialThree.destroy();
          player.body.velocity.y = -250;
      }

      var randomX = Math.random()*150;
      var randomY = Math.random()*150;

      if(score>=10)
      {
        winGame();
      }
    },
  }
};
