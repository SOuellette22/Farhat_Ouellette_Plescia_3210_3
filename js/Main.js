import * as THREE from 'three';
import SceneObject from './Scene';
// import { OrbitControls } from 'OrbitControls';

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
// var controls = new OrbitControls( camera, renderer.domElement );
// controls.autoRotate = true;
// controls.update();

// add all the necessary objects to the scene
var p = new SceneObject(yard, foot, inch);
scene.add(p.planes);
scene.add(p.ambientLight);
scene.add(p.spotLight);
scene.add(p.table);
scene.add(p.spotLightHelper);

renderer.shadowMap.enabled = true;

var clock = new THREE.Clock();

function animate() {
    var delta = clock.getDelta();

    // controls.update();

    // Update the scene allowing for the spotlight to "swing"
    p.update(delta)

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
    }
}

document.addEventListener( "keydown", keyHandler, false );
