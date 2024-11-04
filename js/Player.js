
export default class Player {
    // At the beginning of the game the player should start with no cards
    constructor() {
        this.cards = [];
    }

    // addCard(card) adds a card to the player's hand
    addCard(card) {
        this.cards.push(card);
    }

    // drawCard() takes the top card from the player's hand and returns it
    drawCard() {
        var card = this.cards.shift();
        if (card == undefined) {
            return null;
        }
        return card;
    }

    // getCardCount() returns the number of cards in the player's hand
    //  "This is the score of that player"
    getCardCount() {
        return this.cards.length;
    }
}
