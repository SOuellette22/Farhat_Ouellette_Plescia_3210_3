import { OrbitControls } from "https://unpkg.com/three@0.138.0/examples/jsm/controls/OrbitControls.js";
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

// Add the orbit controls to the scene
var controls = new OrbitControls( camera, renderer.domElement );
controls.autoRotate = false;
controls.update();

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

// Single card Test Code below:
    // var card = new Cards("clubs", 11, inch)
    // card.mesh.position.set(0, inch * 2, 0);
    // scene.add(card.mesh);

// Test the Deck code below:
var deck = new Deck(inch);
    // console.log(deck.cards);
    // for (let i = 0; i < 4; i++) {
    //     for (let j = 0; j < 13; j++) {
    //         deck.cards[i * 13 + j].mesh.position.set((inch * 2.5) * i, (inch * 3.5) * j, 0);
    //         scene.add(deck.cards[i * 13 + j].mesh);
    //     }
    // }
    // console.log(deck.cards);

// Test the Player code below:
var player1 = new Player(inch, 1);
var player2 = new Player(inch, 2);
var player3 = new Player(inch, 3);

deck.deal(player1, player2, player3);

    // console.log(player1.cards);
    // console.log(player1.score);
    // console.log(player2.cards);
    // console.log(player2.score);
    // console.log(player3.cards);
    // console.log(player3.score);

    // test to see if drawCard works
        // var drawCard = player3.drawCard();
        // console.log(player3.cards);
        // console.log(player3.score);
        // console.log(drawCard);

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

function animate() {
    var delta = clock.getDelta();

    controls.update();

    // Update the scene allowing for the spotlight to "swing"
    p.update(delta)

    if (audio.paused) {
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
            controls.autoRotate = !controls.autoRotate;
        break;
        case 'o': // O mutes the audio to allow for the user to listen to the music
            audio.muted = !audio.muted;
        break;
    }
}

document.addEventListener( "keydown", keyHandler, false );

function playAudio() {
    audio.play();
}