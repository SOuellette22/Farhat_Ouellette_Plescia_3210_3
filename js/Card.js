import * as THREE from 'three';


export default class Card {
    
    constructor(suit, value, inch) {
        
        this.value = value;
        this.suit = suit;

        const geometry = new THREE.BoxGeometry(3.5 * inch, 5 * inch, 0.10 * inch);
        
        const textureLoader = new THREE.TextureLoader();
        var temp = this.value;
        if (this.value == 11) {
            temp = 'jack';
        }
        if (this.value == 12) {
            temp = 'queen';
        }
        if (this.value == 13) {
            temp = 'king';
        }
        if (this.value == 14) {
            temp = 'ace';
        }
        const path = temp + '_of_' + this.suit + '.png';
        const frontTexture = textureLoader.load('./textures/cards/'+ path);
        const backTexture = textureLoader.load('./textures/cards/back.png');

        const materials = [
            new THREE.MeshPhongMaterial({ color: 0xffffff }),
            new THREE.MeshPhongMaterial({ color: 0xffffff }),
            new THREE.MeshPhongMaterial({ color: 0xffffff }),
            new THREE.MeshPhongMaterial({ color: 0xffffff }),
            new THREE.MeshPhongMaterial({ map: frontTexture }),
            new THREE.MeshPhongMaterial({ map: backTexture }),
        ];

        this.mesh = new THREE.Mesh(geometry, materials);
        this.mesh.castShadow = true;
        
    }
}
    
        // Create the cards geometry and everything you wolud need to render it
        //  this includes the mesh, the material, and the texture
        // also the animation of the card (https://threejs.org/docs/#manual/en/introduction/Animation-system)
        //  this is a helpful link to help with the animation of the card
    

