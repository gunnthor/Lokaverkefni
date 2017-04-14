var LastRide = LastRide || {};

LastRide.menu = function(){};


LastRide.menu.prototype = {
	create: function(){

		var nameLabel = this.game.add.text(80, 80, 'One Last Ride!', 
			{font: '25px Arial', fill: '#ffffff'});

		var startLabel = this.game.add.text(80, 160,
			'press the "W" key to start',
			{font: '25px Arial', fill: '#ffffff'});
		var startLabel = this.game.add.text(80, 240,
			'press the "E" key for Editor',
			{font: '25px Arial', fill: '#ffffff'});

		var wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		var eKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);

		wKey.onDown.addOnce(this.startPlay, this);
		eKey.onDown.addOnce(this.startEditor, this);


		// starta strax bara..
		// this.start();
	},

	startPlay: function() {
		this.state.start('play');
	},
	startEditor: function() {
		this.state.start('editor');
	}
}