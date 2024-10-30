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
//scene.add(p.spotLightHelper);

renderer.shadowMap.enabled = true;

var spotLightSwing = 0;


var clock = new THREE.Clock();


function animate() {
    var delta = clock.getDelta();

    controls.update();

    p.update(delta)

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();
