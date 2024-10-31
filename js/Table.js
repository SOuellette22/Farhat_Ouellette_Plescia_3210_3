import * as THREE from 'three';

export default class Table {
    constructor() {
        this.group = new THREE.Group();
        var loader = new THREE.TextureLoader();
        this.group.name = 'Table';

        this.tableGeo = new THREE.CylinderGeometry(28, 25, 4, 34)
        this.tableMat = new THREE.MeshPhongMaterial( { 
            map: loader.load('textures/tableTexture.jpg'),
            color: 0xffffff,
        } );

        this.tableMesh = new THREE.Mesh(this.tableGeo, this.tableMat);
        this.tableMesh.castShadow = true;
        this.tableMesh.receiveShadow = true;
        this.tableMesh.position.set(0, 17, 0);

        this.group.add(this.tableMesh);

        var legheight = 15;

        var tableLeg1Geo = new THREE.CylinderGeometry(2, 2, legheight, 34);
        var tableLeg1Mat = new THREE.MeshPhongMaterial( { 
            map: loader.load('textures/tableTexture.jpg'),
            color: 0xffffff,
        } );
        this.tableLeg1 = new THREE.Mesh(tableLeg1Geo, tableLeg1Mat);
        this.tableLeg1.castShadow = true;
        this.tableLeg1.receiveShadow = true
        this.tableLeg1.position.set(13, legheight/2, 13);
        this.group.add(this.tableLeg1);

        var tableLeg2Geo = new THREE.CylinderGeometry(2, 2, legheight, 34);
        var tableLeg2Mat = new THREE.MeshPhongMaterial( { 
            map: loader.load('textures/tableTexture.jpg'),
            color: 0xffffff,
        } );
        this.tableLeg2 = new THREE.Mesh(tableLeg2Geo, tableLeg2Mat);
        this.tableLeg2.castShadow = true;
        this.tableLeg2.receiveShadow = true
        this.tableLeg2.position.set(-13, legheight/2, 13);
        this.group.add(this.tableLeg2);

        var tableLeg3Geo = new THREE.CylinderGeometry(2, 2, legheight, 34);
        var tableLeg3Mat = new THREE.MeshPhongMaterial( { 
            map: loader.load('textures/tableTexture.jpg'),
            color: 0xffffff,
        } );
        this.tableLeg3 = new THREE.Mesh(tableLeg3Geo, tableLeg3Mat);
        this.tableLeg3.castShadow = true;
        this.tableLeg3.receiveShadow = true
        this.tableLeg3.position.set(13, legheight/2, -13);
        this.group.add(this.tableLeg3);

        var tableLeg4Geo = new THREE.CylinderGeometry(2, 2, legheight, 34);
        var tableLeg4Mat = new THREE.MeshPhongMaterial( { 
            map: loader.load('textures/tableTexture.jpg'),
            color: 0xffffff,
        } );
        this.tableLeg4 = new THREE.Mesh(tableLeg4Geo, tableLeg4Mat);
        this.tableLeg4.castShadow = true;
        this.tableLeg4.receiveShadow = true
        this.tableLeg4.position.set(-13, legheight/2, -13);
        this.group.add(this.tableLeg4);
    }

}