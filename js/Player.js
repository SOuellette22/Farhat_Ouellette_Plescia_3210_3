import * as THREE from 'three';
export default class Player {
    // At the beginning of the game the player should start with no cards
    constructor(inch, id) {
        this.id = id;
        this.cards = [];
        this.score = 0;
        this.inch = inch;
        this.cardGroup = null;
        this.isAnimatingCard = false; // Flag to track card animation state
    }

    // addCard(card) adds a card to the player's hand
    addCard(card) {
        this.cards.push(card);
        this.score += 1;
    }

// Draw Card with Spread and Designated Area Control
    drawCard() {
        if (this.cards.length === 0) {
            this.score = 0;
            return null;
        }

        const card = this.cards.shift();
        this.score -= 1;

        const cardMesh = card.mesh;
        const cardPosition = cardMesh.position.clone(); // Store the initial position
        let targetPosition;

        // Get the deck position and center position
        const playerDeckPosition = this.getDeckPosition();  // Get the player's deck position
        const centerPosition = new THREE.Vector3(0, 0, 0); // Center of the table

        // Calculate the designated area: between deck and center based on spreadFactor
        const direction = new THREE.Vector3().subVectors(centerPosition, playerDeckPosition).normalize();  // Vector from deck to center
        const spreadFactor = 0.9;
        const spreadDistance = this.inch * 24 * spreadFactor; // Adjust this factor to control distance

        // Calculate the target position based on spreadFactor
        targetPosition = new THREE.Vector3().addVectors(playerDeckPosition, direction.multiplyScalar(spreadDistance));

        // Now apply the spread distance for the individual cards within the designated area
        const spreadOffset = this.inch * 6; // Adjust this to control how spread the cards are
        const spreadRandomX = (Math.random() - 0.5) * spreadOffset; // Random offset for X
        const spreadRandomZ = (Math.random() - 0.5) * spreadOffset; // Random offset for Z

        // Apply the random spread within the designated area
        targetPosition.x += spreadRandomX;
        targetPosition.z += spreadRandomZ;

        // Animate the card to this position
        this.animateCardMovement(cardMesh, cardPosition, targetPosition, () => {
            scene.add(cardMesh); // Add card to the scene (table area)
            this.updateGeo(); // Update the card layout after drawing
            this.isAnimatingCard = false; // Reset animation flag
        }, true); // Flip face up

        return card;
    }

    // Return Card to Deck (face down)
    returnCardToDeck(card, onComplete) {
        const cardMesh = card.mesh;
        const cardPosition = cardMesh.position.clone();
        const playerDeckPosition = this.getDeckPosition();  // Get the player's deck position

        // Animate the card back to the deck (face down)
        this.animateCardMovement(cardMesh, cardPosition, playerDeckPosition, () => {
            // Once the animation is done, we can return the card to the deck
            scene.remove(cardMesh); // Remove the card from the scene
            this.cards.push(cardMesh); // Add the card back to the player's hand (deck)
            this.updateGeo(); // Update the deck geometry
            if (onComplete) onComplete(); // Call any completion callback
        }, false); // Flip face down
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
