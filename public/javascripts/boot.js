var bootState = {
	create: function() {
		//Here we start the physics system.(ARCADE physics engine)
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// game.physics.startSystem(Phaser.Physics.P2);
		game.physics.startSystem(Phaser.Physics.BOX2D);
        game.physics.box2d.gravity.y = 500;
        game.physics.box2d.debugDraw.joints = true;
	    game.physics.box2d.setBoundsToWorld();
        game.physics.box2d.friction = 1;

		//Launch the load state next.
		game.state.start('load');
	}
};


// var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });