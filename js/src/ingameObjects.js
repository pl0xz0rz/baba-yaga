define(["world","gamestate"],function(World,Gamestate){

function PhysicsObject(x,y,vx,vy,width,height){


	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;

	this.x1 = 0;
	this.y1 = 0;
	this.x2 = 0;
	this.y2 = 0;

	this.ax = 0;
	this.ay = 0;

	this.svx = 0;
	this.svy = 0;

	this.sax = 0;
	this.say = 0;

	this.xHardness = .45;
	this.yHardness = .45;

	this.xFriction = .5;
	this.yFriction = .5;

	this.invMass = 1;

	this.garbage = false;

	this.width = width;
	this.height = height;

	this.idealWidth = this.width;
	this.idealHeight = this.height;

	this.updateFrame = updateFrame;
	function updateFrame(){
		this.x += this.vx + this.ax / 2;
		this.y += this.vy + this.ay / 2;
		this.width += this.svx + this.sax / 2 - this.vx - this.ax/2;
		this.height += this.svy + this.say / 2 - this.vy - this.ay/2;
		this.vx += this.ax;
		this.vy += this.ay;
		this.svx += this.sax;
		this.svy += this.say;
		this.ax = 0;
		this.ay = 0;
		this.sax = 0;
		this.say = 0;
		this.say += this.yHardness * (this.idealHeight - this.height);
		this.sax += this.xHardness * (this.idealWidth  - this.width );
		this.ax -= this.sax;
		this.ay -= this.say;

		this.svx -= this.vx;
		this.svx *= this.xFriction * .5;
		this.vx += this.svx;
		this.svx += this.vx;

		this.svy -= this.vy;
		this.svy *= this.yFriction * .5;
		this.vy += this.svy;
		this.svy += this.vy;

		this.x1 = this.x;
		this.y1 = this.y;
		this.x2 = this.x + this.width;
		this.y2 = this.y + this.height;

		}

		this.translate = translate;
		function translate(x,y){
			this.x += x;
			this.y += y;
		}

}

function GenericMob(x,y,t,str,hp,mana){
  this.t = t;
  this.img = imgs[t];
  this.width = widths[t];
  this.height = heights[t];


  this.x = x;
  this.y = y;
  this.str = str;
  this.hp = hp;
  this.maxhp = hp;
  this.mana = mana;
  this.maxmana = mana;
  this.exists = true;
  this.cooldown = 5;
  this.cdtime = 0;

  this.cx = 0;
  this.cy = 0;

  this.nazemi = 0;
  this.gravity = .3;

  this.xn = 0;
  this.yn = 0;

  this.frame = 0;
  this.currentaction = 0;
  this.animdt = 100;
  this.framephase = 0;
  this.animationlength = new Array(8);

  this.currentlayer = 0; // current layer

  this.unitcollision = true;

  this.inventory = new inv();
  this.weapon = 0;

  switch(this.t){
	case 0:
		this.width = 20;
		this.height = 60;
		this.animationlength=[4,4,0,0,0,0,0,0];
	break;
	case 1:
	  this.width = 15;
		this.height = 45;
		this.animationlength=[1,1,0,0,0,0,0,0];
	break;
	case 2:
		this.width = 20;
		this.height = 20;
		this.animationlength=[1,1,0,0,0,0,0,0];
	break;
	case 132:
	break;
	default:
	this.width = 1;
	this.height= 1;
  }

	this.po = new PhysicsObject(x,y,0,0,this.width,this.height);

	this.x1 = this.po.x1;
	this.y1 = this.po.y1;
	this.x2 = this.po.x2;
	this.y2 = this.po.y2;

  this.render = render;
  function render(context,ox,oy){
	this.framephase += 18;
	if(this.framephase > this.animdt){
		this.frame += 1;
		this.frame %= this.animationlength[this.currentaction];
		this.framephase -= this.animdt;
	}
   	switch(this.t){
		case 0: context.drawImage(witch,this.width*this.frame,this.height*this.currentaction,this.width,this.height,this.x-ox-this.width/2,this.y-oy-this.height/2,this.width,this.height);
		break;
		case 1: context.drawImage(zombie,this.width*this.frame,this.height*this.currentaction,this.width,this.height,this.x-ox-this.width/2,this.y-oy-this.height/2,this.width,this.height);
		break;
		case 2: context.drawImage(skull,this.width*this.frame,this.height*this.currentaction,this.width,this.height,this.x-ox-this.width/2,this.y-oy-this.height/2,this.width,this.height);
		break;
		default: 	context.fillStyle="#999999"; context.fillRect(this.x - ox - this.width / 2,this.y - oy - this.height / 2,this.po.width, this.po.height);

	}
  }

  this.moveleft = moveleft;
  function moveleft(){
	  this.currentaction |= 1;
	  if(this.nazemi > 0) {this.po.ax -= this.str; this.po.sax -= this.str;} else {this.po.ax -= this.str / 5; this.po.sax -= this.str / 5;}
  }

  this.moveright = moveright;
  function moveright(){
	  this.currentaction &= -2;
	  if(this.nazemi > 0) {this.po.ax += this.str; this.po.sax += this.str;} else {this.po.ax += this.str / 5; this.po.sax += this.str / 5;}
  }

  this.jump = jump;
  function jump(){
	if(this.nazemi > 0) {this.po.ay -= this.str * 5; this.po.say -= this.str * 5}
  }

  this.updateFrame = updateFrame;
  function updateFrame(){
    this.po.updateFrame();
    this.x = this.po.x + this.po.width / 2;
    this.y = this.po.y + this.po.height / 2;
    if(Math.abs(this.po.vx - this.po.svx) > 1) this.hp -= (this.po.vx - this.po.svx) * (this.po.vx - this.po.svx) / 4;
    if(Math.abs(this.po.vy - this.po.svy) > 1) this.hp -= (this.po.vy - this.po.svy) * (this.po.vy - this.po.svy) / 4;
    this.mana += .01;
    if ((this.mana > this.maxmana) && (this.hp < this.maxhp)) {
		var t = this.mana - this.maxmana;
		this.hp += t;
		this.mana -= t;
	}
		if(this.hp > this.maxhp) this.hp = this.maxhp;
    this.x1 = this.po.x1;
    this.x2 = this.po.x2;
    this.y1 = this.po.y1;
    this.y2 = this.po.y2;
    this.cx = (this.x1 + this.x2) * .5;
    this.cy = (this.x1 + this.x2) * .5;
    this.po.ay += this.gravity;
    this.po.say += this.gravity;
    if(this.nazemi > 0) this.nazemi -= 1;

	if(this.inventory.thearray[this.weapon]){
		items[this.inventory.thearray[this.weapon].id].updateFrame();

	}

  }
  this.seek = seek;
  function seek(x,y){
    var dx = x - this.x;
    var dy = y - this.y;
    var pa = 2 * this.str/Math.sqrt(dx * dx + dy * dy);
    if(pa){
      this.po.vx += dx * pa;
      this.po.svx += dx * pa;
      this.po.vy += dy * pa;
      this.po.svy += dy * pa;
    }
  }
  this.brake = brake;
  function brake(eff){
    if(this.po.vx * this.po.vx + this.po.vy * this.po.vy === 0) return false;
    var pa = eff * this.str/Math.sqrt(this.po.vx * this.po.vx + this.po.vy * this.po.vy);
    if(pa){
      this.po.vx -= this.po.vx * pa;
      this.po.svx -= this.po.vx * pa;
      this.po.vy -= this.po.vy * pa;
      this.po.svy -= this.po.vy * pa;
    }
  }
  this.action = action;
  function action(x,y){
	if(this.inventory.thearray[this.weapon]){
		if(items[this.inventory.thearray[this.weapon].id].effect === 1){
		var l = items[this.inventory.thearray[this.weapon].id].use(x-this.x,y-this.y);
		if(l){
		l.x = this.x;
		l.y = this.y;
		l.vx += this.po.vx;
		l.vy += this.po.vy;
		l.immunity = this.t;
		}
		} else if(items[this.inventory.thearray[this.weapon].id].effect === 2){
		var l = items[this.inventory.thearray[this.weapon].id].use(x-this.x,y-this.y);
		if(l){
		l.x1 += this.x;
		l.x2 += this.x;
		l.y1 += this.y;
		l.y2 += this.y;

		for(var i=1;i<stuff.length;++i){
			if(stuff.buffer[i] && stuff.buffer[i] != this){
				if(Math.max(l.y2,l.y1) > stuff.buffer[i].po.y && Math.min(l.y1,l.y2) < stuff.buffer[i].po.y + stuff.buffer[i].po.height && Math.max(l.x2,l.x1) > stuff.buffer[i].po.x && Math.min(l.x1,l.x2) < stuff.buffer[i].po.x + stuff.buffer[i].po.width){
					stuff.buffer[i].hp -= items[this.inventory.thearray[0].id].power;
					if(stuff.buffer[i].hp < 0) this.hp += stuff.buffer[i].maxhp * .4;
				}
			}
		}
		var id;
		id = Math.floor(l.x2 / xscale) + Math.floor(l.y2 / yscale) * 600;
		if(levelmap[id] === 3) {items[this.inventory.thearray[0].id].heat += 1; this.hp -= 1; prehrajZvuk(2)} else if(levelmap[id] === 1) {this.hp -= .2; prehrajZvuk(1)} else prehrajZvuk(0);
		levelmap[id] &= 0xFFFFFE;
		}

		}
	}
  }

  this.hit = hit;
  function hit(by){
		switch(this.t){
			case 0:
  		switch(by.t){
				case 1:
					Gamestate.endcondition = 1;
					this.exists = false;
				break;
				case 2:
				  Gamestate.endcondition = 2;
					this.exists = false;
		    break;
	    }
			break;
			case 1:
			switch(by.t){
				case 0:
					Gamestate.endcondition = 1;
				break;
				case 2:
					this.exists = false;
		    break;
	    }
			break;
			case 2:
			switch(by.t){
				case 0:
					Gamestate.endcondition = 2;
					by.exists = false;
				break;
				case 1:
				  by.exists = false;
				break;
			}
			default: return false;
	  }
		return true;
  }

  this.mapcollision = mapcollision;
  function mapcollision(x,y,terrain,q){
		var rx = x;
		var ry = y;
		var xscale = 16;
		var yscale = 16;
			switch(terrain){
					case 1:
					case 3:
					if(this.po.y + this.po.height > ry && this.po.y < ry + yscale && this.po.x + this.po.width > rx && this.po.x < rx + xscale) {
					if(q & 2)
						{  this.po.y = ry - this.po.height;   this.po.svy = -.1; this.po.say = 0; this.po.vy = 0; this.po.ay = 0; this.po.vx *= .8;  this.po.svx *= .8;this.nazemi = 2; } else
					if(q & 1)
						{  this.po.x = rx - this.po.width;   this.po.svx = -.1; this.po.sax = 0; this.po.vx = 0; this.po.ax = 0; this.po.vy *= .8; this.po.svy *= .8} else
					if(q & 1 === 0)
						{  this.po.x = rx + xscale;   this.po.vx = .1; this.po.sax = 0; this.po.svx = 0; this.po.ax = 0; this.po.vy *= .8; this.po.svy *= .8; } else
					if(q & 2 === 0)
						{  this.po.y = ry + yscale;   this.po.vy = .1; this.po.say = 0; this.po.svy = 0; this.po.ay = 0; this.po.vx *= .8; this.po.svx *= .8; } else
							{  this.po.y = ry - this.po.height;   this.po.svy = -.1; this.po.say = 0; this.po.vy = 0; this.po.ay = 0; this.po.vx *= .8;  this.po.svx *= .8;this.nazemi = 2; }
					}
					break;
					case 4:
					if(this.po.y + this.po.height > ry && this.po.y < ry + yscale && this.po.x + this.po.width > rx && this.po.x < rx + xscale) {
						{ this.po.y = ry - this.po.height;   this.po.svy = -.1; this.po.say = 0; this.po.vy = 0; this.po.ay = 0; this.po.vx *= .8;  this.po.svx *= .8;this.nazemi = 1; }
					}
					break;
					case 0:
					this.po.vx *= .99;
					this.po.vy *= .99;
					break;
					case 2:
					this.po.vx *= .995;
					this.po.vy *= .995;
			}
  }

	this.selfdestruct = selfdestruct;
	function selfdestruct(){
		this.exists = false;
		this.unitcollision = true;
		this.t |= 1024;
		this.hp = 1;
	}
}

function Bullet(x,y,r,vx,vy,immunity){
	this.vx = vx;
	this.vy = vy;
	this.x = x;
	this.y = y;
	this.r = r;
	this.width = 1;
	this.height = 1;

	this.immunity = immunity;

	this.damage = 0;

	this.lifetime = 100;

		this.x1 = this.x - 1;
		this.y1 = this.y - 1;
		this.x2 = this.x + 2;
		this.y2 = this.x + 2;

	this.exists = true;

	this.updateFrame=updateFrame;
	function updateFrame(){
		this.x += this.vx;
		this.y += this.vy;
		this.x1 = this.x - 10;
		this.y1 = this.y - 10;
		this.x2 = this.x + 12;
		this.y2 = this.x + 12;
		if(!(this.lifetime--))this.exists = false;
	}

	this.render = render;
	function render(){
		drawcontext.fillStyle="#ffffff";
		drawcontext.beginPath();
		drawcontext.arc(this.x - camera.x,this.y - camera.y,this.r,0,2*Math.PI);
		drawcontext.fill();
	}

	this.po = new PhysicsObject(x,y,vx,vy,3,3);
}

function item(id,amount){
	this.id = id;
	this.amount = amount;
}

function inv(){
	this.thearray = new Array();


	this.push = push;
	function push(id,amount){
		for(var i=0;i<this.thearray.length;++i)
			if(this.thearray[i].id == id) {this.thearray[i].amount ++; return 0;}
		this.thearray.push(new item(id,amount));
	}

	this.consumeItem = consumeItem;
	function consumeItem(id,amount){
		for(var i=0;i<this.thearray.length;++i)
			if((this.thearray[i].id == id) && (this.thearray[i].amount >= amount)) {this.thearray[i].amount -= amount; return true;}
		return false;
	}

	this.checkItem = checkItem;
	function checkItem(id,amount){
		for(var i=0;i<this.thearray.length;++i)
			if((this.thearray[i].id == id) && (this.thearray[i].amount >= amount)) {return true;}
		return false;
	}

	this.amountOf = amountOf;
	function amountOf(id){
		for(var i=0;i<this.thearray.length;++i)
			if((this.thearray[i].id == id) ) {return this.thearray[i].amount;}
		return 0;
	}
}

function LightningBolt(x1,y1,x2,y2){
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	this.timer = 30;
	this.exists = true;

	this.render = render;
	function render(){
		drawcontext.strokeStyle="#ffffc1";
		drawcontext.fillStyle="#ffffc1";
		drawcontext.lineWidth=this.timer/5;
		drawcontext.beginPath();
		drawcontext.moveTo(this.x1 - camera.x,this.y1 - camera.y);
		drawcontext.lineTo(this.x2 - camera.x,this.y2 - camera.y);
		drawcontext.stroke();
		if(--this.timer<0) this.exists = false;
	}

}

function ingameItem(){
	this.range = 0;
	this.img = null;
	this.bonushp = 0;
	this.bonusstr = 0;
	this.weight = 0;

	this.width = 0;
	this.power = 0;

	this.heat = 0;

	this.effect = 0;

	this.timer = 0;
	this.reload = 0;

	this.use = use;
	function use(x,y){
		if(this.timer < this.reload) return null;
		this.timer -= this.reload;
		this.heat += Math.random() + .4;
		if(this.heat > 5){
			this.effect = 0;
		}
		if(this.range > 0){
		if(x * x + y * y > this.range * this.range){
  		  var pa = this.range/Math.sqrt(x * x + y * y);
   		  if(pa){
			x = x * pa;
     			y = y * pa;
    		  }
		}
		switch(this.effect){
			case 1:
		if(x * x + y * y > this.range * this.range){
  		  var pa = this.range/Math.sqrt(x * x + y * y);
   		  if(pa){
			x = x * pa;
     			y = y * pa;
    		  }
		}
				var l = new Bullet(0,0,this.width,x,y,0);
				l.damage = this.power;
				displayObjects.push(l);
				Bullets.push(l);
				return l;
			break;
			case 2:
				var l = new LightningBolt(0,0,x,y);
				displayObjects.push(l);
				return l;
			break;
		}
		}

		return null;
	}

	this.updateFrame = updateFrame;
	function updateFrame(){
		if(this.heat > 0) this.heat -= Math.random() / 200 + .01; else this.heat += Math.random() * .1;
		if(this.timer < this.reload) this.timer += 1; else if(this.heat > 0) this.heat -= .1;

	}

}

var items = [];

var imgs = [];
var widths = [];
var heights = [];

this.GenericMob = GenericMob;
this.Bullet = Bullet;
this.LightningBolt = LightningBolt;

return{
	GenericMob: this.GenericMob,
	Bullet: this.Bullet,
	LightningBolt: this.LightningBolt
}

});
