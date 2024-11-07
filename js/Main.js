import * as THREE from "three";
import Cards from "./Card.js";
import SceneObject from './Scene.js';
import Deck from './Deck.js';
import Player from './Player.js';

// Constrols the units of measurement for the scene
const yard = 1
const foot = yard / 3;
const inch = foot / 12;

var scene = new THREE.Scene();

// Create the camera and set its position
var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, .1, 3000 );
camera.position.set(0, foot * 4, foot * 9);  
camera.lookAt(0,0,0);
scene.add( camera );

// Create the canvas and add it to the body
var renderer = new THREE.WebGLRenderer({canvas: myCanvas, antialias: true});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var audio = document.getElementById("myAudio");
audio.muted = true;
audio.volume = 0.10;

// add all the necessary objects to the scene
var p = new SceneObject(yard, foot, inch);
scene.add(p.planes);
scene.add(p.ambientLight);
scene.add(p.spotLight);
scene.add(p.spotLight.target);
scene.add(p.table);
scene.add(p.spotLightHelper);

// Test the Deck code below:
var deck = new Deck(inch);

// Test the Player code below:
var player1 = new Player(inch, 1);
var player2 = new Player(inch, 2);
var player3 = new Player(inch, 3);

deck.deal(player1, player2, player3);
player1.updateGeo();
player2.updateGeo();
player3.updateGeo();

// Test code to see if the player deck will work
scene.add(player1.cardGroup)
    // console.log("Player 1")
    // console.log(player1.cardGroup)

scene.add(player2.cardGroup)
    // console.log("Player 2")
    // console.log(player2.cardGroup)

scene.add(player3.cardGroup)
    // console.log("Player 3")
    // console.log(player2.cardGroup)

renderer.shadowMap.enabled = true;

var clock = new THREE.Clock();

// Function that plays the game

var cardsPlayed = [];
var gameOver = false;

function playGame() {
    console.log("Starting a new round");

    // Only proceed if the previous round's cards have finished returning
    if (cardsPlayed.length > 0) {
        console.log("Cards already played this round: ", cardsPlayed);
        returnCardsToWinner();
        cardsPlayed.length = 0;
        return; // Don't proceed to new turn until the previous cards are returned
    }

    // Draw cards for the new round
    var cardP1 = player1.drawCard();
    var cardP2 = player2.drawCard();
    var cardP3 = player3.drawCard();

    if (cardP1 == null || cardP2 == null || cardP3 == null) {
        console.log("Game Over");
        gameOver = true;
        return;
    }

    // Add cards to the table (cards played in this round)
    cardsPlayed.push(cardP1, cardP2, cardP3);
    console.log("New cards drawn: ", cardsPlayed);

    // Determine winner of the round
    let winner = null;

    if (cardP1.value > cardP2.value && cardP1.value > cardP3.value) {
        winner = player1;
        console.log("Player 1 wins the round");
    } else if (cardP2.value > cardP1.value && cardP2.value > cardP3.value) {
        winner = player2;
        console.log("Player 2 wins the round");
    } else if (cardP3.value > cardP1.value && cardP3.value > cardP2.value) {
        winner = player3;
        console.log("Player 3 wins the round");
    } else {
        console.log("War!");
        var p1WDisc = null;
        var p2WDisc = null;
        var p3WDisc = null;

        p1WDisc = player1.drawCard();
        if (p1WDisc != null) {
            cardsPlayed.push(p1WDisc);
            cardsPlayed.push(cardP1);
        } else {
            cardsPlayed.push(cardP1);
        }

        p2WDisc = player2.drawCard();
        if (p2WDisc != null) {
            cardsPlayed.push(p2WDisc);
            cardsPlayed.push(cardP2);
        } else {
            cardsPlayed.push(cardP2);
        }

        p3WDisc = player3.drawCard();
        if (p3WDisc != null) {
            cardsPlayed.push(p3WDisc);
            cardsPlayed.push(cardP3);
        } else {
            cardsPlayed.push(cardP3);
        }

        playGame();
    }

    // Add the current round cards to the winner's deck (but do not move them yet)
    if (winner !== null) {
        winner.addCard(cardP1);
        winner.addCard(cardP2);
        winner.addCard(cardP3);
    }

    // Update geometry after each turn to reflect the player's deck and card layout
    player1.updateGeo();
    player2.updateGeo();
    player3.updateGeo();

    // Add player card groups to the scene
    scene.add(player1.cardGroup);
    scene.add(player2.cardGroup);
    scene.add(player3.cardGroup);
}

