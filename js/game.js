function Game(canvasElement) {
    this.ctx = canvasElement.getContext("2d");
    this.cards = [
        // new Card(this.ctx,1, 0, 0),
        // new Card(this.ctx,2, 59, 0),
        // new Card(this.ctx,3, 118, 0),
        // new Card(this.ctx,1, 0, 80),
        // new Card(this.ctx,2, 59,80),
        // new Card(this.ctx,3, 118, 80),
        // new Card(this.ctx,1, 0, 160),
        // new Card(this.ctx,2, 59,160),
        // new Card(this.ctx,3, 118, 160)
    ];
    for (var i = 0; i < 4 ; i++) {
        for (var j = 0; j < 3; j++) {
            var x = i * 60;
            var y = j * 80;
            var id = 1;
            var card = new Card (this.ctx, id, x, y)
            this.cards.push(card);
        }

    }
};

// var cardRandom = [1,1,1,1,2,2,2,2,3,3,3,3];
// for (var i = 0; i < 4 ; i++) {
//     for (var j = 0; j < 3; j++) {
//         var x = i * 60;
//         var y = j * 80;
//         var position = Math.floor(Math.random() * cardRandom.length);
//         var card = new Card (this.ctx, cardRandom [position], x, y);
//         this.cards.push(card);
//         delete cardRandom [position];
//     }

// }


Game.prototype.start = function() {

    this.intervalId = setInterval(function() {
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
            selectedCard = undefined;
            alert('nope');
        }
    }
    
};


// Game.prototype.compare = function (a,b) {
//     var card1 = new Object();
//     var card2 = new Object();
//         if (a = clicable) {
//             card1 = a
//         }

//         if (b = clicable) {
//             card2 = b
//         }
// }


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

/*
// Start/Reset Function
Game.prototype.start = function () {
    this.clear ();
    this.drawAll ();
    this.checkGameOver();
    //.bind(this);
};
*/

/*
// Game Over
Game.prototype.checkGameOver = function() {
   
    foreach ("todos los arrays") {
        if (Game.prototype.possibleMovement) {
            break;
            
        } else {
            alert ("Oh! There aren't more possible moves. Would you like to try again?");
        };
    }
    
};

// Array.prototype.includes( searchElement[, fromIndex ] )
*/
