var LastRide = LastRide || {};

LastRide.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'gameDiv');

//Adding each state and defining them
LastRide.game.state.add('boot', LastRide.bootState);
LastRide.game.state.add('load', LastRide.loadState);
LastRide.game.state.add('menu', LastRide.menuState);
LastRide.game.state.add('play', LastRide.playState);
LastRide.game.state.add('win', LastRide.winState);

//Then we start the first state which is boot.
LastRide.game.state.start('boot');
