function renderStuff(){

	obdl.strokeStyle = "#FF3333";
	obdl.fillStyle = "#993333";
	obdl.lineWidth = 1;
	obdl.strokeRect(30,30,104,20);
	obdl.fillRect(32,32,protagonist.hp / protagonist.maxhp * 100, 16);

}

function updateCam(){
	cvx *= .9;
	cvy *= .9;

	camera.x += cvx;
	camera.y += cvy;

	if (cameraMinX > camera.x) {
		camera.x = cameraMinX;
		cvx *= -.2;
	}
	if (cameraMinY > camera.y) {
		camera.y = cameraMinY;
		cvy *= -.2;
	}
	if (cameraMaxX < camera.x + camera.width) {
		camera.x = cameraMaxX - camera.width;
		cvx *= -.2;
	}
	if (cameraMaxY < camera.y + camera.height) {
		camera.y = cameraMaxY - camera.height;
		cvy *= -.2;
	}

}

function collisionDetection(){
	var j,k;
	for (var i=1;i<stuff.length;i++) if (stuff.buffer[i]){
		if(stuff.buffer[i].unitcollision){
			var aoc = stuff.search(stuff.buffer[i].po);
			for (var j=0;j<aoc;j++){
				if(i != stuff.temparray[j] && stuff.buffer[stuff.temparray[j]].unitcollision &&
				   narrowPhase(stuff.buffer[i].po,stuff.buffer[stuff.temparray[j]].po,1)) {stuff.buffer[stuff.temparray[j]].hit(i);
													   stuff.buffer[i].hit(stuff.temparray[j]);}
				}
		}
		for (k=0;k<=stuff.buffer[i].po.width / xscale;++k){
			for(j=0;j<=stuff.buffer[i].po.height / yscale;++j){
				stuff.buffer[i].mapcollision(k,j);
			}
				stuff.buffer[i].mapcollision(k,j);
		}
			for(j=0;j<=stuff.buffer[i].po.height / yscale;++j){
				stuff.buffer[i].mapcollision(k,j);
			}
				stuff.buffer[i].mapcollision(k,j);
	}

	for (var i=1;i<bullets.length;++i){
		if(bullets.buffer[i]){
		var aoc = stuff.search(bullets.buffer[i]);
		var immstop = true;
		for (var j=0;j<aoc;j++){
			var po = stuff.buffer[stuff.temparray[j]].po;
			if(aabb(po.x,po.y,po.width,po.height,bullets.buffer[i].x,bullets.buffer[i].y,2,2)){
				if(stuff.buffer[stuff.temparray[j]].t === bullets.buffer[i].immunity) {immstop = false} else {

					bullets.buffer[i].exists = false;
					stuff.buffer[stuff.temparray[j]].hp -= bullets.buffer[i].damage;
				}
			}
		}
		}
	}

	if(protagonist.po.x < cameraMinX) protagonist.po.x = cameraMinX;
	if(protagonist.po.x + protagonist.po.width > cameraMaxX) wincondition = 1;

}

function removeGarbage(){
	for (i=displayObjects.length-1;i>=0;--i){
		if(!displayObjects[i].exists) {displayObjects[i] = displayObjects[displayObjects.length - 1]; displayObjects.pop();--i}
	}
	for (i=enemies.length-1;i>=0;--i){
		if(enemies[i].hp <= 0)  enemies[i].selfdestruct()
	}
	stuff.sort();
}
