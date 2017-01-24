var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

//Adding each state and defining them
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

//Then we start the first state which is boot.
game.state.start('boot');
