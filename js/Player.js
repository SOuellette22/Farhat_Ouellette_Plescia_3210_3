import * as THREE from 'three';
export default class Player {
    // At the beginning of the game the player should start with no cards
    constructor(inch, id) {
        this.id = id;
        this.cards = [];
        this.score = 0;
        this.inch = inch;
        this.cardGroup = null;
    }

    // addCard(card) adds a card to the player's hand
    addCard(card) {
        this.cards.push(card);
        this.score += 1;
    }

    // drawCard() takes the top card from the player's hand and returns it
    drawCard() {
        var card = this.cards.shift();
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

    // updates the deck geometry of the player
    updateGeo() {
        this.cardGroup = new THREE.Group();
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].mesh.rotation.x = Math.PI /2
            if (this.id == 1) {
                this.cards[i].mesh.position.set(-1 * (this.inch * 12) * 2.75, (0.11 * this.inch) * (i+1), 0);
                this.cards[i].mesh.rotation.z = Math.PI / 2;
            }
            else if (this.id == 2) {
                this.cards[i].mesh.position.set(0, (0.11 * this.inch) * (i+1), -1 * (this.inch * 12) * 2.75);
                if (this.cards[i].mesh.rotation.z = Math.PI / 2) {
                    this.cards[i].mesh.rotation.z = 0;
                }
            }
            else if (this.id == 3) {
                this.cards[i].mesh.position.set(1 * (this.inch * 12) * 2.75, (0.11 * this.inch) * (i+1), 0);
                this.cards[i].mesh.rotation.z = Math.PI / 2;
            }

            this.cardGroup.add(this.cards[i].mesh);
        }
    }
}
