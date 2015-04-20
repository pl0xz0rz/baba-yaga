define(function(){
function computeAI(creep){
  if(creep.hp > 0){
  	switch(creep.t){

 	 }
  }
}
function DirectorAI(startgold,goldgain,units,layer){
  this.gold = startgold;
  this.goldgain = goldgain;
  this.units = units;
  this.layer = layer;

  this.summon = summon;
  function summon(unit,x,y){
    var z = new GenericMob(x,y,unit.id,unit.str,unit.hp,unit.mana);
    this.gold -= unit.cost;

  }

  this.turn = turn;
  function turn(){

  }
}
this.computeAI = computeAI;
this.DirectorAI = DirectorAI;
return{
	computeAI: this.computeAI,
  DirectorAI: this.DirectorAI
}
});
