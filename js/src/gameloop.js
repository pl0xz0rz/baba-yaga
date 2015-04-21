define([
  "gamestate",
  "world",
  "aiscript"
],function(
  Gamestate,
  World,
  AIscript
){
  this.kbMap = new Array(256);
  this.xmouse = 0;
  this.ymouse = 0;
  function aiLoop(game){
  	if(game.protagonist.hp > 0){
  	if(this.kbMap['D'.charCodeAt(0)] || this.kbMap[39]) game.protagonist.moveright();
  	if(this.kbMap['A'.charCodeAt(0)] || this.kbMap[37]) game.protagonist.moveleft();
  	if(this.kbMap['W'.charCodeAt(0)] || this.kbMap[38]) game.protagonist.jump();
    game.skull.seek(this.xmouse + game.camera.x * 32 + game.camera.xoff, this.ymouse + game.camera.y * 32 + game.camera.yoff);
  	}
  	for(i=0;i<game.npcs.length;++i){
  		AIscript.computeAI(game.npcs[i]);
  	}
    game.undeadleader.turn();
  }

  function loop(game){
   if(Gamestate.active && !Gamestate.paused){

     game.mapcollisions();
      game.draw();

      aiLoop(game);
      game.world.loop();

      if(game.gameoverTimer > 0) game.gameoverTimer--;
      if((Gamestate.endcondition !== 0) && (game.gameoverTimer < 0)) {game.gameoverTimer = 100;console.log(Gamestate)};
      if(game.gameoverTimer == 0) game.end();

     }
     t=setTimeout(function(){this.loop(game)},18);
    }
    this.loop = loop;
  return{
    loop: this.loop,
    kbMap: this.kbMap,
    xmouse: this.xmouse,
    ymouse: this.ymouse
  }
});
