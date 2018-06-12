function Layer(ctx, zIndex) {
  this.ctx = ctx;
  this.zIndex = zIndex;

  this.cardsCount = this.CARDS_PER_LAYER[zIndex];

  this.minX = 2 * this.zIndex * this.CARD_WIDTH;
  this.maxX = this.ctx.canvas.width - this.minX;

  this.minY = 2 * this.zIndex * this.CARD_HEIGHT;
  this.maxY = this.ctx.canvas.height - this.minY;

  this.x = this.minX;
  this.y = this.minY;
}

Layer.prototype.CARDS_PER_LAYER = [15, 6, 4];
Layer.prototype.CARDS_REPEAT = [8, 8, 2];
Layer.prototype.CARD_WIDTH = 60;
Layer.prototype.CARD_HEIGHT = 80;

Layer.prototype.generate = function() {
  var possibleIds = this.generatePossiblesIds();

  return possibleIds
    .sort(function() {
      return Math.random() - 0.5;
    })
    .map(function(id) {
      var card = new Card(
        this.ctx,
        id,
        this.x,
        this.y,
        this.zIndex
      );

      this.incrementX();

      return card;
    }.bind(this));
};

Layer.prototype.incrementX = function() {
  this.x += this.CARD_WIDTH;

  if (this.x >= this.maxX) {
    this.x = this.minX;
    this.y += this.CARD_HEIGHT;
  }
};

Layer.prototype.generatePossiblesIds = function() {
  var ids = [];

  for (var i = 1; i <= this.cardsCount; i++) {
    for (var j = 1; j <= this.CARDS_REPEAT[this.zIndex]; j++) {
      ids.push(i);
    }
  }

  return ids;
};