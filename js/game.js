function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");
    this.cards = [];
    this.clickedCards = [];
    this.generateCards();
    
};

Game.prototype.youWin = function () {
    if (!this.cards.length) {
        alert ("¡Has ganado! Invítate a una cerveza para celebrarlo");
    }
};

Game.prototype.generateCards = function() {
    for(var i = 0; i < 3; i++) {
        this.cards = this.cards.concat(
            new Layer(this.ctx, i).generate()
        );
    }
};


Game.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
}

Game.prototype.start = function() {
    this.intervalId = setInterval(function() {
        this.clear();
        this.drawAll();
      }.bind(this), 16);

};

Game.prototype.onClickEvent = function(event) {

    var x = event.clientX;
    var y = event.clientY;
    var selectedCard = Object.create(this.cards).reverse().find(function(card) {
        return card.insideOf(x, y);   
    });

    if (selectedCard) {
        if (!selectedCard.canClick(this.cards)) {
            this.clickedCards = []
            alert("No puedes seleccionar una ficha totalmente rodeada");
        } else {
            this.clickedCards.push(selectedCard);

            if (this.clickedCards.length === 2) {
                this.comparedCards();
                this.clickedCards = []
            }
        }
    }
};

Game.prototype.comparedCards = function () {

    if (this.clickedCards[0].id === this.clickedCards[1].id && this.clickedCards[0] !== this.clickedCards[1]) {
        this.cards = this.cards.filter(function(card) {
            return (
                card !== this.clickedCards[0] &&
                card !== this.clickedCards[1]
            )
        }.bind(this))
    } else {
        alert("Debes seleccionar 2 fichas con la misma imagen");
    }
};

Game.prototype.drawAll = function() {
    this.cards.forEach(function(card) {
        card.draw();
    })
};