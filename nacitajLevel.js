function nacitajLevel(x,y,xs,ys){
	xscale = xs;
	yscale = ys;

	cameraMinX = xs;
	cameraMaxX = x * xs;
	cameraMinY = ys;
	cameraMaxY = y * ys;

	mapwidth = x;
	mapheight = y;




		createMountain(mountains,0,100,200,240,20);
		createMountain(mountains,100,150,250,250,2);
		createMountain(mountains,150,200,300,310,20);
		var i,j;
		var a;
			for(j=0;j<x*y;++j){
				levelmap[j] = 0
			}
		for(i=0;i<200;i++){
			for(j=Math.round(mountains[i]);j>0;j--){
				levelmap[i + x*(y-j)] = 3;
			}
		}

		createMountain(dirt,0,200,3,3,2);
		for(i=101;i<200;i++){
			for(j=Math.round(mountains[i]);j<Math.round(mountains[i] + dirt[i]);j++){
				levelmap[i + x*(y-j)] = 1;
			}
		}
		for(i=120;i<143;i++){
			for(j=Math.round(mountains[i]+ dirt[i]);j<310;j++){
				levelmap[i + x*(y-j)] = 16;
			}
		}
		for(i=80;i<101;++i){
			levelmap[i + x*(y-250)] = 33;
			if(i%7 === 0){
			for(j=Math.round(mountains[i]);j<250;j++){
				levelmap[i + x*(y-j)] |= 32;
			}
			}
		}


			i=1025;
			for(j=0;j<200*399;++j){
				if(levelmap[j] === 0 && levelmap[j+x] === 1) { levelmap[j] = 4};
			}

			for(j=x*(y-245);j<x*y;++j){
				levelmap[j] |= 8;
			}
					var a = new GenericMob(140*16, 301 * 16 ,132,1,1600,20);
					a.po.invMass = 1;
		//			a.unitcollision = false;
					displayObjects.push(a);
					stuff.push(a);

}

function destroyOldGame(){
			bezi = false;
			for(i=displayObjects.length-1;i>=0;--i){
				displayObjects[i].exists = false;
			}
	removeGarbage();

	enemies = [];

	wincondition = 0;
	losecondition = 0;
	gameoverTimer = -1;
	lanemode = false;
}

function tryAgain(){
	newGame();
}

function createMountain(to,x1,x2,y1,y2,peak){
	var r = Math.random();
	var a = (y1 + y2) * .5 + /*Math.pow(2,-(r*r * 100))*/ /*(1.5 * r * r - r * r * r + .5 * */r/*)*/  * peak - peak / 2;
	to[(x1 + x2) >> 1] = a;
	if(x2-x1 > 2){
		createMountain(to,x1,(x1+x2) >> 1, y1,  a, peak / 2);
		createMountain(to,(x1+x2) >> 1,x2,  a, y2, peak / 2);
	}

}

function newGame(){

		nacitajLevel(200,400,32,32);
		switchScr(1);
		playtime = 0;
		bezi = true;
		protagonist = new GenericMob(16*154,16*(mapheight-315),0,1,10,10);
		protagonist.po.invMass = .1;
		protagonist.inventory.push(1024,1);
					var dps = Math.random() * 20 + 50;
					items[1024] = new ingameItem();
					items[1024].range = 20 + Math.random() * 20;
					items[1024].bonushp = 0;
					items[1024].bonusstr = 0;
					items[1024].weight = 0;
					items[1024].width = Math.random() * 3 + 1;
					items[1024].power = Math.random() * 5 + 10;
					items[1024].effect = 1;
					items[1024].reload = dps / items[1024].power;
					if(items[1024].effect === 1) items[1024].range /= 10;
		stuff.push(protagonist);
		displayObjects.push(protagonist);

}
