var LastRide = LastRide || {};
LastRide.play = function(){

};

var firstaid;
// let car
let track;
let vertices;
  
var freecam = false;

function mouseDragStart() { 
  this.game.physics.box2d.mouseDragStart(this.game.input.mousePointer); 
  console.log("pointer: " + this.input.mousePointer.worldX);
}
function mouseDragMove() {  this.game.physics.box2d.mouseDragMove(this.game.input.mousePointer); }
function mouseDragEnd() {   this.game.physics.box2d.mouseDragEnd(); }

LastRide.play.prototype = {

  init: function() {
    track = new Track(this);
    this.car = new Car(this);
    this.car.exists = false;
    // this.game.renderer.renderSession.roundPixels = true;
    this.stage.backgroundColor = '#204090';
    this.startingPoint = [];

    if (!window.jQuery) alert("jQuery Doesn't Work");

    //draw map herna?
    console.log("vertiies :D");
    var that = this;
    $.ajax({
      url: '/getTrack',
      data: {
        format: 'json'
      },
      error: function() {
        console.log("error í ajax request");
        console.log("loada placeholder track: ");
        track.drawTrack(
          [
            [0, 300,400,300,716,295.5],
            [0,400,400,400,718,400],
            [0,500,400,500,718,500],
            [0,600,400,600,718,600]
          ]
        )
      },
      dataType: 'text',
      success: function(data) {
        var tmp = JSON.parse(data);
        track.drawTrack(tmp.vertices);
        trackLoaded = true;
        that.startingPoint = tmp.startingPoint;
        that.car.createCar(that.startingPoint[0], that.startingPoint[1]);
        that.car.exists = true;
      },
      type: 'GET'
    });
  },

  create: function() {
    

    // track = new Track(this);

  	// this.game.stage.backgroundColor = '#124184';
  	this.game.physics.box2d.debugDraw.joints = true;
	  // game.physics.box2d.setBoundsToWorld();

  	//Prepare the keyboard to be used
    this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.zKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
    this.xKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.cKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
    this.vKey = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
    this.bKey = this.game.input.keyboard.addKey(Phaser.Keyboard.B);

    this.qKey.onDown.add(this.oneTime, this);
    this.zKey.onDown.add(this.torque, this, 0, 0.5);
    this.xKey.onUp.add(this.freeCam, this);
    this.rKey.onDown.add(this.magicButton, this);
  
    // this.game.add.sprite(0,0, 'sky');
    this.firstaid = this.game.add.sprite(0,0, 'firstaid');
    this.game.physics.box2d.enable(this.firstaid);

 
    //handlers for mouse events
    this.game.input.onDown.add(mouseDragStart, this);
    this.game.input.addMoveCallback(mouseDragMove, this);
    this.game.input.onUp.add(mouseDragEnd, this);
    this.game.input.onTap.add(this.mouseTapped, this);


    this.speedoMetre = this.game.add.text(200, 5, 'Speed:', { fill: '#ffffff', font: '14pt Arial' } );
    this.torqueMetre = this.game.add.text(30, 5, 'torque:', { fill: '#ffffff', font: '14pt Arial' } );
    this.speedoMetre.fixedToCamera = true;
    this.torqueMetre.fixedToCamera = true;
    
    this.game.camera.follow(this.car.carBody);

// var theMap = 
// [
//   [0,300,400,300,716,295.5,1015,295.5,1218,212.5],
//   [1500.5,209.5,1589.5,288.5,1836.5,286.5,2150.5,279.5],
//   [2379.5,351.5,2682.5,347.5,2807.5,269.5,2833.5,191.5,2796.5,89.5,2684.5,59.5,2650.5,54.5],
//   [2380.5, 352.5, 2304.5, 501.5, 2131.5, 576.5, 1878.5, 593.5, 1627.5, 592.5, 1548.5, 513.5]
// ]

  // var theMap =
  // [
  //   [0, 300,400,300,716,295.5],
  //   [0,400,400,400,718,400],
  //   [0,500,400,500,718,500],
  //   [0,600,400,600,718,600]
  // ]
  // var testaJSON = JSON.parse()
  // track.drawTrack(vertices);


  },

  mouseTapped: function() {
    track.addVertices(this.game.input.mousePointer.worldX,
     this.game.input.mousePointer.worldY);
  },

  oneTime: function() {
    console.log("ONETIME!");
    track.split(this.game.input.mousePointer.worldX, this.game.input.mousePointer.worldY);
  },

  magicButton: function() {
    console.log("Magic");
    track.removeChain();
  },

  update: function() {
    track.update();
    console.log(this.car.exists);
    if(this.car.exists) {
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

    // this.speedoMetre.setText("Speed: " + (car.carJoints[0].GetMotorSpeed() + car.carJoints[1].GetMotorSpeed() )/2 ); 
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
      this.game.camera.follow(this.car.carBody);
      console.log('freecam disabled')
    }
  },
};