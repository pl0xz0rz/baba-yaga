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

  function Game(canvas){

    this.mapurl="";
    this.world = new World.world();

    this.drawcontext=canvas.getContext("2d");
    console.log(canvas);
    console.log(this.drawcontext);

    var camera = [0, 3, 20, 17, 32, 32, 0, 0];

    function draw(){
      var context = this.drawcontext;
      context.fillStyle = "#336666";
      context.fillRect(0,0,600,400);
      camera[0] = Math.floor(this.protagonist.x / 32) - 10;
      camera[1] = Math.floor(this.protagonist.y / 32) - 8;
      camera[6] = Math.floor(this.protagonist.x) % 32;
      camera[7] = Math.floor(this.protagonist.y) % 32;
      var m = maps[this.mapurl]
      $.each(m.layers,function(ln,layer){
        for(var i=0;i<camera[2];++i){
          for(var j=0;j<camera[3];++j){
              var c = layer.data[i + camera[0] + (j + camera[1]) * layer.width];
              if(c){if(c > 80) c -= 80;
              c -= 1;
              var tx = c % (m.tilesets[ln].imagewidth / 32);
              var ty = Math.floor(c / (m.tilesets[ln].imagewidth / 32));
              context.drawImage(document.getElementById(m.tilesets[ln].name),tx*32,ty*32,m.tilesets[ln].tilewidth,m.tilesets[ln].tileheight,
                                          i * camera[4] - camera[6],
                                          j * camera[5] - camera[7],
                                          camera[4],
                                          camera[5]);
              console.log(c);
            }
          }
        }
      });
      this.world.draw(context,camera[0]*32 + camera[6],camera[1]*32 + camera[7],600,400,0,0,600,400);
    }

    function init(){

      var url = this.mapurl = "res/map2.json";
      if(!maps[this.mapurl]){
        $.get(this.mapurl, {}, null,"json").done(function(data){
          maps[url] = data;
          console.log(data);
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
