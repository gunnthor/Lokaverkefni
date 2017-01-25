var LastRide = LastRide || {};

LastRide.loadState = function(){};

LastRide.loadState.prototype = {
  preload: function() {
    //Add a loading label on the screen
    var loadingLabel = this.game.add.text(80, 150, 'Loading the game',
      	{font: '30px Courier', fill: '#ffffff'});
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'diamond');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(5);
    this.load.setPreloadSprite(this.preloadBar);
    //Load all the assets, the first param points to the image.
    this.load.image('sky', 'images/sky.png');
    this.load.image('ground', 'images/platform.png');
    this.load.image('star', 'images/star.png');
    this.load.image('phaser', 'images/phaser.png');
    this.load.image('firstaid', 'images/firstaid.png');
    this.load.spritesheet('dude', 'images/dude.png', 32, 48);

    this.game.world.setBounds(0, 0, 1920, 800);

    
  },

  create: function() {
  	//Change the state to menu state.
  	this.state.start('menu');
  }
}