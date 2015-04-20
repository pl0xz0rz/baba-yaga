define(function(){

function narrowPhase(from,to,type){
	switch(type){
		case 0:
			if (from.x + from.width <= to.x){
				if (from.y + from.height <= to.y){
					if (segmentIntersection(from.x,from.y + from.height,to.x,to.y,from.vx + from.ax / 2,from.svy + from.say / 2,to.width,0) ||
					   segmentIntersection(to.x,to.y,from.x,from.y + from.height,-from.vx - from.ax / 2,-from.svy - from.say / 2,from.width,0)){ //From top
						from.vx *= .5;
						from.vax *= .5;
						from.svx *= .5;
						from.sax *= .5;
						from.say *= -.1;
						from.svy *= -.1;
						return true;
					} else if(segmentIntersection(from.x + from.width,from.y,to.x,to.y,from.svx + from.sax / 2,from.vy + from.ay / 2,0,to.height) ||
							 segmentIntersection(to.x,to.y,from.x + from.width,from.y,-from.svx - from.sax / 2,-from.vy - from.ay / 2,0,from.height)){ //From left
						from.vy *= .5;
						from.ay *= .5;
						from.svy *= .5;
						from.sax *= -.1;
						from.svx *= -.1;
						return true;
					} else return false;
				} else if (from.y >= to.y + to.height){
					if (segmentIntersection(from.x,from.y,to.x,to.y + to.height,from.svx + from.sax / 2,from.vy + from.ay / 2,to.width,0) ||
					   segmentIntersection(to.x,to.y + to.height,from.x,from.y,-from.vx - from.ax / 2,-from.vy - from.ay / 2,from.height,0)){  //From bottom
						from.vx *= .5;
						from.svx *= .5;
						from.ay *= -.1;
						from.vy *= -.1;
						return true;
					} else if(segmentIntersection(from.x + from.width,from.y,to.x,to.y,from.svx + from.sax / 2,from.vy + from.ay / 2,0,to.height) ||
							 segmentIntersection(to.x,to.y,from.x + from.width,from.y,-from.svx - from.sax / 2,-from.vy - from.ay / 2,0,from.height)){ //From left
						from.vy *= .5;
						from.svy *= .5;
						from.sax *= -.1;
						from.svx *= -.1;
						return true;
					} else return false;
				} else {
					if(segmentIntersection(from.x + from.width,from.y,to.x,to.y,from.svx + from.sax / 2,from.vy + from.ay / 2,0,to.height) ||
					  segmentIntersection(to.x,to.y,from.x + from.width,from.y,-from.svx - from.sax / 2,-from.vy - from.ay / 2,0,from.height)){ //From left
						from.vy *= .5;
						from.ay *= .5;
						from.svy *= .5;
						from.sax *= -.1;
						from.svx *= -.1;
						return true;
					} else return false;
				}
			} else if (from.x >= to.x + to.width){
				if (from.y + from.height <= to.y){
					if (segmentIntersection(from.x,from.y + from.height,to.x,to.y,from.svx + from.sax / 2,from.svy + from.say / 2,to.width,0) ||
					   segmentIntersection(to.x,to.y,from.x,from.y + from.height,-from.svx - from.sax / 2,-from.svy - from.say / 2,from.width,0)){ //From top
						from.vx *= .5;
						from.svx *= .5;
						from.say *= -.1;
						from.svy *= -.1;
						return true;
					} else if(segmentIntersection(from.x,from.y,to.x + to.width,to.y,from.vx + from.ax / 2,from.vy + from.ay / 2,0,to.height) ||
							 segmentIntersection(to.x + to.width,to.y,from.x,from.y,-from.vx - from.ax / 2,-from.vy - from.ay / 2,0,from.height)){ //From right
						from.vy *= .5;
						from.svy *= .5;
						from.ax *= -.1;
						from.vx *= -.1;
						return true;
					} else return false;
				} else if (from.y >= to.y + to.height){
					if (segmentIntersection(from.x + from.width,from.y,to.x,to.y + to.height,from.svx + from.sax / 2,from.vy + from.ay / 2,to.width,0) ||
					   segmentIntersection(from.x,from.y,to.x,to.y + to.height,from.vx + from.ax / 2,from.vy + from.ay / 2,to.width,0)){ //Bottom
						from.vx *= .5;
						from.svx *= .5;
						from.ay *= -.1;
						from.vy *= -.1;
						return true;
					} else if(segmentIntersection(from.x,from.y,to.x + to.width,to.y,from.vx + from.ax / 2,from.vy + from.ay / 2,0,to.height) ||
							 segmentIntersection(to.x + to.width,to.y,from.x,from.y,-from.vx - from.ax / 2,-from.vy - from.ay / 2,0,from.height)){  //Right
						from.vy *= .5;
						from.svy *= .5;
						from.ax *= -.1;
						from.vx *= -.1;
						return true;
					} else return false;
				} else {
					if(segmentIntersection(from.x,from.y,to.x + to.width,to.y,from.vx + from.ax / 2,from.vy + from.ay / 2,0,to.height) ||
							 segmentIntersection(to.x + to.width,to.y,from.x,from.y,-from.vx - from.ax / 2,-from.vy - from.ay / 2,0,from.height)){ //Right
						from.vy *= .5;
						from.svy *= .5;
						from.ax *= -.1;
						from.vx *= -.1;
						return true;
					} else return false;
				}
			} else {
				if ( from.y + from.height <= to.y){
					if (segmentIntersection(from.x,from.y + from.height,to.x,to.y,from.vx + from.ax / 2,from.svy + from.say / 2,to.width,0) ||
					   segmentIntersection(to.x,to.y,from.x,from.y + from.height,-from.vx - from.ax / 2,-from.svy - from.say / 2,from.width,0)){ //Top
						from.vx *= .5;
						from.ax *= .5;
						from.svx *= .5;
						from.sax *= .5;
						from.say *= -.1;
						from.svy *= -.1;
						boef = true;
						return true;
					} else return false;
				} else if (from.y >= to.y + to.height){
					if (segmentIntersection(from.x,from.y,to.x,to.y + to.height,from.vx + from.ax / 2,from.vy + from.ay / 2,to.width,0) ||
					   segmentIntersection(to.x,to.y + to.height,from.x,from.y,-from.vx - from.ax / 2,-from.vy - from.ay / 2,from.width,0)){ //Bottom
						from.vx *= .5;
						from.ax *= .5;
						from.svx *= .5;
						from.sax *= .5;
						from.ay *= -.1;
						from.vy *= -.1;
						return true;
					}
				} else {
					return true;
				}
			}
		break;
		case 1:
			var vx  = from.vx  + from.ax  * .5 - to.svx  - to.sax  * .5;
			var vy  = from.vy  + from.ay  * .5 - to.svy  - to.say  * .5;
			var svx = from.svx + from.sax * .5 - to.vx   - to.ax   * .5;
			var svy = from.svy + from.say * .5 - to.vy   - to.ay   * .5;
			var ax  =  vx / (from.invMass + to.invMass);
			var ay  =  vy / (from.invMass + to.invMass);
			var sax = svx / (from.invMass + to.invMass);
			var say = svy / (from.invMass + to.invMass);
			if (from.x + from.width <= to.x){
				if (from.y + from.height <= to.y){
					if (segmentIntersection(from.x,from.y + from.height,to.x,to.y, vx, svy,to.width,0) ||
					    segmentIntersection(to.x,to.y,from.x,from.y + from.height,-vx,-svy,from.width,0)){ //From top

						from.say = 0;
						from.svy -= say * from.invMass;
						to.ay = 0;
						to.vy += say * to.invMass;
						return true;
					} else if(segmentIntersection(from.x + from.width,from.y,to.x,to.y,svx,vy,0,to.height) ||
						 segmentIntersection(to.x,to.y,from.x + from.width,from.y,-svx,-vy,0,from.height)){ //From left
						from.sax = 0;
						from.svx -= sax * from.invMass;
						to.ax = 0;
						to.vx += sax * to.invMass;
						return true;
					} else return false;
				} else if (from.y >= to.y + to.height){
					if (segmentIntersection(from.x,from.y,to.x,to.y + to.height,vx,svy,to.width,0) ||
					   segmentIntersection(to.x,to.y + to.height,from.x,from.y,-vx,-svy,from.width,0)){  //From bottom
						from.ay = 0;
						from.vy -= ay * from.invMass;
						to.say = -0;
						to.svy += ay * to.invMass;
						console.log(segmentIntersection(to.x,to.y + to.height,from.x,from.y,-vx,-svy,from.width,0));
						return true;
					} else if(segmentIntersection(from.x + from.width,from.y,to.x,to.y,svx,vy,0,to.height) ||
						 segmentIntersection(to.x,to.y,from.x + from.width,from.y,-svx,-vy,0,from.height)){ //From left
						from.sax = -0;
						from.svx -= sax * from.invMass;
						to.ax = 0;
						to.vx += sax * to.invMass;
						return true;
					} else return false;
				} else {
					if(segmentIntersection(from.x + from.width,from.y,to.x,to.y,svx,svy,0,to.height) ||
					  segmentIntersection(to.x,to.y,from.x + from.width,from.y,-svx,-svy,0,from.height)){ //From left
						from.sax = -0;
						from.svx -= sax * from.invMass;
						to.ax = 0;
						to.vx += sax * to.invMass;
						return true;
					} else return false;
				}
			} else if (from.x >= to.x + to.width){
				if (from.y + from.height <= to.y){
					if (segmentIntersection(from.x,from.y + from.height,to.x,to.y,vx,svy,to.width,0) ||
					   segmentIntersection(to.x,to.y,from.x,from.y + from.height,-vx,-svy,from.width,0)){ //From top
						from.say = -0;
						from.svy -= say * from.invMass;
						to.ay = 0;
						to.vy += say * to.invMass;
						return true;
					} else if(segmentIntersection(from.x,from.y,to.x + to.width,to.y,vx,vy,0,to.height) ||
						 segmentIntersection(to.x + to.width,to.y,from.x,from.y,-vx,-vy,0,from.height)){ //From right
						from.ax = 0;
						from.vx -= ax * from.invMass;
						to.sax = -0;
						to.svx += ax * to.invMass;
						return true;
					} else return false;
				} else if (from.y >= to.y + to.height){
					if (segmentIntersection(from.x + from.width,from.y,to.x,to.y + to.height,svx,vy,to.width,0) ||
					   segmentIntersection(from.x,from.y,to.x,to.y + to.height,vx,vy,to.width,0)){ //Bottom
						from.ay = 0;
						from.vy -= ay * from.invMass;
						to.say = -0;
						to.svy += ay * to.invMass;
						return true;
					} else if(segmentIntersection(from.x,from.y,to.x + to.width,to.y,vx,vy,0,to.height) ||
						 segmentIntersection(to.x + to.width,to.y,from.x,from.y,-vx,-vy,0,from.height)){  //Right
						from.ax = 0;
						from.vx -= ax * from.invMass;
						to.sax = -0;
						to.svx += ax * to.invMass;
						return true;
					} else return false;
				} else {
					if(segmentIntersection(from.x,from.y,to.x + to.width,to.y,vx,vy,0,to.height) ||
					  segmentIntersection(to.x + to.width,to.y,from.x,from.y,-vx,-vy,0,from.height)){ //Right
						from.ax = 0;
						from.vx -= ax * from.invMass;
						to.sax = -0;
						to.svx += ax * to.invMass;
						return true;
					} else return false;
				}
			} else {
				if ( from.y + from.height <= to.y){
					if (segmentIntersection(from.x,from.y + from.height,to.x,to.y,vx,svy,to.width,0) ||
					   segmentIntersection(to.x,to.y,from.x,from.y + from.height,-vx,-svy,from.width,0)){ //Top
						from.say = -0;
						from.svy -= say * from.invMass;
						to.ay = 0;
						to.vy += say * to.invMass;
						return true;
					} else return false;
				} else if (from.y >= to.y + to.height){
					if (segmentIntersection(from.x,from.y,to.x,to.y + to.height,vx,vy,to.width,0) ||
					   segmentIntersection(to.x,to.y + to.height,from.x,from.y,-vx,-vy,from.width,0)){ //Bottom
						from.ay = 0;
						from.vy -= ay * from.invMass;
						to.say = -0;
						to.svy += ay * to.invMass;
						return true;
					}
				} else {
					return true;
				}
			}
		break;
	}
}
/***********
Collision detection
*/
//AABB
function aabb(x1,y1,xs1,ys1,x2,y2,xs2,ys2){
	return ((((x1 >= x2) && (x1 <= x2 + xs2)) ||  ((x1 <= x2) && (x1 + xs1 >= x2))) && (((y1 >= y2) && (y1 <= y2 + ys2)) ||  ((y1 <= y2) && (y1 + ys1 >= y2))));
}

//raycasting
function segmentIntersection(x1,y1,x2,y2,xv,yv,xl,yl){
		if ((xv === 0) && (yv === 0)) return false;
	    var hcgd;
		var decf;
		var ehfg;
		var r;
		var s;
		hcgd = yl * xv - xl * yv;
		decf = yv * (x2 - x1) - xv * (y2 - y1);
		ehfg = (x2 - x1) * yl - (y2 - y1) * xl;
		r = decf / hcgd;
		s = ehfg / hcgd;
		if ( r < 0 || r > 1 || s < 0 || s > 1) { return false; }
		else { return true; };
}



function Rect(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.contains = contains;
	function contains(item){
		return ((this.x <= item.x) && (this.y <= item.y) && (this.x + this.width >= item.x + item.width) && (this.y + this.height >= item.y + item.height));
	}

	this.intersects = intersects;
	function intersects(item){
		return ((this.x <= item.x + item.width) && (this.x + this.width >= item.x) && (this.y <= item.y + item.height) && (this.y + this.height >= item.y))
	}


}

/**************************************
2D BIH - for prune and sweep collsion detection
*************************/


function Bih2d(length){
        var l = 1;
	while (length > (l <<= 1));
	this.buffer = new Array(l);
	this.temparray = new Array(l);
	this.length = l;
	this.half = l >>= 1;
	this.empty = true;
	this.fullness = 0;

	for(var i = 1;i<l;++i){
		this.buffer[i] = null;
	}

	this.push = push;
	function push(element){
		for(var i=1;i<this.length;++i){
			if(this.buffer[i] === null) {
				this.buffer[i] = element;
				this.empty = false;
				this.fullness = i;
				break;
			}
		}
	}

	this.sort = sort;
	function sort(){

		var llo;
		var lhi;
		var rlo;
		var rhi;
		var j;
		var k;
		var sleft;
		var sllo;
		var slhi;
		var sright;
		var srlo;
		var srhi;
		var ok;
		var parity;
		var lastbit;
		var leftcollision;
		var swaptemp;
		var mid;
		this.empty = true;

		parity = 0;
		lastbit = 2;

		var a,b;

		for(var i=1;i<=this.length;++i) {
			a = this.buffer[i];
			if(a && !a.exists) this.buffer[i] = null;
			if(a) this.empty = false
		}

		this.half = this.length >> 1;

		if(this.empty) return false;
		for(i=this.half;i>0;--i) {
			a = this.buffer[i];
			b = this.buffer[i << 1];
			if(!a && b) {this.buffer[i] = b;this.buffer[i << 1] = null; i <<= 1;}
			b = this.buffer[(i << 1) | 1];
			if(!a && b){this.buffer[i] = b; this.buffer[(i << 1) | 1] = null; i <<= 1; i |= 1;}
		}



		this.half = this.fullness >> 1;

		for(i=1;i<this.half;++i){
			if(lastbit & i) {
				parity ^= 1;
				lastbit <<= 1;
			}
			if(!this.buffer[i]) {
				ok = false;
				llo = lhi = i;
				while(lhi <= this.length){
					llo <<= 1;
					lhi <<= 1;
					lhi |= 1;
					for(j=llo;j<=lhi;++j){
						if(this.buffer[j]){this.buffer[i] = this.buffer[j]; this.buffer[j] = null;ok = true; break;}
					}
					if(ok) break;
				};
				continue;
			}
			lhi = llo = i << 1;
			rhi = rlo = llo + 1;
			sllo = slhi = sleft = llo;
			srlo = srhi = sright = rlo;


			mid = this.findMedian(i,parity);
			swaptemp = this.buffer[i];
			this.buffer[i] = this.buffer[mid];
			this.buffer[mid] = swaptemp;





			while(lhi <= this.length){
				for(j = llo; j <= lhi; ++j){
					if(this.buffer[j]){
						if(parity){
							if(this.buffer[i].x1 > this.buffer[j].x1 ) {
								if(this.buffer[i].x2 < this.buffer[j].x2) {
									swaptemp = this.buffer[i];
									this.buffer[i] = this.buffer[j];
									this.buffer[j] = swaptemp;
								}
							}else if(this.buffer[i].x2 < this.buffer[j].x2) do {
								if ((this.buffer[sright])  && (this.buffer[i].x2 < this.buffer[sright].x2)){
									++sright;
									if(sright > srhi){
										srlo <<= 1;
										srhi <<= 1;
										srhi |= 1;
										sright = srlo;
									}
								} else {
									swaptemp = this.buffer[sright];
									this.buffer[sright] = this.buffer[j];
									this.buffer[j] = swaptemp;
								}
							} while(this.buffer[j]  && (this.buffer[i].x2 < this.buffer[j].x2));
						} else {
							if(this.buffer[i].y1 > this.buffer[j].y1 ) {
								if(this.buffer[i].y2 < this.buffer[j].y2) {
									swaptemp = this.buffer[i];
									this.buffer[i] = this.buffer[j];
									this.buffer[j] = swaptemp;
								}
							}else if(this.buffer[i].y2 < this.buffer[j].y2) do {
								if ((this.buffer[sright])  && (this.buffer[i].y2 < this.buffer[sright].y2)){
									++sright;
									if(sright > srhi){
										srlo <<= 1;
										srhi <<= 1;
										srhi |= 1;
										sright = srlo;
									}
								} else {
									swaptemp = this.buffer[sright];
									this.buffer[sright] = this.buffer[j];
									this.buffer[j] = swaptemp;
								}
							} while((this.buffer[j])  && (this.buffer[i].y2 < this.buffer[j].y2));
						}
					}

				}
				llo <<= 1;
				lhi <<= 1;
				lhi |= 1;
			}
			while(rhi <= this.length){
				for(j = rlo; j <= rhi; ++j){
					if(this.buffer[j]){
						if(parity){
							if(this.buffer[i].x2 < this.buffer[j].x2 ) {
								if(this.buffer[i].x1 > this.buffer[j].x1) {
									swaptemp = this.buffer[i];
									this.buffer[i] = this.buffer[j];
									this.buffer[j] = swaptemp;
								}
							}else if(this.buffer[i].x1 > this.buffer[j].x1) do {
								if ((this.buffer[sleft]) && (this.buffer[i].x1 > this.buffer[sleft].x1)){
									++sleft;
									if(sleft > slhi){
										sllo <<= 1;
										slhi <<= 1;
										slhi |= 1;
										sleft = sllo;
									}
								} else {
									swaptemp = this.buffer[sleft];
									this.buffer[sleft] = this.buffer[j];
									this.buffer[j] = swaptemp;
								}
							} while((this.buffer[j]) && (this.buffer[i].x1 > this.buffer[j].x1));
						} else {
							if(this.buffer[i].y2 < this.buffer[j].y2 ) {
								if(this.buffer[i].y1 > this.buffer[j].y1) {
									swaptemp = this.buffer[i];
									this.buffer[i] = this.buffer[j];
									this.buffer[j] = swaptemp;
								}
							}else if(this.buffer[i].y1 > this.buffer[j].y1) do {
								if ((this.buffer[sleft]) && (this.buffer[i].y1 > this.buffer[sleft].y1)){
									++sleft;
									if(sleft > slhi){
										sllo <<= 1;
										slhi <<= 1;
										slhi |= 1;
										sleft = sllo;
									}
								} else {
									swaptemp = this.buffer[sleft];
									this.buffer[sleft] = this.buffer[j];
									this.buffer[j] = swaptemp;
								}
							} while((this.buffer[j]) && (this.buffer[i].y1 > this.buffer[j].y1));
						}
					}

				}
				rlo <<= 1;
				rhi <<= 1;
				rhi |= 1;
			}
		}


		for(var i=1;i<=this.length;++i) {
			a = this.buffer[i];
			if(!a) {this.fullness=i;break;}
		}


	}

	this.search = search;
	function search(element){
		if(this.empty) return 0;
		this.temparray.length = 0;
		var currentpoint = 1;
		var direction = 0;
		var count = 0;
		var parity = 0;
		while(currentpoint > 0){
			if(this.buffer[currentpoint]){
			if(direction === 0){
				this.temparray.push(currentpoint);
				++count;
			}
			if(parity === 1){
				if(direction === 0){
					if(element.x1 < this.buffer[currentpoint].x2) {currentpoint <<= 1; direction = 0;}
					else {direction = 1; parity ^= 1}
				} else if(direction === 1){
					if(element.x2 > this.buffer[currentpoint].x1) {currentpoint <<= 1; currentpoint |= 1; direction  = 0;}
					else {direction = 2; parity ^= 1}
				} else {
					if(currentpoint & 1) {direction = 2;} else direction = 1;
					currentpoint >>= 1;
				}
			}else{
				if(direction === 0){
					if(element.y1 < this.buffer[currentpoint].y2) {currentpoint <<= 1; direction = 0;}
					else {direction = 1; parity ^= 1}
				} else if(direction === 1){
					if(element.y2 > this.buffer[currentpoint].y1) {currentpoint <<= 1; currentpoint |= 1; direction  = 0;}
					else {direction = 2; parity ^= 1}
				} else {
					if(currentpoint & 1) {direction = 2;} else direction = 1;
					currentpoint >>= 1;
				}
			}
			} else {
				if(currentpoint & 1) {direction = 2;} else direction = 1;
				currentpoint >>= 1;
			}
			parity ^= 1;
		}
		return count;
	}

	this.findMedian = findMedian;
	function findMedian(root,parity){
		this.temparray.length = 0;
		var hi;
		var lo;
		var count = 0;
		var c = this.buffer;
		hi = lo = root;
		while(hi <= this.half << 1){
			for(var i=lo;i <= hi;++i){
				if(this.buffer[i]) {
					this.temparray.push(i);
					++count;
				}
			}
			hi <<= 1;
			lo <<= 1;
			hi |= 1;
		}
		if(parity){
			this.temparray.sort(function(a,b){return c[a].x1 - c[b].x1});
		} else{
			this.temparray.sort(function(a,b){return c[a].y1 - c[b].y1});
		}
		count >>= 1;
		return this.temparray[count];

	}
}

this.Bih2d = Bih2d;
this.narrowPhase = narrowPhase;
this.Rect = Rect;
this.segmentIntersection = segmentIntersection;

return{
	Bih2d: this.Bih2d,
	narrowPhase: this.narowPhase,
	Rect: this.Rect,
	segmentIntersection: this.segmentIntersection
}


})
