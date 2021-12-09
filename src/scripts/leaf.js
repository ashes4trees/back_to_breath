import * as THREE from 'three';

class Leaf {
    constructor(scene, ground) {
        this.scene = scene; 
        this.ground = ground;
        const x = (Math.random() * 5000) - 2500;
        const y = Math.random() * (200 - 0);
        const z = (Math.random() * 5000) - 2500;

        const shape = new THREE.CircleBufferGeometry(5, 1, 0, 120);
        const texture = new THREE.TextureLoader().load('./src/assets/leaf.jpg');
        const mat = new THREE.MeshStandardMaterial({map: texture});
        const leaf = new THREE.Mesh(shape, mat);
        leaf.position.set(x, y, z);
        this.scene.add(leaf);
    }

}

export default Leaf;