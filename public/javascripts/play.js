var LastRide = LastRide || {};

LastRide.playState = function(){};

var leftWall;

var leftJoint;
var rightJoint;
var speed;
var speedoMetre;

var wKey;
var aKey;
var dKey;
var qKey;
var ground;
var test;

var carBody;
var leftWheel;
var rightWheel;


function mouseDragStart() { this.game.physics.box2d.mouseDragStart(this.game.input.mousePointer); }
function mouseDragMove() {  this.game.physics.box2d.mouseDragMove(this.game.input.mousePointer); }
function mouseDragEnd() {   this.game.physics.box2d.mouseDragEnd(); }

LastRide.playState.prototype = {

  preload: function() {
  	//ÞETTA PRELOAD Á EKKERT AÐ VERA
  },

  create: function() {
  	// this.game.stage.backgroundColor = '#124184';
  	this.game.physics.box2d.debugDraw.joints = true;
	// game.physics.box2d.setBoundsToWorld();

  	//Prepare the keyboard to be used
    this.keyboard = this.game.input.keyboard;
    this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.qKey.onDown.addOnce(this.oneTime, this);
  
    // game.add.sprite(0,0, 'sky');
    this.test = this.game.add.sprite(0,0, 'firstaid');
    this.game.physics.box2d.enable(this.test);

    this.ground = this.game.add.sprite(0, 580, 'ground');
    this.ground.scale.setTo(6,1);
    this.game.physics.box2d.enable(this.ground);
    this.ground.body.static = true;

    this.createWall();
    this.createCar();
  
    //handlers for mouse events
    this.game.input.onDown.add(mouseDragStart, this);
    this.game.input.addMoveCallback(mouseDragMove, this);
    this.game.input.onUp.add(mouseDragEnd, this);

    this.speedoMetre = this.game.add.text(5, 5, 'Speed:', { fill: '#ffffff', font: '14pt Arial' } );
    this.speedoMetre.fixedToCamera = true;

    this.game.camera.follow(this.carBody);
    console.log("this.car.body" + this.carBody)
  },
  oneTime: function() {
    console.log("mhm");
    console.log(this.leftJoint.GetMotorSpeed());
  },

  update: function() {
    if(this.aKey.isDown) {
      this.leftJoint.SetMotorSpeed(this.leftJoint.GetMotorSpeed()-0.5);
      this.rightJoint.SetMotorSpeed(this.rightJoint.GetMotorSpeed()-0.5);
    } else if(this.dKey.isDown) {
      this.leftJoint.SetMotorSpeed(this.leftJoint.GetMotorSpeed()+0.5);
      this.rightJoint.SetMotorSpeed(this.rightJoint.GetMotorSpeed()+0.5);
    };
    this.speedoMetre.setText("Speed: " + this.leftJoint.GetMotorSpeed());
    
    
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
    this.carBody = this.game.add.sprite(this.game.world.centerX-300, this.game.world.centerY, 'phaser');
    this.game.physics.box2d.enable(this.carBody);
    // staticThing.body.static = true;

    this.leftWheel = this.game.add.sprite(this.game.world.centerX-300, this.game.world.centerY, 'star');
    this.game.physics.box2d.enable(this.leftWheel);
    this.leftWheel.body.setCircle(this.leftWheel.width/2);
    // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
    this.leftJoint = this.game.physics.box2d.wheelJoint(this.carBody, this.leftWheel, -50,50,0,0,0,1, 3, 0.5, 0, 100, true);

    this.rightWheel = this.game.add.sprite(this.game.world.centerX-300, this.game.world.centerY, 'firstaid');
    this.game.physics.box2d.enable(this.rightWheel);
    this.rightWheel.body.setCircle(this.rightWheel.width/2);
    // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
    this.rightJoint = this.game.physics.box2d.wheelJoint(this.carBody, this.rightWheel, 50,50,0,0,0,1, 3, 0.5, 0, 100, true);
  }
};