import * as THREE from "three";
import Plane from './Plane.js';
import Table from './Table.js';

export default class Scene {
    constructor(yard, foot, inch) {

        // Add a plane to the scene
        this.planes = new Plane(yard, foot, inch).group;

        this.table = new Table(yard, foot, inch).group;

        this.yard = yard
        this.foot = foot
        this.inch = inch

        // Added the ambient light to the scene
        this.ambientLight = new THREE.AmbientLight(0xb0c1ff, 0.4);

        // Added the directional light to the scene
        this.spotLight = new THREE.SpotLight(0xffffff, (foot * 40.0),0, Math.PI / 6, 1, 1.5);
        this.spotLight.position.set(0, this.yard * 5, 0);
        this.spotLight.castShadow = true;
        this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
        this.spotLightHelper.visible = false;
        this.spotLight.shadow.mapSize.width = 1024;
        this.spotLight.shadow.mapSize.height = 1024;

        // Sets the starting shadow swing locations in the cirlce
        this.spotLightSwingX = 0;
        this.spotLightSwingY = 0;

    }

    // Function to update the scene
    update(d) {
        // Swing the spotlight around
        this.spotLightSwingX += (Math.PI / (Math.random() * 2 + 2 )) * d;
        this.spotLightSwingY += (Math.PI / (Math.floor(Math.random() * 2) + 2 )) * d;

        // If the spotlight has swung around the circle, reset it
        if (this.spotLightSwingX > Math.PI * 2) {
            this.spotLightSwingX = 0;
        }

        // If the spotlight has swung around the circle, reset it
        if (this.spotLightSwingY > Math.PI * 2) {
            this.spotLightSwingY = 0;
        }

        // Move the spotlight around the circle
        this.spotLight.position.x = (this.foot * 2) * Math.cos(this.spotLightSwingX);
        this.spotLight.position.z = (this.foot * 2) * Math.sin(this.spotLightSwingY);

        // Update the spotlight helper
        this.spotLightHelper.update();
    }

    // Function to toggle the shadow on and off
    toggleShadow() {
        this.spotLight.castShadow = !this.spotLight.castShadow;
    }

}