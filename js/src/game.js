define([
  "jquery",
  "world",
  "gamestate",
  "menu",
  "ingameobjects"
],function(
  Jquery,
  World,
  Gamestate,
  Menu,
  IngameObjects
){

  var maps = [];

  function Game(){

    this.mapurl="";
    this.world = new World.world();

    var drawcontext=maincanvas.getContext("2d");

    var camera = [0, 3, 20, 17, 32, 32, 0, 0];

    function draw(){
      camera[0] = Math.floor(this.protagonist.x / 32) - 10;
      camera[1] = Math.floor(this.protagonist.y / 32) - 8;
      camera[6] = Math.floor(this.protagonist.x) % 32;
      camera[7] = Math.floor(this.protagonist.y) % 32;
      $.each(maps[this.mapurl].layers,function(ln,layer){
        for(var i=0;i<camera[2];++i){
          for(var j=0;j<camera[3];++j){
              var c = layer.data[i + j * layer.width];
          }
        }
      });
      this.world.draw(drawcontext,camera[0]*32,camera[1]*32,600,400,0,0,600,400);
    }

    function init(){

      var url = this.mapurl = "res/map2.json";
      if(!maps[this.mapurl]){
        $.get(this.mapurl, {}, null,"json").done(function(data){
          maps[url] = data;
          Gamestate.active = true;
          Gamestate.endcondition = 0;
          Menu.switchScr(1);
        });
      }


      this.protagonist = new IngameObjects.GenericMob(32*30,100,0,3,20,20);
      this.world = new World.world();
      this.world.push(this.protagonist,1);
      this.npcs = new Array();

      for(var i=1;i<16;++i){
        this.world.layers[i].active = true;
        this.world.layers[i].visible = true;
      }


    }

    function end(){
      switch(Gamestate.endcondition){
        case 0:
         console.log("Huh?");
        break;
        case 1:
          Gamestate.active = 0;
          Menu.switchScr(3);
        break;
      }

    }

    this.draw = draw;
    this.init = init;
    this.end = end;

  }

  this.Game = Game;

  return{
    Game: this.Game
  }

});
