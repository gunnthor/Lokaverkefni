var LastRide = LastRide || {};

LastRide.game = new Phaser.Game(1280, 600, Phaser.AUTO, 'gameDiv');

//Adding each state and defining them
LastRide.game.state.add('boot', LastRide.boot);
LastRide.game.state.add('load', LastRide.load);
LastRide.game.state.add('menu', LastRide.menu);
LastRide.game.state.add('select', LastRide.select);
LastRide.game.state.add('editor', LastRide.editor);
LastRide.game.state.add('play', LastRide.play);
LastRide.game.state.add('win', LastRide.win);

//Then we start the first state which is boot.
LastRide.game.state.start('boot');
