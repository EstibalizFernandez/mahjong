
function Card (ctx, id, x, y, layer) {
  this.ctx = ctx;
  this.id = id;
  this.layer = layer;
  this.img = new Image();
  this.img.src = "img/" + this.id + ".png";

  // this.mySound = new sound("bounce.mp3");
  
  this.x = x;
  this.y = y;

  this.width = 60;
  this.height= 80;
};

Card.prototype.collide = function (card) {
      return (
        (card.y === this.y - card.height && card.x === this.x) ||
        (card.y === this.y + this.height && card.x === this.x) ||
        (card.x === this.x + this.width && card.y === this.y) ||
        (card.x === this.x - card.width && card.y === this.y)
      )
};

Card.prototype.canClick = function (cards) {
  var neighbords = cards.filter(function(card) {
    return card.collide(this) && this !== card && this.layer === card.layer;
  }.bind(this));

  return neighbords.length <= 3;
};


Card.prototype.insideOf = function(x, y) {
  return (x >= this.x && x <= this.x + this.width) &&
    (y >= this.y && y <= this.y + this.height);
}

Card.prototype.draw = function() {
    this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )

    this.ctx.globalAlpha = this.layer * 0.3;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.globalAlpha = 1.0;
};

Card.prototype.drawOnCard = function() {
  console.log(this.x, this.y, this.width, this.height)
  this.ctx.save()
  this.ctx.globalAlpha = 0.8;
  this.ctx.fillStyle = "blue";
  this.ctx.fillRect(this.x, this.y, this.width, this.height)
  this.ctx.globalAlpha = 1.0;
  this.ctx.restore()
};

// Game.prototype.sound = function () {
//   this.sound = document.createElement("audio");
//   this.sound.src = src;
//   this.sound.setAttribute("preload", "auto");
//   this.sound.setAttribute("controls", "none");
//   this.sound.style.display = "none";
//   document.body.appendChild(this.sound);
//   this.play = function(){
//       this.sound.play();
//   }
//   this.stop = function(){
//       this.sound.pause();
//   }
// };
