function Car() {
	console.log('erum að logga car function')
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
Car.prototype.Jump = function() {
  console.log("Jump");
};

//carBody
//carJoints
//leftWheel
//rightWheel

// muna: camera follow car: