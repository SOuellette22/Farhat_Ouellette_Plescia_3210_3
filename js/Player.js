import * as THREE from 'three';
export default class Player {
    constructor(inch, id) {
        this.id = id;
        this.cards = [];
        this.score = 0;
        this.inch = inch;
        this.cardGroup = null;
        this.isAnimatingCard = false; // Flag to track card animation state
        this.playerDeckPosition = this.getDeckPositionById(id);
        this.centerPosition = new THREE.Vector3(0, 0, 0); // Center of the table
    }

    addCard(card) {
        this.cards.push(card);
        this.score += 1;
    }

    drawCard() {
        if (this.cards.length === 0) {
            this.score = 0;
            return null;
        }
        const card = this.cards.shift();
        this.score -= 1;
        const cardMesh = card.mesh;
        const initialPosition = cardMesh.position.clone(); // Store the initial position
        const targetPosition = this.calculateTargetPosition(initialPosition);

        // Animate the card to this position
        this.animateCardMovement(cardMesh, initialPosition, targetPosition, () => {
            scene.add(cardMesh); // Add card to the scene (table area)
            this.updateGeo(); // Update the card layout after drawing
            this.isAnimatingCard = false; // Reset animation flag
        }, true); // Flip face up
        return card;
    }

    returnCardToDeck(card, onComplete) {
        const cardMesh = card.mesh;
        const initialPosition = cardMesh.position.clone();

        // Animate the card back to the deck (face down)
        this.animateCardMovement(cardMesh, initialPosition, this.playerDeckPosition, () => {
            scene.remove(cardMesh); // Remove the card from the scene
            this.cards.push(cardMesh); // Add the card back to the player's hand (deck)
            this.updateGeo(); // Update the deck geometry
            if (onComplete) onComplete(); // Call any completion callback
        }, false); // Flip face down
    }

    getDeckPositionById(id) {
        const position = new THREE.Vector3();
        const inchFactor = this.inch * 12 * 2.75;

        switch (id) {
            case 1:
                position.set(-inchFactor, 0, 0);
                break;
            case 2:
                position.set(0, 0, -inchFactor);
                break;
            case 3:
                position.set(inchFactor, 0, 0);
                break;
        }
        return position;
    }

    calculateTargetPosition(initialPosition) {
        const direction = new THREE.Vector3().subVectors(this.centerPosition, this.playerDeckPosition).normalize();  // Vector from deck to center
        const spreadFactor = 0.9;
        const spreadDistance = this.inch * 24 * spreadFactor; // Adjust this factor to control distance
        const targetPosition = new THREE.Vector3().addVectors(this.playerDeckPosition, direction.multiplyScalar(spreadDistance));
        const spreadOffset = this.inch * 6; // Adjust this to control how spread the cards are
        targetPosition.x += (Math.random() - 0.5) * spreadOffset; // Random offset for X
        targetPosition.z += (Math.random() - 0.5) * spreadOffset; // Random offset for Z
        return targetPosition;
    }

    animateCardMovement(cardMesh, startPosition, endPosition, onComplete, flipToFaceUp = true) {
        const duration = 2.5; // Duration in seconds for the animation
        const steps = 60; // Number of animation steps (frames)
        let step = 0;
        const rotationStart = cardMesh.rotation.y; // Start rotation (either face up or face down)
        const rotationEnd = flipToFaceUp ? Math.PI : 0;

        const updatePosition = () => {
            if (step < steps) {
                step++;
                const t = step / steps;
                cardMesh.position.lerpVectors(startPosition, endPosition, t);
                cardMesh.rotation.y = rotationStart + (rotationEnd - rotationStart) * t; // Animate the rotation around the Y-axis
                requestAnimationFrame(updatePosition); // Continue the animation
            } else {
                cardMesh.position.set(endPosition.x, endPosition.y, endPosition.z);
                cardMesh.rotation.y = rotationEnd; // Ensure the card is at the correct rotation (face up or down)
                if (onComplete) onComplete();
            }
        }
        updatePosition(); // Start the animation
    }

    updateGeo() {
        this.cardGroup = new THREE.Group();
        for (let i = 0; i < this.cards.length; i++) {
            const cardMesh = this.cards[i].mesh;
            cardMesh.rotation.x = Math.PI / 2;
            const position = this.calculateCardPosition(i);
            cardMesh.position.set(position.x, position.y, position.z);
            this.cardGroup.add(cardMesh);
        }
    }

    calculateCardPosition(index) {
        const yOffset = (0.11 * this.inch) * (index + 1);
        const idFactor = this.inch * 12 * 2.75;
        let posX = 0;
        let posZ = 0;

        if (this.id === 1) {
            posX = -idFactor;
            posZ = 0;
        } else if (this.id === 2) {
            posX = 0;
            posZ = -idFactor;
        } else if (this.id === 3) {
            posX = idFactor;
            posZ = 0;
        }

        return {x: posX, y: yOffset, z: posZ};
    }
}
