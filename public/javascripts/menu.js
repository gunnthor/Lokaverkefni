var LastRide = LastRide || {};

LastRide.menuState = function(){};

LastRide.menuState.prototype = {
	create: function(){

		var nameLabel = this.game.add.text(80, 80, 'One Last Ride!', 
			{font: '25px Arial', fill: '#ffffff'});

		var startLabel = this.game.add.text(80, this.game.world.height-80,
			'press the "W" key to start',
			{font: '25px Arial', fill: '#ffffff'});
		var wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

		wKey.onDown.addOnce(this.start, this);

		// starta strax bara..
		this.start(this);
	},

	start: function() {
		this.state.start('play');
	}
}