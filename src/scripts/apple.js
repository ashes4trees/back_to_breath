import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Apple {
    constructor(scene, ground) {
        this.scene = scene;
        this.ground = ground;
        const loader = new GLTFLoader();

        loader.load(`./src/assets/misc/apple.glb`, function (gltf) {
            let apple = gltf.scene;
            apple.name = apple;
            apple.scale.set(15, 15, 15);
            apple.position.set(randomPosX, 500, randomPosZ);
            apple.castShadow = true;
            scene.add(apple);
            const raycaster = new THREE.Raycaster();
            raycaster.set(apple.position, new THREE.Vector3(0, -1, 0))
            const intersects = raycaster.intersectObject(ground);
            apple.position.y = intersects[0].point.y - 0.2;
        }, undefined, function (error) {
            console.error(error);
        });
    }
}


export default Rock;
