define(function(){

function narrowPhase(from,to,type){
	//if(from === to) return false;
	switch(type){
		case 1:
			if(!from || !to) return false;
		  if(!aabb(from.po.x1,from.po.y1,from.po.width,from.po.height,to.po.x1,to.po.y1,to.po.width,to.po.height)) return false;
			var im = 1 / (from.po.invMass + to.po.invMass);
			var m1 = im * to.po.invMass;
			var m2 = im * from.po.invMass;
			var pen;

			var dx = from.x - to.x;
			var dy = from.y - to.y;

			if(dx > dy){
				if(dx > 0) {
					pen = from.po.x1 - to.po.x2;
					from.po.translate(-pen * m1,0);
					to.po.translate(pen * m2,0);
				} else {
					pen = from.po.x2 - to.po.x1;
					from.po.translate(-pen * m1,0);
					to.po.translate(pen * m2,0);
				}
			} else{
				if(dy > 0) {
					pen = from.po.y1 - to.po.y2;
					from.po.translate(0,-pen * m1);
					to.po.translate(0,pen * m2);
				} else {
					pen = from.po.y2 - to.po.y1;
					from.po.translate(0,-pen * m1);
					to.po.translate(0,pen * m2);
				}
			}
			from.hit(to);
			return true;

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
		if(!element) throw "Invalid search request";
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
	narrowPhase: this.narrowPhase,
	Rect: this.Rect,
	segmentIntersection: this.segmentIntersection
}


})
