import * as THREE from 'three';
import SceneObject from './Scene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, .1, 3000 );
camera.position.z = 300;  
camera.lookAt( new THREE.Vector3(0.0,0.0,0.0));
scene.add( camera );

var renderer = new THREE.WebGLRenderer({canvas: myCanvas, antialias: true});
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var controls = new OrbitControls( camera, renderer.domElement );
controls.update();

var p = new SceneObject();
scene.add(p.planes);
scene.add(p.ambientLight);
scene.add(p.spotLight);
scene.add(p.table);
scene.add(p.spotLightHelper);

renderer.shadowMap.enabled = true;

var clock = new THREE.Clock();


function animate() {
    var delta = clock.getDelta();

    controls.update();

    p.update(delta)

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();

function keyHandler(e) {
    switch (e.key) {
        case 'q': // Q toggles shadows on and off
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
