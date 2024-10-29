import * as THREE from 'three';
import Plane from './Plane';

export default class Scene {
    constructor(scene) {
        this.planeMesh = new Plane().mesh;
        this.planeMesh.receiveShadow = true;
        scene.add(this.planeMesh);

        this.ambientLight = new THREE.AmbientLight(0xb0c1ff, 0.2);
        scene.add(this.ambientLight);

        this.spotLight = new THREE.SpotLight(0xffffff, 2500.0,0,10);
        this.spotLight.position.set(0, 100, 0);
        this.spotLight.castShadow = true;
        this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);  
        scene.add(this.spotLightHelper);
        scene.add(this.spotLight);
    }
}