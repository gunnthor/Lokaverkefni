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
    this.bKey = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
    this.cKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
    this.eKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
    this.vKey = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
    this.iKey = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
    this.oKey = this.game.input.keyboard.addKey(Phaser.Keyboard.O);
    this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    this.tKey = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
    this.gKey = this.game.input.keyboard.addKey(Phaser.Keyboard.G);
    this.xKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.yKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Y);

    //listeners
    this.cKey.onDown.add(this.cancelCurrentChain, this);
    this.eKey.onDown.add(this.removeLine, this);
    this.rKey.onDown.add(this.removeLastVertice, this);
    this.iKey.onDown.add(this.toggleInfoDisplay, this);
    this.qKey.onDown.add(this.splitTrack, this);
    this.tKey.onDown.add(this.summonTestCar, this);
    this.gKey.onDown.add(this.status, this);
    this.xKey.onDown.add(this.freeCam, this);
    this.vKey.onDown.add(this.startingPoint, this);
    this.bKey.onDown.add(this.finishPoint, this);
    this.oKey.onDown.add(this.saveMap, this);
    this.yKey.onDown.add(this.goToMenu, this);

    //Text Info
  	this.info = [];
    this.carExists = false;
    this.freecam = true;
    this.toggleInfo = true;
    this.alreadySaved == false;

  	this.ClickForVertsINFO = this.game.add.text(10, 10, 'Press Mouse to Create vertices', { fill: '#00FFFF', font: '14pt Arial' } );
  	this.info.push(this.ClickForVertsINFO);

    this.SplitINFO = this.game.add.text(10, 30, 'Press Q to split up the track', { fill: '#00FFFF', font: '14pt Arial' } );
    this.info.push(this.SplitINFO);

    this.RemoveLine = this.game.add.text(10, 50, 'Press R to remove last Vertice', { fill: '#00FFFF', font: '14pt Arial' } );
    this.info.push(this.RemoveLine);

    this.cancelChain = this.game.add.text(10, 70, 'Press C to cancel track', { fill: '#00FFFF', font: '14pt Arial' } );
    this.info.push(this.cancelChain);

    this.summonTestCarINFO = this.game.add.text(10, 90, 'Press T to summon a Test Car', { fill: '#00FFFF', font: '14pt Arial' } );
    this.info.push(this.summonTestCarINFO);

    this.carKeysTEXT = this.game.add.text(10, 110, 'USE W and D to drive the car', { fill: '#00FFFF', font: '14pt Arial' } );
    this.info.push(this.carKeysTEXT);

    this.saveMapInfoTEXT = this.game.add.text(10, 130, 'Press O to save the map', { fill: '#00FFFF', font: '14pt Arial' } );
    this.info.push(this.saveMapInfoTEXT);

    this.saveMapInfoTEXT2 = this.game.add.text(10, 150, 'Note: You can only save the map once.', { fill: '#ffff00', font: '14pt Arial' } );
    this.info.push(this.saveMapInfoTEXT2);

    this.ToggleTextINFO = this.game.add.text(10, 170, 'Press I to toggle info', { fill: '#00FFFF', font: '14pt Arial' } );
    this.info.push(this.ToggleTextINFO);

    this.createStartingPointTEXT = this.game.add.text(310, 10, 'Press V for Starting Point', { fill: '#00FFFF', font: '14pt Arial' } );
    this.info.push(this.createStartingPointTEXT);

    this.createFinishPointTEXT = this.game.add.text(310, 30, 'Press B for Finish Point', { fill: '#00FFFF', font: '14pt Arial' } );
    this.info.push(this.createFinishPointTEXT);

    this.toggleFreecam = this.game.add.text(310, 50, 'Press X to toggle freecam', { fill: '#00FFFF', font: '14pt Arial' } );
    this.info.push(this.toggleFreecam);

    this.useArrowKeysText = this.game.add.text(310, 70, 'Use Arrow Keys to move Camera', { fill: '#00FFFF', font: '14pt Arial' } );
    this.info.push(this.useArrowKeysText);

    for(var i = 0; i < this.info.length; i++) {
       this.info[i].fixedToCamera = true;
       this.info[i].alpha = 0.5;
    }
  },
  create: function() {
    this.skyBackground = this.game.add.sprite(-10000,-10000, 'sky');
    this.skyBackground.width = 20000;
    this.skyBackground.height = 20000;

    this.cloud = this.game.add.sprite(0,0, 'cloud');
    this.cloud.width = 120;
    this.cloud.height= 100

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
    if(this.toggleInfo) this.game.debug.cameraInfo(this.game.camera, 350, 110);
  	
    this.game.debug.box2dWorld();
  },

  // checkOverlap: function(spriteA, spriteB) {
  //   var boundsA = spriteA.getBounds();
  //   var boundsB = spriteB.getBounds();

  //   return Phaser.Rectangle.intersects(boundsA, boundsB);
  // },

  toggleInfoDisplay: function() {
  	console.log("Toggling info");
  	var alpha = 0.5;
  	if(this.info[0].alpha == 0.5) alpha = 0;
    
    for(var i = 0; i < this.info.length; i++) {
       this.info[i].alpha = alpha;
    }
    this.toggleInfo = !this.toggleInfo;
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
  removeLastVertice: function() {
    this.track.removeLastVertice();
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
  goToMenu: function() {
    this.state.start('menu');
  },
  saveMap: function() {
    if(this.alreadySaved == true) return;
    var info = this.track.saveMapInfo()
    console.log("info áður en það er sent með ajax");
    console.log(info);
    if(!info) return;
    
    $.ajax({
      type: 'POST',
      url: '/saveTrack',
      data: {info:info},
      error: function() {
        console.log("error í saveMap ajax request");
      },

      dataType: 'text',
      success: function(data) {
        // var tmp = JSON.parse(data);
        // track.drawTrack(tmp.vertices);
        // trackLoaded = true;
        console.log("success");
      },
    });
  }
}