var LastRide = LastRide || {};

LastRide.playState = function(){

};

var leftWall;

var ground;
var test;

var carBody;
var carJoints = [];
var leftWheel;
var rightWheel;

var track;
var trackVertices = [0, 300, 400, 300];
// var trackVertices = [0, 300, 400, 300,1400,300, 1500, 250, 1500, 300]
var newTrack = false;
var johnny;

var freecam = false;

// ground
var bmd = null
var points = {
  'x': [150,200,250,300],
  'y': [300,100,200,400],
}
var pi = 0;
var path = [];
var xtra = 400;

function mouseDragStart() { 
  this.game.physics.box2d.mouseDragStart(this.game.input.mousePointer); 
  console.log("pointer: " + this.input.mousePointer.worldX);
}
function mouseDragMove() {  this.game.physics.box2d.mouseDragMove(this.game.input.mousePointer); }
function mouseDragEnd() {   this.game.physics.box2d.mouseDragEnd(); }

LastRide.playState.prototype = {

  init: function() {
    this.game.renderer.renderSession.roundPixels = true;
    this.stage.backgroundColor = '#204090';
  },

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
    this.test = this.game.add.sprite(0,0, 'firstaid');
    this.game.physics.box2d.enable(this.test);

    this.ground = this.game.add.sprite(0, 580, 'ground');
    this.ground.scale.setTo(50,1);
    this.game.physics.box2d.enable(this.ground);
    this.ground.body.static = true;

    this.createWall();
    this.drawGround();
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
    // LastRide.Line(200,100,900,200);
  },
  oneTime: function() {
    console.log("ONETIME!");
    xtra = xtra+50;
    // points.x.push(xtra);
    // points.y.push(400);
    // this.drawGround();

    // trackVertices.push(xtra);
    // trackVertices.push(xtra-700);
    trackVertices.push(this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY);
    newTrack = true;
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

  drawGround: function() {
    this.bmd = this.add.bitmapData(this.world.width, this.world.height);
    this.bmd.addToWorld();
    
    this.plot();
  },

  plot: function(){
    this.bmd.clear();
    this.path = []; 
    console.log("points: " + points.x)
    var x = 1 / this.game.width;
    for (var i = 0; i <= 1; i += x) {
      var px = this.math.linearInterpolation(points.x, i);
      var py = this.math.linearInterpolation(points.y, i);
      // this.math.bezierInterpolation
      // this.math.catmullRomInterpolation
      // this.math.linearInterpolation
      
      this.path.push( { x: px, y: py });
      this.bmd.rect(px, py, 2, 2, 'rgba(255, 255, 255, 1)');
    }
    for (var p = 0; p < points.x.length; p++){
      this.bmd.rect(points.x[p]-3, points.y[p]-3, 6, 6, 'rgba(255, 0, 0, 1)');
    }

    this.game.physics.box2d.enable(this.path);
    this.bmd.rect.static = true;
    // var line;
    // line.start = new Phaser.Point(300, 300);
    // line.end = new Phaser.Point(600,00);
    // line.type = Phaser.LINE;

  },

  newGround: function() {
    // track = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
    // track.setChain(trackVertices);
    // track.friction = 0.8;
    
    johnny = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
    johnny.addChain(trackVertices, 0, trackVertices.length/2, true);

  }
};

// LastRide.Line = function (x1, y1, x2, y2) {

//     x1 = x1 || 0;
//     y1 = y1 || 0;
//     x2 = x2 || 0;
//     y2 = y2 || 0;

//     /**
//     * @property {Phaser.Point} start - The start point of the line.
//     */
//     this.start = new Phaser.Point(x1, y1);

//     /**
//     * @property {Phaser.Point} end - The end point of the line.
//     */
//     this.end = new Phaser.Point(x2, y2);

//     /**
//     * @property {number} type - The const type of this object.
//     * @readonly
//     */
//     this.type = Phaser.LINE;

// };