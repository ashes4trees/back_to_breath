import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Rock {
    constructor(scene, ground) {
        this.scene = scene;
        this.ground = ground;
        // this.num = num;
        const loader = new GLTFLoader();
        const randomPosX = (Math.random() * 5000) - 2500;
        const randomPosZ = (Math.random() * 5000) - 2500;
        const num = Math.floor(Math.random() * (4 - 1) + 1);

        loader.load(`./src/assets/rocks/rock${num}.glb`, function (gltf) {
            let rock = gltf.scene;
            rock.name = `rock${num}`;
            rock.scale.set(15, 15, 15);
            rock.position.set(randomPosX, 500, randomPosZ);
            rock.castShadow = true;
            rock.traverse(obj => obj.frustumCulled = false);
            scene.add(rock);
            const raycaster = new THREE.Raycaster();
            raycaster.set(rock.position, new THREE.Vector3(0, -1, 0))
            const intersects = raycaster.intersectObject(ground);
            rock.position.y = intersects[0].point.y - 0.2;
        }, undefined, function (error) {
            console.error(error);
        });
    }
}


export default Rock;
