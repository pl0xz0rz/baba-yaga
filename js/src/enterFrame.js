function renderStuff(){

	obdl.strokeStyle = "#FF3333";
	obdl.fillStyle = "#993333";
	obdl.lineWidth = 1;
	obdl.strokeRect(30,30,104,20);
	obdl.fillRect(32,32,protagonist.hp / protagonist.maxhp * 100, 16);

}

function collisionDetection(){


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
