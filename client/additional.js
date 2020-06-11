$(document).ready(function(){
  $("#play").click(function(){
    play();
  });
  $("#pause").click(function(){
    pause();
  });
});
$("#paused").slideUp();
$("#left").slideUp();

function play() {
  $("#startscreen").slideUp();
  pl = 1;
  playaud();
  $(".topbar").slideUp();
  $("#paused").slideUp();
}

function pause() {
  $("#paused").slideDown();
  $(".topbar").slideDown();
  pl = 0;
  document.exitPointerLock();
  pauseaud();
}
