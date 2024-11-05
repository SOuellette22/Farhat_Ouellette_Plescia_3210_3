import * as THREE from 'three';

export default class Card {
    
    constructor(suit, value) {
        this.value = value;
        this.suit = suit;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.2, 250);
        const renderer = new THREE.WebGLRenderer({});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const card = new Card('Hearts', '10');
        scene.add(card.mesh);
        camera,position.z = 5;

        const cardWidth = 1
        const cardHeight = 1.4;
        const cardDepth = 0.02;
    
        this.geometry = new THREE.BoxGeometry(cardWidth, cardHeight, cardDepth);

        const textureLoader = new THREE.TextureLoader();
        const frontTexture = textureLoader.load('./textures/${this.suit}_${this.value}.png');
        const backTexture = textureLoader.load('./textures/card_back.png');


        const materials = [
            new THREE.MeshBasicMaterial({ map: backTexture }),
            new THREE.MeshBasicMaterial({ map: backTexture }),
            new THREE.MeshBasicMaterial({ color: 0xcccccc }),
            new THREE.MeshBasicMaterial({ color: 0xcccccc }),
            new THREE.MeshBasicMaterial({ color: 0xcccccc }),
            new THREE.MeshBasicMaterial({ map: frontTexture }),
        ];

        this.mesh = new THREE.Mesh(this.geometry, material);

        this.mesh.position.set(0,0,0);
        this.mesh.rotation.set(0,0,0);

        this.mixer = new THREE.AnimationMixer(this.mesh);
        this.createFlipAnimation();
    }

    createFlipAnimation() {
        const flipDirection = 1;
        const flipkeyframes = new THREE.NumberKeyframeTrack('.rotation[y]',[0,0.5,1], [0, Math.PI, 2 * Math.PI])
        const flipclip = THREE.AnimationClip('flip', 1, flipDuration, [flipkeyframes]);

        this.flipAction = this.mixer.clipAction(flipClip)
    }
        
    }
    
    // update(delta) {
    //     if(this.mixer) {
    //         this.mixer.update(delta);
    //     }
    //     }
    

    //     const clock = new THREE.Clock();
    //     function animate() {
    //         requestAnimationFrame(animate);

    //         const delta = clock.getDelta();
    //         card.update(delta);

    //     renderer.render(scene, camera);
    //     }
    // animate();


    // document.addEventListener('click', () => {
    //     card.flip();
    // });

        // const action = mixer.clipAction(clip);
        // action.play();

        // clips.forEach(function(clio) {

        // });

        // loader.load(
        //     'models/json/example.json',

        //     function(obj) {
        //         Scene.add(obj);
        //     },
        //     function(xhr) {
        //         console.log((xhr.loaded/xhr.total * 100) + '% loaded');
        //     },

        //     function(err) {
        //         console.error('An error happened');
        //     }
        // );
        // AnimationObjectGroup.add()
        // const object = loader.parse(a_json_object);
        // Scene.add(object);




        // Create the cards geometry and everything you wolud need to render it
        //  this includes the mesh, the material, and the texture
        // also the animation of the card (https://threejs.org/docs/#manual/en/introduction/Animation-system)
        //  this is a helpful link to help with the animation of the card
    

