var leftWall;

var leftJoint;
var rightJoint;
var speed;

function mouseDragStart() { game.physics.box2d.mouseDragStart(game.input.mousePointer); }
function mouseDragMove() {  game.physics.box2d.mouseDragMove(game.input.mousePointer); }
function mouseDragEnd() {   game.physics.box2d.mouseDragEnd(); }
var playState = {

  
  create: function() {
  	game.stage.backgroundColor = '#124184';
  	//Prepare the keyboard to be used
    this.keyboard = game.input.keyboard;
    var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.addOnce(this.oneTime, this);
    // Ekki viss hvort þetta þurfi/eigi að vera staðsett hér.
    game.physics.box2d.debugDraw.joints = true;
    game.physics.box2d.setBoundsToWorld();
	game.physics.box2d.gravity.y = 500;
	game.physics.box2d.friction = 1;
  
    // game.add.sprite(0,0, 'sky');
    game.add.sprite(0,0, 'firstaid');
    var ground = game.add.sprite(0, 580, 'ground');
    ground.scale.setTo(2,1);
    game.physics.box2d.enable(ground);
    ground.body.static = true;

    createWall();

    var staticThing = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');
    game.physics.box2d.enable(staticThing);
    // staticThing.body.static = true;

    var star = game.add.sprite(game.world.centerX, game.world.centerY, 'star');
    game.physics.box2d.enable(star);
    // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
    joint = game.physics.box2d.wheelJoint(staticThing, star, -50,50,0,0,0,1, 3, 0.5, -350, 100, true);
    
    //handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);

    

    
  },
  oneTime: function() {
    console.log("mhm");
    console.log(joint.GetMotorSpeed());
  },

  update: function() {
    
    
    
  },

  render: function() {
  	game.debug.box2dWorld();
  },

  //á að vera stórt W?
  win: function() {
    game.state.start('win');
  }
};

function createWall() {
	console.log('wall?')
  leftWall = new Phaser.Physics.Box2D.Body(game, null, 0, 350, 0.5);
  leftWall.setRectangle(32, 500, 0, 0, 0);
  leftWall.static = true;
}