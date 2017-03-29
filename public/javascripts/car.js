function Car(game) {
	this.game = game;
	console.log('erum að logga car function')
	console.log('game');
	console.log(game);
	this.carBody = this.game.add.sprite(100, 100, 'phaser')
	this.carJoints = [];
	this.leftWheel;
	this.rightWheel;
	this.color = "red";
	console.log(this.color);
	console.log(this.deleteme.x);
};

//objects
Car.prototype.deleteme = {
	x: 69,
	y: 0
};

//attributes
Car.prototype.color = "#FFFFFF";

//functions
Car.prototype.createCar = function() {
  this.carBody = this.game.add.sprite(200, 200, 'phaser');
  this.game.physics.box2d.enable(this.carBody);

  var carWheels = [];
  var xPos = [-50, 50];
    
  for(var i = 0; i < 2; i++) {
    carWheels[i] = this.game.add.sprite(100, 100, 'star')
    this.game.physics.box2d.enable(carWheels[i]);
    carWheels[i].body.setCircle(carWheels[i].width/2);
    carWheels[i].friction = 1;
    carWheels[i].xPos = xPos[i];
                                   // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
    this.carJoints[i] = this.game.physics.box2d.wheelJoint(this.carBody, carWheels[i], carWheels[i].xPos,35,0,0,0,1,
     3, 1, 0, 100, true);
  };
}

//carBody
//carJoints
//leftWheel
//rightWheel

// muna: camera follow car:

// function Hero(game){  this.game = game;  this.sprite = null;
  // this.anyCustomVariables = 5;}
  // Hero.prototype.create= function()
  //  {  this.sprite = this.game.add.sprite(0, 0, 'hero');}
  //  Hero.prototype.update = function(enemieGroup) 
  //  {  this.sprite.collide(enemieGroup);}