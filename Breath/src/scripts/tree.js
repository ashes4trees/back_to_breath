import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


// class Tree {

//     constructor (scene) {
//         this.loader = new GLTFLoader();
//         const mainScene = scene;
//         this.loader.load('assets/apples_fall.glb', function (gltf) {
//             let apples = gltf.scene;
//             apples.scale.set(50, 50, 50);
//             apples.position.set(100, 0, 100);
//             apples.castShadow = true;
//             mainScene.add(apples);

//         }, undefined, function (error) {

//             console.error(error);
//         });

//         this.mixer = new THREE.AnimationMixer(apples);
//         gltf.animations.forEach((clip) => {
//             mixer.clipAction(clip).play();
//         }
//     }
// }


// export default Tree;
