import * as THREE from "three";

export default class Table {
    constructor(yard, foot, inch) {
        // Create a group to hold the table
        this.group = new THREE.Group();
        var loader = new THREE.TextureLoader();
        this.group.name = 'Table';

        // Create the table top
        this.tableGeo = new THREE.CylinderGeometry(foot * 4, foot * 4 - inch * 2, inch * 3, 36)
        this.tableMat = new THREE.MeshPhongMaterial( { 
            map: loader.load('textures/tableTexture.jpg'),
            color: 0xffffff,
        } );

        // Create the table mesh
        this.tableMesh = new THREE.Mesh(this.tableGeo, this.tableMat);
        this.tableMesh.castShadow = true;
        this.tableMesh.receiveShadow = true;
        this.tableMesh.position.set(0, -1 * inch * 3 / 2, 0);

        this.group.add(this.tableMesh);


        // Table legs units
        var legheight = foot * 3;
        var legDist = foot * 2;
        var legRadius = inch * 3;

        // Create the table legs
        this.tableLeg1 = this.createLeg(legRadius, legheight);
        this.tableLeg1.position.set(legDist, -1 * (legheight/2 + inch * 3), legDist);
        this.group.add(this.tableLeg1);

        this.tableLeg2 = this.createLeg(legRadius, legheight);
        this.tableLeg2.position.set(-legDist, -1 * (legheight/2 + inch * 3), legDist);
        this.group.add(this.tableLeg2);

        this.tableLeg3 = this.createLeg(legRadius, legheight);
        this.tableLeg3.position.set(legDist, -1 * (legheight/2 + inch * 3), -legDist);
        this.group.add(this.tableLeg3);

        this.tableLeg4 = this.createLeg(legRadius, legheight);
        this.tableLeg4.position.set(-legDist, -1 * (legheight/2 + inch * 3), -legDist);
        this.group.add(this.tableLeg4);
    }

    // Function to create the table legs
    createLeg = function(r,h) {
        var loader = new THREE.TextureLoader();
        var tableLeg1Geo = new THREE.CylinderGeometry(r, r, h, 34);
        var mesh = new THREE.Mesh(tableLeg1Geo, this.tableMat);
        mesh.castShadow = true;
        mesh.receiveShadow = true
        return mesh;
    }
}