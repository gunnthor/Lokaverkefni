var LastRide = LastRide || {};
LastRide.playState = function(){

};

var leftWall;

var firstaid;
let car;
let track;

var newTrack = false;   
var freecam = false;

function mouseDragStart() { 
  this.game.physics.box2d.mouseDragStart(this.game.input.mousePointer); 
  console.log("pointer: " + this.input.mousePointer.worldX);
}
function mouseDragMove() {  this.game.physics.box2d.mouseDragMove(this.game.input.mousePointer); }
function mouseDragEnd() {   this.game.physics.box2d.mouseDragEnd(); }

LastRide.playState.prototype = {

  init: function() {
    // this.game.renderer.renderSession.roundPixels = true;
    this.stage.backgroundColor = '#204090';
  },

  create: function() {
    car = new Car(this);
    car.createCar();

    track = new Track(this);

  	// this.game.stage.backgroundColor = '#124184';
  	this.game.physics.box2d.debugDraw.joints = true;
	  // game.physics.box2d.setBoundsToWorld();

  	//Prepare the keyboard to be used
    this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.zKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.xKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.cKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
    this.vKey = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
    this.bKey = this.game.input.keyboard.addKey(Phaser.Keyboard.B);

    this.qKey.onDown.add(this.oneTime, this);
    this.zKey.onDown.add(this.torque, this, 0, 0.5);
    this.xKey.onUp.add(this.freeCam, this);
  
    // this.game.add.sprite(0,0, 'sky');
    this.firstaid = this.game.add.sprite(0,0, 'firstaid');
    this.game.physics.box2d.enable(this.firstaid);

    //this.createWall();

    track.firstGround();
  
    //handlers for mouse events
    this.game.input.onDown.add(mouseDragStart, this);
    this.game.input.addMoveCallback(mouseDragMove, this);
    this.game.input.onUp.add(mouseDragEnd, this);
    this.game.input.onTap.add(this.mouseTapped, this);

    this.speedoMetre = this.game.add.text(200, 5, 'Speed:', { fill: '#ffffff', font: '14pt Arial' } );
    this.torqueMetre = this.game.add.text(30, 5, 'torque:', { fill: '#ffffff', font: '14pt Arial' } );
    this.speedoMetre.fixedToCamera = true;
    this.torqueMetre.fixedToCamera = true;
    
    this.game.camera.follow(car.carBody);
  },

  mouseTapped: function() {
    track.addVertices(this.game.input.mousePointer.worldX,
     this.game.input.mousePointer.worldY);
  },

  oneTime: function() {
    console.log("ONETIME!");
    track.split(this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY);
  },

  update: function() {
    track.update();

    if(this.aKey.isDown) {
      car.carAcceleration('on', -50);
    } else if(this.dKey.isDown) {
      car.carAcceleration('on', 50);
    } else if(this.sKey.isDown) {
      car.carAcceleration('on', 0);
    } else {
      car.carAcceleration('off', false );
    }
    
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

    this.speedoMetre.setText("Speed: " + (car.carJoints[0].GetMotorSpeed() + car.carJoints[1].GetMotorSpeed() )/2 ); 
    // this.torqueMetre.setText("Torque" + this.leftJoint.GetMotorTorque)
  },

  render: function() {
  	this.game.debug.box2dWorld();
    this.game.debug.cameraInfo(this.game.camera, 500, 32);
  },

  //á að vera stórt W?
  win: function() {
    this.state.start('win');
  },


  createWall: function() {
    console.log('wall?')
    this.leftWall = new Phaser.Physics.Box2D.Body(this.game, null, 500, 350, 0.5);
    this.leftWall.setRectangle(100, 400, 200, 250, 240);
    this.leftWall.static = true;
    this.leftWall.backgroundColor = 'red';
    this.leftWall.color = 'red'
    this.game.physics.box2d.enable(this.leftWall);
  },

  torque: function(value) {
    this.leftJoint.SetMotorTorque(this.leftJoint.GetMotorTorque() + value);
    this.rightJoint.SetMotorTorque(this.rightJoint.GetMotorTorque() + value);
  },

  freeCam: function() {
    freecam = !freecam;
    if(freecam){
      this.game.camera.follow(null);
      console.log('freecam enabled')
    } else {
      this.game.camera.follow(car.carBody);
      console.log('freecam disabled')
    }
  },

  // newGround: function() {   
  //   nodes = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
  //   nodes.addChain(trackVertices, 0, trackVertices.length/2, true);
  // }

};