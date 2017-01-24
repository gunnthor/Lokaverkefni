var leftWall;

var leftJoint;
var rightJoint;
var speed;
var speedoMetre;

var aKey;
var dKey;

function mouseDragStart() { game.physics.box2d.mouseDragStart(game.input.mousePointer); }
function mouseDragMove() {  game.physics.box2d.mouseDragMove(game.input.mousePointer); }
function mouseDragEnd() {   game.physics.box2d.mouseDragEnd(); }

var playState = {

  preload: function() {
  	//ÞETTA PRELOAD Á EKKERT AÐ VERA
  },

  create: function() {
  	game.stage.backgroundColor = '#124184';
  	game.physics.box2d.debugDraw.joints = true;
	// game.physics.box2d.setBoundsToWorld();

  	//Prepare the keyboard to be used
    this.keyboard = game.input.keyboard;
    var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D)
    wKey.onDown.addOnce(this.oneTime, this);
  
    // game.add.sprite(0,0, 'sky');
    var test = game.add.sprite(0,0, 'firstaid');
    game.physics.box2d.enable(test);

    var ground = game.add.sprite(0, 580, 'ground');
    ground.scale.setTo(6,1);
    game.physics.box2d.enable(ground);
    ground.body.static = true;

    createWall();
    createCar();
  
    //handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);

    speedoMetre = game.add.text(5, 5, 'Speed:', { fill: '#ffffff', font: '14pt Arial' } );
  },
  oneTime: function() {
    console.log("mhm");
    console.log(leftJoint.GetMotorSpeed());
  },

  update: function() {
    if(aKey.isDown) {
      leftJoint.SetMotorSpeed(leftJoint.GetMotorSpeed()-0.5);
      rightJoint.SetMotorSpeed(rightJoint.GetMotorSpeed()-0.5);
    } else if(dKey.isDown) {
      leftJoint.SetMotorSpeed(leftJoint.GetMotorSpeed()+0.5);
      rightJoint.SetMotorSpeed(rightJoint.GetMotorSpeed()+0.5);
    };
    speedoMetre.setText("Speed: " + leftJoint.GetMotorSpeed());
    
    
  },

  render: function() {
  	game.debug.box2dWorld();
  },

  //á að vera stórt W?
  win: function() {
    game.state.start('win');
  }
};

function createWall() {
  console.log('wall?')
  leftWall = new Phaser.Physics.Box2D.Body(game, null, 0, 350, 0.5);
  leftWall.setRectangle(32, 500, 0, 0, 0);
  leftWall.static = true;
  leftWall.backgroundColor = 'red';
  game.physics.box2d.enable(leftWall);
};

function createCar() {
//IMPLEMENTATION OF CAR
  var carBody = game.add.sprite(game.world.centerX-300, game.world.centerY, 'phaser');
  game.physics.box2d.enable(carBody);
  // staticThing.body.static = true;

  var leftWheel = game.add.sprite(game.world.centerX-300, game.world.centerY, 'star');
  game.physics.box2d.enable(leftWheel);
  leftWheel.body.setCircle(leftWheel.width/2);
  // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
  leftJoint = game.physics.box2d.wheelJoint(carBody, leftWheel, -50,50,0,0,0,1, 3, 0.5, 0, 100, true);

  var rightWheel = game.add.sprite(game.world.centerX-300, game.world.centerY, 'firstaid');
  game.physics.box2d.enable(rightWheel);
  rightWheel.body.setCircle(rightWheel.width/2);
  // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
  rightJoint = game.physics.box2d.wheelJoint(carBody, rightWheel, 50,50,0,0,0,1, 3, 0.5, 0, 100, true);
  game.camera.follow(carBody);
};