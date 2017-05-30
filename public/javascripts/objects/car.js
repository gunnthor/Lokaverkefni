//Höfundur: Gunnþór Karl Rafnsson
function Car(game) {
	this.game = game;
	this.carBody = this.game.add.sprite(100, 100, 'phaser')
	this.carJoints = [];
	this.leftWheel;
	this.rightWheel;
  this.carExists = false;
};

//objects
Car.prototype.deleteme = {
	x: 69,
	y: 0
};

//attributes
Car.prototype.color = "#FFFFFF";

//functions
Car.prototype.createCar = function(mouseX, mouseY) {
//   var truckVertices = [-0.941074,-7.13798,-69.9798,-7.91197,-73.1929,8.39935,-68.3795,12.8165,-57.3861,13.1711,
// -48.8751,3.47799,-35.3993,2.53232,-23.1057,14.7078,34.2254,15.6535,45.2188,3.8326,
// 59.8766,3.8326,67.2056,10.2159,71.7627,9.80711,72.9977,1.35024,69.3556,-5.51562,
// 34.5293,-7.36343,21.802,-21.4563,1.15879,-21.9506];

var testCar = [916.5485992431641, 305.72916412353516, 924.5485992431641, 313.72916412353516, 943.5485992431641, 313.72916412353516, 952.5485992431641, 288.72916412353516, 980.5485992431641, 287.72916412353516, 990.5485992431641, 308.72916412353516, 1044.548599243164, 310.72916412353516, 1050.548599243164, 284.72916412353516, 1070.548599243164, 283.72916412353516, 1080.548599243164, 293.72916412353516, 1090.548599243164, 290.72916412353516, 1087.548599243164, 275.72916412353516, 1072.548599243164, 260.72916412353516, 1042.548599243164, 260.72916412353516, 1022.5485992431641, 237.72916412353516, 980.5485992431641, 234.72916412353516, 975.5485992431641, 260.72916412353516, 910.5485992431641, 265.72916412353516, 912.5485992431641, 306.72916412353516, 915.5485992431641, 306.72916412353516]

  this.carBody = this.game.add.sprite(mouseX, mouseY, 'phaser');
  this.carBody.width = 100;
  this.carBody.height = 25;
  this.game.physics.box2d.enable(this.carBody);

  // this.truckBody = new Phaser.Physics.Box2D.Body(this.game, null, mouseX, mouseY+100);
  // this.truckBody.setPolygon(truckVertices);

  var carWheels = [];
  var xPos = [-50, 50];
    
  for(var i = 0; i < 2; i++) {

    carWheels[i] = this.game.add.sprite(mouseX-100, mouseY-100, 'star')
    this.game.physics.box2d.enable(carWheels[i]);
    carWheels[i].body.setCircle(carWheels[i].width/2);
    carWheels[i].friction = 1;
    carWheels[i].xPos = xPos[i];
    // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
    this.carJoints[i] = this.game.physics.box2d.wheelJoint(this.carBody, carWheels[i], carWheels[i].xPos,35,0,0,0,1,
     3, 1, 0, 100, true);
  };
}

Car.prototype.real = function() {
  this.carExists = true;
}

Car.prototype.carAcceleration = function(status, acceleration) {
  var currentSpeed = ( (this.carJoints[0].GetMotorSpeed() + this.carJoints[1].GetMotorSpeed() ) /2 )
  // var decreaseSpeed = currentSpeed/1.1;
  var decreaseSpeed = currentSpeed-1;
  for(var i = 0; i < 2; i++){
    if(acceleration) {
      this.carJoints[i].EnableMotor(status);
      this.carJoints[i].SetMotorSpeed(acceleration);  
    } else {
      this.carJoints[i].EnableMotor(false);
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
}

