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
    layer.push(z);
  }

  this.turn = turn;
  function turn(){
    while(this.gold > this.units[0].cost){
      for(var i=this.units.length-1;i>=0;--i){
        if(this.gold > this.units[i].cost) this.summon(this.units[i],Math.random()*60*32,0);
      }
    }
    this.gold += this.goldgain;
  }



}



this.computeAI = computeAI;
this.DirectorAI = DirectorAI;
return{
	computeAI: this.computeAI,
  DirectorAI: this.DirectorAI
}
});
