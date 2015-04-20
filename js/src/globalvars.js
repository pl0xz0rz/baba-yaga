var hlavnaObr=document.getElementById("hlavnaObr");
var obdl=hlavnaObr.getContext("2d");
var obrazovka=document.getElementById("obrazovka");

var menuList = new Array();


introMenu.style.display="block";

var stuff = new bih2d(500);

var bezi = false;

var kbMap = new Array(256);

var displayObjects = new Array();

var bullets = new bih2d(1000);

var protagonist;

var xmouse;
var ymouse;

var camera = new AxisAlignedBoundingBox(0,0,600,400);
var cvx = 0;
var cvy = 0;

var hittestArray = new Array();
var enemies = new Array();

var revealedcheckpoints = new Array();

var upgrades = new Array();

var wincondition = 0;
var losecondition = 0;
var gameoverTimer = -1;

var existujehra = false;

var mountains = new Array();
var dirt = new Array();

var levelmap = new Array();
var mapwidth,mapheight;

function vyhraj(){
	destroyOldGame();
	switchScr(5);
}

function prehraj(){
	distspan.innerHTML = Math.round(protagonist.x / xscale) - 2;
	destroyOldGame();
	switchScr(3);
}

function resume(){
	if(bezi) return false;
	if(existujehra) {
		switchScr(1);
		bezi = true;
		return true;
		};
	return false;
}


function resetProgress(){
	for (var i = 0; i< 63; ++i) achievements[i] = 0;
}
