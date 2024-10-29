import * as THREE from 'three';

export default class Plane {
    constructor() {

        this.geometry = new THREE.PlaneGeometry( 200, 200, 200, 200 );

        var loader = new THREE.TextureLoader();

        this.material = new THREE.MeshPhongMaterial( { 
            map: loader.load('textures/planeTexture.jpg'),
            color: 0xffffff,
        } );

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.receiveShadow = true;
    }
}