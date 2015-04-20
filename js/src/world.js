define(["hittest"],function(Hittest){

function world(){
  this.layers = new Array(16);
  for(var i=1;i<11;++i){
    this.layers[i] = new worldlayer();
  }
  this.layers[0] = new worldlayer(0);
  this.layers[15] = new worldlayer(2);
  this.layers[14] = new worldlayer(2);
  this.layers[13] = new worldlayer(2);
  this.layers[12] = new worldlayer(2);
  this.layers[11] = new worldlayer(2);

  this.layers[1].flags |= 0x1c;
  this.layers[2].flags |= 0x1a;
  this.layers[3].flags |= 0x16;
  this.layers[4].flags |= 0x0d;

  this.layers[15].flags |= 0x1c;
  this.layers[14].flags |= 0x16;

  this.g = .2;
  this.f = .95;

  this.push = push;
  function push(item,layer){
      this.layers[layer].push(item);
  }

  this.draw = draw;
  function draw(context,xA,yA,widthA,heightA,xB,yB,widthB,heightB,t=0){
    var a;
    for(var i=0;i<16;++i){
      if(this.layers[i].visible){
        if(this.layers[i].bullets) {a=this.layers[i].contents;}
        else a=this.layers[i].contents.buffer;
        for(j=a.length+1;j>=0;--j){
          if(a[j]) {
            a[j].render(context,xA,yA);
          }
        }
      }
    }
  }

  this.sort = sort;
  function sort(){
      for(var i=1;i<16;++i){
        this.layers[i].sort();
      }
  }

  this.loop = loop;
  function loop(dt=1){
    this.sort();
    var k=1;
    for(var i=0;i<16;++i){
      if(this.layers[i].active)
      for(var j=0;j<16;++j){
          if(this.layers[j].flags & k) this.layers[j].hittestlayer(this.layers[i]);
      }
      k *= 2;
    }
    var a;
    for(var i=0;i<16;++i){

      if(this.layers[i].active){
        if(this.layers[i].bullets) {a=this.layers[i].contents;}
        else a=this.layers[i].contents.buffer;
        for(j=a.length+1;j>=0;--j){
          if(a[j]) {
            a[j].updateFrame();
            a[j].po.vy += this.g;
          }
        }
      }
    }
/*
TODO: Write a constraint solver
*/


  }
}


function worldlayer(o=1,l=200){    //0 is static objects only, 1 is dynamic objects, 2 is bullets
  this.static = this.bullets = this.visible = this.active = false;
  if(o==1) this.dynamic = true;
  if(o==2) this.bullets = true;
  /*
  Flags:
  Least significant 16 bits: Collision flags

  */
  this.l = l;
  this.rl = 0;
  if(this.bullets){
    this.contents = new Array();
  } else this.contents = new Hittest.Bih2d(l);

  this.push = push;
  function push(item){
    this.rl += 1;
    this.contents.push(item);
  }

  this.sort = sort;
  function sort(){
    if(this.bullets){
      for (i=this.contents.length-1;i>=0;--i){
    		if(!this.contents[i].exists) {this.contents[i] = this.contents[this.contents.length - 1]; this.contents.pop();--i}
    	}
    } else {
      this.contents.sort();
    }
  }

  this.hittestlayer = hittestlayer;
  function hittestlayer(layer){
      if(this.bullets) {
        for(var i=0;i<this.rl;++i) {
          var a=this.contents[i];
          if(a) layer.hittestbox(a.x1,a.y1,a.x2,a.y2,function(target){Hittest.narrowphase(a,target,1)});
        }
      } else
      if(this.dynamic) {
        for(var i=0;i<this.rl;++i) {
          var a=this.contents.buffer[i+1];
          if(a) layer.hittestbox(a.x1,a.y1,a.x2,a.y2,function(target){Hittest.narrowphase(a,target,1)});
        }
      }
      else throw "Cannot perform collision detection from this layer";
  }

  this.hittestbox = hittestbox;
  function hittestbox(left,top,right,bottom,action){
      if(this.active){
        if(this.bullets){
          throw "Cannot perform collision detection against this layer";
        } else{
          var n=this.contents.search(Hittest.Rect(left,top,right,bottom));
          for(var i=0;i<n;++i){
            action(this.contents.buffer[this.contents.temparray[i]]);
          }
        }
      }
  }
}

this.world = world;
this.worldlayer = worldlayer;

return {
  world: this.world,
  worldlayer: this.worldlayer
}

});
