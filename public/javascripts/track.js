function Track(game) {
  this.game = game;
  let bigTrack = [] //Inniheldur fylki af vertices
  
  this.trackVertices = [0, 300, 400, 300]; //[X0,Y0,X1,Y2,...,XxYx]

  this.newTrack = false;
  this.nodes = [];
  this.currentTrack = 0;
  this.initializeNew = false;
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
    console.log(this.nodes);
  }
}

Track.prototype.split = function(x,y) {
  this.initializeNew = true;
  this.currentTrack++;
  console.log("split!");
  console.log(this.trackVertices);
  this.trackVertices = [];
}

Track.prototype.removeChain = function() {
  this.trackVertices = [];
  this.statusDebug("Beginning of removeChain");

  if(this.nodes[this.currentTrack]) {
    //this.nodes[x] er braut.
    console.log("1");
    this.nodes[this.currentTrack].setChain(this.trackVertices)
    this.currentTrack--;
  } else if(this.currentTrack >= 0) {

    //this.nodes[x] er kannski braut.
    //this.nodes[x] >= 0.
    console.log("2");
    this.currentTrack--;

    console.log("this.nodes after -- " + this.nodes[this.currentTrack]);
    console.log(this.nodes[this.currentTrack]);
    this.nodes[this.currentTrack].setChain([])  
  } else {
    //this.currentTrack er minna en 0
    console.log("3");
    console.log("Current track is below 0");;
  }

  this.statusDebug("Endinga of removeChain");

}

Track.prototype.removeVertex = function() {
  
}

Track.prototype.addVertices = function(xMouse, yMouse) {
  if(this.trackVertices.length == 2 && this.initializeNew == true) {

    this.nodes[this.currentTrack] = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
    this.initializeNew = false;
    //this.nodes[this.currentTrack] = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
  }

  this.trackVertices.push(xMouse, yMouse);
   console.log("currentTrack?");
   console.log(this.currentTrack);
   console.log("trackVertices");
   console.log(this.trackVertices);
  
  this.newTrack = true;
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