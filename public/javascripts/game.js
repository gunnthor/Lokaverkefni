var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

//Adding each state and defining them
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

//Then we start the first state which is boot.
game.state.start('boot');


// function preload() {
//   game.load.image('sky', 'images/sky.png');
//   game.load.image('ground', 'images/platform.png');
//   game.load.image('star', 'images/star.png');
//   game.load.spritesheet('dude', 'images/dude.png', 32, 48);
// }

// function create() {
//   game.add.sprite(0,0, 'sky');
//   game.add.sprite(0, 580, 'ground');
//   var car = game.add.sprite(400, 300, 'star');
// }

// function update() {
//   //car.x +=1;
// }