function Car(test) {
	console.log('erum að logga car function')
	this.color = "red";
	console.log(this.color);
	console.log(this.pos.x);
};

Car.prototype.pos = {
	x: 69,
	y: 0
};

Car.prototype.color = "#FFFFFF";

console.log('car.js');

Car.prototype.Jump = function() {
  console.log("Jump");
};