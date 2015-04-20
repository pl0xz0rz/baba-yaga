define([
  "gamestate",
  "world",
  "game",
  "aiscript"
],function(
  Gamestate,
  World,
  Game,
  AIscript
){
  this.gameoverTimer = -1;
  this.kbMap = new Array(256);
  function aiLoop(){
  	if(Game.protagonist.hp > 0){
  	if(this.kbMap['D'.charCodeAt(0)] || this.kbMap[39]) Game.protagonist.moveright();
  	if(this.kbMap['A'.charCodeAt(0)] || this.kbMap[37]) Game.protagonist.moveleft();
  	if(this.kbMap['W'.charCodeAt(0)] || this.kbMap[38]) Game.protagonist.jump();
  	}
  	for(i=0;i<Game.npcs.length;++i){
  		computeAI(Game.npcs[i]);
  	}
  }

  function loop(){
   if(Gamestate.active && !Gamestate.paused){


      Game.draw();

      aiLoop();
      Game.world.loop();

      if(this.gameoverTimer > 0) this.gameoverTimer--;
      if((Gamestate.endcondition !== 0) && (this.gameoverTimer < 0)) this.gameoverTimer = 100;
      if(this.gameoverTimer == 0) Game.end();

     }
     t=setTimeout(function(){this.loop()},18);
    }
    this.loop = loop;
  return{
    loop: this.loop,
    kbMap: this.kbMap
  }
});
