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
    this.map = null;
    this.world = new World.world();
  }
  var drawcontext=maincanvas.getContext("2d");

  var camera = [0, 3, 20, 17, 32, 32, 0, 0];

  function draw(){
    camera[0] = Math.floor(this.protagonist.x / 32) - 10;
    camera[1] = Math.floor(this.protagonist.y / 32) - 8;
    camera[6] = Math.floor(this.protagonist.x) % 32;
    camera[7] = Math.floor(this.protagonist.y) % 32;
  //  console.log(camera);
    $.each(Game.map.layers,function(ln,layer){
      for(var i=0;i<camera[2];++i){
        for(var j=0;j<camera[3];++j){
          var c=layer.getCellAt(i+camera[0],j+camera[1]);
          if(!c) continue;
          var tile=c.tile;
          var tid = tile.id;
          var img = tile.imageInfo;
          var dotpos = img.source.indexOf(".");
          var imgName = img.source.slice(0,dotpos);
          drawcontext.drawImage(document.getElementById(imgName),tid % Math.floor(img.w / 32) * 32,
                             Math.floor(tid / Math.floor(img.w / 32)) * 32,
                             32,32,
                             i * 32,
                             j * 32,
                             32, 32);
        }
      }
    });
    this.world.draw(drawcontext,camera[0]*32,camera[1]*32,600,400,0,0,600,400);
  }

  function init(){

    var url = "res/map2.tmx";
    if(!maps[url]){

    }


    this.protagonist = new IngameObjects.GenericMob(32*30,100,0,3,20,20);
    this.world = new World.world();
    this.world.push(this.protagonist,1);
    this.npcs = new Array();

    for(var i=1;i<16;++i){
      this.world.layers[i].active = true;
      this.world.layers[i].visible = true;
    }

    console.log(this.world);
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


  return{
    draw: this.draw,
    init: this.init,
    end: this.end,
    npcs: this.npcs,
    world: this.world,
    map: Game.map
  }

});
