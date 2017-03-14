var LastRide = LastRide || {};
LastRide.playState = function(){
console.log('LastRide.playState ?');  
};

var leftWall;

var ground;
var firstaid;

var carBody;
var carJoints = [];
var leftWheel;
var rightWheel;

 // var vehicle = new Car();

var track;
var trackVertices = [0, 300, 400, 300]
var johnny;
var newTrack = false;   

var vehicle = new Car();

var freecam = false;

function mouseDragStart() { 
  this.game.physics.box2d.mouseDragStart(this.game.input.mousePointer); 
  console.log("pointer: " + this.input.mousePointer.worldX);
  this.oneTime(this);
}
function mouseDragMove() {  this.game.physics.box2d.mouseDragMove(this.game.input.mousePointer); }
function mouseDragEnd() {   this.game.physics.box2d.mouseDragEnd(); }

LastRide.playState.prototype = {

  init: function() {
    // this.game.renderer.renderSession.roundPixels = true;
    this.stage.backgroundColor = '#204090';
  },

  create: function() {
    var vehicle = new Car();
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

    // this.ground = this.game.add.sprite(0, 580, 'ground');
    // this.ground.scale.setTo(50,1);
    // this.game.physics.box2d.enable(this.ground);
    // this.ground.body.static = true;

    this.createWall();
    this.createCar();
    this.newGround();
  
    //handlers for mouse events
    this.game.input.onDown.add(mouseDragStart, this);
    this.game.input.addMoveCallback(mouseDragMove, this);
    this.game.input.onUp.add(mouseDragEnd, this);

    this.speedoMetre = this.game.add.text(200, 5, 'Speed:', { fill: '#ffffff', font: '14pt Arial' } );
    this.torqueMetre = this.game.add.text(30, 5, 'torque:', { fill: '#ffffff', font: '14pt Arial' } );
    this.speedoMetre.fixedToCamera = true;
    this.torqueMetre.fixedToCamera = true;
    
    this.game.camera.follow(this.carBody);
  },
  oneTime: function() {
    console.log("ONETIME!");

    // trackVertices.push(xtra);
    // trackVertices.push(xtra-700);
    trackVertices.push(this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY);
    newTrack = true;
    console.log('le vehicles' + vehicle)
  },

  update: function() {
    if(newTrack) {
      johnny.setChain(trackVertices);
      newTrack = false;
    }

    if(this.aKey.isDown) {
      this.carAcceleration('on', -50);
    } else if(this.dKey.isDown) {
      this.carAcceleration('on', 50);
    } else if(this.sKey.isDown) {
      this.carAcceleration('on', 0);
      console.log("skey");
    } else {
      this.carAcceleration('off', false );
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

    this.speedoMetre.setText("Speed: " + (carJoints[0].GetMotorSpeed() + carJoints[1].GetMotorSpeed() )/2 ); 
    // this.torqueMetre.setText("Torque" + this.leftJoint.GetMotorTorque)
  },

  render: function() {
  	this.game.debug.box2dWorld();
    this.game.debug.cameraInfo(this.game.camera, 32, 32);
  },

  //á að vera stórt W?
  win: function() {
    this.state.start('win');
  },

  carAcceleration: function(status, acceleration) {
    var currentSpeed = ( (carJoints[0].GetMotorSpeed() + carJoints[1].GetMotorSpeed() ) /2 )
    // var decreaseSpeed = currentSpeed/1.1;
    var decreaseSpeed = currentSpeed-1;
    for(var i = 0; i < 2; i++){
      if(acceleration) {
        carJoints[i].EnableMotor(status);
        carJoints[i].SetMotorSpeed(acceleration);  
      } else {
        carJoints[i].EnableMotor(false);
        // if(currentSpeed <= 1 && currentSpeed >= -1) {
        //   carJoints[i].SetMotorSpeed(0);
        // } else if(currentSpeed < -1) {
        //   console.log("this?");
        //   carJoints[i].SetMotorSpeed(currentSpeed + 0.5 );  
        // } else {
        //   carJoints[i].SetMotorSpeed(currentSpeed - 0.5);
        // }
      }
    }
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

  createCar: function() {
    //IMPLEMENTATION OF CAR
    this.carBody = this.game.add.sprite(100, 100, 'phaser');
    this.game.physics.box2d.enable(this.carBody);
    console.log(this.carBody.collideWorldBounds);
    // this.carBody = new Phaser.Physics.Box2D.Body(this.game, 'phaser', 0, -50);
    
    var carWheels = [];
    var xPos = [-50, 50];
    
    console.log("carJoints " + carJoints);
    for(var i = 0; i < 2; i++) {
      carWheels[i] = this.game.add.sprite(100, 100, 'star')
      this.game.physics.box2d.enable(carWheels[i]);
      carWheels[i].body.setCircle(carWheels[i].width/2);
      carWheels[i].friction = 1;
      carWheels[i].xPos = xPos[i];
                                     // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
      carJoints[i] = this.game.physics.box2d.wheelJoint(this.carBody, carWheels[i], carWheels[i].xPos,35,0,0,0,1,
       3, 1, 0, 100, true);
    };
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
      this.game.camera.follow(this.carBody);
      console.log('freecam disabled')
    }
  },

  newGround: function() {   
    johnny = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
    johnny.addChain(trackVertices, 0, trackVertices.length/2, true);
  }
};