require.config({
  paths: {
    "jquery": "lib/jquery",
    "hittest": "lib/pl0xz0rz/hittest",
    "world": "src/world",
    "menu": "src/menu",
    "sounds": "src/sounds",
    "gamestate": "src/gamestate",
    "gameloop": "src/gameloop",
    "game": "src/game",
    "aiscript": "src/aiscript",
    "ingameobjects": "src/ingameObjects"
  },
  shim: {
    zlib: { exports: "Zlib"}
  }

});

require([
  "jquery",
  "world",
  "menu",
  "sounds",
  "gamestate",
  "gameloop",
  "game"
], function (
  $,
  World,
  Menu,
  Sounds,
  Gamestate,
  Gameloop,
  Game
){

  Menu.menuList[0] = introMenu;
  Menu.menuList[1] = hra;
  Menu.menuList[2] = settings;
  Menu.menuList[3] = prehra;
  Menu.menuList[5] = vyhra;

  var kbMap = new Array(256);

  $(document).ready(function(){
  	$(window).keydown(function(event){
  		kbMap[event.which] = true; Gameloop.kbMap[event.which] = true;
  		if (event.which === 'K'.charCodeAt(0)) {
  			Gamestate.endcondition = 1;
  		}
  		if (event.which === 'X'.charCodeAt(0)) {
  			moveBack();
  		}
  	}).keyup(function(event){
      kbMap[event.which] = false;  		Gameloop.kbMap[event.which] = false;
  	}).mouseup(function(event){
  		if(!Gamestate.paused && Gamestate.active) protagonist.action(xmouse + camera.x,ymouse + camera.y);
  	}).mousemove(function(event){
  		xmouse = event.clientX - maincanvas.offsetLeft;
  		ymouse = event.clientY - maincanvas.offsetTop;
  	});
    $(".button0").click(function(){
      Menu.switchScr(0);
      return false;
    });
    $(".button1").click(function(){
      Menu.switchScr(1);
      return false;
    });
    $(".button2").click(function(){
      Menu.switchScr(2);
      return false;
    });
    $(".muteButton").click(function(){
      Sounds.mute();
      return false;
    });
    $(".buttonback").click(function(){
      Menu.moveBack();
      return false;
    });
    $(".newgame").click(function(){
      gg.init();
      return false;
    });
    var maincanvas = document.getElementById("maincanvas");;
    var gg = new Game.Game(maincanvas)
    Menu.switchScr(0);
    var playtime = 0;
  	Gameloop.loop(gg);
  	cinterval = setInterval(function(){if(!Gamestate.paused){++ playtime;/*playtimespan.innerHTML = playtime*/}},1000);
  });
});