function returnCardsToWinner() {
    // Check if there are cards to return
    if (cardsPlayed.length === 0) {
        console.log("No cards to return.");
        return; // No cards to return
    }

    console.log("Returning cards to winner...");

    // Find the winner of the previous round (using card values)
    let winner = null;
    const [cardP1, cardP2, cardP3] = cardsPlayed;

    if (cardP1.value > cardP2.value && cardP1.value > cardP3.value) {
        winner = player1;
    } else if (cardP2.value > cardP1.value && cardP2.value > cardP3.value) {
        winner = player2;
    } else if (cardP3.value > cardP1.value && cardP3.value > cardP2.value) {
        winner = player3;
    }

    if (!winner) {
        console.log("No winner, skipping return.");
        return; // Skip if no winner
    }

    // Return the cards to the winner’s deck
    let completedAnimations = 0;

    // Helper function to check if all animations are complete
    function checkReturnComplete() {
        completedAnimations++;
        console.log(`Completed animations: ${completedAnimations}/${cardsPlayed.length}`);
        if (completedAnimations === cardsPlayed.length) {
            console.log("All animations complete, proceeding to next round...");
            playGame();
        }
    }

    // Animate each card to the winner's deck
    cardsPlayed.forEach(card => {
        winner.returnCardToDeck(card, checkReturnComplete);
    });
}

// rotates the camera around the scene
function rotateAboutWorldAxis(object, axis, angle) {
    var rotationMatrix = new THREE.Matrix4() ;
    rotationMatrix.makeRotationAxis( axis.normalize() ,angle) ;
    var currentPos = new THREE.Vector4(object.position.x, object.position.y, object.position.z, 1) ;
    var newPos = currentPos.applyMatrix4( rotationMatrix );
    object.position.x = newPos.x ;
    object.position.y = newPos.y ;
    object.position.z = newPos.z ;
}

var cameraRotation = false;

function animate() {
    var delta = clock.getDelta();

    // Rotate the camera around the scene
    if (cameraRotation) {
        rotateAboutWorldAxis(camera, new THREE.Vector3(0,1,0), Math.PI / 10 * delta);
        camera.lookAt(0,0,0);
    }

    // Update the scene allowing for the spotlight to "swing"
    p.update(delta)

    if (audio.paused || !audio.muted) {
        playAudio();
    }
    
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();

function keyHandler(e) {
    switch (e.key) {
        case 'm': // Q toggles shadows on and off
            p.toggleShadow();
        break;
        case 'l': // L toggles the ambientlight on and off
            p.ambientLight.visible = !p.ambientLight.visible;
        break;
        case 'p': // P toggles the spotlight on and off
            p.spotLight.visible = !p.spotLight.visible;
        break;
        case 'h': // H toggles the spotlight helper on and off
            p.spotLightHelper.visible = !p.spotLightHelper.visible;
        break;
        case 'w': // W moves the spotlight forward
            p.spotLight.target.position.z -= 0.5;
        break;
        case 's': // S moves the spotlight backward
            p.spotLight.target.position.z += 0.5;
        break;
        case 'a': // A moves the spotlight left
            p.spotLight.target.position.x -= 0.5;
        break;
        case 'd': // D moves the spotlight right
            p.spotLight.target.position.x += 0.5;
        break;
        case 'r': // R stops the camera from auto rotating
            cameraRotation = !cameraRotation;
        break;
        case 'o': // O mutes the audio to allow for the user to listen to the music
            audio.muted = !audio.muted;
        break;
        case 'n': // N plays the game
            if (!gameOver) {
                playGame();
            } else {
                console.log("Start a new game");
                
                deck = new Deck(inch);

                player1 = new Player(inch, 1);
                player2 = new Player(inch, 2);
                player3 = new Player(inch, 3);

                deck.deal(player1, player2, player3);

                player1.updateGeo();
                player2.updateGeo();
                player3.updateGeo();

                scene.add(player1.cardGroup)
                scene.add(player2.cardGroup)
                scene.add(player3.cardGroup)

                // console.log("Number of cards in player 1's hand: " + player1.cards.length);
                // console.log("Number of cards in player 2's hand: " + player2.cards.length);
                // console.log("Number of cards in player 3's hand: " + player3.cards.length);

                cardsPlayed = [];

                gameOver = false;
            }
        break;
    }
}

document.addEventListener( "keydown", keyHandler, false );

function playAudio() {
    audio.play();
}