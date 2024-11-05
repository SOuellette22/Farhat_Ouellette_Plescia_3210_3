import Card from './Card.js';

export default class Deck {
    constructor() {
        this.cards = [];
        this.initializeDeck();
        this.shuffle();
    }

    Deck() {
        const deck = new Deck();
        const playerHand = this.deck.deal(5);
        console.log(playerHand);
    }

    initializeDeck() {
        var values = new Array["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        var suits = new Array["Clubs", "Diamonds", "Hearts", "Spades"];

        for(let suit of suits) {
            for(value of values) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

        // Create the deck of cards using the card class that I set up aswell
        //  this should create the deck of cards that will be used for the game
        // What it should do:
        //  - Initialize the deck of cards
        //  - Shuffle the deck of cards so that they are in a random order
        //  - Deal the cards to the players

        shuffle() {
            for(let i = this.cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i +1));
                [this.cards[i], this.cards[j]] = [this.cards, this.cards[i]];
            }
        }
        deal(numCards) {
            return this.cards.splice(0, numCards);
        }
        
    }
