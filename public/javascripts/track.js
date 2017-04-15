function Track(game) {
  this.game = game;
  
  this.trackVertices = []; //[X0,Y0,X1,Y2,...,XxYx]

  this.newTrack = false;
  this.nodes = [];
  this.allVertices = [];
  this.currentTrack = 0;
  this.initializeNew = true;
  this.startingPointLocation =[];
  this.finishPointLocation = [];
}

Track.prototype.statusDebug = function(msg){
  console.log(msg);
  console.log("trackVertices: " + this.trackVertices);
  console.log("currentTrack: " + this.currentTrack);
  console.log("this.nodes[this.currentTrack]: " );
  console.log(this.nodes[this.currentTrack]); 
}

Track.prototype.update = function() {
  if(this.newTrack && !this.initializeNew) {
    this.nodes[this.currentTrack].setChain(this.trackVertices);
    this.newTrack = false;
    console.log("update!");
  }
}

Track.prototype.addVertices = function(xMouse, yMouse) {
  if(this.trackVertices.length == 2 && this.initializeNew == true) {
    this.nodes[this.currentTrack] = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
    this.initializeNew = false;
  }
  this.trackVertices.push(xMouse, yMouse);
  this.newTrack = true;
}

Track.prototype.removeChain = function() {
  let rememberTrack = this.currentTrack;
  if(this.currentTrack > 0) {
    this.currentTrack--;
    if(this.nodes[this.currentTrack]) {
      this.nodes[this.currentTrack].setChain([-10000,-10000,-10000,-10000]);
    } 
    this.currentTrack = rememberTrack;
  }
}

Track.prototype.cancelCurrentChain = function() {
  this.trackVertices = [];
  if(this.nodes[this.currentTrack]) {
    console.log("cancelCurrentChain");
    this.nodes[this.currentTrack].setChain(-9999,-9999,-9999,-9999);
  }
}

Track.prototype.split = function(x,y) {
  this.allVertices.push(this.trackVertices);
  this.initializeNew = true;
  this.currentTrack++;
  console.log(this.trackVertices);
  this.trackVertices = [];
}

Track.prototype.removeVertex = function() {
  
}

Track.prototype.drawTrack = function(map) {

  for(var i = 0; i <= map.length; i++ ){
    this.nodes[this.currentTrack] = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
    this.nodes[this.currentTrack].setChain(map[i]);
    this.currentTrack++;
    // this.split();
  }
  this.trackVertices = [];
  this.currentTrack = map.length;
}

Track.prototype.createStartingPoint = function(xMouse, yMouse) {
  this.startingPointLocation = [xMouse, yMouse];
  if(this.StartingPointText) this.StartingPointText.destroy();
  this.StartingPointText = this.game.add.text(xMouse, yMouse, '  Starting Point!  ');
  this.StartingPointText.anchor.set(0.5);
  this.StartingPointText.align ='center';
  this.StartingPointText.font = 'Arial Black';
  this.StartingPointText.fontSize = 20;
  this.StartingPointText.fontWeight = 'bold';
  this.StartingPointText.fill = '#ec008c';

  this.StartingPointText.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);
}

Track.prototype.createFinishPoint = function(xMouse, yMouse) {
  this.finishPointLocation = [xMouse, yMouse];
  if(this.finishPointText) this.finishPointText.destroy();
  this.finishPointText = this.game.add.text(xMouse, yMouse, '  Finish Point!  ');
  this.finishPointText.anchor.set(0.5);
  this.finishPointText.align ='center';
  this.finishPointText.font = 'Arial Black';
  this.finishPointText.fontSize = 20;
  this.finishPointText.fontWeight = 'bold';
  this.finishPointText.fill = '#ec008c';

  this.finishPointText.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);
}

Track.prototype.saveMapInfo = function() {
  if(this.startingPointLocation.length < 2 ||
    this.finishPointLocation.length < 2 ||
    this.trackVertices.length < 1) {
    console.log("You need a startingpoint, finishpoint and a track to be able to save.")
    return;
  }
  if(this.trackVertices.length > 3) {
    this.allVertices.push(this.trackVertices);
    this.trackVertices = [];
  }
  var info = {
    startingPoint: this.startingPointLocation,
    finishPoint: this.finishPointLocation,
    vertices: this.allVertices
  }
  return info;
}