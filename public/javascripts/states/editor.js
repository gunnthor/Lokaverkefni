var LastRide = LastRide || {};

LastRide.editor = function(){};

LastRide.editor.prototype = {
  init: function() {
  	console.log("Entered Editor!");
  	//Inputs
    this.cursors = this.game.input.keyboard.createCursorKeys();
    //car keys
    this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    
    //Commands
    this.cKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
    this.vKey = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
    this.bKey = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
    this.iKey = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
    this.oKey = this.game.input.keyboard.addKey(Phaser.Keyboard.O);
    this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    this.tKey = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
    this.gKey = this.game.input.keyboard.addKey(Phaser.Keyboard.G);
    this.xKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);

    this.cKey.onDown.add(this.cancelCurrentChain, this);
    this.rKey.onDown.add(this.removeLine, this);
    this.iKey.onDown.add(this.toggleInfoDisplay, this);
    this.qKey.onDown.add(this.splitTrack, this);
    this.tKey.onDown.add(this.summonTestCar, this);
    this.gKey.onDown.add(this.status, this);
    this.xKey.onDown.add(this.freeCam, this);
    this.vKey.onDown.add(this.startingPoint, this);
    this.bKey.onDown.add(this.finishPoint, this);
    this.oKey.onDown.add(this.saveMap, this);

    //Text Info
  	this.info = [];
    this.carExists = false;
    this.freecam = true;

  	this.ClickForVertsINFO = this.game.add.text(10, 10, 'Press Mouse to Create vertices', { fill: '#ffffff', font: '14pt Arial' } );
  	this.info.push(this.ClickForVertsINFO);

    this.SplitINFO = this.game.add.text(10, 30, 'Press Q to split up the track', { fill: '#ffffff', font: '14pt Arial' } );
    this.info.push(this.SplitINFO);

    this.RemoveLine = this.game.add.text(10, 50, 'Press R to remove last track', { fill: '#ffffff', font: '14pt Arial' } );
    this.info.push(this.RemoveLine);

    this.cancelChain = this.game.add.text(10, 70, 'Press C to cancel track', { fill: '#ffffff', font: '14pt Arial' } );
    this.info.push(this.cancelChain);

    this.summonTestCarINFO = this.game.add.text(10, 90, 'Press T to summon a Test Car', { fill: '#ffffff', font: '14pt Arial' } );
    this.info.push(this.summonTestCarINFO);

    this.ToggleTextINFO = this.game.add.text(10, 110, 'Press I to toggle info', { fill: '#ffffff', font: '14pt Arial' } );
    this.info.push(this.ToggleTextINFO);

    for(var i = 0; i < this.info.length; i++) {
       this.info[i].fixedToCamera = true;
       this.info[i].alpha = 0.5;
    }

  },
  create: function() {

  	//***TODO!!***\\

  	//Instructions textar[X]
  	//Track [X]
  	//Test car.
  	//save to database

  	this.track = new Track(this);
    this.car = new Car(this);

    this.game.input.onTap.add(this.createVertices, this);
  },

  update : function() {
    this.track.update();
    

    //CAR CONTROLS
    if(this.carExists) {
      if(this.aKey.isDown) {
        this.car.carAcceleration('on', -50);
      } else if(this.dKey.isDown) {
        this.car.carAcceleration('on', 50);
      } else if(this.sKey.isDown) {
        this.car.carAcceleration('on', 0);
      } else {
        this.car.carAcceleration('off', false );
      }
    }
    
    
    //CAMERA CONTROLS
    if(this.freecam) {
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
    }
  },

  render: function() {
  	this.game.debug.cameraInfo(this.game.camera, 450, 32);
    this.game.debug.box2dWorld();
  },

  toggleInfoDisplay: function() {
  	console.log("Toggling info");
  	var alpha = 0.5;
  	if(this.info[0].alpha == 0.5) alpha = 0;
    
    for(var i = 0; i < this.info.length; i++) {
       this.info[i].alpha = alpha;
    }
  },

  freeCam: function() {
    this.freecam = !this.freecam;
    if(this.freecam){
      this.game.camera.follow(null);
      console.log('freecam enabled')
    } else {
      this.game.camera.follow(this.car.carBody);
      console.log('freecam disabled')
    }
  },
  createVertices: function() {
   this.track.addVertices(this.game.input.mousePointer.worldX,
    this.game.input.mousePointer.worldY);
  },
  splitTrack: function() {
    console.log("splitTrack!");
    this.track.split(this.game.input.mousePointer.worldX,
      this.game.input.mousePointer.worldY);
  },
  removeLine: function() {
    console.log("removeLine!");
    this.track.removeChain();
  },
  cancelCurrentChain: function() {
    this.track.cancelCurrentChain();
  },
  summonTestCar: function() {
    this.car.createCar(this.game.input.mousePointer.worldX,
      this.game.input.mousePointer.worldY);
    this.carExists = true;
  },
  status: function() {
    this.track.gatherVertices();
  },
  startingPoint: function() {
    this.track.createStartingPoint(this.game.input.mousePointer.worldX,
      this.game.input.mousePointer.worldY);
  },
  finishPoint: function() {
    this.track.createFinishPoint(this.game.input.mousePointer.worldX,
      this.game.input.mousePointer.worldY);
  },
  saveMap: function() {
    var info = this.track.saveMapInfo()
    if(!info) return;
    console.log(info);
  }
}