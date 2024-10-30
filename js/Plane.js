import * as THREE from 'three';

export default class Plane {
    constructor() {

        // Create a group to hold the planes
        this.group = new THREE.Group();

        // sets the size of the plane and the number of planes
        this.sqaureSize = 50;
        this.numPlanes = 3; // this number squared is the number of planes!!!

        // Creates all the planes with the given size and number
        for (let i = 0; i < this.numPlanes; i++) {
            for (let j = 0; j < this.numPlanes; j++) {
                // geometry for the planes
                var geometry = new THREE.PlaneGeometry( this.sqaureSize, this.sqaureSize, this.sqaureSize, this.sqaureSize );

                // material for the planes and addeds the texture
                var loader = new THREE.TextureLoader();
                var material = new THREE.MeshPhongMaterial( { 
                    map: loader.load('textures/planeTexture.jpg'),
                    color: 0xffffff,
                } );

                // creates the mesh and adds it to the group
                var mesh = new THREE.Mesh( geometry, material );
                mesh.rotation.x = -Math.PI / 2;
                mesh.receiveShadow = true;
                mesh.position.set(j*this.sqaureSize, 0, i*this.sqaureSize);
                this.group.add(mesh);
            }
            
        }

        var groupMove = -1*this.sqaureSize*(this.numPlanes/2) + this.sqaureSize/2;

        this.group.position.set(groupMove, 0, groupMove);
    }
}