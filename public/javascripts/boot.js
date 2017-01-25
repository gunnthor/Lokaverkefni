var LastRide = LastRide || {};

LastRide.bootState = function(){};

LastRide.bootState.prototype = {
	preload: function() {
      this.load.image('diamond', 'images/diamond.png');
	},
	create: function() {
		//Here we start the physics system.(ARCADE physics engine)
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		// game.physics.startSystem(Phaser.Physics.P2);
		this.game.physics.startSystem(Phaser.Physics.BOX2D);
        this.game.physics.box2d.gravity.y = 500;
        this.game.physics.box2d.debugDraw.joints = true;
	    this.game.physics.box2d.setBoundsToWorld();
        this.game.physics.box2d.friction = 1;
        this.game.stage.backgroundColor = '#124184';

		//Launch the load state next.
		LastRide.game.state.start('load');
	}
};