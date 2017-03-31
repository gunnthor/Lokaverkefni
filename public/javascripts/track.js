function Track(game) {
  this.game = game;
  let bigTrack = [] //Inniheldur fylki af vertices
  
  this.trackVertices = [0, 300, 400, 300]; //[X0,Y0,X1,Y2,...,XxYx]

  console.log("track");
  this.newTrack = false;
  this.nodes = [];
  this.currentTrack = 0;
  this.initializeNew = false;
}

Track.prototype.update = function() {

  if(this.newTrack && !this.initializeNew) {
    this.nodes[this.currentTrack].setChain(this.trackVertices);
    this.newTrack = false;
    console.log(this.nodes);
  }
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



Track.prototype.split = function(x,y) {
  this.initializeNew = true;
  this.currentTrack++;
  this.trackVertices = [];
  //this.addVertices();
  
  
}


// Logic: Setja vertices i fylki uns ýtt er á takka,
// þá skal búa til nýtt fylki og setja næstu vertices 
// í það fylki.
Track.prototype.firstGround = function() {
  this.nodes[0] = new Phaser.Physics.Box2D.Body(this.game, null, 10, 0, 0);
  this.nodes[this.currentTrack].addChain(this.trackVertices, 0, this.trackVertices.length/2, true);
}