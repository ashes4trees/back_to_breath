import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Misc {
    constructor(scene, ground) {
        this.scene = scene;
        this.ground = ground;
        // this.num = num;
        const loader = new GLTFLoader();
        const randomPosX = (Math.random() * 5000) - 2500;
        const randomPosZ = (Math.random() * 5000) - 2500;
        const num = Math.floor(Math.random() * (4 - 1) + 1);

        loader.load(`assets/misc/misc1.glb`, function (gltf) {
            let misc = gltf.scene;
            misc.name = `misc1`;
            misc.scale.set(15, 15, 15);
            misc.position.set(randomPosX, 500, randomPosZ);
            misc.castShadow = true;
            misc.traverse(obj => obj.frustumCulled = false);
            scene.add(misc);
            const raycaster = new THREE.Raycaster();
            raycaster.set(misc.position, new THREE.Vector3(0, -1, 0))
            const intersects = raycaster.intersectObject(ground);
            misc.position.y = intersects[0].point.y - 0.2;
        }, undefined, function (error) {
            console.error(error);
        });
    }
}

export default Misc;