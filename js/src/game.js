define([
  "jquery",
  "world",
  "gamestate",
  "menu",
  "ingameobjects",
  "aiscript",
  "rtsunits"
],function(
  Jquery,
  World,
  Gamestate,
  Menu,
  IngameObjects,
  AIscript,
  RTSunits
){

  var maps = [];

  function Game(canvas){

    this.mapurl="";
    this.world = new World.world();
    this.gameoverTimer = -1;

    this.drawcontext=canvas.getContext("2d");
    console.log(canvas);
    console.log(this.drawcontext);

    this.undeadleader = null;

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
      xmax : 41,
      ymax : 3
    };

    this.camera = camera;

    function mapcollisions(){
      var m = maps[this.mapurl];
      $.each(this.world.layers,function(wln,worldlayer){
        if(!worldlayer.active) return true;
        $.each(m.layers,function(tln,tilelayer){
          $.each(worldlayer.contents,function(i,object){
            if(!object || !object.exists) return true;
            var x;
            var y;
            var terrain;
            var tileid;
            for (var k=0;k<=object.po.width / 32 + 2;++k){                       //TODO: Get rid of these magic numbers
        			for(var j=0;j<=object.po.height / 32 + 2;++j){
                x = (Math.floor(object.po.x / 32) + k) * 32;
                y = (Math.floor(object.po.y / 32) + j) * 32;
                for(var i=0;i<4;++i){
                  tileid = tilelayer.data[Math.floor(object.po.x / 32) + k + (Math.floor(object.po.y / 32) + j) * tilelayer.width];
                  if(tileid <= 80 && tileid > 0) terrain = m.tilesets[0].tiles[tileid-1].terrain[i]
                  else terrain = -1;
                  if(i & 1) x += 16;
                  if(i & 2) y += 16;
        				  object.mapcollision(x,y,terrain,i);
                }
        			}
            }
          });
        });
      });
    }

    function draw(t){
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
          Gamestate.active = true;
          Gamestate.endcondition = 0;
          Menu.switchScr(1);
        });
      } else {
        Gamestate.active = true;
        Gamestate.endcondition = 0;
        Menu.switchScr(1);
      }


      this.protagonist = new IngameObjects.GenericMob(32*30,100,0,1.6,20,20);
      this.skull = new IngameObjects.GenericMob(32*27,100,2,1,20,20);
      this.world = new World.world();
      this.world.push(this.protagonist,1);
      this.world.push(this.skull,3);
      this.npcs = new Array();

      console.log(AIscript);

      this.undeadleader = new AIscript.DirectorAI(100,1,[RTSunits.normalzombie],this.world.layers[2]);
      for(var i=1;i<4;++i){
        this.world.layers[i].active = true;
        this.world.layers[i].visible = true;
      }
      this.gameoverTimer = -1;


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
        case 2:
          Gamestate.active = 0;
          Menu.switchScr(5);
        break;
        case 3:
        Gamestate.active = 0;
        Menu.switchScr(3);
        break;
      }

    }

    this.draw = draw;
    this.init = init;
    this.end = end;
    this.mapcollisions = mapcollisions;

  }

  this.Game = Game;

  return{
    Game: this.Game
  }

});
