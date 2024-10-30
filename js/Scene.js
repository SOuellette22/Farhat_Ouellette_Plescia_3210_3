import * as THREE from 'three';
import Plane from './Plane';

export default class Scene {
    constructor() {

        // Add a plane to the scene
        this.planes = new Plane().group;

        // Added the ambient light to the scene
        this.ambientLight = new THREE.AmbientLight(0xb0c1ff, 0.2);

        // Added the directional light to the scene
        this.spotLight = new THREE.SpotLight(0xffffff, 1100.0,0, 12, 1, 1.5);
        this.spotLight.position.set(0, 100, 0);
        this.spotLight.castShadow = true;
        //this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);

        this.spotLightSwingX = 0;
        this.spotLightSwingY = 0;

    }

    update(d) {
        this.spotLightSwingX += (Math.PI / (Math.random() * 2  + 1) ) * d;
        this.spotLightSwingY += (Math.PI / (Math.floor(Math.random() * 2 ) + 1) ) * d;

        if (this.spotLightSwingX > Math.PI * 2) {
            this.spotLightSwingX = 0;
        }

        if (this.spotLightSwingY > Math.PI * 2) {
            this.spotLightSwingY = 0;
        }

        this.spotLight.position.x = 15 * Math.cos(this.spotLightSwingX);
        this.spotLight.position.z = 15 * Math.sin(this.spotLightSwingY);
    }

}