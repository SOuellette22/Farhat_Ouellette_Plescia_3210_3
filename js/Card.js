import * as THREE from 'three';

export default class Card {
    
    constructor(suit, value) {
        this.value = value;
        this.suit = suit;

        const geometry = new THREE.BoxGeometry(1, 8, 11, 1, 1, 1);
        const material = new THREE.Material();
        const renderer = new THREE.WebGLRenderer({});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        Scene.renderer();
    
        const mesh = new THREE.Mesh( geometry, material );

    //<element onKeyDown = "myScript"></element>
        const loader = new THREE.ObjectLoader();

       // let mesh;

        const mixer = new THREE.AnimationMixer(mesh);
        const clips = mesh.animations;

        function update() {
            mixer.update(deltaSeconds);
        }
        const clip = THREE.AnimationClip.findByName('deal');
        const action = mixer.clipAction(clip);
        action.play();

        clips.forEach(function(clio) {
            mixer.clipAction(clip).play();
        });

        loader.load(
            'models/json/example.json',

            function(obj) {
                Scene.add(obj);
            },
            function(xhr) {
                console.log((xhr.loaded/xhr.total * 100) + '% loaded');
            },

            function(err) {
                console.error('An error happened');
            }
        );
        AnimationObjectGroup.add()
        const object = loader.parse(a_json_object);
        Scene.add(object);

        // Create the cards geometry and everything you wolud need to render it
        //  this includes the mesh, the material, and the texture
        // also the animation of the card (https://threejs.org/docs/#manual/en/introduction/Animation-system)
        //  this is a helpful link to help with the animation of the card
    }
    
}
