//Höfundur: Gunnþór Karl Rafnsson
var win = {
  create: function() {

  	var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

  	wKey.onDown.addOnce(this.restart, this);
  },
  restart: function() {
  	game.start.state('menu');
  }
};