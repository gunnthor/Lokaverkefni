var LastRide = LastRide || {};

LastRide.playState = function(){};

var leftWall;

// var leftJoint;
// var rightJoint;
// var speed;
// var speedoMetre;
// var torqueMetre;

// var wKey;
// var aKey;
// var dKey;
// var qKey;

var ground;
var test;

var carBody;
var carJoints = [];
var leftWheel;
var rightWheel;


function mouseDragStart() { this.game.physics.box2d.mouseDragStart(this.game.input.mousePointer); }
function mouseDragMove() {  this.game.physics.box2d.mouseDragMove(this.game.input.mousePointer); }
function mouseDragEnd() {   this.game.physics.box2d.mouseDragEnd(); }

LastRide.playState.prototype = {

  create: function() {
  	// this.game.stage.backgroundColor = '#124184';
  	this.game.physics.box2d.debugDraw.joints = true;
	  // game.physics.box2d.setBoundsToWorld();

  	//Prepare the keyboard to be used
    // this.keyboard = this.game.input.keyboard;
    this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);

    this.zKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.xKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.cKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
    this.vKey = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
    this.bKey = this.game.input.keyboard.addKey(Phaser.Keyboard.B);

    this.qKey.onDown.addOnce(this.oneTime, this);
    this.zKey.onDown.add(this.torque, this, 0, 0.5);
  
    // game.add.sprite(0,0, 'sky');
    this.test = this.game.add.sprite(0,0, 'firstaid');
    this.game.physics.box2d.enable(this.test);

    this.ground = this.game.add.sprite(0, 580, 'ground');
    this.ground.scale.setTo(50,1);
    this.game.physics.box2d.enable(this.ground);
    this.ground.body.static = true;

    this.createWall();
    this.createCar();
  
    //handlers for mouse events
    this.game.input.onDown.add(mouseDragStart, this);
    this.game.input.addMoveCallback(mouseDragMove, this);
    this.game.input.onUp.add(mouseDragEnd, this);

    this.speedoMetre = this.game.add.text(5, 5, 'Speed:', { fill: '#ffffff', font: '14pt Arial' } );
    this.torqueMetre = this.game.add.text(30, 5, 'torque:', { fill: '#ffffff', font: '14pt Arial' } );
    this.speedoMetre.fixedToCamera = true;
    this.torqueMetre.fixedToCamera = true;

    // this.game.camera.follow(this.carBody);
  },
  oneTime: function() {
    console.log("mhm");
    console.log(this.leftJoint.GetMotorSpeed());
  },

  update: function() {
    if(this.aKey.isDown) {
      carJoints[0].SetMotorSpeed(carJoints[0].GetMotorSpeed()-0.5);
      carJoints[1].SetMotorSpeed(carJoints[1].GetMotorSpeed()-0.5);
    } else if(this.dKey.isDown) {
      carJoints[0].SetMotorSpeed(carJoints[0].GetMotorSpeed()+0.5);
      carJoints[1].SetMotorSpeed(carJoints[1].GetMotorSpeed()+0.5);
    };
    // this.speedoMetre.setText("Speed: " + this.leftJoint.GetMotorSpeed()); 
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

  createWall: function() {
    console.log('wall?')
    this.leftWall = new Phaser.Physics.Box2D.Body(this.game, null, 0, 350, 0.5);
    this.leftWall.setRectangle(32, 500, 0, 0, 0);
    this.leftWall.static = true;
    this.leftWall.backgroundColor = 'red';
    this.game.physics.box2d.enable(this.leftWall);
  },

  createCar: function() {
    //IMPLEMENTATION OF CAR
    this.carBody = this.game.add.sprite(100, 100, 'phaser');
    this.game.physics.box2d.enable(this.carBody);
    // this.carBody = new Phaser.Physics.Box2D.Body(this.game, 'phaser', 0, -50);
    
    var carWheels = [];
    var xPos = [-55, 55];
    
    console.log("carJoints " + carJoints);
    for(var i = 0; i < 2; i++) {
      carWheels[i] = this.game.add.sprite(100, 100, 'star')
      this.game.physics.box2d.enable(carWheels[i]);
      carWheels[i].body.setCircle(carWheels[i].width/2);
      carWheels[i].friction = 1;
      carWheels[i].xPos = xPos[i];
                                     // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
      carJoints[i] = this.game.physics.box2d.wheelJoint(this.carBody, carWheels[i], carWheels[i].xPos,22,0,0,0,1,
       3, 1, 0, 100, true);
    };
    
    

    // this.carJoints[0] = 
    // this.carJoints[1] = 
    
    // this.leftWheel = this.game.add.sprite(100, 100, 'star');
    // this.game.physics.box2d.enable(this.leftWheel);
    // this.leftWheel.body.setCircle(this.leftWheel.width/2);
    // this.leftWheel.friction = 1;

    // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
    // this.leftJoint = this.game.physics.box2d.wheelJoint(this.carBody, this.leftWheel, -50,35,0,0,0,1, 3, 0, 0, 100, true);

    // this.rightWheel = this.game.add.sprite(100, 100, 'firstaid');
    // this.game.physics.box2d.enable(this.rightWheel);
    // this.rightWheel.body.setCircle(this.rightWheel.width/2);
    // this.rightWheel.friction = 1;
    // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
    // this.rightJoint = this.game.physics.box2d.wheelJoint(this.carBody, this.rightWheel, 50,35,0,0,0,1, 3, 0, 0, 100, true);
  },
  torque: function(value) {
    this.leftJoint.SetMotorTorque(this.leftJoint.GetMotorTorque() + value);
    this.rightJoint.SetMotorTorque(this.rightJoint.GetMotorTorque() + value);
  }
};