var bootState = {
	create: function() {
		//Here we start the physics system.(ARCADE physics engine)
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//Launch the load state next.
		game.state.start('load');
	}
};


// var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });