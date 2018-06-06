window.onload = function() {
    var canvas = document.createElement("canvas");
  
    canvas.width = 720;
    canvas.height = 800;
  
    document.body.prepend(canvas);
  
    var game = new Game(canvas);
    game.start();
    
    canvas.onclick = function (event) {
      game.onClickEvent(event);
    }    
};