"use strict";

var BasicGame = {};

BasicGame.Boot = function (game) {
    return {
        // init: function () {
        //     //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        //     game.input.maxPointers = 1;
        //     //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        //     game.stage.disableVisibilityChange = true;
        //     if (game.device.desktop)
        //     {
        //         //  If you have any desktop specific settings, they can go in here
        //         game.scale.pageAlignHorizontally = true;
        //     }
        //     else
        //     {
        //         //  Same goes for mobile settings.
        //         //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
        //         game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //         game.scale.setMinMax(480, 260, 1024, 768);
        //         game.scale.forceLandscape = true;
        //         game.scale.pageAlignHorizontally = true;
        //     }
        // },
        preload: function () {
            game.load.image('preloaderBar', 'assets/image/preloader/loading.png');
            game.load.image('preloaderBackground', 'assets/image/preloader/stars.jpg');
            game.load.image('logo', 'assets/image/preloader/logo.png');
            // Background
            game.load.image('titlePage', 'assets/image/background/mainBG.jpg');
        },

        create: function () {
            //  By this point the preloader assets have loaded to the cache, we've set the game settings
            //  So now let's start the real preloader going
            game.state.start('Preloader');
            
        }
    };
};
