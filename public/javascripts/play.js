var playState = {
  create: function() {
  	//Prepare the keyboard to be used
    this.keyboard = game.input.keyboard;

    game.add.sprite(0,0, 'sky');
    game.add.sprite(0, 580, 'ground');
    
  },

  update: function() {
    
  },
  //á að vera stórt W?
  win: function() {
    game.state.start('win');
  }
};