define([
  "gamestate",
  "world",
  "aiscript"
],function(
  Gamestate,
  World,
  AIscript
){
  this.gameoverTimer = -1;
  this.kbMap = new Array(256);
  function aiLoop(game){
  	if(game.protagonist.hp > 0){
  	if(this.kbMap['D'.charCodeAt(0)] || this.kbMap[39]) game.protagonist.moveright();
  	if(this.kbMap['A'.charCodeAt(0)] || this.kbMap[37]) game.protagonist.moveleft();
  	if(this.kbMap['W'.charCodeAt(0)] || this.kbMap[38]) game.protagonist.jump();
  	}
  	for(i=0;i<game.npcs.length;++i){
  		AIscript.computeAI(game.npcs[i]);
  	}
  }

  function loop(game){
   if(Gamestate.active && !Gamestate.paused){

      game.draw();

      aiLoop(game);
      game.world.loop();

      if(this.gameoverTimer > 0) this.gameoverTimer--;
      if((Gamestate.endcondition !== 0) && (this.gameoverTimer < 0)) this.gameoverTimer = 100;
      if(this.gameoverTimer == 0) Game.end();

     }
     t=setTimeout(function(){this.loop(game)},18);
    }
    this.loop = loop;
  return{
    loop: this.loop,
    kbMap: this.kbMap
  }
});
