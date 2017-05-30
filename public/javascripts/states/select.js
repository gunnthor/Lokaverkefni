//Höfundur: Gunnþór Karl Rafnsson
var LastRide = LastRide || {};

LastRide.select = function(){};

LastRide.select.prototype = {
  init: function() {
    this.firstaideh;
    this.mapCount = 0;
    this.textButton = [];
    this.buttonsHaveBeenInitialized = false;

    var that = this;

    $.ajax({
      url: '/getMapCount',
      type: 'GET',
      data: {
        format: 'json'
      },
      error: function() {
        console.log("error í ajax request selectMap");
      },
      dataType: 'text',
      success: function(data) {
        console.log("mapCount");
        tmp = JSON.parse(data);
        that.mapCount = tmp.count
        console.log(that.mapCount);
      },
    });
  },
  create: function(){
    this.firstaideh = this.game.add.sprite(0,0, 'firstaid');
  },
  update: function() {
    if(this.mapCount > 0 && !this.buttonsHaveBeenInitialized) this.initalizeButtons();
  },
  mapClicked: function(pepe, nada, mapNumber){
    console.log("uuh, which map now");
    console.log(mapNumber);
    this.state.start('play', true, false, mapNumber);
  },

  initalizeButtons: function(){
    var offset = {};
    offset.x = 0
    offset.y = 0;
    var banner = this.game.add.text(30,50,"Click on the map you want to load: ",{ font: "52px Arial", fill: "#ff0044", align: "center" })
    for(var i = 1; i <= this.mapCount; i++) {
      this.textButton[i] = this.game.add.text(50 + offset.x, 150 + offset.y, "Map: "+i, { font: "24px Arial", fill: "#ff0044", align: "center" });
      offset.y += 25
      if(i%16 == 0 && i != 0) {
        offset.y = 0;
        offset.x += 100;
      }
      this.textButton[i].anchor.set(0.5);
      this.textButton[i].inputEnabled = true;
      this.textButton[i].events.onInputDown.add(this.mapClicked, this,0, i);
     }
    this.buttonsHaveBeenInitialized = true;
  }

};