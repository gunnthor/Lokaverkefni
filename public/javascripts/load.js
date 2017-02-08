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

    this.game.world.setBounds(0, 0, 5000, 1600);

    var wKey;
    var aKey;
    var dKey;
    var qKey;
    var cursors;

    var leftJoint;
    var rightJoint;
    var carJoints = [];
    var speed;
    var speedoMetre;
    var torqueMetre;
    
    // þetta er gagnslaust:
    this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);

    this.zKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.xKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.cKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
    this.vKey = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
    this.bKey = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    
  },

  create: function() {
  	//Change the state to menu state.
  	this.state.start('menu');
  }
}