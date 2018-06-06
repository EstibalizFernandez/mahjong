function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");
    this.cards = [];
    this.clickedCards = [];
    this.generateCards();
};


Game.prototype.generateCards = function() {
    var possibleIds = this.generatePosiblesIds()
        .sort(function() {
            return Math.random() - 0.5;
    });
    

    for (var i = 0; i < this.ctx.canvas.width / 60 ; i++) {
        for (var j = 0; j < this.ctx.canvas.height / 80 ; j++) {
            var x = i * 60;
            var y = j * 80;
            var id =  possibleIds.pop();
            var card = new Card (this.ctx, id, x, y)
            this.cards.push(card);

        }

    }

}
// ---------------
Game.prototype.generatePosiblesIds = function () {
    var ids = [];

    for(var i = 1; i <= 15; i++) {
        for(var j = 1; j <= 8; j++) {
            ids.push(i);
        }
    }

    return ids;
}
// ---------------

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
    var selectedCard = this.cards.find(function(card) {
        return card.insideOf(x, y);
    });

    if (selectedCard) {
        if (!selectedCard.canClick(this.cards)) {
            this.clickedCards = []
            alert('nope');
        } else {
            this.clickedCards.push(selectedCard)

            if (this.clickedCards.length === 2) {
                this.comparedCards();
                this.clickedCards = []
            }
        }
    }
};

Game.prototype.comparedCards = function () {
    if (this.clickedCards[0].id === this.clickedCards[1].id) {
        this.cards = this.cards.filter(function(card) {
            return (
                card !== this.clickedCards[0] &&
                card !== this.clickedCards[1]
            )
        }.bind(this))
    } else {
        alert('nope');
    }
};

Game.prototype.drawAll = function() {
    this.cards.forEach(function(card) {
        card.draw();
    })
};


/*
// Help Function
Game.prototype.possibleMovement = function() {
    
    foreach ("todos los arrays") {
        if ("Sí quedan fichas iguales en los bordes") {
            "mostrar los movimientos posibles";
        }
    }
    
};
*/