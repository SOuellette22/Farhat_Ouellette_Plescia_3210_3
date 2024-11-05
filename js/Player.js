
export default class Player {
    // At the beginning of the game the player should start with no cards
    constructor() {
        this.cards = [];
        this.score = 0;
    }

    // addCard(card) adds a card to the player's hand
    addCard(card) {
        this.cards.push(card);
        this.score += 1;
    }

    // drawCard() takes the top card from the player's hand and returns it
    drawCard() {
        var card = this.cards.pop();
        if (card == undefined) {
            this.score = 0;
            return null;
        }
        else {
            this.score -= 1;
            return card;
        }
    }

    // getCardCount() returns the number of cards in the player's hand
    //  "This is the score of that player"
    getCardCount() {
        return this.cards.length;
    }
}
