var LastRide = LastRide || {};

LastRide.editor = function(){};

LastRide.editor.prototype = {
  init: function() {
  	console.log("Entered Editor!");
  	//Inputs
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.iKey = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
    this.iKey.onDown.add(this.toggleInfoDisplay, this);


    //Text Info
  	this.info = [];

  	this.ClickForVertsINFO = this.game.add.text(10, 10, 'Press Mouse to Create vertices', { fill: '#ffffff', font: '14pt Arial' } );
  	this.info.push(this.ClickForVertsINFO);

    this.SplitINFO = this.game.add.text(10, 30, 'Press Q to split up the track', { fill: '#ffffff', font: '14pt Arial' } );
    this.info.push(this.SplitINFO);

    this.RemoveLine = this.game.add.text(10, 50, 'Press R to remove last line', { fill: '#ffffff', font: '14pt Arial' } );
    this.info.push(this.RemoveLine);

    this.toggleTextINFO = this.game.add.text(10, 70, 'Press I to toggle info', { fill: '#ffffff', font: '14pt Arial' } );
    this.info.push(this.toggleTextINFO);

    for(var i = 0; i < this.info.length; i++) {
       this.info[i].fixedToCamera = true;
       this.info[i].alpha = 0.5;
    }

  },
  create: function() {
  	//***TODO!!***\\

  	//Instructions textar[X]
  	//Track.
  	//Test car.
  	//save to database

  	this.track = new Track()


    
  },

  update : function() {
    if(this.cursors.left.isDown) {
      this.camera.x -= 10;
    } else if(this.cursors.right.isDown) {
      this.camera.x += 10;
    }
    if(this.cursors.down.isDown) {
      this.camera.y += 10;
    } else if(this.cursors.up.isDown) {
      this.camera.y -= 10;
    }
  },

  render: function() {
  	this.game.debug.cameraInfo(this.game.camera, 450, 32);
  },

  toggleInfoDisplay: function() {
  	console.log("Toggling info");
  	var alpha = 0.5;
  	if(this.info[0].alpha == 0.5) alpha = 0;
    
    for(var i = 0; i < this.info.length; i++) {
       this.info[i].alpha = alpha;
    }
  }
}