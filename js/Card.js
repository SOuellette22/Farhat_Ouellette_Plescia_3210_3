import * as THREE from 'three';

export default class Card {
    
    constructor(suit, value, inch) {
        
        this.value = value;
        this.suit = suit;

        const geometry = new THREE.BoxGeometry(2.5 * inch, 3.5 * inch, 0.75 * inch);
        
        const textureLoader = new THREE.TextureLoader();
        const frontTexture = textureLoader.load('./textures/${this.value}_of_${this.suit}.png');
        const backTexture = textureLoader.load('./textures/card_back.png');

        const materials = [
            new THREE.MeshBasicMaterial({ map: backTexture }),
            new THREE.MeshBasicMaterial({ color: 0xdddddd }),
            new THREE.MeshBasicMaterial({ color: 0xcccccc }),
            new THREE.MeshBasicMaterial({ color: 0xcccccc }),
            new THREE.MeshBasicMaterial({ color: 0xcccccc }),
            new THREE.MeshBasicMaterial({ map: frontTexture }),
        ];

        this.mesh = new THREE.Mesh(geometry, materials);

        this.mesh.position.set(0,10,0);

        this.mixer = new THREE.AnimationMixer(this.mesh);
        // this.createFlipAnimation();
    }

    // createFlipAnimation() {
    //     const flipDirection = 1;
    //     const flipKeyFrames = new THREE.NumberKeyframeTrack('.rotation[y]',[0,0.5,1], [0, Math.PI, 2 * Math.PI])
    //     const flipClip = THREE.AnimationClip('flip', 1, flipDuration, [flipkeyframes]);

    //     this.flipAction = this.mixer.clipAction(flipClip)
    // }
        
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
    

