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

    // Function to get the player's deck position (adjusted for each player's position)
    getDeckPosition() {
        let position = new THREE.Vector3();

        if (this.id == 1) {
            // Player 1: deck position
            position.set(-this.inch * 12 * 2.75, 0, 0);
        } else if (this.id == 2) {
            // Player 2: deck position
            position.set(0, 0, -this.inch * 12 * 2.75);
        } else if (this.id == 3) {
            // Player 3: deck position
            position.set(this.inch * 12 * 2.75, 0, 0);
        }

        return position;
    }

    // Animation for card movement and flipping (face up or face down)
    animateCardMovement(cardMesh, startPosition, endPosition, onComplete, flipToFaceUp = true) {
        const duration = 2.5; // Duration in seconds for the animation
        const steps = 60; // Number of animation steps (frames)
        let step = 0;

        // Rotation angles for flipping
        const rotationStart = cardMesh.rotation.y; // Start rotation (either face up or face down)
        const rotationEnd = flipToFaceUp ? Math.PI : 0; // If face up, rotate 180 degrees (Math.PI), else 0

        function updatePosition() {
            if (step < steps) {
                step++;
                const t = step / steps;

                // Interpolate position using lerp (linear interpolation)
                cardMesh.position.lerpVectors(startPosition, endPosition, t);

                // Interpolate rotation to animate the card flipping over (around the y-axis)
                const currentRotation = rotationStart + (rotationEnd - rotationStart) * t;
                cardMesh.rotation.y = currentRotation; // Animate the rotation around the Y-axis

                requestAnimationFrame(updatePosition); // Continue the animation
            } else {
                // Ensure the card ends up at the final position and rotation
                cardMesh.position.set(endPosition.x, endPosition.y, endPosition.z);
                cardMesh.rotation.y = rotationEnd; // Ensure the card is at the correct rotation (face up or down)
                if (onComplete) onComplete(); // Call the completion callback once done
            }
        }

        updatePosition(); // Start the animation
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
