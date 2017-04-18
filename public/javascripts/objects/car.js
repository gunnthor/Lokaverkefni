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

  this.carBody = this.game.add.sprite(mouseX, mouseY, 'phaser');
  this.game.physics.box2d.enable(this.carBody);

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

