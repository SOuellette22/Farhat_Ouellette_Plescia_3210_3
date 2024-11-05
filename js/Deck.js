import Card from './Card.js';

export default class Deck {
    constructor() {
        this.cards = [];
        this.Deck();
        this.initializeDeck();
        this.shuffle();
        this.deal();
    }

    Deck() {
        const deck = new Deck();
        const playerHand = this.Deck.deal(5);
        console.log(playerHand);
        
    }
    initializeDeck() {
        for(var s = 0; s < 4; s++);
            for(var v = 2; v < 15; v++);
            if(s == 1);
                cards.append(new Card("clubs", v, inch));
            if(s == 3);
                cards.append(new Card("diamonds", v, inch));
            if(s == 4);
                cards.append(new Card("spades", v, inch));
            if(s == 0);
                cards.append(new Card("hearts", v, inch));
        
        for(let suit of suit) {
            for(values of values) {
                this.cards.push(new Card(suit, value));
            }
        }
    }
    shuffle() {
            for(let i = this.cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i +1));
                [this.cards[i], this.cards[j]] = [this.cards, this.cards[i]];
            }
        }
        
    deal(player1, player2, player3) {
            this.cards.pop();
            return this.cards.splice(0, numCards);
        }
    }

        // Create the deck of cards using the card class that I set up aswell
        //  this should create the deck of cards that will be used for the game
        // What it should do:
        //  - Initialize the deck of cards
        //  - Shuffle the deck of cards so that they are in a random order
        //  - Deal the cards to the players



