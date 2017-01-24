var loadState = {
  preload: function() {
    //Add a loading label on the screen
    var loadingLabel = game.add.text(80, 150, 'Loading the game',
      	{font: '30px Courier', fill: '#ffffff'});

    //Load all the assets, the first param points to the image.
    game.load.image('sky', 'images/sky.png');
    game.load.image('ground', 'images/platform.png');
    game.load.image('star', 'images/star.png');
    game.load.image('phaser', 'images/phaser.png');
    game.load.image('firstaid', 'images/firstaid.png');
    game.load.spritesheet('dude', 'images/dude.png', 32, 48);

    
  },

  create: function() {
  	//Change the state to menu state.
  	game.state.start('menu');
  }
}