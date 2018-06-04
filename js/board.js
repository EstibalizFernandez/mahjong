function Board (ctx) {
  this.ctx = ctx;

    this.img = new Image();
    this.img.src = "img/background.jpg";

    this.x = 0;
    this.y = 0;

    this.width = ctx.canvas.width;
    this.height= ctx.canvas.height; 
};

Board.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.width,
    this.height
  )
};