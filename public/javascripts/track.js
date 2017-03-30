function Track(game) {
  this.game = game;
  let bigTrack = [] //Inniheldur fylki af vertices
  
  this. trackVertices = [0, 300, 400, 300]; //[X0,Y0,X1,Y2,...,XxYx]

  console.log("track");
  this.newTrack = false;
  this.nodes = [];
  this.currentTrack = 0;
}

Track.prototype.newGround = function() {
  this.nodes[this.currentTrack] = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
  if(this.currentTrack == 0) this.nodes[this.currentTrack].addChain(this.trackVertices, 0, this.trackVertices.length/2, true);

}

Track.prototype.addVertices = function(xMouse, yMouse) {
  this.trackVertices.push(xMouse, yMouse);
  this.newTrack = true;
}

Track.prototype.update = function() {

  if(this.newTrack) {
    this.nodes[this.currentTrack].setChain(this.trackVertices);
    this.newTrack = false;
    console.log(this.nodes);
  }

}

Track.prototype.split = function() {
  this.newGround();
  this.trackVertices = [];
}


// Logic: Setja vertices i fylki uns ýtt er á takka,
// þá skal búa til nýtt fylki og setja næstu vertices 
// í það fylki.
