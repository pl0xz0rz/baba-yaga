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

    var camera = {
      x : 0,
      y : 0,
      sw : 20,
      sh : 17,
      tw : 32,
      th : 32,
      xoff : 0,
      yoff : 0,
      xmin : 0,
      ymin : 0,
      xmax : 40,
      ymax : 3
    };

    function mapcollisions(){
      var m = maps[this.mapurl];
      $.each(this.world.layers,function(ln,layer){
        $.each(m.layers,function(ln,layer){

        });
      });
    }

    function draw(t=0){
      var context = this.drawcontext;
      context.fillStyle = "#336666";
      context.fillRect(0,0,600,400);
      camera.x = Math.floor(this.protagonist.x / 32) - 10;
      camera.y = Math.floor(this.protagonist.y / 32) - 8;
      camera.xoff = Math.floor(this.protagonist.x) % 32;
      camera.yoff = Math.floor(this.protagonist.y) % 32;
      if(camera.x < camera.xmin) {camera.x = camera.xmin;camera.xoff = 0;}
      if(camera.y < camera.ymin) {camera.y = camera.ymin;camera.yoff = 0;}
      if(camera.x > camera.xmax) {camera.x = camera.xmax;camera.xoff = 0;}
      if(camera.y > camera.ymax) {camera.y = camera.ymax;camera.yoff = 0;}
      var m = maps[this.mapurl]
      $.each(m.layers,function(ln,layer){
        for(var i=0;i<camera.sw;++i){
          for(var j=0;j<camera.sh;++j){
              var c = layer.data[i + camera.x + (j + camera.y) * layer.width];
              if(c){if(c > 80) c -= 80;
              c -= 1;
              var tx = c % (m.tilesets[ln].imagewidth / 32);
              var ty = Math.floor(c / (m.tilesets[ln].imagewidth / 32));
              context.drawImage(document.getElementById(m.tilesets[ln].name),tx*32,ty*32,m.tilesets[ln].tilewidth,m.tilesets[ln].tileheight,
                                          i * camera.tw - camera.xoff,
                                          j * camera.th - camera.yoff,
                                          camera.tw,
                                          camera.th);
            }
          }
        }
      });
      this.world.draw(context,camera.x*32 + camera.xoff,camera.y*32 + camera.yoff,600,400,0,0,600,400);
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
