import Card from './Card.js';


export default class Deck {
    constructor(inch) {
        this.cards = [];
        this.initializeDeck(inch);
        this.shuffle();
    }

    // create the deck of 52 cards
    initializeDeck(inch) {
        for(var s = 0; s < 4; s++){
            for(var v = 2; v < 15; v++){
                if(s == 0) {
                    this.cards.push(new Card("hearts", v, inch));
                }
                else if(s == 1){
                    this.cards.push(new Card("clubs", v, inch));
                }
                else if(s == 2) {
                    this.cards.push(new Card("diamonds", v, inch));
                }
                else {
                    this.cards.push(new Card("spades", v, inch));
                }
            }
            
        }
    }

    // shuffles tha deck of cards
    shuffle() {
        for(let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i +1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
       
    // deals the deck of cards to the players
    deal(player1, player2, player3) {
        this.cards.pop();
        while(this.cards.length > 0) {
            player1.addCard(this.cards.pop());
            player2.addCard(this.cards.pop());
            player3.addCard(this.cards.pop());
        }
    }

}

