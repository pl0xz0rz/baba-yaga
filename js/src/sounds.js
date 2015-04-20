define(function(){  //Fix for IE so the game doesn't crash, and a global mute button
  var muted = false;
  var canPLay = false;

  var tracks = [];

  playTrack = function(id){
  if(this.canPlay){
  	this.tracks[id].currentTime = 0;
  	this.tracks[id].play();
  }
  }

  mute = function(){
    if(this.canPlay){
  	if(this.muted){
  	   this.muted = false;
       for(i=this.tracks.length;i>=0;--i){
         if(this.tracks[i]) this.tracks[i].muted = false;
       }
  	} else {
  	   this.muted = true;
       for(i=this.tracks.length;i>=0;--i){
         if(this.tracks[i]) this.tracks[i].muted = true;
       }
  	  }
    }
  }
  return{
    muted: this.muted,
    canPlay: this.canPlay,
    tracks: this.tracks,
    mute: this.mute,
    playTrack: this.playTrack
  }
});
