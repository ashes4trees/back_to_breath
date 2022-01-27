import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Tree {
    constructor(scene, ground) {
        this.scene = scene;
        this.ground = ground;
        const loader = new GLTFLoader();
        const randomPosX = (Math.random() * 5000) - 2500;
        const randomPosZ = (Math.random() * 5000) - 2500;
        const num = Math.floor(Math.random() * (4 - 1) + 1);
        
        loader.load(`./src/assets/trees/tree${num}.glb`, function (gltf) {
            let tree = gltf.scene;
            tree.name = `tree${num}`;
            tree.scale.set(30, 30, 30);
            tree.position.set(randomPosX, 500, randomPosZ);
            tree.castShadow = true;
            tree.traverse(obj => obj.frustumCulled = false);
            scene.add(tree);
            const raycaster = new THREE.Raycaster();
            raycaster.set(tree.position, new THREE.Vector3(0, -1, 0))
            const intersects = raycaster.intersectObject(ground);
            tree.position.y = intersects[0].point.y - 0.2;
        }, undefined, function (error) {
            console.error(error);
        });
    }

}


export default Tree;
